// Scroll-Triggered Reveals — GSAP ScrollTrigger
// IMPORTANT : intégration Lenis + ScrollTrigger pour que les triggers fonctionnent
// (sans ça : Lenis intercepte le scroll natif → scrollTriggers ne se déclenchent jamais)

(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    console.warn('GSAP not loaded — reveals skipped');
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  // === INTÉGRATION LENIS + SCROLLTRIGGER ===
  // Pattern officiel : https://gsap.com/docs/v3/Plugins/ScrollTrigger/static.scrollerProxy()/
  function integrateLenisScrollTrigger() {
    if (!window.lenis || typeof window.lenis.on !== 'function') return false;
    window.lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => { window.lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);
    ScrollTrigger.refresh();
    return true;
  }

  function setupAnimations() {
    // Section labels + h2 : fade up — EXCLURE le hero (animé séparément)
    gsap.utils.toArray('section:not(#hero) .label, section:not(#hero) h2.section').forEach((el) => {
      gsap.from(el, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    });

    // Pain cards : cascade (play once)
    gsap.from('.pain-card', {
      y: 40, opacity: 0, duration: 0.6, ease: 'power3.out', stagger: 0.1,
      scrollTrigger: { trigger: '.pain-grid', start: 'top 80%', toggleActions: 'play none none none' },
    });

    // Pack cards : cascade (play once)
    gsap.from('.pack-card', {
      y: 60, opacity: 0, duration: 0.7, ease: 'power3.out', stagger: 0.15,
      scrollTrigger: { trigger: '.packs-grid', start: 'top 80%', toggleActions: 'play none none none' },
    });

    // Step cards : cascade (play once)
    gsap.from('.step-card', {
      y: 40, opacity: 0, duration: 0.6, ease: 'power3.out', stagger: 0.12,
      scrollTrigger: { trigger: '.steps-flow', start: 'top 80%', toggleActions: 'play none none none' },
    });

    // Hero : animations SAFE (pas de from opacity 0 → si GSAP fail, éléments restent visibles)
    // gsap.from() seul anime depuis l'état spécifié vers le current state.
    // Sans opacity, l'élément n'est jamais caché → garantie visibilité.
    gsap.from('h1.hero', { y: 20, duration: 0.7, ease: 'power3.out', delay: 0.1 });
    gsap.from('.hero-content .label, .hero-sub, .hero-ctas', {
      y: 10, duration: 0.5, ease: 'power3.out', delay: 0.3, stagger: 0.08
    });

    // ScrollTrigger doit recompute après setup (au cas où layout pas encore stable)
    ScrollTrigger.refresh();
  }

  function init() {
    // Tente Lenis integration, sinon poll, sinon fallback native
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
        console.warn('Lenis not ready after 1.5s — ScrollTrigger sur native scroll');
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
