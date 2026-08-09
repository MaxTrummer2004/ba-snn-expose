"use client";

import { motion } from "motion/react";
import {
  FunctionSquare,
  Cpu,
  FlaskConical,
  Ruler,
  Activity,
  TrendingDown,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { ShinyText } from "@/components/shiny-text";

type Limitation = { icon: LucideIcon; title: string; description: string };

const limitations: Limitation[] = [
  {
    icon: FunctionSquare,
    title: "Analytisches Energiemodell",
    description:
      "Energie wird aus publizierten pJ-Werten je Operation und Speicherzugriff modelliert (Horowitz 2014) — nicht an realen Chips gemessen.",
  },
  {
    icon: Cpu,
    title: "Keine Hardware-Messung",
    description:
      "Loihi (23,6 pJ) und TrueNorth (26 pJ) dienen als dokumentierte Literatur-Ankerpunkte, nicht als eigene Messungen realer Chips.",
  },
  {
    icon: FlaskConical,
    title: "Ein Benchmark",
    description:
      "Beschränkung auf SST-2 (Sentimentklassifikation). Übertragbarkeit auf andere NLP-Aufgaben bleibt offen.",
  },
  {
    icon: Ruler,
    title: "Kleine Modelle",
    description:
      "1–5 Mio. Parameter. Die Ergebnisse skalieren nicht zwingend auf große Sprachmodelle mit Milliarden Parametern.",
  },
  {
    icon: Activity,
    title: "Ratencodierung",
    description:
      "Der SNN-Vorteil hängt an niedrigen Spike-Raten. Andere Kodierungen können den Kipppunkt verschieben.",
  },
  {
    icon: TrendingDown,
    title: "Vorläufiger Kipppunkt",
    description:
      "Erster operationsbasierter Durchlauf. Speicherzugriffe und Zeitschritte verschieben den Kipppunkt voraussichtlich nach unten.",
  },
];

export function Limitations() {
  return (
    <section className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="mb-12 md:mb-16 lg:mb-20 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <ShinyText
              text="Limitationen"
              speed={4}
              color="#cc66cc"
              shineColor="#ffffff"
              className="text-xs font-medium uppercase tracking-[0.2em]"
            />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mt-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.05] text-foreground"
          >
            Wo die Analyse an ihre Grenzen stößt
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="mt-5 text-base sm:text-lg text-muted-foreground leading-relaxed"
          >
            Das Energiemodell bleibt eine Abschätzung auf Basis publizierter
            Werte. Die zentralen Annahmen und Grenzen der Studie werden
            transparent offengelegt.
          </motion.p>
        </div>

        {/* Grid — 3 columns x 2 rows */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8 md:gap-x-8 md:gap-y-12">
          {limitations.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="flex flex-col rounded-3xl border border-border bg-background p-6 sm:p-8 shadow-sm"
              >
                <div className="inline-flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-xl border border-border bg-[#cc66cc]/10 text-[#cc66cc]">
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>

                <h3 className="mt-5 text-lg font-semibold tracking-tight text-foreground">
                  {item.title}
                </h3>

                <p className="mt-2 text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
