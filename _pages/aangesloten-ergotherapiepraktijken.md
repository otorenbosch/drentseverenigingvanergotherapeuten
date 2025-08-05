---
permalink: /aangesloten-ergotherapiepraktijken/
title: "Aangesloten ergotherapiepraktijken"
layout: single
author_profile: false
sidebar:
  nav: "docs"
---

<div class="praktijken-container">
  <!-- Kaart sectie -->
  <div class="kaart-sectie">
    <h2>Praktijken in Drenthe</h2>
    <div id="drenthe-kaart" class="drenthe-kaart">
      <!-- Interactieve kaart komt hier -->
      <div class="kaart-placeholder">
        <p>Interactieve kaart wordt geladen...</p>
      </div>
    </div>
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

<style>
.praktijken-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-top: 2rem;
}

.drenthe-kaart {
  height: 500px;
  background: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.praktijk-card {
  display: flex;
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: box-shadow 0.3s ease;
}

.praktijk-card:hover {
  box-shadow: 0 4px 8px rgba(0,0,0,0.15);
}

.praktijk-logo {
  flex-shrink: 0;
  margin-right: 1rem;
}

.praktijk-logo img {
  width: 80px;
  height: 80px;
  object-fit: contain;
  border-radius: 4px;
}

.praktijk-info h3 {
  color: #2E5A87;
  margin-bottom: 0.5rem;
}

.praktijk-link {
  display: inline-block;
  background: #4A9B9B;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  text-decoration: none;
  margin-top: 0.5rem;
}

.praktijk-link:hover {
  background: #2E5A87;
  color: white;
}

@media (max-width: 768px) {
  .praktijken-container {
    grid-template-columns: 1fr;
  }
  
  .praktijk-card {
    flex-direction: column;
    text-align: center;
  }
  
  .praktijk-logo {
    margin-right: 0;
    margin-bottom: 1rem;
  }
}
</style>