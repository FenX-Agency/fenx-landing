// Parallax Halos — moves halo elements at different scroll speeds
// Reads data-parallax attribute for speed multiplier (0-1)

(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  const halos = document.querySelectorAll('[data-parallax]');
  if (halos.length === 0) return;

  let ticking = false;

  function updateParallax() {
    const scrollY = window.scrollY;
    halos.forEach((el) => {
      const speed = parseFloat(el.dataset.parallax) || 0.5;
      const offset = scrollY * speed;
      el.style.transform = `translate3d(0, ${offset}px, 0)`;
    });
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }, { passive: true });

  // Initial position
  updateParallax();
})();
