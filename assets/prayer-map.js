(function () {
  'use strict';

  const CENTRAL_OREGON_BOUNDS = [
    [43.55, -122.25],
    [45.15, -119.55],
  ];
  const MAP_CENTER = [44.0582, -121.3153];
  const OVERPASS_ENDPOINTS = [
    'https://overpass-api.de/api/interpreter',
    'https://overpass.kumi.systems/api/interpreter',
  ];

  const FALLBACK_CHURCHES = [
    { id: 'westside-bend', name: 'Westside Church', city: 'Bend', denomination: 'Christian', lat: 44.0584, lng: -121.3526, website: 'https://westsidechurch.org' },
    { id: 'journey-bend', name: 'Journey Church', city: 'Bend', denomination: 'Christian', lat: 44.0518, lng: -121.3081, website: 'https://journeyinbend.com' },
    { id: 'grace-bible-bend', name: 'Grace Bible Church of Bend', city: 'Bend', denomination: 'Bible church', lat: 44.1017, lng: -121.3001, website: 'https://gbcbend.org' },
    { id: 'trinity-bend', name: 'Trinity Episcopal Church', city: 'Bend', denomination: 'Episcopal', lat: 44.0589, lng: -121.3158, website: 'https://trinitybend.org' },
    { id: 'nativity-bend', name: 'Nativity Lutheran Church', city: 'Bend', denomination: 'Lutheran', lat: 44.0743, lng: -121.3074, website: 'https://nativityinbend.com' },
    { id: 'foundry-bend', name: 'Foundry Church', city: 'Bend', denomination: 'Christian', lat: 44.0415, lng: -121.3031, website: 'https://foundrychurchbend.org' },
    { id: 'mountain-view-redmond', name: 'Mountain View Fellowship', city: 'Redmond', denomination: 'Christian', lat: 44.2726, lng: -121.1737, website: 'https://mvfredmond.org' },
    { id: 'redmond-community', name: 'Redmond Community Church', city: 'Redmond', denomination: 'Community church', lat: 44.2727, lng: -121.1739, website: 'https://redmondcc.org' },
    { id: 'calvary-redmond', name: 'Calvary Chapel Redmond', city: 'Redmond', denomination: 'Calvary Chapel', lat: 44.2858, lng: -121.1693, website: 'https://calvaryredmond.com' },
    { id: 'sisters-community', name: 'Sisters Community Church', city: 'Sisters', denomination: 'Community church', lat: 44.2912, lng: -121.5494, website: 'https://sisterschurch.com' },
    { id: 'transfiguration-sisters', name: 'Episcopal Church of the Transfiguration', city: 'Sisters', denomination: 'Episcopal', lat: 44.2918, lng: -121.5506, website: 'https://transfigurationsisters.org' },
    { id: 'eastside-prineville', name: 'Eastside Church', city: 'Prineville', denomination: 'Christian', lat: 44.3026, lng: -120.8345, website: 'https://eastsideprineville.com' },
    { id: 'nazarene-prineville', name: 'Prineville Church of the Nazarene', city: 'Prineville', denomination: 'Nazarene', lat: 44.3019, lng: -120.8462, website: 'https://prinevillenaz.org' },
    { id: 'madras-christian', name: 'Madras Christian Church', city: 'Madras', denomination: 'Christian', lat: 44.6335, lng: -121.1294, website: 'https://madraschristianchurch.com' },
    { id: 'lapine-community', name: 'La Pine Community Church', city: 'La Pine', denomination: 'Community church', lat: 43.6704, lng: -121.5036, website: 'https://lapinecommunitychurch.org' },
  ];

  const REGIONAL_REQUESTS = [
    { type: 'urgent', theme: 'Winter shelter', text: 'Pray for emergency shelter beds, warming volunteers, and safe transportation during cold nights.', count: 48 },
    { type: 'community', theme: 'Food pantry', text: 'Pray for steady pantry supply, delivery drivers, and families navigating rising grocery costs.', count: 36 },
    { type: 'families', theme: 'Family care', text: 'Pray for foster families, single parents, marriages under strain, and trusted childcare support.', count: 29 },
    { type: 'students', theme: 'Students', text: 'Pray for middle and high school students, mentors, youth leaders, and safe after-school spaces.', count: 24 },
    { type: 'community', theme: 'Recovery support', text: 'Pray for recovery groups, sober housing, relapse prevention, and patient long-term friendships.', count: 33 },
    { type: 'praise', theme: 'Volunteer teams', text: 'Celebrate new volunteers stepping into meal trains, visitation, and neighborhood service.', count: 41 },
  ];

  const els = {
    map: document.getElementById('prayer-map'),
    list: document.getElementById('church-prayer-list'),
    search: document.getElementById('church-search'),
    need: document.getElementById('need-filter'),
    status: document.getElementById('church-map-status'),
    source: document.getElementById('church-source-badge'),
    churchCount: document.getElementById('church-count'),
    requestCount: document.getElementById('request-count'),
    cityCount: document.getElementById('city-count'),
  };

  if (!els.map || !window.L) return;

  const map = L.map('prayer-map', {
    scrollWheelZoom: false,
    maxBounds: CENTRAL_OREGON_BOUNDS,
    maxBoundsViscosity: 0.35,
  }).setView(MAP_CENTER, 8);

  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    maxZoom: 18,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> · &copy; <a href="https://carto.com/attributions">CARTO</a>',
  }).addTo(map);

  let churches = FALLBACK_CHURCHES.map(enrichChurch);
  let visibleChurches = churches;
  const markerLayer = L.layerGroup().addTo(map);
  const markerById = new Map();

  function slug(input) {
    return String(input || 'church')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  }

  function nearestCity(lat, lng) {
    const cities = [
      { name: 'Bend', lat: 44.0582, lng: -121.3153 },
      { name: 'Redmond', lat: 44.2726, lng: -121.1739 },
      { name: 'Sisters', lat: 44.2909, lng: -121.5492 },
      { name: 'Prineville', lat: 44.2998, lng: -120.8345 },
      { name: 'Madras', lat: 44.6335, lng: -121.1295 },
      { name: 'La Pine', lat: 43.6704, lng: -121.5036 },
      { name: 'Sunriver', lat: 43.884, lng: -121.438 },
    ];
    return cities
      .map((city) => ({ city, distance: Math.hypot(lat - city.lat, lng - city.lng) }))
      .sort((a, b) => a.distance - b.distance)[0].city.name;
  }

  function requestForChurch(church) {
    const index = Math.abs(slug(church.name).split('').reduce((sum, char) => sum + char.charCodeAt(0), 0)) % REGIONAL_REQUESTS.length;
    return REGIONAL_REQUESTS[index];
  }

  function enrichChurch(church) {
    const request = church.request || requestForChurch(church);
    return {
      ...church,
      id: church.id || slug(`${church.name}-${church.city || ''}`),
      city: church.city || nearestCity(church.lat, church.lng),
      denomination: church.denomination || 'Christian',
      request,
      searchText: `${church.name} ${church.city || ''} ${church.denomination || ''} ${request.theme} ${request.text}`.toLowerCase(),
    };
  }

  function overpassQuery() {
    const south = CENTRAL_OREGON_BOUNDS[0][0];
    const west = CENTRAL_OREGON_BOUNDS[0][1];
    const north = CENTRAL_OREGON_BOUNDS[1][0];
    const east = CENTRAL_OREGON_BOUNDS[1][1];
    return `[out:json][timeout:20];
      (
        node["amenity"="place_of_worship"]["religion"="christian"](${south},${west},${north},${east});
        way["amenity"="place_of_worship"]["religion"="christian"](${south},${west},${north},${east});
        relation["amenity"="place_of_worship"]["religion"="christian"](${south},${west},${north},${east});
      );
      out center tags;`;
  }

  async function fetchWithTimeout(url, options) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 18000);
    try {
      return await fetch(url, { ...options, signal: controller.signal });
    } finally {
      clearTimeout(timeout);
    }
  }

  async function loadLiveChurches() {
    for (const endpoint of OVERPASS_ENDPOINTS) {
      try {
        const response = await fetchWithTimeout(endpoint, {
          method: 'POST',
          body: new URLSearchParams({ data: overpassQuery() }),
        });
        if (!response.ok) continue;
        const payload = await response.json();
        const live = normalizeOverpass(payload.elements || []);
        if (live.length) return live;
      } catch (error) {
        // Try the next public Overpass endpoint.
      }
    }
    return [];
  }

  function normalizeOverpass(elements) {
    const seen = new Set();
    return elements
      .map((item) => {
        const tags = item.tags || {};
        const lat = item.lat || (item.center && item.center.lat);
        const lng = item.lon || (item.center && item.center.lon);
        const name = tags.name || tags.operator;
        if (!name || !lat || !lng) return null;
        const id = slug(`${name}-${lat.toFixed(4)}-${lng.toFixed(4)}`);
        if (seen.has(id)) return null;
        seen.add(id);
        return enrichChurch({
          id,
          name,
          lat,
          lng,
          city: tags['addr:city'] || nearestCity(lat, lng),
          denomination: tags.denomination || tags['service:denomination'] || 'Christian',
          website: tags.website || tags['contact:website'] || '',
          phone: tags.phone || tags['contact:phone'] || '',
        });
      })
      .filter(Boolean)
      .sort((a, b) => a.city.localeCompare(b.city) || a.name.localeCompare(b.name));
  }

  function markerColor(type) {
    if (type === 'urgent') return '#ef4444';
    if (type === 'praise') return '#10b981';
    if (type === 'community' || type === 'families' || type === 'students') return '#facc15';
    return '#14b8a6';
  }

  function badgeClass(type) {
    if (type === 'urgent') return 'badge-red';
    if (type === 'praise') return 'badge-green';
    if (type === 'community' || type === 'families' || type === 'students') return 'badge-gold';
    return '';
  }

  function escapeHtml(value) {
    return String(value || '').replace(/[&<>"']/g, (char) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;',
    })[char]);
  }

  function popupHtml(church) {
    const request = church.request;
    const website = church.website
      ? `<a href="${escapeHtml(church.website)}" target="_blank" rel="noreferrer">Website</a>`
      : '<span>No website listed</span>';
    return `
      <div style="min-width:220px;">
        <strong>${escapeHtml(church.name)}</strong><br/>
        <span style="color:#78716c; font-size:11px;">${escapeHtml(church.city)} · ${escapeHtml(church.denomination)}</span>
        <p style="margin: 8px 0 6px; font-size: 13px; line-height:1.45;">${escapeHtml(request.text)}</p>
        <div style="display:flex;align-items:center;gap:8px;justify-content:space-between;">
          <span style="display:inline-block; padding: 2px 8px; border-radius: 99px; background: ${markerColor(request.type)}22; color: ${markerColor(request.type)}; font-size: 11px; font-weight: 700; text-transform: uppercase;">${escapeHtml(request.theme)}</span>
          ${website}
        </div>
      </div>`;
  }

  function renderMarkers() {
    markerLayer.clearLayers();
    markerById.clear();
    visibleChurches.forEach((church) => {
      const color = markerColor(church.request.type);
      const icon = L.divIcon({
        className: '',
        html: `<div class="church-marker has-request" style="--marker-color:${color};">+</div>`,
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      });
      const marker = L.marker([church.lat, church.lng], { icon })
        .addTo(markerLayer)
        .bindPopup(popupHtml(church));
      markerById.set(church.id, marker);
    });
  }

  function renderStats() {
    const cities = new Set(visibleChurches.map((church) => church.city).filter(Boolean));
    els.churchCount.textContent = visibleChurches.length;
    els.requestCount.textContent = visibleChurches.filter((church) => church.request).length;
    els.cityCount.textContent = cities.size;
  }

  function renderList() {
    if (!visibleChurches.length) {
      els.list.innerHTML = `
        <article class="card">
          <p class="text-secondary" style="margin:0;">No matching churches found. Try a different city, church name, or prayer need.</p>
        </article>`;
      return;
    }

    els.list.innerHTML = visibleChurches.slice(0, 24).map((church) => {
      const request = church.request;
      return `
        <article class="card church-prayer-card" data-church-id="${escapeHtml(church.id)}" data-need-type="${escapeHtml(request.type)}" tabindex="0">
          <div class="church-prayer-card__head">
            <div class="avatar avatar-green">${escapeHtml(church.name.slice(0, 2).toUpperCase())}</div>
            <div style="flex:1;">
              <div class="between" style="align-items:flex-start; gap:12px;">
                <div>
                  <strong>${escapeHtml(church.name)}</strong>
                  <p class="text-xs text-muted">${escapeHtml(church.city)} · ${escapeHtml(church.denomination)}</p>
                </div>
                <span class="badge ${badgeClass(request.type)}">${escapeHtml(request.theme)}</span>
              </div>
            </div>
          </div>
          <blockquote>${escapeHtml(request.text)}</blockquote>
          <div class="church-prayer-card__meta">
            <button class="btn btn-soft btn-sm" type="button">${request.type === 'praise' ? 'Celebrate' : 'Pray'} · ${request.count}</button>
            <button class="btn btn-ghost btn-sm" type="button">Share</button>
            ${church.website ? `<a class="btn btn-ghost btn-sm" href="${escapeHtml(church.website)}" target="_blank" rel="noreferrer">Church site</a>` : ''}
          </div>
        </article>`;
    }).join('');

    els.list.querySelectorAll('.church-prayer-card').forEach((card) => {
      const openMarker = () => {
        const marker = markerById.get(card.dataset.churchId);
        const church = visibleChurches.find((item) => item.id === card.dataset.churchId);
        if (!marker || !church) return;
        map.setView([church.lat, church.lng], Math.max(map.getZoom(), 12), { animate: true });
        marker.openPopup();
      };
      card.addEventListener('click', (event) => {
        if (event.target.closest('a, button')) return;
        openMarker();
      });
      card.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          openMarker();
        }
      });
    });
  }

  function applyFilters() {
    const query = (els.search.value || '').trim().toLowerCase();
    const need = els.need.value;
    visibleChurches = churches.filter((church) => {
      const matchesQuery = !query || church.searchText.includes(query);
      const matchesNeed = need === 'all' || church.request.type === need;
      return matchesQuery && matchesNeed;
    });
    renderMarkers();
    renderStats();
    renderList();
  }

  function bindControls() {
    els.search.addEventListener('input', applyFilters);
    els.need.addEventListener('change', applyFilters);
    document.querySelectorAll('[data-chip-group]').forEach((group) => {
      group.addEventListener('chip:change', (event) => {
        const filter = event.detail && event.detail.filter;
        if (!filter) return;
        els.need.value = filter === 'ongoing' ? 'community' : filter;
        applyFilters();
      });
    });
    document.querySelector('[data-testid="btn-add-prayer"]')?.addEventListener('click', () => {
      if (window.GF_TOAST) window.GF_TOAST('Church request intake is ready for the partner portal', { tone: 'success' });
    });
  }

  function setSource(mode, count) {
    if (mode === 'live') {
      els.source.textContent = 'Live map data';
      els.status.textContent = `Showing ${count} public church locations from OpenStreetMap in Central Oregon.`;
    } else {
      els.source.textContent = 'Fallback directory';
      els.status.textContent = 'Using the built-in Central Oregon directory while live public map data is unavailable.';
    }
  }

  async function init() {
    bindControls();
    applyFilters();

    const liveChurches = await loadLiveChurches();
    if (liveChurches.length) {
      churches = liveChurches;
      setSource('live', liveChurches.length);
    } else {
      setSource('fallback', churches.length);
    }
    applyFilters();
  }

  init();
})();
