(function () {
  'use strict';

  const ITEMS = [
    {
      id: 'need-rent-bend',
      kind: 'need',
      title: 'Short-term rent gap before first paycheck',
      person: 'Verified family partner',
      city: 'Bend',
      source: 'church',
      sourceLabel: 'Church partner',
      urgency: 'high',
      categories: ['financial', 'housing'],
      summary: 'A family moving from motel housing needs a partial deposit bridge while a new job starts.',
      amount: '$650 gap',
      tags: ['rent', 'deposit', 'housing', 'family'],
      url: '',
    },
    {
      id: 'offer-housing-fund',
      kind: 'offer',
      title: 'Benevolence fund for verified housing gaps',
      person: 'Local donor circle',
      city: 'Bend',
      source: 'church',
      sourceLabel: 'Church partner',
      urgency: 'ready',
      categories: ['financial', 'housing'],
      summary: 'Small grants available for verified rent, deposit, and utility bridge requests.',
      amount: 'Up to $750',
      tags: ['rent', 'deposit', 'utilities', 'verified'],
      url: '',
    },
    {
      id: 'need-car-seat-redmond',
      kind: 'need',
      title: 'Toddler car seat for clinic trips',
      person: 'Community health referral',
      city: 'Redmond',
      source: 'nonprofit',
      sourceLabel: 'Nonprofit referral',
      urgency: 'medium',
      categories: ['childcare', 'transport'],
      summary: 'Caregiver needs a safe toddler seat for repeated medical appointments in Bend.',
      amount: 'Item needed',
      tags: ['car seat', 'toddler', 'clinic', 'transport'],
      url: '',
    },
    {
      id: 'offer-car-seat-bend',
      kind: 'offer',
      title: 'Clean convertible car seat available',
      person: 'Approved Facebook group post',
      city: 'Bend',
      source: 'facebook',
      sourceLabel: 'Facebook approved',
      urgency: 'ready',
      categories: ['childcare', 'transport'],
      summary: 'Moderator-approved post offering a clean, unexpired convertible car seat for pickup.',
      amount: 'Free',
      tags: ['car seat', 'toddler', 'pickup', 'free'],
      url: '',
    },
    {
      id: 'need-furniture-sisters',
      kind: 'need',
      title: 'Beds and dresser for apartment restart',
      person: 'Case manager referral',
      city: 'Sisters',
      source: 'community',
      sourceLabel: 'Community board',
      urgency: 'medium',
      categories: ['household', 'housing'],
      summary: 'A household leaving temporary housing needs two twin beds, bedding, and one dresser.',
      amount: 'Furniture needed',
      tags: ['beds', 'dresser', 'bedding', 'furniture'],
      url: '',
    },
    {
      id: 'offer-free-furniture',
      kind: 'offer',
      title: 'Free twin bed frames and dresser',
      person: 'Public listing lead',
      city: 'Bend',
      source: 'craigslist',
      sourceLabel: 'Craigslist public',
      urgency: 'ready',
      categories: ['household', 'housing'],
      summary: 'Public free-section style lead for furniture that could be picked up by a volunteer truck team.',
      amount: 'Free',
      tags: ['twin bed', 'dresser', 'furniture', 'pickup'],
      url: 'https://bend.craigslist.org/search/zip?query=bed%20dresser',
    },
    {
      id: 'need-grocery-lapine',
      kind: 'need',
      title: 'Grocery support after medical leave',
      person: 'La Pine partner church',
      city: 'La Pine',
      source: 'church',
      sourceLabel: 'Church partner',
      urgency: 'high',
      categories: ['food', 'financial'],
      summary: 'Two adults and one teen need pantry staples and gas cards while recovering from unpaid leave.',
      amount: '$180 grocery estimate',
      tags: ['groceries', 'gas card', 'pantry', 'medical leave'],
      url: '',
    },
    {
      id: 'offer-pantry-redmond',
      kind: 'offer',
      title: 'Pantry boxes and grocery cards',
      person: 'Regional pantry team',
      city: 'Redmond',
      source: 'nonprofit',
      sourceLabel: 'Nonprofit referral',
      urgency: 'ready',
      categories: ['food', 'financial'],
      summary: 'Pantry boxes available this week plus limited grocery cards for verified families.',
      amount: '12 boxes',
      tags: ['groceries', 'pantry', 'gas card', 'food'],
      url: 'https://www.findhelp.org',
    },
    {
      id: 'need-ride-prineville',
      kind: 'need',
      title: 'Weekly ride to recovery meeting',
      person: 'Recovery group request',
      city: 'Prineville',
      source: 'community',
      sourceLabel: 'Community board',
      urgency: 'medium',
      categories: ['transport'],
      summary: 'Neighbor needs a consistent Thursday evening ride while license reinstatement is pending.',
      amount: 'Weekly ride',
      tags: ['ride', 'recovery', 'transport', 'thursday'],
      url: '',
    },
    {
      id: 'offer-driver-team',
      kind: 'offer',
      title: 'Volunteer driver team has Thursday openings',
      person: 'Church care team',
      city: 'Prineville',
      source: 'church',
      sourceLabel: 'Church partner',
      urgency: 'ready',
      categories: ['transport'],
      summary: 'Vetted drivers can cover evening rides inside Prineville with advance scheduling.',
      amount: '3 drivers',
      tags: ['ride', 'driver', 'transport', 'thursday'],
      url: '',
    },
    {
      id: 'need-yard-help-madras',
      kind: 'need',
      title: 'Yard cleanup for older homeowner',
      person: 'Madras neighbor referral',
      city: 'Madras',
      source: 'facebook',
      sourceLabel: 'Facebook approved',
      urgency: 'low',
      categories: ['household'],
      summary: 'Moderator-approved post asking for a small crew to clear branches and haul yard debris.',
      amount: 'Saturday help',
      tags: ['yard', 'cleanup', 'haul', 'branches'],
      url: '',
    },
    {
      id: 'offer-hauling-craigslist',
      kind: 'offer',
      title: 'Pickup and dump run offered at low cost',
      person: 'Public services lead',
      city: 'Madras',
      source: 'craigslist',
      sourceLabel: 'Craigslist public',
      urgency: 'ready',
      categories: ['household', 'transport'],
      summary: 'Public service listing lead for local hauling that a donor could sponsor.',
      amount: '$45 estimate',
      tags: ['yard', 'cleanup', 'haul', 'pickup'],
      url: 'https://bend.craigslist.org/search/bbb?query=hauling',
    },
  ];

  const els = {
    feed: document.getElementById('needs-feed'),
    matches: document.getElementById('needs-match-list'),
    search: document.getElementById('needs-search'),
    source: document.getElementById('needs-source'),
    mode: document.getElementById('needs-mode'),
    openCount: document.getElementById('needs-open-count'),
    offerCount: document.getElementById('needs-offer-count'),
    matchCount: document.getElementById('needs-match-count'),
  };

  if (!els.feed || !els.matches) return;

  let activeCategory = 'all';
  let filteredItems = ITEMS;

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

  function urgencyBadge(item) {
    if (item.kind === 'offer') return '<span class="badge badge-green">Offer</span>';
    if (item.urgency === 'high') return '<span class="badge badge-red">High urgency</span>';
    if (item.urgency === 'medium') return '<span class="badge badge-amber">Medium</span>';
    return '<span class="badge badge-green">Ongoing</span>';
  }

  function itemSearchText(item) {
    return [
      item.title,
      item.person,
      item.city,
      item.sourceLabel,
      item.summary,
      item.amount,
      ...item.categories,
      ...item.tags,
    ].join(' ').toLowerCase();
  }

  function scoreMatch(need, offer) {
    const categoryScore = need.categories.filter((cat) => offer.categories.includes(cat)).length * 30;
    const tagScore = need.tags.filter((tag) => offer.tags.includes(tag)).length * 12;
    const cityScore = need.city === offer.city ? 18 : 0;
    const urgencyScore = need.urgency === 'high' ? 8 : need.urgency === 'medium' ? 4 : 0;
    return categoryScore + tagScore + cityScore + urgencyScore;
  }

  function getMatches(items) {
    const needs = items.filter((item) => item.kind === 'need');
    const offers = ITEMS.filter((item) => item.kind === 'offer');
    return needs
      .flatMap((need) => offers.map((offer) => ({ need, offer, score: scoreMatch(need, offer) })))
      .filter((match) => match.score >= 34)
      .sort((a, b) => b.score - a.score)
      .slice(0, 4);
  }

  function renderStats(matches) {
    els.openCount.textContent = filteredItems.filter((item) => item.kind === 'need').length;
    els.offerCount.textContent = ITEMS.filter((item) => item.kind === 'offer').length;
    els.matchCount.textContent = matches.length;
  }

  function renderMatches(matches) {
    if (!matches.length) {
      els.matches.innerHTML = '<article class="card"><p class="text-secondary" style="margin:0;">No strong pairings for this filter yet. Try widening the category or source.</p></article>';
      return;
    }
    els.matches.innerHTML = matches.map(({ need, offer, score }) => `
      <article class="card match-card">
        <div class="between" style="align-items:flex-start; gap:12px;">
          <div>
            <p class="section-eyebrow">Match score ${score}</p>
            <h3>${escapeHtml(need.categories[0])} connection</h3>
          </div>
          <span class="badge badge-gold">Suggested</span>
        </div>
        <div class="match-card__bridge">
          <div class="match-card__side">
            <span class="${sourceClass(need.source)}">${escapeHtml(need.sourceLabel)}</span>
            <h4 style="margin:8px 0 4px;">${escapeHtml(need.title)}</h4>
            <p class="text-xs text-muted">${escapeHtml(need.city)} · ${escapeHtml(need.amount)}</p>
          </div>
          <div class="match-card__arrow">→</div>
          <div class="match-card__side">
            <span class="${sourceClass(offer.source)}">${escapeHtml(offer.sourceLabel)}</span>
            <h4 style="margin:8px 0 4px;">${escapeHtml(offer.title)}</h4>
            <p class="text-xs text-muted">${escapeHtml(offer.city)} · ${escapeHtml(offer.amount)}</p>
          </div>
        </div>
        <div class="row-tight">
          <button class="btn btn-primary btn-sm" type="button">Start intro</button>
          <button class="btn btn-ghost btn-sm" type="button">Verify</button>
        </div>
      </article>
    `).join('');
  }

  function renderFeed() {
    if (!filteredItems.length) {
      els.feed.innerHTML = '<article class="card"><p class="text-secondary" style="margin:0;">No matching needs or offers found.</p></article>';
      return;
    }

    els.feed.innerHTML = filteredItems.map((item) => `
      <article class="card need-item-card" data-kind="${escapeHtml(item.kind)}">
        <div class="need-item-card__head">
          <div>
            <div class="row-tight">
              <strong>${escapeHtml(item.person)}</strong>
              <span class="text-xs text-muted">· ${escapeHtml(item.city)}</span>
            </div>
            <span class="${sourceClass(item.source)}">${escapeHtml(item.sourceLabel)}</span>
          </div>
          ${urgencyBadge(item)}
        </div>
        <h3 style="margin-bottom: 6px;">${escapeHtml(item.title)}</h3>
        <p class="text-sm text-secondary">${escapeHtml(item.summary)}</p>
        <div class="need-item-card__meta">
          ${item.categories.map((cat) => `<span class="skill-tag">${escapeHtml(cat)}</span>`).join('')}
          <span class="badge badge-slate">${escapeHtml(item.amount)}</span>
        </div>
        <div class="row-tight">
          <button class="btn ${item.kind === 'need' ? 'btn-coral' : 'btn-lime'} btn-sm" type="button">${item.kind === 'need' ? 'Help' : 'Use offer'}</button>
          <button class="btn btn-ghost btn-sm" type="button">Pray</button>
          ${item.url ? `<a class="btn btn-ghost btn-sm" href="${escapeHtml(item.url)}" target="_blank" rel="noreferrer">Open source</a>` : '<button class="btn btn-ghost btn-sm" type="button">Details</button>'}
        </div>
      </article>
    `).join('');
  }

  function applyFilters() {
    const query = (els.search.value || '').trim().toLowerCase();
    const source = els.source.value;
    const mode = els.mode.value;
    filteredItems = ITEMS.filter((item) => {
      const categoryMatch = activeCategory === 'all' || item.categories.includes(activeCategory);
      const sourceMatch = source === 'all' || item.source === source;
      const modeMatch = mode === 'all' || item.kind === mode;
      const queryMatch = !query || itemSearchText(item).includes(query);
      return categoryMatch && sourceMatch && modeMatch && queryMatch;
    });
    const matches = getMatches(filteredItems);
    renderStats(matches);
    renderMatches(matches);
    renderFeed();
  }

  function bindControls() {
    els.search.addEventListener('input', applyFilters);
    els.source.addEventListener('change', applyFilters);
    els.mode.addEventListener('change', applyFilters);
    document.querySelectorAll('[data-chip-group]').forEach((group) => {
      group.addEventListener('chip:change', (event) => {
        activeCategory = event.detail && event.detail.filter ? event.detail.filter : 'all';
        applyFilters();
      });
    });
    document.querySelector('[data-testid="btn-post-need"]')?.addEventListener('click', () => {
      if (window.GF_TOAST) window.GF_TOAST('Need intake form is ready for verification workflow', { tone: 'success' });
    });
    document.querySelector('[data-testid="btn-add-offer"]')?.addEventListener('click', () => {
      if (window.GF_TOAST) window.GF_TOAST('Offer intake is ready for helpers with available means', { tone: 'success' });
    });
    document.querySelector('[data-testid="btn-source-review"]')?.addEventListener('click', () => {
      if (window.GF_TOAST) window.GF_TOAST('Source review queue will connect approved boards and partner imports', { tone: 'success' });
    });
  }

  bindControls();
  applyFilters();
})();
