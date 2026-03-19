/**
 * @file main.js
 * @summary Orquestrador de carregamento de scripts do site.
 *
 * @description
 * Este módulo permite que páginas HTML incluam apenas um script (main.js) e deleguem
 * a ele o carregamento dos demais módulos JavaScript do projeto.
 *
 * Princípios adotados:
 * - Carregamento sequencial (ordem determinística) para preservar dependências
 *   implícitas e a ordem de registro de listeners.
 * - Guardas contra carregamento duplicado (Set interno e detecção de <script src="...">).
 * - include.js é carregado por último, garantindo que módulos que escutam
 *   `includes:loaded` já estejam registrados.
 */

(function () {
    if (window.__siteGuiaMainLoaded) return;
    window.__siteGuiaMainLoaded = true;

    /**
     * Detecta o prefixo base do site (funciona em GitHub Pages com subpath).
     * Ex: /SiteGuia em usuario.github.io/SiteGuia
     */
    function getSiteRoot() {
        const path = window.location.pathname;
        const index = path.indexOf('/html/');
        if (index !== -1) return path.substring(0, index);
        // Fora de /html/ — tenta inferir pelo script atual
        const scripts = document.querySelectorAll('script[src]');
        for (const s of scripts) {
            const src = s.getAttribute('src');
            if (src && src.endsWith('/js/main.js')) {
                return src.slice(0, src.length - '/js/main.js'.length);
            }
        }
        return '';
    }

    const BASE = getSiteRoot();

    const SCRIPTS_IN_ORDER = [
        '/js/svg_registry.js',
        '/js/base.js',
        '/js/efeitos.js',
        '/js/scroll-reveal.js',
        '/js/carousel.js',
        '/js/navbar_lateral.js',
        '/js/navbar_interno.js',
        '/js/nav_interno_builder.js',
        '/js/nav_builder.js',
        '/js/search.js',
        '/js/include.js'
    ].map(p => BASE + p);

    // Expõe o BASE para outros módulos carregados depois
    window.__siteGuiaBase = BASE;

    const loaded = new Set();

    function alreadyPresent(src) {
        return Boolean(document.querySelector(`script[src="${src}"]`));
    }

    function loadScriptSequential(src) {
        return new Promise((resolve, reject) => {
            if (loaded.has(src) || alreadyPresent(src)) {
                loaded.add(src);
                resolve();
                return;
            }

            const s = document.createElement('script');
            s.src = src;
            s.async = false;
            s.setAttribute('data-loaded-by', 'main.js');

            s.onload = () => { loaded.add(src); resolve(); };
            s.onerror = () => reject(new Error('Falha ao carregar: ' + src));

            (document.head || document.documentElement).appendChild(s);
        });
    }

    (async () => {
        for (const src of SCRIPTS_IN_ORDER) {
            await loadScriptSequential(src);
        }
    })().catch((err) => {
        console.error('[main.js] erro ao carregar scripts:', err);
    });
})();

