/* =========================
 Theme Price Switcher utility js  
=========================== */

const themeSwitcher = {
  elements: null,
  animationConfig: {
    duration: 0.6,
    delay: 0.2,
    ease: 'power2.out',
  },
  init() {
    try {
      this.cacheElements();
      this.setInitialTheme();
      this.bindEvents();
    } catch (error) {
      console.error('Theme switcher initialization failed:', error);
    }
  },
  cacheElements() {
    this.elements = {
      darkIcon: document.getElementById('dark-theme-icon'),
      lightIcon: document.getElementById('light-theme-icon'),
      toggleBtn: document.getElementById('theme-toggle'),
      html: document.documentElement,
    };
  },

  setInitialTheme() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: light)').matches;
    const storedTheme = localStorage.getItem('color-theme');
    const isDark = storedTheme === 'dark' || (!storedTheme && prefersDark);
    // this.setTheme(isDark ? 'dark' : 'light');
    this.setTheme('light');
  },

  bindEvents() {
    const { toggleBtn } = this.elements;
    if (!toggleBtn) return;

    toggleBtn.addEventListener('click', () => {
      const currentTheme = this.elements.html.classList.contains('dark') ? 'dark' : 'light';
      this.setTheme(currentTheme === 'dark' ? 'light' : 'dark');
    });
  },

  setTheme(theme) {
    if (!['dark', 'light'].includes(theme)) return;

    const { html } = this.elements;
    html.classList.remove('dark', 'light');
    html.classList.add(theme);

    localStorage.setItem('color-theme', theme);
    this.updateIcons(theme === 'dark');
  },

  updateIcons(isDark) {
    const { darkIcon, lightIcon } = this.elements;
    if (!darkIcon || !lightIcon) return;

    const showIcon = isDark ? darkIcon : lightIcon;
    const hideIcon = isDark ? lightIcon : darkIcon;

    // Hide the current icon
    hideIcon.classList.add('hidden');

    // Show the new icon
    showIcon.classList.remove('hidden');

    // Use GSAP for the animation
    gsap.fromTo(
      showIcon,
      {
        x: 100,
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
        duration: this.animationConfig.duration,
        delay: this.animationConfig.delay,
        ease: this.animationConfig.ease,
      }
    );
  },
};

if (typeof window !== 'undefined') {
  themeSwitcher.init();
}
