/* =========================
 Parallax effect js 
=========================== */

const parallaxEffect = {
  init() {
    const scene = document.getElementById('scene');

    if (scene != null) {
      // Initialize parallax effect with optimized performance
      initializeParallaxEffect();
    }

    // Optimized parallax initialization
    function initializeParallaxEffect() {
      if (!scene) return;

      // Freeze parallax elements initially
      freezeParallaxElements(scene);

      // Wait for window to be fully loaded before starting parallax
      if (document.readyState === 'complete') {
        startParallaxAfterLoad();
      } else {
        window.addEventListener('load', startParallaxAfterLoad);
      }
    }

    // Freeze parallax elements to prevent jumping during load
    function freezeParallaxElements(scene) {
      const parallaxElements = scene.querySelectorAll('.parallax-effect');
      parallaxElements.forEach((element) => {
        element.style.willChange = 'transform';
        element.style.transform = 'translate3d(0px, 0px, 0)';
        element.style.transition = 'none';
        element.classList.add('parallax-frozen');
      });
    }

    // Start parallax effect after window is fully loaded
    function startParallaxAfterLoad() {
      // Wait for all images to load before starting parallax
      waitForImagesToLoad(scene, () => {
        // Small additional delay to ensure smooth transition
        setTimeout(() => {
          unfreezeAndStartParallax(scene);
        }, 300);
      });
    }

    // Unfreeze elements and start parallax animation
    function unfreezeAndStartParallax(scene) {
      const parallaxElements = scene.querySelectorAll('.parallax-effect');

      // Remove frozen class and transition
      parallaxElements.forEach((element) => {
        element.classList.remove('parallax-frozen');
        element.style.transition = 'transform 0.3s ease-out';
      });

      // Start the parallax animation
      setupParallaxAnimation(scene);
    }

    // Wait for all parallax images to load
    function waitForImagesToLoad(scene, onComplete) {
      const parallaxElements = scene.querySelectorAll('.parallax-effect');
      const parallaxImages = scene.querySelectorAll('.parallax-effect img');

      if (parallaxImages.length === 0) {
        onComplete();
        return;
      }

      let loadedCount = 0;
      const totalImages = parallaxImages.length;

      const checkCompletion = () => {
        loadedCount++;
        if (loadedCount >= totalImages) {
          onComplete();
        }
      };

      parallaxImages.forEach((img) => {
        if (img.complete) {
          checkCompletion();
        } else {
          img.addEventListener('load', checkCompletion);
          img.addEventListener('error', checkCompletion);
        }
      });
    }

    // Setup the main parallax animation
    function setupParallaxAnimation(scene) {
      const parallaxElements = scene.querySelectorAll('.parallax-effect');
      const elementConfigs = createElementConfigs(parallaxElements);

      let isAnimating = false;
      let mouseX = scene.offsetWidth / 2;
      let mouseY = scene.offsetHeight / 2;

      // Initialize elements and set initial position
      initializeElements(elementConfigs);
      updateParallaxPositions(elementConfigs, mouseX, mouseY, scene);

      // Setup mouse event handlers with throttling
      const throttledMouseHandler = createThrottledHandler((event) => {
        mouseX = event.pageX;
        mouseY = event.pageY;

        if (!isAnimating) {
          requestAnimationFrame(() => {
            updateParallaxPositions(elementConfigs, mouseX, mouseY, scene);
            isAnimating = false;
          });
          isAnimating = true;
        }
      });

      scene.addEventListener('mousemove', throttledMouseHandler, {
        passive: true,
      });

      // Optimize performance when mouse leaves
      setupPerformanceOptimization(scene, elementConfigs);
    }

    // Create configuration objects for each parallax element
    function createElementConfigs(elements) {
      return Array.from(elements).map((element) => ({
        element,
        depth: parseFloat(element.getAttribute('data-parallax-value')) || 1,
        directionX: parseFloat(element.getAttribute('data-data-parallax-x')) || 1,
        directionY: parseFloat(element.getAttribute('data-data-parallax-y')) || 1,
        movementScale: 25, // Reduced from 30 for smoother movement
      }));
    }

    // Initialize elements with performance optimizations
    function initializeElements(elementConfigs) {
      elementConfigs.forEach(({ element }) => {
        element.style.willChange = 'transform';
        element.style.transform = 'translateZ(0)';
      });
    }

    // Update parallax positions for all elements
    function updateParallaxPositions(elementConfigs, mouseX, mouseY, scene) {
      const centerX = scene.offsetWidth / 2;
      const centerY = scene.offsetHeight / 2;

      // Calculate relative mouse position (-1 to 1)
      const relativeX = (mouseX - centerX) / centerX;
      const relativeY = (mouseY - centerY) / centerY;

      elementConfigs.forEach(({ element, depth, directionX, directionY, movementScale }) => {
        // Only animate if element is not frozen
        if (!element.classList.contains('parallax-frozen')) {
          const moveX = relativeX * depth * directionX * movementScale;
          const moveY = relativeY * depth * directionY * movementScale;

          element.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
        }
      });
    }

    // Create throttled event handler for better performance
    function createThrottledHandler(handler) {
      let timeoutId = null;

      return (event) => {
        if (timeoutId) return;

        timeoutId = setTimeout(() => {
          handler(event);
          timeoutId = null;
        }, 16); // ~60fps
      };
    }

    // Setup performance optimization when mouse leaves
    function setupPerformanceOptimization(scene, elementConfigs) {
      let resetTimeout;

      scene.addEventListener('mouseleave', () => {
        clearTimeout(resetTimeout);
        resetTimeout = setTimeout(() => {
          elementConfigs.forEach(({ element }) => {
            element.style.willChange = 'auto';
          });
        }, 1000);
      });
    }
  },
};

if (typeof window !== 'undefined') {
  parallaxEffect.init();
}
