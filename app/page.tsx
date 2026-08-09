import AnnVsSnn from "@/components/ann-vs-snn";
import { Architecture } from "@/components/architecture";
import ContactCta from "@/components/contact-cta";
import { EfficiencyMap } from "@/components/efficiency-map";
import { FinalCta } from "@/components/final-cta";
import { Footer } from "@/components/footer";
import { HardwareVerdict } from "@/components/hardware-verdict";
import { Hero } from "@/components/hero";
import { KeyReferences } from "@/components/key-references";
import { Limitations } from "@/components/limitations";
import { Methodology } from "@/components/methodology";
import { ResearchContext } from "@/components/research-context";
import { ResultsEnergy } from "@/components/results-energy";
import { ScrollCurtain } from "@/components/scroll-curtain";
import { SnnExplainer } from "@/components/snn-explainer";
import { Sources } from "@/components/sources";
import { StructuredData } from "@/components/structured-data";
import { Timeline } from "@/components/timeline";
import { UseCases } from "@/components/use-cases";
import { ValueProp } from "@/components/value-prop";
import { createMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = createMetadata({
  description:
    "Bachelorarbeit-Exposé: Bedingte Energieeffizienz von Spiking Neural Networks — ein Kipppunkt-Vergleich mit quantisierten Transformern auf SST-2. DBU Berlin, 2026.",
  path: "/",
});

export default function HomePage(): ReactNode {
  return (
    <>
      <StructuredData />
      <main id="main-content" className="relative z-10 flex-1 bg-background">
        <div data-section="hero"><Hero /></div>
        <div data-section="valueprop"><ValueProp /></div>
        <div id="architektur" data-section="architecture">
          <Architecture />
        </div>
        <div data-section="snn"><SnnExplainer /></div>
        {/* Curtain: schwarze Sektion steigt beim Scrollen über die weiße */}
        <ScrollCurtain
          id="forschungskontext"
          data-section="research"
          ariaLabelledby="research-context-heading"
          shadow="rgba(0,0,0,0.6)"
          className="z-10 -mt-[140px] w-full bg-accent pt-[80px] text-accent-foreground"
        >
          <ResearchContext />
        </ScrollCurtain>
        {/* Curtain: weiße Sektion steigt beim Scrollen über die schwarze */}
        <ScrollCurtain
          data-section="methodology"
          shadow="rgba(0,0,0,0.35)"
          className="z-20 -mt-[140px] overflow-hidden bg-background pt-[80px]"
        >
          <Methodology />
        </ScrollCurtain>
        <div data-section="annvssnn"><AnnVsSnn /></div>
        <div data-section="results"><ResultsEnergy /></div>
        <div data-section="hardware"><HardwareVerdict /></div>
        <div data-section="efficiency"><EfficiencyMap /></div>
        <div data-section="usecases"><UseCases /></div>
        <div data-section="limitations"><Limitations /></div>
        <div data-section="timeline"><Timeline /></div>
        <div data-section="sources"><Sources /></div>
        <div data-section="sources"><KeyReferences /></div>
        <div data-section="cta"><FinalCta /></div>
        <div data-section="cta"><ContactCta /></div>
      </main>
      <Footer />
    </>
  );
}
