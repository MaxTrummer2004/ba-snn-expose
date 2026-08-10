"use client";

import { motion, useReducedMotion } from "motion/react";
import type { Variants } from "motion/react";
import { RevealHeadline } from "@/components/reveal-headline";
import {
  Activity,
  Cpu,
  GitBranch,
  Layers,
  Zap,
  Clock,
  Boxes,
  FlaskConical,
} from "lucide-react";

const nodes = [
  { name: "Spike Coding",    icon: Activity,    x: 50,   y: 10 },
  { name: "Neuron Models",   icon: Cpu,         x: 84.6, y: 30 },
  { name: "Hardware",        icon: Layers,      x: 84.6, y: 70 },
  { name: "Energiemetrik",   icon: Zap,         x: 50,   y: 90 },
  { name: "Temporal Code",   icon: Clock,       x: 15.4, y: 70 },
  { name: "Topologie",       icon: GitBranch,   x: 15.4, y: 30 },
];

const scatter = [
  { cx: 27, cy: 15, r: 0.6 },
  { cx: 71, cy: 9,  r: 0.4 },
  { cx: 93, cy: 50, r: 0.5 },
  { cx: 87, cy: 87, r: 0.4 },
  { cx: 13, cy: 88, r: 0.5 },
  { cx: 7,  cy: 49, r: 0.4 },
  { cx: 35, cy: 95, r: 0.4 },
  { cx: 64, cy: 5,  r: 0.5 },
];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

const draw: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  show: { pathLength: 1, opacity: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

const pop: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const orchestra: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
};

export function Architecture() {
  const reduce = useReducedMotion();

  return (
    <section className="w-full overflow-hidden bg-background px-6 py-24 sm:px-10 sm:py-32 lg:px-20 lg:py-40">
      <div className="mx-auto grid w-full max-w-[1800px] grid-cols-1 items-center gap-20 max-md:gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-20 lg:pl-36">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="flex flex-col items-start"
        >
          <motion.span
            variants={fadeUp}
            className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground"
          >
            <FlaskConical className="h-3.5 w-3.5" />
            Architektur
          </motion.span>

          <RevealHeadline
            className="mt-6 max-w-2xl text-5xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-6xl md:text-7xl"
            delay={0.15}
            stagger={0.06}
          >
            Biologisch inspiriert. Bedingt energieeffizient.
          </RevealHeadline>

          <motion.p
            variants={fadeUp}
            className="mt-8 max-w-xl text-xl leading-relaxed text-muted-foreground sm:text-2xl"
          >
            Spiking Neural Networks kodieren Information in zeitlichen Spike-Mustern,
            analog zum menschlichen Gehirn. Nur aktive Neuronen verbrauchen Energie,
            was den Verbrauch senkt, allerdings nur auf ereignisgesteuerter Hardware.
          </motion.p>

        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          role="img"
          aria-label="Architekturkarte eines Spiking Neural Networks mit Spike Coding, Neuron Models, Hardware, Energiemetrik, Temporal Coding und Topologie"
          className="relative mx-auto mb-8 aspect-square w-full max-w-[820px] max-md:max-w-[380px]"
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 rounded-full"
            style={{ background: "radial-gradient(circle at center, rgba(204,102,204,0.12), transparent 62%)" }}
          />

          <motion.svg
            variants={orchestra}
            viewBox="0 0 100 100"
            className="absolute inset-0 h-full w-full"
            aria-hidden="true"
          >
            {scatter.map((dot, index) => (
              <motion.circle
                key={index}
                variants={fadeIn}
                cx={dot.cx}
                cy={dot.cy}
                r={dot.r}
                fill="#cc66cc"
                fillOpacity={0.5}
              />
            ))}
            <motion.circle
              variants={fadeIn}
              cx="50" cy="50" r="40"
              fill="none"
              vectorEffect="non-scaling-stroke"
              strokeWidth={1}
              stroke="currentColor"
              strokeOpacity={0.12}
              className="text-foreground"
            />
            <motion.circle
              variants={fadeIn}
              cx="50" cy="50" r="26"
              fill="none"
              vectorEffect="non-scaling-stroke"
              strokeWidth={1}
              strokeDasharray="0.3 2.4"
              strokeLinecap="round"
              stroke="currentColor"
              strokeOpacity={0.18}
              className="text-foreground"
            />
            {nodes.map((node) => (
              <motion.line
                key={node.name}
                variants={draw}
                x1="50" y1="50"
                x2={node.x} y2={node.y}
                vectorEffect="non-scaling-stroke"
                strokeWidth={1.25}
                strokeLinecap="round"
                stroke="currentColor"
                strokeOpacity={0.15}
                className="text-foreground"
              />
            ))}
          </motion.svg>

          <motion.div
            variants={pop}
            className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
          >
            <div className="relative flex h-24 w-24 max-sm:h-20 max-sm:w-20 items-center justify-center rounded-3xl border border-border bg-background shadow-lg sm:h-28 sm:w-28">
              {!reduce && (
                <motion.span
                  aria-hidden="true"
                  animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0, 0.4] }}
                  transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 rounded-3xl border border-[#cc66cc]/40"
                />
              )}
              <Boxes
                className="h-10 w-10 sm:h-11 sm:w-11"
                style={{ color: "#cc66cc" }}
                strokeWidth={1.5}
              />
              <span className="absolute left-1/2 top-full mt-3 -translate-x-1/2 whitespace-nowrap rounded-full border border-border bg-background px-2 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                SNN Core
              </span>
            </div>
          </motion.div>

          {nodes.map((node, index) => {
            const Icon = node.icon;
            return (
              <motion.div
                key={node.name}
                variants={pop}
                style={{ left: `${node.x}%`, top: `${node.y}%` }}
                className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
              >
                <motion.div
                  animate={reduce ? {} : { y: [0, -5, 0] }}
                  transition={reduce ? {} : {
                    duration: 4.2 + index * 0.35,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="relative"
                >
                  <motion.div
                    whileHover={{ y: -3, scale: 1.02 }}
                    transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="flex h-14 w-14 max-sm:h-11 max-sm:w-11 items-center justify-center rounded-2xl border border-border bg-background shadow-sm sm:h-16 sm:w-16"
                  >
                    <Icon
                      className="h-6 w-6 max-sm:h-5 max-sm:w-5 sm:h-7 sm:w-7"
                      style={{ color: "#cc66cc" }}
                      strokeWidth={1.5}
                    />
                  </motion.div>
                  <span className="absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap rounded-full px-1.5 text-[11px] max-sm:text-[9px] font-medium text-muted-foreground">
                    {node.name}
                  </span>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
