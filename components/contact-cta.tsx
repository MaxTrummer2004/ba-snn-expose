"use client";

import { Asterisk } from "lucide-react";
import { motion, useReducedMotion, type Variants } from "motion/react";

const mulberry32 = (seed: number) => {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

const buildHalftone = () => {
  const rand = mulberry32(7);
  const size = 360;
  const step = 12;
  const dots: { x: number; y: number; r: number; o: number }[] = [];
  for (let y = step / 2; y < size; y += step) {
    for (let x = step / 2; x < size; x += step) {
      const density = Math.max(0, 1 - Math.hypot(x, y) / size);
      if (rand() > density * 1.15) continue;
      dots.push({
        x: Math.round((x + (rand() - 0.5) * 6) * 10) / 10,
        y: Math.round((y + (rand() - 0.5) * 6) * 10) / 10,
        r: Math.round((0.7 + density * 2.1 + rand() * 0.4) * 100) / 100,
        o: Math.round((0.3 + density * 0.55) * 100) / 100,
      });
    }
  }
  return dots;
};

const halftoneDots = buildHalftone();

const panel: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const list: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const field: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 1.4, ease: [0.22, 1, 0.36, 1] },
  },
};

const HalftoneField = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 360 360" aria-hidden="true" className={className}>
    {halftoneDots.map((dot, i) => (
      <circle
        key={i}
        cx={dot.x}
        cy={dot.y}
        r={dot.r}
        opacity={dot.o}
        fill="currentColor"
      />
    ))}
  </svg>
);

export default function ContactCta() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="w-full bg-background px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="mx-auto w-full max-w-[1400px]">
        <motion.div
          variants={panel}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="relative overflow-hidden rounded-[2.5rem] border border-border bg-muted"
        >
          <motion.div
            variants={field}
            className="pointer-events-none absolute -left-10 -top-10 w-40 text-muted-foreground sm:w-72"
          >
            <HalftoneField className="h-auto w-full opacity-80" />
          </motion.div>
          <motion.div
            variants={field}
            className="pointer-events-none absolute -right-14 -top-14 w-48 text-muted-foreground sm:w-96"
          >
            <motion.div
              animate={reduceMotion ? false : { opacity: [0.85, 1, 0.85] }}
              transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            >
              <HalftoneField className="h-auto w-full rotate-90" />
            </motion.div>
          </motion.div>
          <motion.div
            variants={field}
            className="pointer-events-none absolute -bottom-12 -left-12 w-44 text-muted-foreground sm:w-80"
          >
            <motion.div
              animate={reduceMotion ? false : { opacity: [1, 0.82, 1] }}
              transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
            >
              <HalftoneField className="h-auto w-full -rotate-90" />
            </motion.div>
          </motion.div>
          <motion.div
            variants={field}
            className="pointer-events-none absolute -bottom-10 -right-10 w-40 text-muted-foreground sm:w-72"
          >
            <HalftoneField className="h-auto w-full rotate-180 opacity-70" />
          </motion.div>

          <motion.div
            variants={list}
            className="relative z-10 mx-auto flex max-w-3xl flex-col items-center px-6 py-20 text-center sm:px-12 sm:py-28 lg:py-32"
          >
            <motion.span
              variants={item}
              className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground"
            >
              <Asterisk className="h-4 w-4 text-[#cc66cc]" />
              Bachelorarbeit · DBU Berlin · 2026
            </motion.span>

            <motion.h2
              variants={item}
              className="mt-7 text-4xl leading-[1.08] tracking-tight text-foreground sm:text-5xl md:text-6xl"
            >
              Effizienz ist{" "}
              <em className="italic">bedingt.</em>
            </motion.h2>

            <motion.p
              variants={item}
              className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
            >
              Spiking Neural Networks sind nicht bedingungslos effizienter.
              Unterhalb von rund 8&thinsp;pJ/Spike sind sie einem INT8-Transformer
              überlegen, darüber nicht.
            </motion.p>

            <motion.div variants={item} className="mt-10 w-full sm:w-auto">
              <motion.a
                href="mailto:maxtrummer16@gmail.com"
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="inline-flex w-full cursor-pointer items-center justify-center rounded-full bg-[#cc66cc] px-8 py-3.5 text-sm font-medium text-white transition-colors hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#cc66cc] focus-visible:ring-offset-2 focus-visible:ring-offset-muted sm:w-auto"
              >
                Kontakt aufnehmen
              </motion.a>
            </motion.div>

            <motion.p
              variants={item}
              className="mt-6 text-sm text-muted-foreground"
            >
              Max Trummer · DBU Berlin · Data Science and Management · 2026
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
