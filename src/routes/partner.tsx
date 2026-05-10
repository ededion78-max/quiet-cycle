import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Heart, Copy, Eye, RefreshCw } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useI18n } from "@/lib/i18n";
import { toast } from "sonner";
import { saveData, type CycleData } from "@/lib/period-tracker";

export const Route = createFileRoute("/partner")({
  component: PartnerPage,
  head: () => ({ meta: [{ title: "Partner Sharing — My Cycle" }] }),
});

function rand() { return Math.random().toString(36).slice(2, 8).toUpperCase(); }

function PartnerPage() {
  const { t } = useI18n();
  const [user, setUser] = useState<any>(null);
  const [code, setCode] = useState<string | null>(null);
  const [lookupCode, setLookupCode] = useState("");
  const [partnerData, setPartnerData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data }) => {
      const u = data.session?.user;
      setUser(u);
      if (u) {
        const { data: shares } = await supabase.from("partner_shares")
          .select("code").eq("user_id", u.id).order("created_at", { ascending: false }).limit(1);
        if (shares?.[0]) setCode(shares[0].code);
      }
    });
  }, []);

  const generate = async () => {
    if (!user) return;
    setLoading(true);
    const newCode = rand();
    // Push current local data to backup first
    try {
      const local = JSON.parse(localStorage.getItem("period-tracker-data") || "{}");
      await supabase.from("cycle_backups").upsert({ user_id: user.id, data: local, updated_at: new Date().toISOString() });
      const { error } = await supabase.from("partner_shares").insert({ code: newCode, user_id: user.id });
      if (error) throw error;
      setCode(newCode);
      toast.success(t.codeGenerated);
    } catch (e: any) { toast.error(e.message); }
    setLoading(false);
  };

  const lookup = async () => {
    if (!lookupCode.trim()) return;
    setLoading(true);
    const { data, error } = await supabase.rpc("get_partner_data", { _code: lookupCode.trim().toUpperCase() });
    if (error || !data) toast.error(t.invalidCode);
    else { setPartnerData(data); toast.success(t.partnerDataLoaded); }
    setLoading(false);
  };

  if (!user) {
    return (
      <div className="min-h-full gradient-hero flex items-center justify-center px-4">
        <div className="card-premium p-8 text-center max-w-sm">
          <Heart className="w-10 h-10 text-primary mx-auto mb-3" />
          <p className="text-sm mb-4">{t.loginRequired}</p>
          <Link to="/auth" className="inline-block px-4 py-2 rounded-xl gradient-primary text-primary-foreground text-sm font-semibold">
            {t.login}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full gradient-hero">
      <div className="max-w-md mx-auto px-4 py-8 space-y-5">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <div className="w-14 h-14 rounded-2xl gradient-primary mx-auto flex items-center justify-center shadow-lg mb-3">
            <Heart className="w-7 h-7 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold">{t.partnerTitle}</h1>
          <p className="text-xs text-muted-foreground mt-1">{t.partnerSubtitle}</p>
        </motion.div>

        <div className="card-premium p-5 space-y-3">
          <h3 className="text-sm font-semibold">{t.shareYourData}</h3>
          {code ? (
            <div className="space-y-2">
              <div className="px-4 py-3 rounded-xl bg-primary/10 text-center font-mono text-2xl font-bold tracking-widest text-primary">
                {code}
              </div>
              <div className="flex gap-2">
                <button onClick={() => { navigator.clipboard.writeText(code); toast.success(t.copied); }}
                  className="flex-1 py-2 rounded-lg bg-muted text-xs font-semibold flex items-center justify-center gap-1">
                  <Copy className="w-3 h-3" /> {t.copy}
                </button>
                <button onClick={generate} disabled={loading}
                  className="flex-1 py-2 rounded-lg gradient-primary text-primary-foreground text-xs font-semibold flex items-center justify-center gap-1">
                  <RefreshCw className="w-3 h-3" /> {t.regenerate}
                </button>
              </div>
              <p className="text-[10px] text-muted-foreground text-center">{t.codeExpiresIn30}</p>
            </div>
          ) : (
            <button onClick={generate} disabled={loading}
              className="w-full py-3 rounded-xl gradient-primary text-primary-foreground text-sm font-semibold">
              {t.generateCode}
            </button>
          )}
        </div>

        <div className="card-premium p-5 space-y-3">
          <h3 className="text-sm font-semibold">{t.viewPartnerData}</h3>
          <div className="flex gap-2">
            <input value={lookupCode} onChange={(e) => setLookupCode(e.target.value)} placeholder="ABC123"
              className="flex-1 px-3 py-2 rounded-lg bg-muted/50 border border-border text-sm uppercase tracking-widest" />
            <button onClick={lookup} disabled={loading}
              className="px-4 rounded-lg gradient-primary text-primary-foreground text-xs font-semibold flex items-center gap-1">
              <Eye className="w-3 h-3" /> {t.view}
            </button>
          </div>
          {partnerData && (
            <div className="text-xs space-y-1 mt-3 p-3 rounded-lg bg-muted/30">
              <p><strong>{t.cyclesLogged}:</strong> {partnerData.cycleStarts?.length || 0}</p>
              <p><strong>{t.lastPeriod}:</strong> {partnerData.cycleStarts?.slice(-1)[0] || "—"}</p>
              <p><strong>{t.entries}:</strong> {partnerData.logs?.length || 0}</p>
              <button
                onClick={() => { saveData(partnerData as CycleData); toast.success(t.imported); }}
                className="mt-2 w-full py-2 rounded-lg bg-primary/10 text-primary text-xs font-semibold">
                {t.importToDevice}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
