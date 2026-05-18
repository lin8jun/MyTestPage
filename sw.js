const CACHE_PREFIX = "slot-portrait-hall-runtime-";
const CACHE_NAME = `${CACHE_PREFIX}v2`;

// 激活前立即接管，避免首次安装后等待过久才生效
self.addEventListener("install", (event) => {
  event.waitUntil(self.skipWaiting());
});

// 清理旧缓存并让当前页面尽快受控
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
  // 只处理同域请求
  // return requestUrl.origin === self.location.origin;
  const isSameOrigin = requestUrl.origin === self.location.origin;

  // 排除API请求（可根据项目调整）
  const isApiRequest = requestUrl.pathname.startsWith("/api/");
  
  return isSameOrigin && !isApiRequest;
}

/**
 * 判断是否应该绕过缓存（如range请求、POST等）
 */
function shouldBypassCache(request) {
  // return request.headers.has("range");
  // Range请求（视频/音频分段加载）绕过缓存
  if (request.headers.has("range")) return true;
  // 非GET请求绕过缓存
  if (request.method !== "GET") return true;

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

// 文档请求优先走网络，失败时回退缓存；静态资源走缓存优先并后台刷新
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
