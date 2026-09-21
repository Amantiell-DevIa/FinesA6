/**
 * AUTOMÓVILES FINES - Lógica de Aplicación
 * Branding Corporativo: Rojo, Blanco, Negro y variantes técnicas
 * Rigor visual, sin emojis infantiles, con microdatos y máxima confianza
 */

const AppState = {
  vehicles: typeof VEHICLES_DATA !== 'undefined' ? [...VEHICLES_DATA] : [],
  filteredVehicles: [],
  filters: {
    bodyType: 'all',
    brand: 'all',
    dgt: 'all',
    maxInstallment: 'all',
    fuel: 'all',
    searchQuery: '',
    onlyFavorites: false
  },
  sortBy: 'featured',
  cardGalleryIndices: {},
  comparedVehicleIds: [],
  favorites: [],
  currentVdpVehicle: null,
  currentVdpImageIndex: 0,
  financing: {
    downPayment: 3000,
    months: 72,
    tin: 6.95
  }
};

const WHATSAPP_PHONE = ""; // Dejado en blanco para personalización

function getWhatsAppLink(text) {
  if (WHATSAPP_PHONE && WHATSAPP_PHONE.trim() !== "") {
    return `https://wa.me/${WHATSAPP_PHONE.trim()}?text=${encodeURIComponent(text)}`;
  }
  return `https://wa.me/?text=${encodeURIComponent(text)}`;
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
  loadFavoritesFromStorage();
  initCardGalleriesState();
  initFilters();
  initSort();
  initHeroSearch();
  initLiveSearch();
  initValuationWizard();
  initModals();
  initComparisonDock();
  initMobileDrawer();
  updateFacetCounts();
  applyFiltersAndRender();
});

/* ==========================================================================
   FAVORITOS (LOCALSTORAGE)
   ========================================================================== */

function loadFavoritesFromStorage() {
  try {
    const saved = localStorage.getItem('af_favorites');
    if (saved) AppState.favorites = JSON.parse(saved);
  } catch (e) {
    AppState.favorites = [];
  }
  updateFavoritesHeaderBadge();
}

function saveFavoritesToStorage() {
  try {
    localStorage.setItem('af_favorites', JSON.stringify(AppState.favorites));
  } catch (e) {}
  updateFavoritesHeaderBadge();
}

function updateFavoritesHeaderBadge() {
  const badge = document.getElementById('favs-count-header');
  if (badge) badge.textContent = AppState.favorites.length;
}

window.toggleFavorite = function(vehicleId, event) {
  if (event) {
    event.stopPropagation();
    event.preventDefault();
  }

  const idx = AppState.favorites.indexOf(vehicleId);
  if (idx > -1) {
    AppState.favorites.splice(idx, 1);
  } else {
    AppState.favorites.push(vehicleId);
  }
  saveFavoritesToStorage();

  const btn = document.getElementById(`fav-btn-${vehicleId}`);
  if (btn) {
    btn.classList.toggle('active', AppState.favorites.includes(vehicleId));
  }

  if (AppState.filters.onlyFavorites) {
    applyFiltersAndRender();
  }
};

/* ==========================================================================
   FILTROS Y CONTEOS DINÁMICOS
   ========================================================================== */

function initCardGalleriesState() {
  AppState.vehicles.forEach(vehicle => {
    AppState.cardGalleryIndices[vehicle.id] = 0;
  });
}

function updateFacetCounts() {
  const allCount = AppState.vehicles.length;
  const suvCount = AppState.vehicles.filter(v => v.bodyType === 'SUV').length;
  const compactoCount = AppState.vehicles.filter(v => v.bodyType === 'Compacto').length;
  const berlinaCount = AppState.vehicles.filter(v => v.bodyType === 'Berlina').length;

  const elAll = document.getElementById('count-body-all');
  const elSuv = document.getElementById('count-body-suv');
  const elComp = document.getElementById('count-body-compacto');
  const elBer = document.getElementById('count-body-berlina');

  if (elAll) elAll.textContent = allCount;
  if (elSuv) elSuv.textContent = suvCount;
  if (elComp) elComp.textContent = compactoCount;
  if (elBer) elBer.textContent = berlinaCount;
}

function initFilters() {
  const bodyTabs = document.querySelectorAll('#body-type-tabs .body-tab-btn');
  bodyTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      bodyTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      AppState.filters.bodyType = tab.dataset.body;
      updateHeroButtonCount();
      applyFiltersAndRender();
    });
  });

  const brandSelect = document.getElementById('filter-brand');
  const dgtSelect = document.getElementById('filter-dgt');
  const installmentSelect = document.getElementById('filter-max-installment');
  const fuelSelect = document.getElementById('filter-fuel');

  if (brandSelect) {
    brandSelect.addEventListener('change', (e) => {
      AppState.filters.brand = e.target.value;
      updateHeroButtonCount();
    });
  }

  if (dgtSelect) {
    dgtSelect.addEventListener('change', (e) => {
      AppState.filters.dgt = e.target.value;
      updateHeroButtonCount();
    });
  }

  if (installmentSelect) {
    installmentSelect.addEventListener('change', (e) => {
      AppState.filters.maxInstallment = e.target.value;
      updateHeroButtonCount();
    });
  }

  if (fuelSelect) {
    fuelSelect.addEventListener('change', (e) => {
      AppState.filters.fuel = e.target.value;
      updateHeroButtonCount();
    });
  }

  const btnFavs = document.getElementById('btn-toggle-favs-view');
  if (btnFavs) {
    btnFavs.addEventListener('click', () => {
      AppState.filters.onlyFavorites = !AppState.filters.onlyFavorites;
      btnFavs.classList.toggle('active', AppState.filters.onlyFavorites);
      applyFiltersAndRender();

      const catalogSection = document.getElementById('catalogo');
      if (catalogSection) catalogSection.scrollIntoView({ behavior: 'smooth' });
    });
  }
}

function initLiveSearch() {
  const input = document.getElementById('catalog-live-search');
  if (input) {
    input.addEventListener('input', (e) => {
      AppState.filters.searchQuery = e.target.value.trim().toLowerCase();
      applyFiltersAndRender();
    });
  }
}

function initSort() {
  const sortSelect = document.getElementById('sort-vehicles');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      AppState.sortBy = e.target.value;
      applyFiltersAndRender();
    });
  }
}

function initHeroSearch() {
  const btnRunSearch = document.getElementById('btn-run-search');
  if (btnRunSearch) {
    btnRunSearch.addEventListener('click', () => {
      applyFiltersAndRender();
      const catalogSection = document.getElementById('catalogo');
      if (catalogSection) catalogSection.scrollIntoView({ behavior: 'smooth' });
    });
  }
}

