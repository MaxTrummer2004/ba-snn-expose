import { ImageResponse } from "next/og";

export const alt =
  "Bedingte Energieeffizienz von Spiking Neural Networks — Kipppunkt-Analyse";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "radial-gradient(120% 100% at 85% 10%, #2a0f2a 0%, #0a0a0a 55%)",
          padding: "72px",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 26,
            letterSpacing: 2,
            textTransform: "uppercase",
            color: "#cc66cc",
          }}
        >
          Bachelorarbeit-Exposé · DBU Berlin
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              display: "flex",
              fontSize: 68,
              fontWeight: 600,
              lineHeight: 1.05,
              letterSpacing: -1.5,
              maxWidth: 1000,
            }}
          >
            Bedingte Energieeffizienz von Spiking Neural Networks
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 32,
              color: "rgba(255,255,255,0.7)",
              maxWidth: 900,
            }}
          >
            Kipppunkt-Vergleich mit quantisierten Transformern auf SST-2
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: 28,
          }}
        >
          <span style={{ color: "rgba(255,255,255,0.85)" }}>Max Trummer</span>
          <span style={{ color: "#cc66cc", fontWeight: 600 }}>
            Kipppunkt ~6-9 pJ/Spike
          </span>
        </div>
      </div>
    ),
    { ...size },
  );
}
