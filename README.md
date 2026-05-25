# Routine Matinale — PWA (v2)

Application web installable de routine matinale (10 min) ciblée sur la
tension du psoas (côté droit prioritaire), le renforcement des fessiers et
des abdos profonds.

## Programme (10 exercices, 10 minutes)

1. Chat / Vache (60 s) — mobilité colonne
2. Bascules du bassin (60 s) — apprendre la rétroversion
3. Étirement psoas droit en fente (45 s)
4. Étirement psoas gauche en fente (45 s)
5. Pont fessier (60 s)
6. Dead bug (90 s)
7. Bird dog (90 s)
8. Étirement piriforme droit (45 s)
9. Étirement piriforme gauche (45 s)
10. Relâchement psoas bord de lit, côté droit (60 s)

## Principe clé

Sur les étirements du psoas et le pont fessier : **bassin en rétroversion**
(ventre rentré, bas du dos plaqué). Sans ça, on cambre et l'étirement ne
travaille rien.

## Contenu du dossier

- `index.html` — l'application complète
- `manifest.json` — métadonnées PWA
- `sw.js` — service worker (cache v2, mise à jour automatique sur les anciennes installations)
- `icon-192.png`, `icon-512.png` — icônes pour l'écran d'accueil

## Installation sur Android

Voir le README de la v1, identique : héberger sur GitHub Pages ou Netlify
Drop, puis ouvrir l'URL dans Chrome → menu ⋮ → "Installer l'application".

Si tu avais déjà installé la v1, le service worker détectera la v2 au
prochain lancement avec connexion et mettra à jour automatiquement.

## Personnaliser

Liste des exercices en haut du `<script>` dans `index.html`, constante
`EXERCISES`.
