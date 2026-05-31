"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { GitPullRequest, Send, Loader2, CheckCircle } from "lucide-react";

const langs = ["python","typescript","javascript","go","rust","java","ruby"];

export default function PRReviewer() {
  const [diff, setDiff] = useState("");
  const [lang, setLang] = useState("typescript");
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const review = async () => {
    if (!diff.trim()) return;
    setLoading(true); setResult(null);
    try {
      const res = await fetch("/api/pr", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ diff, language: lang }) });
      const data = await res.json();
      setResult(data.result || data.error);
    } finally { setLoading(false); }
  };

  return (
    <div style={{ padding: 32, maxWidth: 800 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
        <div style={{ width: 40, height: 40, borderRadius: 12, background: "#ff6b2b20", border: "1px solid #ff6b2b30", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <GitPullRequest size={18} color="#ff6b2b" />
        </div>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700 }}>AI PR Reviewer</h1>
          <p style={{ fontSize: 12, color: "var(--text-muted)" }}>Paste git diff → instant senior review</p>
        </div>
      </div>

      <div className="glass" style={{ padding: 24, borderRadius: 16, marginBottom: 16 }}>
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 12, color: "var(--text-muted)", display: "block", marginBottom: 8 }}>Language</label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {langs.map(l => (
              <button key={l} onClick={() => setLang(l)} style={{ padding: "4px 12px", borderRadius: 8, fontSize: 12, fontFamily: "JetBrains Mono, monospace", cursor: "pointer", background: lang === l ? "#ff6b2b20" : "rgba(255,255,255,0.04)", border: `1px solid ${lang === l ? "#ff6b2b50" : "var(--border)"}`, color: lang === l ? "#ff6b2b" : "var(--text-muted)" }}>{l}</button>
            ))}
          </div>
        </div>
        <label style={{ fontSize: 12, color: "var(--text-muted)", display: "block", marginBottom: 8 }}>Git Diff</label>
        <textarea rows={12} value={diff} onChange={e => setDiff(e.target.value)} placeholder="Paste your git diff here..."
          style={{ width: "100%", background: "transparent", border: "none", outline: "none", resize: "none", fontSize: 12, color: "#00ff88", fontFamily: "JetBrains Mono, monospace", marginBottom: 12 }} />
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={review}
            disabled={loading || !diff.trim()}
            style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 20px", borderRadius: 12, border: "none", background: "linear-gradient(135deg,#ff6b2b,#cc4400)", color: "white", fontSize: 13, fontWeight: 600, cursor: "pointer", opacity: loading || !diff.trim() ? 0.5 : 1 }}>
            {loading ? <Loader2 size={14} /> : <Send size={14} />}
            {loading ? "Reviewing..." : "Review PR"}
          </motion.button>
        </div>
      </div>

      {result && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass" style={{ padding: 24, borderRadius: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
            <CheckCircle size={16} color="#ff6b2b" />
            <span style={{ fontSize: 13, fontWeight: 600 }}>Review Complete</span>
          </div>
          <pre style={{ fontSize: 13, fontFamily: "JetBrains Mono, monospace", whiteSpace: "pre-wrap", color: "var(--text-primary)" }}>{result}</pre>
        </motion.div>
      )}
    </div>
  );
}
