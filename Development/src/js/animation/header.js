/* =========================
 Header animation js 
=========================== */

const headerAnimation = {
  headerOne() {
    const header = document.querySelector('.header-one');

    if (header) {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
          header.style.transition = 'all 0.5s ease-in-out';
          header.classList.add('scroll-header');
        } else {
          header.classList.remove('scroll-header');
        }
      });
    }
  },
  headerTwo() {
    const header = document.querySelector('.header-two');
    const headerBtn = document.querySelector('.header-btn');
    if (header) {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 150) {
          header.style.transition = 'all 0.5s ease-in-out';
          header.style.top = '20px';
          header.classList.add('header-two-scroll');
          headerBtn.classList.remove('btn-secondary');
          headerBtn.classList.add('btn-white');
        } else {
          header.classList.remove('header-two-scroll');
          headerBtn.classList.remove('btn-white');
          headerBtn.classList.add('btn-secondary');
          header.style.top = '50px';
        }
      });
    }
  },
  headerThree() {
    const header = document.querySelector('.header-three');

    if (header) {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
          header.style.transition = 'all 0.5s ease-in-out';
          header.classList.add('header-three-scroll');
        } else {
          header.classList.remove('header-three-scroll');
        }
      });
    }
  },
  headerFour() {
    const header = document.querySelector('.header-four');
    if (header) {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
          header.style.transition = 'all 0.5s ease-in-out';
          header.classList.add('header-four-scroll');
        } else {
          header.classList.remove('header-four-scroll');
        }
      });
    }
  },
  headerFive() {
    const header = document.querySelector('.header-five');
    if (header) {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 25) {
          header.style.transition = 'all 0.5s ease-in-out';
          header.classList.add('header-five-scroll');
        } else {
          header.classList.remove('header-five-scroll');
        }
      });
    }
  },
  headerSix() {
    const header = document.querySelector('.header-six');
    if (header) {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
          header.style.transition = 'all 0.5s ease-in-out';
          header.classList.add('header-six-scroll');
        } else {
          header.classList.remove('header-six-scroll');
        }
      });
    }
  },
};

if (typeof window !== 'undefined') {
  headerAnimation.headerOne();
  headerAnimation.headerTwo();
  headerAnimation.headerThree();
  headerAnimation.headerFour();
  headerAnimation.headerFive();
  headerAnimation.headerSix();
}
