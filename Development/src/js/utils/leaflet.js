const leaflet = {
  init() {
    // Check if map container exists
    const mapContainer = document.getElementById('map');
    if (!mapContainer) {
      return;
    }

    // Initialize the map
    const leafletMap = L.map('map').setView([39.8283, -98.5795], 6);

    // Add tile layer with better styling
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
    }).addTo(leafletMap);

    // Handle window resize for responsive design
    window.addEventListener('resize', () => {
      leafletMap.invalidateSize();
    });

    // Add zoom control
    leafletMap.zoomControl.setPosition('bottomright');
  },
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  leaflet.init();
});
