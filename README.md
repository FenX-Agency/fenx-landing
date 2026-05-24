# FenX Landing V2

Landing publique de FenX Agency — sites premium clé en main pour commerces de proximité.

**Stack** : HTML standalone + CSS variables + Vanilla JS + Lenis (CDN) + GSAP (CDN) + Cloudflare Pages.

**Design** : Lime Edge Glow palette + Inter Black UPPERCASE + interactions Cuberto-style (smooth scroll, cursor custom, parallax, scroll-reveals, hover 3D).

**Spec design** : voir `docs/superpowers/specs/2026-05-24-landing-fenx-v2-design.md` (dans le repo `FenX-Agency-Operating-System`).

## Déploiement

Auto via Cloudflare Pages connecté à ce repo :
- `main` → production `https://fenx-agency.com`
- `feat/*` → preview deploys `<sha>.fenx-landing.pages.dev`

## Édition

Fichiers à modifier selon besoin :
- `index.html` — structure HTML
- `styles.css` — design system + classes composants
- `scripts/lenis.js` — smooth scroll
- `scripts/cursor.js` — cursor custom blob
- `scripts/parallax.js` — halos parallax
- `scripts/reveals.js` — GSAP scroll reveals
- `scripts/hover-3d.js` — cards 3D hover

Tester en local :
```bash
npx --yes serve . -p 3000
# Open http://localhost:3000
```

## Tags

- `v1-launch-2026-05-24` — version V1 simple (avant refonte premium)
- `v2-launch-XXXX-XX-XX` — version V2 premium (Lime Edge Glow + Cuberto) [à poser en T19]
