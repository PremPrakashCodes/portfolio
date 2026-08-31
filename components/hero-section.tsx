"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDownRight, ArrowRight, Radio } from "lucide-react";
import AgentPipeline from "@/components/agent-pipeline";
import MagneticAction from "@/components/magnetic-action";
import NeuralSystemCanvas from "@/components/neural-system-canvas";
import TokenResolve from "@/components/token-resolve";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end end"],
  });
  const contentY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, reduceMotion ? 0 : -42],
  );
  const contentOpacity = useTransform(
    scrollYProgress,
    [0, 0.72, 1],
    [1, 0.92, 0.18],
  );
  const architectureOpacity = useTransform(
    scrollYProgress,
    [0, 0.62, 1],
    [0, 0, 1],
  );

  return (
    <section ref={heroRef} className="ai-hero" aria-labelledby="hero-title">
      <div className="ai-hero__stage">
        <div className="ai-hero__fallback" aria-hidden="true" />
        <NeuralSystemCanvas containerRef={heroRef} />
        <div className="ai-hero__noise" aria-hidden="true" />

        <div className="ai-hero__content container mx-auto">
          <motion.div
            className="hero-copy"
            style={{ y: contentY, opacity: contentOpacity }}
          >
            <motion.div
              className="hero-identity"
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="hero-identity__mark">PP</span>
              <span>
                <strong>Prem Prakash Sharma</strong>
                <small>AI ENGINEER · BACKEND SYSTEMS</small>
              </span>
            </motion.div>

            <h1 id="hero-title" className="hero-headline">
              <span className="font-mono text-[0.78em] font-normal uppercase tracking-[-0.075em]">
                <TokenResolve text="Prem Prakash Sharma" />
              </span>
            </h1>

            <p className="hero-description">
              I build agentic workflows, observable LLM applications, and
              event-driven backends that move from promising demos to dependable
              production systems.
            </p>

            <div className="hero-actions">
              <MagneticAction>
                <Button
                  size="lg"
                  asChild
                  className="hero-action hero-action--primary !border-primary !bg-primary !text-primary-foreground hover:!bg-primary/90"
                >
                  <Link href="/projects">
                    Inspect the systems
                    <ArrowRight data-icon="inline-end" />
                  </Link>
                </Button>
              </MagneticAction>
              <MagneticAction>
                <Button
                  variant="outline"
                  size="lg"
                  asChild
                  className="hero-action"
                >
                  <a
                    href="/Prem_Prakash_Sharma_Resume.pdf"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Read my résumé
                    <ArrowDownRight data-icon="inline-end" />
                  </a>
                </Button>
              </MagneticAction>
            </div>

            <div className="hero-proof" aria-label="Engineering focus">
              <span><i /> Production AI</span>
              <span><i /> Multi-agent systems</span>
              <span><i /> Observable backends</span>
            </div>
          </motion.div>

          <div className="core-readout" aria-hidden="true">
            <span className="core-readout__eyebrow"><Radio /> RUNTIME CORE</span>
            <strong>ORCHESTRATOR_01</strong>
            <span>MODEL ROUTING / TOOL USE / STATE</span>
          </div>

          <AgentPipeline />
        </div>

        <motion.div
          className="architecture-handoff"
          style={{ opacity: architectureOpacity }}
          aria-hidden="true"
        >
          <span>UNSTRUCTURED SIGNAL</span>
          <i />
          <span>PRODUCTION ARCHITECTURE</span>
        </motion.div>
      </div>
    </section>
  );
}
