// FenX scroll-fx V5 — GSAP + ScrollTrigger
// - [data-reveal] : Wibify-style toggle in/out + subtle bounce (back.out)
// - [data-parallax] : scrub-based parallax sur éléments décoratifs
// - [data-counter] : count-up animation à scroll-in
// - .parallax-scene.has-video : lazy load + play/pause (IntersectionObserver, indépendant de GSAP)
// - gsap.matchMedia : respect prefers-reduced-motion + breakpoint mobile

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Defaults projet
gsap.defaults({ duration: 0.7, ease: 'power2.out' });

const mm = gsap.matchMedia();

mm.add(
  {
    isDesktop: '(min-width: 769px)',
    isMobile: '(max-width: 768px)',
    reduceMotion: '(prefers-reduced-motion: reduce)',
  },
  (context) => {
    const conditions = context.conditions as {
      isDesktop: boolean;
      isMobile: boolean;
      reduceMotion: boolean;
    };
    const { reduceMotion, isMobile } = conditions;

    // ============ 1. Reduced motion : reveal immédiat, pas de parallax ============
    if (reduceMotion) {
      document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
        gsap.set(el, { autoAlpha: 1, y: 0 });
      });
      document.querySelectorAll<HTMLElement>('[data-counter]').forEach((el) => {
        const target = parseInt(el.dataset.counter || '0', 10);
        const suffix = el.dataset.suffix || '';
        if (!isNaN(target)) el.textContent = target + suffix;
      });
      return;
    }

    // ============ 2. Wibify reveals — batch + toggle in/out + back.out ============
    // Mobile : les éléments [data-reveal-mobile="scrub"] (Process rows) utilisent un
    // reveal scroll-linked (scrub) par élément = fluide, au lieu du batch toggle qui
    // les faisait apparaître "d'un coup". Desktop : tout passe par le batch.
    const allReveal = gsap.utils.toArray<HTMLElement>('[data-reveal]');
    const scrubReveal = isMobile
      ? allReveal.filter((el) => el.dataset.revealMobile === 'scrub')
      : [];
    const batchReveal = allReveal.filter((el) => !scrubReveal.includes(el));

    // Initial state : les [data-reveal] batch partent invisibles + offset bas
    gsap.set(batchReveal, { autoAlpha: 0, y: 40 });

    // Mobile : reveal scrub par card (opacité couplée au scroll = fluide, tous navigateurs)
    scrubReveal.forEach((el) => {
      gsap.fromTo(
        el,
        { autoAlpha: 0, y: 48 },
        {
          autoAlpha: 1,
          y: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top 92%',
            end: 'top 58%',
            scrub: true,
          },
        }
      );
    });

    ScrollTrigger.batch(batchReveal, {
      start: 'top 88%',
      end: 'bottom 12%',
      onEnter: (els) =>
        gsap.to(els, {
          autoAlpha: 1,
          y: 0,
          duration: 0.85,
          ease: 'back.out(1.4)',
          stagger: 0.08,
          overwrite: 'auto',
        }),
      onLeave: (els) =>
        gsap.to(els, {
          autoAlpha: 0,
          y: -28,
          duration: 0.5,
          ease: 'power2.in',
          overwrite: 'auto',
        }),
      onEnterBack: (els) =>
        gsap.to(els, {
          autoAlpha: 1,
          y: 0,
          duration: 0.85,
          ease: 'back.out(1.4)',
          stagger: 0.08,
          overwrite: 'auto',
        }),
      onLeaveBack: (els) =>
        gsap.to(els, {
          autoAlpha: 0,
          y: 40,
          duration: 0.5,
          ease: 'power2.in',
          overwrite: 'auto',
        }),
    });

    // ============ 3. Parallax scrub — éléments décoratifs ============
    gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((el) => {
      const speed = parseFloat(el.getAttribute('data-parallax') || '0.3');
      const distance = isMobile ? speed * 80 : speed * 160;
      gsap.fromTo(
        el,
        { y: -distance },
        {
          y: distance,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        }
      );
    });

    // ============ 4. Counter animation ============
    gsap.utils.toArray<HTMLElement>('[data-counter]').forEach((el) => {
      const target = parseInt(el.dataset.counter || '0', 10);
      const suffix = el.dataset.suffix || '';
      if (isNaN(target)) return;
      const obj = { value: 0 };
      gsap.to(obj, {
        value: target,
        duration: 1.4,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        onUpdate: () => {
          el.textContent = Math.round(obj.value) + suffix;
        },
        onComplete: () => {
          el.textContent = target + suffix;
        },
      });
    });

    return () => {
      // Cleanup : matchMedia auto-revert handles GSAP, mais on assure ScrollTrigger
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }
);

// ============ 5. Parallax scenes video lazy + play/pause (hors GSAP) ============
(function videoScenes() {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const scenes = Array.from(document.querySelectorAll<HTMLElement>('.parallax-scene.has-video'));
  if (scenes.length === 0) return;

  const isMobile = window.matchMedia('(max-width: 768px)').matches;
  const navConn = (navigator as Navigator & { connection?: { effectiveType?: string } }).connection;
  const isSlowNet = navConn && /^(slow-2g|2g|3g)$/.test(navConn.effectiveType || '');

  if (reducedMotion || isSlowNet) {
    scenes.forEach((scene) => {
      scene.classList.add('posters-only-mode');
      const video = scene.querySelector<HTMLVideoElement>('.parallax-scene__video');
      if (video) video.remove();
    });
    return;
  }

  const lazyObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const scene = entry.target as HTMLElement;
          const video = scene.querySelector<HTMLVideoElement>('.parallax-scene__video');
          if (video && !video.src) {
            const src = isMobile
              ? video.getAttribute('data-video-mobile')
              : video.getAttribute('data-video-desktop');
            if (src) {
              video.src = src;
              video.load();
            }
          }
          lazyObserver.unobserve(scene);
        }
      });
    },
    { rootMargin: '0px 0px 200px 0px' }
  );
  scenes.forEach((scene) => lazyObserver.observe(scene));

  const playObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const video = entry.target.querySelector<HTMLVideoElement>('.parallax-scene__video');
        if (!video) return;
        if (entry.isIntersecting) {
          video.classList.add('is-playing');
          const p = video.play();
          if (p && typeof p.catch === 'function') p.catch(() => {});
        } else {
          video.pause();
          video.classList.remove('is-playing');
        }
      });
    },
    { threshold: 0.25 }
  );
  scenes.forEach((scene) => playObserver.observe(scene));
})();
