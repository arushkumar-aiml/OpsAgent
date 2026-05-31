"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Zap, Send, Loader2, CheckCircle } from "lucide-react";

export default function SprintPlanner() {
  const [goals, setGoals] = useState("");
  const [teamSize, setTeamSize] = useState(4);
  const [duration, setDuration] = useState(14);
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const plan = async () => {
    if (!goals.trim()) return;
    setLoading(true); setResult(null);
    try {
      const res = await fetch("/api/sprint", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ goals, team_size: teamSize, duration_days: duration }) });
      const data = await res.json();
      setResult(data.result || data.error);
    } finally { setLoading(false); }
  };

  const inputStyle = { width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid var(--border)", borderRadius: 12, padding: "8px 12px", fontSize: 13, outline: "none", color: "var(--text-primary)", fontFamily: "JetBrains Mono, monospace" };

  return (
    <div style={{ padding: 32, maxWidth: 800 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
        <div style={{ width: 40, height: 40, borderRadius: 12, background: "#00ff8820", border: "1px solid #00ff8830", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Zap size={18} color="#00ff88" />
        </div>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700 }}>Smart Sprint Planner</h1>
          <p style={{ fontSize: 12, color: "var(--text-muted)" }}>AI-generated sprint plans from your goals</p>
        </div>
      </div>

      <div className="glass" style={{ padding: 24, borderRadius: 16, marginBottom: 16 }}>
        <label style={{ fontSize: 12, color: "var(--text-muted)", display: "block", marginBottom: 8 }}>Sprint Goals</label>
        <textarea rows={5} value={goals} onChange={e => setGoals(e.target.value)}
          placeholder="e.g. Build user auth, redesign dashboard, fix payment bugs..."
          style={{ width: "100%", background: "transparent", border: "none", outline: "none", resize: "none", fontSize: 13, color: "var(--text-primary)", marginBottom: 16 }} />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
          <div>
            <label style={{ fontSize: 12, color: "var(--text-muted)", display: "block", marginBottom: 6 }}>Team Size</label>
            <input type="number" value={teamSize} onChange={e => setTeamSize(+e.target.value)} min={1} max={20} style={inputStyle} />
          </div>
          <div>
            <label style={{ fontSize: 12, color: "var(--text-muted)", display: "block", marginBottom: 6 }}>Duration (days)</label>
            <input type="number" value={duration} onChange={e => setDuration(+e.target.value)} min={3} max={60} style={inputStyle} />
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={plan}
            disabled={loading || !goals.trim()}
            style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 20px", borderRadius: 12, border: "none", background: "linear-gradient(135deg,#00ff88,#00b36b)", color: "#050508", fontSize: 13, fontWeight: 600, cursor: "pointer", opacity: loading || !goals.trim() ? 0.5 : 1 }}>
            {loading ? <Loader2 size={14} /> : <Send size={14} />}
            {loading ? "Planning..." : "Generate Sprint Plan"}
          </motion.button>
        </div>
      </div>

      {result && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass" style={{ padding: 24, borderRadius: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
            <CheckCircle size={16} color="var(--accent-green)" />
            <span style={{ fontSize: 13, fontWeight: 600 }}>Sprint Plan Generated</span>
          </div>
          <pre style={{ fontSize: 13, fontFamily: "JetBrains Mono, monospace", whiteSpace: "pre-wrap", color: "var(--text-primary)" }}>{result}</pre>
        </motion.div>
      )}
    </div>
  );
}
