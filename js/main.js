/**
 * @file main.js
 * @summary Orquestrador de carregamento de scripts do site.
 */

(function () {
    if (window.__siteGuiaMainLoaded) return;
    window.__siteGuiaMainLoaded = true;

    /**
     * Detecta o prefixo base do site.
     * Resolve o problema de subpastas no GitHub Pages (/Guia/SiteGuia).
     */
    function getSiteRoot() {
        const hostname = window.location.hostname;
        const pathname = window.location.pathname;

        if (hostname.includes('github.io')) {
            return '/Guia/SiteGuia'; 
        }

        const index = pathname.indexOf('/html/');
        if (index !== -1) return pathname.substring(0, index);
        
        return ''; 
    }

    const BASE = getSiteRoot();

    /**
     * CORREÇÃO AUTOMÁTICA DE AMBIENTE (CSS e Favicon)
     * Intercepta os links estáticos do HTML e injeta o BASE se estiver no GitHub.
     * Isso evita erro 404 sem precisar editar os 1.400 arquivos HTML.
     */
    if (window.location.hostname.includes('github.io')) {
        // Corrige Folhas de Estilo (CSS)
        document.querySelectorAll('link[rel="stylesheet"]').forEach(link => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('/') && !href.startsWith(BASE)) {
                link.href = BASE + href;
            }
        });

        // Corrige Favicons e Apple Touch Icons
        document.querySelectorAll('link[rel*="icon"]').forEach(link => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('/') && !href.startsWith(BASE)) {
                link.href = BASE + href;
            }
        });
    }

    // Mapeia os scripts injetando o prefixo BASE correto
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

    // Expõe o BASE para outros módulos (como o include.js e nav_builder.js)
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
        // Notifica o sistema que o BASE está pronto para uso em outros scripts
        window.dispatchEvent(new CustomEvent('siteBaseReady', { detail: { base: BASE } }));
    })().catch((err) => {
        console.error('[main.js] erro ao carregar scripts:', err);
    });
})();