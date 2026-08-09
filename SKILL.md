---
name: react-bits-pro
description: >
  Install and integrate React Bits Pro premium UI components, page-section
  blocks, and landing-page templates into React/Next.js apps via the shadcn
  registry CLI with license-key authentication. Use this skill whenever the user
  wants to add animated components (WebGL/shader backgrounds, GSAP and Motion
  animations, 3D effects, cursor trails, text animations, cards, carousels,
  galleries), pre-built page sections (hero, features, pricing, navigation,
  footer, FAQ, CTA, auth, stats, blog, contact, social proof, about, waitlist,
  showcase, how-it-works, download, ecommerce, profile, 404), or full
  landing-page templates. Also use when the user mentions "react bits",
  "reactbits", "@reactbits-starter", or "@reactbits-pro", or asks for premium
  animated React components, even if they do not name the library directly.
license: Proprietary
compatibility: >
  React 18 or 19. Next.js 14+ (App Router recommended) or any React framework
  that supports client components. Tailwind CSS v4 strongly recommended for
  blocks (they use v4 utility names). Node.js 18+ for the shadcn CLI.
metadata:
  author: reactbits
  version: "2.0"
---

# React Bits Pro Integration

You are integrating **React Bits Pro** — a premium, shadcn-compatible registry of
**101 animated components**, **238 page-section blocks** (21 categories), and
**11 landing-page templates** for React/Next.js apps. Items install as real source
files into the user's project; the user owns and can edit them.

This document is the single source of truth. Follow it literally. Where it says
"verify," verify — do not guess.

---

## Golden rules (read first, never break these)

1. **Never guess a block's import statement.** Block files use a *mix* of `export default`
   and named `export` styles, and the identifier does **not** reliably follow the slug
   (`404-3` exports `NotFound3`; `cta-3` exports `CTA3` but `cta-4` exports `Cta4`). After
   installing a block, read its `export` line and import accordingly. See
   [Importing installed items](#importing-installed-items).
2. **Components use a `-tw` or `-css` suffix; blocks use no suffix.** `silk-waves-tw` is a
   component; `hero-1` is a block. Mismatched names return 404.
3. **The license key is a secret.** Put it in `.env.local`, never commit it, never hardcode it.
4. **Never delete the `"use client"` directive.** Every component and block is a client component.
5. **WebGL/shader components need an explicitly sized parent** (a container with width and height).
6. **Do not overwrite the user's existing `components.json` fields** — only merge in `registries`.
7. **Templates are downloads, not CLI installs.** They come as `.zip` files from the website
   (Ultimate tier). See [Templates](#templates-ultimate-tier).
