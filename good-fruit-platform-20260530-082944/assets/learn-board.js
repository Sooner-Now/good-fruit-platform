(function () {
  'use strict';

  const PATHS = [
    {
      id: 'cocc-workforce',
      title: 'Workforce and professional development',
      provider: 'cocc',
      providerLabel: 'COCC Center for Business',
      category: 'career',
      level: 'advanced',
      format: 'hybrid',
      duration: 'Varies',
      credential: 'Course completion',
      summary: 'Leadership, project management, business communication, health care, trades, license prep, and professional development courses.',
      tags: ['leadership', 'project management', 'health care', 'trades'],
      url: 'https://cocc.edu/departments/center-business-industry/workforce-training-draft1',
    },
    {
      id: 'license-cert-prep',
      title: 'License and certification prep',
      provider: 'cocc',
      providerLabel: 'COCC workforce training',
      category: 'certification',
      level: 'certification',
      format: 'hybrid',
      duration: 'Short course',
      credential: 'Certification prep',
      summary: 'Preparation pathway for workers pursuing industry licenses, professional credentials, and continuing education requirements.',
      tags: ['license', 'certification', 'professional', 'career'],
      url: 'https://cocc.edu/departments/center-business-industry/workforce-training-draft1',
    },
    {
      id: 'cpr-first-aid',
      title: 'Heartsaver First Aid CPR/AED',
      provider: 'cocc',
      providerLabel: 'COCC Community Education',
      category: 'certification',
      level: 'certification',
      format: 'in-person',
      duration: 'One-day training',
      credential: 'First Aid CPR/AED',
      summary: 'Practical emergency-response certification useful for volunteers, childcare helpers, coaches, care teams, and workplace safety.',
      tags: ['CPR', 'first aid', 'AED', 'safety'],
      url: 'https://cocc.edu/departments/community-ed/',
    },
    {
      id: 'wilderness-life-support',
      title: 'Basic Wilderness Life Support',
      provider: 'cocc',
      providerLabel: 'COCC Community Education',
      category: 'certification',
      level: 'certification',
      format: 'in-person',
      duration: 'Short course',
      credential: 'Wilderness readiness',
      summary: 'Outdoor emergency skills for Central Oregon volunteers, youth leaders, camp teams, hikers, and field-service crews.',
      tags: ['wilderness', 'first aid', 'outdoors', 'safety'],
      url: 'https://cocc.edu/departments/community-ed/',
    },
    {
      id: 'adult-basic-skills',
      title: 'Adult basic skills, GED, and English learning',
      provider: 'cocc',
      providerLabel: 'COCC',
      category: 'skills',
      level: 'entry',
      format: 'in-person',
      duration: 'Ongoing',
      credential: 'GED / foundational skills',
      summary: 'Foundational reading, writing, English language, GED, and transition support into workforce or academic programs.',
      tags: ['GED', 'English', 'adult education', 'foundational'],
      url: 'https://cocc.edu/',
    },
    {
      id: 'community-ed',
      title: 'Community education and enrichment',
      provider: 'cocc',
      providerLabel: 'COCC Community Education',
      category: 'skills',
      level: 'entry',
      format: 'hybrid',
      duration: 'Short sessions',
      credential: 'Personal enrichment',
      summary: 'Hands-on learning in gardening, cooking, languages, art, photography, fitness, outdoor recreation, and practical life skills.',
      tags: ['gardening', 'cooking', 'languages', 'creative skills'],
      url: 'https://cocc.edu/departments/community-ed/',
    },
    {
      id: 'apprenticeship',
      title: 'Skilled trades apprenticeship pathway',
      provider: 'cocc',
      providerLabel: 'COCC Apprenticeship',
      category: 'career',
      level: 'advanced',
      format: 'hybrid',
      duration: 'Multi-year',
      credential: 'Apprenticeship progress',
      summary: 'Classroom learning plus on-site employer training for people pursuing skilled trades careers.',
      tags: ['apprenticeship', 'trades', 'employment', 'hands-on'],
      url: 'https://ouprod.cocc.edu/programs/special-curriculum/apprenticeship/default.aspx',
    },
    {
      id: 'welding',
      title: 'Welding technology certificate pathway',
      provider: 'cocc',
      providerLabel: 'COCC Manufacturing Technology',
      category: 'certification',
      level: 'certification',
      format: 'in-person',
      duration: 'Certificate pathway',
      credential: 'Welding CPCC / AWS prep',
      summary: 'Short-term welding pathway and test prep for entry-level production welding and manufacturing work.',
      tags: ['welding', 'manufacturing', 'trades', 'AWS'],
      url: 'https://catalog.cocc.edu/degrees-and-certificates/manufacturing-technology/',
    },
    {
      id: 'youthbuild',
      title: 'YouthBuild education and construction skills',
      provider: 'heart',
      providerLabel: 'Heart of Oregon Corps',
      category: 'career',
      level: 'entry',
      format: 'in-person',
      duration: 'Program-based',
      credential: 'GED / diploma / college credits',
      summary: 'Young adults build job skills, earn education credentials, serve the community, and train through affordable housing projects.',
      tags: ['construction', 'GED', 'leadership', 'housing'],
      url: 'https://heartoforegon.org/programs/youthbuild.html',
    },
    {
      id: 'sbdc-business',
      title: 'Small business advising and training',
      provider: 'sbdc',
      providerLabel: 'COCC Small Business Development Center',
      category: 'career',
      level: 'entry',
      format: 'hybrid',
      duration: 'Advising and workshops',
      credential: 'Business skill building',
      summary: 'Support for entrepreneurs and small businesses: advising, business planning, marketing, finance, and growth basics.',
      tags: ['small business', 'entrepreneurship', 'finance', 'marketing'],
      url: 'https://cocc.edu/',
    },
    {
      id: 'computer-office',
      title: 'Computer, web, and office productivity',
      provider: 'cocc',
      providerLabel: 'COCC workforce training',
      category: 'skills',
      level: 'entry',
      format: 'online',
      duration: 'Short courses',
      credential: 'Digital skills',
      summary: 'Computer basics, web tools, office productivity, and workplace technology skills for career readiness.',
      tags: ['computer', 'office', 'web', 'productivity'],
      url: 'https://cocc.edu/departments/center-business-industry/workforce-training-draft1',
    },
    {
      id: 'it-cert-training',
      title: 'IT and Microsoft Office certification courses',
      provider: 'online',
      providerLabel: 'Online training provider',
      category: 'certification',
      level: 'certification',
      format: 'online',
      duration: 'Self-paced or instructor-led',
      credential: 'IT certification prep',
      summary: 'Computer training options for Microsoft Office, basic IT, and technical certification preparation in the Bend service area.',
      tags: ['IT', 'Microsoft Office', 'certification', 'technology'],
      url: 'https://training.certstaff.com/location/557/Bend-Oregon',
    },
    {
      id: 'care-team-basics',
      title: 'Care team basics',
      provider: 'partner',
      providerLabel: 'Good Fruit partner course',
      category: 'service',
      level: 'entry',
      format: 'online',
      duration: '2 hours',
      credential: 'Partner badge',
      summary: 'Prepare volunteers to listen well, protect privacy, escalate urgent needs, and serve without overpromising.',
      tags: ['care team', 'privacy', 'listening', 'volunteer'],
      url: '',
    },
    {
      id: 'budgeting-stewardship',
      title: 'Budgeting and financial stewardship',
      provider: 'partner',
      providerLabel: 'Good Fruit partner course',
      category: 'skills',
      level: 'entry',
      format: 'online',
      duration: '4 lessons',
      credential: 'Skill badge',
      summary: 'Personal budgeting, debt triage, emergency funds, generosity planning, and practical money conversations.',
      tags: ['budgeting', 'finance', 'debt', 'stewardship'],
      url: '',
    },
    {
      id: 'small-group-leader',
      title: 'Small group leader readiness',
      provider: 'partner',
      providerLabel: 'Church partner course',
      category: 'service',
      level: 'entry',
      format: 'hybrid',
      duration: '3 sessions',
      credential: 'Leader badge',
      summary: 'Facilitation basics, hospitality, prayer, discussion safety, follow-up rhythms, and referral boundaries.',
      tags: ['small group', 'leadership', 'hospitality', 'church'],
      url: '',
    },
  ];

  const els = {
    search: document.getElementById('learn-search'),
    provider: document.getElementById('learn-provider'),
    format: document.getElementById('learn-format'),
    count: document.getElementById('learn-count'),
    certCount: document.getElementById('learn-cert-count'),
    providerCount: document.getElementById('learn-provider-count'),
    panels: {
      all: document.getElementById('panel-all'),
      certification: document.getElementById('panel-cert'),
      skills: document.getElementById('panel-skills'),
      career: document.getElementById('panel-career'),
      service: document.getElementById('panel-service'),
    },
  };

  if (!els.panels.all) return;

  let filtered = PATHS;

  function escapeHtml(value) {
    return String(value || '').replace(/[&<>"']/g, (char) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;',
    })[char]);
  }

  function searchText(path) {
    return [
      path.title,
      path.providerLabel,
      path.category,
      path.level,
      path.format,
      path.duration,
      path.credential,
      path.summary,
      ...path.tags,
    ].join(' ').toLowerCase();
  }

  function badgeFor(category) {
    if (category === 'certification') return 'badge-gold';
    if (category === 'career') return 'badge-teal';
    if (category === 'service') return 'badge-lime';
    return 'badge-slate';
  }

  function initials(text) {
    return text.split(/\s+/).map((part) => part[0]).join('').slice(0, 2).toUpperCase();
  }

  function card(path) {
    const action = path.url ? 'Open path' : 'Join waitlist';
    return `
      <article class="card learn-card" data-level="${escapeHtml(path.level)}">
        <div class="learn-card__head">
          <div class="row-tight" style="align-items:flex-start;">
            <div class="learn-card__icon" aria-hidden="true">${escapeHtml(initials(path.title))}</div>
            <div>
              <p class="section-eyebrow">${escapeHtml(path.providerLabel)}</p>
              <h3 style="margin: 3px 0 2px;">${escapeHtml(path.title)}</h3>
              <p class="text-xs text-muted">${escapeHtml(path.duration)} · ${escapeHtml(path.format)} · ${escapeHtml(path.credential)}</p>
            </div>
          </div>
          <span class="badge ${badgeFor(path.category)}">${escapeHtml(path.category)}</span>
        </div>
        <p class="text-sm text-secondary">${escapeHtml(path.summary)}</p>
        <div class="learn-card__meta">
          <span class="badge badge-slate">${escapeHtml(path.level)}</span>
          ${path.tags.slice(0, 4).map((tag) => `<span class="skill-tag">${escapeHtml(tag)}</span>`).join('')}
        </div>
        <div class="learn-card__actions">
          ${path.url ? `<a class="btn btn-primary btn-sm" href="${escapeHtml(path.url)}" target="_blank" rel="noreferrer">${action}</a>` : `<button class="btn btn-primary btn-sm" type="button">${action}</button>`}
          <button class="btn btn-ghost btn-sm" type="button">Save</button>
        </div>
      </article>`;
  }

  function renderPanel(panel, items) {
    if (!items.length) {
      panel.innerHTML = '<article class="card learn-empty"><p class="text-secondary" style="margin:0;">No matching learning paths yet. Try widening the filters.</p></article>';
      return;
    }
    panel.innerHTML = items.map(card).join('');
  }

  function renderStats() {
    els.count.textContent = filtered.length;
    els.certCount.textContent = filtered.filter((path) => path.category === 'certification').length;
    els.providerCount.textContent = new Set(filtered.map((path) => path.provider)).size;
  }

  function applyFilters() {
    const query = (els.search.value || '').trim().toLowerCase();
    const provider = els.provider.value;
    const format = els.format.value;
    filtered = PATHS.filter((path) => {
      const providerMatch = provider === 'all' || path.provider === provider;
      const formatMatch = format === 'all' || path.format === format;
      const queryMatch = !query || searchText(path).includes(query);
      return providerMatch && formatMatch && queryMatch;
    });
    renderStats();
    renderPanel(els.panels.all, filtered);
    renderPanel(els.panels.certification, filtered.filter((path) => path.category === 'certification'));
    renderPanel(els.panels.skills, filtered.filter((path) => path.category === 'skills'));
    renderPanel(els.panels.career, filtered.filter((path) => path.category === 'career'));
    renderPanel(els.panels.service, filtered.filter((path) => path.category === 'service'));
  }

  function bindControls() {
    els.search.addEventListener('input', applyFilters);
    els.provider.addEventListener('change', applyFilters);
    els.format.addEventListener('change', applyFilters);
    document.querySelector('[data-testid="btn-refresh-learn"]')?.addEventListener('click', () => {
      if (window.GF_TOAST) window.GF_TOAST('Learning paths refreshed from public and partner sources', { tone: 'success' });
    });
    document.addEventListener('click', (event) => {
      const button = event.target.closest('.learn-card button');
      if (!button || !window.GF_TOAST) return;
      window.GF_TOAST(`${button.textContent.trim()} added to your growth path`, { tone: 'success' });
    });
  }

  bindControls();
  applyFilters();
})();
