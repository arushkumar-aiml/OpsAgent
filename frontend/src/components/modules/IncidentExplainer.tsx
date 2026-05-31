"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, Send, Loader2 } from "lucide-react";

export default function IncidentExplainer() {
  const [logs, setLogs] = useState("");
  const [service, setService] = useState("api-server");
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const explain = async () => {
    if (!logs.trim()) return;
    setLoading(true); setResult(null);
    try {
      const res = await fetch("/api/incident", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ logs, service }) });
      const data = await res.json();
      setResult(data.result || data.error);
    } finally { setLoading(false); }
  };

  return (
    <div style={{ padding: 32, maxWidth: 800 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
        <div style={{ width: 40, height: 40, borderRadius: 12, background: "#ff3b5c20", border: "1px solid #ff3b5c30", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <AlertTriangle size={18} color="#ff3b5c" />
        </div>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700 }}>Incident Explainer</h1>
          <p style={{ fontSize: 12, color: "var(--text-muted)" }}>Paste error logs → root cause + fix in plain English</p>
        </div>
      </div>

      <div className="glass" style={{ padding: 24, borderRadius: 16, marginBottom: 16 }}>
        <label style={{ fontSize: 12, color: "var(--text-muted)", display: "block", marginBottom: 6 }}>Service Name</label>
        <input value={service} onChange={e => setService(e.target.value)} style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid var(--border)", borderRadius: 12, padding: "8px 12px", fontSize: 13, outline: "none", color: "var(--text-primary)", marginBottom: 16 }} />
        <label style={{ fontSize: 12, color: "var(--text-muted)", display: "block", marginBottom: 8 }}>Error Logs</label>
        <textarea rows={12} value={logs} onChange={e => setLogs(e.target.value)} placeholder="[ERROR] 2024-01-15 14:23:01 Connection timeout..."
          style={{ width: "100%", background: "transparent", border: "none", outline: "none", resize: "none", fontSize: 12, color: "#ff6b6b", fontFamily: "JetBrains Mono, monospace", marginBottom: 12 }} />
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={explain}
            disabled={loading || !logs.trim()}
            style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 20px", borderRadius: 12, border: "none", background: "linear-gradient(135deg,#ff3b5c,#cc1a35)", color: "white", fontSize: 13, fontWeight: 600, cursor: "pointer", opacity: loading || !logs.trim() ? 0.5 : 1 }}>
            {loading ? <Loader2 size={14} /> : <Send size={14} />}
            {loading ? "Analyzing..." : "Explain Incident"}
          </motion.button>
        </div>
      </div>

      {result && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass" style={{ padding: 24, borderRadius: 16 }}>
          <pre style={{ fontSize: 13, fontFamily: "JetBrains Mono, monospace", whiteSpace: "pre-wrap", color: "var(--text-primary)" }}>{result}</pre>
        </motion.div>
      )}
    </div>
  );
}
