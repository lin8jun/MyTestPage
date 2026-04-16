const BRIDGE_EVENT_NAME = "cc-pwa-install-state-change";
const BRIDGE_SCRIPT_URL = "https://cdn.jsdelivr.net/npm/@khmyznikov/pwa-install/dist/pwa-install.bundle.js";
const INSTALL_FALLBACK_TIMEOUT_MS = 8000;
const RUNTIME_CONFIG_KEY = "__CC_PWA_RUNTIME__";

// 安装状态枚举，供 Creator 侧界面直接显示使用
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

  return "./sw.427eb.js";
}

function getManifestUrl() {
  const manifestLink = document.querySelector('link[rel="manifest"]');
  if (manifestLink?.href) {
    return manifestLink.href;
  }

  const runtimeManifestUrl = ensureRuntimeManifest();
  return runtimeManifestUrl || "";
}

// 清理安装中的兜底定时器，避免状态长时间卡住
function clearInstallFallbackTimer() {
  if (installFallbackTimer) {
    window.clearTimeout(installFallbackTimer);
    installFallbackTimer = null;
  }
}

// 开始一次安装流程，并设置超时回收
function beginInstallAttempt() {
  loadingError = null;
  installInProgress = true;
  clearInstallFallbackTimer();
  installFallbackTimer = window.setTimeout(() => {
    installInProgress = false;
    emitStateChange();
  }, INSTALL_FALLBACK_TIMEOUT_MS);
}

// 结束一次安装流程
function finishInstallAttempt() {
  clearInstallFallbackTimer();
  installInProgress = false;
}

// 本地调试地址也允许安装能力检测
function isLocalDebugHost() {
  return window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
}

// PWA 相关能力通常要求 https 或 localhost
function isSecureContextForPwa() {
  return window.location.protocol === "https:" || isLocalDebugHost();
}

// 判断当前页面是否已经运行在独立模式
function isStandaloneMode() {
  return window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true;
}

// 判断是否为安卓 Edge
function isAndroidEdge() {
  const ua = window.navigator.userAgent || "";
  return /Android/i.test(ua) && /EdgA/i.test(ua);
}

// 判断是否为桌面版 Edge
function isDesktopEdge() {
  const ua = window.navigator.userAgent || "";
  return !/Android/i.test(ua) && /Edg\//i.test(ua);
}

// 判断是否为安卓 Chrome
function isAndroidChrome() {
  const ua = window.navigator.userAgent || "";
  return /Android/i.test(ua) && /Chrome/i.test(ua) && !/EdgA/i.test(ua);
}

// 判断是否为桌面版 Chrome
function isDesktopChrome() {
  const ua = window.navigator.userAgent || "";
  return !/Android/i.test(ua) && /Chrome\//i.test(ua) && !/Edg\//i.test(ua);
}

// 判断是否为 Firefox 桌面端
function isDesktopFirefox() {
  const ua = window.navigator.userAgent || "";
  return !/Android/i.test(ua) && /Firefox\//i.test(ua);
}

// 判断是否为 Chromium 系浏览器
function isChromiumFamily() {
  return isAndroidChrome() || isAndroidEdge() || isDesktopChrome() || isDesktopEdge();
}

// 刷新运行时检测信号，例如 SW 和已安装应用状态
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

// 创建 pwa-install 宿主节点，并监听库自身事件
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
    // 显式传入运行时 manifest，避免 pwa-install 回退去请求根路径的 /manifest.json
    installElement.setAttribute("manifest-url", manifestUrl);
  }
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

// 状态主标题
function getStatusText(code) {
  switch (code) {
    case STATE_CODE.AVAILABLE:
      // 当前设备可以安装
      return "This device can install the app";
    case STATE_CODE.INSTALLING:
      // 正在拉起安装流程
      return "Opening the install flow";
    case STATE_CODE.INSTALLED:
      // 当前已经是已安装状态
      return "The app is already installed";
    case STATE_CODE.GUIDE:
      // 当前浏览器需要显示安装指引
      return "Installation guide is required";
    case STATE_CODE.UNSUPPORTED:
      // 当前环境暂不支持安装
      return "This environment does not support installation";
    case STATE_CODE.ERROR:
      // 安装组件加载失败
      return "Failed to load the install component";
    default:
      // 正在检查安装状态
      return "Checking installation status";
  }
}

// 安装按钮文案
function getActionLabel(code) {
  switch (code) {
    case STATE_CODE.AVAILABLE:
      // 立即安装
      return "Install Now";
    case STATE_CODE.INSTALLING:
      // 安装中
      return "Installing...";
    case STATE_CODE.INSTALLED:
      // 已安装
      return "Installed";
    case STATE_CODE.GUIDE:
      // 查看安装指引
      return "View Guide";
    case STATE_CODE.UNSUPPORTED:
      // 当前不可安装
      return "Unavailable";
    case STATE_CODE.ERROR:
      // 加载失败
      return "Load Failed";
    default:
      // 检查中
      return "Checking...";
  }
}

