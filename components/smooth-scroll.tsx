"use client";

import { features } from "@/lib/config";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { useEffect, type ReactNode } from "react";

const LENIS_OPTIONS = {
  // Framerate-unabhängiges Lerp fühlt sich direkter an als duration-basiert.
  // 0.08 = träge/floaty … 0.15 = sehr direkt. 0.1 ist ein guter Mittelwert.
  lerp: 0.075,
  orientation: "vertical" as const,
  gestureOrientation: "vertical" as const,
  smoothWheel: true,
  wheelMultiplier: 1,
  touchMultiplier: 2,
};

const ANCHOR_OFFSET = -100;

export function SmoothScroll({ children }: { children: ReactNode }): ReactNode {
  useEffect(() => {
    if (!features.smoothScroll) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis(LENIS_OPTIONS);

    // Ein einziger rAF-Loop: GSAP-Ticker treibt Lenis, Lenis aktualisiert
    // ScrollTrigger. So bleiben gepinnte Sektionen (Value-Prop) synchron und
    // ruckelfrei, statt gegen einen zweiten rAF-Loop zu laufen.
    lenis.on("scroll", ScrollTrigger.update);

    const update = (time: number): void => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    function handleAnchorClick(event: MouseEvent): void {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest('a[href^="#"]');
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;
      const element = document.querySelector(href);
      if (!element || !(element instanceof HTMLElement)) return;
      event.preventDefault();
      lenis.scrollTo(element, { offset: ANCHOR_OFFSET });
    }

    document.addEventListener("click", handleAnchorClick);
    return () => {
      document.removeEventListener("click", handleAnchorClick);
      gsap.ticker.remove(update);
      lenis.off("scroll", ScrollTrigger.update);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
