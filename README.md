# Shrikant Dubale, portfolio

Next.js 15 (static export) + React 19 + TypeScript + Tailwind 4 + Lenis. Fonts are self-hosted through Fontsource.

```
npm install
npm run dev      # http://localhost:3000
npm run build    # static site in ./out
```

## Content
All text lives in `src/lib/data.ts` (PROFILE, NAV, SKILLS, PROJECTS, PATH, ACHIEVEMENTS). Components only read from it.
Every fact comes from the master CV. Nothing is invented; sections the CV has no data for (certifications) are left out.

## Sections
| # | Section | Component |
|---|---|---|
| 00 | Hero (photo, no intro video yet) | `Hero.tsx` |
| 01 | About: hanging ID card | `About.tsx` |
| 02 | Skills: periodic table | `Skills.tsx` |
| 03 | Work: accordion gallery | `Work.tsx` |
| 04 | Experience: scroll-drawn path | `Experience.tsx` |
| 05 | Achievements: pinned horizontal gallery | `Achievements.tsx` |
| 06 | Contact | `Contact.tsx` |

## Images
`python scripts/make-images.py photo.jpg` crops `public/hero-photo.webp`, `public/portrait-bust.webp` and `public/og.jpg`.

## Logos
`npm run logos` regenerates `src/lib/logos.generated.ts` from the `simple-icons` package (CC0). Skills without an icon get a line icon.

## Deploy
Pushing to `main` runs `.github/workflows/deploy.yml`, which builds and publishes to GitHub Pages.
