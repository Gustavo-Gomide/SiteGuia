/**
 * @file svg_registry.js
 * @summary Registro central de SVGs (via JSON) + injeção por data-atributos.
 *
 * @description
 * Centraliza SVGs reutilizáveis em um único arquivo de dados (`/js/svg_registry.json`)
 * e permite que o markup use placeholders (`data-svg="..."`) para injetar o SVG
 * em runtime. Isso reduz duplicação e permite ajustes em um único lugar.
 */

(function () {
    if (window.SvgRegistry) return;

    const BASE = (typeof window.__siteGuiaBase === 'string') ? window.__siteGuiaBase : '';
    const REGISTRY_URL = BASE + '/js/svg_registry.json';

    /** @type {Record<string,string> | null} */
    let cache = null;

    /** @type {Promise<Record<string,string>> | null} */
    let loading = null;

    /**
     * Carrega o registry (com cache).
     * @returns {Promise<Record<string,string>>}
     */
    async function load() {
        if (cache) return cache;
        if (!loading) {
            loading = (async () => {
                try {
                    const res = await fetch(REGISTRY_URL);
                    const data = await res.json();
                    cache = data || {};
                } catch (err) {
                    console.error('[svg_registry] falha ao carregar registry:', err);
                    cache = {};
                }
                return cache;
            })();
        }
        return loading;
    }

    /**
     * Retorna o SVG (string) se já carregado; caso contrário, `null`.
     * @param {string} key
     * @returns {string | null}
     */
    function get(key) {
        if (!cache) return null;
        return cache[key] || null;
    }

    /**
     * Injeta SVGs em todos os elementos com `data-svg`.
     * @param {ParentNode} [root=document]
     * @returns {Promise<void>}
     */
    async function inject(root = document) {
        const data = await load();
        const targets = root.querySelectorAll('[data-svg]');
        targets.forEach((el) => {
            const key = el.getAttribute('data-svg');
            if (!key) return;
            const svg = data[key];
            if (!svg) return;
            el.innerHTML = svg;
        });
    }

    window.SvgRegistry = {
        load,
        get,
        inject,
        ready: load()
    };

    // Injeta no DOM inicial e também após includes.
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => inject());
    } else {
        inject();
    }

    document.addEventListener('includes:loaded', () => {
        inject();
    });
})();
