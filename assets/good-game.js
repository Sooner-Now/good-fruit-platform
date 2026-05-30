(function () {
  'use strict';

  const state = window.GF_STATE || {};
  const game = {
    waterDaily: 100,
    waterAvailable: 64,
    sunlightAvailable: 18,
    level: 'Young Tree',
    nextLevel: 'Mature Tree',
    fruit: 720,
    nextFruit: 1000,
  };

  const quests = [
    {
      title: 'Bend pantry restock',
      orchard: 'Central Oregon Orchard',
      type: 'Compassion Fruit',
      reward: '+80 fruit · +12 compassion',
      progress: 68,
      team: '9 of 12 teamed up',
      text: 'Bring pantry staples, sponsor a grocery card, or help deliver boxes to two families.',
      href: 'needs.html',
    },
    {
      title: 'Prayer chain for hospital families',
      orchard: 'Prayer Orchard',
      type: 'Faith Fruit',
      reward: '+45 fruit · prayer streak boost',
      progress: 42,
      team: '17 people still praying',
      text: 'Join a 48-hour prayer chain and check back with an encouragement update.',
      href: 'prayer.html',
    },
    {
      title: 'Skill night launch team',
      orchard: 'Learning Orchard',
      type: 'Growth Fruit',
      reward: '+60 fruit · teaching badge progress',
      progress: 55,
      team: '5 of 8 roles filled',
      text: 'Help run budgeting, resume, and home repair stations for neighbors building capacity.',
      href: 'learn.html',
    },
  ];

  const goodFeed = [
    {
      title: 'Three rides covered this week',
      source: 'Prineville driver team',
      impact: ['3 rides given', '2 helpers teamed up', '+36 fellowship'],
      text: 'A recovery group request was matched with volunteer drivers. The team is now recruiting backup drivers.',
      action: 'Share sunlight',
    },
    {
      title: 'Furniture moved into a restart apartment',
      source: 'Needs + Marketplace match',
      impact: ['1 family helped', '4 items delivered', '+52 compassion'],
      text: 'A free dresser and bed frames were picked up, cleaned, and delivered by a local care team.',
      action: 'Lift story',
    },
    {
      title: 'First CPR cohort forming',
      source: 'Learning Orchard',
      impact: ['8 seats saved', 'care teams invited', '+28 growth'],
      text: 'Church volunteers are forming a CPR/AED class so childcare and outreach teams are better prepared.',
      action: 'Invite team',
    },
  ];

  const fruitMap = [
    { name: 'Compassion Fruit', value: 148, text: 'Helping needs, giving rides, delivering meals.', soft: '#d1fae5' },
    { name: 'Wisdom Fruit', value: 72, text: 'Mentoring, teaching, answering questions.', soft: '#fef9c3' },
    { name: 'Faith Fruit', value: 186, text: 'Prayer, encouragement, answered-prayer updates.', soft: '#ffd7c8' },
    { name: 'Stewardship Fruit', value: 94, text: 'Honest marketplace activity and trusted giving.', soft: '#ccfbf1' },
    { name: 'Growth Fruit', value: 121, text: 'Courses, certifications, and skill building.', soft: '#ecfccb' },
    { name: 'Fellowship Fruit', value: 99, text: 'Joining groups, events, projects, and teams.', soft: '#ede9fe' },
  ];

  const orchards = [
    { name: 'Central Oregon Orchard', role: 'Reliable encourager', progress: 74, goal: '100 verified acts of service this month' },
    { name: 'Journey Church Orchard', role: 'Care team helper', progress: 46, goal: 'Launch three prayer-and-needs circles' },
    { name: 'Learning Orchard', role: 'Skill builder', progress: 58, goal: 'Train 25 people in practical readiness' },
  ];

  const trustLayers = [
    { name: 'Verified community', earned: true, detail: 'Connected to a partner church or local group.' },
    { name: 'Helper history', earned: true, detail: 'Completed confirmed help actions over time.' },
    { name: 'Mentor endorsement', earned: false, detail: 'Unlocked when a mentor or leader confirms readiness.' },
    { name: 'Teaching permission', earned: false, detail: 'Unlocked through learning completion and community trust.' },
  ];

  function toast(message) {
    if (window.GF_TOAST) window.GF_TOAST(message, { tone: 'success' });
  }

  function renderQuests() {
    const root = document.querySelector('[data-game-quests]');
    if (!root) return;
    root.innerHTML = quests.map((quest, index) => `
      <article class="card quest-card">
        <div class="quest-card__head">
          <div>
            <p class="section-eyebrow">${quest.orchard}</p>
            <h3>${quest.title}</h3>
          </div>
          <span class="badge badge-lime">${quest.type}</span>
        </div>
        <p class="text-sm text-secondary">${quest.text}</p>
        <div class="progress"><div class="progress__bar" style="width:${quest.progress}%;"></div></div>
        <div class="quest-card__team">
          <span class="badge badge-slate">${quest.team}</span>
          <span class="badge badge-gold">${quest.reward}</span>
        </div>
        <div class="quest-card__actions">
          <a class="btn btn-primary btn-sm game-action" href="${quest.href}">Join quest</a>
          <button class="btn btn-ghost btn-sm game-action" data-quest="${index}" type="button">Invite teammate</button>
        </div>
      </article>
    `).join('');
  }

  function renderGoodFeed() {
    const root = document.querySelector('[data-good-feed]');
    if (!root) return;
    root.innerHTML = goodFeed.map((item, index) => `
      <article class="card good-card">
        <div class="good-card__head">
          <div>
            <p class="section-eyebrow">${item.source}</p>
            <h3>${item.title}</h3>
          </div>
          <span class="badge badge-green">Bore fruit</span>
        </div>
        <p class="text-sm text-secondary">${item.text}</p>
        <div class="good-card__impact">
          ${item.impact.map((impact) => `<span class="skill-tag">${impact}</span>`).join('')}
        </div>
        <div class="good-card__actions">
          <button class="btn btn-primary btn-sm game-action" data-good="${index}" type="button">${item.action}</button>
          <button class="btn btn-ghost btn-sm game-action" type="button">Encourage</button>
        </div>
      </article>
    `).join('');
  }

  function renderFruitMap() {
    const root = document.querySelector('[data-fruit-map]');
    if (!root) return;
    root.innerHTML = fruitMap.map((fruit) => `
      <article class="card fruit-map-card" style="--fruit-soft:${fruit.soft};">
        <p class="section-eyebrow">${fruit.name}</p>
        <div class="fruit-map-card__value tabular">${fruit.value}</div>
        <p class="text-sm text-secondary">${fruit.text}</p>
        <div class="fruit-map-card__meta">
          <span class="badge badge-slate">Identity growth</span>
        </div>
      </article>
    `).join('');
  }

  function renderOrchards() {
    const root = document.querySelector('[data-orchards]');
    if (!root) return;
    root.innerHTML = orchards.map((orchard) => `
      <article class="card orchard-card">
        <div class="orchard-card__head">
          <div>
            <p class="section-eyebrow">${orchard.role}</p>
            <h3>${orchard.name}</h3>
          </div>
          <span class="badge badge-lime">${orchard.progress}%</span>
        </div>
        <p class="text-sm text-secondary">${orchard.goal}</p>
        <div class="orchard-card__bar"><span style="width:${orchard.progress}%;"></span></div>
        <div class="orchard-card__meta">
          <span class="badge badge-green">Collective growth</span>
        </div>
      </article>
    `).join('');
  }

  function renderTrustLayers() {
    const root = document.querySelector('[data-trust-layers]');
    if (!root) return;
    root.innerHTML = trustLayers.map((layer) => `
      <article class="card trust-layer-card ${layer.earned ? 'is-earned' : ''}">
        <div class="trust-layer-card__head">
          <div>
            <p class="section-eyebrow">${layer.earned ? 'Earned' : 'Locked'}</p>
            <h3>${layer.name}</h3>
          </div>
          <span class="badge ${layer.earned ? 'badge-green' : 'badge-slate'}">${layer.earned ? 'Trusted' : 'Next'}</span>
        </div>
        <p class="text-sm text-secondary">${layer.detail}</p>
      </article>
    `).join('');
  }

  function bindActions() {
    document.addEventListener('click', (event) => {
      const quest = event.target.closest('[data-quest]');
      if (quest) {
        toast('Teammate invited · +8 Fellowship Fruit');
        return;
      }
      const good = event.target.closest('[data-good]');
      if (good) {
        toast('Shared sunlight · good story lifted');
        return;
      }
      if (event.target.closest('[data-game-promote]')) {
        toast('Good story composer ready · +Sunlight when verified');
      }
    });
  }

  function init() {
    renderQuests();
    renderGoodFeed();
    renderFruitMap();
    renderOrchards();
    renderTrustLayers();
    bindActions();
    window.GF_GAME = { game, quests, fruitMap, orchards, trustLayers };
    if (state.plant) state.plant.game = game;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
