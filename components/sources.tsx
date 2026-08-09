"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

type Reference = { cite: string; venue: string };

const REFERENCES: Reference[] = [
  {
    cite: "Bal, M., & Sengupta, A. (2024). SpikingBERT: Distilling BERT to train spiking language models using implicit differentiation.",
    venue: "AAAI · 2024",
  },
  {
    cite: "Dampfhoffer, M., Mesquida, T., Valentian, A., & Anghel, L. (2023). Are SNNs really more energy-efficient than ANNs? An in-depth hardware-aware study.",
    venue: "IEEE TETCI · 2023",
  },
  {
    cite: "Davidson, S., & Furber, S. B. (2021). Comparison of artificial and spiking neural networks on digital hardware.",
    venue: "Front. Neuroscience · 2021",
  },
  {
    cite: "Davies, M., et al. (2018). Loihi: A neuromorphic manycore processor with on-chip learning.",
    venue: "IEEE Micro · 2018",
  },
  {
    cite: "Horowitz, M. (2014). 1.1 Computing's energy problem (and what we can do about it).",
    venue: "ISSCC · 2014",
  },
  {
    cite: "Kim, S., et al. (2021). I-BERT: Integer-only BERT quantization.",
    venue: "ICML · 2021",
  },
  {
    cite: "Lemaire, E., et al. (2022). An analytical estimation of spiking neural networks energy efficiency.",
    venue: "ICONIP · 2022",
  },
  {
    cite: "Lv, C., et al. (2023). SpikeBERT: A language Spikformer learned from BERT with knowledge distillation.",
    venue: "arXiv · 2023",
  },
  {
    cite: "Merolla, P., et al. (2011). A digital neurosynaptic core using embedded crossbar memory with 45pJ per spike in 45nm.",
    venue: "IEEE CICC · 2011",
  },
  {
    cite: "Merolla, P. A., et al. (2014). A million spiking-neuron integrated circuit with a scalable communication network and interface.",
    venue: "Science · 2014",
  },
  {
    cite: "Orchard, G., et al. (2021). Efficient neuromorphic signal processing with Loihi 2.",
    venue: "IEEE SiPS · 2021",
  },
  {
    cite: "Patterson, D., et al. (2021). Carbon emissions and large neural network training.",
    venue: "arXiv · 2021",
  },
  {
    cite: "Roy, K., Jaiswal, A., & Panda, P. (2019). Towards spike-based machine intelligence with neuromorphic computing.",
    venue: "Nature · 2019",
  },
  {
    cite: "Socher, R., et al. (2013). Recursive deep models for semantic compositionality over a sentiment treebank.",
    venue: "EMNLP · 2013",
  },
  {
    cite: "Strubell, E., Ganesh, A., & McCallum, A. (2019). Energy and policy considerations for deep learning in NLP.",
    venue: "ACL · 2019",
  },
  {
    cite: "Wang, A., et al. (2019). GLUE: A multi-task benchmark and analysis platform for natural language understanding.",
    venue: "ICLR · 2019",
  },
  {
    cite: "Yan, Z., Bai, Z., & Wong, W.-F. (2024). Reconsidering the energy efficiency of spiking neural networks.",
    venue: "arXiv · 2024",
  },
  {
    cite: "Yik, J., et al. (2025). The NeuroBench framework for benchmarking neuromorphic computing algorithms and systems.",
    venue: "Nature Comms · 2025",
  },
  {
    cite: "Zafrir, O., et al. (2019). Q8BERT: Quantized 8bit BERT.",
    venue: "EMC2 · NeurIPS 2019",
  },
  {
    cite: "Zhu, R.-J., et al. (2023). SpikeGPT: Generative pre-trained language model with spiking neural networks.",
    venue: "arXiv · 2023",
  },
];

const numbered = REFERENCES.map((r, i) => ({ ...r, n: i + 1 }));
type NumberedReference = (typeof numbered)[number];

