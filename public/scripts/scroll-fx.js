// Scroll Effects — IntersectionObserver reveals + subtle parallax + parallax video lazy/play-pause
// Vanilla JS only. No Lenis, no GSAP. Works smooth on Firefox.

(function () {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // === 1. Reveal on scroll-in (fade + translate up) =====================
  if (!reducedMotion) {
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
  } else {
    // Reduced motion : tout reveal immédiat
    document.querySelectorAll('[data-reveal]').forEach((el) => {
      el.classList.add('is-revealed');
    });
  }

  // === 2. Subtle parallax on decorative elements ========================
  if (!reducedMotion) {
    const parallaxEls = Array.from(document.querySelectorAll('[data-parallax]'));
    if (parallaxEls.length > 0) {
      let ticking = false;

      function updateParallax() {
        const viewportH = window.innerHeight;
        parallaxEls.forEach((el) => {
          const speed = parseFloat(el.getAttribute('data-parallax')) || 0.3;
          const rect = el.getBoundingClientRect();
          if (rect.bottom < -100 || rect.top > viewportH + 100) return;
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
      updateParallax();
    }
  }

  // === 3. Parallax scenes — video lazy load + play/pause on viewport ====
  // Pattern : poster image always visible. Video src injected only when scene
  // approaches viewport. Video plays only while in view. Saves GPU decoder
  // when off-screen + reduces initial network load.

  const scenes = Array.from(document.querySelectorAll('.parallax-scene.has-video'));
  if (scenes.length > 0) {
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const conn = (navigator).connection || (navigator).webkitConnection;
    const isSlowNet = conn && /^(slow-2g|2g|3g)$/.test(conn.effectiveType || '');

    if (reducedMotion || isSlowNet) {
      // Posters only — no video load on slow networks or reduced-motion preference
      scenes.forEach((scene) => {
        scene.classList.add('posters-only-mode');
        const video = scene.querySelector('.parallax-scene__video');
        if (video) video.remove();
      });
    } else {
      // Lazy load : when scene enters viewport (large rootMargin = preload before visible)
      const lazyObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const scene = entry.target;
            const video = scene.querySelector('.parallax-scene__video');
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
      }, { rootMargin: '0px 0px 200px 0px' });

      scenes.forEach((scene) => lazyObserver.observe(scene));

      // Play/pause : when scene fully in viewport, play. When out, pause.
      const playObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          const video = entry.target.querySelector('.parallax-scene__video');
          if (!video) return;
          if (entry.isIntersecting) {
            video.classList.add('is-playing');
            // play() can reject if user hasn't interacted yet; muted + autoplay attrs cover it
            const p = video.play();
            if (p && typeof p.catch === 'function') p.catch(() => {});
          } else {
            video.pause();
            video.classList.remove('is-playing');
          }
        });
      }, { threshold: 0.25 });

      scenes.forEach((scene) => playObserver.observe(scene));
    }
  }

  // === 3. Counter animation on [data-counter] (V4 polish craft) ==========
  if (!reducedMotion) {
    const counterEls = document.querySelectorAll('[data-counter]');
    if (counterEls.length) {
      const animateCounter = (el) => {
        const target = parseInt(el.dataset.counter, 10);
        const suffix = el.dataset.suffix || '';
        if (isNaN(target)) return;
        const duration = 1400;
        const startTime = performance.now();
        const easeOutExpo = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));
        const tick = (now) => {
          const progress = Math.min((now - startTime) / duration, 1);
          const value = Math.round(target * easeOutExpo(progress));
          el.textContent = value + suffix;
          if (progress < 1) requestAnimationFrame(tick);
          else el.textContent = target + suffix;
        };
        requestAnimationFrame(tick);
      };
      const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });
      counterEls.forEach((el) => counterObserver.observe(el));
    }
  } else {
    document.querySelectorAll('[data-counter]').forEach((el) => {
      const target = parseInt(el.dataset.counter, 10);
      const suffix = el.dataset.suffix || '';
      if (!isNaN(target)) el.textContent = target + suffix;
    });
  }
})();
