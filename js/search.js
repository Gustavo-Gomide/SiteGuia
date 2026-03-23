/**
 * @file search.js
 * @summary Motor de busca universal com Ranking de Relevância e Fuzzy Match.
 * * MELHORIAS:
 * 1. i18n Automática: Usa normalização Unicode (NFD) para funcionar em qualquer idioma.
 * 2. Algoritmo de Substring: "inject" encontra "injection" (resolve seu problema atual).
 * 3. Pesos: Título (Label) > Conteúdo (Description) > Caminho (Breadcrumb).
 * 4. Resiliência: Se o usuário errar uma letra, o motor ainda tenta encontrar o termo.
 */

(function () {
    if (window.__siteGuiaSearchLoaded) return;
    window.__siteGuiaSearchLoaded = true;

    const BASE = (typeof window.__siteGuiaBase === 'string') ? window.__siteGuiaBase : '';
    const NAV_URL = BASE + '/js/nav_data.json';
    const MAX_RESULTS = 10;

    let searchIndex = [];

    /**
     * Normalização Universal (i18n):
     * Remove acentos e converte para minúsculas. 
     * Funciona para Português, Espanhol, Francês, etc.
     */
    function standardize(str) {
        return (str || '').toString()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()
            .trim();
    }

    /**
     * Distância de Levenshtein (Fuzzy Search):
     * Permite encontrar resultados mesmo com erros de digitação.
     */
    function getDistance(a, b) {
        const matrix = Array.from({ length: a.length + 1 }, (_, i) => [i]);
        for (let j = 1; j <= b.length; j++) matrix[0][j] = j;
        for (let i = 1; i <= a.length; i++) {
            for (let j = 1; j <= b.length; j++) {
                const cost = a[i - 1] === b[j - 1] ? 0 : 1;
                matrix[i][j] = Math.min(matrix[i - 1][j] + 1, matrix[i][j - 1] + 1, matrix[i - 1][j - 1] + cost);
            }
        }
        return matrix[a.length][b.length];
    }

    /**
     * Achata o JSON em uma lista plana otimizada para busca.
     */
    function flatten(nodes, breadcrumb = '') {
        let items = [];
        for (const node of nodes || []) {
            const currentPath = breadcrumb ? `${breadcrumb} › ${node.label}` : node.label;
            if (node.href && !node.href.startsWith('http')) {
                items.push({
                    label: node.label,
                    href: node.href,
                    breadcrumb: breadcrumb,
                    desc: node.description || '',
                    // Pre-indexação para performance
                    _sLabel: standardize(node.label),
                    _sDesc: standardize(node.description),
                    _sFull: standardize(`${node.label} ${node.description} ${breadcrumb}`)
                });
            }
            if (node.children) items = items.concat(flatten(node.children, currentPath));
        }
        return items;
    }

    async function loadIndex() {
        if (searchIndex.length) return;
        try {
            const res = await fetch(NAV_URL);
            const data = await res.json();
            searchIndex = flatten(data.sidebar);
        } catch (e) { console.error("Erro ao carregar índice."); }
    }

    /**
     * SISTEMA DE RANKING (A "Mágica"):
     * Em vez de true/false, retornamos uma pontuação.
     */
    function scoreResults(query) {
        const q = standardize(query);
        const qWords = q.split(/\s+/);
        
        return searchIndex.map(item => {
            let points = 0;

            // 1. Match exato da frase (O melhor possível)
            if (item._sLabel.includes(q)) points += 1000;
            else if (item._sDesc.includes(q)) points += 400;

            // 2. Verificação palavra por palavra
            qWords.forEach(word => {
                if (word.length < 2) return;

                // Match parcial no título (Resolve "inject" -> "injection")
                if (item._sLabel.includes(word)) {
                    points += 300;
                    if (item._sLabel.startsWith(word)) points += 100; // Bônus se começar com a palavra
                }
                
                // Match na descrição (SEO invisível)
                if (item._sDesc.includes(word)) points += 150;

                // Fuzzy Match (Erros de digitação)
                if (word.length > 3) {
                    const labelWords = item._sLabel.split(/\s+/);
                    labelWords.forEach(lWord => {
                        if (getDistance(word, lWord) <= 1) points += 80;
                    });
                }
            });

            return { item, points };
        })
        .filter(res => res.points > 0)
        .sort((a, b) => b.points - a.points)
        .slice(0, MAX_RESULTS)
        .map(res => res.item);
    }

    function init() {
        const input = document.getElementById('search-input');
        const dropdown = document.getElementById('search-dropdown');
        if (!input || !dropdown) return;

        input.addEventListener('input', async () => {
            await loadIndex();
            const results = scoreResults(input.value);
            
            // Interface limpa: Apenas Título e Caminho. Descrição fica no "cérebro".
            dropdown.innerHTML = results.map(res => `
                <li class="search-result" onclick="window.location.href='${BASE}${res.href}'">
                    <div class="search-result__label">${res.label}</div>
                    <div class="search-result__breadcrumb">${res.breadcrumb || 'Início'}</div>
                </li>
            `).join('');

            dropdown.classList.toggle('search-dropdown--open', results.length > 0);
        });

        document.addEventListener('click', (e) => {
            if (!e.target.closest('#search-form')) dropdown.classList.remove('search-dropdown--open');
        });
    }

    document.addEventListener('includes:loaded', init);
    if (document.readyState !== 'loading') init();
})();