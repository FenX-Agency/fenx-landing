// Scroll-Triggered Reveals — GSAP ScrollTrigger
// Fades up sections + cascades sub-elements

(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    console.warn('GSAP not loaded — reveals skipped');
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  // Section labels + h2 : fade up
  gsap.utils.toArray('section .label, section h2.section').forEach((el) => {
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

  // Hero h1 : fade in delayed (au load, pas scroll)
  gsap.from('h1.hero', {
    y: 50,
    opacity: 0,
    duration: 1,
    ease: 'power3.out',
    delay: 0.2,
  });

  gsap.from('.hero-sub, .hero-ctas, .hero-content .label', {
    y: 20,
    opacity: 0,
    duration: 0.7,
    ease: 'power3.out',
    delay: 0.6,
    stagger: 0.1,
  });
})();
