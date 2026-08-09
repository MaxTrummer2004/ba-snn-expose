"use client";

import { motion, useInView } from "motion/react";
import { useState, useRef } from "react";
import {
  Brain,
  Cpu,
  Layers,
  Zap,
  FlaskConical,
  type LucideIcon,
} from "lucide-react";

const personas: { key: string; label: string; Icon: LucideIcon }[] = [
  { key: "neuro",    label: "Neurobiologie",    Icon: Brain },
  { key: "learning", label: "Lernregeln",        Icon: Layers },
  { key: "hardware", label: "Hardware",          Icon: Cpu },
  { key: "energy",   label: "Energieeffizienz",  Icon: Zap },
  { key: "apps",     label: "Anwendungen",       Icon: FlaskConical },
];

const content: Record<
  string,
  { ctaTitle: string; blocks: { title: string; desc: string }[] }
> = {
  neuro: {
    ctaTitle: "Vom Neuron zum Netzwerk",
    blocks: [
      {
        title: "Biologische Plausibilität",
        desc: "SNNs modellieren das Verhalten biologischer Neuronen: Membranpotenzial, Refraktärzeit und Spike-Schwellen spiegeln echte kortikale Dynamiken wider.",
      },
      {
        title: "Zeitliche Kodierung",
        desc: "Information steckt nicht nur im Ob, sondern im Wann eines Spikes. Präzise Timing-Muster ermöglichen eine ausdrucksstarke, sparsamere Repräsentation als Ratencodierung.",
      },
    ],
  },
  learning: {
    ctaTitle: "Wie SNNs trainiert werden",
    blocks: [
      {
        title: "STDP – Spike-Timing Dependent Plasticity",
        desc: "Synapsen stärken sich, wenn ein präsynaptischer Spike kurz vor dem postsynaptischen folgt – eine lokale, biologisch inspirierte Lernregel ohne globale Fehlerrückführung.",
      },
      {
        title: "Surrogate Gradient",
        desc: "Die nicht-differenzierbare Heaviside-Funktion wird durch einen Surrogate Gradienten angenähert. Die SNNs dieser Arbeit sind auf diesem Weg trainiert.",
      },
    ],
  },
  hardware: {
    ctaTitle: "Neuromorphes Computing",
    blocks: [
      {
        title: "Intel Loihi & IBM TrueNorth",
        desc: "Dedizierte neuromorphe Chips verarbeiten Spike-Ströme ereignisgesteuert, verbrauchen im Ruhezustand nahezu keine Energie und skalieren auf Millionen von Neuronen.",
      },
      {
        title: "Event-driven Execution",
        desc: "Im Gegensatz zu taktsynchronen GPUs rechnen neuromorphe Systeme nur dann, wenn ein Spike eintrifft – das eliminiert die größte Energiequelle klassischer Beschleuniger.",
      },
    ],
  },
  energy: {
    ctaTitle: "Energieeffizienz als Kernziel",
    blocks: [
      {
        title: "Sparsity durch Spikes",
        desc: "Die trainierten SNNs feuern pro Zeitschritt in Schicht 1 bei 7,5–9,4 % und in Schicht 2 bei 14–27 % der Neuronen. Diese Sparsity senkt die Rechenarbeit pro Inferenz.",
      },
      {
        title: "Vergleich mit ANNs",
        desc: "Auf identischer digitaler Hardware sind SNNs häufig nicht effizienter als klassische Netze (Davidson & Furber, 2021; Dampfhoffer et al., 2023). Der Vorteil entsteht erst ereignisgesteuert und bei niedriger Spike-Rate.",
      },
    ],
  },
  apps: {
    ctaTitle: "Reale Einsatzfelder",
    blocks: [
      {
        title: "Edge AI & IoT",
        desc: "SNNs eignen sich für energiebeschränkte Geräte: Sprachaktivierung, Gesten­erkennung und Anomalie­detektion laufen auf Milliwatt-Budget ohne Cloud-Anbindung.",
      },
      {
        title: "Robotik & Sensorfusion",
        desc: "Event-basierte Kameras liefern Spike-Streams, die SNNs nativ verarbeiten – latenzarm, effizient und robust gegenüber schnellen Bewegungen.",
      },
    ],
  },
};

