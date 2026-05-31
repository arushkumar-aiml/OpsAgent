"use client";
import { motion } from "framer-motion";
import { Zap, GitPullRequest, Mic, Terminal, TrendingUp, Clock } from "lucide-react";

const stats = [
  { label: "Meetings Analyzed", value: "24", icon: Mic, color: "#7c3aed", delta: "+3 today" },
  { label: "PRs Reviewed", value: "18", icon: GitPullRequest, color: "#ff6b2b", delta: "+5 today" },
  { label: "Incidents Resolved", value: "7", icon: Zap, color: "#00ff88", delta: "2 active" },
  { label: "Commands Run", value: "142", icon: Terminal, color: "#00f5ff", delta: "+12 today" },
];

const activity = [
  { time: "2m ago", action: "PR #142 reviewed", status: "success", score: "8.5/10" },
  { time: "15m ago", action: "Sprint planned — Q3 Sprint 4", status: "success", score: "Done" },
  { time: "32m ago", action: "Incident: API timeout explained", status: "warning", score: "RCA" },
  { time: "1h ago", action: "Meeting: Design sync analyzed", status: "success", score: "5 actions" },
  { time: "3h ago", action: "kubectl rollout restart parsed", status: "success", score: "Exec" },
];

const usage = [
  { label: "Meeting Analyzer", pct: 85, color: "#7c3aed" },
  { label: "Sprint Planner", pct: 60, color: "#00ff88" },
  { label: "PR Reviewer", pct: 75, color: "#ff6b2b" },
  { label: "DevOps Cmd", pct: 90, color: "#00f5ff" },
  { label: "Incident Explainer", pct: 40, color: "#ff3b5c" },
];

export default function Dashboard() {
  return (
    <div style={{ padding: 32 }}>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 4 }}>
          Good morning, <span className="gradient-text">Engineer</span> 👋
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: 13 }}>Your AI copilot is ready. 6 modules active.</p>
      </motion.div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 24 }}>
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div key={s.label} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }} className="glass"
              style={{ padding: 20, borderRadius: 16, position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, right: 0, width: 80, height: 80, borderRadius: "50%", background: s.color, opacity: 0.1, filter: "blur(20px)", transform: "translate(30%,-30%)" }} />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: `${s.color}20`, border: `1px solid ${s.color}30`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon size={16} color={s.color} />
                </div>
                <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 20, background: `${s.color}15`, color: s.color }} className="mono">{s.delta}</span>
              </div>
              <div style={{ fontSize: 28, fontWeight: 700, color: s.color, marginBottom: 4 }}>{s.value}</div>
              <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{s.label}</div>
            </motion.div>
          );
        })}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 16 }}>
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
          className="glass" style={{ padding: 24, borderRadius: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
            <Clock size={16} color="var(--accent-cyan)" />
            <span style={{ fontWeight: 600, fontSize: 13 }}>Recent Activity</span>
          </div>
          {activity.map((a, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + i * 0.07 }}
              style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: i < activity.length - 1 ? "1px solid var(--border)" : "none" }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: a.status === "success" ? "var(--accent-green)" : "#ff6b2b", flexShrink: 0 }} />
              <span style={{ flex: 1, fontSize: 13 }}>{a.action}</span>
              <span className="mono" style={{ fontSize: 11, padding: "2px 8px", borderRadius: 6, background: "rgba(255,255,255,0.05)", color: "var(--text-muted)" }}>{a.score}</span>
              <span style={{ fontSize: 11, color: "var(--text-muted)", width: 50, textAlign: "right" }}>{a.time}</span>
            </motion.div>
          ))}
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}
          className="glass" style={{ padding: 24, borderRadius: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
            <TrendingUp size={16} color="var(--accent-violet)" />
            <span style={{ fontWeight: 600, fontSize: 13 }}>AI Usage Today</span>
          </div>
          {usage.map((item, i) => (
            <div key={item.label} style={{ marginBottom: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontSize: 11, color: "var(--text-muted)" }}>{item.label}</span>
                <span className="mono" style={{ fontSize: 11, color: item.color }}>{item.pct}%</span>
              </div>
              <div style={{ height: 6, borderRadius: 3, background: "rgba(255,255,255,0.06)" }}>
                <motion.div initial={{ width: 0 }} animate={{ width: `${item.pct}%` }}
                  transition={{ delay: 0.6 + i * 0.1, duration: 0.8 }}
                  style={{ height: "100%", borderRadius: 3, background: `linear-gradient(90deg,${item.color}80,${item.color})` }} />
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
