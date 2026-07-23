# Skill: Design Critique Checklist

**Trigger**: Avant de considérer une section "terminée", et en fin de build.

## Checklist (cocher explicitement chaque item)

- [ ] **Pas de défaut générique** : pas de fond crème #F4F1EA + accent terracotta, pas de fond noir + accent vert acide, pas de style "broadsheet" journal.
- [ ] **Le carré est l'unité constante** : photos 1:1, cards carrées, découpage de grille basé sur le module carré.
- [ ] **Le seul risque esthétique assumé** est la scène Three.js du four — tout le reste reste discipliné et silencieux.
- [ ] **Focus clavier visible** : outline visible sur tous les éléments interactifs, pas de `outline: none` sans remplacement.
- [ ] **Contraste AA** : ratio ≥ 4.5:1 pour texte normal, ≥ 3:1 pour texte large (vérifier avec outil ou calcul).
- [ ] **Responsive testé** : 375px (mobile), 768px (tablette), 1440px (desktop). Grille carrée passe à 2 colonnes puis 1.
- [ ] **`prefers-reduced-motion` respecté** : toutes les animations GSAP et la scène 3D ont une version statique de repli.
- [ ] **Aucune donnée inventée** : tous les plats et prix viennent de `menu.json`, aucun prix arrondi ou inventé.
- [ ] **Images** : aucune `<img>` cassée, placeholder propre `--horno-braise` pour les plats sans photo.
- [ ] **Textes** : voix active, pas de remplissage marketing, cohérence bouton → action.
