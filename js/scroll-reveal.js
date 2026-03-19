/**
 * scroll-reveal.js — Animações ativadas por scroll via IntersectionObserver
 *
 * USO (HTML):
 *   data-reveal="tipo"           → tipo: fade | slide-up | slide-down |
 *                                         slide-left | slide-right | scale | pop
 *   data-reveal-once             → anima apenas na primeira entrada (não some ao sair)
 *   style="--reveal-delay:200ms" → atraso individual por elemento
 *   style="--reveal-duration:600ms" → duração individual por elemento
 *
 *  O CSS correspondente está em /css/animations/animations.css
 *
 * EXEMPLOS:
 *   <div data-reveal="slide-up">…</div>
 *   <div data-reveal="fade" data-reveal-once>…</div>
 *   <div data-reveal="scale" style="--reveal-delay:150ms">…</div>
 */
(function () {
    'use strict';

    // Sem suporte: garante que elementos fiquem visíveis (graceful degradation)
    if (!('IntersectionObserver' in window)) {
        document.querySelectorAll('[data-reveal]').forEach(function (el) {
            el.classList.add('is-visible');
        });
        return;
    }

    var THRESHOLD  = 0.12;              // 12% do elemento visível aciona a entrada
    var ROOT_MARGIN = '0px 0px -60px 0px'; // aciona 60px antes do fundo da viewport

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            var el = entry.target;
            if (entry.isIntersecting) {
                el.classList.add('is-visible');
                // Se marcado como "once", para de observar após a primeira entrada
                if (el.hasAttribute('data-reveal-once')) {
                    observer.unobserve(el);
                }
            } else {
                // Remove a classe apenas se não for "once" (permite sumir ao sair)
                if (!el.hasAttribute('data-reveal-once')) {
                    el.classList.remove('is-visible');
                }
            }
        });
    }, {
        rootMargin: ROOT_MARGIN,
        threshold: THRESHOLD
    });

    /**
     * Começa a observar todos os [data-reveal] dentro de um root.
     * Ignora elementos já sendo observados (não re-registra).
     */
    function observe(root) {
        root.querySelectorAll('[data-reveal]').forEach(function (el) {
            observer.observe(el);
        });
    }

    // Observa elementos já presentes no DOM
    observe(document);

    // Re-observa após os partials (header/footer) serem injetados pelo include.js
    document.addEventListener('includes:loaded', function () {
        observe(document);
    });
})();
