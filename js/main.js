/**
 * @file main.js - Versão Autocorreção GitHub Pages
 */

(function () {
    if (window.__siteGuiaMainLoaded) return;
    window.__siteGuiaMainLoaded = true;

    // 1. Identifica a raiz do projeto dinamicamente
    function getSiteRoot() {
        const hostname = window.location.hostname;
        const pathname = window.location.pathname;

        // Se estiver no GitHub Pages (gustavo-gomide.github.io/SiteGuia)
        if (hostname.includes('github.io')) {
            return '/SiteGuia'; 
        }
        // Se estiver no Localhost (procura a pasta antes de /html/)
        const index = pathname.indexOf('/html/');
        if (index !== -1) return pathname.substring(0, index);
        return ''; 
    }

    const BASE = getSiteRoot();
    window.__siteGuiaBase = BASE;

    // 2. CORREÇÃO DE EMERGÊNCIA (CSS e FAVICON)
    // Este bloco percorre o HTML e troca "/css/..." por "/SiteGuia/css/..."
    // Isso acontece antes dos outros scripts carregarem, evitando o 404.
    const corrigirCaminhosEstaticos = () => {
        if (!BASE) return; // Não faz nada se estiver no Localhost raiz

        // Corrige todos os links de CSS
        document.querySelectorAll('link[rel="stylesheet"]').forEach(link => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('/') && !href.startsWith(BASE)) {
                link.href = BASE + href;
            }
        });

        // Corrige o Favicon
        document.querySelectorAll('link[rel*="icon"]').forEach(link => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('/') && !href.startsWith(BASE)) {
                link.href = BASE + href;
            }
        });
    };

    // Executa a correção de caminhos imediatamente
    corrigirCaminhosEstaticos();

    // 3. CARREGAMENTO SEQUENCIAL DOS MÓDULOS
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

    function loadScript(src) {
        return new Promise((resolve) => {
            const s = document.createElement('script');
            s.src = src;
            s.async = false;
            s.onload = resolve;
            s.onerror = () => {
                console.error('[main.js] Erro crítico no módulo:', src);
                resolve(); // Não trava a fila se um script falhar
            };
            document.head.appendChild(s);
        });
    }

    (async () => {
        for (const src of SCRIPTS_IN_ORDER) {
            await loadScript(src);
        }
        // Avisa que a base está pronta para os builders (nav, search)
        window.dispatchEvent(new CustomEvent('siteBaseReady', { detail: { base: BASE } }));
    })();
})();