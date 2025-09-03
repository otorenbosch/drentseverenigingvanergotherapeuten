---
permalink: /aangesloten-ergotherapiepraktijken/
title: "Aangesloten ergotherapiepraktijken"
layout: single
author_profile: false
---

<!-- Leaflet CSS toevoegen -->
<link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />

*"Professionele ergotherapie door heel Drenthe"*

<div class="map-container">
  <div id="drenthe-kaart" class="drenthe-kaart"></div>
</div>
<div class="praktijken-grid">
  {% for praktijk in site.data.praktijken.praktijken %}
  <div class="praktijk-card" data-lat="{{ praktijk.coordinaten.lat }}" data-lng="{{ praktijk.coordinaten.lng }}">
    <div class="praktijk-header">
      {% if praktijk.logo %}
        <img src="{{ praktijk.logo }}" alt="{{ praktijk.naam }}" class="praktijk-logo">
      {% else %}
        <div class="praktijk-logo-placeholder">{{ praktijk.naam | slice: 0 }}</div>
      {% endif %}
      <div class="praktijk-info">
        <h3>{{ praktijk.naam }}</h3>
        <p class="praktijk-location">{{ praktijk.regio }}</p>
        <span class="praktijk-specialisatie">{{ praktijk.specialisatie }}</span>
      </div>
    </div>
    <div class="praktijk-actions">
      {% if praktijk.website %}
        <a href="{{ praktijk.website }}" target="_blank" class="btn btn-small">
          <i class="fas fa-external-link-alt"></i> Website
        </a>
      {% endif %}
      <button class="btn btn-small btn-secondary show-on-map" data-lat="{{ praktijk.coordinaten.lat }}" data-lng="{{ praktijk.coordinaten.lng }}">
        <i class="fas fa-map-marker-alt"></i> Toon op kaart
      </button>
    </div>
  </div>
  {% endfor %}
</div>

<!-- Leaflet JS toevoegen -->
<script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>

<!-- Kaart Initialisatie Script -->
<script>
document.addEventListener("DOMContentLoaded", function () {
  // Initialiseer kaart met middelpunt Drenthe
  var kaart = L.map('drenthe-kaart', {
    scrollWheelZoom: false,
    doubleClickZoom: true,
    touchZoom: true,
    dragging: true
  }).setView([52.9, 6.6], 9);

  // Voeg OpenStreetMap tegel toe
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap-bijdragers'
  }).addTo(kaart);

  // Custom marker icoon
  var customIcon = L.divIcon({
    className: 'custom-marker',
    html: '<div class="marker-pin"><i class="fas fa-user-md"></i></div>',
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30]
  });

  // Sla markers op voor referentie
  var markers = {};

  // Voeg markers toe
  {% for praktijk in site.data.praktijken.praktijken %}
    {% if praktijk.coordinaten %}
      var marker = L.marker([{{ praktijk.coordinaten.lat }}, {{ praktijk.coordinaten.lng }}], {icon: customIcon})
        .addTo(kaart)
        .bindPopup(`
          <div style="min-width: 200px;">
            <div style="display: flex; align-items: center; margin-bottom: 10px; gap: 10px;">
              {% if praktijk.logo %}
                <img src="{{ praktijk.logo }}" alt="{{ praktijk.naam }}" style="width: 40px; height: 40px; object-fit: contain; border-radius: 6px; border: 1px solid #e2e8f0; background: white;">
              {% else %}
                <div style="width: 40px; height: 40px; background: linear-gradient(135deg, #7CB342, #689f38); color: white; border-radius: 6px; display: flex; align-items: center; justify-content: center; font-weight: bold;">{{ praktijk.naam | slice: 0 }}</div>
              {% endif %}
              <div>
                <h4 style="margin: 0 0 4px 0; color: #2E5A87; font-size: 14px;">{{ praktijk.naam }}</h4>
                <p style="margin: 0; color: #666; font-size: 12px;">{{ praktijk.regio }}</p>
              </div>
            </div>
            <p style="margin: 6px 0; font-size: 12px;"><strong>Specialisatie:</strong> {{ praktijk.specialisatie }}</p>
            {% if praktijk.website %}
              <a href="{{ praktijk.website }}" target="_blank" style="display: inline-flex; align-items: center; margin-top: 8px; padding: 4px 8px; background: linear-gradient(135deg, #4A9B9B, #3A8A8A); color: white; text-decoration: none; border-radius: 4px; font-size: 11px; gap: 4px;">
                <i class="fas fa-external-link-alt"></i> Website
              </a>
            {% endif %}
          </div>
        `);
        
      // Sla marker op met coordinaten als sleutel
      markers['{{ praktijk.coordinaten.lat }}_{{ praktijk.coordinaten.lng }}'] = marker;
    {% endif %}
  {% endfor %}

  // Voeg event listeners toe voor "Toon op kaart" buttons
  document.querySelectorAll('.show-on-map').forEach(function(button) {
    button.addEventListener('click', function() {
      var lat = this.dataset.lat;
      var lng = this.dataset.lng;
      var markerKey = lat + '_' + lng;
      
      if (markers[markerKey]) {
        // Pan naar marker en open popup
        kaart.setView([lat, lng], 12);
        markers[markerKey].openPopup();
        
        // Scroll naar kaart (smooth)
        document.getElementById('drenthe-kaart').scrollIntoView({ 
          behavior: 'smooth',
          block: 'center'
        });
      }
    });
  });
});
</script>

