/* =========================
 Tab Item Filter js 
=========================== */

let tabFilterInitialized = false;

const tabFilter = {
  init() {
    if (tabFilterInitialized) return;
    const tabBarBtns = document.querySelectorAll('.tab-bar button');
    const activeTabBar = document.querySelector('.active-tab-bar');
    const mobileTabBtns = document.querySelectorAll(
      '.flex.items-center.flex-wrap.md\\:hidden button'
    );
    const blogArticles = document.querySelectorAll('article');

    // Check if elements exist
    if (!tabBarBtns.length && !mobileTabBtns.length) {
      return;
    }

    if (!blogArticles.length) {
      return;
    }

    // State management
    let currentIndex = 0;
    let currentFilter = 'all';

    // Utility functions
    const getArticleCategory = (article) => {
      const badge = article.querySelector('.badge');
      if (!badge) return '';
      return badge.textContent.trim().toLowerCase();
    };

    const getFilterCategories = (buttons) => {
      return Array.from(buttons).map((btn) => {
        const text = btn.textContent.trim().toLowerCase();
        return text === 'ai software' ? 'ai software' : text;
      });
    };

    const updateButtonStates = (buttons, activeIndex) => {
      buttons.forEach((btn, index) => {
        const isActive = index === activeIndex;
        btn.setAttribute('data-state', isActive ? 'selected' : '');
        btn.setAttribute('aria-selected', isActive);
        btn.setAttribute('tabindex', isActive ? '0' : '-1');

        if (isActive) {
          btn.classList.add('filter-active');
        } else {
          btn.classList.remove('filter-active');
        }
      });
    };

    const updateMobileButtonStates = (buttons, activeIndex) => {
      buttons.forEach((btn, index) => {
        const isActive = index === activeIndex;

        if (isActive) {
          btn.classList.add('mobile-filter-active');
          btn.style.backgroundColor = '#864ffe';
          btn.style.color = 'white';
          btn.style.borderColor = '#5a19be';
          btn.style.transform = 'scale(1.05)';
        } else {
          btn.classList.remove('mobile-filter-active');
          btn.style.backgroundColor = '';
          btn.style.color = '';
          btn.style.borderColor = '';
          btn.style.transform = '';
        }

        btn.setAttribute('aria-selected', isActive);
        btn.setAttribute('tabindex', isActive ? '0' : '-1');
      });
    };

    const updateActiveTabBar = (activeButton) => {
      if (!activeTabBar || !activeButton) return;

      const left = activeButton.offsetLeft - activeTabBar.offsetLeft;
      const width = activeButton.offsetWidth;

      activeTabBar.style.setProperty('--_left', `${left}px`);
      activeTabBar.style.setProperty('--_width', `${width}px`);
    };

    const filterArticles = (articles, filterCategory) => {
      const filtered = [];
      const hidden = [];

      articles.forEach((article) => {
        const articleCategory = getArticleCategory(article);
        const shouldShow =
          filterCategory === 'all' ||
          articleCategory === filterCategory ||
          (filterCategory === 'ai software' && articleCategory === 'ai software');

        if (shouldShow) {
          filtered.push(article);
        } else {
          hidden.push(article);
        }
      });

      return { filtered, hidden };
    };

    const animateFilter = async (filtered, hidden) => {
      const allArticles = [...filtered, ...hidden];
      const allContainers = allArticles
        .map((article) => article.closest('.col-span-12'))
        .filter(Boolean);

      const canAnimate = typeof gsap !== 'undefined' && gsap && typeof gsap.to === 'function';

      if (!canAnimate) {
        // Fallback: toggle visibility without animations
        hidden.forEach((article) => {
          const container = article.closest('.col-span-12');
          if (container) {
            container.style.display = 'none';
            container.setAttribute('aria-hidden', 'true');
          }
        });

        filtered.forEach((article) => {
          const container = article.closest('.col-span-12');
          if (container) {
            container.style.display = 'block';
            container.setAttribute('aria-hidden', 'false');
            container.style.opacity = '1';
            container.style.transform = 'none';
            container.style.filter = 'none';
          }
        });
        return;
      }

      // First fade out all articles using GSAP
      const fadeOutTweens = allContainers.map((container) =>
        gsap.to(container, {
          opacity: 0,
          scale: 0.95,
          filter: 'blur(4px)',
          duration: 0.3,
          ease: 'power2.inOut',
        })
      );

      // Wait for fade out to complete
      await Promise.all(fadeOutTweens.map((tween) => tween.then()));

      // Hide articles that don't match filter
      hidden.forEach((article) => {
        const container = article.closest('.col-span-12');
        if (container) {
          container.style.display = 'none';
          container.setAttribute('aria-hidden', 'true');
        }
      });

      // Show filtered articles
      filtered.forEach((article) => {
        const container = article.closest('.col-span-12');
        if (container) {
          container.style.display = 'block';
          container.setAttribute('aria-hidden', 'false');
          // Reset transform and opacity for animation
          container.style.opacity = '0';
          container.style.transform = 'scale(0.95)';
          container.style.filter = 'blur(4px)';
        }
      });

      // Animate filtered articles with staggered fade-in using GSAP
      const filteredContainers = filtered
        .map((article) => article.closest('.col-span-12'))
        .filter(Boolean);

      const fadeInTweens = filteredContainers.map((container, index) =>
        gsap.to(container, {
          opacity: 1,
          scale: 1,
          filter: 'blur(0px)',
          duration: 0.5,
          delay: index * 0.1,
          ease: 'power2.out',
        })
      );

      // Wait for fade in to complete
      await Promise.all(fadeInTweens.map((tween) => tween.then()));
    };

    const applyFilter = async (articles, filterCategory) => {
      const { filtered, hidden } = filterArticles(articles, filterCategory);
      await animateFilter(filtered, hidden);

      // Dispatch custom event for analytics or other integrations
      const filterEvent = new CustomEvent('blogFiltered', {
        detail: {
          category: filterCategory,
          filteredCount: filtered.length,
          totalCount: articles.length,
        },
      });
      document.dispatchEvent(filterEvent);
    };

    const switchToFilter = async (targetIndex, buttons, articles) => {
      if (targetIndex < 0 || targetIndex >= buttons.length) return;

      const previousIndex = currentIndex;
      const categories = getFilterCategories(buttons);
      const targetCategory = categories[targetIndex];

      currentIndex = targetIndex;
      currentFilter = targetCategory;

      // Update button states
      if (buttons[0].closest('.tab-bar')) {
        updateButtonStates(buttons, targetIndex);
        updateActiveTabBar(buttons[targetIndex]);
      } else {
        updateMobileButtonStates(buttons, targetIndex);
      }

      // Apply filter with animation
      await applyFilter(articles, targetCategory);
    };

    // Setup accessibility
    const setupAccessibility = (buttons, idPrefix = 'filter') => {
      buttons.forEach((btn, index) => {
        btn.setAttribute('role', 'tab');
        btn.setAttribute('aria-controls', `${idPrefix}-${index}`);
        btn.setAttribute('id', `${idPrefix}-${index}`);
      });
    };

    // Initialize desktop filter
    if (tabBarBtns.length > 0) {
      setupAccessibility(tabBarBtns, 'filter');

      tabBarBtns.forEach((btn, index) => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          switchToFilter(index, tabBarBtns, blogArticles);
        });

        btn.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            switchToFilter(index, tabBarBtns, blogArticles);
          }
        });
      });

      // Initialize first filter
      updateButtonStates(tabBarBtns, 0);
      updateActiveTabBar(tabBarBtns[0]);
      applyFilter(blogArticles, getFilterCategories(tabBarBtns)[0]);
    }

    // Initialize mobile filter
    if (mobileTabBtns.length > 0) {
      setupAccessibility(mobileTabBtns, 'mobile-filter');

      mobileTabBtns.forEach((btn, index) => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          switchToFilter(index, mobileTabBtns, blogArticles);
        });

        btn.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            switchToFilter(index, mobileTabBtns, blogArticles);
          }
        });
      });

      // Initialize first mobile filter
      updateMobileButtonStates(mobileTabBtns, 0);
      applyFilter(blogArticles, getFilterCategories(mobileTabBtns)[0]);
    }

    // Handle resize for active tab bar
    if (activeTabBar && tabBarBtns.length > 0) {
      const handleResize = () => {
        if (tabBarBtns[currentIndex]) {
          updateActiveTabBar(tabBarBtns[currentIndex]);
        }
      };

      window.addEventListener('resize', handleResize);
    }

    // Add CSS for smooth transitions
    const filterCSS = `
      .filter-active {
        transition: all 0.3s ease;
      }
      
      .grid {
        position: relative;
      }
      
      .grid > div {
        will-change: opacity, transform, filter;
      }
      
      .grid > div[aria-hidden="true"] {
        opacity: 0;
        transform: scale(0.95);
        filter: blur(4px);
        pointer-events: none;
      }
      
      .grid > div[aria-hidden="false"] {
        opacity: 1;
        transform: scale(1);
        filter: blur(0px);
        pointer-events: auto;
      }
      
      /* Smooth transitions for tab bar */
      .tab-bar button {
        transition: color 0.3s ease, background-color 0.3s ease;
      }
      
      /* Mobile filter button styles */
      .flex.items-center.flex-wrap.md\\:hidden button {
        transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        position: relative;
        overflow: hidden;
      }
      
      .flex.items-center.flex-wrap.md\\:hidden button:hover {
        transform: translateY(-1px);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
      }
      
      /* Ensure proper stacking context for animations */
      .grid > div article {
        transform-origin: center;
        backface-visibility: hidden;
        -webkit-backface-visibility: hidden;
      }
      
      /* Reduce motion for users who prefer it */
      @media (prefers-reduced-motion: reduce) {
        .grid > div,
        .flex.items-center.flex-wrap.md\\:hidden button {
          transition: none;
          transform: none !important;
        }
      }
    `;

    // Inject CSS
    if (!document.querySelector('#tab-filter-styles')) {
      const style = document.createElement('style');
      style.id = 'tab-filter-styles';
      style.textContent = filterCSS;
      document.head.appendChild(style);
    }

    tabFilterInitialized = true;
  },
};

export function initTabFilter() {
  if (typeof window !== 'undefined') {
    const checkAndInit = () => {
      const hasDesktopButtons = !!document.querySelector('.tab-bar button');
      const hasMobileButtons = !!document.querySelector(
        '.flex.items-center.flex-wrap.md\\:hidden button'
      );
      if ((hasDesktopButtons || hasMobileButtons) && !tabFilterInitialized) {
        tabFilter.init();
      }
    };

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', checkAndInit);
    } else {
      checkAndInit();
    }
  }
}

// Auto-initialize when the module is loaded
if (typeof window !== 'undefined') {
  const checkAndInit = () => {
    const hasDesktopButtons = !!document.querySelector('.tab-bar button');
    const hasMobileButtons = !!document.querySelector(
      '.flex.items-center.flex-wrap.md\\:hidden button'
    );
    if ((hasDesktopButtons || hasMobileButtons) && !tabFilterInitialized) {
      tabFilter.init();
    }
  };

  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', checkAndInit);
  } else {
    checkAndInit();
  }
}

export { tabFilter };
