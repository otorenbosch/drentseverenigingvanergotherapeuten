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
  <div class="praktijken-lijst">
    <h2>Onze aangesloten praktijken</h2>
    
    {% for praktijk in site.data.praktijken.praktijken %}
    <div class="praktijk-card" data-lat="{{ praktijk.coordinaten.lat }}" data-lng="{{ praktijk.coordinaten.lng }}">
      <div class="praktijk-logo">
        {% if praktijk.logo %}
          <img src="{{ praktijk.logo }}" alt="{{ praktijk.naam }} logo">
        {% endif %}
      </div>
      <div class="praktijk-info">
        <h3>{{ praktijk.naam }}</h3>
        <p class="regio"><strong>Regio:</strong> {{ praktijk.regio }}</p>
        <p class="specialisatie"><strong>Specialisatie:</strong> {{ praktijk.specialisatie }}</p>
        <p class="beschrijving">{{ praktijk.beschrijving }}</p>
        {% if praktijk.website %}
          <a href="{{ praktijk.website }}" target="_blank" class="praktijk-link">Bezoek website</a>
        {% endif %}
      </div>
    </div>
    {% endfor %}
  </div>
</div>

<!-- Leaflet JS toevoegen -->
<script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>

<!-- Kaart Initialisatie Script -->
<script>
document.addEventListener("DOMContentLoaded", function () {
  // Initialiseer kaart met middelpunt Drenthe
  var kaart = L.map('drenthe-kaart').setView([52.9, 6.6], 9);

  // Voeg OpenStreetMap tegel toe
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap-bijdragers'
  }).addTo(kaart);

  // Voeg markers toe met logo's
  {% for praktijk in site.data.praktijken.praktijken %}
    {% if praktijk.coordinaten %}
      var logoIcon = L.icon({
        iconUrl: '{{ praktijk.logo }}',
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -40]
      });

      L.marker([{{ praktijk.coordinaten.lat }}, {{ praktijk.coordinaten.lng }}], {icon: logoIcon})
        .addTo(kaart)
        .bindPopup("<strong>{{ praktijk.naam }}</strong><br>{{ praktijk.regio }}");
    {% endif %}
  {% endfor %}
});
</script>

<style>
.praktijken-container {
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 1rem;
  margin-top: 1rem;
  align-items: start;
}

.drenthe-kaart {
  height: 700px;
  border-radius: 8px;
  border: 1px solid #ccc;
  overflow: hidden;
}

/* Ultra compacte praktijkkaartjes */
.praktijken-lijst .praktijk-info h3 {
  font-size: 0.75rem;
  margin: 0 0 0.1rem 0;
  line-height: 1.1;
}

.praktijken-lijst .praktijk-info p {
  font-size: 0.65rem;
  margin: 0.05rem 0;
  line-height: 1.1;
}

.praktijken-lijst .praktijk-info {
  flex: 1;
}

.praktijken-lijst .praktijk-link {
  font-size: 0.65rem;
  padding: 0.15rem 0.3rem;
  margin-top: 0.15rem;
  display: inline-block;
  background: #4A9B9B;
  color: white;
  border-radius: 4px;
  text-decoration: none;
}

.praktijken-lijst .praktijk-link:hover {
  background: #2E5A87;
}

/* Logo klein */
.praktijken-lijst .praktijk-logo img {
  width: 24px;
  height: 24px;
  margin-right: 0.3rem;
  object-fit: contain;
  border-radius: 4px;
}

/* Card zelf compacter */
.praktijk-card {
  padding: 0.3rem;
  margin-bottom: 0.3rem;
  border-radius: 3px;
  border: 1px solid #ddd;
  display: flex;
  align-items: center;
}

@media (max-width: 1024px) {
  .praktijken-container {
    grid-template-columns: 1fr;
  }

  .praktijk-card {
    flex-direction: column;
    align-items: flex-start;
  }

  .praktijk-logo {
    margin-bottom: 0.5rem;
  }
}
</style>