if ('serviceWorker' in navigator) {
  const register = () => {
    navigator.serviceWorker.register(new URL('sw.js?hallProtocol=3', document.baseURI), {
      scope: './', updateViaCache: 'none',
    }).catch(() => {});
  };
  if (document.readyState === 'complete') register();
  else window.addEventListener('load', register, { once: true });
}
