import { Faq } from "@/components/faq";
import { FinalCta } from "@/components/final-cta";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { Partners } from "@/components/partners";
import { Pillars } from "@/components/pillars";
import { Pricing } from "@/components/pricing";
import { Product } from "@/components/product";
import { StructuredData } from "@/components/structured-data";
import { ValueProp } from "@/components/value-prop";
import { createMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = createMetadata({
  description:
    "The all-in-one platform for product teams to design, deploy, and scale software products faster than ever. Plan, build, and ship from one workspace.",
  path: "/",
});

export default function HomePage(): ReactNode {
  return (
    <>
      <StructuredData />
      <main
        id="main-content"
        className="relative z-10 flex-1 bg-background"
      >
        <Hero />
        <ValueProp />
        <Product />
        <Pillars />
        <Partners />
        <Pricing />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
