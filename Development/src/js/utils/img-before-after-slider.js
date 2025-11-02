document.addEventListener('DOMContentLoaded', function () {
  const slider = document.querySelector('.slider');
  const handle = document.querySelector('.slider-handle');
  const afterImage = document.querySelector('.after');
  const sliderContainer = document.querySelector('.slider-container');

  if (!slider || !handle || !afterImage) {
    return;
  }

  let isDragging = false;
  let startX = 0;
  let startLeft = 0;

  // Initialize slider position
  function initSlider() {
    const sliderRect = slider.getBoundingClientRect();
    const centerPosition = sliderRect.width / 2;
    handle.style.left = `${centerPosition}px`;
    updateClipPath(centerPosition);
  }

  // Update the clip path for the after image
  function updateClipPath(position) {
    const sliderRect = slider.getBoundingClientRect();
    const percentage = (position / sliderRect.width) * 100;
    afterImage.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`;
  }

  // Handle mouse down
  handle.addEventListener('mousedown', (e) => {
    e.preventDefault();
    isDragging = true;
    startX = e.clientX;
    startLeft = parseInt(handle.style.left) || slider.offsetWidth / 2;

    // Disable transitions during dragging for instant movement
    handle.classList.add('no-transition');

    // Change cursor to ew-resize during dragging
    document.body.style.cursor = 'ew-resize';
    document.body.style.userSelect = 'none';
    handle.style.cursor = 'ew-resize';

    // Add active class for visual feedback
    handle.classList.add('active');
  });

  // Handle mouse up
  document.addEventListener('mouseup', () => {
    if (isDragging) {
      isDragging = false;

      // Re-enable transitions after dragging stops
      handle.classList.remove('no-transition');

      // Reset cursor to default when dragging stops
      document.body.style.cursor = 'default';
      document.body.style.userSelect = '';
      handle.style.cursor = 'ew-resize'; // Keep ew-resize for handle
      handle.classList.remove('active');
    }
  });

  // Handle mouse move
  document.addEventListener('mousemove', (e) => {
    if (isDragging) {
      const sliderRect = slider.getBoundingClientRect();
      const deltaX = e.clientX - startX;
      const newPosition = startLeft + deltaX;

      // Constrain to slider bounds
      const constrainedPosition = Math.max(0, Math.min(sliderRect.width, newPosition));

      handle.style.left = `${constrainedPosition}px`;
      updateClipPath(constrainedPosition);

      // Ensure cursor stays ew-resize during movement
      document.body.style.cursor = 'ew-resize';
      handle.style.cursor = 'ew-resize';
    }
  });

  // Handle touch events for mobile
  handle.addEventListener('touchstart', (e) => {
    e.preventDefault();
    isDragging = true;
    startX = e.touches[0].clientX;
    startLeft = parseInt(handle.style.left) || slider.offsetWidth / 2;

    // Disable transitions during dragging for instant movement
    handle.classList.add('no-transition');

    // Change cursor for touch devices
    handle.style.cursor = 'ew-resize';
    handle.classList.add('active');
  });

  document.addEventListener('touchend', () => {
    if (isDragging) {
      isDragging = false;

      // Re-enable transitions after dragging stops
      handle.classList.remove('no-transition');

      // Reset cursor after touch drag
      handle.style.cursor = 'ew-resize';
      handle.classList.remove('active');
    }
  });

  document.addEventListener('touchmove', (e) => {
    if (isDragging) {
      e.preventDefault();
      const sliderRect = slider.getBoundingClientRect();
      const deltaX = e.touches[0].clientX - startX;
      const newPosition = startLeft + deltaX;

      const constrainedPosition = Math.max(0, Math.min(sliderRect.width, newPosition));

      handle.style.left = `${constrainedPosition}px`;
      updateClipPath(constrainedPosition);

      // Ensure cursor stays ew-resize during touch movement
      handle.style.cursor = 'ew-resize';
    }
  });

  // Handle click on slider to move handle
  slider.addEventListener('click', (e) => {
    if (!isDragging) {
      const sliderRect = slider.getBoundingClientRect();
      const clickX = e.clientX - sliderRect.left;
      const constrainedPosition = Math.max(0, Math.min(sliderRect.width, clickX));

      handle.style.left = `${constrainedPosition}px`;
      updateClipPath(constrainedPosition);
    }
  });

  // Handle window resize
  window.addEventListener('resize', () => {
    initSlider();
  });

  // Initialize slider
  initSlider();

  // Add keyboard support
  handle.addEventListener('keydown', (e) => {
    const sliderRect = slider.getBoundingClientRect();
    const currentPosition = parseInt(handle.style.left) || sliderRect.width / 2;
    const step = sliderRect.width / 20; // 5% steps

    let newPosition = currentPosition;

    switch (e.key) {
      case 'ArrowLeft':
        newPosition = Math.max(0, currentPosition - step);
        break;
      case 'ArrowRight':
        newPosition = Math.min(sliderRect.width, currentPosition + step);
        break;
      case 'Home':
        newPosition = 0;
        break;
      case 'End':
        newPosition = sliderRect.width;
        break;
      default:
        return;
    }

    e.preventDefault();
    handle.style.left = `${newPosition}px`;
    updateClipPath(newPosition);
  });

  // Make handle focusable for keyboard navigation
  handle.setAttribute('tabindex', '0');
  handle.setAttribute('role', 'slider');
  handle.setAttribute('aria-label', 'Before and after image slider');
  handle.setAttribute('aria-valuemin', '0');
  handle.setAttribute('aria-valuemax', '100');
  handle.setAttribute('aria-valuenow', '50');
});
