const BRIDGE_EVENT_NAME = "cc-pwa-install-state-change";
const BRIDGE_SCRIPT_URL = "https://cdn.jsdelivr.net/npm/@khmyznikov/pwa-install/dist/pwa-install.bundle.js";
const INSTALL_FALLBACK_TIMEOUT_MS = 8000;
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

function isAndroidChrome() {
  const ua = window.navigator.userAgent || "";
  return /Android/i.test(ua) && /Chrome/i.test(ua) && !/EdgA/i.test(ua);
}

async function refreshRuntimeSignals() {
  serviceWorkerControlled = Boolean(navigator.serviceWorker?.controller);

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
  installElement.setAttribute("manual-chrome", "true");
  installElement.setAttribute("use-local-storage", "true");
  installElement.style.position = "fixed";
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
      return "当前设备可以安装";
    case STATE_CODE.INSTALLING:
      return "正在拉起安装";
    case STATE_CODE.INSTALLED:
      return "当前已经是已安装状态";
    case STATE_CODE.GUIDE:
      return "当前浏览器需要显示安装指引";
    case STATE_CODE.UNSUPPORTED:
      return "当前环境暂不支持安装";
    case STATE_CODE.ERROR:
      return "安装组件加载失败";
    default:
      return "正在检查安装状态";
  }
}

function getActionLabel(code) {
  switch (code) {
    case STATE_CODE.AVAILABLE:
      return "立即安装";
    case STATE_CODE.INSTALLING:
      return "安装中...";
    case STATE_CODE.INSTALLED:
      return "已安装";
    case STATE_CODE.GUIDE:
      return "查看安装指引";
    case STATE_CODE.UNSUPPORTED:
      return "不可安装";
    case STATE_CODE.ERROR:
      return "加载失败";
    default:
      return "检查中...";
  }
}

function getDetailMessage(code) {
  switch (code) {
    case STATE_CODE.AVAILABLE:
      return "点击安装按钮后会触发浏览器安装流程。";
    case STATE_CODE.INSTALLING:
      return "请等待浏览器弹出安装确认。";
    case STATE_CODE.INSTALLED:
      return "应用已经安装，后续可以直接从桌面或主屏打开。";
    case STATE_CODE.GUIDE:
      return isAndroidEdge()
        ? "当前安卓 Edge 没有提供可直接调用的安装提示，请点击浏览器菜单，再选择“添加到手机”或“添加到主屏幕”。"
        : "iOS Safari 等环境不支持直接拉起安装，会展示手动安装指引。";
    case STATE_CODE.UNSUPPORTED:
      return isAndroidChrome()
        ? "当前浏览器还没有发放安装资格。请确认 manifest、service worker 生效，并留意 Chrome 菜单里是否出现“安装应用”而不是“添加到主屏幕”。"
        : "请确认当前页面运行在 HTTPS 或 localhost，并且 manifest 与 service worker 已生效。";
    case STATE_CODE.ERROR:
      return "请检查网络是否可以加载 pwa-install 库，或改为本地部署该库。";
    default:
      return "页面初始化完成后会自动刷新安装状态。";
  }
}

function buildState() {
  const standalone = Boolean(installElement?.isUnderStandaloneMode) || isStandaloneMode();
  const installed = standalone || relatedAppsInstalled;
  const isApple = Boolean(installElement?.isAppleMobilePlatform) || Boolean(installElement?.isAppleDesktopPlatform);
  const isPromptReady = Boolean(promptEvent);
  const isInstallAvailable = isPromptReady;

  let code = STATE_CODE.CHECKING;

  if (loadingError) {
    code = STATE_CODE.ERROR;
  } else if (installed) {
    code = STATE_CODE.INSTALLED;
  } else if (installInProgress) {
    code = STATE_CODE.INSTALLING;
  } else if (isPromptReady) {
    code = STATE_CODE.AVAILABLE;
  } else if (isApple || isAndroidEdge()) {
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
    isDialogSupported: typeof installElement?.showDialog === "function",
    relatedAppsInstalled,
    relatedAppsChecked,
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
      navigator.serviceWorker.register("./sw.js").then(emitStateChange).catch((error) => {
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
  promptEvent = event;

  if (installElement) {
    installElement.externalPromptEvent = event;
  }

  emitStateChange();
});

window.addEventListener("appinstalled", () => {
  finishInstallAttempt();
  relatedAppsInstalled = true;
  emitStateChange();
  void refreshRuntimeSignals();
});

window.addEventListener("pageshow", () => {
  void refreshRuntimeSignals();
});

window.addEventListener("focus", () => {
  void refreshRuntimeSignals();
});

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
    await loadInstallLibrary();

    if (!installElement) {
      return emitStateChange();
    }

    if (promptEvent && installElement.isInstallAvailable) {
      beginInstallAttempt();
      emitStateChange();

      try {
        await Promise.resolve(installElement.install());
      } catch (error) {
        loadingError = error;
      } finally {
        finishInstallAttempt();
        await refreshRuntimeSignals();
      }

      return emitStateChange();
    }

    if (typeof installElement.showDialog === "function") {
      installElement.showDialog();
    }

    return emitStateChange();
  },

  async showDialog() {
    await loadInstallLibrary();
    await refreshRuntimeSignals();

    if (installElement && typeof installElement.showDialog === "function") {
      installElement.showDialog();
    }

    return emitStateChange();
  },
};

registerServiceWorker();
emitStateChange();
loadInstallLibrary();
void refreshRuntimeSignals();
