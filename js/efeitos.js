/**
 * @file efeitos.js
 * @summary Efeitos interativos de UI (flip cards e similares).
 *
 * @description
 * Módulo dedicado a efeitos visuais que requerem JS mas não pertencem
 * à infraestrutura de base.js. Adicione novos efeitos aqui.
 */

// =========================================================
// Flip cards (.flip-card) — click toggle
// Guard de animação: ignora cliques enquanto a transição roda (650ms).
// Sem hover — .card:hover causa jitter durante o transform 3D.
// CSS em css/effects/flip_card.css
// =========================================================
(function () {
    document.addEventListener('click', (e) => {
        const card = e.target.closest('.flip-card');
        if (!card || card.dataset.flipping) return;
        card.dataset.flipping = '1';
        card.classList.toggle('is-flipped');
        setTimeout(() => delete card.dataset.flipping, 650);
    });

    document.addEventListener('keydown', (e) => {
        if (e.key !== 'Enter' && e.key !== ' ') return;
        const card = document.activeElement && document.activeElement.closest('.flip-card');
        if (!card || card.dataset.flipping) return;
        e.preventDefault();
        card.dataset.flipping = '1';
        card.classList.toggle('is-flipped');
        setTimeout(() => delete card.dataset.flipping, 650);
    });
}());
