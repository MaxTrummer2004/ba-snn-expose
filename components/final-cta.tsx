"use client";

import { animate, motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, type ReactNode } from "react";
import { ShaderCanvas } from "@/components/shader-canvas";

const easeOutExpo = [0.33, 1, 0.68, 1] as const;

const HEADLINE_LINES = ["Bedingte Effizienz.", "Kein Automatismus."] as const;

function CountUp({
  value,
  inView,
}: {
  value: number;
  inView: boolean;
}): ReactNode {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || !inView) return;
    if (reduce) {
      el.textContent = String(value);
      return;
    }
    const controls = animate(0, value, {
      duration: 1.6,
      ease: easeOutExpo,
      onUpdate: (v) => {
        el.textContent = String(Math.round(v));
      },
    });
    return () => controls.stop();
  }, [inView, value, reduce]);

  return <span ref={ref}>0</span>;
}

export function FinalCta(): ReactNode {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.35 });

  return (
    <section
      ref={sectionRef}
      id="ausblick"
      className="relative w-full bg-background text-foreground"
      aria-labelledby="final-cta-heading"
    >
      <div className="mx-auto max-w-[1680px] px-10 pb-32 max-[850px]:px-6 max-[850px]:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
          transition={{ duration: 1, ease: easeOutExpo }}
          className="relative min-h-[520px] overflow-hidden rounded-3xl bg-[#3a1818] max-[850px]:min-h-[420px]"
        >
          <div aria-hidden className="absolute inset-0">
            <ShaderCanvas />
          </div>

          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/55 via-black/25 to-black/40"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"
          />

          <div className="relative flex h-full min-h-[inherit] flex-col justify-between p-14 text-white max-[850px]:p-8">
            <motion.h2
              id="final-cta-heading"
              className="max-w-[16ch] text-[clamp(2.5rem,6vw,5.5rem)] font-medium leading-[0.95] tracking-tight [text-shadow:0_2px_24px_rgba(0,0,0,0.45)]"
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              transition={{ staggerChildren: 0.12, delayChildren: 0.15 }}
            >
              {HEADLINE_LINES.map((line) => (
                <span key={line} className="block overflow-hidden pb-[0.05em]">
                  <motion.span
                    className="block will-change-transform"
                    variants={{
                      hidden: { y: "110%" },
                      visible: { y: "0%" },
                    }}
                    transition={{ duration: 1, ease: easeOutExpo }}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </motion.h2>

            <div className="mt-10 flex items-end justify-between gap-8 max-[850px]:flex-col max-[850px]:items-start">
              <motion.p
                className="max-w-xl text-3xl font-regular leading-snug tracking-tighter text-white/75 max-[850px]:text-base"
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                transition={{ duration: 0.8, ease: easeOutExpo, delay: 0.6 }}
              >
                Weniger Energie als ein FP32-Transformer — aber nur unterhalb
                des Kipppunkts.
              </motion.p>

              <motion.div
                className="shrink-0 text-right"
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                transition={{ duration: 0.8, ease: easeOutExpo, delay: 0.7 }}
              >
                <p className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-white/60">
                  Faktor vs. FP32
                </p>
                <p className="text-[clamp(4.5rem,11vw,9.5rem)] font-semibold leading-none tracking-tight text-white [text-shadow:0_2px_30px_rgba(0,0,0,0.5)]">
                  <CountUp value={185} inView={inView} />
                  <span className="text-[#f2b8f2]">×</span>
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