const WORD_EASE = [0.22, 1, 0.36, 1] as const;

function WordReveal({
  children,
  delay = 0,
  italic = false,
  inView,
}: {
  children: string;
  delay?: number;
  italic?: boolean;
  inView: boolean;
}) {
  return (
    <span className={`relative inline-block overflow-hidden align-baseline pb-[0.1em]${italic ? " italic" : ""}`}>
      <span>{children}</span>
      <motion.span
        aria-hidden
        initial={{ y: "0%" }}
        animate={inView ? { y: "110%" } : { y: "0%" }}
        transition={{ duration: 0.7, ease: WORD_EASE, delay }}
        className="absolute inset-x-0 -top-[0.05em] -bottom-[0.2em] bg-foreground will-change-transform"
      />
    </span>
  );
}

export function SnnExplainer() {
  const [active, setActive] = useState("neuro");
  const data = content[active]!;
  const headingRef = useRef<HTMLHeadingElement>(null);
  const headingInView = useInView(headingRef, { once: true, amount: 0.5 });

  return (
    <section className="w-full min-h-screen flex items-start py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-[1400px] mx-auto w-full">
        <h2
          ref={headingRef}
          className="text-center text-3xl sm:text-5xl md:text-6xl text-foreground tracking-tight leading-tight"
        >
          <WordReveal delay={0}    inView={headingInView}>Wie</WordReveal>
          {" "}
          <WordReveal delay={0.07} inView={headingInView}>SNNs</WordReveal>
          {" "}
          <WordReveal delay={0.14} inView={headingInView} italic>wirklich</WordReveal>
          <br />
          <WordReveal delay={0.21} inView={headingInView}>funktionieren</WordReveal>
        </h2>

        <div className="mt-10 sm:mt-14 flex sm:grid sm:grid-cols-5 gap-2 sm:gap-4 overflow-x-auto pb-1 sm:pb-0">
          {personas.map((p) => {
            const isActive = active === p.key;
            const Icon = p.Icon;
            return (
              <button
                key={p.key}
                onClick={() => setActive(p.key)}
                className={`group relative flex sm:flex-col items-center justify-start sm:justify-center text-center gap-2 sm:gap-5 rounded-xl px-3 sm:px-6 py-2.5 sm:py-10 border transition-colors cursor-pointer shrink-0 sm:shrink ${
                  isActive
                    ? "bg-background border-border shadow-sm"
                    : "bg-muted/40 border-transparent hover:bg-background"
                }`}
              >
                <div
                  className="flex items-center justify-center w-7 h-7 sm:w-16 sm:h-16 rounded-full shrink-0 bg-background"
                >
                  <Icon
                    className={`w-3.5 h-3.5 sm:w-8 sm:h-8 transition-colors ${
                      isActive ? "text-[#cc66cc]" : "text-foreground"
                    }`}
                    strokeWidth={1.5}
                  />
                </div>
                <span
                  className={`text-xs sm:text-base font-medium whitespace-nowrap ${
                    isActive ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {p.label}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="persona-accent"
                    className="absolute inset-0 -z-10 rounded-xl pointer-events-none"
                    style={{
                      background:
                        "radial-gradient(circle at 70% 50%, rgba(204,102,204,0.15), transparent 60%)",
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>

        <motion.div
          key={active}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-10 pt-8 border-t border-border grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"
        >
          <div className="flex flex-col gap-5">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-medium text-foreground tracking-tight leading-tight">
              {data.ctaTitle}
            </h3>
          </div>
          <div className="flex flex-col gap-8">
            {data.blocks.map((b, i) => (
              <div key={i} className="flex flex-col gap-2">
                <h4 className="text-base sm:text-lg font-semibold text-foreground">
                  {b.title}
                </h4>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {b.desc}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
