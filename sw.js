/* MyPension v5 — service worker : application disponible hors ligne.
   Seuls les fichiers de l'application sont mis en cache ; vos données restent dans le stockage local
   de l'appareil (et dans votre Dropbox si vous l'activez), jamais ici.
   Only app files are cached here — never your data. */
const VERSION = "mypension-v5";
const ASSETS = [
  "./", "./index.html", "./manifest.webmanifest", "./privacy.html",
  "params-2026.js", "tax-tables-2026.js",
  "Fraunces.woff2", "HankenGrotesk.woff2",
  "icon-192.png", "icon-512.png", "maskable-512.png",
  "apple-touch-icon.png", "favicon-32.png", "favicon.svg"
];
// v2 : chart.umd.min.js n'est plus utilisé (graphiques SVG intégrés).
// Pages et configuration : réseau d'abord (sans cache HTTP), copie locale si hors ligne
const NETWORK_FIRST = /\/(index\.html|config\.js|manifest\.webmanifest|privacy\.html|sw\.js|params-\d{4}\.js|tax-tables-\d{4}\.js)?$/;

self.addEventListener("install", e => {
  e.waitUntil((async () => {
    const c = await caches.open(VERSION);
    await c.addAll(ASSETS.map(u => new Request(u, {cache:"reload"})));
    try{ const r = await fetch("./config.js", {cache:"no-store"}); if(r.ok) await c.put("./config.js", r); }catch(err){}
    await self.skipWaiting();
  })());
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k.startsWith("mypension") && k !== VERSION).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
function timeout(ms){ return new Promise((_, rej) => setTimeout(() => rej(new Error("timeout")), ms)); }
async function networkFirst(req){
  const cache = await caches.open(VERSION);
  const url = new URL(req.url);
  const key = url.origin + url.pathname;
  const netReq = req.mode === "navigate" ? req : new Request(key, {cache:"no-store", credentials:"same-origin"});
  try{
    const res = await Promise.race([fetch(netReq), timeout(4000)]);
    if(res && res.ok && (req.mode !== "navigate" || !url.search)) cache.put(key, res.clone());
    return res;
  }catch(err){
    const hit = await cache.match(key, {ignoreSearch:true}) || (req.mode === "navigate" ? await cache.match("./index.html") || await cache.match("./") : null);
    if(hit) return hit;
    throw err;
  }
}
async function cacheFirst(req){
  const cache = await caches.open(VERSION);
  const hit = await cache.match(req, {ignoreSearch:true});
  if(hit) return hit;
  const res = await fetch(req);
  if(res && res.ok) cache.put(req, res.clone());
  return res;
}
self.addEventListener("fetch", e => {
  const req = e.request;
  if(req.method !== "GET") return;
  const url = new URL(req.url);
  if(url.origin !== self.location.origin) return;      // Dropbox, relais fiscal : jamais interceptés
  if(!url.href.startsWith(self.registration.scope)) return;   // autres apps du même site (ex. MyWealth) : jamais interceptées
  if(req.mode === "navigate" || NETWORK_FIRST.test(url.pathname)) e.respondWith(networkFirst(req));
  else e.respondWith(cacheFirst(req));
});
