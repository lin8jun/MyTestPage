if ('serviceWorker' in navigator) {
  const register = () => {
    // The controlled document owns its startup update check. Do not race it
    // with a second registration on window.load (particularly on WebKit).
    if (navigator.serviceWorker.controller) return;
    navigator.serviceWorker.register(new URL('sw.js', document.baseURI), {
      scope: './', updateViaCache: 'none',
    }).catch(() => {});
  };
  if (document.readyState === 'complete') register();
  else window.addEventListener('load', register, { once: true });
}
