document.addEventListener('DOMContentLoaded', () => {
  const sliderGroups = document.querySelectorAll('.slider-group');

  sliderGroups.forEach((group) => {
    const sliderEl = group.querySelector('.siema');

    const siema = new Siema({
      selector: sliderEl,
      duration: 400,
      easing: 'ease-out',
      perPage: 1,
      loop: true
    });

    // No autoplay 🎉

    // Buttons scoped to this group
    const prevBtn = group.querySelector('.prev');
    const nextBtn = group.querySelector('.next');

    if (prevBtn && nextBtn) {
      prevBtn.addEventListener('click', () => siema.prev());
      nextBtn.addEventListener('click', () => siema.next());
    }
  });
});
document.addEventListener('DOMContentLoaded', () => {
    const follower = document.getElementById('mouse-follower');
    
    // Check for mobile screen
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (isMobile) {
        return; 
    }

    // Target coordinates (where the mouse currently is)
    let targetX = 0;
    let targetY = 0;
    
    // Follower coordinates (where the dot is rendered)
    let currentX = 0;
    let currentY = 0;
    
    // **THE DELAY FACTOR (CLOSENESS)**
    // A smaller value (e.g., 0.05) creates a bigger lag/delay.
    // A value near 1 is immediate. 0.1 gives a nice, noticeable drag.
    const lerpFactor = 0.1; 

    let isVisible = false;

    // 1. Update Target Coordinates on Mouse Move
    document.addEventListener('mousemove', (e) => {
        targetX = e.clientX;
        targetY = e.clientY;

        if (!isVisible) {
            follower.style.opacity = '1';
            isVisible = true;
        }
    });

    // 2. The Lerp Function (Smooths the movement)
    function lerp(start, end, factor) {
        return start + (end - start) * factor;
    }

    // 3. Animation Loop (Applies the delay)
    function animate() {
        // Interpolate the current position towards the target position
        currentX = lerp(currentX, targetX, lerpFactor);
        currentY = lerp(currentY, targetY, lerpFactor);

        // Apply the new, smoothed position
        follower.style.left = currentX + 'px';
        follower.style.top = currentY + 'px';

        // Request the next frame for smooth animation
        requestAnimationFrame(animate);
    }

    // Start the animation loop
    animate();

    // Optional: Fade out the dot when the mouse leaves the page viewport
    document.addEventListener('mouseleave', () => {
        follower.style.opacity = '0';
        isVisible = false;
    });

    document.addEventListener('mouseenter', () => {
        // Reset current position to target for instant appearance on re-entry
        currentX = targetX;
        currentY = targetY;
        follower.style.opacity = '1';
        isVisible = true;
    });
});