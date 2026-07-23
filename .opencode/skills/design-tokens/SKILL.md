# Skill: Design Tokens

**Trigger**: Dès qu'un composant ou une feuille de style est écrit.

## Palette

| Token | Hex | Usage |
|---|---|---|
| `--horno-blanc` | #FAFAF7 | Fond principal, espace négatif |
| `--horno-noir` | #16140F | Texte, nav, blocs pleins |
| `--horno-brique` | #B14B2C | Accent signature — brique/four à bois |
| `--horno-braise` | #E8DCC8 | Fond secondaire chaud, cards |
| `--horno-suie` | #3A362E | Texte secondaire, bordures |
| `--horno-farine` | #F1EEE4 | Fond alterné très clair |

## Typographie

- **Display** : Space Grotesk (OFL, variable), grotesque géométrique à forte personnalité, utilisée en majuscules, tracking large.
- **Body** : sans-serif neutre (Inter ou équivalent), descriptions et paragraphes.
- **Utilitaire/labels** : body en petite taille, majuscules, `letter-spacing: 0.08em`.
- **Échelle** : 96/64/40/24/18/16/13px (desktop), ratio ~1.5.

## Grille

- 12 colonnes, module carré de base.
- Marges extérieures : min 64px desktop, 24px mobile.
- Toutes les images produit sont carrées (1:1).
- Responsive : 4 colonnes desktop → 2 tablette → 1 mobile.

## Règle dure

Aucune couleur ou taille "magique" hors des tokens ci-dessus. Tout nouveau besoin de couleur repasse par ce fichier, jamais un hex ad hoc dans le CSS.
