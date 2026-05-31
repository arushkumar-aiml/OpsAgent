"use client";
import { motion } from "framer-motion";
import { LayoutDashboard, Mic, Zap, GitPullRequest, AlertTriangle, Terminal, ChevronRight } from "lucide-react";

const nav = [
  { icon: LayoutDashboard, label: "Dashboard", id: "dashboard", accent: "#00f5ff" },
  { icon: Mic, label: "Meeting Analyzer", id: "meeting", accent: "#7c3aed" },
  { icon: Zap, label: "Sprint Planner", id: "sprint", accent: "#00ff88" },
  { icon: GitPullRequest, label: "PR Reviewer", id: "pr", accent: "#ff6b2b" },
  { icon: AlertTriangle, label: "Incident Explainer", id: "incident", accent: "#ff3b5c" },
  { icon: Terminal, label: "DevOps Commands", id: "devops", accent: "#f0c040" },
];

export default function Sidebar({ active, setActive }: { active: string; setActive: (id: string) => void }) {
  return (
    <motion.aside
      initial={{ x: -60, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{ width: 240, minHeight: "100vh", borderRight: "1px solid var(--border)", background: "rgba(5,5,8,0.95)", display: "flex", flexDirection: "column", padding: "32px 16px" }}
    >
      <div style={{ marginBottom: 40, padding: "0 8px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: "linear-gradient(135deg,#00f5ff,#7c3aed)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Zap size={16} color="white" />
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 14, color: "var(--text-primary)" }}>OpsAgent</div>
            <div style={{ fontSize: 11, color: "var(--text-muted)" }}>AI DevOps Copilot</div>
          </div>
        </div>
      </div>

      <nav style={{ display: "flex", flexDirection: "column", gap: 4, flex: 1 }}>
        {nav.map((item, i) => {
          const Icon = item.icon;
          const isActive = active === item.id;
          return (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06 }}
              onClick={() => setActive(item.id)}
              whileHover={{ x: 2 }}
              whileTap={{ scale: 0.98 }}
              style={{
                width: "100%", display: "flex", alignItems: "center", gap: 10,
                padding: "10px 12px", borderRadius: 12, border: isActive ? `1px solid ${item.accent}30` : "1px solid transparent",
                background: isActive ? `${item.accent}15` : "transparent",
                color: isActive ? item.accent : "var(--text-muted)",
                fontSize: 13, fontWeight: 500, cursor: "pointer", textAlign: "left",
              }}
            >
              <Icon size={16} color={isActive ? item.accent : "var(--text-muted)"} />
              <span style={{ flex: 1 }}>{item.label}</span>
              {isActive && <ChevronRight size={12} color={item.accent} />}
            </motion.button>
          );
        })}
      </nav>

      <div style={{ padding: "16px 8px 0", borderTop: "1px solid var(--border)" }}>
        <div className="glass" style={{ padding: "8px 12px", borderRadius: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div className="animate-pulse-glow" style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--accent-green)" }} />
            <span style={{ fontSize: 11, color: "var(--text-muted)" }}>Groq API Connected</span>
          </div>
        </div>
      </div>
    </motion.aside>
  );
}
