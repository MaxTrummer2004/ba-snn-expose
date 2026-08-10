"use client";

import { useEffect, useRef } from "react";
import { animate, motion, useReducedMotion, type Variants } from "motion/react";
import { Zap, FlaskConical } from "lucide-react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const rates = [
  { label: "SNN vs. FP32 (0,9 pJ/Spike)", value: 185, suffix: "×", width: 100, featured: true },
  { label: "Kipppunkt vs. INT8", value: 8.3, suffix: " pJ", width: 30, featured: false },
  { label: "SNN vs. INT8 (Loihi, 23,6 pJ)", value: 0.4, suffix: "×", width: 9, featured: false },
];

const columns = [
  { label: "FP32-Transformer", value: 185, barClass: "h-52 sm:h-60", featured: false },
  { label: "SNN (0,9 pJ/Spike)", value: 1, barClass: "h-4", featured: true },
];

const gridVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cellVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE, when: "beforeChildren", staggerChildren: 0.12 } },
};

const growX: Variants = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1, transition: { duration: 0.9, ease: EASE } },
};

const growY: Variants = {
  hidden: { scaleY: 0 },
  visible: { scaleY: 1, transition: { duration: 0.9, ease: EASE } },
};

const fade: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: EASE } },
};

function CountUp({ value, decimals = 0 }: { value: number; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const shouldReduceMotion = useReducedMotion();
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (shouldReduceMotion) { el.textContent = value.toFixed(decimals); return; }
    const controls = animate(0, value, {
      duration: 1.2, ease: EASE,
      onUpdate: (v) => { el.textContent = v.toFixed(decimals); },
    });
    return () => controls.stop();
  }, [value, decimals, shouldReduceMotion]);
  return <span ref={ref}>{(0).toFixed(decimals)}</span>;
}

export function ResultsEnergy() {
  return (
    <section id="ergebnisse" className="w-full py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-[1400px] mx-auto w-full">
        <motion.div
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4"
        >
          <motion.div variants={cellVariants} className="flex min-h-[340px] max-md:min-h-0 flex-col rounded-3xl bg-muted p-8 sm:p-10 lg:p-12">
            <div className="flex items-center gap-2.5">
              <Zap className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">Energieeffizienz</span>
            </div>
            <h2 className="mt-8 max-w-md text-3xl sm:text-4xl font-medium tracking-tight leading-[1.15] text-foreground">
              Der Vorteil ist real. Aber bedingt.
            </h2>
            <p className="mt-8 max-w-md text-base sm:text-lg leading-relaxed text-muted-foreground">
              SNNs sind nicht bedingungslos effizienter. Der Vorteil hängt von der Energie pro Spike der Zielhardware ab, und davon, ob gegen FP32 oder INT8 verglichen wird.
            </p>
          </motion.div>

          <motion.div variants={cellVariants} className="flex min-h-[340px] max-md:min-h-0 flex-col rounded-3xl bg-muted p-8 sm:p-10 lg:p-12">
            <div className="flex flex-1 flex-col justify-center gap-8 sm:gap-9">
              {rates.map((rate) => (
                <div key={rate.label}>
                  <div className="flex items-baseline justify-between gap-6">
                    <span className={rate.featured ? "text-sm sm:text-base font-semibold text-foreground" : "text-sm sm:text-base font-medium text-muted-foreground"}>
                      {rate.label}
                    </span>
                    <span className={`shrink-0 tabular-nums tracking-tight ${rate.featured ? "text-4xl sm:text-5xl font-semibold text-[#cc66cc]" : "text-2xl sm:text-3xl font-medium text-muted-foreground"}`}>
                      <CountUp value={rate.value} decimals={rate.featured ? 0 : 1} />
                      <span className={rate.featured ? "ml-1 text-xl sm:text-2xl font-medium text-muted-foreground" : "ml-1 text-base sm:text-lg text-muted-foreground"}>
                        {rate.suffix}
                      </span>
                    </span>
                  </div>
                  <div className="mt-3">
                    <motion.div
                      variants={growX}
                      style={{ transformOrigin: "left", width: `${rate.width}%` }}
                      className={`h-2.5 rounded-full ${rate.featured ? "bg-[#cc66cc]" : "bg-foreground/25"}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={cellVariants} className="flex min-h-[340px] max-md:min-h-0 items-center rounded-3xl bg-muted p-8 sm:p-10 lg:p-12">
            <div className="flex w-full items-end justify-center gap-10 sm:gap-14">
              {columns.map((col) => (
                <div key={col.label} className="flex w-full max-w-[8.5rem] flex-col items-center">
                  <motion.span variants={fade} className={`mb-4 text-2xl sm:text-3xl font-semibold tracking-tight tabular-nums ${col.featured ? "text-foreground" : "text-muted-foreground"}`}>
                    <CountUp value={col.value} />×
                  </motion.span>
                  <div className={`w-full ${col.barClass}`}>
                    <motion.div
                      variants={growY}
                      style={{ transformOrigin: "bottom" }}
                      className={`h-full w-full rounded-2xl ${col.featured ? "bg-[#cc66cc]" : "bg-foreground/25"}`}
                    />
                  </div>
                  <span className="mt-4 text-center text-sm font-medium text-muted-foreground">{col.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={cellVariants} className="flex min-h-[340px] max-md:min-h-0 flex-col rounded-3xl bg-muted p-8 sm:p-10 lg:p-12">
            <div className="flex items-center gap-2.5">
              <FlaskConical className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">Deployment-Entscheidung</span>
            </div>
            <h3 className="mt-8 max-w-md text-3xl sm:text-4xl font-medium tracking-tight leading-[1.15] text-foreground">
              Kipppunkt bei ~7–9 pJ/Spike.
            </h3>
            <p className="mt-8 max-w-md text-base sm:text-lg leading-relaxed text-muted-foreground">
              Intel Loihi verbraucht 23,6 pJ/Spike, TrueNorth 26 pJ. Beide liegen über dem Kipppunkt; ein INT8-Transformer ist auf diesen Chips effizienter.
            </p>
            <p className="mt-auto max-w-md pt-10 text-xs leading-relaxed text-muted-foreground">
              Energiemodell nach Horowitz (2014): FP32-MAC = 4,6 pJ, INT8-MAC = 0,23 pJ. MAC/SynOps-Verhältnis 32–39 pro parametergleichem Paar.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
