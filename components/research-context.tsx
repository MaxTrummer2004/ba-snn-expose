"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect, useRef } from "react";
import { Zap, Brain, Cpu, FlaskConical, ChevronDown } from "lucide-react";

interface ResearchContextProps {
  autoPlay?: boolean;
  autoPlayDelay?: number;
}

export function ResearchContext({
  autoPlay = true,
  autoPlayDelay = 5000,
}: ResearchContextProps) {
  const [activeTab, setActiveTab] = useState(0);
  const [open, setOpen] = useState(-1); // Handy-Akkordeon: offener Eintrag (-1 = alle zu)
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const tabs = [
    {
      icon: FlaskConical,
      title: "Forschungsstand",
      description:
        "Bestehende Arbeiten zeigen SNN-Effizienzvorteile, meist jedoch ohne direkten Vergleich mit quantisierten Modellen unter gleichen Bedingungen.",
      features: [
        "Roy et al. (2019): SNNs als energieeffiziente Alternative positioniert",
        "Zhu et al. (2023), Lv et al. (2023), Bal & Sengupta (2024): spikende Sprachmodelle",
        "Davidson & Furber (2021), Dampfhoffer et al. (2023): kein Vorteil auf gleicher Hardware",
        "Horowitz (2014): FP32-MAC = 4,6 pJ, INT8-MAC = 0,23 pJ. Grundlage des Energiemodells",
      ],
    },
    {
      icon: Brain,
      title: "Forschungslücke",
      description:
        "Kein Benchmark vergleicht SNNs direkt mit INT8-Transformern auf parametergleichen Paaren und realer Hardware-Energie.",
      features: [
        "Bisherige Studien vergleichen gegen FP32, nicht gegen INT8",
        "Kein einheitliches Energiemodell über Hardware-Generationen hinweg",
        "Parametergleiche Paare fehlen in bestehenden Benchmarks",
        "Kipppunkt-Konzept (pJ/Spike) bisher nicht formalisiert",
      ],
    },
    {
      icon: Zap,
      title: "Hypothesen",
      description:
        "Zwei Kernhypothesen leiten die empirische Analyse, beide abhängig von der Energie pro Spike der Zielhardware.",
      features: [
        "H1: SNNs sind gegenüber FP32-Transformern über alle pJ/Spike-Werte effizienter",
        "H2: SNNs besitzen einen Kipppunkt gegenüber INT8-Transformern bei ~7–9 pJ/Spike",
        "Beide Hypothesen werden auf SST-2 Dev-Set empirisch geprüft",
        "Energiemodell: SynOps × pJ/Spike vs. MACs × pJ/MAC",
      ],
    },
    {
      icon: Cpu,
      title: "Eigener Beitrag",
      description:
        "Diese Arbeit formalisiert den Kipppunkt und liefert eine Effizienz-Landkarte über pJ/Spike und Modellpräzision.",
      features: [
        "3 SNNs + 3 Transformer, parametergleiche Paare (1–5 Mio. Parameter)",
        "Benchmark: SST-2 (Stanford Sentiment Treebank), 67.349 Trainingsbeispiele",
        "Messung: SynOps (SNN) vs. MACs (Transformer) pro Inferenz",
        "Ergebnis: Effizienz-Landkarte mit Kipppunkt-Linie und Deployment-Empfehlung",
      ],
    },
  ];

  useEffect(() => {
    if (!autoPlay) return;
    intervalRef.current = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % tabs.length);
    }, autoPlayDelay);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [autoPlay, autoPlayDelay, tabs.length]);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
    if (autoPlay && intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        setActiveTab((prev) => (prev + 1) % tabs.length);
      }, autoPlayDelay);
    }
  };

  return (
    <div className="max-w-[1400px] mx-auto px-10 max-[850px]:px-6 pt-14 pb-24 max-[850px]:pt-14 max-[850px]:pb-20">
      <div className="mb-12 md:mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          id="research-context-heading"
          className="text-[clamp(2rem,4vw,3.5rem)] font-medium tracking-tight text-accent-foreground mb-4"
        >
          Forschungskontext
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-lg text-accent-foreground/60 max-w-2xl"
        >
          Was die Literatur zeigt, was fehlt, welche Hypothesen diese Arbeit prüft und was der eigene Beitrag ist.
        </motion.p>
      </div>

      {/* Handy: Akkordeon — Klick klappt einen Eintrag auf */}
      <div className="flex flex-col gap-3 lg:hidden">
        {tabs.map((tab, index) => {
          const Icon = tab.icon;
          const isOpen = open === index;
          return (
            <div
              key={index}
              className="overflow-hidden rounded-2xl bg-accent-foreground/[0.04]"
            >
              <button
                onClick={() => setOpen(isOpen ? -1 : index)}
                aria-expanded={isOpen}
                className="flex w-full items-center gap-4 p-4 text-left"
              >
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-colors duration-200 ${
                    isOpen
                      ? "bg-[#cc66cc] text-white"
                      : "bg-accent-foreground/10 text-accent-foreground"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="flex-1 text-base font-semibold text-accent-foreground">
                  {tab.title}
                </h3>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-accent-foreground/60 transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4">
                      <p className="mb-4 text-sm leading-relaxed text-accent-foreground/60">
                        {tab.description}
                      </p>
                      <div className="space-y-3">
                        {tab.features.map((feature, i) => (
                          <div
                            key={i}
                            className="flex items-start gap-3 rounded-xl bg-accent-foreground/[0.06] p-3"
                          >
                            <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-foreground">
                              <svg
                                className="h-3 w-3 text-accent"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={3}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            </div>
                            <span className="text-sm font-medium text-accent-foreground/80">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Desktop: Tab-Liste + Panel */}
      <div className="hidden lg:grid lg:grid-cols-12 gap-4">
        <div className="lg:col-span-4 flex flex-col justify-between gap-4">
          {tabs.map((tab, index) => {
            const Icon = tab.icon;
            const isActive = activeTab === index;
            return (
              <motion.button
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                onClick={() => handleTabClick(index)}
                className={`w-full text-left p-4 md:p-6 rounded-2xl transition-colors duration-200 flex-1 flex items-start ${
                  isActive
                    ? "bg-accent-foreground/10"
                    : "bg-accent-foreground/[0.04] hover:bg-accent-foreground/[0.07]"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`shrink-0 w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-200 ${
                      isActive
                        ? "bg-[#cc66cc] text-white"
                        : "bg-accent-foreground/10 text-accent-foreground"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3
                      className={`text-base md:text-lg font-semibold mb-1 ${
                        isActive
                          ? "text-accent-foreground"
                          : "text-accent-foreground/70"
                      }`}
                    >
                      {tab.title}
                    </h3>
                    <p
                      className={`text-sm line-clamp-2 ${
                        isActive
                          ? "text-accent-foreground/60"
                          : "text-accent-foreground/40"
                      }`}
                    >
                      {tab.description}
                    </p>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>

        <div className="lg:col-span-8 flex">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="rounded-3xl border border-accent-foreground/10 bg-accent-foreground/[0.04] pt-1 md:pt-2 lg:pt-3 px-6 md:px-8 lg:px-10 pb-6 md:pb-8 lg:pb-10 flex-1"
            >
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent-foreground/10 mb-3">
                  {(() => {
                    const Icon = tabs[activeTab]!.icon;
                    return <Icon className="w-8 h-8 text-accent-foreground" />;
                  })()}
                </div>
                <h3 className="text-2xl md:text-3xl font-semibold text-accent-foreground mb-3">
                  {tabs[activeTab]!.title}
                </h3>
                <p className="text-base md:text-lg text-accent-foreground/60 leading-relaxed">
                  {tabs[activeTab]!.description}
                </p>
              </div>

              <div className="space-y-4">
                {tabs[activeTab]!.features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-start gap-3 p-4 rounded-xl bg-accent-foreground/[0.06]"
                  >
                    <div className="shrink-0 w-6 h-6 rounded-full bg-accent-foreground flex items-center justify-center mt-0.5">
                      <svg
                        className="w-4 h-4 text-accent"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <span className="text-sm md:text-base text-accent-foreground/80 font-medium">
                      {feature}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
