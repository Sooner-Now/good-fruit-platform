(function () {
  'use strict';

  const opportunities = [
    {
      title: 'Sparrow & Stone Bakery expansion',
      slug: 'sparrow-stone-bakery',
      founder_name: 'Mara Lewis',
      organization_name: 'Sparrow & Stone',
      city: 'Bend',
      neighborhood: 'Orchard District',
      category: 'food',
      categoryLabel: 'Food and local goods',
      summary: 'A neighborhood bakery adding capacity to train apprentices and provide weekly bread for a pantry partner.',
      full_story: 'Mara started with cottage loaves and a borrowed mixer. The next step is a second oven and a paid apprentice track.',
      funding_goal: 18000,
      amount_raised: 11250,
      progress_percent: 63,
      support_types: ['investment', 'mentorship', 'prayer', 'local partnership'],
      endorsements_count: 12,
      status: 'funded in part',
      partner_church_or_group: 'East Bend pantry team',
    },
    {
      title: 'High Desert Mobile Mechanic apprentice fund',
      slug: 'mobile-mechanic-apprentice-fund',
      founder_name: 'Caleb Ortiz',
      organization_name: 'High Desert Mobile Mechanic',
      city: 'Redmond',
      neighborhood: 'South Redmond',
      category: 'trades',
      categoryLabel: 'Trades and tools',
      summary: 'A mobile repair service raising tool funds for two young apprentices learning reliable trade skills.',
      full_story: 'Caleb wants to train apprentices while serving families who cannot easily get cars to a shop.',
      funding_goal: 12500,
      amount_raised: 5200,
      progress_percent: 42,
      support_types: ['investment', 'mentorship', 'sharing'],
      endorsements_count: 8,
      status: 'mentorship requested',
      partner_church_or_group: 'Redmond workforce circle',
    },
    {
      title: 'Riverbend Youth Arts Studio',
      slug: 'riverbend-youth-arts-studio',
      founder_name: 'Noelle Kim',
      organization_name: 'Riverbend Studio',
      city: 'Bend',
      neighborhood: 'Old Mill',
      category: 'youth',
      categoryLabel: 'Youth and arts',
      summary: 'A youth arts room seeking sponsors, volunteer mentors, and supplies for after-school creative workshops.',
      full_story: 'The studio gives middle and high school students a safe creative space with adult mentors and practical art skills.',
      funding_goal: 9000,
      amount_raised: 3600,
      progress_percent: 40,
      support_types: ['collaboration', 'mentorship', 'prayer', 'sharing'],
      endorsements_count: 6,
      status: 'open to collaborators',
      partner_church_or_group: 'Downtown youth coalition',
    },
    {
      title: 'Juniper Community Garden Co-op',
      slug: 'juniper-community-garden',
      founder_name: 'Eli and Rosa Martinez',
      organization_name: 'Juniper Garden Co-op',
      city: 'Prineville',
      neighborhood: 'Ochoco Creek',
      category: 'community',
      categoryLabel: 'Community projects',
      summary: 'A garden co-op creating shared plots, seasonal classes, and produce boxes for elders and single parents.',
      full_story: 'The co-op needs fencing, irrigation repair, volunteer captains, and a simple delivery route.',
      funding_goal: 15000,
      amount_raised: 9900,
      progress_percent: 66,
      support_types: ['investment', 'collaboration', 'local partnership', 'prayer'],
      endorsements_count: 10,
      status: 'seeking support',
      partner_church_or_group: 'Ochoco service network',
    },
    {
      title: 'Tradeschool Tool Library',
      slug: 'tradeschool-tool-library',
      founder_name: 'Micah Trent',
      organization_name: 'Tool Library Project',
      city: 'Madras',
      neighborhood: 'Downtown',
      category: 'trades',
      categoryLabel: 'Trades and tools',
      summary: 'A shared tool library helping students, repair volunteers, and small contractors access equipment responsibly.',
      full_story: 'The library will lend tools through verified mentors and track repair projects completed for neighbors.',
      funding_goal: 22000,
      amount_raised: 7400,
      progress_percent: 34,
      support_types: ['investment', 'collaboration', 'mentorship'],
      endorsements_count: 4,
      status: 'seeking support',
      partner_church_or_group: 'Madras trades mentors',
    },
    {
      title: 'Sisters Wellness Kitchen',
      slug: 'sisters-wellness-kitchen',
      founder_name: 'Talia Brooks',
      organization_name: 'Wellness Kitchen',
      city: 'Sisters',
      neighborhood: 'Village Green',
      category: 'wellness',
      categoryLabel: 'Wellness',
      summary: 'A prepared-meal venture offering nourishing meals, caregiver discounts, and cooking classes for recovery seasons.',
      full_story: 'Talia is building a food venture that serves families in stressful seasons and teaches practical kitchen confidence.',
      funding_goal: 16000,
      amount_raised: 12800,
      progress_percent: 80,
      support_types: ['investment', 'sharing', 'local partnership', 'prayer'],
      endorsements_count: 2,
      status: 'funded in part',
      partner_church_or_group: 'Sisters care team',
    },
  ];

  const grid = document.querySelector('[data-opportunity-grid]');
  const countEl = document.getElementById('opportunity-count');
  const searchEl = document.getElementById('opportunity-search');
  const categoryEl = document.getElementById('opportunity-category');
  const supportEl = document.getElementById('opportunity-support');
  const locationEl = document.getElementById('opportunity-location');
  const statusEl = document.getElementById('opportunity-status');

  if (!grid) return;

  function money(value) {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);
  }

  function badgeClass(status) {
    if (status === 'funded in part') return 'badge-gold';
    if (status === 'open to collaborators') return 'badge-lime';
    if (status === 'mentorship requested') return 'badge-coral';
    return 'badge-green';
  }

  function card(item) {
    return `
      <article class="opportunity-card card" data-testid="card-opportunity-${item.slug}">
        <div class="opportunity-card__art" aria-hidden="true">
          <span>${item.organization_name.split(/\s+/).slice(0, 2).map((part) => part[0]).join('')}</span>
        </div>
        <div class="opportunity-card__body">
          <div class="between" style="align-items:flex-start; gap:10px;">
            <div>
              <p class="text-xs text-muted">${item.city} · ${item.categoryLabel}</p>
              <h3>${item.title}</h3>
            </div>
            <span class="badge ${badgeClass(item.status)}">${item.status}</span>
          </div>
          <p class="text-sm text-secondary">${item.summary}</p>
          <div class="opportunity-founder">Founder: <strong>${item.founder_name}</strong></div>
          <div class="opportunity-progress">
            <div class="between">
              <span>${money(item.amount_raised)} pledged</span>
              <span>${item.progress_percent}%</span>
            </div>
            <div class="progress"><div class="progress__bar" style="width:${item.progress_percent}%"></div></div>
            <p class="text-xs text-muted">Goal: ${money(item.funding_goal)}</p>
          </div>
          <div class="opportunity-supports">
            ${item.support_types.map((type) => `<span>${type}</span>`).join('')}
          </div>
          <div class="opportunity-card__foot">
            <span>${item.endorsements_count} community endorsements</span>
            <button class="local-source__action" type="button" data-opportunity-view="${item.slug}">View profile -></button>
          </div>
        </div>
      </article>
    `;
  }

  function matches(item) {
    const query = (searchEl.value || '').trim().toLowerCase();
    const haystack = [item.title, item.founder_name, item.organization_name, item.city, item.summary, item.categoryLabel].join(' ').toLowerCase();
    return (!query || haystack.includes(query))
      && (categoryEl.value === 'all' || item.category === categoryEl.value)
      && (supportEl.value === 'all' || item.support_types.includes(supportEl.value))
      && (locationEl.value === 'all' || item.city.toLowerCase() === locationEl.value)
      && (statusEl.value === 'all' || item.status === statusEl.value);
  }

  function render() {
    const filtered = opportunities.filter(matches);
    countEl.textContent = filtered.length;
    grid.innerHTML = filtered.length
      ? filtered.map(card).join('')
      : '<div class="card"><h3>No opportunities found</h3><p class="text-sm text-secondary">Try widening the filters or searching a nearby area.</p></div>';
  }

  [searchEl, categoryEl, supportEl, locationEl, statusEl].forEach((control) => {
    control.addEventListener('input', render);
    control.addEventListener('change', render);
  });

  grid.addEventListener('click', (event) => {
    const button = event.target.closest('[data-opportunity-view]');
    if (!button) return;
    const item = opportunities.find((entry) => entry.slug === button.dataset.opportunityView);
    if (!item) return;
    document.getElementById('detail-title').textContent = item.title;
    document.querySelector('[data-opportunity-detail] .text-secondary').textContent = item.full_story;
    document.querySelector('[data-opportunity-detail]').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  document.querySelector('[data-submit-opportunity]')?.addEventListener('click', () => {
    window.GF_TOAST('Submission flow ready for verified members', { tone: 'success' });
  });

  render();
})();
