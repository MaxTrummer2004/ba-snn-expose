"use client";

import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
  type Variants,
} from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

type KeyRef = {
  /** Nummer wie im Quellenverzeichnis — verbindet beide Abschnitte visuell. */
  n: number;
  venue: string;
  cite: string;
  role: string;
  why: string;
};

// Die vier Arbeiten, auf denen das Exposé wirklich steht — Nummern entsprechen
// exakt dem Quellenverzeichnis darüber.
const KEY_REFERENCES: KeyRef[] = [
  {
    n: 5,
    venue: "ISSCC · 2014",
    cite: "Horowitz, M. (2014). 1.1 Computing's energy problem (and what we can do about it).",
    role: "Energiemodell",
    why: "Liefert die pJ-pro-Operation-Werte (FP32-MAC = 4,6 pJ, INT8-MAC = 0,23 pJ). Grundlage des gesamten Kipppunkt-Vergleichs.",
  },
  {
    n: 2,
    venue: "IEEE TETCI · 2023",
    cite: "Dampfhoffer, M., Mesquida, T., Valentian, A., & Anghel, L. (2023). Are SNNs really more energy-efficient than ANNs? An in-depth hardware-aware study.",
    role: "Hardware-Vergleich",
    why: "Zeigt, dass der Effizienzvorteil von SNNs stark von der Zielhardware abhängt. Motiviert die hardware-bewusste Fragestellung.",
  },
  {
    n: 17,
    venue: "arXiv · 2024",
    cite: "Yan, Z., Bai, Z., & Wong, W.-F. (2024). Reconsidering the energy efficiency of spiking neural networks.",
    role: "Kritische Neubewertung",
    why: "Hinterfragt pauschale Effizienzversprechen und schärft die Notwendigkeit eines fairen, parametergleichen Vergleichs mit INT8.",
  },
  {
    n: 4,
    venue: "IEEE Micro · 2018",
    cite: "Davies, M., et al. (2018). Loihi: A neuromorphic manycore processor with on-chip learning.",
    role: "Neuromorphe Hardware",
    why: "Definiert die reale ereignisgesteuerte Zielplattform, deren Energie pro Spike den Kipppunkt überhaupt erst verschiebt.",
  },
  {
    n: 1,
    venue: "AAAI · 2024",
    cite: "Bal, M., & Sengupta, A. (2024). SpikingBERT: Distilling BERT to train spiking language models using implicit differentiation.",
    role: "Spiking-Sprachmodell",
    why: "Zeigt, dass SNNs auf Sprachaufgaben mit BERT konkurrieren können. Die SNN-Seite des Vergleichs auf SST-2.",
  },
  {
    n: 6,
    venue: "ICML · 2021",
    cite: "Kim, S., et al. (2021). I-BERT: Integer-only BERT quantization.",
    role: "INT8-Baseline",
    why: "Liefert den quantisierten Transformer als fairen Gegner. Die INT8-Seite, gegen die der Kipppunkt gemessen wird.",
  },
];

const columns = [KEY_REFERENCES.slice(0, 3), KEY_REFERENCES.slice(3, 6)];

const stack: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVar: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

