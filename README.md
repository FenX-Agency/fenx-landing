# FenX Landing V2

Landing publique de FenX Agency — sites premium clé en main pour commerces de proximité.

**Stack** : Astro 5 + composants `.astro` + React 19 (îlots à la demande) + CSS vanilla + Lenis (CDN) + GSAP (CDN) + Cloudflare Pages.

**Design** : Cosmic Violet palette + Inter Black UPPERCASE + bouton V6 pixel-canvas + interactions Cuberto-style.

**Spec design** : voir `docs/superpowers/specs/2026-05-24-landing-fenx-v2-design.md` (repo `FenX-Agency-Operating-System`).

## Stack — pourquoi Astro

- HTML/CSS quasi-pur par défaut, **zéro JS framework dans le bundle servi** tant qu'on n'utilise pas `client:load`
- Composants `.astro` réutilisables (le bouton pixel-canvas est factorisé 5×)
- Intégration React installée → accès au MCP 21st.dev (`/ui`, `/21`) pour générer des composants premium quand utile
- Build statique compatible Cloudflare Pages out-of-the-box

## Développement local

```bash
npm install
npm run dev     # http://localhost:4321
npm run build   # → dist/
npm run preview # serve dist/ en local
```

## Structure

```
src/
├── layouts/
│   └── Layout.astro       # wrapper HTML/head/body + scripts globaux
├── pages/
│   └── index.astro        # route /
└── components/
    ├── Button.astro       # bouton pill pixel-canvas (réutilisable)
    ├── Header.astro
    ├── Hero.astro
    ├── Probleme.astro
    ├── Offre.astro
    ├── Processus.astro
    └── Footer.astro

public/
├── styles.css             # design system + classes composants
├── scripts/               # vanilla JS (lenis, pixel-canvas, reveals)
├── assets/                # favicon, og-image
└── _headers               # Cloudflare Pages headers
```

## Déploiement Cloudflare Pages

Configuration du projet Cloudflare Pages :
- **Build command** : `npm run build`
- **Build output directory** : `dist`
- **Node version** : 20+ (variable `NODE_VERSION=20`)

Branches :
- `main` → production `https://fenx-agency.com`
- `feat/*` → preview deploys `<sha>.fenx-landing.pages.dev`

## Tags

- `v1-launch-2026-05-24` — version V1 simple (avant refonte premium)
- `v2-launch-XXXX-XX-XX` — version V2 premium (Cosmic Violet + Astro) [à poser après merge main]
