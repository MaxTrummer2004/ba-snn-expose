"use client";

import { motion, useInView, type Transition } from "motion/react";
import { useRef, type ReactNode } from "react";

interface RevealHeadlineProps {

  children: string;

  as?: "h1" | "h2" | "h3";

  className?: string;

  id?: string;

  stagger?: number;

  delay?: number;

  amount?: number;

  mutedFrom?: number;
}

export function RevealHeadline({
  children,
  as: Tag = "h2",
  className,
  id,
  stagger = 0.07,
  delay = 0,
  amount = 0.5,
  mutedFrom,
}: RevealHeadlineProps): ReactNode {
  const ref = useRef<HTMLHeadingElement>(null);

  const inView = useInView(ref, { once: true, amount });

  const phrases = children.split(". ").map((p, i, arr) =>
    i < arr.length - 1 ? p + "." : p
  );

  const blockTransition: Transition = {
    duration: 0.7,
    ease: [0.22, 1, 0.36, 1],
  };

  let globalWordIndex = 0;

  return (
    <Tag ref={ref} id={id} className={className}>
      {phrases.map((phrase, pi) => {
        const tokens = phrase.split(/(\s+)/);
        const phraseSpans = tokens.map((token, ti) => {
          if (/^\s+$/.test(token)) {
            return <span key={`s-${pi}-${ti}`}> </span>;
          }
          const wordDelay = delay + globalWordIndex * stagger;
          const isMuted = mutedFrom !== undefined && globalWordIndex >= mutedFrom;
          globalWordIndex++;
          return (
            <span
              key={`w-${pi}-${ti}`}
              className="relative inline-block overflow-hidden align-baseline pb-[0.15em]"
            >
              <span className={["relative", isMuted ? "text-foreground/35" : ""].join(" ")}>
                {token}
              </span>
              <motion.span
                aria-hidden
                initial={{ y: "0%" }}
                animate={inView ? { y: "110%" } : { y: "0%" }}
                transition={{ ...blockTransition, delay: wordDelay }}
                className="absolute inset-x-0 -top-[0.05em] -bottom-[0.2em] bg-foreground will-change-transform"
              />
            </span>
          );
        });
        return (
          <span key={`p-${pi}`} className="whitespace-nowrap">
            {phraseSpans}
            {pi < phrases.length - 1 ? " " : ""}
          </span>
        );
      })}
    </Tag>
  );
}
