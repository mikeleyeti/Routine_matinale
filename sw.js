const CACHE = "routine-v9";
const FILES = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png"
];

// `cache: "reload"` force le passage par le réseau en ignorant le cache HTTP
// du navigateur. Sans ça, addAll peut recopier une version périmée de
// index.html dans le nouveau cache et figer l'app sur l'ancienne version.
const fresh = url => new Request(url, { cache: "reload" });

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES.map(fresh))));
  self.skipWaiting();
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches
      .keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Dernier recours quand ni le réseau ni le cache ne répondent. Renvoyer `null`
// à respondWith ferait échouer la navigation — écran blanc sans explication.
function offlinePage() {
  return new Response(
    '<!DOCTYPE html><html lang="fr"><meta charset="utf-8">' +
      "<title>Routine matinale</title>" +
      '<body style="font-family:system-ui,sans-serif;background:#f5efe6;color:#2d2a26;' +
      'display:flex;align-items:center;justify-content:center;height:100vh;margin:0;' +
      'text-align:center;padding:24px"><div><p>L\'application n\'a pas pu se charger.</p>' +
      "<p>Vérifie ta connexion, puis relance-la.</p></div>",
    { headers: { "Content-Type": "text/html; charset=utf-8" } }
  );
}

// Réseau d'abord pour la page, avec repli sur le cache au bout de 3 s, hors
// ligne, ou si le serveur répond en erreur : on voit toujours la dernière
// version dès qu'il y a du réseau, sans qu'un incident serveur puisse casser
// une installation qui marche.
function networkFirst(request) {
  const fromCache = () => caches.match("./index.html").then(r => r || caches.match("./"));
  const timeout = new Promise(resolve => setTimeout(() => resolve(null), 3000));
  const fromNetwork = fetch(request)
    .then(resp => {
      // Une 404 ou une 500 — déploiement cassé, hébergeur en panne, portail
      // captif — ne doit jamais remplacer une version en cache qui fonctionne.
      if (!resp.ok) return null;
      caches.open(CACHE).then(c => c.put("./index.html", resp.clone()));
      return resp;
    })
    .catch(() => null);
  return Promise.race([fromNetwork, timeout])
    .then(resp => resp || fromCache().then(c => c || fromNetwork))
    .then(resp => resp || offlinePage());
}

// Cache d'abord pour le reste (icônes, manifest) : ces fichiers ne bougent pas.
function cacheFirst(request) {
  return caches.match(request).then(
    r =>
      r ||
      fetch(request).then(resp => {
        if (resp.ok) caches.open(CACHE).then(c => c.put(request, resp.clone()));
        return resp;
      })
  );
}

self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  e.respondWith(e.request.mode === "navigate" ? networkFirst(e.request) : cacheFirst(e.request));
});
