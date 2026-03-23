/**
 * @file base.js
 * @summary Rotinas transversais (base) da interface do site.
 *
 * @description
 * Este módulo concentra serviços de “infraestrutura” do front-end que são
 * consumidos por múltiplas páginas:
 * - Gestão de tema claro/escuro (via classes no <body> e persistência em localStorage).
 * - Sincronização de variáveis CSS da scrollbar (CSS variables) com o tema ativo.
 * - Inicialização de tooltips/termos com acessibilidade (teclado, ARIA, Escape).
 * - Compatibilidade retroativa com troca de imagens via `data-theme-image`.
 *
 * @remarks
 * - O evento customizado `includes:loaded` (emitido por include.js) pode ocorrer
 *   após o DOMContentLoaded; por isso este módulo reexecuta “binds” essenciais.
 * - Este arquivo deve ser idempotente em relação à inicialização: pode ser
 *   executado antes ou depois da injeção de partials.
 */

/**
 * @class ThemeManager
 * @description
 * Abstrai a seleção e aplicação de tema (light/dark), mantendo consistência entre:
 * - classes do documento (`body.theme-light` / `body.theme-dark`),
 * - preferências persistidas (localStorage),
 * - controles de UI (botão de alternância),
 * - variáveis CSS relacionadas (scrollbar).
 */
class ThemeManager {
    /**
     * Constrói o gerenciador de tema.
     *
     * Estratégia de decisão:
     * 1) Usa valor persistido em `localStorage.theme`, se existir.
     * 2) Caso contrário, usa a preferência do sistema via `prefers-color-scheme`.
     * 3) Fallback implícito: tema escuro.
     */
    constructor() {
        // Preferência salva ou fallback para preferência do sistema
        const stored = localStorage.getItem('theme');
        if (stored) {
            this.currentTheme = stored;
        } else {
            const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
            this.currentTheme = prefersLight ? 'light' : 'dark';
        }
        this.init();
    }
    
    /** Inicializa a aplicação do tema e o bind dos controles. */
    init() {
        this.applyTheme(this.currentTheme);
        this.setupThemeToggle();
    }
    
    /**
     * Aplica o tema no DOM e sincroniza efeitos colaterais (scrollbar e imagens legadas).
     * @param {'light'|'dark'} theme Tema a ser aplicado.
     */
    applyTheme(theme) {
        // Ativa transição suave só durante a troca — evita custo de recalc em toda interação
        document.body.classList.add('theme-transitioning');

        document.body.classList.remove('theme-light', 'theme-dark');
        document.body.classList.add(`theme-${theme}`);
        
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            // Procura o span interno que usa data-svg
            const svgSpan = themeToggle.querySelector('[data-svg]');
            if (svgSpan) {
                svgSpan.setAttribute('data-svg', theme === 'light' ? 'dark_theme' : 'light_theme');
                svgSpan.innerHTML = '';
                if (window.SvgRegistry && typeof window.SvgRegistry.inject === 'function') {
                    // Usa o parentNode do botão para garantir que a área correta seja atualizada
                    window.SvgRegistry.inject(themeToggle.parentNode);
                }
            }
            themeToggle.setAttribute('aria-label', theme === 'light' ? 'Ativar tema escuro' : 'Ativar tema claro');
            themeToggle.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
        }

        this.currentTheme = theme;
        localStorage.setItem('theme', theme);

        this.updateScrollbar();

        // Remove a classe de transição após a animação concluir (~300ms + margem)
        clearTimeout(this._themeTransitionTimeout);
        this._themeTransitionTimeout = setTimeout(() => {
            document.body.classList.remove('theme-transitioning');
        }, 350);
    }

    /** Alterna entre `light` e `dark`. */
    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.applyTheme(newTheme);
    }

    /**
     * Registra listeners no botão `.theme-toggle` (click e teclado).
     * @remarks A execução pode ocorrer múltiplas vezes (pós-includes); por isso,
     * a implementação é conservadora e depende do DOM corrente.
     */
    setupThemeToggle() {
        const themeToggle = document.querySelector('.theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
            themeToggle.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.toggleTheme();
                }
            });
        }
    }
    
    /**
     * Atualiza variáveis CSS da scrollbar de acordo com o tema.
     *
     * @remarks
     * A escolha por CSS variables permite que o CSS permaneça declarativo, e o
     * JS atue apenas como “ponte” de configuração.
     */
    updateScrollbar() {
        const root = document.documentElement;
        if (this.currentTheme === 'dark') {
            root.style.setProperty('--scrollbar-track', 'var(--dark-bg-secondary)');
            root.style.setProperty('--scrollbar-thumb', 'var(--dark-accent)');
            root.style.setProperty('--scrollbar-thumb-hover', 'var(--dark-accent-hover)');
        } else {
            root.style.setProperty('--scrollbar-track', 'var(--light-bg-secondary)');
            root.style.setProperty('--scrollbar-thumb', 'var(--light-accent)');
            root.style.setProperty('--scrollbar-thumb-hover', 'var(--light-accent-hover)');
        }
    }
}

