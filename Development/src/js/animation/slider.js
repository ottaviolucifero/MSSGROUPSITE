/* =========================
 Custom Slider js 
=========================== */

const testimonials = [
  {
    name: 'Jessica Lee',
    position: 'Head of customer Success',
    image: 'images/avatar/avatar-9.png',
    quote:
      "The investment insights are clear, easy to understand and follow. I love the automation and feel like I'm making real progress every day.",
  },
  {
    name: 'Mark Thompson',
    position: 'Marketing Director',
    image: 'images/avatar/avatar-10.png',
    quote:
      "This platform helps our team move faster, stay aligned, and reduce errors. It's a powerful tool that boosts productivity all around.",
  },
  {
    name: 'Amina Yusuf',
    position: 'Product Manager',
    image: 'images/avatar/avatar-11.png',
    quote:
      'Our planning is finally clear and consistent. I feel more confident in how my team executes tasks and reaches project goals on time.',
  },
  {
    name: 'Leo Chen',
    position: 'Founder, ScaleX',
    image: 'images/avatar/avatar-13.png',
    quote:
      'The design is clean and the interface is effortless to use. It saves time, improves clarity, and just makes everything run smoother.',
  },
  {
    name: 'John Doe',
    position: 'CEO',
    image: 'images/avatar/avatar-14.png',
    quote:
      "A great platform for managing projects with clarity and speed. It's intuitive, efficient, and keeps everyone on the same page easily.",
  },
];

const sliderAnimation = {
  init() {
    let currentIndex = 0;

    const avatarImgs = document.querySelectorAll('.testimonial-avatar');
    const quoteEl = document.querySelector('#testimonial-quote h3');
    const nameEl = document.querySelector('#testimonial-info h4');
    const positionEl = document.querySelector('#testimonial-info p');

    // Guard clause to avoid running if elements are missing
    if (avatarImgs.length < 5 || !quoteEl || !nameEl || !positionEl) {
      // console.warn('Testimonial slider: Missing DOM elements');
      return;
    }

    function updateAvatarImages() {
      for (let i = 0; i < 5; i++) {
        const avatarIndex = (currentIndex + i - 2 + testimonials.length) % testimonials.length;
        const testimonial = testimonials[avatarIndex];
        const imgEl = avatarImgs[i];

        if (!imgEl) continue; // safety

        // Update image src and alt
        imgEl.src = testimonial.image;
        imgEl.alt = `${testimonial.name}'s avatar`;

        // Animate image with GSAP
        gsap.fromTo(
          imgEl,
          {
            opacity: 1,
            scale: 1.1,
          },
          {
            opacity: 1,
            scale: 1,
            duration: 0.4,
            delay: i * 0.05,
            ease: 'power2.out',
          }
        );
      }
    }

    function updateTextContent() {
      const t = testimonials[currentIndex];

      if (quoteEl) {
        gsap.to(quoteEl, {
          opacity: 0,
          y: -10,
          duration: 0.2,
          onComplete: () => {
            quoteEl.textContent = `"${t.quote}"`;
            gsap.to(quoteEl, {
              opacity: 1,
              y: 0,
              duration: 0.3,
              ease: 'power2.out',
            });
          },
        });
      }

      if (nameEl) {
        gsap.to(nameEl, {
          opacity: 0,
          y: 5,
          duration: 0.2,
          onComplete: () => {
            nameEl.textContent = t.name;
            gsap.to(nameEl, {
              opacity: 1,
              y: 0,
              duration: 0.3,
              ease: 'power2.out',
            });
          },
        });
      }

      if (positionEl) {
        gsap.to(positionEl, {
          opacity: 0,
          y: 5,
          duration: 0.2,
          onComplete: () => {
            positionEl.textContent = t.position;
            gsap.to(positionEl, {
              opacity: 1,
              y: 0,
              duration: 0.3,
              ease: 'power2.out',
            });
          },
        });
      }
    }

    function updateTestimonial() {
      updateAvatarImages();
      updateTextContent();
    }

    updateTestimonial();

    setInterval(() => {
      currentIndex = (currentIndex + 1) % testimonials.length;
      updateTestimonial();
    }, 3000);
  },
};

if (typeof window !== 'undefined') {
  sliderAnimation.init();
}
