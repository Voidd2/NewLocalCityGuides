const CACHE_VERSION = "ylcg-v1";
const PAGE_CACHE = `${CACHE_VERSION}-pages`;
const ASSET_CACHE = `${CACHE_VERSION}-assets`;
const APP_SHELL = ["/nl", "/en", "/de", "/manifest.webmanifest", "/favicon.ico", "/pwa/icon/192", "/pwa/icon/512"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(PAGE_CACHE).then((cache) => Promise.allSettled(APP_SHELL.map((url) => cache.add(url)))),
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys.filter((key) => key.startsWith("ylcg-") && ![PAGE_CACHE, ASSET_CACHE].includes(key)).map((key) => caches.delete(key)),
    )),
  );
  self.clients.claim();
});

async function networkFirst(request) {
  const cache = await caches.open(PAGE_CACHE);
  try {
    const response = await fetch(request);
    if (response.ok) await cache.put(request, response.clone());
    return response;
  } catch {
    const cached = await cache.match(request);
    if (cached) return cached;
    const locale = new URL(request.url).pathname.split("/")[1];
    return (await cache.match(`/${["nl", "en", "de"].includes(locale) ? locale : "nl"}`)) || Response.error();
  }
}

async function cacheFirst(request) {
  const cache = await caches.open(ASSET_CACHE);
  const cached = await cache.match(request);
  if (cached) return cached;
  const response = await fetch(request);
  if (response.ok) await cache.put(request, response.clone());
  return response;
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin || url.pathname === "/sw.js") return;
  if (request.headers.has("RSC") || url.searchParams.has("_rsc")) return;

  if (request.mode === "navigate") {
    event.respondWith(networkFirst(request));
    return;
  }

  if (["style", "script", "font", "image"].includes(request.destination)) {
    event.respondWith(cacheFirst(request));
  }
});
