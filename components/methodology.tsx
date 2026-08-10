"use client";

import { motion, useMotionValue, useMotionValueEvent, useTransform, type MotionValue } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Cpu, Brain, BarChart2, Map } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Step = { title: string; copy: string; icon: LucideIcon };

const steps: Step[] = [
  {
    title: "Modelldesign",
    copy: "3 SNNs und 3 Transformer mit je 1–5 Mio. Parametern. Parametergleiche Paare ermöglichen direkten Effizienzvergleich ohne Genauigkeitsverzerrung.",
    icon: Cpu,
  },
  {
    title: "Training & Evaluation",
    copy: "Alle Modelle trainiert auf SST-2 (Stanford Sentiment Treebank). Ergebnis: 79–84% Genauigkeit auf dem Dev-Set, vergleichbar über alle Architekturen.",
    icon: Brain,
  },
  {
    title: "SynOps / MACs Messung",
    copy: "SynOps (SNN) vs. MACs (Transformer) pro Inferenz gemessen. Verhältnis 32–39:1 über alle parametergleichen Paare. Basis für das Energiemodell.",
    icon: BarChart2,
  },
  {
    title: "Kipppunkt-Analyse",
    copy: "Energiemodell nach Horowitz (2014): FP32-MAC = 4,6 pJ, INT8-MAC = 0,23 pJ. Kipppunkt vs. INT8 bei ~7–9 pJ/Spike. Effizienz-Landkarte über pJ/Spike × Präzision.",
    icon: Map,
  },
];

function Node({ progress, at, Icon }: { progress: MotionValue<number>; at: number; Icon: LucideIcon }) {
  const start = Math.max(0, at - 0.12);
  const mid = Math.min(1, at + 0.02);
  const scale = useTransform(progress, [start, mid], [0.6, 1]);
  const opacity = useTransform(progress, [start, mid], [0.25, 1]);
  const ringOpacity = useTransform(progress, [start, mid], [0, 1]);
  const [reached, setReached] = useState(false);

  useMotionValueEvent(progress, "change", (v) => setReached(v >= mid - 0.001));

  return (
    <div className="relative grid place-items-center">
      <span className="absolute h-14 w-14 rounded-full bg-background" />
      <motion.span style={{ opacity: ringOpacity }} className="absolute h-14 w-14 rounded-full ring-[6px] ring-foreground/10" />
      {reached && (
        <motion.span
          aria-hidden
          className="absolute h-12 w-12 rounded-full bg-[#cc66cc]/40"
          initial={{ scale: 1, opacity: 0.5 }}
          animate={{ scale: 1.8, opacity: 0 }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
        />
      )}
      <motion.span
        style={{ scale, opacity }}
        animate={reached ? { backgroundColor: "#cc66cc", color: "#ffffff" } : {}}
        transition={{ duration: 0.35 }}
        className="relative grid place-items-center h-12 w-12 rounded-full bg-foreground/10 text-foreground"
      >
        <Icon className="h-5 w-5" />
      </motion.span>
    </div>
  );
}

function Card({ step, side }: { step: Step; side: "left" | "right" }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20%" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`w-full md:w-[44%] rounded-3xl bg-background border border-border shadow-sm overflow-hidden ${side === "left" ? "md:mr-auto" : "md:ml-auto"}`}
    >
      <div className="p-6 sm:p-8">
        <h3 className="text-lg sm:text-xl font-semibold text-foreground">{step.title}</h3>
        <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed">{step.copy}</p>
      </div>
    </motion.article>
  );
}

export function Methodology() {
  const ref = useRef<HTMLDivElement>(null);
  const firstNodeRef = useRef<HTMLDivElement>(null);
  const lastNodeRef = useRef<HTMLDivElement>(null);
  const scrollYProgress = useMotionValue(0);
  const [lineBounds, setLineBounds] = useState({ top: 0, height: 0 });

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const container = ref.current;
      const first = firstNodeRef.current;
      const last = lastNodeRef.current;
      if (container && first && last) {
        const win = window;
        const vh = win.innerHeight;
        const containerRect = container.getBoundingClientRect();
        const firstRect = first.getBoundingClientRect();
        const lastRect = last.getBoundingClientRect();
        const firstCenterY = firstRect.top + firstRect.height / 2;
        const lastCenterY = lastRect.top + lastRect.height / 2;
        const activate = vh * 0.55;
        const span = lastCenterY - firstCenterY;
        if (span > 0) scrollYProgress.set(Math.min(1, Math.max(0, (activate - firstCenterY) / span)));
        const top = firstCenterY - containerRect.top;
        const height = lastCenterY - firstCenterY;
        setLineBounds((prev) => (prev.top === top && prev.height === height ? prev : { top, height }));
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [scrollYProgress]);

  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="methodik" className="relative w-full flex items-start py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-background overflow-hidden">
      <div className="relative max-w-[1200px] mx-auto w-full flex flex-col items-center">
        <motion.p
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.4 }}
          className="text-xs tracking-[0.2em] text-muted-foreground uppercase"
        >
          Methodik
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
          className="mt-6 text-3xl sm:text-5xl md:text-6xl font-medium text-foreground text-center tracking-tight leading-[1.05] max-w-xl"
        >
          Vier Schritte zur Effizienz-Landkarte
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-5 max-w-sm text-center text-base text-muted-foreground"
        >
          Von parametergleichen Modellpaaren bis zum Kipppunkt über Energie pro Spike.
        </motion.p>

        <div ref={ref} className="relative mt-20 sm:mt-28 w-full">
          <div aria-hidden style={{ top: lineBounds.top, height: lineBounds.height }} className="absolute left-1/2 -translate-x-1/2 w-px border-l border-dashed border-border" />
          <motion.div aria-hidden style={{ top: lineBounds.top, height: lineBounds.height, scaleY: lineScale, transformOrigin: "top" }} className="absolute left-1/2 -translate-x-1/2 w-px bg-[#cc66cc]" />

          <div className="flex flex-col gap-16 sm:gap-24">
            {steps.map((step, i) => {
              const side: "left" | "right" = i % 2 === 0 ? "left" : "right";
              const at = i / Math.max(1, steps.length - 1);
              return (
                <div key={step.title} className="relative flex flex-col items-center">
                  <div ref={i === 0 ? firstNodeRef : i === steps.length - 1 ? lastNodeRef : undefined} className="relative z-10">
                    <Node progress={scrollYProgress} at={at} Icon={step.icon} />
                  </div>
                  <div className="mt-8 w-full flex">
                    <Card step={step} side={side} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
