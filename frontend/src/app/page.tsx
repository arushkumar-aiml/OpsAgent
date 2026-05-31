"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "@/components/Sidebar";
import Dashboard from "@/components/Dashboard";
import dynamic from "next/dynamic";

const MeetingAnalyzer = dynamic(() => import("@/components/modules/MeetingAnalyzer"), { ssr: false });
const SprintPlanner = dynamic(() => import("@/components/modules/SprintPlanner"), { ssr: false });
const PRReviewer = dynamic(() => import("@/components/modules/PRReviewer"), { ssr: false });
const IncidentExplainer = dynamic(() => import("@/components/modules/IncidentExplainer"), { ssr: false });
const DevOpsCommands = dynamic(() => import("@/components/modules/DevOpsCommands"), { ssr: false });

const moduleMap: Record<string, any> = {
  meeting: MeetingAnalyzer,
  sprint: SprintPlanner,
  pr: PRReviewer,
  incident: IncidentExplainer,
  devops: DevOpsCommands,
};

export default function Home() {
  const [active, setActive] = useState("dashboard");
  const ActiveModule = moduleMap[active];

  return (
    <div className="flex min-h-screen grid-bg">
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute w-96 h-96 rounded-full blur-3xl animate-float"
          style={{ background: "var(--accent-cyan)", opacity: 0.05, top: "-10%", left: "-10%" }} />
        <div className="absolute w-80 h-80 rounded-full blur-3xl animate-float"
          style={{ background: "var(--accent-violet)", opacity: 0.05, bottom: "10%", right: "-5%", animationDelay: "2s" }} />
      </div>
      <div className="relative z-10 flex w-full">
        <Sidebar active={active} setActive={setActive} />
        <main className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.25 }}
              className="min-h-screen"
            >
              {active === "dashboard" ? <Dashboard /> : ActiveModule ? <ActiveModule /> : null}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
