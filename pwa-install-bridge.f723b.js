const BRIDGE_EVENT_NAME = "cc-pwa-install-state-change";
const BRIDGE_SCRIPT_URL = "https://cdn.jsdelivr.net/npm/@khmyznikov/pwa-install/dist/pwa-install.bundle.js";
const INSTALL_FALLBACK_TIMEOUT_MS = 8000;
const RUNTIME_CONFIG_KEY = "__CC_PWA_RUNTIME__";
const INSTALL_HINT_STORAGE_KEY = "cc-pwa-installed-hint";


const STATE_CODE = {
  CHECKING: "checking",
  AVAILABLE: "available",
  INSTALLING: "installing",
  INSTALLED: "installed",
  GUIDE: "guide",
  UNSUPPORTED: "unsupported",
  ERROR: "error",
};

let promptEvent = null;
let installElement = null;
let importReady = false;
let installInProgress = false;
let loadingError = null;
let currentState = null;
let libraryReadyPromise = null;
let installFallbackTimer = null;
let relatedAppsInstalled = false;
let relatedAppsChecked = false;
let serviceWorkerRegistered = false;
let serviceWorkerControlled = false;
let storedInstallHint = readInstallHint();
let installHintClearedAt = 0;
let pendingAcceptedInstall = false;
let lastPromptOutcome = "";

function readInstallHint() {
  try {
    return window.localStorage?.getItem(INSTALL_HINT_STORAGE_KEY) === "1";
  } catch (error) {
    return false;
  }
}

function writeInstallHint(value) {
  try {
    if (!window.localStorage) {
      return;
    }

    if (value) {
      window.localStorage.setItem(INSTALL_HINT_STORAGE_KEY, "1");
    } else {
      window.localStorage.removeItem(INSTALL_HINT_STORAGE_KEY);
    }
  } catch (error) {
    
  }
}

function setInstallHint(value) {
  const nextValue = Boolean(value);
  if (storedInstallHint === nextValue) {
    return;
  }

  storedInstallHint = nextValue;
  writeInstallHint(nextValue);
  installHintClearedAt = nextValue ? 0 : Date.now();
}

function getDocumentTitle() {
  const titleMeta = document.querySelector('meta[name="apple-mobile-web-app-title"]');
  if (titleMeta?.content) {
    return titleMeta.content;
  }

  return document.title || "PWA App";
}

function getThemeColor() {
  const themeMeta = document.querySelector('meta[name="theme-color"]');
  return themeMeta?.content || "#000A1B";
}

function getAbsolutePageUrl() {
  const pageUrl = new URL(window.location.href);
  pageUrl.hash = "";
  return pageUrl;
}

function getSlashCharacter() {
  return String.fromCharCode(47);
}

function getRuntimeScopeUrl() {
  const pageUrl = getAbsolutePageUrl();
  const scopePath = pageUrl.pathname.replace(/[^/]*$/, "");
  return new URL(scopePath || getSlashCharacter(), pageUrl.origin);
}

function getRuntimeStartUrl() {
  const pageUrl = getAbsolutePageUrl();
  return new URL(pageUrl.pathname + pageUrl.search, pageUrl.origin);
}

function getIconDefinition(elementId, sizes) {
  const linkElement = document.getElementById(elementId);
  if (!linkElement?.href) {
    return null;
  }

  return {
    src: linkElement.href,
    sizes,
    type: linkElement.type || "image/webp",
    purpose: "any maskable",
  };
}

