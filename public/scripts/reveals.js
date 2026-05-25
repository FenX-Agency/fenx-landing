// Scroll-Triggered Reveals — minimal et safe
// Simplifié après audit 3 skills UI/UX : 1 effet subtle par section, pas de cascade lourde
// Hero : pas d'animation (visible direct, jamais cachée)

(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    console.warn('GSAP not loaded — reveals skipped');
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  // === LENIS + SCROLLTRIGGER INTEGRATION ===
  // Keep Lenis on its OWN requestAnimationFrame (set up in lenis.js).
  // Do NOT take it over with gsap.ticker — on Firefox this creates a 2-step scroll
  // (Firefox internal wheel handling + gsap.ticker rate mismatch).
  // We only bridge Lenis scroll events to ScrollTrigger.update.
  function integrateLenisScrollTrigger() {
    if (!window.lenis || typeof window.lenis.on !== 'function') return false;
    window.lenis.on('scroll', ScrollTrigger.update);
    ScrollTrigger.refresh();
    return true;
  }

  function setupAnimations() {
    // UN seul reveal style pour TOUTES les sections (simple opacity + slight y)
    // Pas de cascade, pas de stagger lourd, pas de y: 60
    const revealSelector = 'section:not(#hero) .label, section:not(#hero) h2.section, .pain-card, .pack-card, .step-card';

    gsap.utils.toArray(revealSelector).forEach((el) => {
      gsap.from(el, {
        y: 16,
        opacity: 0,
        duration: 0.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      });
    });

    ScrollTrigger.refresh();
  }

  function init() {
    if (integrateLenisScrollTrigger()) {
      setupAnimations();
      return;
    }
    let attempts = 0;
    const interval = setInterval(() => {
      if (integrateLenisScrollTrigger()) {
        clearInterval(interval);
        setupAnimations();
      } else if (++attempts >= 30) {
        clearInterval(interval);
        console.warn('Lenis not ready — ScrollTrigger native fallback');
        setupAnimations();
      }
    }, 50);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
