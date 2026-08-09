"use client";

import { Check } from "lucide-react";
import { motion, useReducedMotion, type Variants } from "motion/react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

type Phase = {
  weeks: string;
  title: string;
  copy: string;
  outputs: string[];
};

const phases: Phase[] = [
  {
    weeks: "Woche 1–2",
    title: "Literatur & Grundlagen",
    copy: "Vertiefung des Forschungsstands zu SNNs, Transformern, Energiemodellen und neuromorpher Hardware.",
    outputs: ["Grundlagenkapitel", "Literaturbasis"],
  },
  {
    weeks: "Woche 3–5",
    title: "Experimente & Kipppunkt",
    copy: "Konsolidierung der Modell-Experimente, Sensitivitäts- und Kipppunktanalysen über Energie pro Spike.",
    outputs: ["Sensitivitätsanalyse", "Effizienz-Landkarte"],
  },
  {
    weeks: "Woche 6–8",
    title: "Ergebnis & Methode",
    copy: "Ausarbeitung des Methoden- und Ergebniskapitels: Operationsmetriken, Energiemodell, Kipppunkte.",
    outputs: ["Methodenkapitel", "Ergebniskapitel"],
  },
  {
    weeks: "Woche 9–11",
    title: "Diskussion & Revision",
    copy: "Einleitung, Diskussion und Fazit; Einordnung in die Literatur, Limitationen, Gesamtrevision.",
    outputs: ["Diskussion & Fazit", "Gesamtrevision"],
  },
  {
    weeks: "Woche 12",
    title: "Puffer & Abgabe",
    copy: "Endkorrektur, Formatierung und Abgabe. Termine werden an die Fristen der DBU angepasst.",
    outputs: ["Endkorrektur", "Abgabe"],
  },
];

function OutputVisual({ outputs }: { outputs: string[] }) {
  return (
    <div className="flex h-full flex-col justify-center gap-2.5">
      <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
        Ergebnis der Phase
      </span>
      <div className="flex flex-col gap-2">
        {outputs.map((output) => (
          <div
            key={output}
            className="flex items-center gap-2.5 rounded-lg border border-border bg-background px-3 py-2"
          >
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-[#cc66cc]/15 text-[#cc66cc]">
              <Check className="h-3 w-3" />
            </span>
            <span className="min-w-0 truncate text-sm font-medium text-foreground">
              {output}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Timeline() {
  const reduce = useReducedMotion();

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08 } },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
  };

  return (
    <section
      id="zeitplan"
      aria-labelledby="zeitplan-heading"
      className="w-full bg-background py-20 sm:py-24 lg:py-28 px-4 sm:px-6 lg:px-8"
    >
      <div className="mx-auto w-full max-w-[1400px]">
        <div className="mb-14 lg:mb-20 max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE }}
            className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground"
          >
            Zeitplan
          </motion.p>
          <motion.h2
            id="zeitplan-heading"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.08 }}
            className="mt-4 text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight leading-[1.05] text-foreground"
          >
            Zwölf Wochen bis zur Abgabe.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.16 }}
            className="mt-5 text-base sm:text-lg leading-relaxed text-muted-foreground"
          >
            Nach Abstimmung des Konzepts mit der Betreuung ist ein
            Bearbeitungszeitraum von zwölf Wochen vorgesehen.
          </motion.p>
        </div>

        <motion.ol
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid list-none grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-5 lg:gap-x-6"
        >
          {phases.map((phase, index) => {
            const segment =
              index === 0
                ? "left-0 -right-3"
                : index === phases.length - 1
                  ? "-left-3 right-0"
                  : "-left-3 -right-3";
            return (
              <motion.li
                key={phase.title}
                variants={item}
                className="border-t border-border pt-10 first:border-t-0 first:pt-0 dark:border-border lg:border-t-0 lg:pt-0"
              >
                <div
                  aria-hidden="true"
                  className="rounded-2xl border border-border bg-muted p-4 lg:h-40"
                >
                  <OutputVisual outputs={phase.outputs} />
                </div>

                <div className="relative mt-8 flex h-10 items-center">
                  <div
                    aria-hidden="true"
                    className={`absolute top-1/2 hidden h-px -translate-y-1/2 bg-border lg:block ${segment}`}
                  />
                  <motion.div
                    aria-hidden="true"
                    initial={reduce ? false : { scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{
                      duration: 0.35,
                      delay: 0.3 + index * 0.35,
                      ease: "linear",
                    }}
                    className={`absolute top-1/2 hidden h-px origin-left -translate-y-1/2 bg-[#cc66cc] lg:block ${segment}`}
                  />
                  <span className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-foreground font-mono text-sm font-medium text-background">
                    {index + 1}
                  </span>
                </div>

                <p className="mt-6 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  {phase.weeks}
                </p>
                <h3 className="mt-2 text-lg font-semibold tracking-tight text-foreground text-balance">
                  {phase.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {phase.copy}
                </p>
              </motion.li>
            );
          })}
        </motion.ol>
      </div>
    </section>
  );
}
