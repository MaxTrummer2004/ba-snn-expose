"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect, useRef } from "react";
import { Zap, Activity, BarChart2 } from "lucide-react";

const features = [
  {
    title: "Effizienz gegenüber FP32",
    icon: Zap,
    card: {
      title: "SNN vs. FP32-Transformer",
      items: [
        {
          label: "Energiefaktor bei 0,9 pJ / Spike",
          status: "185×",
          time: "kleinste Modellpaarung",
        },
        {
          label: "Dokumentierter Hardware-Bereich",
          status: "0,9 – 45 pJ",
          time: "SNN durchgängig effizienter",
        },
        {
          label: "Hypothese H1",
          status: "Vorläufig",
          time: "gestützt durch Vorarbeiten",
        },
      ],
    },
  },
  {
    title: "Kipppunkt gegenüber INT8",
    icon: Activity,
    card: {
      title: "INT8-Transformer Schwellenwert",
      items: [
        {
          label: "Kipppunkt Energie / Spike",
          status: "7 – 9 pJ",
          time: "H2-Prognose",
        },
        {
          label: "Intel Loihi  (23,6 pJ / SynOp)",
          status: "INT8 besser",
          time: "dokumentierter Chip",
        },
        {
          label: "IBM TrueNorth (26 pJ / Spike)",
          status: "INT8 besser",
          time: "dokumentierter Chip",
        },
      ],
    },
  },
  {
    title: "Effizienz-Landkarte",
    icon: BarChart2,
    card: {
      title: "Deployment-Entscheidung",
      items: [
        {
          label: "SNN ideal: < 7 pJ / Spike",
          status: "Empfohlen",
          time: "Analog / Mixed-Signal",
        },
        {
          label: "INT8 besser: > 9 pJ / Spike",
          status: "Empfohlen",
          time: "Loihi, TrueNorth",
        },
        {
          label: "Klassifikationsgüte 79 – 84 %",
          status: "Vergleichbar",
          time: "SST-2 Dev-Set",
        },
      ],
    },
  },
] as const;

const STATUS_STYLES: Record<string, string> = {
  "185×":       "bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300",
  "0,9 – 45 pJ":"bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300",
  "Vorläufig":  "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300",
  "7 – 9 pJ":  "bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300",
  "INT8 besser":"bg-rose-100 dark:bg-rose-900/30 text-rose-800 dark:text-rose-300",
  "Empfohlen":  "bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300",
  "Vergleichbar":"bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300",
};

const DEFAULT_STATUS_STYLE =
  "bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300";

export function EfficiencyMap() {
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % features.length);
    }, 5000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const handleFeatureClick = (index: number) => {
    setActiveIndex(index);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % features.length);
      }, 5000);
    }
  };

  const active = features[activeIndex]!;

  return (
    <section className="w-full py-8 sm:py-12 md:py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-0 items-center">

          {/* Left Column */}
          <div className="flex flex-col lg:pr-12 xl:pr-16">
            <div className="mb-8 md:mb-12">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="text-sm sm:text-base text-muted-foreground mb-4 font-mono uppercase tracking-[0.2em]"
              >
                Forschungsergebnis
              </motion.p>

              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-foreground mb-6 leading-[1.05]"
              >
                Wann lohnt sich ein SNN wirklich?
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="text-base sm:text-lg text-muted-foreground max-w-xl leading-relaxed"
              >
                Parametervergleichbare SNNs und Transformer auf SST-2 —
                der Energievorteil gilt nicht bedingungslos, sondern hängt
                von der Energie pro Spike der Zielhardware und der
                Rechenpräzision des Vergleichsmodells ab.
              </motion.p>
            </div>

            <div className="w-full lg:w-[calc(100%+3rem)] xl:w-[calc(100%+4rem)] h-px bg-border mb-8" />

            <div className="space-y-2">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                const isActive = activeIndex === index;

                return (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                    onClick={() => handleFeatureClick(index)}
                    className={`w-full text-left flex items-center gap-3 py-3 px-4 rounded-lg transition-colors duration-200 ${
                      isActive
                        ? "bg-muted"
                        : "hover:bg-muted/50"
                    }`}
                  >
                    <Icon
                      className={`w-5 h-5 shrink-0 transition-colors duration-200 ${
                        isActive ? "text-[#cc66cc]" : "text-[#cc66cc]/35"
                      }`}
                    />
                    <span
                      className={`text-base sm:text-lg font-medium transition-colors duration-200 ${
                        isActive ? "text-foreground" : "text-muted-foreground"
                      }`}
                    >
                      {feature.title}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Right Column */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative w-full aspect-[3/4] rounded-3xl overflow-hidden bg-muted max-h-[600px]"
            >
              <div
                aria-hidden="true"
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(120% 90% at 80% 15%, rgba(204,102,204,0.16), transparent 60%)",
                }}
              />

              <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-2.5 flex items-center justify-center">
                  <AnimatePresence initial={false}>
                    <motion.div
                      key={activeIndex}
                      initial={{ y: "250%" }}
                      animate={{ y: 0 }}
                      exit={{ y: "-250%" }}
                      transition={{ duration: 1.4, ease: [0.4, 0, 0.2, 1] }}
                      className="w-full max-w-md absolute mx-auto"
                    >
                      <div className="bg-background/80 backdrop-blur-md rounded-2xl p-1 shadow-lg">
                        <div className="bg-background rounded-xl p-6">
                          <h3 className="text-base font-semibold text-foreground mb-4">
                            {active.card.title}
                          </h3>
                          <div className="space-y-3">
                            {active.card.items.map((item, idx) => (
                              <div
                                key={idx}
                                className="flex items-start justify-between gap-3 py-2 border-b border-border last:border-0"
                              >
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm text-foreground font-medium mb-1 leading-snug">
                                    {item.label}
                                  </p>
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <span
                                      className={`inline-flex px-2 py-0.5 rounded text-xs font-semibold ${STATUS_STYLES[item.status] ?? DEFAULT_STATUS_STYLE}`}
                                    >
                                      {item.status}
                                    </span>
                                    <span className="text-xs text-muted-foreground">
                                      {item.time}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