function ensureRuntimeManifest() {
  const existingManifestLink = document.querySelector('link[rel="manifest"]');
  if (existingManifestLink?.href) {
    const runtimeConfig = getRuntimeConfig() || {};
    window[RUNTIME_CONFIG_KEY] = {
      ...runtimeConfig,
      manifestUrl: existingManifestLink.href,
      serviceWorkerUrl: getServiceWorkerScriptUrl(),
      scopeUrl: getRuntimeScopeUrl().href,
      startUrl: getRuntimeStartUrl().href,
    };
    return existingManifestLink.href;
  }

  const manifestIcons = [
    getIconDefinition("cc-pwa-icon-192", "192x192"),
    getIconDefinition("cc-pwa-icon-512", "512x512"),
  ].filter(Boolean);
  const scopeUrl = getRuntimeScopeUrl();
  const startUrl = getRuntimeStartUrl();
  const manifest = {
    id: scopeUrl.href,
    name: getDocumentTitle(),
    short_name: getDocumentTitle(),
    start_url: startUrl.href,
    scope: scopeUrl.href,
    display: "standalone",
    display_override: ["standalone", "minimal-ui", "browser"],
    
    background_color: getThemeColor(),
    theme_color: getThemeColor(),
    icons: manifestIcons,
  };
  const manifestBlob = new Blob([JSON.stringify(manifest)], {
    type: "application/manifest+json",
  });
  const manifestUrl = URL.createObjectURL(manifestBlob);
  const manifestLink = document.createElement("link");
  manifestLink.id = "cc-pwa-manifest-runtime";
  manifestLink.rel = "manifest";
  manifestLink.href = manifestUrl;
  document.head.appendChild(manifestLink);

  window[RUNTIME_CONFIG_KEY] = {
    manifestUrl,
    serviceWorkerUrl: getServiceWorkerScriptUrl(),
    scopeUrl: scopeUrl.href,
    startUrl: startUrl.href,
  };

  return manifestUrl;
}

function getRuntimeConfig() {
  return window[RUNTIME_CONFIG_KEY] || null;
}

function getServiceWorkerScriptUrl() {
  const runtimeConfig = getRuntimeConfig();
  if (runtimeConfig?.serviceWorkerUrl) {
    return runtimeConfig.serviceWorkerUrl;
  }

  const helperLink = document.getElementById("cc-pwa-sw");
  if (helperLink?.href) {
    return helperLink.href;
  }

  return "./sw.2a350.js";
}

function getManifestUrl() {
  const manifestLink = document.querySelector('link[rel="manifest"]');
  if (manifestLink?.href) {
    return manifestLink.href;
  }

  const runtimeManifestUrl = ensureRuntimeManifest();
  return runtimeManifestUrl || "";
}


function clearInstallFallbackTimer() {
  if (installFallbackTimer) {
    window.clearTimeout(installFallbackTimer);
    installFallbackTimer = null;
  }
}


function beginInstallAttempt() {
  loadingError = null;
  installInProgress = true;
  clearInstallFallbackTimer();
  installFallbackTimer = window.setTimeout(() => {
    installInProgress = false;
    emitStateChange();
  }, INSTALL_FALLBACK_TIMEOUT_MS);
}


function finishInstallAttempt() {
  clearInstallFallbackTimer();
  installInProgress = false;
}


function isLocalDebugHost() {
  return window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
}


function isSecureContextForPwa() {
  return window.location.protocol === "https:" || isLocalDebugHost();
}


function isStandaloneMode() {
  return window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true;
}


function isAndroidEdge() {
  const ua = window.navigator.userAgent || "";
  return /Android/i.test(ua) && /EdgA/i.test(ua);
}


function isDesktopEdge() {
  const ua = window.navigator.userAgent || "";
  return !/Android/i.test(ua) && /Edg\//i.test(ua);
}


function isAndroidChrome() {
  const ua = window.navigator.userAgent || "";
  return /Android/i.test(ua) && /Chrome/i.test(ua) && !/EdgA/i.test(ua);
}


function isDesktopChrome() {
  const ua = window.navigator.userAgent || "";
  return !/Android/i.test(ua) && /Chrome\//i.test(ua) && !/Edg\//i.test(ua);
}


function isDesktopFirefox() {
  const ua = window.navigator.userAgent || "";
  return !/Android/i.test(ua) && /Firefox\//i.test(ua);
}


function isChromiumFamily() {
  return isAndroidChrome() || isAndroidEdge() || isDesktopChrome() || isDesktopEdge();
}


function supportsReliableRelatedAppsCheck() {
  return isAndroidChrome();
}


