(function () {
  'use strict';

  const OPPORTUNITIES = [
    {
      id: 'connect-central-oregon',
      type: 'project',
      title: 'Browse regional volunteer opportunities',
      org: 'Connect Central Oregon',
      city: 'Regional',
      source: 'Public volunteer board',
      fit: ['serve', 'lead'],
      commitment: 'Varies by posting',
      summary: 'A central board where local organizations post volunteer roles across Bend, Redmond, Sisters, Prineville, Madras, and La Pine.',
      tags: ['volunteer', 'nonprofits', 'service', 'community'],
      url: 'https://volunteer.connectcentraloregon.org/',
      status: 'Open',
    },
    {
      id: 'cocc-volunteer-connect',
      type: 'training',
      title: 'Service-learning and volunteer placement',
      org: 'Volunteer Connect / COCC',
      city: 'Bend',
      source: 'Public program page',
      fit: ['learn', 'serve'],
      commitment: 'Student and community pathways',
      summary: 'Connects classroom learning and community service, with regional volunteer guidance and service-learning opportunities.',
      tags: ['service learning', 'students', 'volunteer', 'training'],
      url: 'https://cocc.edu/departments/student-life/volunteer/volunteer-connect',
      status: 'Learn',
    },
    {
      id: 'council-aging-training',
      type: 'training',
      title: 'CoA 101 volunteer training',
      org: 'Council on Aging of Central Oregon',
      city: 'Bend',
      source: 'Volunteer portal',
      fit: ['learn', 'serve'],
      commitment: 'Orientation sessions',
      summary: 'Training for volunteers supporting older adults through meals, resources, connection, and community care.',
      tags: ['seniors', 'meals', 'training', 'care'],
      url: 'https://www.councilonaging.org/volunteer-portal/',
      status: 'Training',
    },
    {
      id: 'habitat-restore',
      type: 'project',
      title: 'ReStore volunteer shifts',
      org: 'Bend-Redmond Habitat for Humanity ReStore',
      city: 'Bend',
      source: 'Partner volunteer page',
      fit: ['serve'],
      commitment: 'Regular shifts',
      summary: 'Help with receiving, merchandising, greeting shoppers, cashiering, and community-service pathways supporting affordable homeownership.',
      tags: ['housing', 'restore', 'volunteer', 'retail'],
      url: 'https://restorebend.org/volunteer/',
      status: 'Open',
    },
    {
      id: 'saving-grace-volunteer',
      type: 'training',
      title: 'Survivor support volunteer training',
      org: 'Saving Grace',
      city: 'Bend',
      source: 'Volunteer page',
      fit: ['learn', 'serve'],
      commitment: 'Application and in-person training',
      summary: 'Training pathway for volunteers supporting survivors of intimate partner violence and sexual assault in Central Oregon.',
      tags: ['survivors', 'training', 'advocacy', 'care'],
      url: 'https://www.saving-grace.org/volunteer',
      status: 'Apply',
    },
    {
      id: 'think-wild-family',
      type: 'project',
      title: 'Youth and family wildlife volunteer opportunities',
      org: 'Think Wild',
      city: 'Bend',
      source: 'Public announcement',
      fit: ['serve', 'learn'],
      commitment: '1-2 times per month',
      summary: 'Hands-on conservation support including enrichment prep, pollinator garden work, facility upkeep, and youth/family projects.',
      tags: ['wildlife', 'youth', 'family', 'conservation'],
      url: 'https://www.bendsource.com/business/businessnews/think-wild-announces-new-youth-and-family-volunteer-opportunities/',
      status: 'New',
    },
    {
      id: 'co-peer-services',
      type: 'group',
      title: 'Peer support and sober living service team',
      org: 'Central Oregon Peer Services',
      city: 'Bend',
      source: 'Volunteer page',
      fit: ['serve', 'belong', 'lead'],
      commitment: 'Application-based',
      summary: 'Relationship-centered outreach, peer support, discipleship, mentoring, and sober living support.',
      tags: ['recovery', 'mentoring', 'peer support', 'discipleship'],
      url: 'https://www.co-ps.org/volunteer',
      status: 'Apply',
    },
    {
      id: 'kiwanis-bend',
      type: 'group',
      title: 'Youth-first service projects',
      org: 'Kiwanis Club of Bend',
      city: 'Bend',
      source: 'Club site',
      fit: ['serve', 'belong', 'lead'],
      commitment: 'Meetings and projects',
      summary: 'Community service network focused on youth, food bank shifts, coat drives, mentorship, resources, and practical local projects.',
      tags: ['youth', 'service club', 'mentorship', 'food bank'],
      url: 'https://bendkiwanis.org/',
      status: 'Join',
    },
    {
      id: 'covo-veterans',
      type: 'project',
      title: 'Veterans outreach volunteer support',
      org: 'Central Oregon Veterans Outreach',
      city: 'Bend',
      source: 'Volunteer page',
      fit: ['serve'],
      commitment: 'Application or drop-in inquiry',
      summary: 'Volunteer with a local organization serving veterans through outreach, support, and community connection.',
      tags: ['veterans', 'outreach', 'service', 'support'],
      url: 'https://covo-us.org/volunteer/',
      status: 'Open',
    },
    {
      id: 'soroptimist-bend',
      type: 'group',
      title: 'Women and girls economic empowerment',
      org: 'Soroptimist International of Bend',
      city: 'Bend',
      source: 'Club site',
      fit: ['belong', 'serve', 'lead'],
      commitment: 'Club programs and presentations',
      summary: 'Community members support education, economic empowerment, and awareness efforts for women and girls.',
      tags: ['women', 'education', 'economic empowerment', 'community'],
      url: 'https://www.sibend.org/',
      status: 'Join',
    },
    {
      id: 'newcomers-bend',
      type: 'group',
      title: 'Hospitality and newcomer connection',
      org: 'Newcomers Club of Bend',
      city: 'Bend',
      source: 'Club calendar',
      fit: ['belong'],
      commitment: 'Events and interest groups',
      summary: 'A connection pathway for people getting rooted in the Bend community through hospitality events and local groups.',
      tags: ['newcomers', 'friendship', 'events', 'community'],
      url: 'https://www.newcomersclubofbend.org/page-18211',
      status: 'Explore',
    },
    {
      id: 'family-kitchen',
      type: 'project',
      title: 'Meal service volunteer pathway',
      org: 'Family Kitchen style partner lead',
      city: 'Regional',
      source: 'Community lead',
      fit: ['serve'],
      commitment: 'Meal shifts',
      summary: 'Meal prep, serving, and hospitality roles are a natural fit for church groups, families, and service teams.',
      tags: ['meals', 'hospitality', 'food', 'service'],
      url: 'https://volunteer.connectcentraloregon.org/',
      status: 'Find shifts',
    },
    {
      id: 'nami-central-oregon',
      type: 'group',
      title: 'Mental health education and support',
      org: 'NAMI Central Oregon listing',
      city: 'Regional',
      source: 'Connect Central Oregon',
      fit: ['learn', 'serve', 'belong'],
      commitment: 'Ongoing',
      summary: 'Mental health support, education, and volunteer pathways surfaced through regional volunteer listings.',
      tags: ['mental health', 'education', 'support', 'volunteer'],
      url: 'https://volunteer.connectcentraloregon.org/',
      status: 'Ongoing',
    },
    {
      id: 'pollinator-pathway',
      type: 'event',
      title: 'Pollinator pathway volunteer projects',
      org: 'Regional conservation partners',
      city: 'Bend',
      source: 'Connect Central Oregon',
      fit: ['serve', 'learn'],
      commitment: 'Seasonal projects',
      summary: 'Hands-on outdoor projects for pollinator habitat, native plants, and community conservation.',
      tags: ['pollinator', 'outdoors', 'conservation', 'family'],
      url: 'https://volunteer.connectcentraloregon.org/',
      status: 'Seasonal',
    },
    {
      id: 'church-small-groups',
      type: 'group',
      title: 'Church small groups and care teams',
      org: 'Good Fruit partner churches',
      city: 'Regional',
      source: 'Partner-submitted',
      fit: ['belong', 'serve'],
      commitment: 'Weekly or monthly',
      summary: 'A permission-based place for churches to publish small groups, care teams, prayer teams, and service crews.',
      tags: ['church', 'small group', 'care team', 'prayer'],
      url: '',
      status: 'Partner',
    },
    {
      id: 'skill-night',
      type: 'event',
      title: 'Practical skills night',
      org: 'Good Fruit pilot',
      city: 'Redmond',
      source: 'Prototype event',
      fit: ['learn', 'belong'],
      commitment: 'One evening',
      summary: 'A pilot format for budgeting, resume help, home repair basics, meal planning, and mentorship signups.',
      tags: ['budgeting', 'resume', 'home repair', 'mentorship'],
      url: '',
      status: 'Pilot',
    },
  ];

  const els = {
    search: document.getElementById('connect-search'),
    city: document.getElementById('connect-city'),
    fit: document.getElementById('connect-fit'),
    count: document.getElementById('connect-count'),
    trainings: document.getElementById('connect-training-count'),
    cities: document.getElementById('connect-city-count'),
    panels: {
      all: document.getElementById('panel-opportunities'),
      group: document.getElementById('panel-groups'),
      event: document.getElementById('panel-events'),
      training: document.getElementById('panel-trainings'),
      project: document.getElementById('panel-projects'),
    },
  };

  if (!els.panels.all) return;

  let filtered = OPPORTUNITIES;

  function escapeHtml(value) {
    return String(value || '').replace(/[&<>"']/g, (char) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;',
    })[char]);
  }

  function typeLabel(type) {
    return type.charAt(0).toUpperCase() + type.slice(1);
  }

  function badgeClass(type) {
    if (type === 'training') return 'badge-lime';
    if (type === 'project') return 'badge-teal';
    if (type === 'event') return 'badge-coral';
    return 'badge-slate';
  }

  function iconFor(type) {
    if (type === 'training') return 'T';
    if (type === 'project') return 'P';
    if (type === 'event') return 'E';
    return 'G';
  }

  function searchText(item) {
    return [
      item.title,
      item.org,
      item.city,
      item.source,
      item.commitment,
      item.summary,
      item.status,
      ...item.fit,
      ...item.tags,
    ].join(' ').toLowerCase();
  }

  function card(item) {
    const action = item.type === 'training' ? 'Start training' : item.type === 'group' ? 'Join group' : item.type === 'event' ? 'View event' : 'Plug in';
    return `
      <article class="card connect-card" data-type="${escapeHtml(item.type)}">
        <div class="connect-card__head">
          <div class="row-tight" style="align-items:flex-start;">
            <div class="connect-type-icon" aria-hidden="true">${iconFor(item.type)}</div>
            <div>
              <span class="connect-card__source">${escapeHtml(item.source)}</span>
              <h3 style="margin: 3px 0 2px;">${escapeHtml(item.title)}</h3>
              <p class="text-xs text-muted">${escapeHtml(item.org)} · ${escapeHtml(item.city)}</p>
            </div>
          </div>
          <span class="badge ${badgeClass(item.type)}">${escapeHtml(typeLabel(item.type))}</span>
        </div>
        <p class="text-sm text-secondary">${escapeHtml(item.summary)}</p>
        <div class="connect-card__meta">
          <span class="badge badge-slate">${escapeHtml(item.commitment)}</span>
          ${item.fit.map((fit) => `<span class="skill-tag">${escapeHtml(fit)}</span>`).join('')}
          ${item.tags.slice(0, 3).map((tag) => `<span class="skill-tag">${escapeHtml(tag)}</span>`).join('')}
        </div>
        <div class="connect-card__actions">
          ${item.url ? `<a class="btn btn-primary btn-sm" href="${escapeHtml(item.url)}" target="_blank" rel="noreferrer">${action}</a>` : `<button class="btn btn-primary btn-sm" type="button">${action}</button>`}
          <button class="btn btn-ghost btn-sm" type="button">Save</button>
          <span class="badge badge-green">${escapeHtml(item.status)}</span>
        </div>
      </article>`;
  }

  function renderPanel(panel, items) {
    if (!panel) return;
    if (!items.length) {
      panel.innerHTML = '<article class="card connect-empty"><p class="text-secondary" style="margin:0;">No matching opportunities yet. Try widening the filters.</p></article>';
      return;
    }
    panel.innerHTML = items.map(card).join('');
  }

  function renderStats() {
    els.count.textContent = filtered.length;
    els.trainings.textContent = filtered.filter((item) => item.type === 'training').length;
    els.cities.textContent = new Set(filtered.map((item) => item.city).filter((city) => city !== 'Regional')).size;
  }

  function applyFilters() {
    const query = (els.search.value || '').trim().toLowerCase();
    const city = els.city.value;
    const fit = els.fit.value;
    filtered = OPPORTUNITIES.filter((item) => {
      const cityMatch = city === 'all' || item.city === city || item.city === 'Regional';
      const fitMatch = fit === 'all' || item.fit.includes(fit);
      const queryMatch = !query || searchText(item).includes(query);
      return cityMatch && fitMatch && queryMatch;
    });
    renderStats();
    renderPanel(els.panels.all, filtered);
    renderPanel(els.panels.group, filtered.filter((item) => item.type === 'group'));
    renderPanel(els.panels.event, filtered.filter((item) => item.type === 'event'));
    renderPanel(els.panels.training, filtered.filter((item) => item.type === 'training'));
    renderPanel(els.panels.project, filtered.filter((item) => item.type === 'project'));
  }

  function bindControls() {
    els.search.addEventListener('input', applyFilters);
    els.city.addEventListener('change', applyFilters);
    els.fit.addEventListener('change', applyFilters);
    document.querySelector('[data-testid="btn-refresh-connect"]')?.addEventListener('click', () => {
      if (window.GF_TOAST) window.GF_TOAST('Connect leads refreshed from approved public and partner sources', { tone: 'success' });
    });
    document.addEventListener('click', (event) => {
      const button = event.target.closest('.connect-card button');
      if (!button || !window.GF_TOAST) return;
      window.GF_TOAST(`${button.textContent.trim()} added to your Good Fruit path`, { tone: 'success' });
    });
  }

  bindControls();
  applyFilters();
})();