function updateHeroButtonCount() {
  const matchingCount = getFilteredList().length;
  const btnText = document.getElementById('btn-search-text');
  if (btnText) {
    btnText.textContent = `Ver ${matchingCount} Vehículo${matchingCount === 1 ? '' : 's'}`;
  }
}

function getFilteredList() {
  return AppState.vehicles.filter(vehicle => {
    if (AppState.filters.onlyFavorites && !AppState.favorites.includes(vehicle.id)) {
      return false;
    }
    if (AppState.filters.searchQuery) {
      const q = AppState.filters.searchQuery;
      const haystack = `${vehicle.brand} ${vehicle.model} ${vehicle.version} ${vehicle.fuel}`.toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    if (AppState.filters.bodyType !== 'all' && vehicle.bodyType !== AppState.filters.bodyType) {
      return false;
    }
    if (AppState.filters.brand !== 'all' && vehicle.brand.toLowerCase() !== AppState.filters.brand.toLowerCase()) {
      return false;
    }
    if (AppState.filters.dgt !== 'all' && vehicle.dgtBadge !== AppState.filters.dgt) {
      return false;
    }
    if (AppState.filters.maxInstallment !== 'all') {
      const max = parseInt(AppState.filters.maxInstallment, 10);
      if (vehicle.monthlyInstallment > max) return false;
    }
    if (AppState.filters.fuel !== 'all') {
      if (AppState.filters.fuel === 'Híbrido') {
        if (!vehicle.fuel.includes('Híbrido') && !vehicle.fuel.includes('MHEV')) return false;
      } else if (!vehicle.fuel.toLowerCase().includes(AppState.filters.fuel.toLowerCase())) {
        return false;
      }
    }
    return true;
  });
}

function renderActiveFilterChips() {
  const container = document.getElementById('active-filter-chips-bar');
  if (!container) return;

  const chips = [];

  if (AppState.filters.onlyFavorites) {
    chips.push({ label: 'Solo Favoritos', removeFn: "removeFilter('onlyFavorites')" });
  }
  if (AppState.filters.searchQuery) {
    chips.push({ label: `Texto: "${AppState.filters.searchQuery}"`, removeFn: "removeFilter('searchQuery')" });
  }
  if (AppState.filters.bodyType !== 'all') {
    chips.push({ label: `Tipo: ${AppState.filters.bodyType}`, removeFn: "removeFilter('bodyType')" });
  }
  if (AppState.filters.brand !== 'all') {
    chips.push({ label: `Marca: ${AppState.filters.brand}`, removeFn: "removeFilter('brand')" });
  }
  if (AppState.filters.dgt !== 'all') {
    chips.push({ label: `Distintivo DGT ${AppState.filters.dgt}`, removeFn: "removeFilter('dgt')" });
  }
  if (AppState.filters.maxInstallment !== 'all') {
    chips.push({ label: `Cuota hasta ${AppState.filters.maxInstallment}€/mes`, removeFn: "removeFilter('maxInstallment')" });
  }
  if (AppState.filters.fuel !== 'all') {
    chips.push({ label: `Motor: ${AppState.filters.fuel}`, removeFn: "removeFilter('fuel')" });
  }

  if (chips.length === 0) {
    container.innerHTML = '';
    return;
  }

  container.innerHTML = `
    <span style="font-size: 0.75rem; font-weight: 800; text-transform: uppercase; color: var(--text-muted);">Filtros activos:</span>
    ${chips.map(c => `
      <span class="filter-chip">
        ${c.label}
        <span class="filter-chip-remove" onclick="${c.removeFn}">✕</span>
      </span>
    `).join('')}
    <button class="btn-clear-all-filters" onclick="resetAllFilters()">Limpiar todo</button>
  `;
}

window.removeFilter = function(filterKey) {
  if (filterKey === 'onlyFavorites') AppState.filters.onlyFavorites = false;
  else if (filterKey === 'searchQuery') {
    AppState.filters.searchQuery = '';
    const input = document.getElementById('catalog-live-search');
    if (input) input.value = '';
  }
  else if (filterKey === 'bodyType') {
    AppState.filters.bodyType = 'all';
    const tabs = document.querySelectorAll('#body-type-tabs .body-tab-btn');
    tabs.forEach(t => {
      if (t.dataset.body === 'all') t.classList.add('active');
      else t.classList.remove('active');
    });
  }
  else if (filterKey === 'brand') {
    AppState.filters.brand = 'all';
    const el = document.getElementById('filter-brand');
    if (el) el.value = 'all';
  }
  else if (filterKey === 'dgt') {
    AppState.filters.dgt = 'all';
    const el = document.getElementById('filter-dgt');
    if (el) el.value = 'all';
  }
  else if (filterKey === 'maxInstallment') {
    AppState.filters.maxInstallment = 'all';
    const el = document.getElementById('filter-max-installment');
    if (el) el.value = 'all';
  }
  else if (filterKey === 'fuel') {
    AppState.filters.fuel = 'all';
    const el = document.getElementById('filter-fuel');
    if (el) el.value = 'all';
  }

  applyFiltersAndRender();
};

function applyFiltersAndRender() {
  let list = getFilteredList();

  switch (AppState.sortBy) {
    case 'deal-rating':
      list.sort((a, b) => (b.marketSavings || 0) - (a.marketSavings || 0));
      break;
    case 'price-asc':
      list.sort((a, b) => a.financedPrice - b.financedPrice);
      break;
    case 'price-desc':
      list.sort((a, b) => b.financedPrice - a.financedPrice);
      break;
    case 'installment-asc':
      list.sort((a, b) => a.monthlyInstallment - b.monthlyInstallment);
      break;
    case 'km-asc':
      list.sort((a, b) => a.mileage - b.mileage);
      break;
    case 'year-desc':
      list.sort((a, b) => b.year - a.year);
      break;
    default:
      list.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
  }

  AppState.filteredVehicles = list;
  renderVehiclesGrid(list);
  renderActiveFilterChips();

  const countDisplay = document.getElementById('catalog-stock-count');
  if (countDisplay) {
    countDisplay.textContent = `Mostrando ${list.length} vehículo${list.length === 1 ? '' : 's'} certificados`;
  }

  updateHeroButtonCount();
}

/**
 * Renderiza el catálogo de coches (VLP)
 */
function renderVehiclesGrid(vehicles) {
  const grid = document.getElementById('vehicles-grid');
  if (!grid) return;

  if (vehicles.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px; background: #FFFFFF; border-radius: var(--radius-xs); border: 1px solid var(--border-medium);">
        <h3 style="font-family: var(--font-heading); font-size: 1.4rem; font-weight: 900; text-transform: uppercase; margin-bottom: 8px;">No se encontraron vehículos disponibles</h3>
        <p style="color: var(--text-muted); max-width: 500px; margin: 0 auto 20px; font-size: 0.9rem;">
          Modifica los criterios de búsqueda o contacta directamente con nuestro departamento comercial.
        </p>
        <button onclick="resetAllFilters()" style="background: var(--color-red); color: #FFFFFF; font-weight: 800; text-transform: uppercase; padding: 10px 24px; border-radius: var(--radius-xs);">
          Restablecer Criterios
        </button>
      </div>
    `;
    return;
  }

  grid.innerHTML = vehicles.map(v => {
    const currentIndex = AppState.cardGalleryIndices[v.id] || 0;
    const currentImg = v.images[currentIndex] || v.images[0];
    
    let dgtClass = 'c';
    if (v.dgtBadge === '0') dgtClass = 'cero';
    else if (v.dgtBadge === 'ECO') dgtClass = 'eco';
    else if (v.dgtBadge === 'B') dgtClass = 'b';

    const dotsHtml = v.images.map((_, idx) => `
      <span class="card-dot ${idx === currentIndex ? 'active' : ''}"></span>
    `).join('');

    const waText = `Hola, me interesa el ${v.brand} ${v.model} (${v.year}, ${v.financedPrice.toLocaleString('es-ES')}€, Ref:${v.id}) disponible en el catálogo.`;
    const waLink = getWhatsAppLink(waText);

    const isFav = AppState.favorites.includes(v.id);
    const isCompared = AppState.comparedVehicleIds.includes(v.id);

    return `
      <article class="vehicle-card" id="card-${v.id}">
        <!-- Galería de la Tarjeta -->
        <div class="card-media-wrapper">
          <img src="${currentImg}" alt="${v.brand} ${v.model} ${v.version}" class="card-image" id="img-${v.id}" loading="lazy">
          
          <!-- Botón Favorito -->
          <button class="btn-card-favorite ${isFav ? 'active' : ''}" id="fav-btn-${v.id}" onclick="toggleFavorite('${v.id}', event)" title="Guardar en favoritos">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="${isFav ? '#DC2626' : 'none'}" stroke="currentColor" stroke-width="2">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </button>

          <!-- Badges sobre la foto: DGT + Deal Rating (CarGurus) -->
          <div class="card-badges-overlay">
            <span class="dgt-badge-pill ${dgtClass}">
              DGT ${v.dgtBadge}
            </span>
            ${v.marketSavings ? `
              <span class="badge-deal-rating ${v.dealRating === 'Precio Justo' ? 'justo' : ''}">
                AHORRO: -${v.marketSavings}€ VS MERCADO
              </span>
            ` : ''}
            ${v.isImmediateDelivery ? `
              <span class="badge-deal-rating" style="border-left-color: #FFFFFF; background: rgba(9, 9, 11, 0.85);">
                ENTREGA INMEDIATA
              </span>
            ` : ''}
          </div>

          <!-- Flechas de cambio de foto -->
          ${v.images.length > 1 ? `
            <button class="card-gallery-nav card-gallery-prev" onclick="changeCardImage('${v.id}', -1, event)" aria-label="Foto anterior">‹</button>
            <button class="card-gallery-nav card-gallery-next" onclick="changeCardImage('${v.id}', 1, event)" aria-label="Siguiente foto">›</button>
            <div class="card-gallery-dots" id="dots-${v.id}">
              ${dotsHtml}
            </div>
          ` : ''}
        </div>

        <!-- Contenido de la Tarjeta -->
        <div class="card-content">
          <div class="card-header-titles">
            <div style="display: flex; justify-content: space-between; align-items: flex-start;">
              <h3 class="card-brand-model">${v.brand} ${v.model}</h3>
              ${v.daysInStock ? `
                <span class="badge-days-stock">${v.daysInStock}d en stock</span>
              ` : ''}
            </div>
            <div class="card-version" title="${v.version}">${v.version}</div>
          </div>

          <!-- Especificaciones Clave -->
          <div class="card-specs-row">
            <div class="spec-pill">
              <span class="spec-pill-label">Año</span>
              <span class="spec-pill-value">${v.year}</span>
            </div>
            <div class="spec-pill">
              <span class="spec-pill-label">Kilómetros</span>
              <span class="spec-pill-value">${v.mileage.toLocaleString('es-ES')} km</span>
            </div>
            <div class="spec-pill">
              <span class="spec-pill-label">Potencia</span>
              <span class="spec-pill-value">${v.powerCv} CV</span>
            </div>
            <div class="spec-pill">
              <span class="spec-pill-label">Combustible</span>
              <span class="spec-pill-value" style="font-size: 0.775rem;">${v.fuel}</span>
            </div>
            <div class="spec-pill">
              <span class="spec-pill-label">Cambio</span>
              <span class="spec-pill-value" style="font-size: 0.775rem;">${v.transmission.split(' ')[0]}</span>
            </div>
            <div class="spec-pill">
              <span class="spec-pill-label">Disponibilidad</span>
              <span class="spec-pill-value" style="color: var(--color-red);">Inmediata</span>
            </div>
          </div>

          <!-- Precios -->
          <div class="card-pricing-block">
            <div class="price-financed-group">
              <span class="price-financed-label">Financiado desde</span>
              <div class="price-installment">
                ${v.monthlyInstallment} €<span>/mes</span>
              </div>
              <span style="font-size: 0.75rem; color: var(--text-muted);">Total: ${v.financedPrice.toLocaleString('es-ES')} €</span>
            </div>
            <div class="price-cash-group">
              <span class="price-cash-label">Al Contado</span>
              <div class="price-cash-value">${v.cashPrice.toLocaleString('es-ES')} €</div>
            </div>
          </div>

          <!-- Acciones -->
          <div class="card-actions-row">
            <button class="btn-card-details" onclick="openVdpModal('${v.id}')">
              Ver Ficha Técnica
            </button>
            <button class="btn-card-compare ${isCompared ? 'active' : ''}" onclick="toggleCompare('${v.id}')" title="Comparar vehículo">
              Comparar
            </button>
            <a href="${waLink}" target="_blank" rel="noopener" class="btn-card-whatsapp" title="Consultar por WhatsApp">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
              </svg>
            </a>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

window.changeCardImage = function(vehicleId, direction, event) {
  if (event) {
    event.stopPropagation();
    event.preventDefault();
  }
  const vehicle = AppState.vehicles.find(v => v.id === vehicleId);
  if (!vehicle) return;

  let currentIndex = AppState.cardGalleryIndices[vehicleId] || 0;
  currentIndex += direction;

  if (currentIndex < 0) currentIndex = vehicle.images.length - 1;
  else if (currentIndex >= vehicle.images.length) currentIndex = 0;

  AppState.cardGalleryIndices[vehicleId] = currentIndex;

  const imgEl = document.getElementById(`img-${vehicleId}`);
  if (imgEl) imgEl.src = vehicle.images[currentIndex];

  const dotsEl = document.getElementById(`dots-${vehicleId}`);
  if (dotsEl) {
    dotsEl.innerHTML = vehicle.images.map((_, idx) => `
      <span class="card-dot ${idx === currentIndex ? 'active' : ''}"></span>
    `).join('');
  }
};

window.resetAllFilters = function() {
  AppState.filters = {
    bodyType: 'all',
    brand: 'all',
    dgt: 'all',
    maxInstallment: 'all',
    fuel: 'all',
    searchQuery: '',
    onlyFavorites: false
  };

  const bodyTabs = document.querySelectorAll('#body-type-tabs .body-tab-btn');
  bodyTabs.forEach(t => t.classList.remove('active'));
  if (bodyTabs[0]) bodyTabs[0].classList.add('active');

  const brandSelect = document.getElementById('filter-brand');
  if (brandSelect) brandSelect.value = 'all';

  const dgtSelect = document.getElementById('filter-dgt');
  if (dgtSelect) dgtSelect.value = 'all';

  const installmentSelect = document.getElementById('filter-max-installment');
  if (installmentSelect) installmentSelect.value = 'all';

  const fuelSelect = document.getElementById('filter-fuel');
  if (fuelSelect) fuelSelect.value = 'all';

  const liveSearch = document.getElementById('catalog-live-search');
  if (liveSearch) liveSearch.value = '';

  const btnFavs = document.getElementById('btn-toggle-favs-view');
  if (btnFavs) btnFavs.classList.remove('active');

  applyFiltersAndRender();
};

window.appFilterByBody = function(bodyType) {
  AppState.filters.bodyType = bodyType;
  const bodyTabs = document.querySelectorAll('#body-type-tabs .body-tab-btn');
  bodyTabs.forEach(t => {
    if (t.dataset.body === bodyType) t.classList.add('active');
    else t.classList.remove('active');
  });
  applyFiltersAndRender();
};

window.appFilterByDgt = function(dgt) {
  AppState.filters.dgt = dgt;
  const dgtSelect = document.getElementById('filter-dgt');
  if (dgtSelect) dgtSelect.value = dgt;
  applyFiltersAndRender();
};

/* ==========================================================================
   COMPARADOR SIDE-BY-SIDE
   ========================================================================== */

function initComparisonDock() {
  const btnOpen = document.getElementById('btn-open-compare-modal');
  const btnClose = document.getElementById('btn-close-compare');
  const modal = document.getElementById('compare-modal-backdrop');

  if (btnOpen) btnOpen.addEventListener('click', openComparisonModal);

  if (btnClose) {
    btnClose.addEventListener('click', () => {
      if (modal) modal.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }
}

window.toggleCompare = function(vehicleId) {
  const idx = AppState.comparedVehicleIds.indexOf(vehicleId);
  if (idx > -1) {
    AppState.comparedVehicleIds.splice(idx, 1);
  } else {
    if (AppState.comparedVehicleIds.length >= 3) {
      alert('Puedes comparar un máximo de 3 vehículos a la vez.');
      return;
    }
    AppState.comparedVehicleIds.push(vehicleId);
  }

  updateComparisonDock();
  applyFiltersAndRender();
};

window.clearComparison = function() {
  AppState.comparedVehicleIds = [];
  updateComparisonDock();
  applyFiltersAndRender();
};

function updateComparisonDock() {
  const dock = document.getElementById('comparison-floating-dock');
  const countSpan = document.getElementById('compare-count-btn');
  if (!dock) return;

  const count = AppState.comparedVehicleIds.length;
  if (countSpan) countSpan.textContent = count;

  if (count > 0) {
    dock.classList.add('active');
  } else {
    dock.classList.remove('active');
  }

  for (let i = 0; i < 3; i++) {
    const slot = document.getElementById(`comp-slot-${i}`);
    if (!slot) continue;

    if (i < count) {
      const v = AppState.vehicles.find(veh => veh.id === AppState.comparedVehicleIds[i]);
      if (v) {
        slot.classList.add('filled');
        slot.innerHTML = `<img src="${v.images[0]}" alt="${v.brand} ${v.model}" title="${v.brand} ${v.model}">`;
      }
    } else {
      slot.classList.remove('filled');
      slot.innerHTML = `${i + 1}`;
    }
  }
}

function openComparisonModal() {
  if (AppState.comparedVehicleIds.length === 0) {
    alert('Selecciona al menos un vehículo en la tarjeta para comparar.');
    return;
  }

  const comparedList = AppState.vehicles.filter(v => AppState.comparedVehicleIds.includes(v.id));
  const container = document.getElementById('comparison-table-content');
  if (!container) return;

  container.innerHTML = `
    <table class="comparison-table">
      <thead>
        <tr>
          <th>Especificación</th>
          ${comparedList.map(v => `
            <td style="text-align: center; vertical-align: top;">
              <img src="${v.images[0]}" alt="${v.brand} ${v.model}" style="width: 100%; height: 140px; object-fit: cover; border-radius: var(--radius-xs); margin-bottom: 10px;">
              <div style="font-family: var(--font-heading); font-size: 1.15rem; font-weight: 900; text-transform: uppercase;">${v.brand} ${v.model}</div>
              <div style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 10px;">${v.version}</div>
              <button onclick="openVdpModal('${v.id}'); document.getElementById('compare-modal-backdrop').classList.remove('active');" 
                      style="background: var(--color-red); color: #fff; font-size: 0.8rem; font-weight: 800; text-transform: uppercase; padding: 8px 16px; border-radius: var(--radius-xs);">
                Ver Ficha
              </button>
            </td>
          `).join('')}
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>Precio Financiado</th>
          ${comparedList.map(v => `
            <td style="font-size: 1.15rem; color: var(--color-red); font-weight: 900;">
              ${v.financedPrice.toLocaleString('es-ES')} €
              <div style="font-size: 0.85rem; color: var(--text-muted); font-weight: 700;">(${v.monthlyInstallment} €/mes)</div>
            </td>
          `).join('')}
        </tr>
        <tr>
          <th>Precio al Contado</th>
          ${comparedList.map(v => `<td>${v.cashPrice.toLocaleString('es-ES')} €</td>`).join('')}
        </tr>
        <tr>
          <th>Ahorro vs Mercado</th>
          ${comparedList.map(v => `<td style="color: var(--color-red); font-weight: 800;">-${v.marketSavings} € (${v.dealRating})</td>`).join('')}
        </tr>
        <tr>
          <th>Distintivo DGT</th>
          ${comparedList.map(v => `<td><span class="dgt-badge-pill ${v.dgtBadge === '0' ? 'cero' : (v.dgtBadge === 'ECO' ? 'eco' : 'c')}">DGT ${v.dgtBadge}</span></td>`).join('')}
        </tr>
        <tr>
          <th>Año de Matriculación</th>
          ${comparedList.map(v => `<td>${v.year}</td>`).join('')}
        </tr>
        <tr>
          <th>Kilometraje Certificado</th>
          ${comparedList.map(v => `<td>${v.mileage.toLocaleString('es-ES')} km</td>`).join('')}
        </tr>
        <tr>
          <th>Motorización</th>
          ${comparedList.map(v => `<td>${v.powerCv} CV (${v.fuel})</td>`).join('')}
        </tr>
        <tr>
          <th>Transmisión</th>
          ${comparedList.map(v => `<td>${v.transmission}</td>`).join('')}
        </tr>
        <tr>
          <th>Consumo Homologado</th>
          ${comparedList.map(v => `<td>${v.technicalSpecs.combinedConsumption}</td>`).join('')}
        </tr>
        <tr>
          <th>Capacidad Maletero</th>
          ${comparedList.map(v => `<td>${v.technicalSpecs.trunkCapacity}</td>`).join('')}
        </tr>
        <tr>
          <th>Disponibilidad</th>
          ${comparedList.map(v => `<td style="color: var(--color-red); font-weight: 800;">Entrega Inmediata</td>`).join('')}
        </tr>
      </tbody>
    </table>
  `;

  const modal = document.getElementById('compare-modal-backdrop');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

/* ==========================================================================
   MODAL VDP CON HOTSPOTS Y CERTIFICADO DGT
   ========================================================================== */

window.openVdpModal = function(vehicleId) {
  const vehicle = AppState.vehicles.find(v => v.id === vehicleId);
  if (!vehicle) return;

  AppState.currentVdpVehicle = vehicle;
  AppState.currentVdpImageIndex = 0;
  AppState.financing.downPayment = vehicle.downPaymentDefault || 3000;
  AppState.financing.months = vehicle.monthsDefault || 72;

  renderVdpContent(vehicle);

  const backdrop = document.getElementById('vdp-modal-backdrop');
  if (backdrop) {
    backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
};

window.closeVdpModal = function() {
  const backdrop = document.getElementById('vdp-modal-backdrop');
  if (backdrop) {
    backdrop.classList.remove('active');
    document.body.style.overflow = '';
  }
};

function renderVdpContent(vehicle) {
  const container = document.getElementById('vdp-modal-content');
  if (!container) return;

  let dgtClass = 'c';
  if (vehicle.dgtBadge === '0') dgtClass = 'cero';
  else if (vehicle.dgtBadge === 'ECO') dgtClass = 'eco';
  else if (vehicle.dgtBadge === 'B') dgtClass = 'b';

  const thumbnailsHtml = vehicle.images.map((img, idx) => `
    <div class="vdp-thumb-item ${idx === 0 ? 'active' : ''}" onclick="selectVdpThumbnail(${idx})" id="vdp-thumb-${idx}">
      <img src="${img}" alt="Vista ${idx + 1}">
    </div>
  `).join('');

  const hotspotsHtml = vehicle.hotspots ? vehicle.hotspots.map((hs, i) => `
    <div class="hotspot-pin" style="left: ${hs.x}%; top: ${hs.y}%;" title="${hs.title}">
      ${i + 1}
      <div class="hotspot-tooltip">
        <strong>${hs.title}:</strong> ${hs.desc}
      </div>
    </div>
  `).join('') : '';

  const equipmentHtml = vehicle.equipment.map(item => `
    <div class="equipment-item">
      <span class="equipment-icon">✓</span>
      <span>${item}</span>
    </div>
  `).join('');

  const inspectionHtml = typeof INSPECTION_CATEGORIES !== 'undefined' ? INSPECTION_CATEGORIES.map(cat => `
    <div class="inspection-card">
      <div class="inspection-header">
        <span>${cat.category}</span>
        <span style="color: var(--color-red); font-size: 0.8rem; font-weight: 800;">100% VERIFICADO</span>
      </div>
      <div class="inspection-list">
        ${cat.items.map(item => `
          <div class="inspection-item">
            <span class="inspection-item-check">✓</span>
            <span>${item}</span>
          </div>
        `).join('')}
      </div>
    </div>
  `).join('') : '';

  const wearHtml = vehicle.wearPoints && vehicle.wearPoints.length > 0 ? vehicle.wearPoints.map(wp => `
    <div class="wear-item-card">
      <div class="wear-item-area">${wp.area}</div>
      <div class="wear-item-desc">${wp.description}</div>
    </div>
  `).join('') : '<p style="font-size: 0.9rem; color: #78350F;">Vehículo en estado impecable de reestreno.</p>';

  container.innerHTML = `
    <!-- Cabecera del VDP -->
    <div class="vdp-header-summary">
      <div class="vdp-title-box">
        <h1>${vehicle.brand} ${vehicle.model}</h1>
        <div class="vdp-version-text">${vehicle.version}</div>
        <div class="vdp-badges-row">
          <span class="dgt-badge-pill ${dgtClass}">DGT ${vehicle.dgtBadge}</span>
          <span class="badge-deal-rating">AHORRO: -${vehicle.marketSavings}€ VS MERCADO</span>
          <span class="badge-deal-rating" style="background: var(--bg-dark); border-left-color: #FFFFFF;">ENTREGA INMEDIATA</span>
          <span style="background: #F4F4F6; color: var(--text-muted); font-size: 0.75rem; font-weight: 800; padding: 4px 10px; border-radius: var(--radius-xs);">
            REF: ${vehicle.id}
          </span>
        </div>
      </div>

      <div class="vdp-pricing-box">
        <div style="font-size: 0.75rem; font-weight: 800; color: var(--color-red); text-transform: uppercase; letter-spacing: 0.05em;">Precio Financiado:</div>
        <div class="vdp-price-financed">${vehicle.financedPrice.toLocaleString('es-ES')} €</div>
        <div class="vdp-price-cash">Al contado: <strong>${vehicle.cashPrice.toLocaleString('es-ES')} €</strong></div>
      </div>
    </div>

    <!-- Galería Principal VDP con Hotspots -->
    <div class="vdp-gallery-grid">
      <div class="vdp-main-image-wrapper">
        <img src="${vehicle.images[0]}" alt="${vehicle.brand} ${vehicle.model}" class="vdp-main-image" id="vdp-main-image">
        ${hotspotsHtml}
      </div>
      <div class="vdp-thumbnails-strip">
        ${thumbnailsHtml}
      </div>
    </div>

    <!-- Pestañas Interactivas -->
    <div class="vdp-tabs-nav">
      <button class="vdp-tab-btn active" onclick="switchVdpTab('equipment', this)">Equipamiento Destacado</button>
      <button class="vdp-tab-btn" onclick="switchVdpTab('dgt-cert', this)">Certificado Oficial DGT</button>
      <button class="vdp-tab-btn" onclick="switchVdpTab('wear', this)">Transparencia de Estado</button>
      <button class="vdp-tab-btn" onclick="switchVdpTab('specs', this)">Ficha Técnica</button>
    </div>

    <!-- Pestaña: Equipamiento -->
    <div class="vdp-tab-pane active" id="vdp-pane-equipment">
      <div class="equipment-grid">
        ${equipmentHtml}
      </div>
    </div>

    <!-- Pestaña: Certificado DGT -->
    <div class="vdp-tab-pane" id="vdp-pane-dgt-cert">
      <div class="dgt-certificate-card">
        <div class="dgt-cert-header">
          <div class="dgt-cert-title-group">
            <h3>Informe de Antecedentes y Trazabilidad</h3>
            <p style="font-size: 0.8rem; color: var(--text-muted);">Verificado ante la Dirección General de Tráfico y Registro de Bienes Muebles</p>
          </div>
          <span class="dgt-cert-badge-official">DGT 100% VERIFICADO</span>
        </div>

        <div class="dgt-cert-checks-grid">
          <div class="dgt-check-item">
            <div class="dgt-check-icon">✓</div>
            <div>
              <strong>Número de Propietarios Anteriores:</strong>
              <p style="font-size: 0.85rem; color: var(--text-muted);">${vehicle.dgtHistory.previousOwners} titular anterior (${vehicle.dgtHistory.origin}).</p>
            </div>
          </div>

          <div class="dgt-check-item">
            <div class="dgt-check-icon">✓</div>
            <div>
              <strong>Libre de Cargas y Gravámenes:</strong>
              <p style="font-size: 0.85rem; color: var(--text-muted);">Sin reservas de dominio ni incidencias registrales.</p>
            </div>
          </div>

          <div class="dgt-check-item">
            <div class="dgt-check-icon">✓</div>
            <div>
              <strong>Historial de Daños Estructurales:</strong>
              <p style="font-size: 0.85rem; color: var(--text-muted);">0 siniestros graves registrados en base de datos aseguradora.</p>
            </div>
          </div>

          <div class="dgt-check-item">
            <div class="dgt-check-icon">✓</div>
            <div>
              <strong>Inspección Técnica (ITV):</strong>
              <p style="font-size: 0.85rem; color: var(--text-muted);">Vigente hasta ${vehicle.dgtHistory.itvValidUntil} con kilometraje verificado.</p>
            </div>
          </div>
        </div>
      </div>
    </div>



    <!-- Pestaña: Desgaste -->
    <div class="vdp-tab-pane" id="vdp-pane-wear">
      <div class="wear-points-box">
        <div class="wear-points-title">
          Transparencia Rigurosa de Estado
        </div>
        <div class="wear-points-subtitle">
          Documentamos cualquier marca o detalle estético derivado del uso habitual para garantizar una compra informada y sin sorpresas.
        </div>
        ${wearHtml}
      </div>
    </div>

    <!-- Pestaña: Ficha Técnica -->
    <div class="vdp-tab-pane" id="vdp-pane-specs">
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 14px;">
        <div class="spec-pill" style="background: #F4F4F6; padding: 14px; border-radius: var(--radius-xs);">
          <span class="spec-pill-label">Motorización</span>
          <span class="spec-pill-value">${vehicle.technicalSpecs.engine}</span>
        </div>
        <div class="spec-pill" style="background: #F4F4F6; padding: 14px; border-radius: var(--radius-xs);">
          <span class="spec-pill-label">Cilindrada</span>
          <span class="spec-pill-value">${vehicle.technicalSpecs.displacement}</span>
        </div>
        <div class="spec-pill" style="background: #F4F4F6; padding: 14px; border-radius: var(--radius-xs);">
          <span class="spec-pill-label">Aceleración (0-100 km/h)</span>
          <span class="spec-pill-value">${vehicle.technicalSpecs.acceleration}</span>
        </div>
        <div class="spec-pill" style="background: #F4F4F6; padding: 14px; border-radius: var(--radius-xs);">
          <span class="spec-pill-label">Velocidad Máxima</span>
          <span class="spec-pill-value">${vehicle.technicalSpecs.topSpeed}</span>
        </div>
        <div class="spec-pill" style="background: #F4F4F6; padding: 14px; border-radius: var(--radius-xs);">
          <span class="spec-pill-label">Consumo Combinado</span>
          <span class="spec-pill-value">${vehicle.technicalSpecs.combinedConsumption}</span>
        </div>
        <div class="spec-pill" style="background: #F4F4F6; padding: 14px; border-radius: var(--radius-xs);">
          <span class="spec-pill-label">Emisiones CO2</span>
          <span class="spec-pill-value">${vehicle.technicalSpecs.co2Emissions}</span>
        </div>
        <div class="spec-pill" style="background: #F4F4F6; padding: 14px; border-radius: var(--radius-xs);">
          <span class="spec-pill-label">Capacidad de Maletero</span>
          <span class="spec-pill-value">${vehicle.technicalSpecs.trunkCapacity}</span>
        </div>
        <div class="spec-pill" style="background: #F4F4F6; padding: 14px; border-radius: var(--radius-xs);">
          <span class="spec-pill-label">Depósito de Combustible</span>
          <span class="spec-pill-value">${vehicle.technicalSpecs.tankCapacity}</span>
        </div>
      </div>
    </div>

    <!-- Calculadora de Financiación -->
    <div class="financing-calculator-box">
      <h3 class="financing-calc-title">Simulador de Financiación Personalizado</h3>
      <p style="color: var(--text-muted); font-size: 0.9rem;">
        Selecciona la entrada inicial y el plazo de amortización para calcular tu cuota exacta.
      </p>

      <div class="financing-sliders-grid">
        <div class="slider-group">
          <div class="slider-label-row">
            <span class="slider-label">Entrada Inicial</span>
            <span class="slider-value-display" id="calc-downpayment-val">${AppState.financing.downPayment.toLocaleString('es-ES')} €</span>
          </div>
          <input type="range" class="range-slider" id="calc-downpayment-slider" 
                 min="0" max="${Math.floor(vehicle.financedPrice * 0.5)}" step="500" 
                 value="${AppState.financing.downPayment}">
        </div>

        <div class="slider-group">
          <div class="slider-label-row">
            <span class="slider-label">Plazo de Financiación</span>
            <span class="slider-value-display" id="calc-months-val">${AppState.financing.months} meses (${(AppState.financing.months / 12).toFixed(0)} años)</span>
          </div>
          <input type="range" class="range-slider" id="calc-months-slider" 
                 min="24" max="96" step="12" 
                 value="${AppState.financing.months}">
        </div>
      </div>

      <!-- Desglose Gráfico -->
      <div class="financing-visual-breakdown">
        <div class="breakdown-bar-container">
          <div class="breakdown-segment segment-downpayment" id="bar-seg-downpayment" style="width: 20%;"></div>
          <div class="breakdown-segment segment-capital" id="bar-seg-capital" style="width: 65%;"></div>
          <div class="breakdown-segment segment-interest" id="bar-seg-interest" style="width: 15%;"></div>
        </div>
        <div class="breakdown-legend">
          <div class="legend-item">
            <span class="legend-dot" style="background: var(--bg-dark);"></span>
            <span>Entrada: <strong id="legend-val-downpayment">3.000 €</strong></span>
          </div>
          <div class="legend-item">
            <span class="legend-dot" style="background: var(--color-red);"></span>
            <span>Capital Financiado: <strong id="legend-val-capital">23.400 €</strong></span>
          </div>
          <div class="legend-item">
            <span class="legend-dot" style="background: #71717A;"></span>
            <span>Intereses Estimados: <strong id="legend-val-interest">4.200 €</strong></span>
          </div>
        </div>
      </div>

      <!-- Resultado -->
      <div class="financing-result-card">
        <div>
          <div class="result-cuota-val" id="calc-result-cuota">${vehicle.monthlyInstallment} €/mes</div>
          <div class="result-cuota-label" id="calc-result-subtext">
            Importe financiado: ${(vehicle.financedPrice - AppState.financing.downPayment).toLocaleString('es-ES')} € en ${AppState.financing.months} mensualidades
          </div>
        </div>
        <a href="#" target="_blank" rel="noopener" class="btn-wizard-next" id="btn-request-financing-wa" style="margin-top: 0; padding: 0 24px;">
          Solicitar Estudio en 2 Horas
        </a>
      </div>
    </div>
  `;

  initVdpCalculatorEvents(vehicle);
  recalculateMonthlyInstallment(vehicle);
  updateVdpConversionBar(vehicle);
}

window.switchVdpTab = function(tabName, btn) {
  const tabs = document.querySelectorAll('.vdp-tab-btn');
  tabs.forEach(t => t.classList.remove('active'));
  btn.classList.add('active');

  const panes = document.querySelectorAll('.vdp-tab-pane');
  panes.forEach(p => p.classList.remove('active'));

  const activePane = document.getElementById(`vdp-pane-${tabName}`);
  if (activePane) activePane.classList.add('active');
};

window.selectVdpThumbnail = function(index) {
  if (!AppState.currentVdpVehicle) return;
  AppState.currentVdpImageIndex = index;

  const mainImg = document.getElementById('vdp-main-image');
  if (mainImg) mainImg.src = AppState.currentVdpVehicle.images[index];

  const thumbs = document.querySelectorAll('.vdp-thumb-item');
  thumbs.forEach((th, idx) => {
    if (idx === index) th.classList.add('active');
    else th.classList.remove('active');
  });
};

function initVdpCalculatorEvents(vehicle) {
  const downSlider = document.getElementById('calc-downpayment-slider');
  const monthsSlider = document.getElementById('calc-months-slider');

  if (downSlider) {
    downSlider.addEventListener('input', (e) => {
      AppState.financing.downPayment = parseInt(e.target.value, 10);
      document.getElementById('calc-downpayment-val').textContent = `${AppState.financing.downPayment.toLocaleString('es-ES')} €`;
      recalculateMonthlyInstallment(vehicle);
    });
  }

  if (monthsSlider) {
    monthsSlider.addEventListener('input', (e) => {
      AppState.financing.months = parseInt(e.target.value, 10);
      document.getElementById('calc-months-val').textContent = `${AppState.financing.months} meses (${(AppState.financing.months / 12).toFixed(0)} años)`;
      recalculateMonthlyInstallment(vehicle);
    });
  }
}

function recalculateMonthlyInstallment(vehicle) {
  const down = AppState.financing.downPayment;
  const financedAmount = vehicle.financedPrice - down;
  if (financedAmount <= 0) return;

  const monthlyRate = (AppState.financing.tin / 100) / 12;
  const n = AppState.financing.months;
  
  const installment = Math.round(
    financedAmount * (monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1)
  );

  const totalPaid = installment * n;
  const totalInterest = Math.max(0, totalPaid - financedAmount);
  const grandTotal = down + financedAmount + totalInterest;

  const resultCuota = document.getElementById('calc-result-cuota');
  if (resultCuota) resultCuota.textContent = `${installment} €/mes`;

  const resultSubtext = document.getElementById('calc-result-subtext');
  if (resultSubtext) {
    resultSubtext.textContent = `Importe financiado: ${financedAmount.toLocaleString('es-ES')} € en ${n} cuotas (TIN ${AppState.financing.tin}%)`;
  }

  const stickyCuota = document.getElementById('vdp-sticky-cuota-val');
  if (stickyCuota) stickyCuota.textContent = `${installment} €/mes`;

  const segDown = document.getElementById('bar-seg-downpayment');
  const segCap = document.getElementById('bar-seg-capital');
  const segInt = document.getElementById('bar-seg-interest');

  if (segDown && segCap && segInt && grandTotal > 0) {
    const pctDown = Math.round((down / grandTotal) * 100);
    const pctCap = Math.round((financedAmount / grandTotal) * 100);
    const pctInt = 100 - pctDown - pctCap;

    segDown.style.width = `${pctDown}%`;
    segCap.style.width = `${pctCap}%`;
    segInt.style.width = `${pctInt}%`;

    const legDown = document.getElementById('legend-val-downpayment');
    const legCap = document.getElementById('legend-val-capital');
    const legInt = document.getElementById('legend-val-interest');

    if (legDown) legDown.textContent = `${down.toLocaleString('es-ES')} € (${pctDown}%)`;
    if (legCap) legCap.textContent = `${financedAmount.toLocaleString('es-ES')} € (${pctCap}%)`;
    if (legInt) legInt.textContent = `${totalInterest.toLocaleString('es-ES')} € (${pctInt}%)`;
  }

  const btnFinanceWa = document.getElementById('btn-request-financing-wa');
  if (btnFinanceWa) {
    const msg = `Hola, solicito estudio de financiación para el ${vehicle.brand} ${vehicle.model} (Ref: ${vehicle.id}). Cuota estimada: ${installment}€/mes con ${down}€ de entrada en ${n} meses.`;
    btnFinanceWa.href = getWhatsAppLink(msg);
  }
}

function updateVdpConversionBar(vehicle) {
  const stickyCuota = document.getElementById('vdp-sticky-cuota-val');
  if (stickyCuota) stickyCuota.textContent = `${vehicle.monthlyInstallment} €/mes`;

  const waBtn = document.getElementById('vdp-whatsapp-direct-btn');
  if (waBtn) {
    const text = `Hola, deseo solicitar información sobre el ${vehicle.brand} ${vehicle.model} ${vehicle.version} (Ref: ${vehicle.id}) publicado en la web.`;
    waBtn.href = getWhatsAppLink(text);
  }

  const reserveCarName = document.getElementById('reserve-car-name');
  if (reserveCarName) {
    reserveCarName.textContent = `${vehicle.brand} ${vehicle.model} ${vehicle.version} (Ref: ${vehicle.id})`;
  }
}

/* ==========================================================================
   WIZARD DE TASACIÓN
   ========================================================================== */

function initValuationWizard() {
  const btnStep1 = document.getElementById('btn-val-step1');
  const btnStep2 = document.getElementById('btn-val-step2');
  const btnStep3 = document.getElementById('btn-val-step3');

  if (btnStep1) {
    btnStep1.addEventListener('click', () => {
      const plate = document.getElementById('val-plate').value.trim();
      const km = document.getElementById('val-km').value.trim();
      const year = document.getElementById('val-year').value.trim();

      if (!plate || !km || !year) {
        alert('Por favor, introduce la matrícula, kilometraje y año de matriculación.');
        return;
      }

      switchValuationStep(2);
    });
  }

  if (btnStep2) {
    btnStep2.addEventListener('click', () => {
      const year = parseInt(document.getElementById('val-year').value, 10) || 2018;
      const km = parseInt(document.getElementById('val-km').value, 10) || 100000;
      
      const currentYear = 2026;
      const age = currentYear - year;
      
      let baseVal = 22000 - (age * 1400) - ((km / 10000) * 350);
      if (baseVal < 3500) baseVal = 3500;

      const minVal = Math.round(baseVal * 0.95);
      const maxVal = Math.round(baseVal * 1.08);

      const displayRange = document.getElementById('val-estimated-range');
      if (displayRange) {
        displayRange.textContent = `${minVal.toLocaleString('es-ES')} € - ${maxVal.toLocaleString('es-ES')} €`;
      }

      switchValuationStep(3);
    });
  }

  if (btnStep3) {
    btnStep3.addEventListener('click', () => {
      const phone = document.getElementById('val-phone').value.trim();
      if (!phone) {
        alert('Por favor, indica tu teléfono para remitirte la valoración formal.');
        return;
      }

      const plate = document.getElementById('val-plate').value;
      const km = document.getElementById('val-km').value;
      const year = document.getElementById('val-year').value;
      const est = document.getElementById('val-estimated-range').textContent;

      const text = `Hola, solicito tasación para mi vehículo con matrícula ${plate} (${year}, ${km} km). Estimación obtenida: ${est}. Mi teléfono es ${phone}.`;
      window.open(getWhatsAppLink(text), '_blank');
    });
  }
}

function switchValuationStep(stepNumber) {
  const steps = document.querySelectorAll('.wizard-step-node');
  steps.forEach(s => {
    if (parseInt(s.dataset.step, 10) <= stepNumber) s.classList.add('active');
    else s.classList.remove('active');
  });

  const contents = document.querySelectorAll('.wizard-step-content');
  contents.forEach(c => c.classList.remove('active'));

  const activeContent = document.getElementById(`wizard-step-${stepNumber}`);
  if (activeContent) activeContent.classList.add('active');
}

/* ==========================================================================
   MODALES
   ========================================================================== */

function initModals() {
  const btnCloseVdp = document.getElementById('btn-close-vdp');
  if (btnCloseVdp) btnCloseVdp.addEventListener('click', closeVdpModal);

  const vdpBackdrop = document.getElementById('vdp-modal-backdrop');
  if (vdpBackdrop) {
    vdpBackdrop.addEventListener('click', (e) => {
      if (e.target === vdpBackdrop) closeVdpModal();
    });
  }

  const btnOpenReserve = document.getElementById('btn-open-reserve-modal');
  const reserveBackdrop = document.getElementById('reserve-modal-backdrop');
  const btnCloseReserve = document.getElementById('btn-close-reserve');
  const reserveForm = document.getElementById('reserve-form');

  if (btnOpenReserve) {
    btnOpenReserve.addEventListener('click', () => {
      if (reserveBackdrop) reserveBackdrop.classList.add('active');
    });
  }

  if (btnCloseReserve) {
    btnCloseReserve.addEventListener('click', () => {
      if (reserveBackdrop) reserveBackdrop.classList.remove('active');
    });
  }

  if (reserveBackdrop) {
    reserveBackdrop.addEventListener('click', (e) => {
      if (e.target === reserveBackdrop) reserveBackdrop.classList.remove('active');
    });
  }

  if (reserveForm) {
    reserveForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('res-name').value;
      const phone = document.getElementById('res-phone').value;
      const car = AppState.currentVdpVehicle;

      alert(`Solicitud registrada para ${name}. En breve contactaremos al ${phone} para confirmar el bloqueo formal del vehículo ${car.brand} ${car.model}.`);
      
      if (reserveBackdrop) reserveBackdrop.classList.remove('active');
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeVdpModal();
      if (reserveBackdrop) reserveBackdrop.classList.remove('active');
      const compModal = document.getElementById('compare-modal-backdrop');
      if (compModal) compModal.classList.remove('active');
      const drawer = document.getElementById('mobile-drawer');
      const overlay = document.getElementById('mobile-drawer-overlay');
      if (drawer) drawer.classList.remove('open');
      if (overlay) overlay.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
}

/* ==========================================================================
   MENÚ MÓVIL DRAWER
   ========================================================================== */

function initMobileDrawer() {
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const drawer = document.getElementById('mobile-drawer');
  const overlay = document.getElementById('mobile-drawer-overlay');
  const closeBtn = document.getElementById('btn-drawer-close');
  const navItems = document.querySelectorAll('.drawer-nav-item, .btn-drawer-sell, .btn-drawer-whatsapp');

  if (!toggleBtn || !drawer || !overlay) return;

  function openDrawer() {
    drawer.classList.add('open');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer.classList.remove('open');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  toggleBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  overlay.addEventListener('click', closeDrawer);

  navItems.forEach(item => {
    item.addEventListener('click', () => {
      closeDrawer();
    });
  });
}

