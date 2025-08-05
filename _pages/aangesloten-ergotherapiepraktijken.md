---
permalink: /aangesloten-ergotherapiepraktijken/
title: "Aangesloten ergotherapiepraktijken"
layout: single
author_profile: false
sidebar:
  nav: "docs"
---

<!-- Leaflet CSS toevoegen -->
<link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />

<div class="praktijken-container">
  <!-- Kaart sectie -->
  <div class="kaart-sectie">
    <h2>Praktijken in Drenthe</h2>
    <div id="drenthe-kaart" class="drenthe-kaart"></div>
  </div>

  <!-- Praktijken lijst -->
  <div class="praktijken-sectie">
    <h2>Onze aangesloten praktijken</h2>
    
    <div class="praktijken-grid">
      {% for praktijk in site.data.praktijken.praktijken %}
      <div class="praktijk-card" data-lat="{{ praktijk.coordinaten.lat }}" data-lng="{{ praktijk.coordinaten.lng }}">
        <div class="praktijk-header">
          <div class="praktijk-logo">
            {% if praktijk.logo %}
              <img src="{{ praktijk.logo }}" alt="{{ praktijk.naam }} logo">
            {% else %}
              <div class="praktijk-placeholder">{{ praktijk.naam | slice: 0 }}</div>
            {% endif %}
          </div>
          <div class="praktijk-title">
            <h3>{{ praktijk.naam }}</h3>
            <p class="regio">{{ praktijk.regio }}</p>
          </div>
        </div>
        
        <div class="praktijk-details">
          <p class="specialisatie">{{ praktijk.specialisatie }}</p>
        </div>
        
        <div class="praktijk-actions">
          {% if praktijk.website %}
            <a href="{{ praktijk.website }}" target="_blank" class="praktijk-link">
              <i class="fas fa-external-link-alt"></i> Website
            </a>
          {% endif %}
        </div>
      </div>
      {% endfor %}
    </div>
  </div>
</div>

<!-- Leaflet JS toevoegen -->
<script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>

<!-- Kaart Initialisatie Script -->
<script>
document.addEventListener("DOMContentLoaded", function () {
  // Initialiseer kaart met middelpunt Drenthe - GEEN scroll zoom
  var kaart = L.map('drenthe-kaart', {
    scrollWheelZoom: false,
    doubleClickZoom: false,
    touchZoom: false,
    dragging: true
  }).setView([52.9, 6.6], 9);

  // Voeg OpenStreetMap tegel toe
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap-bijdragers'
  }).addTo(kaart);

  // Custom marker icoon - terug naar poppetjes
  var customIcon = L.divIcon({
    className: 'custom-marker',
    html: '<div class="marker-pin"><i class="fas fa-user-md"></i></div>',
    iconSize: [30, 40],
    iconAnchor: [15, 40],
    popupAnchor: [0, -40]
  });

  // Voeg markers toe met logo's in popup
  {% for praktijk in site.data.praktijken.praktijken %}
    {% if praktijk.coordinaten %}
      L.marker([{{ praktijk.coordinaten.lat }}, {{ praktijk.coordinaten.lng }}], {icon: customIcon})
        .addTo(kaart)
        .bindPopup(`
          <div class="popup-content">
            <div class="popup-header">
              {% if praktijk.logo %}
                <img src="{{ praktijk.logo }}" alt="{{ praktijk.naam }}" class="popup-logo">
              {% else %}
                <div class="popup-logo-placeholder">{{ praktijk.naam | slice: 0 }}</div>
              {% endif %}
              <div class="popup-info">
                <h4>{{ praktijk.naam }}</h4>
                <p class="popup-regio">{{ praktijk.regio }}</p>
              </div>
            </div>
            <p><strong>Specialisatie:</strong> {{ praktijk.specialisatie }}</p>
            {% if praktijk.website %}
              <a href="{{ praktijk.website }}" target="_blank" class="popup-link">
                <i class="fas fa-external-link-alt"></i> Bezoek website
              </a>
            {% endif %}
          </div>
        `);
    {% endif %}
  {% endfor %}
});
</script>

<style>
/* Container layout */
.praktijken-container {
  display: block;
  max-width: 1200px;
  margin: 1rem auto 0 auto;
}

.kaart-sectie {
  margin-bottom: 3rem;
}

.praktijken-sectie {
  margin-top: 2rem;
}

