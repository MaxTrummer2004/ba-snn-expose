"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";

type ScrollCurtainProps = {
  children: ReactNode;
  className?: string;
  /** Farbe des Schattens unter der Curtain-Kante. */
  shadow?: string;
  id?: string;
  ariaLabelledby?: string;
  "data-section"?: string;
};

/**
 * Sektion, die beim Reinscrollen als „Vorhang" über die vorherige steigt:
 * sie liftet nach oben, ihre Oberkante rundet sich, dann settlet sie flush.
 * Animation ist an den Scroll gekoppelt — passiert erst beim Hinscrollen.
 */
export function ScrollCurtain({
  children,
  className = "",
  shadow = "rgba(0,0,0,0.5)",
  id,
  ariaLabelledby,
  "data-section": dataSection,
}: ScrollCurtainProps): ReactNode {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start 45%"],
  });

  // Basis-Overlap kommt vom negativen Margin (-mt-[140px]) in className.
  // y=140 hebt ihn zu Beginn auf (flush), y=0 gibt vollen Overlap frei.
  const radius = useTransform(scrollYProgress, [0, 1], [160, 28]);
  const y = useTransform(scrollYProgress, [0, 1], [140, 0]);
  const shadowSpread = useTransform(scrollYProgress, [0, 1], [70, 0]);
  const boxShadow = useTransform(
    shadowSpread,
    (s) => `0 -40px ${s + 20}px -30px ${shadow}`,
  );

  return (
    <motion.section
      ref={ref}
      id={id}
      aria-labelledby={ariaLabelledby}
      data-section={dataSection}
      style={{
        borderTopLeftRadius: radius,
        borderTopRightRadius: radius,
        y,
        boxShadow,
      }}
      className={`relative ${className}`}
    >
      {children}
    </motion.section>
  );
}
