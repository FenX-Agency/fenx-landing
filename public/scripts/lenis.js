// Lenis Smooth Scroll Init
// Cuberto-style silky smooth scrolling

(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return; // Skip si user veut motion réduit
  }
  if (typeof Lenis === 'undefined') {
    console.warn('Lenis not loaded — falling back to native scroll');
    return;
  }

  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    smoothTouch: false, // Touch reste natif (mobile)
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // Expose pour autres scripts qui veulent scrollTo
  window.lenis = lenis;
})();
