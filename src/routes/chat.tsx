import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Bot, Send, Sparkles } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { toast } from "sonner";

export const Route = createFileRoute("/chat")({
  component: ChatPage,
  head: () => ({ meta: [{ title: "AI Health Chat — My Cycle" }] }),
});

type Msg = { role: "user" | "assistant"; content: string };

function ChatPage() {
  const { t } = useI18n();
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    const next: Msg[] = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-chat`;
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ messages: next }),
      });

      if (res.status === 429) { toast.error(t.aiRateLimit); setLoading(false); return; }
      if (res.status === 402) { toast.error(t.aiPaymentRequired); setLoading(false); return; }
      if (!res.ok || !res.body) { toast.error("AI error"); setLoading(false); return; }

      const reader = res.body.getReader();
      const dec = new TextDecoder();
      let buf = "", acc = "";
      setMessages((m) => [...m, { role: "assistant", content: "" }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buf += dec.decode(value, { stream: true });
        let idx;
        while ((idx = buf.indexOf("\n")) !== -1) {
          let line = buf.slice(0, idx);
          buf = buf.slice(idx + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (!line.startsWith("data: ")) continue;
          const json = line.slice(6).trim();
          if (json === "[DONE]") break;
          try {
            const p = JSON.parse(json);
            const c = p.choices?.[0]?.delta?.content;
            if (c) {
              acc += c;
              setMessages((m) => {
                const last = m[m.length - 1];
                if (last?.role === "assistant") {
                  return m.map((x, i) => i === m.length - 1 ? { ...x, content: acc } : x);
                }
                return m;
              });
            }
          } catch { buf = line + "\n" + buf; break; }
        }
      }
    } catch (e) {
      toast.error("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-full gradient-hero flex flex-col">
      <div className="max-w-2xl mx-auto px-4 py-6 w-full flex-1 flex flex-col">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-4">
          <div className="w-14 h-14 rounded-2xl gradient-primary mx-auto flex items-center justify-center shadow-lg mb-2">
            <Bot className="w-7 h-7 text-primary-foreground" />
          </div>
          <h1 className="text-xl font-bold">{t.aiChatTitle}</h1>
          <p className="text-[11px] text-muted-foreground">{t.aiChatSubtitle}</p>
        </motion.div>

        <div className="flex-1 card-premium p-4 overflow-y-auto space-y-3 max-h-[55vh] min-h-[300px]">
          {messages.length === 0 && (
            <div className="text-center text-sm text-muted-foreground py-8">
              <Sparkles className="w-6 h-6 mx-auto mb-2 text-primary" />
              {t.aiChatPlaceholder}
            </div>
          )}
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm whitespace-pre-wrap ${
                m.role === "user" ? "gradient-primary text-primary-foreground" : "bg-muted text-foreground"
              }`}>{m.content || "…"}</div>
            </div>
          ))}
          <div ref={endRef} />
        </div>

        <div className="mt-3 flex gap-2">
          <input
            value={input} onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") send(); }}
            placeholder={t.aiChatInputPlaceholder}
            className="flex-1 px-4 py-3 rounded-xl bg-card border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
          <button onClick={send} disabled={loading || !input.trim()}
            className="px-4 rounded-xl gradient-primary text-primary-foreground disabled:opacity-50">
            <Send className="w-4 h-4" />
          </button>
        </div>
        <p className="text-[10px] text-muted-foreground/70 text-center mt-2">{t.aiDisclaimer}</p>
      </div>
    </div>
  );
}
