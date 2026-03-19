/**
 * @file nav_interno_builder.js
 * @summary Construção automática do índice “Nesta Página” (nav interna).
 *
 * @description
 * Este módulo constrói a navegação interna (`.nav-interno`) a partir dos headings
 * (h1..h6) existentes no documento.
 *
 * Restrições deliberadas (design decisions):
 * - Apenas headings que já possuem `id` são indexados (controle explícito por página).
 * - Não há geração automática de slugs/IDs (evita colisões e reduz acoplamento).
 * - Se o `<nav class="nav-interno">` tiver a classe `nav-interno-manual`, o conteúdo
 *   do `<ul>` é preservado (não sobrescreve lista manual).
 *
 * Estratégia:
 * - Duas passagens (TreeWalker):
 *   1) contabiliza headings com `id` por `<section>`;
 *   2) constrói a lista, usando dropdown quando a seção possui múltiplos headings.
 */
(function(){
  // Se quiser manter lista manual em alguma página, adicione class "nav-interno-manual"
  // ao <nav class="nav-interno">. Caso contrário, a lista será sempre
  // reconstruída seguindo a ORDEM DOS HEADINGS COM id no documento.
  /**
   * Constrói (ou reconstrói) a navegação interna.
   *
   * @remarks
   * - Efeito colateral: cria `.nav-interno` caso não exista e a insere no DOM.
   * - Complexidade: $O(n)$ em número de elementos visitados no TreeWalker.
   */
  function buildNavInterno(){
    // Preferir a nav interna que está dentro do header (quando o header vem por include)
    let nav = document.querySelector('header .nav-interno') || document.querySelector('.nav-interno');
    const manual = nav && nav.classList.contains('nav-interno-manual');
    if (!nav){
      // Se o header ainda não existe mas será injetado via include, aguarde o `includes:loaded`.
      // Isso evita criar uma nav duplicada fora do header.
      const headerPending = document.querySelector('[data-include*="partials/header.html"]') && !document.querySelector('header');
      if (headerPending) return;

      nav = document.createElement('nav');
      nav.className = 'nav-interno';
      const header = document.createElement('div');
      header.className = 'nav-interno-header';
      const h3 = document.createElement('h3');
      h3.textContent = 'Nesta Página';
      header.appendChild(h3);
      const ulCreate = document.createElement('ul');
      nav.appendChild(header);
      nav.appendChild(ulCreate);
      const siteHeader = document.querySelector('header');
      if (siteHeader && siteHeader.parentNode){
        siteHeader.parentNode.insertBefore(nav, siteHeader.nextSibling);
      } else {
        const main = document.querySelector('main');
        if (main){
          main.parentNode.insertBefore(nav, main);
        } else {
          document.body.insertBefore(nav, document.body.firstChild);
        }
      }
    }
    const ul = nav.querySelector('ul') || nav.appendChild(document.createElement('ul'));
    if (manual) return; // preserva manual

    ul.innerHTML = '';

    // Pré-scan: contar quantos headings com id cada section tem
    const root = document.querySelector('.content-area') || document.querySelector('main') || document.body;
    const walker1 = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT);
    const sectionHeadingCount = new Map(); // section -> count

    while (walker1.nextNode()) {
      const node = walker1.currentNode;
      const tag = node.tagName ? node.tagName.toLowerCase() : '';
      const isHeading = /^h[1-6]$/.test(tag);
      if (!isHeading) continue;

      const id = (node.id || '').trim();
      if (!id) continue;

      const section = node.closest('section');
      if (section) {
        sectionHeadingCount.set(section, (sectionHeadingCount.get(section) || 0) + 1);
      }
    }

    // Segunda passagem: construir o nav
    const walker2 = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT);
    const sectionMap = new Map(); // section -> {dropdownLi, innerUl}
    let firstSet = false;

    while (walker2.nextNode()) {
      const node = walker2.currentNode;
      const tag = node.tagName ? node.tagName.toLowerCase() : '';
      const isHeading = /^h[1-6]$/.test(tag);
      if (!isHeading) continue;

      const id = (node.id || '').trim();
      if (!id) continue; // apenas headings com id

      const section = node.closest('section');
      if (section) {
        const headingCount = sectionHeadingCount.get(section) || 0;

        if (headingCount === 1) {
          // Seção com apenas 1 heading: adicionar direto ao ul, sem dropdown
          const li = document.createElement('li');
          const a = document.createElement('a');
          a.href = '#' + id;
          a.textContent = node.textContent.trim();
          if (!firstSet) { a.classList.add('active'); firstSet = true; }
          li.appendChild(a);
          ul.appendChild(li);
        } else {
          // Seção com múltiplos headings: usar dropdown
          let group = sectionMap.get(section);
          if (!group) {
            const dropdownLi = document.createElement('li');
            dropdownLi.className = 'dropdown';

            // Label do dropdown: primeiro heading do section
            const labelHeading = section.querySelector('h1, h2, h3, h4, h5, h6');
            const labelText = (labelHeading ? labelHeading.textContent : node.textContent).trim();
            const toggle = document.createElement('a');
            toggle.className = 'dropdown-toggle';
            toggle.href = '#';
            toggle.textContent = labelText;
            dropdownLi.appendChild(toggle);

            const innerUl = document.createElement('ul');
            innerUl.className = 'dropdown-content level-1';
            dropdownLi.appendChild(innerUl);

            ul.appendChild(dropdownLi);
            group = { dropdownLi, innerUl };
            sectionMap.set(section, group);
          }
          const itemLi = document.createElement('li');
          const a = document.createElement('a');
          a.href = '#' + id;
          a.textContent = node.textContent.trim();
          if (!firstSet) { a.classList.add('active'); firstSet = true; }
          itemLi.appendChild(a);
          group.innerUl.appendChild(itemLi);
        }
      } else {
        // Heading fora de section: item plano
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = '#' + id;
        a.textContent = node.textContent.trim();
        if (!firstSet) { a.classList.add('active'); firstSet = true; }
        li.appendChild(a);
        ul.appendChild(li);
      }
    }
  }

  /** Wrapper para uso em listeners (mantém assinatura sem argumentos). */
  const trigger = () => buildNavInterno();
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', trigger);
  } else {
    trigger();
  }
  document.addEventListener('includes:loaded', trigger);
})();
