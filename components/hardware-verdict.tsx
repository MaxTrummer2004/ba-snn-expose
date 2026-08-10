"use client";

import { useEffect, useRef } from "react";
import { animate, motion, useReducedMotion, type Variants } from "motion/react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const scenarios = [
  { label: "0,9 pJ/Spike (Low-Power Edge)", sub: "SNN 185× effizienter als FP32-Transformer", value: 94 },
  { label: "7–9 pJ/Spike (Kipppunkt INT8)", sub: "Breakeven-Zone, Ergebnis hängt von genauen pJ ab", value: 52 },
  { label: "23,6 pJ/Spike (Intel Loihi)", sub: "INT8-Transformer effizienter, SNN-Nachteil auf realer Hardware", value: 17 },
];

const listVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const rowVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

function CountUp({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const shouldReduceMotion = useReducedMotion();
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (shouldReduceMotion) { el.textContent = String(value); return; }
    const controls = animate(0, value, {
      duration: 1.2, ease: EASE,
      onUpdate: (v) => { el.textContent = String(Math.round(v)); },
    });
    return () => controls.stop();
  }, [value, shouldReduceMotion]);
  return <span ref={ref}>0</span>;
}

function Ring({ value, strokeWidth, progressClass, className, track = true, delay = 0 }: {
  value: number; strokeWidth: number; progressClass: string;
  className?: string; track?: boolean; delay?: number;
}) {
  const shouldReduceMotion = useReducedMotion();
  const radius = 50 - strokeWidth / 2 - 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - value / 100);

  return (
    <svg viewBox="0 0 100 100" className={`-rotate-90 ${className ?? ""}`} aria-hidden="true">
      {track && (
        <circle cx="50" cy="50" r={radius} fill="none" stroke="currentColor" strokeWidth={strokeWidth} className="text-border" />
      )}
      <motion.circle
        cx="50" cy="50" r={radius} fill="none" stroke="currentColor"
        strokeWidth={strokeWidth} strokeLinecap="round" strokeDasharray={circumference}
        initial={{ strokeDashoffset: shouldReduceMotion ? offset : circumference }}
        whileInView={{ strokeDashoffset: offset }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1.2, ease: EASE, delay }}
        className={progressClass}
      />
    </svg>
  );
}

export function HardwareVerdict() {
  return (
    <section className="w-full py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-[1400px] mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7, ease: EASE }}
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight leading-tight text-foreground">
                Wo SNN gewinnt. Und wo nicht.
              </h2>
              <p className="mt-5 max-w-xl text-base sm:text-lg leading-relaxed text-muted-foreground">
                Der SNN-Vorteil ist eine Funktion der Hardware. Auf welchem Chip deployt wird, entscheidet ob SNNs oder INT8-Transformer die effizientere Wahl sind.
              </p>
            </motion.div>

            <motion.ul
              variants={listVariants} initial="hidden" whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="mt-10 border-y border-border divide-y divide-border"
            >
              {scenarios.map((s) => (
                <motion.li key={s.label} variants={rowVariants} className="flex items-center gap-5 py-6">
                  <div className="h-12 w-12 shrink-0">
                    <Ring value={s.value} strokeWidth={9} className="h-full w-full" progressClass="text-[#cc66cc]" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-base font-semibold text-foreground">{s.label}</h3>
                    <p className="mt-0.5 text-sm text-muted-foreground">{s.sub}</p>
                  </div>
                  <div className="shrink-0 text-2xl sm:text-3xl font-semibold tracking-tight tabular-nums text-foreground">
                    <CountUp value={s.value} />
                    <span className="ml-0.5 text-base font-medium text-muted-foreground">%</span>
                  </div>
                </motion.li>
              ))}
            </motion.ul>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7, ease: EASE }}
          >
            <div className="relative mx-auto w-full max-w-[20rem] sm:max-w-[24rem]">
              <Ring value={84} strokeWidth={5} className="h-auto w-full" progressClass="text-[#cc66cc]" />
              <Ring value={79} strokeWidth={2.5} track={false} delay={0.2}
                className="absolute left-1/2 top-1/2 w-[76%] -translate-x-1/2 -translate-y-1/2"
                progressClass="text-foreground/30"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-6xl sm:text-7xl font-semibold tracking-tight tabular-nums text-foreground">
                  <CountUp value={84} />
                  <span className="text-3xl sm:text-4xl font-medium text-muted-foreground">%</span>
                </div>
                <p className="mt-2 max-w-[11rem] text-center text-sm text-muted-foreground">
                  höchste Genauigkeit aller 6 Modelle
                </p>
              </div>
            </div>
            <div className="mt-8 flex items-center justify-center gap-8">
              <div className="flex items-center gap-2.5">
                <span className="h-2 w-2 rounded-full bg-foreground" />
                <span className="text-sm font-medium tabular-nums text-muted-foreground">Modell max · 84%</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="h-2 w-2 rounded-full bg-foreground/30" />
                <span className="text-sm font-medium tabular-nums text-muted-foreground">Modell min · 79%</span>
              </div>
            </div>
            <p className="mt-3 text-center text-xs text-muted-foreground">
              Gemessen über 3 Modellpaare, 3 SNNs + 3 Transformer
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
