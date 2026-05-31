"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Mic, Send, Loader2, CheckCircle } from "lucide-react";

export default function MeetingAnalyzer() {
  const [transcript, setTranscript] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyze = async () => {
    if (!transcript.trim()) return;
    setLoading(true); setError(null); setResult(null);
    try {
      const res = await fetch("/api/meeting", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ transcript }) });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setResult(data.result);
    } catch (e: any) { setError(e.message); }
    finally { setLoading(false); }
  };

  return (
    <div style={{ padding: 32, maxWidth: 800 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
        <div style={{ width: 40, height: 40, borderRadius: 12, background: "#7c3aed20", border: "1px solid #7c3aed30", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Mic size={18} color="#7c3aed" />
        </div>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700 }}>Meeting Analyzer</h1>
          <p style={{ fontSize: 12, color: "var(--text-muted)" }}>Paste transcript → get decisions, actions, blockers</p>
        </div>
      </div>

      <div className="glass" style={{ padding: 24, borderRadius: 16, marginBottom: 16 }}>
        <label style={{ fontSize: 12, color: "var(--text-muted)", display: "block", marginBottom: 8 }}>Meeting Transcript</label>
        <textarea rows={10} value={transcript} onChange={e => setTranscript(e.target.value)}
          placeholder="Paste your meeting transcript here..."
          style={{ width: "100%", background: "transparent", border: "none", outline: "none", resize: "none", fontSize: 13, color: "var(--text-primary)", fontFamily: "JetBrains Mono, monospace" }} />
        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 12 }}>
          <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={analyze}
            disabled={loading || !transcript.trim()}
            style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 20px", borderRadius: 12, border: "none", background: "linear-gradient(135deg,#7c3aed,#5b21b6)", color: "white", fontSize: 13, fontWeight: 600, cursor: "pointer", opacity: loading || !transcript.trim() ? 0.5 : 1 }}>
            {loading ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
            {loading ? "Analyzing..." : "Analyze Meeting"}
          </motion.button>
        </div>
      </div>

      {error && <div className="glass" style={{ padding: 16, borderRadius: 12, border: "1px solid #ff3b5c50", color: "#ff3b5c", marginBottom: 16 }}>⚠ {error}</div>}

      {result && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass" style={{ padding: 24, borderRadius: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
            <CheckCircle size={16} color="var(--accent-green)" />
            <span style={{ fontSize: 13, fontWeight: 600 }}>Analysis Result</span>
          </div>
          <pre style={{ fontSize: 13, fontFamily: "JetBrains Mono, monospace", whiteSpace: "pre-wrap", color: "var(--text-primary)" }}>{result}</pre>
        </motion.div>
      )}
    </div>
  );
}
