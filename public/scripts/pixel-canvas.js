// Pixel Canvas — port vanilla du composant serafim/pixel-canvas (21st.dev)
// Initialise un effet pixel reveal sur tous les .btn-pill au hover

(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  class Pixel {
    constructor(canvas, ctx, x, y, color, speed, delay) {
      this.width = canvas.width;
      this.height = canvas.height;
      this.ctx = ctx;
      this.x = x;
      this.y = y;
      this.color = color;
      this.speed = this.getRandomValue(0.1, 0.9) * speed;
      this.size = 0;
      this.sizeStep = Math.random() * 0.4;
      this.minSize = 0.5;
      this.maxSizeInteger = 2;
      this.maxSize = this.getRandomValue(this.minSize, this.maxSizeInteger);
      this.delay = delay;
      this.counter = 0;
      this.counterStep = Math.random() * 4 + (this.width + this.height) * 0.01;
      this.isIdle = false;
      this.isReverse = false;
      this.isShimmer = false;
    }
    getRandomValue(min, max) { return Math.random() * (max - min) + min; }
    draw() {
      const centerOffset = this.maxSizeInteger * 0.5 - this.size * 0.5;
      this.ctx.fillStyle = this.color;
      this.ctx.fillRect(this.x + centerOffset, this.y + centerOffset, this.size, this.size);
    }
    appear() {
      this.isIdle = false;
      if (this.counter <= this.delay) { this.counter += this.counterStep; return; }
      if (this.size >= this.maxSize) this.isShimmer = true;
      if (this.isShimmer) this.shimmer(); else this.size += this.sizeStep;
      this.draw();
    }
    disappear() {
      this.isShimmer = false;
      this.counter = 0;
      if (this.size <= 0) { this.isIdle = true; return; } else this.size -= 0.1;
      this.draw();
    }
    shimmer() {
      if (this.size >= this.maxSize) this.isReverse = true;
      else if (this.size <= this.minSize) this.isReverse = false;
      if (this.isReverse) this.size -= this.speed; else this.size += this.speed;
    }
  }

  const GAP = 5;
  const SPEED = 60 * 0.001;
  const COLORS = ['#ffffff', '#e9d5ff', '#c4b5fd', '#a78bfa'];
  const VARIANT = 'icon';
  const timeInterval = 1000 / 60;

  function getDistanceToCenter(x, y, canvas) {
    const dx = x - canvas.width / 2;
    const dy = y - canvas.height / 2;
    return Math.sqrt(dx * dx + dy * dy);
  }

  function initButton(btn) {
    const wrapper = btn.querySelector('.pixel-canvas-wrapper');
    if (!wrapper) return;
    const canvas = wrapper.querySelector('canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let pixels = [];
    let animationId = null;
    let timePrevious = performance.now();
    const dpr = window.devicePixelRatio || 1;

    function setup() {
      const rect = btn.getBoundingClientRect();
      const width = Math.floor(rect.width);
      const height = Math.floor(rect.height);
      if (width === 0 || height === 0) return;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      createPixels();
    }

    function createPixels() {
      pixels = [];
      const startX = Math.floor(GAP / 2);
      const startY = Math.floor(GAP / 2);
      for (let x = startX; x < canvas.width; x += GAP) {
        for (let y = startY; y < canvas.height; y += GAP) {
          const color = COLORS[Math.floor(Math.random() * COLORS.length)];
          const delay = getDistanceToCenter(x, y, canvas);
          pixels.push(new Pixel(canvas, ctx, x, y, color, SPEED, delay));
        }
      }
    }

    function handleAnimation(name) {
      if (animationId) cancelAnimationFrame(animationId);
      function animate() {
        animationId = requestAnimationFrame(animate);
        const timeNow = performance.now();
        const timePassed = timeNow - timePrevious;
        if (timePassed < timeInterval) return;
        timePrevious = timeNow - (timePassed % timeInterval);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let allIdle = true;
        for (const pixel of pixels) {
          pixel[name]();
          if (!pixel.isIdle) allIdle = false;
        }
        if (allIdle) { cancelAnimationFrame(animationId); animationId = null; }
      }
      animate();
    }

    setup();
    btn.addEventListener('mouseenter', () => handleAnimation('appear'));
    btn.addEventListener('mouseleave', () => handleAnimation('disappear'));
    btn.addEventListener('focus', () => handleAnimation('appear'));
    btn.addEventListener('blur', () => handleAnimation('disappear'));
  }

  // Init for all buttons on page
  function initAll() {
    document.querySelectorAll('.btn-pill').forEach(initButton);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }

  // Resize handler (debounced)
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(initAll, 200);
  }, { passive: true });
})();
