// Hover 3D — perspective rotateX/Y on cards at mousemove
// Cuberto-style subtle 3D effect

(function () {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    return; // Skip touch
  }
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  const cards = document.querySelectorAll('[data-hover-3d]');
  if (cards.length === 0) return;

  const MAX_ROTATE = 5; // degrees

  cards.forEach((card) => {
    card.style.transformStyle = 'preserve-3d';
    card.style.willChange = 'transform';

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(1000px) rotateX(${-y * MAX_ROTATE}deg) rotateY(${x * MAX_ROTATE}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
})();
