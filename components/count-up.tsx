"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, type ReactNode } from "react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Formatiert eine Zahl mit deutschem Dezimaltrennzeichen. */
export function formatDE(value: number, decimals = 0): string {
  return value.toFixed(decimals).replace(".", ",");
}

/**
 * Zaehler, der den Zielwert bereits im initialen (server-gerenderten) Markup
 * ausgibt. Die Hochzaehl-Animation laeuft erst, wenn das Element sichtbar wird;
 * bei prefers-reduced-motion wird direkt der Zielwert gezeigt.
 */
export function CountUp({
  value,
  decimals = 0,
  duration = 1.2,
  inView,
}: {
  value: number;
  decimals?: number;
  duration?: number;
  inView?: boolean;
}): ReactNode {
  const ref = useRef<HTMLSpanElement>(null);
  const selfInView = useInView(ref, { once: true, amount: 0.15 });
  const active = inView ?? selfInView;
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (shouldReduceMotion) {
      el.textContent = formatDE(value, decimals);
      return;
    }
    if (!active) return;
    const controls = animate(0, value, {
      duration,
      ease: EASE,
      onUpdate: (v) => {
        el.textContent = formatDE(v, decimals);
      },
    });
    return () => {
      controls.stop();
      el.textContent = formatDE(value, decimals);
    };
  }, [active, value, decimals, duration, shouldReduceMotion]);

  return <span ref={ref}>{formatDE(value, decimals)}</span>;
}
