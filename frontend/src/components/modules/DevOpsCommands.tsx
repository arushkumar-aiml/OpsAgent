"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Terminal, Send, Loader2, Copy, Check } from "lucide-react";

const examples = ["restart nginx without downtime","check which process is using port 8080","find all files larger than 1GB","show last 100 lines of error logs"];

export default function DevOpsCommands() {
  const [command, setCommand] = useState("");
  const [context, setContext] = useState("linux server");
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const run = async () => {
    if (!command.trim()) return;
    setLoading(true); setResult(null);
    try {
      const res = await fetch("/api/devops", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ command, context }) });
      const data = await res.json();
      setResult(data.result || data.error);
    } finally { setLoading(false); }
  };

  const copy = () => { if (result) { navigator.clipboard.writeText(result); setCopied(true); setTimeout(() => setCopied(false), 2000); } };

  return (
    <div style={{ padding: 32, maxWidth: 800 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
        <div style={{ width: 40, height: 40, borderRadius: 12, background: "#f0c04020", border: "1px solid #f0c04030", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Terminal size={18} color="#f0c040" />
        </div>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700 }}>Natural Language DevOps</h1>
          <p style={{ fontSize: 12, color: "var(--text-muted)" }}>Say what you want → get the exact shell command</p>
        </div>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
        {examples.map(ex => (
          <button key={ex} onClick={() => setCommand(ex)} style={{ fontSize: 11, padding: "6px 12px", borderRadius: 8, border: "1px solid rgba(240,192,64,0.2)", background: "rgba(240,192,64,0.08)", color: "#f0c040", cursor: "pointer", fontFamily: "JetBrains Mono, monospace" }}>{ex}</button>
        ))}
      </div>

      <div className="glass" style={{ padding: 24, borderRadius: 16, marginBottom: 16 }}>
        <label style={{ fontSize: 12, color: "var(--text-muted)", display: "block", marginBottom: 6 }}>Context</label>
        <input value={context} onChange={e => setContext(e.target.value)} style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid var(--border)", borderRadius: 12, padding: "8px 12px", fontSize: 13, outline: "none", color: "var(--text-primary)", marginBottom: 12 }} />
        <div style={{ display: "flex", gap: 12 }}>
          <input value={command} onChange={e => setCommand(e.target.value)} onKeyDown={e => e.key === "Enter" && run()}
            placeholder="e.g. show disk usage for each folder..."
            style={{ flex: 1, background: "rgba(240,192,64,0.08)", border: "1px solid rgba(240,192,64,0.3)", borderRadius: 12, padding: "10px 16px", fontSize: 13, outline: "none", color: "#f0c040", fontFamily: "JetBrains Mono, monospace" }} />
          <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={run}
            disabled={loading || !command.trim()}
            style={{ padding: "10px 16px", borderRadius: 12, border: "none", background: "linear-gradient(135deg,#f0c040,#cc9900)", color: "#050508", cursor: "pointer", display: "flex", alignItems: "center", opacity: loading || !command.trim() ? 0.5 : 1 }}>
            {loading ? <Loader2 size={15} /> : <Send size={15} />}
          </motion.button>
        </div>
      </div>

      {result && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass" style={{ padding: 24, borderRadius: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <span style={{ fontSize: 13, fontWeight: 600 }}>Command Ready</span>
            <button onClick={copy} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, padding: "4px 12px", borderRadius: 8, border: "1px solid var(--border)", background: "rgba(255,255,255,0.05)", color: "var(--text-muted)", cursor: "pointer" }}>
              {copied ? <Check size={12} /> : <Copy size={12} />} {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          <pre style={{ fontSize: 13, fontFamily: "JetBrains Mono, monospace", whiteSpace: "pre-wrap", color: "#f0c040" }}>{result}</pre>
        </motion.div>
      )}
    </div>
  );
}