function shouldClearInstallHintFromPrompt() {
  return isAndroidChrome() || isDesktopChrome() || isDesktopEdge();
}


async function refreshRuntimeSignals() {
  serviceWorkerControlled = Boolean(navigator.serviceWorker?.controller);

  if (isStandaloneMode()) {
    setInstallHint(true);
  }

  if ("serviceWorker" in navigator) {
    try {
      const registration = await navigator.serviceWorker.getRegistration();
      serviceWorkerRegistered = Boolean(registration);
    } catch (error) {
      serviceWorkerRegistered = false;
    }
  }

  if (typeof navigator.getInstalledRelatedApps === "function") {
    try {
      const relatedApps = await navigator.getInstalledRelatedApps();
      relatedAppsInstalled = Array.isArray(relatedApps) && relatedApps.some((app) => app?.platform === "webapp");
      if (relatedAppsInstalled) {
        pendingAcceptedInstall = false;
        setInstallHint(true);
      } else if (supportsReliableRelatedAppsCheck() && !isStandaloneMode() && !pendingAcceptedInstall) {
        setInstallHint(false);
      }
    } catch (error) {
      relatedAppsInstalled = false;
    }
  } else {
    relatedAppsInstalled = false;
  }

  relatedAppsChecked = true;
  return emitStateChange();
}


function createHiddenInstallElement() {
  if (installElement) {
    return installElement;
  }

  installElement = document.createElement("pwa-install");
  installElement.id = "cc-pwa-install";
  installElement.setAttribute("manual-apple", "true");
  installElement.setAttribute("disable-chrome", "true");
  installElement.setAttribute("use-local-storage", "true");
  const manifestUrl = getManifestUrl();
  if (manifestUrl) {
    
    installElement.setAttribute("manifest-url", manifestUrl);
  }
  installElement.style.position = "fixed";
  installElement.style.left = "0";
  installElement.style.top = "0";
  installElement.style.width = "0";
  installElement.style.height = "0";
  installElement.style.opacity = "0";
  installElement.style.pointerEvents = "none";
  installElement.style.zIndex = "-1";

  if (promptEvent) {
    installElement.externalPromptEvent = promptEvent;
  }

  installElement.addEventListener("pwa-install-available-event", emitStateChange);
  installElement.addEventListener("pwa-install-success-event", () => {
    loadingError = null;
    setInstallHint(true);
    finishInstallAttempt();
    emitStateChange();
  });
  installElement.addEventListener("pwa-install-fail-event", (event) => {
    finishInstallAttempt();
    loadingError = event?.detail instanceof Error ? event.detail : null;
    emitStateChange();
  });
  installElement.addEventListener("pwa-user-choice-result-event", () => {
    finishInstallAttempt();
    emitStateChange();
  });

  document.body.appendChild(installElement);
  return installElement;
}


function getStatusText(code) {
  switch (code) {
    case STATE_CODE.AVAILABLE:
      
      return "This device can install the app";
    case STATE_CODE.INSTALLING:
      
      return "Opening the install flow";
    case STATE_CODE.INSTALLED:
      
      return "The app is already installed";
    case STATE_CODE.GUIDE:
      
      return "Installation guide is required";
    case STATE_CODE.UNSUPPORTED:
      
      return "This environment does not support installation";
    case STATE_CODE.ERROR:
      
      return "Failed to load the install component";
    default:
      
      return "Checking installation status";
  }
}


function getActionLabel(code) {
  switch (code) {
    case STATE_CODE.AVAILABLE:
      
      return "Install Now";
    case STATE_CODE.INSTALLING:
      
      return "Installing...";
    case STATE_CODE.INSTALLED:
      
      return "Installed";
    case STATE_CODE.GUIDE:
      
      return "View Guide";
    case STATE_CODE.UNSUPPORTED:
      
      return "Unavailable";
    case STATE_CODE.ERROR:
      
      return "Load Failed";
    default:
      
      return "Checking...";
  }
}


