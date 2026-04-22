const CACHE_PREFIX = "slot-portrait-hall-runtime-";
const CACHE_NAME = `${CACHE_PREFIX}v2`;


self.addEventListener("install", (event) => {
  event.waitUntil(self.skipWaiting());
});


self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys.map((key) => {
            if (key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME) {
              return caches.delete(key);
            }

            return Promise.resolve(false);
          }),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

function shouldHandleRequest(requestUrl) {
  return requestUrl.origin === self.location.origin;
}

function shouldBypassCache(request) {
  return request.headers.has("range");
}

function shouldCacheResponse(response) {
  return Boolean(response) && response.status === 200 && !response.headers.has("content-range");
}

function cacheResponse(request, response) {
  if (!shouldCacheResponse(response)) {
    return Promise.resolve(response);
  }

  const clonedResponse = response.clone();
  return caches.open(CACHE_NAME).then((cache) => {
    cache.put(request, clonedResponse);
    return response;
  });
}


self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") {
    return;
  }

  const requestUrl = new URL(event.request.url);
  if (!shouldHandleRequest(requestUrl)) {
    return;
  }

  if (shouldBypassCache(event.request)) {
    event.respondWith(fetch(event.request));
    return;
  }

  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request)
        .then((response) => cacheResponse(event.request, response))
        .catch(() => caches.match(event.request).then((cached) => cached || Response.error())),
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const networkPromise = fetch(event.request)
        .then((response) => cacheResponse(event.request, response))
        .catch(() => cachedResponse || Response.error());

      return cachedResponse || networkPromise;
    }),
  );
});
