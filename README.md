# Bedingte Energieeffizienz von Spiking Neural Networks

Interaktive One-Page-Präsentation zum Bachelorarbeit-Exposé von **Max Trummer**
(DBU Digital Business University of Applied Sciences, Berlin — Studiengang Data
Science and Management, 2026).

Die Seite fasst die Kernidee der Arbeit visuell zusammen: Ab welchem **Kipppunkt**
(Energie pro Spike) schlägt ein Spiking Neural Network einen **quantisierten
Transformer** — und wo eben nicht. Grundlage sind eigene Experimente mit sechs
parametervergleichbaren Modellen auf **SST-2**.

> **Kernbefund:** Gegenüber FP32 ist das SNN durchgängig effizienter (bis ~185×).
> Gegenüber INT8 kippt der Vorteil bei rund **6–9 pJ/Spike** — unterhalb realer
> neuromorpher Chips wie Intel Loihi (23,6 pJ) und IBM TrueNorth (26 pJ).

## Warum diese Seite existiert

Zwei Ziele:

1. **Exposé-Begleiter** — die wissenschaftliche Argumentation (Problem →
   Forschungsfrage → Hypothesen → Methode → Ergebnisse → Zeitplan → Quellen) in
   einer scrollbaren, erklärenden Form. Ersetzt nicht die eingereichte PDF,
   sondern macht sie greifbar.
2. **Frontend-Referenz** — ein von Grund auf gebautes, animationsstarkes
   Next-Interface: eigene WebGL-Shader, scrollgetriebene GSAP-Choreografie und
   durchgehende Accessibility-/Performance-Disziplin.

## Tech-Stack

- **Next.js 16** (App Router) + **React 19**, TypeScript im Strict Mode
  (`noUncheckedIndexedAccess`)
- **Tailwind CSS v4** mit token-basiertem Theming, Dark Mode via `next-themes`
- **motion/react** für Layout- und Scroll-Animationen (`reducedMotion="user"`)
- **GSAP ScrollTrigger** für den gepinnten „Value Prop"-Abschnitt
- **WebGL / GLSL** — zwei eigene Shader (ASCII-Wellen im Hero, Palette-/Wave-Shader
  in Value-Prop und Final-CTA), cursor-reaktiv und theme-aware
- **Lenis** für optionales Smooth-Scrolling

## Sektionen

| Abschnitt | Inhalt |
|-----------|--------|
| Hero | ASCII-Wellen-Shader mit Wipe-Übergang, Titel-Reveal |
| Value Prop | Scroll-gepinntes 3-Schritt-Narrativ (Problem, Ansatz, Kernfrage) mit synchronem Wave-Shader |
| Architektur | SNN-Aufbau, biologische Motivation |
| SNN-Explainer | Neurobiologie, Lernregeln, Hardware, Energie, Anwendungen |
| Forschungskontext | Forschungsstand, -lücke, **Hypothesen H1/H2**, eigener Beitrag |
| Methodik | Vier Schritte von parametergleichen Modellpaaren bis zur Effizienz-Landkarte |
| ANN vs. SNN | Interaktiver Vergleichs-Slider |
| Ergebnisse | Energiefaktoren, Kipppunkt-Verortung, Klassifikationsgüte |
| Hardware-Urteil | Wann SNN gewinnt und wann INT8 |
| Effizienz-Landkarte | Deployment-Empfehlung nach pJ/Spike |
| Zeitplan | 12-Wochen-Plan der Arbeit |
| Quellen | Vollständiges Quellenverzeichnis des Exposés |

## Lokal starten

```bash
npm install
npm run dev
```

Dann [http://localhost:3000](http://localhost:3000) öffnen.

## Skripte

| Befehl | Zweck |
|--------|-------|
| `npm run dev` | Entwicklungsserver |
| `npm run build` | Produktions-Build |
| `npm run start` | Produktionsserver |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript-Prüfung |
| `npm run format` | Prettier |

## Projektstruktur

```
app/
  layout.tsx        Root-Layout (Providers, Theme, Fonts)
  page.tsx          Seitenkomposition
  globals.css       Design-Tokens & Basis-Styles
  sitemap.ts / robots.ts
components/
  hero.tsx              ASCII-Wellen-Hero mit Wipe-Reveal
  value-prop.tsx        GSAP-gepinntes Scroll-Narrativ
  architecture.tsx      SNN-Architektur
  snn-explainer.tsx     Funktionsweise (Tabs)
  research-context.tsx  Forschungsstand & Hypothesen
  methodology.tsx       Methodik-Timeline
  ann-vs-snn.tsx        Vergleichs-Slider
  results-energy.tsx    Energie-Ergebnisse
  hardware-verdict.tsx  Hardware-Urteil (Ringe)
  efficiency-map.tsx    Effizienz-Landkarte
  timeline.tsx          Zeitplan
  sources.tsx           Quellenverzeichnis
  contact-cta.tsx       Kontakt-CTA
  final-cta.tsx         Abschluss mit Shader-Karte
  footer.tsx            Footer
  ascii-waves.tsx / wave-shader.tsx / shader-canvas.tsx   WebGL-Shader
lib/
  metadata.ts       SEO-/OG-Konfiguration
  faq-data.ts        FAQ-Inhalte (JSON-LD)
  shader-variants.ts Palette-Tabelle
inhalt/expose.md    Quelltext des Exposés (Referenz)
```

## Accessibility & Performance

- Skip-to-Content-Link, sichtbare Fokus-Ringe, ARIA-Labels, korrekte
  Heading-Hierarchie
- `prefers-reduced-motion` wird respektiert — Shader rendern dann ein statisches
  Einzelbild statt einer rAF-Schleife
- Shader pausieren offscreen (`IntersectionObserver`) und bei Tab-Wechsel;
  Device-Pixel-Ratio auf 1,5 gedeckelt; WebGL-Kontext wird beim Unmount sauber
  freigegeben

## Deployment

Vor dem Deployment `siteConfig.url` in `lib/metadata.ts` auf die echte
Produktions-URL setzen — sie speist JSON-LD, Open Graph und die Sitemap.

---

Inhaltliche Grundlage: eigenes Bachelorarbeit-Exposé (`inhalt/expose.md`).
Datenwerte (185×, 6–9 pJ/Spike, 79–84 % Genauigkeit) stammen aus einem ersten
operationsbasierten Experimentdurchlauf und werden in der Hauptstudie verfeinert.
