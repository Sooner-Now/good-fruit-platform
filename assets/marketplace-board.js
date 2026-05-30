(function () {
  'use strict';

  const LISTINGS = [
    {
      id: 'free-dining-set',
      title: 'Vintage dining table and chairs',
      category: 'free',
      type: 'products',
      price: 'FREE',
      city: 'Bend',
      source: 'craigslist',
      sourceLabel: 'Craigslist public',
      summary: 'Public free-section style lead for a solid wood dining set that could help a move-in household.',
      tags: ['furniture', 'dining', 'table', 'chairs', 'move-in'],
      url: 'https://bend.craigslist.org/search/zip?query=dining%20table',
      icon: 'DT',
      distance: 4,
      posted: 1,
    },
    {
      id: 'free-queen-mattress',
      title: 'Queen mattress and box spring',
      category: 'free',
      type: 'products',
      price: 'FREE',
      city: 'Redmond',
      source: 'craigslist',
      sourceLabel: 'Craigslist public',
      summary: 'Free mattress lead that should be inspected and paired only through a verified pickup team.',
      tags: ['mattress', 'bed', 'housing', 'furniture'],
      url: 'https://bend.craigslist.org/search/zip?query=queen%20mattress',
      icon: 'QM',
      distance: 17,
      posted: 2,
    },
    {
      id: 'free-wood-rounds',
      title: 'Ponderosa wood rounds',
      category: 'free',
      type: 'products',
      price: 'FREE',
      city: 'Sisters',
      source: 'craigslist',
      sourceLabel: 'Craigslist public',
      summary: 'Free wood-rounds lead that could support winter heat needs or community garden edging.',
      tags: ['wood', 'firewood', 'garden', 'outdoors'],
      url: 'https://bend.craigslist.org/search/zip?query=wood%20rounds',
      icon: 'WR',
      distance: 22,
      posted: 3,
    },
    {
      id: 'hauling-service',
      title: 'Junk removal and dump-run help',
      category: 'services',
      type: 'services',
      price: 'QUOTE',
      city: 'Central Oregon',
      source: 'craigslist',
      sourceLabel: 'Craigslist public',
      summary: 'Public service lead for hauling, yard cleanup, heavy lifting, and dump runs that could be sponsor-funded.',
      tags: ['hauling', 'moving', 'cleanup', 'dump run'],
      url: 'https://bend.craigslist.org/search/bbb?query=hauling',
      icon: 'HL',
      distance: 8,
      posted: 4,
    },
    {
      id: 'moving-labor',
      title: 'Moving labor and heavy lifting',
      category: 'services',
      type: 'services',
      price: '$30/hr',
      city: 'Bend',
      source: 'craigslist',
      sourceLabel: 'Craigslist public',
      summary: 'Public labor-services lead that can help with furniture pickup, apartment moves, and donated-item delivery.',
      tags: ['moving', 'labor', 'delivery', 'furniture'],
      url: 'https://bend.craigslist.org/search/bbb?query=moving%20labor',
      icon: 'MV',
      distance: 3,
      posted: 5,
    },
    {
      id: 'yard-cleanup',
      title: 'Spring cleanup and yard work',
      category: 'services',
      type: 'services',
      price: 'QUOTE',
      city: 'Bend / Redmond',
      source: 'craigslist',
      sourceLabel: 'Craigslist public',
      summary: 'Service lead for yard cleanup, debris removal, and seasonal outdoor projects.',
      tags: ['yard', 'cleanup', 'debris', 'outdoors'],
      url: 'https://bend.craigslist.org/search/bbb?query=yard%20cleanup',
      icon: 'YC',
      distance: 12,
      posted: 6,
    },
    {
      id: 'locavore-produce',
      title: 'Local produce and pantry staples',
      category: 'local-food',
      type: 'products',
      price: 'LOCAL',
      city: 'Bend',
      source: 'local',
      sourceLabel: 'Local vendor',
      summary: 'Central Oregon Locavore marketplace source for local produce, meats, eggs, dry goods, herbs, and household products.',
      tags: ['produce', 'local food', 'eggs', 'pantry'],
      url: 'https://centraloregonlocavore.org/marketplace/',
      icon: 'LF',
      distance: 2,
      posted: 7,
    },
    {
      id: 'around-here-producers',
      title: 'Small producer directory',
      category: 'local-food',
      type: 'products',
      price: 'LOCAL',
      city: 'Regional',
      source: 'local',
      sourceLabel: 'Local vendor',
      summary: 'Directory-style lead for finding Central Oregon small producers, growers, and local food sellers.',
      tags: ['producer', 'farm', 'food', 'local'],
      url: 'https://www.aroundhereoregon.com/',
      icon: 'AH',
      distance: 15,
      posted: 8,
    },
    {
      id: 'facebook-kids-clothes',
      title: 'Kids clothing bundle',
      category: 'free',
      type: 'products',
      price: 'FREE',
      city: 'Bend',
      source: 'facebook',
      sourceLabel: 'Facebook approved',
      summary: 'Example approved group import: seasonal children clothing bundle offered through a moderator-approved post.',
      tags: ['kids', 'clothing', 'family', 'free'],
      url: '',
      icon: 'KC',
      distance: 5,
      posted: 9,
    },
    {
      id: 'barter-bookkeeping',
      title: 'Bookkeeping help for childcare trade',
      category: 'barter',
      type: 'services',
      price: 'BARTER',
      city: 'Redmond',
      source: 'community',
      sourceLabel: 'Community board',
      summary: 'Neighbor offers three hours of bookkeeping support in exchange for childcare or prepared meals.',
      tags: ['bookkeeping', 'childcare', 'meals', 'barter'],
      url: '',
      icon: 'BK',
      distance: 18,
      posted: 10,
    },
    {
      id: 'wanted-tools',
      title: 'Wanted: basic hand tools for apprentice',
      category: 'wanted',
      type: 'products',
      price: 'WANTED',
      city: 'Prineville',
      source: 'church',
      sourceLabel: 'Church partner',
      summary: 'Partner-submitted request for donated or discounted basic tools for a young trades apprentice.',
      tags: ['tools', 'apprentice', 'work', 'wanted'],
      url: '',
      icon: 'TL',
      distance: 36,
      posted: 11,
    },
    {
      id: 'ride-share',
      title: 'Ride share to Bend appointments',
      category: 'barter',
      type: 'services',
      price: 'BARTER',
      city: 'La Pine',
      source: 'community',
      sourceLabel: 'Community board',
      summary: 'Community-post style lead from a driver open to trading rides for gas help or grocery pickup.',
      tags: ['ride', 'transport', 'appointments', 'barter'],
      url: '',
      icon: 'RS',
      distance: 31,
      posted: 12,
    },
  ];

  const els = {
    list: document.getElementById('market-listings'),
    search: document.getElementById('market-search'),
    source: document.getElementById('market-source'),
    sort: document.getElementById('market-sort'),
    count: document.getElementById('market-count'),
    freeCount: document.getElementById('market-free-count'),
    sourceCount: document.getElementById('market-source-count'),
    visibleCount: document.getElementById('market-visible-count'),
  };

  if (!els.list) return;

  let activeCategory = 'all';
  let filtered = LISTINGS;

  function escapeHtml(value) {
    return String(value || '').replace(/[&<>"']/g, (char) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;',
    })[char]);
  }

  function sourceClass(source) {
    return `source-pill source-pill--${source}`;
  }

  function priceClass(item) {
    if (item.category === 'free') return 'price-pill--free';
    if (item.category === 'barter') return 'price-pill--trade';
    if (item.category === 'wanted') return 'price-pill--wanted';
    if (item.price !== 'LOCAL' && item.price !== 'QUOTE') return 'price-pill--paid';
    return '';
  }

  function searchText(item) {
    return [
      item.title,
      item.category,
      item.type,
      item.price,
      item.city,
      item.sourceLabel,
      item.summary,
      ...item.tags,
    ].join(' ').toLowerCase();
  }

  function renderStats() {
    els.count.textContent = filtered.length;
    els.visibleCount.textContent = filtered.length;
    els.freeCount.textContent = filtered.filter((item) => item.category === 'free' || item.category === 'barter').length;
    els.sourceCount.textContent = new Set(filtered.map((item) => item.source)).size;
  }

  function renderListings() {
    if (!filtered.length) {
      els.list.innerHTML = '<article class="card"><p class="text-secondary" style="margin:0;">No matching marketplace listings found. Try widening the filters.</p></article>';
      return;
    }

    els.list.innerHTML = filtered.map((item) => `
      <article class="listing-card market-listing" data-testid="card-listing-${escapeHtml(item.id)}">
        <div class="listing-card__thumb" aria-hidden="true">${escapeHtml(item.icon)}</div>
        <div class="listing-card__body">
          <div class="between" style="margin-bottom: 4px; gap: 12px;">
            <h3 class="listing-card__title">${escapeHtml(item.title)}</h3>
            <span class="price-pill ${priceClass(item)}">${escapeHtml(item.price)}</span>
          </div>
          <p class="listing-card__desc">${escapeHtml(item.summary)}</p>
          <div class="listing-card__meta">
            <div class="avatar avatar-sm avatar-green">${escapeHtml(item.city.slice(0, 2).toUpperCase())}</div>
            ${escapeHtml(item.city)} · ${escapeHtml(item.distance)} mi · ${escapeHtml(item.posted)}d
          </div>
          <div class="market-listing__source">
            <span class="${sourceClass(item.source)}">${escapeHtml(item.sourceLabel)}</span>
            ${item.tags.slice(0, 3).map((tag) => `<span class="skill-tag">${escapeHtml(tag)}</span>`).join('')}
          </div>
          <div class="row-tight" style="margin-top: 10px;">
            ${item.url ? `<a class="btn btn-primary btn-sm" href="${escapeHtml(item.url)}" target="_blank" rel="noreferrer">Open source</a>` : '<button class="btn btn-primary btn-sm" type="button">Request intro</button>'}
            <button class="btn btn-ghost btn-sm" type="button">Save</button>
            <button class="btn btn-ghost btn-sm" type="button">Match to need</button>
          </div>
        </div>
      </article>
    `).join('');
  }

  function applyFilters() {
    const query = (els.search.value || '').trim().toLowerCase();
    const source = els.source.value;
    filtered = LISTINGS.filter((item) => {
      const categoryMatch = activeCategory === 'all' || item.category === activeCategory || item.type === activeCategory;
      const sourceMatch = source === 'all' || item.source === source;
      const queryMatch = !query || searchText(item).includes(query);
      return categoryMatch && sourceMatch && queryMatch;
    });

    if (els.sort.value === 'free') {
      filtered = [...filtered].sort((a, b) => {
        const rank = (item) => item.category === 'free' ? 0 : item.category === 'barter' ? 1 : 2;
        return rank(a) - rank(b) || a.distance - b.distance;
      });
    } else if (els.sort.value === 'nearby') {
      filtered = [...filtered].sort((a, b) => a.distance - b.distance);
    } else {
      filtered = [...filtered].sort((a, b) => a.posted - b.posted);
    }

    renderStats();
    renderListings();
  }

  function bindControls() {
    els.search.addEventListener('input', applyFilters);
    els.source.addEventListener('change', applyFilters);
    els.sort.addEventListener('change', applyFilters);
    document.querySelectorAll('[data-chip-group]').forEach((group) => {
      group.addEventListener('chip:change', (event) => {
        activeCategory = event.detail && event.detail.filter ? event.detail.filter : 'all';
        applyFilters();
      });
    });
    document.querySelector('[data-testid="btn-refresh-market"]')?.addEventListener('click', () => {
      if (window.GF_TOAST) window.GF_TOAST('Marketplace leads refreshed from approved public and partner sources', { tone: 'success' });
    });
    document.querySelector('[data-testid="btn-list-something"]')?.addEventListener('click', () => {
      if (window.GF_TOAST) window.GF_TOAST('Listing intake is ready for review and matching', { tone: 'success' });
    });
    document.querySelector('[data-testid="btn-featured"]')?.addEventListener('click', () => {
      activeCategory = 'free';
      document.querySelectorAll('[data-chip-group] .chip').forEach((chip) => {
        const pressed = chip.dataset.filter === 'free';
        chip.setAttribute('aria-pressed', pressed ? 'true' : 'false');
        chip.classList.toggle('is-active', pressed);
      });
      applyFilters();
    });
  }

  bindControls();
  applyFilters();
})();
