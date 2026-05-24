// Cursor Custom Blob — follows mouse with lerp, grows on hoverable elements
// Disabled on touch devices via CSS @media (hover: hover)

(function () {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    return; // Skip touch devices
  }
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  const blob = document.querySelector('.cursor-blob');
  if (!blob) return;

  let mouseX = 0;
  let mouseY = 0;
  let blobX = 0;
  let blobY = 0;
  const lerp = 0.15;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animate() {
    blobX += (mouseX - blobX) * lerp;
    blobY += (mouseY - blobY) * lerp;
    blob.style.transform = `translate(${blobX}px, ${blobY}px) translate(-50%, -50%)`;
    requestAnimationFrame(animate);
  }
  animate();

  // Grow on interactive elements
  const hoverables = document.querySelectorAll('a, button, [role="button"]');
  hoverables.forEach((el) => {
    el.addEventListener('mouseenter', () => blob.classList.add('is-hover'));
    el.addEventListener('mouseleave', () => blob.classList.remove('is-hover'));
  });
})();
