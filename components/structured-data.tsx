import { siteConfig } from "@/lib/metadata";
import { FAQ_ITEMS } from "@/lib/faq-data";
import type { ReactNode } from "react";

function jsonLd(data: object): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function StructuredData(): ReactNode {
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    url: siteConfig.url,
    email: "maxtrummer16@gmail.com",
    affiliation: {
      "@type": "CollegeOrUniversity",
      name: "DBU Digital Business University of Applied Sciences, Berlin",
    },
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.shortDescription,
    url: siteConfig.url,
    description: siteConfig.description,
    inLanguage: "de-DE",
    author: { "@type": "Person", name: siteConfig.name },
  };

  const scholarly = {
    "@context": "https://schema.org",
    "@type": "ScholarlyArticle",
    headline:
      "Bedingte Energieeffizienz von Spiking Neural Networks: Eine Kipppunkt-Analyse gegenüber quantisierten Transformer-Modellen auf SST-2",
    abstract: siteConfig.description,
    inLanguage: "de-DE",
    url: siteConfig.url,
    author: {
      "@type": "Person",
      name: siteConfig.name,
      affiliation: {
        "@type": "CollegeOrUniversity",
        name: "DBU Digital Business University of Applied Sciences, Berlin",
      },
    },
    about: [
      "Spiking Neural Networks",
      "Energieeffizienz",
      "Neuromorphe Hardware",
      "Quantisierung",
    ],
  };

  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(person) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(website) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(scholarly) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(faq) }}
      />
    </>
  );
}
