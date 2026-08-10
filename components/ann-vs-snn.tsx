"use client";

import { useCallback, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Check, CircleDashed, Zap, Brain, MoveHorizontal } from "lucide-react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const MIN = 0;
const MAX = 100;

const rows = [
  {
    title: "Aktivierungsmuster",
    before: "Dauerhaft aktiv, jeder Zeitschritt",
    after: "Sporadisch, nur bei relevantem Input",
  },
  {
    title: "Energieverbrauch",
    before: "Hoch, konstante Matrixmultiplikation",
    after: "Nur bei Spikes, hardwareabhängig",
  },
  {
    title: "Hardware",
    before: "GPU-Cluster, hoher Strombedarf",
    after: "Neuromorphe Chips (Loihi, TrueNorth)",
  },
  {
    title: "Lernmechanismus",
    before: "Backpropagation, nicht biologisch",
    after: "Surrogate Gradients, STDP",
  },
];

const stats = [
  { icon: Zap, value: "185×", label: "sparsamer als der FP32-Transformer bei 0,9 pJ/Spike" },
  { icon: Brain, value: "3. Gen.", label: "neuronaler Netze mit zeitlicher Kodierung" },
];

function Pane({ variant }: { variant: "before" | "after" }) {
  const isAfter = variant === "after";
  return (
    <div className={`absolute inset-0 flex flex-col p-5 sm:p-6 ${isAfter ? "bg-foreground" : "bg-muted"}`}>
      <div className="flex items-center justify-between">
        <span className={`text-sm font-semibold ${isAfter ? "text-background" : "text-muted-foreground"}`}>
          {isAfter ? "Spiking Neural Network" : "Standard ANN"}
        </span>
        <span className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${
          isAfter
            ? "bg-background/10 text-background border border-transparent"
            : "border border-border text-muted-foreground"
        }`}>
          {isAfter ? "SNN" : "ANN"}
        </span>
      </div>

      <div className="mt-5 flex flex-1 flex-col gap-3">
        {rows.map((row) => (
          <div
            key={row.title}
            className={`flex flex-1 items-center gap-3.5 rounded-2xl px-4 ${
              isAfter
                ? "bg-background/[0.08]"
                : "border border-dashed border-border bg-background/60"
            }`}
          >
            <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
              isAfter
                ? "bg-background text-foreground"
                : "border border-border text-muted-foreground"
            }`}>
              {isAfter ? <Check className="h-4 w-4" strokeWidth={2.5} /> : <CircleDashed className="h-4 w-4" />}
            </span>
            <span className="min-w-0">
              <span className={`block truncate max-sm:whitespace-normal text-sm ${isAfter ? "font-semibold text-background" : "font-medium text-foreground/70"}`}>
                {row.title}
              </span>
              <span className={`mt-0.5 block truncate max-sm:whitespace-normal max-sm:line-clamp-2 text-xs ${isAfter ? "text-background/60" : "text-muted-foreground"}`}>
                {isAfter ? row.after : row.before}
              </span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AnnVsSnn() {
  const containerRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLButtonElement>(null);
  const draggingRef = useRef(false);
  const [position, setPosition] = useState(56);
  const [dragging, setDragging] = useState(false);
  const reduceMotion = useReducedMotion();

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.width === 0) return;
    setPosition(Math.min(MAX, Math.max(MIN, ((clientX - rect.left) / rect.width) * 100)));
  }, []);

  const slideTransition = dragging || reduceMotion ? { duration: 0 } : { duration: 0.5, ease: EASE };

  return (
    <section className="w-full bg-background px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="mx-auto w-full max-w-[1400px]">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <h2 className="text-balance text-2xl font-semibold tracking-tight text-foreground sm:text-3xl md:text-4xl lg:text-5xl">
              ANN vs. SNN. Der Regler zeigt den Unterschied.
            </h2>
            <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
              Spiking Neural Networks ersetzen den energieintensiven Dauerbetrieb klassischer Netze durch biologisch inspirierte, ereignisgesteuerte Verarbeitung.
            </p>
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.value} className="rounded-2xl border border-border bg-muted p-5">
                    <Icon className="h-5 w-5 text-muted-foreground" />
                    <p className="mt-4 text-2xl font-semibold tracking-tight text-foreground">{stat.value}</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{stat.label}</p>
                  </div>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, ease: EASE }}
          >
            <div className="rounded-3xl border border-border bg-background p-2 shadow-xl shadow-foreground/5 sm:p-3">
              <div
                ref={containerRef}
                onPointerDown={(e) => {
                  const fromHandle = handleRef.current?.contains(e.target as Node) ?? false;
                  if (e.pointerType === "touch" && !fromHandle) return;
                  draggingRef.current = true;
                  setDragging(true);
                  e.currentTarget.setPointerCapture(e.pointerId);
                  updateFromClientX(e.clientX);
                }}
                onPointerMove={(e) => { if (draggingRef.current) updateFromClientX(e.clientX); }}
                onPointerUp={() => { draggingRef.current = false; setDragging(false); }}
                onPointerCancel={() => { draggingRef.current = false; setDragging(false); }}
                className="relative h-[480px] max-sm:h-[440px] cursor-ew-resize select-none rounded-2xl sm:h-[540px]"
              >
                <div className="absolute inset-0 overflow-hidden rounded-2xl">
                  <Pane variant="before" />
                  <motion.div
                    initial={{ clipPath: "inset(0 100% 0 0)" }}
                    whileInView={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={slideTransition}
                    className="absolute inset-0 z-10"
                  >
                    <Pane variant="after" />
                  </motion.div>
                </div>

                <motion.div
                  initial={{ left: "0%", opacity: 0 }}
                  whileInView={{ left: `${position}%`, opacity: 1 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={slideTransition}
                  className="absolute inset-y-0 z-20 w-0.5 -translate-x-1/2 bg-[#cc66cc]"
                />

                <motion.div
                  initial={{ left: "0%", opacity: 0 }}
                  whileInView={{ left: `${position}%`, opacity: 1 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={slideTransition}
                  className="absolute top-1/2 z-30"
                >
                  <button
                    ref={handleRef}
                    type="button"
                    role="slider"
                    aria-label="ANN vs SNN Vergleich"
                    aria-orientation="horizontal"
                    aria-valuemin={MIN}
                    aria-valuemax={MAX}
                    aria-valuenow={Math.round(position)}
                    aria-valuetext={`${Math.round(position)}% SNN sichtbar`}
                    onKeyDown={(e) => {
                      if (e.key === "ArrowLeft" || e.key === "ArrowDown") { e.preventDefault(); setPosition((v) => Math.max(MIN, v - 6)); }
                      else if (e.key === "ArrowRight" || e.key === "ArrowUp") { e.preventDefault(); setPosition((v) => Math.min(MAX, v + 6)); }
                      else if (e.key === "Home") { e.preventDefault(); setPosition(MIN); }
                      else if (e.key === "End") { e.preventDefault(); setPosition(MAX); }
                    }}
                    className="flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize touch-none items-center justify-center rounded-full border border-border bg-background text-foreground shadow-lg shadow-foreground/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <MoveHorizontal className="h-5 w-5" />
                  </button>
                </motion.div>
              </div>
            </div>
            <p className="mt-4 flex items-center justify-center gap-2 text-xs font-medium text-muted-foreground">
              <MoveHorizontal className="h-3.5 w-3.5" />
              Regler ziehen oder mit Pfeiltasten steuern
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
