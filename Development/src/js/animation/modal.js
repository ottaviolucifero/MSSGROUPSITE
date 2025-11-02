/* =========================
 Modal animation js 
=========================== */

class ModalAnimation {
  constructor() {
    this.modalAction = null;
    this.modalOverlay = null;
    this.modalCloseBtn = null;
    this.modalContent = null;
    this.isModalOpen = false;

    this.animationConfig = {
      open: {
        opacity: 1,
        y: 0,
        duration: 0.3,
        ease: 'power2.out',
      },
      close: {
        opacity: 0,
        y: -50,
        duration: 0.2,
        ease: 'power2.in',
      },
    };
  }

  init() {
    this.cacheElements();
    this.bindEvents();
  }

  cacheElements() {
    this.modalAction = document.querySelector('.modal-action');
    this.modalOverlay = document.querySelector('.modal-overlay');
    this.modalCloseBtn = document.querySelector('.modal-close-btn');
    this.modalContent = document.querySelector('.modal-content');
  }

  bindEvents() {
    this.modalAction?.addEventListener('click', () => this.openModal());
    this.modalCloseBtn?.addEventListener('click', () => this.closeModal());
    this.modalOverlay?.addEventListener('click', (e) => {
      if (e.target === this.modalOverlay) {
        this.closeModal();
      }
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isModalOpen) {
        this.closeModal();
      }
    });
  }

  async closeModal() {
    if (!this.isModalOpen || !this.modalOverlay) return;

    this.isModalOpen = false;
    document.body.style.overflow = 'auto';

    try {
      if (this.modalContent) {
        await gsap.to(this.modalContent, {
          ...this.animationConfig.close,
          onComplete: () => {
            this.modalOverlay.classList.remove('modal-open');
            this.modalOverlay.classList.add('modal-close');
          },
        });
      } else {
        this.modalOverlay.classList.remove('modal-open');
        this.modalOverlay.classList.add('modal-close');
      }
    } catch (error) {
      console.error('Error closing modal:', error);
    }
  }

  openModal() {
    if (this.isModalOpen || !this.modalOverlay) return;

    this.isModalOpen = true;
    document.body.style.overflow = 'hidden';

    this.modalOverlay.classList.remove('modal-close');
    this.modalOverlay.classList.add('modal-open');

    if (this.modalContent) {
      // Set initial state for opening animation
      gsap.set(this.modalContent, {
        opacity: 0,
        y: -50,
      });

      gsap.to(this.modalContent, this.animationConfig.open);
    }
  }
}

const modalAnimation = new ModalAnimation();

if (typeof window !== 'undefined') {
  // Wait for DOM to be ready before initializing
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      modalAnimation.init();
    });
  } else {
    modalAnimation.init();
  }
}
