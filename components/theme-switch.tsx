"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useSyncExternalStore, type ReactNode } from "react";
import { useIntroDone } from "@/lib/intro";

function useIsMounted(): boolean {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}

export function ThemeSwitch(): ReactNode {
  const mounted = useIsMounted();
  const introDone = useIntroDone();
  const { setTheme, resolvedTheme } = useTheme();

  // Während des Ladens ausblenden
  if (!introDone) return null;

  const toggleTheme = (): void => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  if (!mounted) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <button
          className="h-14 w-14 cursor-not-allowed rounded-full bg-foreground/10 opacity-30"
          aria-label="Toggle theme"
          disabled
        />
      </div>
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={toggleTheme}
        className="flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-background text-foreground opacity-80 shadow-lg ring-1 ring-border transition-opacity duration-300 hover:opacity-100 hover:shadow-xl"
        aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
        aria-pressed={isDark}
        type="button"
      >
        {isDark ? (
          <Sun className="h-6 w-6" aria-hidden="true" />
        ) : (
          <Moon className="h-6 w-6" aria-hidden="true" />
        )}
      </button>
    </div>
  );
}
