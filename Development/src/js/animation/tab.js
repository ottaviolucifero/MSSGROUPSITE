/* =========================
Tab animation js 
=========================== */

const tabAnimation = {
  // Configuration
  config: {
    animation: {
      duration: 0.3,
      delay: 0.05,
      ease: 'power2.out',
      y: 20,
    },
    mobile: {
      activeBg: '#864ffe',
      activeColor: 'white',
      activeBorder: '#5a19be',
      scale: 1.05,
    },
  },

  // State
  state: {
    currentIndex: 0,
    isInitialized: false,
  },

  // Cached elements
  elements: {
    tabBarBtns: null,
    tabContent: null,
    activeTabBar: null,
    mobileTabBtns: null,
  },

  init() {
    try {
      // Check if already initialized
      if (this.state.isInitialized) {
        return;
      }

      this.cacheElements();

      // Check if elements exist before proceeding
      if (!this.hasRequiredElements()) {
        return;
      }

      this.validateElements();
      this.setupEventListeners();
      this.initializeFirstTab();
      this.setupResizeHandler();
      this.state.isInitialized = true;
    } catch (error) {
      console.error('Tab animation initialization failed:', error);
    }
  },

  cacheElements() {
    this.elements = {
      tabBarBtns: document.querySelectorAll('.tab-bar button'),
      tabContent: document.querySelectorAll('.tab-content'),
      activeTabBar: document.querySelector('.active-tab-bar'),
      mobileTabBtns: document.querySelectorAll('.tab-mobile button'),
    };
  },

  hasRequiredElements() {
    const { tabBarBtns, mobileTabBtns, tabContent } = this.elements;

    // Check if we have at least one type of tab buttons and tab content
    const hasButtons = tabBarBtns.length > 0 || mobileTabBtns.length > 0;
    const hasContent = tabContent.length > 0;

    return hasButtons && hasContent;
  },

  validateElements() {
    const { tabBarBtns, mobileTabBtns } = this.elements;

    if (!tabBarBtns.length && !mobileTabBtns.length) {
      throw new Error('Tab elements not found');
    }
  },

  setupEventListeners() {
    this.setupDesktopTabs();
    this.setupMobileTabs();
  },

  setupDesktopTabs() {
    const { tabBarBtns } = this.elements;

    if (!tabBarBtns.length) return;

    this.setupAccessibility(tabBarBtns);

    tabBarBtns.forEach((btn, index) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.switchToTab(index);
      });

      btn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.switchToTab(index);
        }
      });
    });
  },

  setupMobileTabs() {
    const { mobileTabBtns } = this.elements;

    if (!mobileTabBtns.length) return;

    this.setupAccessibility(mobileTabBtns, 'mobile-tab');

    mobileTabBtns.forEach((btn, index) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.switchToMobileTab(index);
      });

      btn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.switchToMobileTab(index);
        }
      });
    });
  },

  setupAccessibility(buttons, idPrefix = 'tab') {
    buttons.forEach((btn, index) => {
      btn.setAttribute('role', 'tab');
      btn.setAttribute('aria-controls', `${idPrefix}-${index}`);
      btn.setAttribute('id', `${idPrefix}-${index}`);
    });
  },

  initializeFirstTab() {
    const { tabBarBtns, mobileTabBtns } = this.elements;

    // Initialize desktop tabs
    if (tabBarBtns.length > 0) {
      this.updateButtonStates(tabBarBtns, 0);
      this.updateActiveTabBar(tabBarBtns[0]);
      this.switchTabContent(0, -1);
    }

    // Initialize mobile tabs
    if (mobileTabBtns.length > 0) {
      this.updateMobileButtonStates(mobileTabBtns, 0);
      this.switchTabContent(0, -1);
    }
  },

  setupResizeHandler() {
    const { activeTabBar, tabBarBtns } = this.elements;

    if (!activeTabBar || !tabBarBtns.length) return;

    const handleResize = () => {
      if (tabBarBtns[this.state.currentIndex]) {
        this.updateActiveTabBar(tabBarBtns[this.state.currentIndex]);
      }
    };

    window.addEventListener('resize', handleResize);
  },

  updateButtonStates(buttons, activeIndex) {
    buttons.forEach((btn, index) => {
      const isActive = index === activeIndex;
      btn.setAttribute('data-state', isActive ? 'selected' : '');
      btn.setAttribute('aria-selected', isActive);
      btn.setAttribute('tabindex', isActive ? '0' : '-1');
    });
  },

  updateMobileButtonStates(buttons, activeIndex) {
    const { mobile } = this.config;

    buttons.forEach((btn, index) => {
      const isActive = index === activeIndex;

      if (isActive) {
        btn.classList.add('mobile-tab-active');
        Object.assign(btn.style, {
          backgroundColor: mobile.activeBg,
          color: mobile.activeColor,
          borderColor: mobile.activeBorder,
          transform: `scale(${mobile.scale})`,
        });
      } else {
        btn.classList.remove('mobile-tab-active');
        Object.assign(btn.style, {
          backgroundColor: '',
          color: '',
          borderColor: '',
          transform: '',
        });
      }

      btn.setAttribute('aria-selected', isActive);
      btn.setAttribute('tabindex', isActive ? '0' : '-1');
    });
  },

  updateActiveTabBar(activeButton) {
    const { activeTabBar } = this.elements;

    if (!activeTabBar || !activeButton) return;

    const left = activeButton.offsetLeft - activeTabBar.offsetLeft;
    const width = activeButton.offsetWidth;

    activeTabBar.style.setProperty('--_left', `${left}px`);
    activeTabBar.style.setProperty('--_width', `${width}px`);
  },

  switchTabContent(targetIndex, previousIndex) {
    const { tabContent } = this.elements;
    const { animation } = this.config;

    tabContent.forEach((content, index) => {
      if (targetIndex === index) {
        const displayType = content.getAttribute('data-display') || 'flex';
        content.style.display = displayType;
        content.setAttribute('aria-hidden', 'false');

        // Use GSAP for animation
        if (previousIndex !== targetIndex && typeof gsap !== 'undefined') {
          gsap.fromTo(
            content,
            {
              opacity: 0,
              y: animation.y,
            },
            {
              opacity: 1,
              y: 0,
              duration: animation.duration,
              delay: animation.delay,
              ease: animation.ease,
            }
          );
        }
      } else {
        content.style.display = 'none';
        content.setAttribute('aria-hidden', 'true');
      }
    });
  },

  switchToTab(targetIndex) {
    const { tabBarBtns } = this.elements;

    if (targetIndex < 0 || targetIndex >= tabBarBtns.length) return;

    const previousIndex = this.state.currentIndex;
    this.state.currentIndex = targetIndex;

    this.updateButtonStates(tabBarBtns, targetIndex);
    this.updateActiveTabBar(tabBarBtns[targetIndex]);
    this.switchTabContent(targetIndex, previousIndex);
  },

  switchToMobileTab(targetIndex) {
    const { mobileTabBtns } = this.elements;

    if (targetIndex < 0 || targetIndex >= mobileTabBtns.length) return;

    const previousIndex = this.state.currentIndex;
    this.state.currentIndex = targetIndex;

    this.updateMobileButtonStates(mobileTabBtns, targetIndex);
    this.switchTabContent(targetIndex, previousIndex);
  },
};

// Helper function to check if DOM is ready
function isDOMReady() {
  return document.readyState === 'loading' ? false : true;
}

// Helper function to wait for DOM
function waitForDOM() {
  return new Promise((resolve) => {
    if (isDOMReady()) {
      resolve();
    } else {
      document.addEventListener('DOMContentLoaded', resolve);
    }
  });
}

// Initialize function with proper DOM checking
async function initializeTabAnimation() {
  try {
    // Wait for DOM to be ready
    await waitForDOM();

    // Initialize only if the UI elements exist on this page
    const hasDesktopButtons = !!document.querySelector('.tab-bar button');
    const hasMobileButtons = !!document.querySelector('.tab-mobile button');
    const hasContent = !!document.querySelector('.tab-content');

    if (
      (hasDesktopButtons || hasMobileButtons) &&
      hasContent &&
      !tabAnimation.state.isInitialized
    ) {
      tabAnimation.init();
    }
  } catch (error) {
    console.error('Failed to initialize tab animation:', error);
  }
}

// Auto-initialize when the module is loaded
if (typeof window !== 'undefined') {
  initializeTabAnimation();
}

// Export for manual initialization if needed
export { initializeTabAnimation, tabAnimation };
