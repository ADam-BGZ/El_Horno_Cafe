# Skill: Menu Data Pipeline

**Trigger**: Tout code qui lit ou transforme `menu.json`.

## Contraintes

1. **`menu.json` est la seule source de vérité** pour les plats, prix et descriptions. Interdiction d'inventer ou d'arrondir un prix.
2. **Gérer `description: null`** : fallback = nom du plat affiché en italique, jamais "undefined" ou "null" à l'écran.
3. **Gérer `image_url: null`** : afficher le placeholder carré `--horno-braise` (#E8DCC8) avec une icône simple, jamais une `<img>` cassée.
4. **Prix** : afficher tel quel depuis le JSON (`"45,00 MAD"`, pas `"45 MAD"` arrondi).
5. **Nommage images normalisé** : `menu/{categorie-slug}/{plat-slug}.avif` pour les images traitées.

## Types TypeScript attendus

```typescript
interface MenuItem {
  name: string;
  description: string | null;
  price: string;
  image_url: string | null;
}

type MenuCategory = Record<string, MenuItem[]>;
```

## Correspondance photos (plats avec photo confirmée)

| Plat | Fichier |
|---|---|
| Sandwich Poulet | `photos/unnamed (9).jpg` |
| Sandwich Saumon Fumé | `photos/unnamed (12).jpg` |
| Pasticcio Poulet | `photos/unnamed (11).jpg` |
| Citron | `photos/unnamed (4).jpg` |
| Love | `photos/unnamed (10).jpg` |
| Pizza Fruit De Mer | `photos/unnamed (8).jpg` |
| Pizza Poulet Champignons | `photos/unnamed (14).jpg` |
| Pizza 4 Fromages | `photos/unnamed (5).jpg` |

Les 19 autres plats ont `image_url: null` → placeholder.
