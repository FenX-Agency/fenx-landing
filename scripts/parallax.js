// Parallax Halos — moves halo elements at different scroll speeds
// Compatible Lenis : utilise lenis.scroll si dispo, sinon fallback window.scrollY

(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  const halos = document.querySelectorAll('[data-parallax]');
  if (halos.length === 0) return;

  function updateParallax(scrollY) {
    halos.forEach((el) => {
      const speed = parseFloat(el.dataset.parallax) || 0.5;
      const offset = scrollY * speed;
      el.style.transform = `translate3d(0, ${offset}px, 0)`;
    });
  }

  function bindLenis() {
    if (window.lenis && typeof window.lenis.on === 'function') {
      window.lenis.on('scroll', ({ scroll }) => {
        updateParallax(scroll);
      });
      updateParallax(window.lenis.scroll || 0);
      return true;
    }
    return false;
  }

  function bindNative() {
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateParallax(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
    updateParallax(window.scrollY);
  }

  // Lenis charge en defer — on poll court pour le binder dès qu'il est dispo
  if (!bindLenis()) {
    let attempts = 0;
    const interval = setInterval(() => {
      if (bindLenis()) {
        clearInterval(interval);
      } else if (++attempts >= 20) {
        clearInterval(interval);
        bindNative();
      }
    }, 50);
  }
})();
