# FenX Landing

Landing page publique de FenX Agency — sites clé en main + visibilité web pour commerces de proximité.

**Stack** : HTML statique + CSS inline + Cloudflare Pages.

## Déploiement

Auto-deploy via Cloudflare Pages connecté à ce repo, branche `main`.

- Production : https://fenx-agency.com
- Preview : `<sha>.fenx-landing.pages.dev` (auto sur push autres branches)

## Édition

C'est un single-file HTML avec CSS inline. Pour modifier :
1. Edit `index.html`
2. `git commit && git push origin main`
3. Cloudflare Pages déploie automatiquement (~30 sec)

## Sécurité

Headers de sécurité dans `_headers` (HSTS, X-Frame-Options DENY, etc.).
