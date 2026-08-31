"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { Braces, Check, Cpu, Route, Wrench } from "lucide-react";
import { cn } from "@/lib/utils";

const stages = [
  { label: "Input", detail: "intent.json", activity: "parsing request", icon: Braces },
  { label: "Reasoning", detail: "plan · 4 steps", activity: "building plan", icon: Route },
  { label: "Tools", detail: "3 connected", activity: "selecting tool", icon: Wrench },
  { label: "Execution", detail: "sandboxed", activity: "running action", icon: Cpu },
  { label: "Result", detail: "verified", activity: "validating output", icon: Check },
] as const;

export default function AgentPipeline() {
  const [active, setActive] = useState(0);
  const [cycle, setCycle] = useState(0);
  const [verified, setVerified] = useState(false);
  const reduceMotion = useReducedMotion();
  const elementRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(elementRef, { amount: 0.45 });

  useEffect(() => {
    if (reduceMotion || !isInView) return;
    setVerified(false);

    if (active === stages.length - 1) {
      const verifyTimer = window.setTimeout(() => setVerified(true), 820);
      const resetTimer = window.setTimeout(() => {
        setCycle((current) => current + 1);
        setActive(0);
      }, 1850);
      return () => {
        window.clearTimeout(verifyTimer);
        window.clearTimeout(resetTimer);
      };
    }

    const timer = window.setTimeout(
      () => setActive((current) => current + 1),
      1350,
    );
    return () => window.clearTimeout(timer);
  }, [active, reduceMotion, isInView]);

  const activeStage = stages[active];

  return (
    <motion.div
      ref={elementRef}
      className="agent-trace"
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.45, duration: 0.65 }}
    >
      <div className="agent-trace__header">
        <span className="agent-trace__title">LIVE AGENT TRACE <i>RUN_{String(cycle + 1).padStart(2, "0")}</i></span>
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={`${cycle}-${active}`}
            className="agent-trace__telemetry"
            initial={reduceMotion ? false : { opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
          >
            STEP {String(active + 1).padStart(2, "0")}/{String(stages.length).padStart(2, "0")} · {verified ? "output accepted" : activeStage.activity}
          </motion.span>
        </AnimatePresence>
        <span className={cn("agent-trace__status", verified && "agent-trace__status--verified")}>
          <i /> {verified ? "VERIFIED" : active === stages.length - 1 ? "VERIFYING" : "RUNNING"}
        </span>
        <motion.span
          key={`progress-${cycle}-${active}`}
          className="agent-trace__runline"
          initial={{ scaleX: active / stages.length }}
          animate={{ scaleX: (active + 1) / stages.length }}
          transition={{ duration: active === stages.length - 1 ? 1.45 : 1.08, ease: "easeInOut" }}
        />
      </div>
      <ol className="agent-trace__stages" aria-label="AI agent processing workflow">
        {stages.map((stage, index) => {
          const Icon = stage.icon;
          const isActive = reduceMotion || index === active;
          const isVerifiedStage = index === stages.length - 1 && verified;
          const isComplete = reduceMotion || index < active || isVerifiedStage;
          const isQueued = !reduceMotion && index > active;

          return (
            <motion.li
              key={stage.label}
              className={cn(
                "agent-stage",
                isActive && "agent-stage--active",
                isComplete && "agent-stage--complete",
                isQueued && "agent-stage--queued",
                index === stages.length - 1 && "agent-stage--result",
                isVerifiedStage && "agent-stage--verified",
              )}
              aria-current={index === active ? "step" : undefined}
              animate={
                reduceMotion
                  ? undefined
                  : isActive
                    ? { backgroundColor: ["rgba(180,248,71,0)", "rgba(180,248,71,0.045)", "rgba(180,248,71,0)"] }
                    : { backgroundColor: "rgba(180,248,71,0)" }
              }
              transition={{ duration: 1.25, ease: "easeOut" }}
            >
              {isActive && !reduceMotion && (
                <motion.span
                  key={`scan-${cycle}-${index}`}
                  className="agent-stage__scan"
                  initial={{ x: "-100%", opacity: 0 }}
                  animate={{ x: "340%", opacity: [0, 0.65, 0] }}
                  transition={{ duration: 1.05, ease: "easeInOut" }}
                  aria-hidden="true"
                />
              )}
              <motion.div
                className="agent-stage__icon"
                animate={
                  reduceMotion
                    ? undefined
                    : isActive
                      ? { scale: [1, 1.08, 1] }
                      : { scale: 1 }
                }
                transition={{ duration: 0.55, ease: "easeOut" }}
              >
                <Icon aria-hidden="true" />
                {isActive && !reduceMotion && (
                  <motion.i
                    key={`orbit-${cycle}-${index}`}
                    className="agent-stage__orbit"
                    initial={{ rotate: 0, opacity: 0 }}
                    animate={{ rotate: 180, opacity: [0, 1, 0] }}
                    transition={{ duration: 1.2, ease: "linear" }}
                  />
                )}
              </motion.div>
              <div className="agent-stage__copy">
                <span className="agent-stage__index">0{index + 1}</span>
                <strong>{stage.label}</strong>
                <small>{stage.detail}</small>
              </div>
              <span className="agent-stage__state" aria-hidden="true">
                {isVerifiedStage ? "PASS" : isComplete ? "DONE" : isActive ? "BUSY" : "WAIT"}
              </span>
              <motion.span
                key={`local-${cycle}-${index}`}
                className="agent-stage__progress"
                initial={{ scaleX: isComplete ? 1 : 0 }}
                animate={{ scaleX: isComplete || isActive ? 1 : 0 }}
                transition={{ duration: isActive ? 1.06 : 0.2, ease: "easeInOut" }}
                aria-hidden="true"
              />
              {index < stages.length - 1 && (
                <span
                  className={cn(
                    "agent-stage__connector",
                    isComplete && "agent-stage__connector--complete",
                    index === active && "agent-stage__connector--transmitting",
                  )}
                  aria-hidden="true"
                >
                  <i className="agent-stage__connector-fill" />
                  <i className="agent-stage__packet" />
                </span>
              )}
            </motion.li>
          );
        })}
      </ol>
      <span className="sr-only">
        Animated example of an AI agent moving from input through reasoning,
        tools, execution, and a verified result.
      </span>
    </motion.div>
  );
}
