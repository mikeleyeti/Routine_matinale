const CACHE = "routine-v6";
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

// Réseau d'abord pour la page, avec repli sur le cache au bout de 3 s ou hors
// ligne : on voit toujours la dernière version dès qu'il y a du réseau, et
// l'app reste utilisable sans connexion.
function networkFirst(request) {
  const fromCache = () => caches.match("./index.html").then(r => r || caches.match("./"));
  const timeout = new Promise(resolve => setTimeout(() => resolve(null), 3000));
  const fromNetwork = fetch(request)
    .then(resp => {
      if (resp.ok) caches.open(CACHE).then(c => c.put("./index.html", resp.clone()));
      return resp;
    })
    .catch(() => null);
  return Promise.race([fromNetwork, timeout])
    .then(resp => resp || fromCache())
    .then(resp => resp || fromNetwork);
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
