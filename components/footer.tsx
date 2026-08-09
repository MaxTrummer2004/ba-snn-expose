"use client";

import Link from "next/link";
import { ArrowChip } from "@/components/arrow-chip";
import type { ReactNode } from "react";

const CONTENT_LINKS = [
  { label: "Grundlagen", href: "#architektur" },
  { label: "Methodik", href: "#methodik" },
  { label: "Ergebnisse", href: "#ergebnisse" },
  { label: "Zeitplan", href: "#zeitplan" },
  { label: "Quellen", href: "#quellen" },
];

const ARBEIT_LINKS = [
  { label: "Anwendungsfälle", href: "#anwendungen" },
  { label: "Hypothesen", href: "#forschungskontext" },
  { label: "Effizienz-Landkarte", href: "#ergebnisse" },
  { label: "Exposé (PDF)", href: "/expose.pdf" },
];

const CONTACT_LINKS = [
  { label: "E-Mail", href: "mailto:maxtrummer16@gmail.com" },
  { label: "GitHub", href: "https://github.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
];

export function Footer(): ReactNode {
  return (
    <footer
      id="kontakt"
      className="min-[851px]:sticky min-[851px]:bottom-0 z-0 bg-background text-foreground flex flex-col"
    >
      <div className="mx-auto w-full max-w-[1680px] px-6 lg:px-10 pt-24 lg:pt-32">
        <span className="inline-flex items-center rounded-md border border-foreground/[0.08] px-3.5 py-1.5 font-mono text-xs uppercase tracking-widest text-foreground/70">
          Kontakt
        </span>
        <div className="mt-6 text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-medium tracking-tighter leading-[0.95] max-w-5xl">
          <p className="block">Effizienz folgt der</p>
          <p className="block text-foreground/55">Hardware.</p>
        </div>

        <div className="mt-12">
          <Link
            href="mailto:maxtrummer16@gmail.com"
            className="group inline-flex items-stretch gap-1"
          >
            <span className="px-5 py-3 rounded-md bg-foreground text-background text-xs font-medium tracking-widest uppercase">
              maxtrummer16@gmail.com
            </span>
            <ArrowChip className="bg-foreground text-background" />
          </Link>
        </div>
      </div>

      <div className="mx-auto w-full max-w-[1680px] px-6 lg:px-10 mt-24 lg:mt-32 py-16 lg:py-20 grid grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
        <div className="col-span-2 lg:col-span-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xl font-medium tracking-tight"
          >
            <span aria-hidden className="font-semibold">
              M
            </span>
            Trummer
          </Link>
          <p className="mt-4 text-foreground/55 max-w-xs leading-relaxed">
            Bachelorarbeit-Exposé zur bedingten Energieeffizienz von Spiking
            Neural Networks — DBU Digital Business University of Applied
            Sciences, Berlin.
          </p>
        </div>

        <FooterColumn title="Inhalt" links={CONTENT_LINKS} />
        <FooterColumn title="Arbeit" links={ARBEIT_LINKS} />
        <FooterColumn title="Kontakt" links={CONTACT_LINKS} external />
      </div>

      <div className="mt-auto">
        <div className="mx-auto w-full max-w-[1680px] px-6 lg:px-10 py-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between text-sm text-foreground/55">
          <p>© 2026 Max Trummer · Matrikelnummer 200028 · DBU Berlin</p>
          <p>Studiengang Data Science and Management</p>
        </div>
      </div>
    </footer>
  );
}

interface FooterColumnProps {
  title: string;
  links: ReadonlyArray<{ label: string; href: string }>;
  external?: boolean;
}

function FooterColumn({ title, links, external }: FooterColumnProps): ReactNode {
  return (
    <div className="col-span-1 lg:col-span-2">
      <h4 className="font-mono text-xs uppercase tracking-widest text-foreground/55 mb-5">
        {title}
      </h4>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              {...(external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="text-foreground/85 hover:text-foreground transition-colors"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
