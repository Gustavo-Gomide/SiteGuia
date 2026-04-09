"use strict";

// Redirect helper for pages that are not ready yet.
// Usage (in the <head> of the page under construction):
//   <script src="/js/em_construcao.js" defer></script>
// Optional override:
//   <script src="/js/em_construcao.js" data-redirect-to="/html/Site/em_construcao.html" defer></script>

(() => {
  const DEFAULT_TARGET = "/html/Site/em_construcao.html";

  const getTarget = () => {
    const script = document.currentScript;
    const attrTarget = script?.getAttribute("data-redirect-to") || "";
    const globalTarget = typeof window.EM_CONSTRUCAO_REDIRECT_TO === "string" ? window.EM_CONSTRUCAO_REDIRECT_TO : "";
    const chosen = (attrTarget || globalTarget || DEFAULT_TARGET).trim();
    return chosen || DEFAULT_TARGET;
  };

  const resolveTargetHref = (target) => {
    // If the site is opened via file://, map a root-relative target like
    // /html/Site/em_construcao.html to the same folder root that contains /html/.
    if (window.location.protocol === "file:" && target.startsWith("/")) {
      try {
        const currentUrl = new URL(window.location.href);
        const currentPathLower = currentUrl.pathname.toLowerCase();
        const htmlIdx = currentPathLower.lastIndexOf("/html/");

        if (htmlIdx !== -1) {
          const fsRoot = currentUrl.pathname.slice(0, htmlIdx);
          const mappedPath = `${fsRoot}${target}`;

          const mappedUrl = new URL(window.location.href);
          mappedUrl.pathname = mappedPath;
          mappedUrl.search = "";
          mappedUrl.hash = "";
          return mappedUrl.href;
        }
      } catch {
        // Fall through to URL() resolution.
      }
    }

    try {
      return new URL(target, window.location.href).href;
    } catch {
      return target;
    }
  };

  const normalizePath = (href) => {
    try {
      const url = new URL(href, window.location.href);
      return url.pathname.replace(/\/+$/, "");
    } catch {
      return String(href).split(/[?#]/)[0].replace(/\/+$/, "");
    }
  };

  const target = getTarget();
  const targetHref = resolveTargetHref(target);

  const currentPath = normalizePath(window.location.href);
  const targetPath = normalizePath(targetHref);

  // Prevent redirect loops.
  if (currentPath === targetPath) return;

  // Use replace() so the back button doesn't bounce.
  try {
    window.location.replace(targetHref);
  } catch {
    window.location.href = targetHref;
  }
})();
