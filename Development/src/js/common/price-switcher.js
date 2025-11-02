/* =========================
 Price Switcher utility js 
=========================== */
const priceSwitcher = {
  // Store DOM elements
  elements: null,

  // Initialize the price switcher
  init() {
    try {
      this.getElements();
      this.addEventListeners();
      this.updatePrices();
    } catch (error) {
      console.error('Price switcher initialization failed:', error);
    }
  },

  // Get all the DOM elements we need
  getElements() {
    this.elements = {
      toggle: document.getElementById('priceCheck'),
      monthlyPrices: document.getElementsByClassName('price-month'),
      yearlyPrices: document.getElementsByClassName('price-year'),
    };
  },

  // Update which prices are shown based on toggle state
  updatePrices() {
    const { toggle, monthlyPrices, yearlyPrices } = this.elements;

    // Exit if toggle doesn't exist
    if (!toggle) return;

    // Loop through all price elements
    for (let i = 0; i < monthlyPrices.length; i++) {
      const monthly = monthlyPrices[i];
      const yearly = yearlyPrices[i];

      if (toggle.checked) {
        // Show yearly prices, hide monthly
        monthly.style.display = 'none';
        yearly.style.display = 'block';
      } else {
        // Show monthly prices, hide yearly
        monthly.style.display = 'block';
        yearly.style.display = 'none';
      }
    }
  },

  // Add click event to the toggle
  addEventListeners() {
    const { toggle } = this.elements;

    // Exit if toggle doesn't exist
    if (!toggle) return;

    toggle.addEventListener('click', () => {
      this.updatePrices();
    });
  },
};

// Export function to initialize the price switcher
if (typeof window !== 'undefined') {
  priceSwitcher.init();
}
