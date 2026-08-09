"use client";

import { motion } from "motion/react";
import { memo, type ReactNode } from "react";
import { Portal } from "@/components/portal";
import SilkWaves from "@/components/silk-waves";


const PortalMemo = memo(Portal);

export function IntroLoader({ progress }: { progress: number }): ReactNode {
  // Dark overlay: full black at 0%, transparent at 100%
  const overlayOpacity = Math.max(0, 1 - progress / 100);

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-0 z-[60] flex items-center justify-center overflow-hidden bg-black text-white"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Framed inner container — matches hero's initial borderRadius + scale */}
      <div
        className="absolute inset-0 overflow-hidden bg-[#120611] flex items-center justify-center"
        style={{ borderRadius: 24, transform: "scale(0.985)", transformOrigin: "center" }}
      >

      {/* SilkWaves — same params as hero, visible from start */}
      <div className="absolute inset-0 bg-[#120611]">
        <SilkWaves
          speed={0.3}
          scale={2.5}
          distortion={0.9}
          curve={1.0}
          contrast={1.1}
          colors={["#0d050d","#1a0a1a","#3d1a3d","#6b2d6b","#cc66cc","#e299e2","#f2b8f2","#ffd6ff"]}
          rotation={-5}
          offsetX={2}
          brightness={0.9}
          opacity={0.9}
          complexity={0.6}
          frequency={0.9}
        />
      </div>

      {/* Dark overlay fades out as progress increases → background gets pinker */}
      <div
        className="absolute inset-0 bg-[#120611] pointer-events-none transition-none"
        style={{ opacity: overlayOpacity }}
      />


{/* Counter — disappears with sphere (part of exit) */}
      <p className="absolute bottom-6 right-6 text-[clamp(56px,11vw,150px)] font-medium leading-none tracking-tighter tabular-nums sm:bottom-10 sm:right-10">
        {progress}
      </p>

      </div>{/* end frame */}
    </motion.div>
  );
}
