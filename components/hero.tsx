"use client";

import {
  AnimatePresence,
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useEffect, useState, type ReactNode } from "react";
import SilkWaves from "@/components/silk-waves";
import StaggeredText from "@/components/staggered-text";
import { IntroLoader } from "@/components/intro-loader";
import { Nav } from "@/components/nav";
import { markIntroDone } from "@/lib/intro";

const easeOutExpo = [0.33, 1, 0.68, 1] as const;

const FINAL_RADIUS = 24;
const FRAME_INSET = 10;
const SCROLL_RANGE = 80;
const WIPE_DELAY = 700;

export function Hero(): ReactNode {
  const [heroVisible, setHeroVisible] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  const { scrollY } = useScroll();
  const rawExit = useTransform(scrollY, [0, SCROLL_RANGE], [0, 1], { clamp: true });
  const exit = useSpring(rawExit, { stiffness: 120, damping: 22, mass: 0.4 });
  const scale = useTransform(exit, [0, 1], [1 - FRAME_INSET / 500, 1]);
  const borderRadius = useTransform(exit, [0, 1], [FINAL_RADIUS, 0]);

  useEffect(() => {
    if (!loading) return;
    const id = window.setInterval(() => {
      setProgress((p) => Math.min(p + 1, 100));
    }, 45);
    return () => window.clearInterval(id);
  }, [loading]);

  useEffect(() => {
    if (!loading || progress < 100) return;
    const holdT = window.setTimeout(() => {
      setHeroVisible(true);
      setLoading(false);
      markIntroDone();
      // Content erscheint nachdem Hintergrund sichtbar ist
      window.setTimeout(() => setContentVisible(true), 900);
    }, WIPE_DELAY);
    return () => window.clearTimeout(holdT);
  }, [loading, progress]);

  useEffect(() => {
    if (!loading) return;
    const el = document.documentElement;
    const prev = el.style.overflow;
    el.style.overflow = "hidden";
    return () => { el.style.overflow = prev; };
  }, [loading]);

  return (
    <>
      <Nav delay={1.3} />

      <motion.section className="relative w-full h-screen max-md:h-[100dvh] overflow-hidden">
        <div className="relative w-full h-full flex items-center justify-center">
          <motion.div
            className="relative w-full h-full overflow-hidden bg-[#120611]"
            style={{ borderRadius, scale }}
            initial={false}
            animate={{ scale: progress >= 100 ? 1 : 0.985, opacity: progress >= 100 ? 1 : 0 }}
            transition={{ duration: 0.6, ease: easeOutExpo }}
          >
            {/* Base: dunkel */}
            <div aria-hidden="true" className="absolute inset-0 w-full h-full bg-[#120611]" />

            {/* Silk Waves Hintergrund */}
            <motion.div
              aria-hidden="true"
              className="absolute inset-0 w-full h-full bg-[#1a0a1a]"
              initial={{ opacity: 0 }}
              animate={{ opacity: heroVisible ? 1 : 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              {progress >= 100 && (
                <SilkWaves
                  speed={0.3}
                  scale={2.5}
                  distortion={0.9}
                  curve={1.0}
                  contrast={1.1}
                  colors={[
                    "#0d050d",
                    "#1a0a1a",
                    "#3d1a3d",
                    "#6b2d6b",
                    "#cc66cc",
                    "#e299e2",
                    "#f2b8f2",
                    "#ffd6ff",
                  ]}
                  rotation={-5}
                  offsetX={2}
                  brightness={0.9}
                  opacity={0.9}
                  complexity={0.6}
                  frequency={0.9}
                />
              )}
            </motion.div>

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-between max-md:justify-center pt-36 max-[850px]:pt-28 text-white pointer-events-none w-full">
              <div className="relative pl-16 max-[850px]:pl-8 mt-12 pb-6 overflow-visible">
                {contentVisible && (
                  <StaggeredText
                    as="h1"
                    text={"Energieeffizienz|Spiking Neural Networks"}
                    separator="|"
                    segmentBy="words"
                    direction="bottom"
                    blur
                    delay={90}
                    duration={1.0}
                    easing={[0.22, 1, 0.36, 1]}
                    className="max-w-[22ch] text-[clamp(2.75rem,7.75vw,7.75rem)] font-medium leading-[0.95] tracking-tight"
                  />
                )}
              </div>

              <div className="flex items-end justify-between gap-8 px-10 pb-10 max-[850px]:flex-col max-[850px]:items-start max-[850px]:px-6 max-[850px]:pb-6">
                <motion.p
                  className="max-w-xl text-2xl max-md:text-base font-medium leading-snug tracking-tight text-white/90 will-change-[opacity,filter]"
                  initial={{ opacity: 0, filter: "blur(8px)" }}
                  animate={contentVisible ? { opacity: 1, filter: "blur(0px)" } : { opacity: 0, filter: "blur(8px)" }}
                  transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
                >
                  Bachelorarbeit-Exposé, DBU Digital Business University of Applied Sciences, Berlin, 2026
                </motion.p>
              </div>
            </div>

          </motion.div>
        </div>
      </motion.section>

      <AnimatePresence>
        {loading && <IntroLoader key="intro" progress={progress} />}
      </AnimatePresence>
    </>
  );
}
