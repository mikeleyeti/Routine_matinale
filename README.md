# Routine Matinale — PWA

Application web installable de routine matinale (10 min) pour soulager le nerf
sciatique et travailler les abdominaux.

## Contenu du dossier

- `index.html` — l'application complète
- `manifest.json` — métadonnées PWA (nom, icônes, couleurs)
- `sw.js` — service worker (mode hors ligne)
- `icon-192.png`, `icon-512.png` — icônes pour l'écran d'accueil

## Installer sur Android (chemin recommandé : GitHub Pages)

1. Crée un repo GitHub (public ou privé) et upload les 5 fichiers à la racine.
2. Settings → Pages → Source : `main` / `(root)` → Save.
3. Tu obtiens une URL `https://<pseudo>.github.io/<repo>/`.
4. Ouvre cette URL dans Chrome sur ton Android.
5. Menu (⋮) → "Installer l'application" (ou "Ajouter à l'écran d'accueil").

## Alternatives sans GitHub

- **Netlify Drop** (https://app.netlify.com/drop) : glisse le dossier dans la
  page, tu obtiens une URL HTTPS instantanément. Aucun compte requis pour
  tester.
- **Serveur local + ngrok** :
  ```
  python3 -m http.server 8000
  ngrok http 8000
  ```

## Personnaliser

La liste des exercices se trouve en haut du `<script>` dans `index.html`,
dans la constante `EXERCISES`. Modifie `name`, `duration` (en secondes) et
`instruction` à ta guise.
