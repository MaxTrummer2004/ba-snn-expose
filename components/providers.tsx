"use client";

import { ShaderVariantProvider } from "@/components/shader-variant-context";
import { SmoothScroll } from "@/components/smooth-scroll";
import { ReducedMotionProvider } from "@/lib/motion";
import { MotionConfig } from "motion/react";
import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }): ReactNode {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <ReducedMotionProvider>
        <MotionConfig reducedMotion="user">
          <ShaderVariantProvider>
            <SmoothScroll>{children}</SmoothScroll>
          </ShaderVariantProvider>
        </MotionConfig>
      </ReducedMotionProvider>
    </ThemeProvider>
  );
}
