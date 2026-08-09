"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef, type ReactNode } from "react";
import ParallaxCarousel from "@/components/parallax-carousel";

const easeOutExpo = [0.33, 1, 0.68, 1] as const;

// Reale, selbsterklärende Fotos pro Anwendungsfall.
// images.unsplash.com liefert CORS-Header → funktioniert als WebGL-Textur.
// Zum Austauschen einfach die src-URL ersetzen.
const USE_CASES = [
  {
    src: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&h=1600&auto=format&fit=crop",
    title: "Edge-KI & IoT-Sensoren",
    sub: "Always-on-Erkennung im Milliwatt-Budget",
  },
  {
    src: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?q=80&w=1200&h=1600&auto=format&fit=crop",
    title: "Neuro-Implantate & BCI",
    sub: "EEG-Dekodierung & Brain-Computer-Interfaces",
  },
  {
    src: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1200&h=1600&auto=format&fit=crop",
    title: "Autonome Robotik",
    sub: "Event-Kameras, latenzarme Echtzeitregelung",
  },
  {
    src: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&h=1600&auto=format&fit=crop",
    title: "Weltraum & Satelliten",
    sub: "Energiearme Telemetrie im Orbit",
  },
  {
    src: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1200&h=1600&auto=format&fit=crop",
    title: "Wearables & Health",
    sub: "Kontinuierliches Vitalmonitoring am Körper",
  },
  {
    src: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=1200&h=1600&auto=format&fit=crop",
    title: "Predictive Maintenance",
    sub: "Vibrations-Anomalien in Echtzeit erkennen",
  },
] as const;

export function UseCases(): ReactNode {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.1 });
  const reduce = useReducedMotion();

  const images = USE_CASES.map((u) => u.src);

  return (
    <section
      ref={sectionRef}
      id="anwendungen"
      className="w-full overflow-hidden bg-background py-20 sm:py-24 lg:py-28"
      aria-labelledby="use-cases-heading"
    >
      <div className="mx-auto mb-12 max-w-[1680px] px-10 max-[850px]:px-6">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: easeOutExpo }}
          className="mb-4 font-mono text-xs uppercase tracking-widest text-muted-foreground"
        >
          Anwendungsfälle
        </motion.p>
        <motion.h2
          id="use-cases-heading"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: easeOutExpo, delay: 0.08 }}
          className="max-w-3xl text-[clamp(2rem,5vw,4rem)] font-medium leading-[1.05] tracking-tight text-foreground"
        >
          Wo Spikes heute eingesetzt werden.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: easeOutExpo, delay: 0.16 }}
          className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          Der breitere Anwendungskontext neuromorpher Hardware. Diese Arbeit
          untersucht davon einen klar abgegrenzten Ausschnitt: die
          Sentimentklassifikation auf SST-2.
        </motion.p>
      </div>

      {reduce ? (
        <div className="mx-auto grid max-w-[1680px] grid-cols-1 gap-6 px-10 max-[850px]:px-6 sm:grid-cols-2 lg:grid-cols-3">
          {USE_CASES.map((u) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={u.src}
              src={u.src}
              alt={`${u.title} — ${u.sub}`}
              loading="lazy"
              className="aspect-[3/4] w-full rounded-[20px] border border-border object-cover"
            />
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, ease: easeOutExpo, delay: 0.2 }}
          style={{ width: "100%", height: 520 }}
        >
          <ParallaxCarousel
            images={images}
            imageWidth={360}
            imageHeight={480}
            gap={28}
            parallaxIntensity={0.4}
            loop
            autoplaySpeed={36}
            borderRadius={20}
            showProgress={false}
          />
        </motion.div>
      )}

      {/* Textalternative für Screenreader (Karussell-Canvas ist nicht lesbar) */}
      <ul className="sr-only">
        {USE_CASES.map((u) => (
          <li key={u.title}>
            {u.title} — {u.sub}
          </li>
        ))}
      </ul>
    </section>
  );
}
