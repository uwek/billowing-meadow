const cacheName = "pwa-cache";

const staticAssets = [
  "./",
  // "./favicon.ico",
  "./vendor/mithril.js",
  // "./vendor/pure-min.css",
  "./vendor/pouchdb.min.js",
  "./vendor/lodash.min.js",
  // "./images/icons/icon-144x144.png",
  // "./vendor/promise-polyfill.min.js",
  // "./vendor/fetch.umd.js",
  // "./setup_pwa.js",
  "./app.js"
];

self.addEventListener("install", async function() {
  const cache = await caches.open(cacheName);
  cache.addAll(staticAssets);
});

self.addEventListener("activate", event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", event => {
  const request = event.request;
  const url = new URL(request.url);
  if (url.origin === location.origin) {
    event.respondWith(cacheFirst(request));
  } else {
    event.respondWith(networkFirst(request));
  }
});

async function cacheFirst(request) {
  const cachedResponse = await caches.match(request);
  return cachedResponse || fetch(request);
}

async function networkFirst(request) {
  const dynamicCache = await caches.open("news-dynamic");
  try {
    const networkResponse = await fetch(request);
    dynamicCache.put(request, networkResponse.clone());
    return networkResponse;
  } catch (err) {
    const cachedResponse = await dynamicCache.match(request);
    return cachedResponse || (await caches.match("./fallback.json"));
  }
}
