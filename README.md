# Routine Matinale — PWA (v7)

Application web installable de routine matinale (13 min) ciblée sur la
tension du psoas (côté droit prioritaire), le renforcement des fessiers et
le gainage des abdos profonds — adaptée sciatique.

## Programme (13 exercices, 13 minutes)

1. Décompression lombaire (45 s) — ouverture en douceur
2. Bascules du bassin (45 s) — apprendre la rétroversion
3. Étirement piriforme droit (60 s)
4. Étirement piriforme gauche (45 s)
5. Étirement psoas droit en fente (60 s)
6. Étirement psoas gauche en fente (45 s)
7. Étirement ischio-jambiers (60 s)
8. Planche latérale droite puis gauche (60 s) — abdos / obliques
9. Curl-up de McGill (60 s) — abdos / colonne neutre
10. Pont fessier (60 s)
11. Gainage ventral, planche (60 s) — abdos / anti-cambrure
12. Bird dog (75 s)
13. Posture de l'enfant (45 s) — retour au calme

Les trois exercices d'abdos (8, 9 et 11) sont choisis pour ne pas solliciter
les fléchisseurs de hanche ni comprimer les disques : gainage isométrique,
stabilité latérale et curl-up à colonne neutre, plutôt que crunchs classiques.

Une transition de 5 s sépare chaque exercice (12 transitions, soit 1 min sur
les 13). Elle affiche déjà le nom et la consigne de l'exercice suivant, pour
te laisser le temps de changer de position. Le bouton « suivant » la saute.
Durée réglable via la constante `TRANSITION` dans `index.html`.

Le curl-up (9), la planche latérale (8) et le bird dog (12) forment le
« Big 3 » de McGill, protocole de référence pour renforcer le tronc en
lombalgie sans mettre la colonne en flexion chargée.

## Principe clé

Sur les étirements du psoas et le pont fessier : **bassin en rétroversion**
(ventre rentré, bas du dos plaqué). Sans ça, on cambre et l'étirement ne
travaille rien. Même consigne sur les gainages : aucune cambrure, aucun
bassin qui tombe.

## Contenu du dossier

- `index.html` — l'application complète
- `manifest.json` — métadonnées PWA
- `sw.js` — service worker (cache v7, mise à jour automatique sur les anciennes installations)
- `icon-192.png`, `icon-512.png` — icônes pour l'écran d'accueil

## Installation sur Android

Héberger sur GitHub Pages ou Netlify Drop, puis ouvrir l'URL dans Chrome →
menu ⋮ → "Installer l'application".

Si une version précédente est déjà installée, le service worker détectera la
nouvelle au prochain lancement avec connexion et mettra à jour
automatiquement.

## Personnaliser

Liste des exercices en haut du `<script>` dans `index.html`, constante
`EXERCISES`. Après modification, pense à incrémenter `CACHE` dans `sw.js`
pour forcer la mise à jour des installations existantes.

Le service worker va chercher la page sur le réseau en priorité (repli sur
le cache au bout de 3 s ou hors ligne), et précharge les fichiers avec
`cache: "reload"`. Ces deux points sont nécessaires : sans eux, une version
périmée peut se retrouver figée dans le cache sans possibilité de
récupération automatique.
