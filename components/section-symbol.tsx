"use client";

import { AnimatePresence, motion } from "motion/react";
import {
  BarChart3,
  BookOpen,
  Brain,
  Clock,
  Cpu,
  Ban,
  FlaskConical,
  GitCompare,
  Layers,
  Rocket,
  Scale,
  Search,
  Sparkles,
  Zap,
} from "lucide-react";
import { type ElementType, useEffect, useRef, useState } from "react";

const SECTION_MAP: Record<string, ElementType> = {
  hero:         Sparkles,
  valueprop:    Zap,
  architecture: Cpu,
  snn:          Brain,
  research:     FlaskConical,
  methodology:  Search,
  annvssnn:     GitCompare,
  results:      BarChart3,
  hardware:     Scale,
  efficiency:   Layers,
  usecases:     Rocket,
  limitations:  Ban,
  timeline:     Clock,
  sources:      BookOpen,
  cta:          Sparkles,
};

function FilledIcon({ Icon, fill }: { Icon: ElementType; fill: number }) {
  return (
    <div style={{ position: "relative", width: 52, height: 52 }}>
      {/* Ghost outline */}
      <Icon size={52} strokeWidth={1.2} style={{ color: "rgba(255,255,255,0.1)", display: "block" }} />
      {/* Pink fill — clips from top to bottom */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: `${fill * 100}%`,
          overflow: "hidden",
          color: "#cc66cc",
          filter: "drop-shadow(0 0 8px #cc66ccaa)",
        }}
      >
        <Icon size={52} strokeWidth={1.2} style={{ display: "block" }} />
      </div>
    </div>
  );
}

export function SectionSymbol() {
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [fill, setFill] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    let prevId = "";

    // Returns the first section whose top has crossed 30% from the bottom of the viewport
    function getActiveSection(): HTMLElement | null {
      const els = Array.from(document.querySelectorAll<HTMLElement>("[data-section]")).reverse();
      const trigger = window.innerHeight * 0.7; // switch when top crosses 70vh from top
      for (const el of els) {
        if (el.getBoundingClientRect().top < trigger) return el;
      }
      return els[els.length - 1] ?? null;
    }

    function calcFill(el: HTMLElement): number {
      const vh = window.innerHeight;
      // fill starts at 0 when section first enters viewport (scrollY = offsetTop - vh)
      // fill reaches 1 after scrolling vh * 0.75 past that point
      const entryScroll = (el as HTMLElement).offsetTop - vh;
      const scrolledIn = window.scrollY - entryScroll;
      return Math.max(0, Math.min(1, scrolledIn / (vh * 0.75)));
    }

    function tick() {
      const el = getActiveSection();
      if (el) {
        const id = el.dataset.section ?? "hero";
        if (id !== prevId) { prevId = id; setActiveSection(id); }
        setFill(calcFill(el));
      }
      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const Icon = SECTION_MAP[activeSection] ?? Sparkles;

  return (
    <div
      aria-hidden="true"
      className="fixed right-8 z-50 pointer-events-none transition-opacity duration-500"
      style={{ top: 28, opacity: activeSection === "hero" ? 0 : 1 }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, scale: 0.85, filter: "blur(6px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 0.85, filter: "blur(6px)" }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          style={{
            padding: 10,
            borderRadius: 16,
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(204,102,204,0.15)",
            backdropFilter: "blur(12px)",
          }}
        >
          <FilledIcon Icon={Icon} fill={fill} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