<style>
/* DVE Style Variables */
:root {
    --primary-color: #2E5A87;
    --secondary-color: #4A9B9B;
    --accent-color: #7CB342;
    --text-color: #333333;
    --text-light: #666666;
    --bg-color: #ffffff;
    --bg-alt: #f8fafc;
    --border-color: #e2e8f0;
    --shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    --border-radius: 12px;
}

.map-container {
  background: white;
  border-radius: var(--border-radius);
  overflow: hidden;
  box-shadow: var(--shadow);
  border: 1px solid var(--border-color);
  margin: 2rem auto;
  max-width: 1400px;
  width: 100%;
}

.drenthe-kaart {
  height: 600px;
  width: 100%;
}

/* DVE Praktijken Section - 3 column layout */
.praktijken-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
}

.praktijk-card {
  background: white;
  border-radius: 8px;
  border: 1px solid var(--border-color);
  overflow: hidden;
  transition: var(--transition);
  box-shadow: var(--shadow);
  display: flex;
  flex-direction: column;
  padding: 1rem;
  height: 100%;
}

.praktijk-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-lg);
  border-color: var(--primary-color);
}

.praktijk-header {
  display: flex;
  gap: 0.75rem;
  align-items: center;
  flex: 1;
  min-width: 0;
  margin-bottom: 0.75rem;
}

.praktijk-logo {
  width: 35px;
  height: 35px;
  object-fit: contain;
  border-radius: 4px;
  border: 1px solid var(--border-color);
  background: white;
  flex-shrink: 0;
}

.praktijk-logo-placeholder {
  width: 35px;
  height: 35px;
  background: linear-gradient(135deg, var(--accent-color), #689f38);
  color: white;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  font-weight: bold;
  flex-shrink: 0;
}

.praktijk-info h3 {
  color: var(--primary-color);
  margin-bottom: 0.2rem;
  font-size: 0.9rem;
  line-height: 1.2;
  font-weight: 600;
}

.praktijk-location {
  color: var(--text-light);
  margin-bottom: 0;
  font-size: 0.5rem;
}

.praktijk-specialisatie {
  display: block;
  background: linear-gradient(135deg, var(--secondary-color), #3a8a8a);
  color: white;
  padding: 0.08rem 0.25rem;
  border-radius: 6px;
  font-size: 0.5rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05px;
  margin-top: 0.2rem;
  text-align: center;
  width: 100%;
  box-sizing: border-box;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.praktijk-actions {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  flex-shrink: 0;
  justify-content: flex-start;
  flex-wrap: nowrap;
}

/* Override Jekyll theme button styles completely */
.praktijk-actions .btn,
.praktijk-actions a.btn,
.praktijk-actions button.btn {
  display: inline-flex !important;
  align-items: center !important;
  padding: 0.2rem 0.4rem !important;
  border-radius: 3px !important;
  text-decoration: none !important;
  font-weight: 500 !important;
  font-size: 0.65rem !important;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
  border: none !important;
  cursor: pointer !important;
  gap: 0.2rem !important;
  margin: 0 !important;
  min-height: auto !important;
  line-height: 1.2 !important;
  box-shadow: none !important;
  text-transform: none !important;
  letter-spacing: normal !important;
  white-space: nowrap !important;
}

.praktijk-actions .btn-small,
.praktijk-actions a.btn-small,
.praktijk-actions button.btn-small {
  padding: 0.2rem 0.4rem !important;
  font-size: 0.6rem !important;
}

.praktijk-actions .btn:not(.btn-secondary),
.praktijk-actions a.btn:not(.btn-secondary),
.praktijk-actions button.btn:not(.btn-secondary) {
  background: linear-gradient(135deg, #2E5A87, #1e4a77) !important;
  color: white !important;
}

.praktijk-actions .btn:not(.btn-secondary):hover,
.praktijk-actions a.btn:not(.btn-secondary):hover,
.praktijk-actions button.btn:not(.btn-secondary):hover {
  background: linear-gradient(135deg, #1e4a77, #2E5A87) !important;
  color: white !important;
  text-decoration: none !important;
  transform: translateY(-2px) !important;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1) !important;
}

.praktijk-actions .btn-secondary,
.praktijk-actions a.btn-secondary,
.praktijk-actions button.btn-secondary {
  background: linear-gradient(135deg, #4A9B9B, #3a8a8a) !important;
  color: white !important;
}

.praktijk-actions .btn-secondary:hover,
.praktijk-actions a.btn-secondary:hover,
.praktijk-actions button.btn-secondary:hover {
  background: linear-gradient(135deg, #3a8a8a, #4A9B9B) !important;
  color: white !important;
  text-decoration: none !important;
  transform: translateY(-2px) !important;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1) !important;
}

/* Custom Map Markers */
.custom-marker .marker-pin {
  width: 30px;
  height: 30px;
  background: linear-gradient(135deg, var(--accent-color), #689f38);
  border-radius: 50% 50% 50% 0;
  transform: rotate(-45deg);
  border: 3px solid white;
  box-shadow: var(--shadow);
  display: flex;
  align-items: center;
  justify-content: center;
}

.custom-marker .marker-pin i {
  color: white;
  font-size: 14px;
  transform: rotate(45deg);
}

/* Responsive Design */
@media (max-width: 768px) {
  .praktijken-grid {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }
  
  .drenthe-kaart {
    height: 350px;
  }
  
  .praktijk-card {
    padding: 0.75rem;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .praktijken-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1025px) {
  .praktijken-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

</style>