function getDetailMessage(code) {
  switch (code) {
    case STATE_CODE.AVAILABLE:
      
      return "Tap the install button to trigger the browser install flow.";
    case STATE_CODE.INSTALLING:
      
      return "Please wait for the browser install confirmation.";
    case STATE_CODE.INSTALLED:
      
      return "The app has been installed and can be launched from the desktop or home screen.";
    case STATE_CODE.GUIDE:
      if (isAndroidEdge()) {
        
        return "Android Edge does not expose a direct install prompt. Please open the browser menu and choose Add to phone or Add to home screen.";
      }

      if (isDesktopEdge()) {
        
        return "Microsoft Edge can install this app from the App available icon in the address bar or from the browser menu. A manual install guide will also be available.";
      }

      if (isDesktopFirefox()) {
        
        return "Firefox does not provide a built-in PWA install flow on desktop. Please use a Chromium-based browser or a Firefox PWA extension.";
      }

      
      return "This browser cannot open the install prompt directly. A manual install guide will be shown.";
    case STATE_CODE.UNSUPPORTED:
      if (isChromiumFamily()) {
        
        return "The browser did not expose an install prompt to this page. If you are using Incognito or InPrivate browsing, open the site in a regular window and try again.";
      }

      
      return "Please make sure the page is running on HTTPS or localhost and that the manifest and service worker are active.";
    case STATE_CODE.ERROR:
      
      return "Please check whether the pwa-install library can be loaded from the network, or switch to a local deployment.";
    default:
      
      return "The installation status will refresh automatically after initialization.";
  }
}


function buildState() {
  const standalone = Boolean(installElement?.isUnderStandaloneMode) || isStandaloneMode();
  const isApple = Boolean(installElement?.isAppleMobilePlatform) || Boolean(installElement?.isAppleDesktopPlatform);
  const isPromptReady = Boolean(promptEvent);
  const componentInstallAvailable = Boolean(installElement?.isInstallAvailable);
  const isDialogSupported = typeof installElement?.showDialog === "function";
  const installed = standalone || relatedAppsInstalled || (storedInstallHint && !isPromptReady);
  
  const isInstallAvailable = isChromiumFamily() ? isPromptReady : (isPromptReady || componentInstallAvailable);

  let code = STATE_CODE.CHECKING;

  if (loadingError) {
    code = STATE_CODE.ERROR;
  } else if (installed) {
    code = STATE_CODE.INSTALLED;
  } else if (installInProgress) {
    code = STATE_CODE.INSTALLING;
  } else if (isInstallAvailable) {
    code = STATE_CODE.AVAILABLE;
  } else if (isDialogSupported && (isApple || isAndroidEdge() || isDesktopEdge())) {
    code = STATE_CODE.GUIDE;
  } else if (importReady) {
    code = STATE_CODE.UNSUPPORTED;
  }

  currentState = {
    code,
    statusText: getStatusText(code),
    actionLabel: getActionLabel(code),
    detailMessage: getDetailMessage(code),
    available: code === STATE_CODE.AVAILABLE,
    canInstall: code === STATE_CODE.AVAILABLE || code === STATE_CODE.GUIDE,
    isStandalone: standalone,
    isApple,
    isSecureContext: isSecureContextForPwa(),
    hasPromptEvent: isPromptReady,
    isInstallAvailable,
    isDialogSupported,
    relatedAppsInstalled,
    relatedAppsChecked,
    storedInstallHint,
    promptOutcome: lastPromptOutcome || "",
    serviceWorkerRegistered,
    serviceWorkerControlled,
    errorMessage: loadingError ? String(loadingError.message || loadingError) : "",
    lastUpdatedAt: Date.now(),
  };

  return currentState;
}


function emitStateChange() {
  const state = buildState();
  window.dispatchEvent(
    new CustomEvent(BRIDGE_EVENT_NAME, {
      detail: state,
    }),
  );

  return state;
}


