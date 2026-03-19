/**
 * @file carousel.js
 * @summary Carrossel horizontal estilo “Netflix” (scroll com botões).
 *
 * @description
 * Habilita botões anterior/próximo para componentes `.carousel[data-carousel]`.
 * Sem JS, o carrossel ainda funciona via scroll horizontal (touch/mouse).
 *
 * Requisitos de markup:
 * - `.carousel[data-carousel]`
 *   - `.carousel__track`
 *   - `button.carousel__btn--prev` (opcional)
 *   - `button.carousel__btn--next` (opcional)
 */

(function () {
  function getScrollAmount(track) {
    // Aproxima o "salto" de navegação: ~90% da largura visível.
    return Math.max(240, Math.floor(track.clientWidth * 0.9));
  }

  function updateButtons(track, prevBtn, nextBtn) {
    if (!track) return;
    const maxScrollLeft = track.scrollWidth - track.clientWidth;
    const atStart = track.scrollLeft <= 0;
    const atEnd = track.scrollLeft >= maxScrollLeft - 1;

    if (prevBtn) prevBtn.disabled = atStart;
    if (nextBtn) nextBtn.disabled = atEnd;
  }

  function bindCarousel(carousel) {
    if (!carousel || carousel.dataset.carouselBound === '1') return;

    const track = carousel.querySelector('.carousel__track');
    if (!track) return;

    const prevBtn = carousel.querySelector('.carousel__btn--prev');
    const nextBtn = carousel.querySelector('.carousel__btn--next');

    const onPrev = () => {
      track.scrollBy({ left: -getScrollAmount(track), behavior: 'smooth' });
    };

    const onNext = () => {
      track.scrollBy({ left: getScrollAmount(track), behavior: 'smooth' });
    };

    if (prevBtn) prevBtn.addEventListener('click', onPrev);
    if (nextBtn) nextBtn.addEventListener('click', onNext);

    const onScroll = () => updateButtons(track, prevBtn, nextBtn);
    track.addEventListener('scroll', onScroll, { passive: true });

    // Estado inicial
    updateButtons(track, prevBtn, nextBtn);

    // Reavaliar em resize (mudança de layout)
    const onResize = () => updateButtons(track, prevBtn, nextBtn);
    window.addEventListener('resize', onResize);

    carousel.dataset.carouselBound = '1';
  }

  function initCarousels(root = document) {
    const carousels = root.querySelectorAll('.carousel[data-carousel]');
    carousels.forEach(bindCarousel);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => initCarousels(document));
  } else {
    initCarousels(document);
  }

  // Suporte a partials via include.js
  document.addEventListener('includes:loaded', () => initCarousels(document));
})();