const columns: NumberedReference[][] = [
  numbered.slice(0, 7),
  numbered.slice(7, 14),
  numbered.slice(14, 20),
];

function RefCard({
  reference,
  hidden = false,
}: {
  reference: NumberedReference;
  hidden?: boolean;
}) {
  return (
    <div
      aria-hidden={hidden}
      className="mb-4 rounded-2xl border border-border bg-muted/60 p-1.5 shadow-sm backdrop-blur-md"
    >
      <div className="rounded-[10px] border border-border bg-background p-6 shadow-sm">
        <div className="flex items-center justify-between gap-3">
          <span className="font-mono text-xs tabular-nums text-[#cc66cc]">
            {String(reference.n).padStart(2, "0")}
          </span>
          <span className="rounded-full border border-border px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
            {reference.venue}
          </span>
        </div>
        <p className="mt-4 text-pretty text-sm leading-relaxed text-foreground/80">
          {reference.cite}
        </p>
      </div>
    </div>
  );
}

export function Sources() {
  const reduceMotion = useReducedMotion();
  const colRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];
  const mobileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduceMotion) return;

    const speeds = [0.5, 0.6, 0.4];
    const els = colRefs.map((r) => r.current);
    const mobile = mobileRef.current;
    const offsets = [0, 0, 0];
    let mobileOffset = 0;
    let animationId = 0;

    const tick = () => {
      els.forEach((el, i) => {
        if (!el) return;
        offsets[i]! += speeds[i]!;
        const half = el.scrollHeight / 2;
        if (offsets[i]! >= half) offsets[i] = 0;
        el.style.transform = `translateY(-${offsets[i]}px)`;
      });

      if (mobile) {
        mobileOffset += 0.5;
        const half = mobile.scrollHeight / 2;
        if (mobileOffset >= half) mobileOffset = 0;
        mobile.style.transform = `translateY(-${mobileOffset}px)`;
      }

      animationId = requestAnimationFrame(tick);
    };

    animationId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animationId);
    // colRefs identity is stable across renders
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduceMotion]);

  return (
    <section
      id="quellen"
      className="relative w-full overflow-hidden bg-background py-20 sm:py-24 lg:py-28 px-4 sm:px-6 lg:px-8"
    >
      <div className="mx-auto w-full max-w-[1400px]">
        <div className="mb-12 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end lg:mb-16">
          <div className="max-w-2xl">
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: EASE }}
              className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground"
            >
              Quellenverzeichnis
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.08 }}
              className="mt-4 text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight leading-[1.05] text-foreground"
            >
              Worauf die Arbeit aufbaut.
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.14 }}
            className="font-mono text-xs uppercase tracking-widest text-muted-foreground"
          >
            20 Quellen · Energiemodell nach Horowitz (2014)
          </motion.p>
        </div>

        {reduceMotion ? (
          <ol className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {numbered.map((reference) => (
              <li key={reference.n}>
                <RefCard reference={reference} />
              </li>
            ))}
          </ol>
        ) : (
          <>
            {/* Mobile — single column marquee */}
            <div className="relative sm:hidden">
              <div className="relative h-[560px] overflow-hidden">
                <div ref={mobileRef}>
                  {[...numbered, ...numbered].map((reference, i) => (
                    <RefCard
                      key={`m-${i}`}
                      reference={reference}
                      hidden={i >= numbered.length}
                    />
                  ))}
                </div>
                <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-background to-transparent" />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-background to-transparent" />
              </div>
            </div>

            {/* Desktop — three marquee columns */}
            <div className="relative hidden gap-4 sm:grid sm:grid-cols-2 lg:grid-cols-3">
              {columns.map((col, c) => (
                <div key={c} className="relative h-[560px] overflow-hidden">
                  <div ref={colRefs[c]}>
                    {[...col, ...col].map((reference, i) => (
                      <RefCard
                        key={`c${c}-${i}`}
                        reference={reference}
                        hidden={i >= col.length}
                      />
                    ))}
                  </div>
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-background to-transparent" />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent" />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
