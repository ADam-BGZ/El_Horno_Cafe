# Skill: GSAP Scroll Choreography

**Trigger**: Toute timeline GSAP/ScrollTrigger.

## Contraintes

1. **Un seul geste orchestré au load** (hero : le four se construit à partir de carrés dispersés). Les reveals de scroll ensuite sont sobres : `translate + clip-path`, pas de fade seul.
2. **`ScrollTrigger.pin` réservé à la section Process** — la seule vraie séquence numérotée (01/02/03). Ne pas généraliser le pin à toutes les sections.
3. **Nettoyer les ScrollTriggers** au resize/unmount pour éviter les fuites mémoire.
4. **Micro-interactions hover** sur les cards menu : léger `scale` + apparition du prix/description, rien de plus.
5. **`prefers-reduced-motion`** : toute timeline doit avoir une branche qui désactive ou simplifie les animations.

## Pattern reduced-motion

```typescript
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
  // Version statique : elements déjà visibles, pas d'animation
  gsap.set(elements, { opacity: 1, y: 0, clipPath: 'none' });
} else {
  // Timeline complète avec scroll triggers
}
```

## Timeline hero (structure attendue)

- Carrés dispersés → assemblage du four (scale + translate + rotate).
- Durée totale ~2s, easing `power3.out`.
- Pas de delay entre les carrés — mouvement synchrone organique.

## Reveals de scroll (sections carte/à propos)

- `ScrollTrigger` avec `start: "top 80%"`.
- Animation : `y: 60 → 0` + `clipPath: inset(100% 0 0 0) → inset(0)`.
- Pas de `opacity` seul — toujours couplé au mouvement.
