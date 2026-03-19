/**
 * @file navbar_lateral.js
 * @summary Controle comportamental da navegação lateral global.
 *
 * @description
 * Este módulo encapsula a lógica de abertura/fechamento do menu lateral esquerdo,
 * incluindo overlay, ajuste de layout do `<main>` e sincronização de estados ativos.
 * O conteúdo do menu pode ser:
 * - estático (HTML pré-existente), ou
 * - dinâmico (gerado por nav_builder.js), identificado por `data-nav-built`.
 *
 * Integrações:
 * - Reage ao evento `includes:loaded` para rebinding após injeção de partials.
 * - Reage ao evento `nav:rebuilt` para reconfigurar links ativos após rebuild.
 */

/**
 * @class LateralNav
 * @description
 * Modela o menu lateral como uma máquina de estados simples (aberto/fechado),
 * implementando efeitos colaterais no DOM via classes CSS.
 */
class LateralNav {
  /** Inicializa o estado interno e referências de elementos (lazy-binding). */
  constructor() {
    this.isOpen = false;
    this.navElement = null;
    this.toggleButton = null;
    this.overlay = null;
    this.mainElement = null;
  }
  
  /**
   * Registra listeners e configura o comportamento do menu.
   * @remarks Deve ser seguro chamar após `includes:loaded` (rebinding).
   */
  init() {
    this.bindElements();
    
    if (this.toggleButton) {
      this.toggleButton.addEventListener('click', () => this.toggleNav());
    }
    
    if (this.overlay) {
      this.overlay.addEventListener('click', () => this.closeNav());
    }
    
    // Configurar dropdowns (somente se menu NÃO foi construído dinamicamente)
    // Quando data-nav-built estiver presente, nav_builder já gerencia via delegação.
    if (!this.navElement || !this.navElement.hasAttribute('data-nav-built')) {
      this.setupDropdowns();
    }
    
    // Configurar links ativos
    this.setupActiveLinks();
    
    // Fechar menu ao redimensionar para mobile
    window.addEventListener('resize', () => {
      if (window.innerWidth <= 768 && this.isOpen) {
        this.closeNav();
      }
    });
    
    // Fechar menu ao pressionar ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.closeNav();
      }
    });

    // Quando includes terminarem, rebinda elementos (nav-lateral pode ser injetado depois).
    document.addEventListener('includes:loaded', () => {
      this.bindElements();
      if (!this.navElement || !this.navElement.hasAttribute('data-nav-built')) {
        this.setupDropdowns();
      }
      this.setupActiveLinks();
    });

    // Reagir ao rebuild da navegação dinâmica para reconfigurar links ativos.
    document.addEventListener('nav:rebuilt', () => {
      this.bindElements();
      // Dropdowns já são tratados por nav_builder (delegação) - não duplicar.
      this.setupActiveLinks();
    });
  }

  /** Resolve e armazena referências a elementos do DOM. */
  bindElements() {
    this.navElement = document.querySelector('.nav-lateral');
    this.toggleButton = document.querySelector('.menu-toggle');
    this.overlay = document.querySelector('.nav-overlay');
    this.mainElement = document.querySelector('main');
  }
  
  /** Alterna o menu entre aberto e fechado. */
  toggleNav() {
    if (this.isOpen) {
      this.closeNav();
    } else {
      this.openNav();
    }
  }
  
  /** Abre o menu e aplica classes CSS associadas ao estado “aberto”. */
  openNav() {
    if (!this.navElement || !this.overlay || !this.toggleButton || !this.mainElement) {
      this.bindElements();
      if (!this.navElement) return;
    }
    this.navElement.classList.add('active');
    this.overlay.classList.add('active');
    this.toggleButton.classList.add('active');
    if (window.innerWidth > 768) {
      this.mainElement.classList.add('with-sidebar');
    }
    this.isOpen = true;

    // Rolar o nav até o link ativo, após o browser pintar o menu como visível
    requestAnimationFrame(() => {
      const activeLink = this.navElement.querySelector('a.active');
      if (activeLink) {
        activeLink.scrollIntoView({ block: 'center', behavior: 'smooth' });
      }
    });
  }
  
  /** Fecha o menu e remove classes CSS associadas ao estado “aberto”. */
  closeNav() {
    this.navElement.classList.remove('active');
    this.overlay.classList.remove('active');
    this.toggleButton.classList.remove('active');
    this.mainElement.classList.remove('with-sidebar');
    this.isOpen = false;
  }
  
  setupDropdowns() {
    const dropdownToggles = document.querySelectorAll('.nav-lateral .dropdown-toggle');
    const root = document.querySelector('.nav-lateral > ul');
    // Se delegação já foi feita por nav_builder, não adicionar listeners diretos redundantes
    if (root && root.hasAttribute('data-dropdown-delegated')) return;
    dropdownToggles.forEach(toggle => {
      toggle.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const dropdown = toggle.parentElement;
        // Unificar classe com nav_builder (.open)
        const isOpen = dropdown.classList.contains('open');
        dropdown.classList.toggle('open', !isOpen);
        toggle.setAttribute('aria-expanded', String(!isOpen));
      });
    });
  }
  
  setupActiveLinks() {
    const links = document.querySelectorAll('.nav-lateral a');
    
    links.forEach(link => {
      link.addEventListener('click', (e) => {
        // Remover classe active de todos os links
        links.forEach(l => l.classList.remove('active'));
        
        // Adicionar classe active ao link clicado
        link.classList.add('active');
        
        // Fechar menu em mobile
        if (window.innerWidth <= 768) {
          this.closeNav();
        }
      });
    });

    // Fallback: se por algum motivo nenhum listener de dropdown existe (ex: root sem atributo), tenta configurar.
    const root = document.querySelector('.nav-lateral > ul');
    if (root && !root.hasAttribute('data-dropdown-delegated')) {
      this.setupDropdowns();
    }
  }
}

// Inicializar quando o DOM estiver carregado
function __initLateralNav() {
  window.lateralNav = new LateralNav();
  window.lateralNav.init();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', __initLateralNav);
} else {
  __initLateralNav();
}