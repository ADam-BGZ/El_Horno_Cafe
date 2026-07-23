# Skill: Three Scene Builder

**Trigger**: Tout travail sur `scene/hero-oven.ts` ou toute nouvelle scène Three.js.

## Contraintes

1. **Un seul objet signature par page** — pas de galerie 3D multiple. Le four à bois est l'objet unique.
2. **Dispose propre** : toujours appeler `geometry.dispose()` et `material.dispose()` au démontage.
3. **Pause hors viewport** : utiliser `IntersectionObserver` pour arrêter le render loop quand la scène n'est pas visible.
4. **Fallback statique** : si WebGL absent ou `prefers-reduced-motion`, afficher un SVG/image statique du four.
5. **Budget perf** : scène < 3 Mo de payload (geometry + textures), cible 60fps sur laptop milieu de gamme.
6. **Pas de texture externe lourde** — utiliser des matériaux simples (MeshStandardMaterial) et de la géométrie procedural/low-poly.
7. **Un seul point de lumière** chaude qui pulse légèrement — pas de setup éclairage complexe.

## Fallback reduced-motion

```typescript
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (prefersReducedMotion) {
  // Render une frame statique, pas d'animation loop
}
```
