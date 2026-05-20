# Sahil Sapariya — Portfolio 2026

Awwwards-caliber single-page developer portfolio. Editorial typography meets atmospheric motion.

## Stack

- **Next.js 14** (App Router)
- **Tailwind CSS**
- **Framer Motion** for reveals, marquees, magnetic cursor
- **Lucide React** for icons

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Build

```bash
npm run build
npm start
```

## Notes

- All content is hardcoded in `app/page.jsx`. Edit the `PROJECTS`, `EXPERIENCE`, `TESTIMONIALS`, `SOCIALS` arrays at the top.
- Custom cursor + heavy motion auto-disable on mobile (≤820px) and when `prefers-reduced-motion: reduce` is set.
- Google Fonts (Fraunces, Instrument Serif, JetBrains Mono, Caveat Brush) loaded via `<link>` in `app/layout.jsx`.
