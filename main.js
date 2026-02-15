(function() {
  'use strict';

  // --- DOM ready ---
  document.addEventListener('DOMContentLoaded', () => {
    initLightbox();
    initScrollReveal();
    initMouseFollower();
    initRotatingBadges(); // optional, if we keep the CSS-only rotator we don't need JS
    // (Siema is removed, we use CSS + lightbox)
  });

  // --- Lightbox ---
  function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = lightbox.querySelector('.lightbox__img');
    const lightboxCaption = lightbox.querySelector('.lightbox__caption');
    const closeBtn = lightbox.querySelector('.lightbox__close');
    const prevBtn = lightbox.querySelector('.lightbox__prev');
    const nextBtn = lightbox.querySelector('.lightbox__next');

    let currentImages = [];
    let currentIndex = 0;

    // Attach click to all .shot links
    const shots = document.querySelectorAll('.shot');
    shots.forEach((shot, idx) => {
      shot.addEventListener('click', (e) => {
        e.preventDefault();
        const projectShots = shot.closest('.shots');
        const projectLinks = Array.from(projectShots.querySelectorAll('.shot'));
        currentImages = projectLinks.map(link => ({
          src: link.getAttribute('href'),
          caption: link.dataset.caption || ''
        }));
        currentIndex = projectLinks.indexOf(shot);
        openLightbox();
      });
    });

    function openLightbox() {
      if (!currentImages.length) return;
      updateLightboxImage();
      lightbox.classList.add('lightbox--visible');
      lightbox.hidden = false;
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleKeyDown);
    }

    function closeLightbox() {
      lightbox.classList.remove('lightbox--visible');
      lightbox.hidden = true;
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
    }

    function updateLightboxImage() {
      const img = currentImages[currentIndex];
      lightboxImg.src = img.src;
      lightboxImg.alt = img.caption;
      lightboxCaption.textContent = img.caption;
    }

    function showPrev() {
      if (currentIndex > 0) {
        currentIndex--;
        updateLightboxImage();
      }
    }

    function showNext() {
      if (currentIndex < currentImages.length - 1) {
        currentIndex++;
        updateLightboxImage();
      }
    }

    function handleKeyDown(e) {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
    }

    closeBtn.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', showPrev);
    nextBtn.addEventListener('click', showNext);

    // Close on overlay click (but not on image)
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  }

  // --- Scroll reveal (IntersectionObserver) ---
  function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    if (!reveals.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal--visible');
          observer.unobserve(entry.target); // only once
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -20px 0px' });

    reveals.forEach(el => observer.observe(el));
  }

  // --- Mouse follower (lerp) ---
  function initMouseFollower() {
    const follower = document.getElementById('mouse-follower');
    if (!follower) return;

    // disable on touch devices
    if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) {
      return;
    }

    let targetX = 0, targetY = 0;
    let currentX = 0, currentY = 0;
    const lerpFactor = 0.12;
    let isVisible = false;

    function lerp(start, end, factor) {
      return start + (end - start) * factor;
    }

    function animate() {
      currentX = lerp(currentX, targetX, lerpFactor);
      currentY = lerp(currentY, targetY, lerpFactor);
      follower.style.left = currentX + 'px';
      follower.style.top = currentY + 'px';
      requestAnimationFrame(animate);
    }
    animate();

    document.addEventListener('mousemove', (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!isVisible) {
        follower.classList.add('mouse-follower--visible');
        isVisible = true;
      }
    });

    document.addEventListener('mouseleave', () => {
      follower.classList.remove('mouse-follower--visible');
      isVisible = false;
    });
  }

  // Optional: rotating badges (already in CSS, but we can pause on hover)
  function initRotatingBadges() {
    const rotator = document.querySelector('.hero__badge-rotator');
    if (!rotator) return;
    rotator.addEventListener('mouseenter', () => {
      rotator.style.animationPlayState = 'paused';
    });
    rotator.addEventListener('mouseleave', () => {
      rotator.style.animationPlayState = 'running';
    });
  }

})();
