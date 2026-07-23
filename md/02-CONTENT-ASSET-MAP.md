# El Horno — Cartographie contenu & assets

## Source de vérité
Le contenu carte vient de `menu.json` (fourni, 7 catégories, 27 plats). **Ne pas inventer de plats ni de prix** — tout doit venir de ce fichier. Le convertir en un fichier data typé (`content/menu.ts` ou `content/menu.json` importé directement) consommé par les composants de grille carte.

Catégories et comptage : Sandwichs (5), Pasticcio (3), Calzone (4), Patisserie (4), Couscous (3), Burger (1), Pizza (6).

## Correspondance photos
Le dossier local de l'utilisateur (`El_Horno_Café/photos/`) contient `unnamed (1).jpg` → `unnamed (16).jpg`, `unnamed.jpg`, `unnamed.png` (18 fichiers, voir capture d'écran fournie). Seule une partie a été effectivement uploadée dans cette conversation. Statut réel :

| Référence menu.json | Fichier attendu | Plat | Statut dans l'upload actuel |
|---|---|---|---|
| unnamed (5) | unnamed (5).jpg | Pizza Fruit De Mer | ✅ présent (`unnamed__5_.jpg`) |
| unnamed (8) | unnamed (8).jpg | Pizza 4 Fromages | ✅ présent (`unnamed__8_.jpg`) |
| unnamed (9) | unnamed (9).jpg | Sandwich Poulet | ✅ présent (`unnamed__9_.jpg`) |
| unnamed (10) | unnamed (10).jpg | Love (pâtisserie) | ✅ présent (`unnamed__10_.jpg`) |
| unnamed (11) | unnamed (11).jpg | Pasticcio Poulet | ✅ présent (`unnamed__11_.jpg`) |
| unnamed (14) | unnamed (14).jpg | Pizza Poulet Champignons | ✅ présent (`unnamed__14_.jpg`) |
| unnamed (4) | unnamed (4).jpg | Citron (pâtisserie) | ❌ manquant dans cet upload (visible dans le dossier local) |
| unnamed (12) | unnamed (12).jpg | Sandwich Saumon Fumé | ❌ manquant dans cet upload |
| unnamed (2), (3), (6), (13), (15), (16), unnamed.jpg, unnamed.png | — | non référencés dans menu.json (probablement photos d'ambiance / plats hors carte, ex. couscous, salade) | ✅ tous présents sauf (1), (7) |

**Action pour opencode** : demander à l'utilisateur de fournir le dossier `photos/` complet (18 fichiers) plutôt que de retravailler depuis les 12 fichiers déjà uploadés. En attendant, utiliser les 6 photos confirmées ci-dessus pour construire et tester la grille carte, avec un placeholder carré (`--horno-braise` + icône simple) pour les plats sans photo — **ne jamais laisser un `<img>` cassé**.

Les photos non référencées dans `menu.json` (couscous en photo, salades, boissons, ambiance terrasse) sont probablement utilisables pour : hero, section "Process"/four, section "À propos", galerie Instagram-like en bas de page. À trier visuellement une fois le dossier complet reçu.

## Traitement image requis
- Recadrage carré 1:1 systématique (cohérent avec `01-DESIGN-SYSTEM.md`), recadrage centré sur le sujet, pas d'étirement.
- Export en AVIF/WebP avec fallback JPEG, `loading="lazy"` sauf hero.
- Nommage final normalisé : `menu/{categorie-slug}/{plat-slug}.avif`.

## Infos établissement (à intégrer telles quelles, ne pas paraphraser les faits)
- Nom : El Horno — Café, Restaurant, Pizzeria, Boulangerie & Pâtisserie
- Adresse : Al Wilaya, Tétouan 93000
- Téléphone : 06 66 34 22 86
- Horaires : tous les jours 07:00–23:30
- Services : terrasse, menu enfant
- Gamme de prix : 50–100 MAD
- Note Google : 4,4 / 5 (229 avis)
