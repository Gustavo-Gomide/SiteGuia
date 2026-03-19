/**
 * @file navbar_interno.js
 * @summary Controle comportamental do menu “Nesta Página” (nav interna).
 *
 * @description
 * Este módulo provê a interação do menu interno (índice da página), incluindo:
 * - abertura/fechamento via botão e overlay,
 * - fechamento via tecla Escape,
 * - marcação de link ativo,
 * - dropdowns locais (quando aplicável).
 *
 * Integração:
 * - Reage ao evento `includes:loaded` para rebind, caso o nav seja injetado via include.js.
 */

/**
 * @class InternoNav
 * @description
 * Representa o menu interno como uma máquina de estados binária (aberto/fechado),
 * materializada via classes CSS (`.active`) nos elementos relevantes.
 */
class InternoNav {
  /** Inicializa o estado interno e referências de elementos (lazy-binding). */
  constructor() {
    this.isOpen = false;
    this.navElement = null;
    this.toggleButton = null;
    this.overlay = null;
  }
  
  /**
   * Registra listeners e resolve elementos do DOM.
   * @remarks Deve ser seguro chamar mais de uma vez após `includes:loaded`.
   */
  init() {
    this.navElement = document.querySelector('header .nav-interno') || document.querySelector('.nav-interno');
    this.toggleButton = document.querySelector('.menu-interno-toggle');
    this.overlay = document.querySelector('.nav-interno-overlay');
    
    if (!this.navElement) return;

    if (this.toggleButton) {
      this.toggleButton.addEventListener('click', () => this.toggleNav());
    }
    
    if (this.overlay) {
      this.overlay.addEventListener('click', () => this.closeNav());
    }

    // Configurar dropdowns
    this.setupDropdowns()
    
    // Configurar links ativos
    this.setupActiveLinks();
    
    // Fechar menu ao pressionar ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.closeNav();
      }
    });
  }
  
  /** Alterna o estado do menu interno. */
  toggleNav() {
    if (this.isOpen) {
      this.closeNav();
    } else {
      this.openNav();
    }
  }
  
  /** Abre o menu interno e aplica classes de estado. */
  openNav() {
    if (!this.navElement || !this.overlay || !this.toggleButton) return;
    this.navElement.classList.add('active');
    this.overlay.classList.add('active');
    this.toggleButton.classList.add('active');
    this.isOpen = true;
  }
  
  /** Fecha o menu interno e remove classes de estado. */
  closeNav() {
    if (!this.navElement || !this.overlay || !this.toggleButton) return;
    this.navElement.classList.remove('active');
    this.overlay.classList.remove('active');
    this.toggleButton.classList.remove('active');
    this.isOpen = false;
  }
  
  /** Configura interação de dropdowns via delegação dentro de `.nav-interno`. */
  setupDropdowns() {
    if (!this.navElement) return;
    // Delegação: alterna ao clicar em toda a área do header (.dropdown-toggle)
    this.navElement.addEventListener('click', (e) => {
      const toggle = e.target.closest('.dropdown-toggle');
      if (!toggle) return;
      e.preventDefault();
      e.stopPropagation();
      const dropdown = toggle.closest('.dropdown');
      if (dropdown) dropdown.classList.toggle('active');
    });
  }

  /**
   * Configura a marcação de links ativos.
   * @remarks Usa delegação para evitar múltiplos listeners por item.
   */
  setupActiveLinks() {
    if (!this.navElement) return;
    // Delegação: ativa somente links de itens (ignora .dropdown-toggle)
    this.navElement.addEventListener('click', (e) => {
      const link = e.target.closest('a');
      if (!link || link.classList.contains('dropdown-toggle')) return;
      const links = this.navElement.querySelectorAll('a:not(.dropdown-toggle)');
      links.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      this.closeNav();
    });
  }
}

function __initInternoNav() {
  window.internoNav = new InternoNav();
  window.internoNav.init();
}

// Inicializar quando o DOM estiver carregado (ou imediatamente se já carregou)
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', __initInternoNav);
} else {
  __initInternoNav();
}

// Se o header/nav for injetado depois via include.js, rebinda.
document.addEventListener('includes:loaded', () => {
  // Se já existe instância, tenta rebindar novamente.
  if (window.internoNav && typeof window.internoNav.init === 'function') {
    window.internoNav.init();
  } else {
    __initInternoNav();
  }
});