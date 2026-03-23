/**
 * @file include.js
 * @summary Inclusão (composição) de partials HTML via fetch.
 *
 * @description
 * Implementa um mecanismo leve de “includes” para ambientes estáticos (ex.: GitHub Pages).
 * Elementos com o atributo `data-include` são substituídos pelo conteúdo HTML obtido por
 * `fetch`, permitindo composição modular de páginas.
 *
 * Exemplo de uso no HTML:
 * - `<div data-include="/html/Site/partials/header.html"></div>`
 *
 * Ao final, se ao menos um include for processado, o módulo emite o evento customizado
 * `includes:loaded` em `document`, permitindo que outros módulos refaçam binds.
 *
 * @remarks
 * - Suporta includes aninhados por múltiplas passagens, com limite de profundidade para
 *   evitar loops acidentais.
 * - Não implementa cache próprio: solicita `fetch(..., { cache: 'no-cache' })`.
 */

(async function loadIncludes() {
  const BASE = (typeof window.__siteGuiaBase === 'string') ? window.__siteGuiaBase : '';

  function resolveInternalUrl(url) {
    if (!url || typeof url !== 'string') return url;
    if (/^[a-z][a-z0-9+.-]*:/i.test(url) || url.startsWith('//')) return url;
    if (!BASE) return url;
    if (url === BASE || url.startsWith(BASE + '/')) return url;
    if (url.startsWith('/')) return BASE + url;
    return url;
  }

  /**
   * Busca o conteúdo de um recurso textual.
   * @param {string} url URL do partial.
   * @returns {Promise<string>} Conteúdo textual do recurso.
   * @throws {Error} Quando a resposta HTTP não é 2xx.
   */
  async function fetchText(url) {
    const res = await fetch(url);
    if (!res.ok) throw new Error('Falha ao carregar ' + url);
    return await res.text();
  }

  /**
   * Processa uma “passagem” de includes no DOM.
   *
   * @description
   * Localiza nós com `data-include`, busca cada partial em paralelo e substitui o nó-alvo
   * por um fragmento de DOM (DocumentFragment) contendo os filhos do HTML retornado.
   *
   * @param {ParentNode} [root=document] Raiz de busca (por padrão, o documento).
   * @returns {Promise<boolean>} `true` se houve substituições; caso contrário, `false`.
   */
  async function processOnce(root=document) {
    const nodes = Array.from(root.querySelectorAll('[data-include]'));
    if (!nodes.length) return false;
    await Promise.all(nodes.map(async (el) => {
      const url = el.getAttribute('data-include');
      // Prepend BASE para funcionar em GitHub Pages com subpath
      const resolvedUrl = resolveInternalUrl(url);
      try {
        const html = await fetchText(resolvedUrl);
        const tmp = document.createElement('div');
        tmp.innerHTML = html;
        // mover filhos para o DOM real
        const frag = document.createDocumentFragment();
        while (tmp.firstChild) frag.appendChild(tmp.firstChild);
        el.replaceWith(frag);
      } catch (e) {
        console.error('Erro em include:', url, e);
      }
    }));
    return true;
  }

  // Executa enquanto houver includes (suporta includes aninhados)
  let ran = false;
  // Limitar profundidade para evitar loops acidentais
  for (let i = 0; i < 5; i++) {
    const changed = await processOnce();
    ran = ran || changed;
    if (!changed) break;
  }

  if (ran) {
    document.dispatchEvent(new CustomEvent('includes:loaded'));
  }
  // Corrige o href do logo para o index dinâmico (funciona em subdiretórios/GitHub Pages)
  try {
    const BASE = (typeof window.__siteGuiaBase === 'string') ? window.__siteGuiaBase : '';
    // Corrige o href do elemento com id 'logo-link' para sempre apontar para o index correto
    const logoLink = document.getElementById('logo-link');
    if (logoLink) {
      logoLink.setAttribute('href', BASE + '/html/index.html');
    }
  } catch (e) {
    console.error('Erro ao corrigir href do logo-link:', e);
  }
})();
