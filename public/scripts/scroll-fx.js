// Scroll Effects — IntersectionObserver reveals + subtle parallax
// Vanilla JS only. No Lenis, no GSAP. Works smooth on Firefox.

(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  // === 1. Reveal on scroll-in (fade + translate up) =====================
  // Elements with [data-reveal] start hidden, become visible when they enter viewport.
  // Use rootMargin to trigger slightly before the element is fully visible.

  const revealOptions = {
    rootMargin: '0px 0px -10% 0px',
    threshold: 0.05,
  };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, revealOptions);

  document.querySelectorAll('[data-reveal]').forEach((el) => {
    revealObserver.observe(el);
  });

  // === 2. Subtle parallax on decorative elements =========================
  // Elements with [data-parallax="0.3"] move at 30% of scroll speed (slower).
  // Throttled to RAF for smoothness.

  const parallaxEls = Array.from(document.querySelectorAll('[data-parallax]'));
  if (parallaxEls.length > 0) {
    let ticking = false;

    function updateParallax() {
      const viewportH = window.innerHeight;
      parallaxEls.forEach((el) => {
        const speed = parseFloat(el.getAttribute('data-parallax')) || 0.3;
        const rect = el.getBoundingClientRect();
        // Only animate when near viewport (perf)
        if (rect.bottom < -100 || rect.top > viewportH + 100) return;
        // Offset relative to element's center vs viewport center
        const elementCenter = rect.top + rect.height / 2;
        const viewportCenter = viewportH / 2;
        const distance = elementCenter - viewportCenter;
        const offset = distance * speed * -1;
        el.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0)`;
      });
      ticking = false;
    }

    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    updateParallax(); // initial
  }
})();
