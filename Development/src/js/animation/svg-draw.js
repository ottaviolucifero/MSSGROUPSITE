const svgDraw = () => {
  gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);

  const selectors = ['#svg-one', '#svg-two', '#svg-three'];
  gsap.set(selectors.join(', '), { visibility: 'visible' });

  if (selectors.length > 0) {
    selectors.forEach((selector) => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: selector,
          start: 'top 80%',
        },
      });

      tl.from(selector, {
        duration: 1,
        drawSVG: 1,
        delay: 0.5,
        ease: 'power2.out',
      });
    });
  }
};

if (typeof window !== 'undefined') {
  svgDraw();
}