// 状态说明文本
function getDetailMessage(code) {
  switch (code) {
    case STATE_CODE.AVAILABLE:
      // 点击安装按钮后会触发浏览器安装流程
      return "Tap the install button to trigger the browser install flow.";
    case STATE_CODE.INSTALLING:
      // 请等待浏览器弹出安装确认
      return "Please wait for the browser install confirmation.";
    case STATE_CODE.INSTALLED:
      // 应用已经安装，后续可以直接从桌面或主屏打开
      return "The app has been installed and can be launched from the desktop or home screen.";
    case STATE_CODE.GUIDE:
      if (isAndroidEdge()) {
        // 安卓 Edge 没有直接可调用的安装提示，需要走浏览器菜单
        return "Android Edge does not expose a direct install prompt. Please open the browser menu and choose Add to phone or Add to home screen.";
      }

      if (isDesktopEdge()) {
        // Windows Edge 可通过地址栏安装图标或浏览器菜单安装
        return "Microsoft Edge can install this app from the App available icon in the address bar or from the browser menu. A manual install guide will also be available.";
      }

      if (isDesktopFirefox()) {
        // Firefox 桌面端默认不提供原生 PWA 安装入口
        return "Firefox does not provide a built-in PWA install flow on desktop. Please use a Chromium-based browser or a Firefox PWA extension.";
      }

      // 当前浏览器无法直接弹出安装提示，需要展示手动安装指引
      return "This browser cannot open the install prompt directly. A manual install guide will be shown.";
    case STATE_CODE.UNSUPPORTED:
      if (isChromiumFamily()) {
        // Chromium 在无痕/InPrivate 窗口下经常不会向页面暴露安装提示，这里给出更准确的说明
        return "The browser did not expose an install prompt to this page. If you are using Incognito or InPrivate browsing, open the site in a regular window and try again.";
      }

      // 请确认 HTTPS、manifest、service worker 等基础能力是否已生效
      return "Please make sure the page is running on HTTPS or localhost and that the manifest and service worker are active.";
    case STATE_CODE.ERROR:
      // 请检查 pwa-install 库是否可以正常加载
      return "Please check whether the pwa-install library can be loaded from the network, or switch to a local deployment.";
    default:
      // 页面初始化完成后会自动刷新安装状态
      return "The installation status will refresh automatically after initialization.";
  }
}

// 组合当前所有信号，生成最终状态
function buildState() {
  const standalone = Boolean(installElement?.isUnderStandaloneMode) || isStandaloneMode();
  const installed = standalone || relatedAppsInstalled;
  const isApple = Boolean(installElement?.isAppleMobilePlatform) || Boolean(installElement?.isAppleDesktopPlatform);
  const isPromptReady = Boolean(promptEvent);
  const componentInstallAvailable = Boolean(installElement?.isInstallAvailable);
  const isDialogSupported = typeof installElement?.showDialog === "function";
  // Chromium 自定义安装按钮最终依赖 beforeinstallprompt；仅组件判断可安装并不代表页面真能拉起安装弹窗
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
    serviceWorkerRegistered,
    serviceWorkerControlled,
    errorMessage: loadingError ? String(loadingError.message || loadingError) : "",
    lastUpdatedAt: Date.now(),
  };

  return currentState;
}

// 向 Creator 侧派发状态变更事件
function emitStateChange() {
  const state = buildState();
  window.dispatchEvent(
    new CustomEvent(BRIDGE_EVENT_NAME, {
      detail: state,
    }),
  );

  return state;
}

// 注册最小 Service Worker，为 PWA 安装资格提供基础能力
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

// 动态加载 pwa-install 库
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

// Chromium 安装事件，只在真正具备安装资格时触发
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

// 安装成功后刷新已安装状态
window.addEventListener("appinstalled", () => {
  finishInstallAttempt();
  relatedAppsInstalled = true;
  emitStateChange();
  void refreshRuntimeSignals();
});

// 页面重新显示时刷新状态
window.addEventListener("pageshow", () => {
  void refreshRuntimeSignals();
});

// 页面重新获得焦点时刷新状态
window.addEventListener("focus", () => {
  void refreshRuntimeSignals();
});

if (navigator.serviceWorker) {
  navigator.serviceWorker.addEventListener("controllerchange", () => {
    void refreshRuntimeSignals();
  });
}

// 暴露给 Creator 侧调用的桥接对象
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
      beginInstallAttempt();
      emitStateChange();

      promptEvent = null;
      if (installElement) {
        installElement.externalPromptEvent = null;
      }

      let promptResult = null;
      try {
        // 这里必须尽量同步触发 prompt()，否则浏览器会丢失用户点击手势，导致安卓端无法拉起安装弹窗
        promptResult = activePromptEvent.prompt();
      } catch (error) {
        loadingError = error;
      }

      return Promise.resolve(promptResult)
        .then(() => activePromptEvent.userChoice || null)
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

    if (installElement?.isInstallAvailable && !isChromiumFamily()) {
      beginInstallAttempt();
      emitStateChange();

      let installResult = null;
      try {
        // 与 beforeinstallprompt 同理，组件安装也要尽量在点击手势所属调用栈内立即触发
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

    await loadInstallLibrary();

    if (!installElement) {
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
      // 手动显示 pwa-install 的安装指引弹层
      installElement.showDialog();
    }

    return emitStateChange();
  },
};

registerServiceWorker();
emitStateChange();
loadInstallLibrary();
void refreshRuntimeSignals();