/* Kaart styling */
.drenthe-kaart {
  height: 500px;
  width: 100%;
  border-radius: 12px;
  border: 2px solid #e1e8ed;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

/* Custom marker styling - terug naar poppetjes */
.custom-marker .marker-pin {
  width: 24px;
  height: 30px;
  background: linear-gradient(135deg, #7CB342, #689F38);
  border-radius: 50% 50% 50% 0;
  position: relative;
  transform: rotate(-45deg);
  border: 2px solid #fff;
  box-shadow: 0 2px 8px rgba(0,0,0,0.3);
  display: flex;
  align-items: center;
  justify-content: center;
}

.custom-marker .marker-pin i {
  color: white;
  font-size: 12px;
  transform: rotate(45deg);
  margin-top: -2px;
}

/* Popup styling met logo */
.popup-content {
  min-width: 220px;
}

.popup-header {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  gap: 10px;
}

.popup-logo {
  width: 40px;
  height: 40px;
  object-fit: contain;
  border-radius: 6px;
  border: 1px solid #e1e8ed;
  background: white;
  padding: 2px;
  flex-shrink: 0;
}

.popup-logo-placeholder {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #7CB342, #689F38);
  color: white;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: bold;
  flex-shrink: 0;
}

.popup-info {
  flex: 1;
}

.popup-content h4 {
  margin: 0 0 4px 0;
  color: #2E5A87;
  font-size: 15px;
  font-weight: 600;
  line-height: 1.2;
}

.popup-regio {
  margin: 0 !important;
  color: #666;
  font-size: 12px;
  font-weight: 500;
}

.popup-content p {
  margin: 6px 0;
  font-size: 12px;
  line-height: 1.3;
}

.popup-link {
  display: inline-flex;
  align-items: center;
  margin-top: 10px;
  padding: 6px 10px;
  background: linear-gradient(135deg, #4A9B9B, #3A8A8A);
  color: white !important;
  text-decoration: none;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.popup-link:hover {
  background: linear-gradient(135deg, #2E5A87, #1E4A77);
  transform: translateY(-1px);
}

.popup-link i {
  margin-right: 4px;
  font-size: 10px;
}

/* Praktijken grid */
.praktijken-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem;
}

/* Scrollbar styling */
.praktijken-grid::-webkit-scrollbar {
  width: 6px;
}

.praktijken-grid::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.praktijken-grid::-webkit-scrollbar-thumb {
  background: #7CB342;
  border-radius: 3px;
}

.praktijken-grid::-webkit-scrollbar-thumb:hover {
  background: #689F38;
}

/* Praktijk kaarten */
.praktijk-card {
  background: white;
  border-radius: 12px;
  border: 1px solid #e1e8ed;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  transition: all 0.3s ease;
  overflow: hidden;
  height: 130px;
  display: flex;
  flex-direction: column;
}

.praktijk-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0,0,0,0.12);
  border-color: #7CB342;
}

/* Praktijk header */
.praktijk-header {
  display: flex;
  align-items: center;
  padding: 0.5rem;
  border-bottom: 1px solid #f0f0f0;
  flex-shrink: 0;
  height: 55px;
}

.praktijk-logo {
  width: 30px;
  height: 30px;
  margin-right: 8px;
  flex-shrink: 0;
}

.praktijk-logo img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 8px;
  border: 1px solid #e1e8ed;
}

.praktijk-placeholder {
  width: 30px;
  height: 30px;
  background: linear-gradient(135deg, #7CB342, #689F38);
  color: white;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: bold;
}

.praktijk-title h3 {
  margin: 0 0 2px 0;
  font-size: 12px;
  font-weight: 600;
  color: #2E5A87;
  line-height: 1.1;
}

.praktijk-title .regio {
  margin: 0;
  font-size: 10px;
  color: #666;
  font-weight: 500;
}

/* Praktijk details */
.praktijk-details {
  padding: 0.3rem 0.5rem;
  flex: 1;
  display: flex;
  align-items: center;
  height: 35px;
}

.praktijk-details p {
  margin: 3px 0;
  font-size: 12px;
  line-height: 1.3;
}

.praktijk-details .specialisatie {
  color: #4A9B9B;
  font-weight: 600;
  font-size: 9px;
  text-transform: uppercase;
  letter-spacing: 0.3px;
}

.praktijk-details .beschrijving {
  color: #666;
}

/* Praktijk acties */
.praktijk-actions {
  padding: 0.3rem 0.5rem 0.5rem 0.5rem;
  flex-shrink: 0;
  height: 40px;
  display: flex;
  align-items: center;
}

.praktijk-link {
  display: inline-flex;
  align-items: center;
  padding: 4px 8px;
  background: linear-gradient(135deg, #4A9B9B, #3A8A8A);
  color: white !important;
  text-decoration: none;
  border-radius: 3px;
  font-size: 9px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.praktijk-link:hover {
  background: linear-gradient(135deg, #2E5A87, #1E4A77);
  transform: translateY(-1px);
}

.praktijk-link i {
  margin-right: 3px;
  font-size: 8px;
}

/* Responsive design */
@media (max-width: 768px) {
  .praktijken-container {
    margin: 1rem;
    max-width: none;
  }
  
  .praktijken-grid {
    grid-template-columns: 1fr;
  }
  
  .drenthe-kaart {
    height: 350px;
  }
  
  .kaart-sectie {
    margin-bottom: 2rem;
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

/* Sectie headers */
.kaart-sectie h2,
.praktijken-sectie h2 {
  color: #2E5A87;
  font-size: 24px;
  margin-bottom: 1rem;
  font-weight: 600;
  text-align: center;
}
</style>