// Lenis Smooth Scroll Init
// Cuberto-style silky smooth scrolling
// Exposes window.stopLenisRaf() so other scripts (reveals.js) can take over
// the tick loop via gsap.ticker without causing a double-step.

(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return; // Skip si user veut motion réduit
  }
  if (typeof Lenis === 'undefined') {
    console.warn('Lenis not loaded — falling back to native scroll');
    return;
  }

  const lenis = new Lenis({
    duration: 1.0,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    syncTouch: false, // touch reste natif (mobile)
    wheelMultiplier: 1,
  });

  let rafId = null;
  function raf(time) {
    lenis.raf(time);
    rafId = requestAnimationFrame(raf);
  }
  rafId = requestAnimationFrame(raf);

  // Expose for other scripts
  window.lenis = lenis;
  window.stopLenisRaf = function () {
    if (rafId !== null) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
  };
})();
