/* =========================
 Accordion animation js 
=========================== */

const accordionAnimation = {
  accordionItems: null,
  activeItem: null,

  init() {
    this.accordion = document.querySelector('.accordion');
    this.accordionItems = document.querySelectorAll('.accordion-item');
    this.activeItem = null;
    this.accordionItems.forEach((item) => {
      const action = item.querySelector('.accordion-action');
      const content = item.querySelector('.accordion-content');

      if (item.classList.contains('active-accordion')) {
        content.classList.remove('hidden');
        content.style.height = 'auto';
        this.activeItem = item;
        this.setOpenState(item);
      } else {
        content.classList.add('hidden');
        this.setClosedState(item);
      }

      action.addEventListener('click', (e) => {
        e.preventDefault();

        if (this.activeItem && this.activeItem !== item) {
          this.closeAccordion(this.activeItem);
        }

        if (this.activeItem === item) {
          this.closeAccordion(item);
          this.activeItem = null;
        } else {
          this.openAccordion(item);
          this.activeItem = item;
        }
      });
    });
    this.initAnimation();
  },

  setOpenState(item) {
    const plusIconSpans = item.querySelectorAll('.accordion-plus-icon span');
    const accordionArrow = item.querySelector('.accordion-arrow svg');
    const accordionArrowSpan = item.querySelector('.accordion-arrow');

    // Set icon states for default open item
    if (plusIconSpans.length > 0) {
      plusIconSpans[1].style.transform = 'rotate(90deg)';
      plusIconSpans[1].setAttribute('data-state', 'true');
    }

    if (accordionArrow) {
      accordionArrow.style.transform = 'rotate(180deg)';
      accordionArrow.setAttribute('data-state', 'true');
    }

    if (accordionArrowSpan) {
      accordionArrowSpan.setAttribute('data-state', 'true');
    }
  },

  setClosedState(item) {
    const plusIconSpans = item.querySelectorAll('.accordion-plus-icon span');
    const accordionArrow = item.querySelector('.accordion-arrow svg');
    const accordionArrowSpan = item.querySelector('.accordion-arrow');

    // Set icon states for closed item
    if (plusIconSpans.length > 0) {
      plusIconSpans[1].setAttribute('data-state', 'false');
    }

    if (accordionArrow) {
      accordionArrow.setAttribute('data-state', 'false');
    }

    if (accordionArrowSpan) {
      accordionArrowSpan.setAttribute('data-state', 'false');
    }
  },

  initAnimation() {
    this.accordionItems.forEach((item, index) => {
      // Set initial state
      gsap.set(item, {
        opacity: 0,
        y: 50,
        filter: 'blur(20px)',
        overflow: 'hidden',
      });

      // Create scroll trigger animation
      gsap.fromTo(
        item,
        {
          opacity: 0,
          y: 50,
          filter: 'blur(20px)',
        },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.5,
          delay: index * 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 90%',
            end: 'top 50%',
            scrub: false,
            once: true,
          },
        }
      );
    });
  },

  openAccordion(item) {
    const content = item.querySelector('.accordion-content');
    const plusIconSpans = item.querySelectorAll('.accordion-plus-icon span');
    const accordionArrow = item.querySelector('.accordion-arrow svg');
    const accordionArrowSpan = item.querySelector('.accordion-arrow');

    content.classList.remove('hidden');
    content.style.height = 'auto';
    const contentHeight = content.scrollHeight;
    content.style.height = '0px';

    gsap.to(content, {
      height: contentHeight,
      opacity: 1,
      duration: 0.3,
    });

    if (plusIconSpans.length > 0) {
      gsap.to(plusIconSpans[1], {
        rotation: 90,
        duration: 0.3,
        ease: 'power2.out',
        onComplete: () => {
          plusIconSpans[1].setAttribute('data-state', 'true');
        },
      });
    }

    if (accordionArrow) {
      accordionArrow.setAttribute('data-state', 'true');
      gsap.to(accordionArrow, {
        rotation: -180,
        duration: 0.3,
        ease: 'power2.out',
      });
    }

    if (accordionArrowSpan) {
      accordionArrowSpan.setAttribute('data-state', 'true');
    }
  },

  closeAccordion(item) {
    const content = item.querySelector('.accordion-content');
    const plusIconSpans = item.querySelectorAll('.accordion-plus-icon span');
    const accordionArrow = item.querySelector('.accordion-arrow svg');
    const accordionArrowSpan = item.querySelector('.accordion-arrow');

    content.style.height = 'auto';
    const contentHeight = content.scrollHeight;

    content.style.height = contentHeight + 'px';

    gsap.to(content, {
      height: 0,
      opacity: 0,
      duration: 0.5,
      onComplete: () => {
        content.classList.add('hidden');
        content.style.height = '0px';
      },
    });

    // Animate minus icon back to plus (if exists)
    if (plusIconSpans.length > 0) {
      gsap.to(plusIconSpans[1], {
        rotation: 0,
        duration: 0.5,
        ease: 'power2.out',
        onComplete: () => {
          plusIconSpans[1].setAttribute('data-state', 'false');
        },
      });
    }

    // Animate accordion arrow back (if exists)
    if (accordionArrow) {
      accordionArrow.setAttribute('data-state', 'false');
      gsap.to(accordionArrow, {
        rotation: 0,
        duration: 0.5,
        ease: 'power2.out',
      });
    }

    if (accordionArrowSpan) {
      accordionArrowSpan.setAttribute('data-state', 'false');
    }
  },
};

if (typeof window !== 'undefined') {
  accordionAnimation.init();
}
