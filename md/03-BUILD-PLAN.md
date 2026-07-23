# El Horno — Build Plan

## Stack
- **Framework** : Vite + vanilla TS (ou React si opencode préfère — le site est majoritairement statique, React n'apporte de valeur que pour la grille carte data-driven). Recommandation : **Vite + TypeScript sans framework UI**, pour rester léger et laisser GSAP/Three.js piloter le DOM directement.
- **Motion** : GSAP + ScrollTrigger (+ SplitText si dispo/licence, sinon découpage manuel des lignes de titre).
- **3D** : Three.js, scène unique et légère (un seul objet signature, pas une galerie 3D complète — voir `01-DESIGN-SYSTEM.md`). Charger Three.js en dynamique (`import()`) pour ne pas bloquer le First Contentful Paint.
- **Styles** : CSS natif avec variables (design tokens du `01-DESIGN-SYSTEM.md`), pas de Tailwind imposé mais compatible si préféré.
- **Data** : `menu.json` importé tel quel, transformé en structures typées au build.
- **Déploiement cible** : statique (Netlify/Vercel/GitHub Pages) — pas de backend requis en v1.

## Arborescence cible
```
el-horno/
├── src/
│   ├── main.ts
│   ├── data/menu.ts            # transforme menu.json en types
│   ├── scene/hero-oven.ts      # scène Three.js signature
│   ├── motion/                 # timelines GSAP par section
│   │   ├── hero.ts
│   │   ├── process.ts
│   │   └── menu-grid.ts
│   ├── components/
│   │   ├── nav.ts
│   │   ├── hero.ts
│   │   ├── process.ts
│   │   ├── menu-grid.ts
│   │   ├── about.ts
│   │   └── contact-footer.ts
│   └── styles/
│       ├── tokens.css
│       ├── base.css
│       └── sections.css
├── public/menu/{categorie}/{plat}.avif
├── menu.json
└── index.html
```

## Phases

### Phase 0 — Setup (0.5 j)
- Scaffold Vite + TS, installer `gsap`, `three`.
- Importer `tokens.css` depuis `01-DESIGN-SYSTEM.md` (palette, échelle typo, grille).
- Charger les polices choisies (self-host, pas de FOUT visible : `font-display: swap` + preload).

### Phase 1 — Structure statique & data (1 j)
- Écrire `data/menu.ts` : parser `menu.json`, gérer les champs `null` (description/image) proprement (fallback texte court généré à partir du nom si `description` est `null`, jamais de "undefined" affiché).
- Construire la grille carte (Phase HTML/CSS pure, sans animation) : une section par catégorie, cards carrées, prix aligné.
- Construire nav, footer/contact (adresse, tél, horaires, CTA "Itinéraire"/"Appeler").
- Valider la mise en page à 375 / 768 / 1440px avant d'ajouter la moindre animation.

### Phase 2 — Signature 3D (1.5 j)
- Scène Three.js du four (géométrie low-poly, matériau simple, un seul point de lumière chaude qui pulse légèrement).
- Intégration en hero, resize responsive, pause du rendu quand hors viewport (`IntersectionObserver`) pour la performance.
- Fallback statique (image/SVG du four) si WebGL indisponible ou `prefers-reduced-motion`.

### Phase 3 — Motion GSAP (1.5 j)
- Timeline d'intro hero (assemblage du four à partir de carrés).
- ScrollTrigger pin sur la section Process (3 étapes).
- Reveals de scroll sur les sections carte/à propos (translate + clip-path).
- Micro-interactions hover cards menu.
- Vérifier `prefers-reduced-motion` partout (kill ou simplifie les timelines).

### Phase 4 — Contenu réel & assets (1 j)
- Intégrer les photos confirmées (`02-CONTENT-ASSET-MAP.md`), recadrage carré, export AVIF/WebP.
- Placeholders propres pour les plats sans photo.
- Rédiger les textes courts (hero, à propos, process) — voix active, phrases courtes, jamais de remplissage marketing vide (cf. section "writing" de `01-DESIGN-SYSTEM.md`).

### Phase 5 — Perf & QA (1 j)
- Lazy-load images hors hero, `loading="lazy"` + `decoding="async"`.
- Lighthouse ≥ 90 perf/access/best-practices sur mobile.
- Test clavier complet (focus visible, ordre logique).
- Test sur throttling 3G lent : le site doit rester utilisable sans Three.js chargé.

## Definition of Done
- Les 27 plats de `menu.json` sont tous affichés avec prix exacts, aucune donnée inventée.
- Le four Three.js tourne à 60fps sur un laptop récent, dégrade proprement ailleurs.
- Adresse, téléphone (cliquable `tel:`), horaires et lien itinéraire fonctionnels.
- Design revu contre la checklist "pas de défaut IA générique" du `01-DESIGN-SYSTEM.md`.
