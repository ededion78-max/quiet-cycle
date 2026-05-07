import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { Plus, Search, Trash2, BookOpen } from "lucide-react";
import { format } from "date-fns";
import { useI18n } from "@/lib/i18n";

interface JournalEntry {
  id: string;
  date: string;
  text: string;
  mood?: string;
}

const NOTES_KEY = "period-tracker-notes";

function loadNotes(): JournalEntry[] {
  try {
    const raw = localStorage.getItem(NOTES_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return [];
}

function saveNotes(notes: JournalEntry[]): void {
  localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
}

export const Route = createFileRoute("/notes")({
  component: NotesPage,
  head: () => ({
    meta: [
      { title: "Journal — My Cycle" },
      { name: "description", content: "Your private journal for tracking thoughts, symptoms, and reflections." },
    ],
  }),
});

function NotesPage() {
  const { t } = useI18n();
  const [notes, setNotes] = useState<JournalEntry[]>([]);
  const [newText, setNewText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    setNotes(loadNotes());
  }, []);

  const addNote = useCallback(() => {
    if (!newText.trim()) return;
    const entry: JournalEntry = {
      id: Date.now().toString(),
      date: format(new Date(), "yyyy-MM-dd"),
      text: newText.trim(),
    };
    const updated = [entry, ...notes];
    setNotes(updated);
    saveNotes(updated);
    setNewText("");
    setShowForm(false);
  }, [newText, notes]);

  const deleteNote = useCallback((id: string) => {
    const updated = notes.filter((n) => n.id !== id);
    setNotes(updated);
    saveNotes(updated);
  }, [notes]);

  const filtered = searchQuery
    ? notes.filter((n) => n.text.toLowerCase().includes(searchQuery.toLowerCase()))
    : notes;

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-2xl font-bold text-foreground">{t.notesTitle}</h1>
        <p className="text-sm text-muted-foreground mt-1">{t.notesSubtitle}</p>
      </motion.div>

      {/* Search & Add */}
      <div className="flex gap-2 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.search}
            className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-border bg-card text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          {t.addNote}
        </button>
      </div>

      {/* New note form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6 overflow-hidden"
          >
            <div className="card-premium p-5">
              <textarea
                value={newText}
                onChange={(e) => setNewText(e.target.value)}
                placeholder={t.notePlaceholder}
                rows={4}
                className="w-full rounded-xl border border-border bg-background p-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
              />
              <div className="flex justify-end mt-3">
                <button
                  onClick={addNote}
                  disabled={!newText.trim()}
                  className="px-5 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-40"
                >
                  {t.save}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Notes list */}
      {filtered.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
        >
          <BookOpen className="w-12 h-12 text-muted-foreground/40 mx-auto mb-4" />
          <p className="text-muted-foreground text-sm">{t.noNotes}</p>
        </motion.div>
      ) : (
        <div className="space-y-3">
          {filtered.map((note, i) => (
            <motion.div
              key={note.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="card-premium p-4 group"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-muted-foreground mb-1.5">
                    {format(new Date(note.date), "d MMMM yyyy")}
                  </p>
                  <p className="text-sm text-foreground whitespace-pre-wrap">{note.text}</p>
                </div>
                <button
                  onClick={() => deleteNote(note.id)}
                  className="p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors opacity-0 group-hover:opacity-100"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
