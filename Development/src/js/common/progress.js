const progressAnimation = {
  init() {
    const items = document.querySelectorAll('[data-progress-item]');

    items.forEach((item, index) => {
      const value = parseInt(item.getAttribute('data-progress-value'), 10) || 0;
      const bar = item.querySelector('[data-progress-bar]');
      const text = item.querySelector('[data-progress-text]');
      const duration = item.getAttribute('data-progress-duration') || 1.5;

      if (!bar || !text) return;

      // Animate progress bar
      gsap.set(bar, { width: '0%', opacity: 0.8 });
      gsap.to(bar, {
        width: `${value}%`,
        opacity: 1,
        duration: duration,
        delay: 0.3 + index * 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: item,
          start: 'top 90%',
          end: 'bottom 15%',
          scrub: false,
        },
      });

      // Animate text appearance
      gsap.set(text, { opacity: 0 });
      gsap.to(text, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.3 + index * 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: item,
          start: 'top 90%',
          end: 'bottom 15%',
          scrub: false,
        },
      });

      // Animate counter
      const counter = { val: 0 };
      gsap.to(counter, {
        val: value,
        duration: 2.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: item,
          start: 'top 90%',
          end: 'bottom 15%',
          scrub: false,
        },
        onUpdate: () => {
          text.textContent = `${Math.floor(counter.val)}%`;
        },
      });
    });
  },
};

if (typeof window !== 'undefined') {
  progressAnimation.init();
}
