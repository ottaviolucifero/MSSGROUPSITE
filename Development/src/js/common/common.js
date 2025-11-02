/* =========================
 Common animation utility js accross the site 
=========================== */

import { dividerExpand } from '../utils/divider-expand';

const commonAnimation = {
  init() {
    const divider = document.querySelector('.divider');
    const footerDivider = document.querySelector('.footer-divider');
    const progressContainer = document.querySelector('.progress-container');
    const progressLine = document.querySelectorAll('.progress-line');
    const scrollExpand = document.querySelector('.scroll-expand');
    const stepLine = document.querySelectorAll('.step-line');
    const splitTextTeamTitle = document.querySelector('.split-text-team-title');
    const heroPerspective = document.querySelector('.hero-perspective');
    const heroLines = document.querySelectorAll('[data-hero-line]');
    const featureCard1 = document.querySelector('.feature-card-1');
    const featureCard2 = document.querySelector('.feature-card-2');
    const featureCard3 = document.querySelector('.feature-card-3');

    if (divider) {
      dividerExpand(divider);
    }
    if (footerDivider) {
      dividerExpand(footerDivider);
    }
    if (progressLine.length > 0) {
      // Set initial state
      gsap.set(progressLine, { width: '0%' });

      // Create timeline for sequential animation
      const progressTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: progressContainer,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
      });

      // Animate each progress line sequentially
      progressLine.forEach((line, index) => {
        progressTimeline.to(
          line,
          {
            width: '100%',
            duration: 2,
            ease: 'power2.inOut',
          },
          index * 2 // Each animation starts after the previous one completes (2 seconds duration)
        );
      });
    }
    if (scrollExpand) {
      // Check if mobile device
      const isMobile = window.innerWidth < 768;

      if (isMobile) {
        gsap.set(scrollExpand, { minWidth: 'auto' });
      } else {
        gsap.set(scrollExpand, { minWidth: '500px' });

        ScrollTrigger.create({
          trigger: scrollExpand,
          start: 'top 60%',
          end: 'bottom 40%',
          onEnter: () => {
            gsap.to(scrollExpand, {
              minWidth: '950px',
              duration: 0.5,
              ease: 'power2.out',
            });
          },
          onEnterBack: () => {
            gsap.to(scrollExpand, {
              minWidth: '950px',
              duration: 0.5,
              ease: 'power2.out',
            });
          },
          onLeaveBack: () => {
            gsap.to(scrollExpand, {
              minWidth: '500px',
              duration: 0.5,
              ease: 'power2.out',
            });
          },
        });
      }
    }
    if (stepLine.length > 0) {
      gsap.set(stepLine, { height: '0px' });

      stepLine.forEach((line, index) => {
        gsap.to(line, {
          height: '380px',
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: line,
            start: 'top 75%',
            end: 'top 15%',
            toggleActions: 'play none none reverse',
            // Add a small stagger delay for sequential feel
            onEnter: () => {
              gsap.delayedCall(index * 0.15, () => {
                gsap.to(line, {
                  height: '380px',
                  duration: 1.5,
                  ease: 'power3.out',
                });
              });
            },
          },
        });
      });
    }
    if (splitTextTeamTitle) {
      gsap.registerPlugin(SplitText);
      const splitType = splitTextTeamTitle.getAttribute('data-split-type') || 'chars';

      let split = SplitText.create('.split-text-team-title', { type: splitType });

      gsap.from(split[splitType], {
        scrollTrigger: {
          trigger: splitTextTeamTitle,
          start: 'top 80%',
          end: 'top 20%',
          scrub: true,
        },
        opacity: 0.1,
        stagger: 0.2,
        duration: 1,
        ease: 'power3.out',
      });
    }
    if (heroPerspective) {
      // Set initial styles
      gsap.set(heroPerspective, {
        opacity: 0,
        filter: 'blur(20px)',
        transform: 'perspective(1200px) scale(0.896871) rotateX(14.4381deg)',
      });

      // Animate when in view
      ScrollTrigger.create({
        trigger: heroPerspective,
        start: 'top 90%',
        once: true,
        onEnter: () => {
          gsap.to(heroPerspective, {
            opacity: 1,
            filter: 'blur(0px)',
            transform: 'perspective(1200px) scale(1) rotateX(0deg)',
            duration: 0.8,
            delay: 0.7,
            ease: 'power2.out',
          });
        },
      });
    }
    if (heroLines.length > 0) {
      heroLines.forEach((line) => {
        gsap.to(line, {
          height: '100%',
          duration: 0.8,
          delay: 0.7,
          ease: 'power2.out',
        });
      });
    }

    if (featureCard1) {
      gsap.from(featureCard1, {
        x: 100,
        rotation: 0,
        duration: 0.8,
        delay: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: featureCard1,
          start: 'top 90%',
          end: 'bottom 20%',
          scrub: 2,
        },
      });
    }
    if (featureCard2) {
      gsap.from(featureCard2, {
        rotation: 10,
        duration: 0.8,
        delay: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: featureCard1,
          start: 'top 90%',
          end: 'bottom 20%',
          scrub: 2,
        },
      });
    }
    if (featureCard3) {
      gsap.from(featureCard3, {
        x: -100,
        rotation: 0,
        duration: 0.8,
        delay: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: featureCard1,
          start: 'top 90%',
          end: 'bottom 20%',
          scrub: 2,
        },
      });
    }
  },
};

if (typeof window !== 'undefined') {
  commonAnimation.init();
}