function RefCard({
  reference,
  featured,
  borderOpacity,
  mobile,
}: {
  reference: KeyRef;
  featured: boolean;
  borderOpacity: MotionValue<number>;
  mobile: boolean;
}) {
  return (
    <motion.article
      variants={cardVar}
      className="relative rounded-2xl border border-border bg-muted/60 p-1.5 shadow-sm backdrop-blur-md"
    >
      {/* Pinker Rahmen — Desktop: scroll-scrub zeilenweise; Handy: pro Karte beim Reinscrollen */}
      <motion.div
        aria-hidden
        {...(mobile
          ? {
              initial: { opacity: 0 },
              whileInView: { opacity: 1 },
              viewport: { once: true, amount: 0.7 },
              transition: { duration: 0.4, ease: EASE },
            }
          : { style: { opacity: borderOpacity } })}
        className="pointer-events-none absolute inset-0 rounded-2xl border-2 border-[#cc66cc] shadow-[0_0_24px_-6px_#cc66cc]"
      />
      <div className="rounded-[10px] border border-border bg-background p-6 shadow-sm sm:p-7">
        <div className="flex items-center justify-between gap-3">
          <span className="font-mono text-xs tabular-nums text-[#cc66cc]">
            {String(reference.n).padStart(2, "0")}
          </span>
          <span className="rounded-full border border-border px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
            {reference.venue}
          </span>
        </div>

        <p
          className={
            featured
              ? "mt-5 text-pretty text-lg font-medium leading-relaxed text-foreground"
              : "mt-5 text-pretty text-[15px] leading-relaxed text-foreground/80"
          }
        >
          {reference.cite}
        </p>

        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          {reference.why}
        </p>

        <div className="mt-6 flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[#cc66cc]" />
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {reference.role}
          </span>
        </div>
      </div>
    </motion.article>
  );
}

export function KeyReferences() {
  const sectionRef = useRef<HTMLElement>(null);

  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const on = () => setMobile(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start 30%"],
  });
  // Verbindungslinie füllt sich beim Reinscrollen aus dem Quellenverzeichnis.
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Zeilenweises Pink der Karten-Rahmen: eigener Scroll-Fortschritt über die
  // ganze Sektion, je Zeile ein Fenster (Reihe 0 → 1 → 2 nacheinander).
  const { scrollYProgress: rowProgress } = useScroll({
    target: sectionRef,
    offset: ["start 75%", "end 55%"],
  });
  const rowOpacities = [
    useTransform(rowProgress, [0.1, 0.3], [0, 1]),
    useTransform(rowProgress, [0.35, 0.55], [0, 1]),
    useTransform(rowProgress, [0.6, 0.8], [0, 1]),
  ];

  return (
    <section
      ref={sectionRef}
      id="kernquellen"
      className="w-full bg-background px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
    >
      <div className="mx-auto grid w-full max-w-[1400px] grid-cols-1 gap-12 lg:grid-cols-12">
        {/* Sticky Intro-Rail */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="lg:sticky lg:top-24 lg:col-span-4 lg:self-start"
        >
          {/* Verbindung zum Quellenverzeichnis darüber */}
          <div className="mb-6 flex items-center gap-3">
            <div className="relative h-10 w-px bg-border">
              <motion.div
                style={{ scaleY: lineScale }}
                className="absolute inset-0 origin-top bg-[#cc66cc]"
              />
            </div>
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Aus den 20 Quellen destilliert
            </span>
          </div>

          <h2 className="max-w-xl text-balance text-3xl font-medium leading-tight tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Sechs Arbeiten tragen die These.
          </h2>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
            Das Quellenverzeichnis ist breit, aber das Kipppunkt-Argument steht
            auf diesen sechs Referenzen: dem Energiemodell, dem hardware-bewussten
            Vergleich, der kritischen Neubewertung, der neuromorphen Zielplattform
            sowie dem Spiking-Sprachmodell und der INT8-Baseline des Vergleichs.
          </p>

          <a
            href="#quellen"
            className="group mt-9 inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
          >
            Alle 20 Quellen ansehen
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </motion.div>

        {/* Masonry der Kernquellen */}
        <div className="grid grid-cols-1 items-start gap-6 sm:grid-cols-2 lg:col-span-8">
          {columns.map((column, columnIndex) => (
            <motion.div
              key={columnIndex}
              variants={stack}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className={`flex flex-col gap-6 ${columnIndex === 1 ? "sm:mt-12" : ""}`}
            >
              {column.map((reference, index) => (
                <RefCard
                  key={reference.n}
                  reference={reference}
                  featured={columnIndex === 0 && index === 0}
                  borderOpacity={rowOpacities[index]!}
                  mobile={mobile}
                />
              ))}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
