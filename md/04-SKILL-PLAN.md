# El Horno — Skill Plan pour opencode

Ce fichier décrit les "skills" (dossiers de règles réutilisables, format `SKILL.md`) qu'opencode doit créer dans `.opencode/skills/` (ou l'équivalent local) avant de coder. Objectif : que chaque sous-tâche du build (3D, motion, data, design) soit exécutée avec des contraintes explicites plutôt que laissée à l'improvisation, et que ces règles survivent aux sessions suivantes.

Pour chaque skill : nom, quand le déclencher, ce qu'il doit contenir.

## 1. `design-tokens`
**Déclenchement** : dès qu'un composant ou une feuille de style est écrit.
**Contenu** : copier telles quelles les tables de `01-DESIGN-SYSTEM.md` (palette, typo, échelle, grille carrée). Règle dure : aucune couleur/taille "magique" hors des tokens ; tout nouveau besoin de couleur repasse par ce fichier, pas par un hex ad hoc dans le CSS.

## 2. `three-scene-builder`
**Déclenchement** : tout travail sur `scene/hero-oven.ts` ou toute nouvelle scène Three.js.
**Contenu** :
- Un seul objet signature par page (pas de galerie 3D multiple) — cf. contrainte "Restraint" du design system.
- Toujours : dispose propre des géométries/matériaux au démontage, pause du render loop via `IntersectionObserver` hors viewport, fallback statique si `WebGL` absent ou `prefers-reduced-motion`.
- Budget perf : scène doit rester < 3 Mo de payload (geometry+textures), cible 60fps sur laptop milieu de gamme.

## 3. `gsap-scroll-choreography`
**Déclenchement** : toute timeline GSAP/ScrollTrigger.
**Contenu** :
- Un seul geste orchestré au load (hero), reveals sobres ensuite (translate + clip-path, pas de fade seul — cf. design system).
- Toute timeline doit avoir une branche `prefers-reduced-motion` qui désactive ou simplifie.
- `ScrollTrigger.pin` réservé à la section Process (seule vraie séquence numérotée) — ne pas généraliser le pin à toutes les sections.
- Nettoyer les ScrollTriggers au resize/unmount pour éviter les fuites.

## 4. `menu-data-pipeline`
**Déclenchement** : tout code qui lit ou transforme `menu.json`.
**Contenu** :
- `menu.json` est la seule source de vérité pour plats/prix/descriptions — interdiction d'inventer ou d'arrondir un prix.
- Gérer explicitement `description: null` et `image_url: null` (fallback défini une fois, réutilisé partout, jamais de "null" affiché à l'écran).
- Toute image manquante référencée dans `02-CONTENT-ASSET-MAP.md` doit utiliser le placeholder carré défini dans les tokens, pas une image cassée.

## 5. `copy-voice`
**Déclenchement** : rédaction de tout texte visible (hero, à propos, boutons, states vides/erreurs).
**Contenu** :
- Voix active, phrases courtes, vocabulaire de l'utilisateur final ("Voir la carte", "Appeler", "Itinéraire") plutôt que jargon interne.
- Pas de remplissage marketing vague ("une expérience culinaire d'exception") — préférer des faits vérifiables du brief (four à bois, 07:00–23:30, terrasse).
- Cohérence bouton→confirmation (le bouton "Appeler" déclenche `tel:`, pas un formulaire).

## 6. `design-critique-checklist`
**Déclenchement** : avant de considérer une section "terminée", et en fin de build.
**Contenu** : checklist à cocher explicitement —
- [ ] Cette section ressemble-t-elle à un défaut générique (fond crème+terracotta / noir+vert acide / broadsheet) ? Si oui, revoir.
- [ ] Le carré est-il l'unité constante (photos, cards, découpage de grille) ?
- [ ] Le seul risque esthétique assumé est-il la scène Three.js du four, tout le reste étant discipliné ?
- [ ] Focus clavier visible, contraste AA, responsive 375px testé ?
- [ ] `prefers-reduced-motion` respecté sur toutes les timelines/scène 3D ?

## Ordre d'exécution recommandé pour opencode
1. Lire `00-PROJECT-BRIEF.md` et `02-CONTENT-ASSET-MAP.md` en entier avant d'écrire une ligne de code.
2. Créer les 6 skills ci-dessus dans `.opencode/skills/`.
3. Suivre les phases de `03-BUILD-PLAN.md` dans l'ordre — ne pas commencer la 3D/motion avant que la Phase 1 (structure statique + data réelle) soit validée visuellement.
4. Appliquer `design-critique-checklist` à la fin de chaque phase, pas seulement à la fin du projet.
