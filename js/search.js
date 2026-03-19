/**
 * @file search.js
 * @summary Busca client-side estilo Google usando nav_data.json como índice.
 *
 * @description
 * Lê o arquivo nav_data.json (já usado pelo nav_builder), achata a árvore de
 * navegação em uma lista plana de páginas com label e breadcrumb e filtra em
 * tempo real enquanto o usuário digita.
 *
 * Funcionalidades:
 * - Busca insensível a acentos e maiúsculas (normalização Unicode).
 * - Multi-palavra: todos os termos precisam aparecer em algum campo.
 * - Ranking: correspondência no título tem mais peso que no breadcrumb.
 * - Navegação por teclado: ↑ ↓ Enter Escape.
 * - Fecha ao clicar fora ou pressionar Escape.
 * - Funciona em GitHub Pages com subpath via window.__siteGuiaBase.
 */

(function () {
    if (window.__siteGuiaSearchLoaded) return;
    window.__siteGuiaSearchLoaded = true;

    const BASE = (typeof window.__siteGuiaBase === 'string') ? window.__siteGuiaBase : '';
    const NAV_URL = BASE + '/js/nav_data.json';
    const MAX_RESULTS = 10;

    /** @type {Array<{label:string,href:string,breadcrumb:string,_norm:string}>} */
    let index = [];

    /* ------------------------------------------------------------------ */
    /* Normalização (remove acentos, lowercase)                            */
    /* ------------------------------------------------------------------ */
    function normalize(str) {
        return (str || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    }

    /* ------------------------------------------------------------------ */
    /* Achatamento da árvore do nav_data                                   */
    /* ------------------------------------------------------------------ */
    function flatten(nodes, breadcrumb) {
        const results = [];
        for (const node of nodes || []) {
            const label = node.label || '';
            const path = breadcrumb ? breadcrumb + ' › ' + label : label;
            if (node.href &&
                !node.href.startsWith('http') &&
                !node.href.startsWith('mailto:') &&
                !node.href.startsWith('#')) {
                results.push({
                    label,
                    href: node.href,
                    breadcrumb,          // caminho do pai (ex: "Fundamentos")
                    _norm: normalize(path)   // campo pré-calculado para busca rápida
                });
            }
            if (node.children) {
                results.push(...flatten(node.children, path));
            }
        }
        return results;
    }

    /* ------------------------------------------------------------------ */
    /* Carregamento do índice                                               */
    /* ------------------------------------------------------------------ */
    async function loadIndex() {
        if (index.length) return;
        try {
            const res = await fetch(NAV_URL);
            const data = await res.json();
            index = flatten(data.sidebar || []);
        } catch (e) {
            console.warn('[search] falha ao carregar nav_data.json', e);
        }
    }

    /* ------------------------------------------------------------------ */
    /* Busca                                                                */
    /* ------------------------------------------------------------------ */
    function search(query) {
        const words = normalize(query).trim().split(/\s+/).filter(Boolean);
        if (!words.length) return [];

        const scored = [];
        for (const item of index) {
            const normLabel = normalize(item.label);
            const allMatch = words.every(w => item._norm.includes(w));
            if (!allMatch) continue;

            // Pontuação: título exato > inicia pelo título > contém no título > contém em qualquer campo
            let score = 0;
            if (normLabel === words.join(' '))         score = 100;
            else if (normLabel.startsWith(words[0]))   score = 60;
            else if (words.every(w => normLabel.includes(w))) score = 40;
            else                                        score = 10;

            scored.push({ item, score });
        }

        return scored
            .sort((a, b) => b.score - a.score)
            .slice(0, MAX_RESULTS)
            .map(s => s.item);
    }

    /* ------------------------------------------------------------------ */
    /* DOM — aguarda os includes estarem prontos                            */
    /* ------------------------------------------------------------------ */
    function init() {
        const form       = document.getElementById('search-form');
        const input      = document.getElementById('search-input');
        const dropdown   = document.getElementById('search-dropdown');
        if (!form || !input || !dropdown) return;

        let activeIndex = -1;
        let currentResults = [];

        /* Pré-carrega o índice quando o input recebe foco */
        input.addEventListener('focus', loadIndex, { once: true });

        /* Atualiza resultados ao digitar */
        input.addEventListener('input', () => {
            const q = input.value.trim();
            if (q.length < 2) {
                closeDropdown();
                return;
            }
            loadIndex().then(() => {
                currentResults = search(q);
                renderDropdown(currentResults);
            });
        });

        /* Navegação por teclado */
        input.addEventListener('keydown', (e) => {
            if (!dropdown.classList.contains('search-dropdown--open')) {
                if (e.key === 'ArrowDown') {
                    loadIndex().then(() => {
                        currentResults = search(input.value.trim());
                        renderDropdown(currentResults);
                    });
                }
                return;
            }

            const items = dropdown.querySelectorAll('.search-result');
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                activeIndex = Math.min(activeIndex + 1, items.length - 1);
                updateActive(items);
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                activeIndex = Math.max(activeIndex - 1, -1);
                updateActive(items);
            } else if (e.key === 'Enter') {
                e.preventDefault();
                if (activeIndex >= 0 && items[activeIndex]) {
                    navigate(currentResults[activeIndex].href);
                } else if (currentResults.length === 1) {
                    navigate(currentResults[0].href);
                }
            } else if (e.key === 'Escape') {
                closeDropdown();
                input.blur();
            }
        });

        /* Fecha ao clicar fora */
        document.addEventListener('click', (e) => {
            if (!form.contains(e.target)) closeDropdown();
        });

        /* Impede submit (recarregamento de página) */
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            if (currentResults.length > 0) {
                const target = activeIndex >= 0 ? currentResults[activeIndex] : currentResults[0];
                if (target) navigate(target.href);
            }
        });

        /* ── helpers ── */

        function renderDropdown(results) {
            activeIndex = -1;
            dropdown.innerHTML = '';

            if (!results.length) {
                dropdown.innerHTML = '<li class="search-empty">Nenhuma página encontrada</li>';
                dropdown.classList.add('search-dropdown--open');
                return;
            }

            results.forEach((item, i) => {
                const li = document.createElement('li');
                li.className = 'search-result';
                li.setAttribute('role', 'option');
                li.setAttribute('aria-selected', 'false');
                li.innerHTML =
                    '<span class="search-result__label">' + escHtml(item.label) + '</span>' +
                    (item.breadcrumb
                        ? '<span class="search-result__breadcrumb">' + escHtml(item.breadcrumb) + '</span>'
                        : '');
                li.addEventListener('click', () => navigate(item.href));
                li.addEventListener('mouseenter', () => {
                    activeIndex = i;
                    updateActive(dropdown.querySelectorAll('.search-result'));
                });
                dropdown.appendChild(li);
            });

            dropdown.classList.add('search-dropdown--open');
        }

        function updateActive(items) {
            items.forEach((el, i) => {
                const active = i === activeIndex;
                el.classList.toggle('search-result--active', active);
                el.setAttribute('aria-selected', active ? 'true' : 'false');
                if (active) el.scrollIntoView({ block: 'nearest' });
            });
        }

        function closeDropdown() {
            dropdown.classList.remove('search-dropdown--open');
            dropdown.innerHTML = '';
            activeIndex = -1;
        }

        function navigate(href) {
            closeDropdown();
            input.value = '';
            window.location.href = BASE + href;
        }

        function escHtml(str) {
            return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        }
    }

    /* Roda após os includes dinâmicos (header carregado via include.js) */
    document.addEventListener('includes:loaded', init);

    /* Fallback: se o header já estiver no DOM ao carregar */
    if (document.readyState !== 'loading') {
        init();
    } else {
        document.addEventListener('DOMContentLoaded', init);
    }
})();
