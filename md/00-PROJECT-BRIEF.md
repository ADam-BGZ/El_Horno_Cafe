# El Horno — Brief Projet

## Le sujet
El Horno est un café-restaurant-pizzeria-boulangerie-pâtisserie à Tétouan (Al Wilaya, 93000), ouvert 07:00–23:30 tous les jours, terrasse, menu enfant, note 4,4/5 (229 avis Google), gamme de prix 50–100 MAD. La carte est large et artisanale : sandwichs, pasticcio, calzone, pâtisserie, couscous, burger, pizza — cuite au four à bois ("El Horno" = "le four" en espagnol).

## Le paradoxe créatif à assumer
Le brief demande un habillage "biotech/deep-tech premium" (Glyphic, Bright Biotech, Chipsa, Garrizmudze) — grille architecturale, carrés, espace blanc massif, storytelling scroll-driven — appliqué à un café de quartier. C'est volontairement un choix de positionnement : traiter la fabrication du pain et de la pâte à pizza avec le même sérieux visuel qu'un laboratoire traite une molécule. Le four (El Horno) devient l'équivalent du "process de recherche" dans les sites d'inspiration : un objet central, presque scientifique, qu'on met en scène en 3D/scroll.

**Ne pas** copier littéralement l'univers labo (pas de blouses blanches, pas de vocabulaire scientifique, pas de brevets). Emprunter uniquement la *grammaire visuelle* : rigueur géométrique, hiérarchie typographique stricte, séquences numérotées quand elles encodent un vrai process (ex. les étapes de fabrication du pain), motion cinématique sobre.

## Objectif business de la page
Un visiteur doit, en une visite : comprendre le positionnement (four à bois, fait maison, produits variés), voir/ressentir la qualité (photos produit), consulter la carte complète avec prix, et savoir où/quand venir (adresse, horaires, itinéraire, appel).

## Contraintes dures
- Contenu réel fourni : `menu.json` (7 catégories, 27 plats, prix en MAD) + photos produits réelles (voir `04-CONTENT-ASSET-MAP.md`).
- Langue : français (la carte et les avis sont en français).
- Stack imposée : GSAP (scroll/motion) + Three.js (élément 3D signature). Pas de framework CMS lourd requis — site statique/SPA.
- Doit rester lisible comme un restaurant, pas comme un site corporate abstrait : la nourriture doit être désirable, pas juste "élégante".

## Non-objectifs
- Pas de e-commerce / commande en ligne dans le scope v1.
- Pas de compte utilisateur, pas de CMS headless obligatoire (mais architecture data-driven pour pouvoir en brancher un plus tard).