function registerServiceWorker() {
  if (!("serviceWorker" in navigator) || !isSecureContextForPwa()) {
    return;
  }

  window.addEventListener(
    "load",
    () => {
      const serviceWorkerUrl = getServiceWorkerScriptUrl();
      navigator.serviceWorker
        .register(serviceWorkerUrl)
        .then(emitStateChange)
        .catch((error) => {
          console.warn("[PWA] service worker register failed:", error);
          emitStateChange();
        });
    },
    { once: true },
  );
}


function loadInstallLibrary() {
  if (libraryReadyPromise) {
    return libraryReadyPromise;
  }

  libraryReadyPromise = import(BRIDGE_SCRIPT_URL)
    .then(() => customElements.whenDefined("pwa-install"))
    .then(() => {
      loadingError = null;
      importReady = true;
      createHiddenInstallElement();
      emitStateChange();
    })
    .catch((error) => {
      importReady = true;
      loadingError = error;
      console.error("[PWA] pwa-install load failed:", error);
      emitStateChange();
    });

  return libraryReadyPromise;
}


window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  event.stopPropagation();
  event.stopImmediatePropagation();

  pendingAcceptedInstall = false;
  lastPromptOutcome = "";

  if (storedInstallHint && shouldClearInstallHintFromPrompt() && !isStandaloneMode() && !relatedAppsInstalled) {
    setInstallHint(false);
  }

  promptEvent = event;

  if (installElement) {
    installElement.externalPromptEvent = event;
  }

  emitStateChange();
});


window.addEventListener("appinstalled", () => {
  finishInstallAttempt();
  relatedAppsInstalled = true;
  pendingAcceptedInstall = false;
  lastPromptOutcome = "accepted";
  setInstallHint(true);
  emitStateChange();
  void refreshRuntimeSignals();
});


window.addEventListener("pageshow", () => {
  void refreshRuntimeSignals();
});


window.addEventListener("focus", () => {
  void refreshRuntimeSignals();
});

if (navigator.serviceWorker) {
  navigator.serviceWorker.addEventListener("controllerchange", () => {
    void refreshRuntimeSignals();
  });
}


window.CCPwaInstallBridge = {
  async ready() {
    await loadInstallLibrary();
    await refreshRuntimeSignals();
    return emitStateChange();
  },

  getState() {
    return currentState || emitStateChange();
  },

  async refresh() {
    await loadInstallLibrary();
    await refreshRuntimeSignals();
    return emitStateChange();
  },

  async install() {
    if (promptEvent) {
      const activePromptEvent = promptEvent;
      lastPromptOutcome = "";
      beginInstallAttempt();
      emitStateChange();

      promptEvent = null;
      if (installElement) {
        installElement.externalPromptEvent = null;
      }

      let promptResult = null;
      try {
        
        promptResult = activePromptEvent.prompt();
      } catch (error) {
        loadingError = error;
      }

      return Promise.resolve(promptResult)
        .then(() => activePromptEvent.userChoice || null)
        .then((choice) => {
          lastPromptOutcome = choice?.outcome || "dismissed";
          if (choice?.outcome === "accepted") {
            pendingAcceptedInstall = true;
            setInstallHint(true);
          } else {
            pendingAcceptedInstall = false;
          }

          return choice;
        })
        .catch((error) => {
          pendingAcceptedInstall = false;
          loadingError = error;
          return null;
        })
        .finally(async () => {
          finishInstallAttempt();
          await refreshRuntimeSignals();
        })
        .then(() => emitStateChange());
    }

    if (installElement?.isInstallAvailable && !isChromiumFamily()) {
      beginInstallAttempt();
      emitStateChange();

      let installResult = null;
      try {
        
        installResult = installElement.install();
      } catch (error) {
        loadingError = error;
      }

      return Promise.resolve(installResult)
        .catch((error) => {
          loadingError = error;
          return null;
        })
        .finally(async () => {
          finishInstallAttempt();
          await refreshRuntimeSignals();
        })
        .then(() => emitStateChange());
    }

    return emitStateChange();
  },

  async showDialog() {
    return emitStateChange();
  },
};

registerServiceWorker();
emitStateChange();
loadInstallLibrary();
void refreshRuntimeSignals();
