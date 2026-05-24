// Scroll-Triggered Reveals — GSAP ScrollTrigger
// Fades up sections + cascades sub-elements
// IMPORTANT : hero EXCLU des reveals (visible immédiatement, sinon bug opacity)

(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    console.warn('GSAP not loaded — reveals skipped');
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  // Section labels + h2 : fade up — EXCLURE le hero (sinon opacity 0 stuck)
  gsap.utils.toArray('section:not(#hero) .label, section:not(#hero) h2.section').forEach((el) => {
    gsap.from(el, {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
    });
  });

  // Pain cards : cascade
  gsap.from('.pain-card', {
    y: 40,
    opacity: 0,
    duration: 0.6,
    ease: 'power3.out',
    stagger: 0.1,
    scrollTrigger: {
      trigger: '.pain-grid',
      start: 'top 80%',
      toggleActions: 'play none none reverse',
    },
  });

  // Pack cards : cascade
  gsap.from('.pack-card', {
    y: 60,
    opacity: 0,
    duration: 0.7,
    ease: 'power3.out',
    stagger: 0.15,
    scrollTrigger: {
      trigger: '.packs-grid',
      start: 'top 80%',
      toggleActions: 'play none none reverse',
    },
  });

  // Step cards : cascade
  gsap.from('.step-card', {
    y: 40,
    opacity: 0,
    duration: 0.6,
    ease: 'power3.out',
    stagger: 0.12,
    scrollTrigger: {
      trigger: '.steps-flow',
      start: 'top 80%',
      toggleActions: 'play none none reverse',
    },
  });

  // Hero : load animation simple (pas de scrollTrigger, pas de from opacity 0)
  // Utilise fromTo avec immediateRender false pour éviter le flash
  gsap.fromTo('h1.hero',
    { y: 30, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.1, clearProps: 'all' }
  );

  gsap.fromTo('.hero-content .label, .hero-sub, .hero-ctas',
    { y: 15, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', delay: 0.4, stagger: 0.1, clearProps: 'all' }
  );
})();
