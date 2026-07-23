# El Horno — Design System

## Lecture des références
- **glyphic.bio** : nav minimale, hero plein écran (vidéo boucle), séquence numérotée 1/2/3 pour un vrai process, gros blocs image pleine largeur alternés avec texte court, footer dense et structuré, typo display condensée + body neutre.
- **brightbiotech.co.uk / chipsa.design** : grille carrée stricte, beaucoup de blanc, cards produit avec ratio carré constant, micro-labels en majuscules espacées.
- **garrizmudze.com** : layout "atelier d'architecte" — colonnes fines, alignement au pixel, transitions de scroll qui déplacent des blocs entiers plutôt que du fade.

**Ce qu'on emprunte** : la grille carrée + la discipline typographique + les transitions de scroll orchestrées.
**Ce qu'on rejette** : le vocabulaire scientifique littéral, les compteurs de brevets/specs techniques, la vidéo de "molécule" (remplacée par le four/la pâte/le geste).

Attention à l'écueil "IA générique" : pas de fond crème #F4F1EA + accent terracotta, pas de fond noir + accent vert acide, pas de style "broadsheet" journal. Le brief impose déjà l'axe carré/architectural — on va au bout de cet axe plutôt que de retomber sur un défaut.

## Palette (à valider visuellement, 4-6 teintes nommées)
| Nom | Hex | Usage |
|---|---|---|
| `--horno-blanc` | #FAFAF7 | Fond principal, espace négatif |
| `--horno-noir` | #16140F | Texte, nav, blocs pleins |
| `--horno-brique` | #B14B2C | Accent signature — couleur de la brique/du four à bois, PAS un terracotta pastel |
| `--horno-braise` | #E8DCC8 | Fond secondaire chaud, cards |
| `--horno-suie` | #3A362E | Texte secondaire, bordures |
| `--horno-farine` | #F1EEE4 | Fond alterné très clair, distinct du blanc pur |

Justification : la brique/l'ocre foncé du four à bois est le seul accent chaud, tout le reste reste minéral (noir chaud, blancs cassés). Pas de dégradé.

## Typographie
- **Display** : une grotesque condensée à forte personnalité pour les titres géométriques (ex. Neue Machina, PP Neue Montreal, ou Suisse Int'l Condensed — à choisir selon licences disponibles). Utilisée en majuscules, tracking large, très peu de mots par écran.
- **Body** : une sans-serif neutre et très lisible (Inter, General Sans, ou Söhne) pour descriptions de plats et paragraphes.
- **Utilitaire/labels** : la même grotesque que le body en petite taille, majuscules, letter-spacing +0.08em — pour les eyebrows type "CARTE — 27 PLATS", "07:00 – 23:30", "TÉTOUAN".
- Échelle : 96/64/40/24/18/16/13px (desktop), ratio ~1.5, aucune taille "moyenne" floue entre display et body.

## Layout — grille
- Grille de 12 colonnes, module carré de base (unité = 1 carré). Toutes les images produit sont recadrées en carré (1:1) pour respecter l'inspiration "carrés" — cohérent avec les photos déjà carrées fournies.
- Marges extérieures généreuses (min 64px desktop, 24px mobile), le contenu ne touche jamais le bord.
- Alignement strict : tout élément s'aligne sur la grille de carrés, pas de décalage "artistique" aléatoire (l'architecture, pas le collage).

### Wireframes ASCII (sections clés)

```
HERO
┌────────────────────────────────────────┐
│ EL HORNO          MENU  À PROPOS  CONTACT│
│                                          │
│        [scène 3D four à bois]           │
│                                          │
│   CAFÉ · RESTAURANT · PIZZERIA          │
│   BOULANGERIE & PÂTISSERIE              │
│                          [Voir la carte]│
│ TÉTOUAN — 07:00–23:30        ↓ scroll   │
└────────────────────────────────────────┘

PROCESS (le seul endroit où la numérotation 01/02/03 a un sens : le vrai geste du four)
┌───────────┬───────────┬───────────┐
│ 01        │ 02        │ 03        │
│ PÉTRISSAGE│ FAÇONNAGE │ CUISSON AU│
│ [img carré│ [img carré│ FOUR      │
│  pâte]    │  four]    │ [img carré│
│           │           │  pizza]   │
└───────────┴───────────┴───────────┘

GRILLE CARTE (par catégorie)
┌───────┬───────┬───────┬───────┐
│ img   │ img   │ img   │ img   │
│ Nom   │ Nom   │ Nom   │ Nom   │
│ Prix  │ Prix  │ Prix  │ Prix  │
└───────┴───────┴───────┴───────┘
```

## Signature visuelle
**L'élément unique dont ce site se souviendra** : une scène Three.js du four à bois en coupe/wireframe géométrique — un cube/dôme low-poly qui "s'allume" (glow brique) au scroll, entouré d'un système de carrés qui se recomposent pour révéler chaque section (le carré = unité du menu ET du four). Le four est littéralement le moteur visuel de la page : chaque transition de section passe *à travers* lui plutôt que par un fade générique.

## Motion (GSAP)
- Un seul grand geste orchestré au chargement (hero : le four se construit à partir de carrés dispersés), puis des reveals de scroll sobres (translate + clip-path, pas de fade seul).
- Scroll-trigger sur la section Process : les 3 étapes se déclenchent en pin/scrub, cohérent avec un vrai déroulé de fabrication.
- Micro-interactions hover sur les cards menu : léger scale + apparition du prix/description, rien de plus.
- Respect de `prefers-reduced-motion` : toutes les animations ont une version statique de repli.

## Quality bar
- Responsive complet jusqu'à 375px (grille carrée devient 2 colonnes puis 1).
- Focus clavier visible partout, contraste AA minimum sur le texte.
- Un seul risque esthétique assumé (le four Three.js) ; tout le reste reste discipliné et silencieux.
