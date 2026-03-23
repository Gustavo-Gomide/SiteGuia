/**
 * @file nav_builder.js
 * @summary Geração programática da navegação lateral global.
 *
 * @description
 * Constrói o menu lateral (`.nav-lateral`) a partir de um arquivo JSON
 * (`/js/nav_data.json`). O objetivo é centralizar a estrutura de navegação em
 * dados (data-driven UI), reduzindo duplicação entre páginas e garantindo
 * consistência de classes/semântica necessárias ao CSS já existente.
 *
 * Propriedades relevantes:
 * - Preserva classes e padrões de markup (dropdowns, níveis, caret), para
 *   compatibilidade com estilos.
 * - Implementa acessibilidade mínima: `role=button`, `aria-expanded`, e suporte
 *   a teclado (Enter/Espaço).
 * - Marca a página atual como ativa e expande o caminho ancestral.
 * - Emite `nav:rebuilt` ao final da reconstrução para que outros módulos
 *   sincronizem estado (ex.: links ativos).
 */

(function() {
  const BASE = (typeof window.__siteGuiaBase === 'string') ? window.__siteGuiaBase : '';

  function resolveInternalHref(href) {
    if (!href || typeof href !== 'string') return href;
    if (href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return href;
    if (/^[a-z][a-z0-9+.-]*:/i.test(href) || href.startsWith('//')) return href;
    if (!BASE) return href;
    if (href === BASE || href.startsWith(BASE + '/')) return href;
    if (href.startsWith('/')) return BASE + href;
    return href;
  }

  // Adicione isso onde você inicializa o header
  const logoLink = document.getElementById('logo-link');
  if (logoLink) {
      // resolveInternalHref vai colocar o /SiteGuia se estiver no GitHub
      // ou manter /html/index.html se estiver no localhost
      logoLink.href = resolveInternalHref(logoLink.getAttribute('href'));
  }

  /**
   * @typedef {Object} NavItem
   * @property {string} label Texto exibido.
   * @property {string} [href] URL do link.
   * @property {string} [target] Target do link (ex.: `_blank`).
   * @property {string} [icon] Chave de ícone (prefixo).
   * @property {string} [icon_pos] Chave de ícone (sufixo).
   * @property {NavItem[]} [children] Itens filhos (hierarquia).
   */
  /**
   * Resolve o SVG (string) a partir do registry global.
   * @param {string} key
   * @returns {string | null}
   */
  function getIconSvg(key) {
    if (!key) return null;
    if (!window.SvgRegistry || typeof window.SvgRegistry.get !== 'function') return null;
    return window.SvgRegistry.get(key);
  }

  /**
   * Fábrica de elementos HTML.
   * @param {keyof HTMLElementTagNameMap} tag Nome da tag.
   * @param {string} [className] Classe(s) CSS.
   * @returns {HTMLElement} Elemento recém-criado.
   */
  function el(tag, className) {
    const e = document.createElement(tag);
    if (className) e.className = className;
    return e;
  }

  /**
   * Renderiza um item de navegação.
   *
   * @description
   * Se o item possuir filhos, é renderizado como dropdown (recursivo por níveis);
   * caso contrário, é renderizado como item folha (link).
   *
   * @param {NavItem} item Item do JSON.
   * @param {number} [level=1] Profundidade hierárquica (usada em classes `level-*`).
   * @returns {HTMLElement} Elemento `<li>` representando o item.
   */
  function renderItem(item, level = 1) {
    if (item.children && item.children.length) {
      const li = el('li', 'dropdown');
      li.classList.add(`level-${level}`);
      const p = el('p', 'dropdown-toggle');
      p.setAttribute('role', 'button');
      p.setAttribute('aria-expanded', 'false');
      p.textContent = item.label;
      const caret = el('span', 'dropdown-caret');
      p.appendChild(caret);
      const content = el('div', 'dropdown-content');
      content.classList.add(`level-${level}`);

      // If every child is a leaf link, render them directly in content (no wrapping ul)
      const onlyLinks = item.children.every(c => !c.children);
      if (onlyLinks) {
        item.children.forEach(child => content.appendChild(renderLeaf(child)));
      } else {
        const ul = el('ul', 'nvlp');
        item.children.forEach(child => ul.appendChild(renderItem(child, level + 1)));
        content.appendChild(ul);
      }

      li.appendChild(p);
      li.appendChild(content);
      return li;
    }
    return renderLeafAsList(item, level);
  }

  /**
   * Renderiza um item folha como `<a>`.
   * @param {NavItem} item Item sem filhos.
   * @returns {HTMLAnchorElement} Link com rótulo (e ícones opcionais).
   */
  function renderLeaf(item) {
    const a = el('a');
    const iconBefore = getIconSvg(item.icon);
    if (iconBefore) {
      const span = el('span', 'nav-icon nav-icon-before');
      span.innerHTML = iconBefore;
      a.appendChild(span);
    }
    a.appendChild(document.createTextNode(item.label));
    const iconAfter = getIconSvg(item.icon_pos);
    if (iconAfter) {
      const spanPos = el('span', 'nav-icon nav-icon-after');
      spanPos.innerHTML = iconAfter;
      a.appendChild(spanPos);
    }
    if (item.href) a.href = resolveInternalHref(item.href);
    if (item.target) a.target = item.target;
    return a;
  }

  /**
   * Envolve um item folha em um `<li>`.
   * @param {NavItem} item Item sem filhos.
   * @returns {HTMLLIElement} `<li>` contendo o `<a>`.
   */
  function renderLeafAsList(item, level = 1) {
    const li = el('li');
    li.classList.add(`level-${level}`);
    li.appendChild(renderLeaf(item));
    return li;
  }

  /**
   * Constrói (ou reconstrói) a navegação lateral.
   *
   * @description
   * - Busca `/js/nav_data.json`.
   * - Renderiza a árvore de navegação no container `.nav-lateral > ul`.
   * - Registra delegação de eventos para dropdowns.
   * - Marca link ativo e expande ancestrais.
   * - Emite `nav:rebuilt`.
   */
  async function buildSidebar() {
    try {
      if (window.SvgRegistry && typeof window.SvgRegistry.load === 'function') {
        await window.SvgRegistry.load();
      }

      const base = (typeof window.__siteGuiaBase === 'string') ? window.__siteGuiaBase : '';
      const res = await fetch(base + '/js/nav_data.json');
      const data = await res.json();
      const root = document.querySelector('.nav-lateral > ul');
      if (!root) return;

      // Clear existing static list
      root.innerHTML = '';

      data.sidebar.forEach(item => {
        root.appendChild(renderItem(item, 1));
      });

      // Interactions: toggle dropdowns on click
      enableDropdownInteractions(root);

      // Marcar página atual como ativa e abrir dropdowns pais
      markActivePageAndOpenPath(root);

      // Marcar que a navegação foi construída dinamicamente e emitir evento
      const navContainer = root.closest('.nav-lateral');
      if (navContainer) {
        navContainer.setAttribute('data-nav-built', 'true');
      }
      document.dispatchEvent(new CustomEvent('nav:rebuilt'));
    } catch (e) {
      console.error('Erro ao carregar nav_data.json', e);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', buildSidebar);
  } else {
    buildSidebar();
  }

  // Reconstruir o menu quando os includes de HTML terminarem.
  // Isso garante que, se o header/nav for injetado via includes,
  // o builder execute após a inserção.
  document.addEventListener('includes:loaded', buildSidebar);

  /**
   * Marca a página corrente como ativa e abre dropdowns ancestrais.
   * @param {Element} container Container onde os links serão inspecionados.
   */
  function markActivePageAndOpenPath(container) {
    const currentPath = window.location.pathname;
    const links = container.querySelectorAll('a[href]');
    
    links.forEach(link => {
      const href = link.getAttribute('href');
      // Comparar o pathname do link com o da página atual
      if (href && (href === currentPath || normalizeHref(href) === currentPath)) {
        // Marcar o link como ativo
        link.classList.add('active');
        
        // Abrir todos os dropdowns pais
        let parent = link.closest('li');
        while (parent) {
          const dropdown = parent.closest('.dropdown');
          if (dropdown) {
            dropdown.classList.add('open');
            const toggle = dropdown.querySelector(':scope > .dropdown-toggle');
            if (toggle) {
              toggle.setAttribute('aria-expanded', 'true');
            }
            parent = dropdown.parentElement;
          } else {
            break;
          }
        }
      }
    });
  }

  /**
   * Normaliza um href removendo a barra final.
   * @param {string} href Href original.
   * @returns {string} Href normalizado.
   */
  function normalizeHref(href) {
    // Remove trailing slash e comparar
    return href.replace(/\/$/, '') || '/';
  }

  /**
   * Habilita interações de dropdown via delegação de eventos.
   *
   * @description
   * A delegação evita registrar múltiplos listeners por item e simplifica rebuilds.
   * Um guard (`data-dropdown-delegated`) assegura idempotência.
   *
   * @param {Element} container Container raiz da lista (`.nav-lateral > ul`).
   */
  function enableDropdownInteractions(container) {
    // Evitar múltiplas delegações se rebuild ocorrer várias vezes (voltar histórico / pageshow)
    if (container.hasAttribute('data-dropdown-delegated')) return;
    container.setAttribute('data-dropdown-delegated', 'true');
    // Delegação de evento: reage a cliques em qualquer .dropdown-toggle
    container.addEventListener('click', function(evt) {
      const toggle = evt.target.closest('.dropdown-toggle');
      if (!toggle) return;
      const li = toggle.parentElement;
      const content = li.querySelector(':scope > .dropdown-content');
      if (!content) return;
      const isOpen = li.classList.contains('open');
      li.classList.toggle('open', !isOpen);
      // Sincroniza aria-expanded
      toggle.setAttribute('aria-expanded', String(!isOpen));
      evt.stopPropagation();
    });

    // Keyboard accessibility
    container.addEventListener('keydown', function(evt) {
      const toggle = evt.target.closest('.dropdown-toggle');
      if (!toggle) return;
      if (evt.key === 'Enter' || evt.key === ' ') {
        evt.preventDefault();
        toggle.click();
      }
    });
  }

  // Re-run em navigation history (BFCache / pageshow) para garantir listeners
  window.addEventListener('pageshow', function() {
    buildSidebar();
  });
})();
