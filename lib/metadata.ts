import type { Metadata } from "next";

export const siteConfig = {
  name: "Max Trummer",
  shortDescription:
    "Bedingte Energieeffizienz von Spiking Neural Networks",
  description:
    "Bachelorarbeit-Exposé: Ab welchem Kipppunkt schlägt ein Spiking Neural Network einen quantisierten Transformer? Eine datenbasierte Kipppunkt-Analyse über Energie pro Spike und Rechenpräzision auf SST-2. DBU Berlin, 2026.",
  // TODO: vor Deployment auf die echte Produktions-URL setzen (Vercel etc.)
  url: "https://snn-kipppunkt.vercel.app",
  creator: "Max Trummer",
  authors: [
    {
      name: "Max Trummer",
      url: "https://snn-kipppunkt.vercel.app",
    },
  ],
  keywords: [
    "Spiking Neural Networks",
    "SNN",
    "Energieeffizienz",
    "quantisierte Transformer",
    "INT8",
    "neuromorphe Hardware",
    "Intel Loihi",
    "SST-2",
    "Kipppunkt-Analyse",
    "Green AI",
    "Bachelorarbeit",
    "DBU Berlin",
  ],
} as const;

export const baseMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name}, ${siteConfig.shortDescription}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [...siteConfig.keywords],
  authors: [...siteConfig.authors],
  creator: siteConfig.creator,
  publisher: siteConfig.name,
  category: "science",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: siteConfig.url,
    title: `${siteConfig.name}, ${siteConfig.shortDescription}`,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name}, ${siteConfig.shortDescription}`,
    description: siteConfig.description,
    creator: siteConfig.creator,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-icon.svg",
  },
  manifest: "/site.webmanifest",
};

export function createMetadata({
  title,
  description,
  path = "/",
  noIndex = false,
}: {
  title?: string;
  description?: string;
  path?: string;
  noIndex?: boolean;
}): Metadata {
  const url = `${siteConfig.url}${path}`;
  const finalTitle = title ?? `${siteConfig.name}, ${siteConfig.shortDescription}`;
  const finalDesc = description ?? siteConfig.description;

  return {
    title: title ?? null,
    description: finalDesc,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: finalTitle,
      description: finalDesc,
      url,
    },
    twitter: {
      title: finalTitle,
      description: finalDesc,
    },
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}