// =========================================================
// Inicialização (bootstrap)
// =========================================================
/**
 * Ponto de entrada do módulo.
 *
 * @description
 * Instancia o `ThemeManager` e inicializa tooltips. A instância é exposta em
 * `window.themeManager` para permitir rebinds após injeções (includes) e para
 * diagnóstico durante desenvolvimento.
 */
function __initBase() {
    window.themeManager = new ThemeManager();
    initTooltips();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', __initBase);
} else {
    __initBase();
}

/**
 * Reconfiguração pós-includes.
 *
 * @description
 * O site utiliza includes via fetch; portanto, elementos estruturais (por exemplo,
 * header com `.theme-toggle`) podem ser inseridos após o `DOMContentLoaded`.
 * Este listener reexecuta binds essenciais e reaplica o tema corrente.
 */
document.addEventListener('includes:loaded', () => {
    if (window.themeManager) {
        window.themeManager.setupThemeToggle();
        window.themeManager.updateScrollbar();
        window.themeManager.applyTheme(window.themeManager.currentTheme);
    }
});

/**
 * Determina o “root” do site para resolver caminhos quando a estrutura contém `/html/`.
 * @returns {string} Prefixo do caminho (pathname) anterior a `/html/`, ou string vazia.
 */
function getSiteRoot() {
    // main.js detecta e expõe o prefixo base antes de carregar este módulo
    if (typeof window.__siteGuiaBase === 'string') return window.__siteGuiaBase;
    const path = window.location.pathname;
    const index = path.indexOf('/html/');
    if (index !== -1) return path.substring(0, index);
    return '';
}

/**
 * Resolve um caminho relativo ao “root” do site (vide `getSiteRoot`).
 * @param {string} relativePath Caminho relativo (ex.: `/js/foo.js`).
 * @returns {string} Caminho absoluto coerente com a estrutura do site.
 */
function resolvePath(relativePath) {
    return getSiteRoot() + relativePath;
}

// =========================================================
// Tooltips de termos (acessibilidade: mouse, toque e teclado)
// =========================================================
/**
 * Inicializa tooltips em elementos `.term` e `.tooltip`.
 *
 * @description
 * Implementa um modelo de interação acessível:
 * - elementos tornam-se focáveis (`tabindex=0`) e com papel de botão (`role=button`);
 * - estado é expresso via `aria-expanded` (aberto/fechado);
 * - fecha todos os tooltips ao clicar fora ou pressionar Escape.
 *
 * @remarks
 * Caso `.term` não possua `.hint`, o conteúdo é gerado a partir de `data-title` e
 * `data-def`, reduzindo repetição e centralizando a semântica de “termo/definição”.
 */
function initTooltips() {
    const terms = document.querySelectorAll('.term');
    const legacyTooltips = document.querySelectorAll('.tooltip');
    if (!terms.length && !legacyTooltips.length) return;

    terms.forEach(term => {
        term.setAttribute('tabindex', '0');
        term.setAttribute('role', 'button');
        if (!term.hasAttribute('aria-expanded')) {
            term.setAttribute('aria-expanded', 'false');
        }

        // Auto-generate .hint from data attributes, if not present
        if (!term.querySelector('.hint')) {
            const title = term.getAttribute('data-title') || 'Detalhe';
            const def = term.getAttribute('data-def') || '';
            const hint = document.createElement('div');
            hint.className = 'hint';
            hint.setAttribute('role', 'tooltip');
            const strong = document.createElement('span');
            strong.className = 'hint-title';
            strong.textContent = title;
            const body = document.createElement('div');
            body.className = 'hint-body';
            body.textContent = def;
            hint.appendChild(strong);
            hint.appendChild(body);
            term.appendChild(hint);
        }
    });

    legacyTooltips.forEach(tip => {
        tip.setAttribute('tabindex', '0');
        tip.setAttribute('role', 'button');
        if (!tip.hasAttribute('aria-expanded')) {
            tip.setAttribute('aria-expanded', 'false');
        }
    });

    function closeAll(except = null) {
        document.querySelectorAll('.term[aria-expanded="true"], .tooltip[aria-expanded="true"]').forEach(el => {
            if (except && el === except) return;
            el.setAttribute('aria-expanded', 'false');
        });
    }

    document.addEventListener('click', (e) => {
        const t = e.target.closest('.term, .tooltip');
        if (!t) {
            closeAll();
            return;
        }
        const expanded = t.getAttribute('aria-expanded') === 'true';
        closeAll(t);
        t.setAttribute('aria-expanded', expanded ? 'false' : 'true');
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeAll();
        }
        if ((e.key === 'Enter' || e.key === ' ') && document.activeElement && (document.activeElement.classList.contains('term') || document.activeElement.classList.contains('tooltip'))) {
            e.preventDefault();
            const el = document.activeElement;
            const expanded = el.getAttribute('aria-expanded') === 'true';
            closeAll(el);
            el.setAttribute('aria-expanded', expanded ? 'false' : 'true');
        }
    });
}
