/**
 * ========================================
 * TOP NAVIGATION MANAGER
 * Manages visibility of top navigation bars using cookies
 * ========================================
 */

// -------------------- CONFIGURATION --------------------
const TOP_NAV_CONFIG = {
  expireDays: 30,
  prefix: 'top-nav-',
  suffix: '-hidden',
};

const navbar = document.querySelector('.has-top-nav');

// -------------------- COOKIE HELPER --------------------
const Cookie = {
  set(name, value, days = TOP_NAV_CONFIG.expireDays) {
    const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
  },

  get(name) {
    const match = document.cookie.split('; ').find((c) => c.startsWith(`${name}=`));
    return match ? match.split('=')[1] : null;
  },

  remove(name) {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/`;
  },
};

// -------------------- TOP NAVIGATION MANAGER --------------------
const TopNav = {
  // Get a unique ID for each nav bar
  getId(nav) {
    return nav.getAttribute('accesskey') || nav.id || 'default';
  },

  // Build cookie name
  cookieName(id) {
    return `${TOP_NAV_CONFIG.prefix}${id}${TOP_NAV_CONFIG.suffix}`;
  },

  // Check if nav should be hidden based on cookie
  isHidden(id) {
    return Cookie.get(this.cookieName(id)) === 'true';
  },

  // Hide navigation and save state
  hide(nav) {
    const id = this.getId(nav);

    nav.classList.add('hidden');
    navbar.classList.add('is-cookie-false');
    navbar.classList.remove('is-cookie-true');
    navbar.style.transition = 'all 0.5s ease-in-out';
    nav.classList.remove('visible');
    Cookie.set(this.cookieName(id), 'true');
  },

  // Show navigation and clear state
  show(nav) {
    const id = this.getId(nav);
    nav.classList.add('visible');
    nav.classList.remove('hidden');
    navbar.classList.add('is-cookie-true');
    navbar.classList.remove('is-cookie-false');
    navbar.style.transition = 'all 0.5s ease-in-out';
    Cookie.remove(this.cookieName(id));
  },

  // Initialize nav visibility based on saved cookies
  initVisibility() {
    const navs = document.querySelectorAll('.top-nav');
    navs.forEach((nav) => {
      const id = this.getId(nav);
      if (this.isHidden(id)) {
        nav.classList.add('hidden');
        nav.classList.remove('visible');
        navbar.classList.add('is-cookie-false');
        navbar.classList.remove('is-cookie-true');
        navbar.style.transition = 'all 0.5s ease-in-out';
      } else {
        nav.classList.add('visible');
        nav.classList.remove('hidden');
        navbar.classList.add('is-cookie-true');
        navbar.classList.remove('is-cookie-false');
        navbar.style.transition = 'all 0.5s ease-in-out';
      }
    });
  },

  // Setup close button listeners
  initCloseButtons() {
    const buttons = document.querySelectorAll('.close-top-nav');
    buttons.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const nav = btn.closest('.top-nav');
        if (nav) this.hide(nav);
        else console.warn('  No parent .top-nav found for button');
      });
    });
  },

  // Initialize everything
  init() {
    this.initVisibility();
    this.initCloseButtons();
  },
};

// -------------------- RUN ON PAGE LOAD --------------------
document.addEventListener('DOMContentLoaded', () => TopNav.init());
