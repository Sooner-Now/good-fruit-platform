/* =========================================================================
   Good Fruit Platform — Shared client-side helpers
   - Renders the persistent header + bottom nav into every page
   - In-memory app state (no localStorage / sessionStorage / cookies)
   - Toast feedback, tabs, chips, focus management, share helpers
   ========================================================================= */

(function () {
  'use strict';

  /* -----------------------------------------------------------------------
     In-memory app state. Resets on page reload — by design (sandbox-safe).
     ----------------------------------------------------------------------- */
  const state = (window.GF_STATE = window.GF_STATE || {
    user: {
      name: 'Hannah Pereira',
      handle: '@hannahp',
      initials: 'HP',
    },
    plant: {
      level: 4,
      levelName: 'Young Tree',
      emoji: '🌳',
      points: 720,
      pointsToNext: 1000,
      water: 47,
      sunlight: 32,
      streak: 12,
    },
    bookmarks: [
      { id: 'PSA23-1', ref: 'Psalm 23:1', text: 'The LORD is my shepherd; I shall not want.' },
      { id: 'PHP4-13', ref: 'Philippians 4:13', text: 'I can do all things through Christ who strengthens me.' },
    ],
    bible: {
      book: 'John',
      chapter: 1,
      mode: 'comfortable',
      size: 17,
    },
    profileDraft: {
      name: '',
      city: '',
      church: '',
      focus: '',
      gifts: [],
    },
  });

  const params = new URLSearchParams(window.location.search);
  if (params.get('name')) {
    const fullName = params.get('name').trim();
    const initials = fullName.split(/\s+/).slice(0, 2).map((part) => part[0]).join('').toUpperCase();
    state.user.name = fullName;
    state.user.initials = initials || 'GF';
    state.user.handle = `@${fullName.toLowerCase().replace(/[^a-z0-9]+/g, '').slice(0, 12) || 'goodfruit'}`;
  }
  if (params.get('city')) state.profileDraft.city = params.get('city').trim();
  if (params.get('church')) state.profileDraft.church = params.get('church').trim();
  if (params.get('focus')) state.profileDraft.focus = params.get('focus').trim();

  const LOCAL_SOURCES = [
    {
      type: 'church',
      name: 'Neighborhood church partner',
      area: 'Your city',
      feed: ['connect', 'prayer', 'needs', 'home'],
      headline: 'Prayer team, mentors, volunteer events',
      detail: 'Use this slot for churches that want to publish prayer requests, events, small groups, and member needs.',
      action: 'Invite church',
      badge: 'Church',
      color: 'turquoise',
    },
    {
      type: 'community',
      name: 'Local community group',
      area: 'Your neighborhood',
      feed: ['connect', 'needs', 'home'],
      headline: 'Block cleanups, mutual aid, neighborhood gatherings',
      detail: 'Community groups can surface service projects and urgent needs without replacing church relationships.',
      action: 'Add group',
      badge: 'Community',
      color: 'lime',
    },
    {
      type: 'business',
      name: 'Faith-friendly local business',
      area: 'Nearby',
      feed: ['market', 'learn', 'needs', 'home'],
      headline: 'Jobs, discounts, apprenticeships, donated goods',
      detail: 'Businesses can offer services, sponsor needs, host events, or post entry-level opportunities.',
      action: 'Add business',
      badge: 'Business',
      color: 'gold',
    },
    {
      type: 'school',
      name: 'Training or ministry partner',
      area: 'Regional',
      feed: ['learn', 'connect'],
      headline: 'Courses, certifications, workshops',
      detail: 'Schools and ministry partners populate the learning feed with verified growth opportunities.',
      action: 'Connect school',
      badge: 'Partner',
      color: 'coral',
    },
  ];

  function localIcon(type) {
    return type === 'church' ? '⛪' : type === 'business' ? '🏪' : type === 'school' ? '🎓' : '🏘️';
  }

  function renderLocalFeed(el) {
    const feed = el.dataset.feed || 'home';
    const title = el.dataset.title || 'Local discovery';
    const city = state.profileDraft.city || el.dataset.city || 'Set your city';
    const items = LOCAL_SOURCES.filter((item) => item.feed.includes(feed));
    el.innerHTML = `
      <section class="local-feed card" data-testid="section-local-${feed}">
        <div class="local-feed__head">
          <div>
            <p class="section-eyebrow">Local roots</p>
            <h2>${title}</h2>
            <p class="text-sm text-secondary">Comb churches, community groups, and businesses near <strong>${city}</strong> to keep this feed alive.</p>
          </div>
          <button class="btn btn-primary btn-sm" data-testid="button-scan-local-${feed}">Scan local</button>
        </div>
        <div class="local-source-grid">
          ${items.map((item, index) => `
            <article class="local-source local-source--${item.color}" data-testid="card-local-${feed}-${index}">
              <div class="local-source__icon" aria-hidden="true">${localIcon(item.type)}</div>
              <div class="grow">
                <div class="between" style="align-items:flex-start;">
                  <div>
                    <h3>${item.name}</h3>
                    <p class="text-xs text-muted">${item.area} · ${item.headline}</p>
                  </div>
                  <span class="badge badge-${item.color === 'gold' ? 'gold' : item.color === 'lime' ? 'lime' : item.color === 'coral' ? 'coral' : 'green'}">${item.badge}</span>
                </div>
                <p class="text-sm text-secondary" style="margin:8px 0 10px;">${item.detail}</p>
                <button class="local-source__action" data-testid="button-${item.type}-${feed}">${item.action} →</button>
              </div>
            </article>
          `).join('')}
        </div>
      </section>
    `;
    el.querySelectorAll('button').forEach((button) => {
      button.addEventListener('click', () => toast(`${button.textContent.replace('→', '').trim()} flow ready for WordPress`, { tone: 'success' }));
    });
  }

  /* -----------------------------------------------------------------------
     Logo (inline SVG)
     ----------------------------------------------------------------------- */
  const LOGO_SVG = `
    <svg class="logo-svg" viewBox="0 0 40 40" aria-hidden="true">
      <!-- Stem -->
      <path class="stem" d="M20 36 L20 20" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" fill="none" />
      <!-- Left leaf -->
      <path class="leaf" d="M20 24 C 10 22, 6 14, 8 8 C 14 8, 20 14, 20 22 Z" />
      <!-- Right leaf -->
      <path class="accent" d="M20 22 C 26 16, 32 16, 34 12 C 32 22, 26 26, 20 24 Z" opacity="0.9" />
      <!-- Fruit -->
      <circle class="fruit" cx="20" cy="14" r="5.2" />
      <circle cx="18.4" cy="12.6" r="1.4" fill="white" opacity="0.55" />
    </svg>
  `;

  /* -----------------------------------------------------------------------
     Header
     ----------------------------------------------------------------------- */
  function renderHeader(el) {
    const title = el.dataset.title || 'Good Fruit';
    const showBack = el.dataset.back === 'true';
    el.innerHTML = `
      <header class="app-header" role="banner">
        <div class="container app-header__inner">
          <div class="app-header__brand">
            ${showBack
              ? `<a class="icon-btn" href="home.html" aria-label="Back to home">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                </a>`
              : LOGO_SVG}
            <span class="app-header__title">${title}</span>
          </div>
          <div class="app-header__actions">
            <button class="icon-btn" aria-label="Notifications" data-testid="button-notifications">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
            </button>
            <a class="avatar-btn" href="profile.html" aria-label="Profile" data-testid="link-profile">${state.user.initials}</a>
          </div>
        </div>
      </header>
    `;
  }

  /* -----------------------------------------------------------------------
     Bottom navigation (7 items)
     ----------------------------------------------------------------------- */
  const NAV_ITEMS = [
    { id: 'home', label: 'Home', href: 'home.html', icon: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2h-4v-7H9v7H5a2 2 0 0 1-2-2z' },
    { id: 'market', label: 'Market', href: 'marketplace.html', icon: 'M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0' },
    { id: 'connect', label: 'Connect', href: 'connect.html', icon: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75' },
    { id: 'prayer', label: 'Prayer', href: 'prayer.html', icon: 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z' },
    { id: 'learn', label: 'Learn', href: 'learn.html', icon: 'M22 10v6M2 10l10-5 10 5-10 5zM6 12v5a6 3 0 0 0 12 0v-5' },
    { id: 'needs', label: 'Needs', href: 'needs.html', icon: 'M11 14h2a2 2 0 0 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 16M7 20l1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0 0-2.83 2 2 0 0 0-2.83 0l-4.2 3.9M2 15l5 5M22 9c0 4-8 13-8 13S6 13 6 9a4 4 0 0 1 8 0 4 4 0 0 1 8 0z' },
    { id: 'me', label: 'Me', href: 'profile.html', icon: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8' },
  ];

  function renderBottomNav(el) {
    const active = el.dataset.active || 'home';
    el.innerHTML = `
      <nav class="bottom-nav" role="navigation" aria-label="Primary">
        <div class="bottom-nav__inner">
          ${NAV_ITEMS.map((item) => `
            <a class="bottom-nav__item${active === item.id ? ' is-active' : ''}"
               href="${item.href}"
               aria-current="${active === item.id ? 'page' : 'false'}"
               data-testid="nav-${item.id}">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${item.icon}"/></svg>
              <span>${item.label}</span>
            </a>
          `).join('')}
        </div>
      </nav>
    `;
  }

  /* -----------------------------------------------------------------------
     Toast feedback
     ----------------------------------------------------------------------- */
  function ensureToastRegion() {
    let region = document.getElementById('toast-region');
    if (!region) {
      region = document.createElement('div');
      region.id = 'toast-region';
      region.setAttribute('role', 'status');
      region.setAttribute('aria-live', 'polite');
      document.body.appendChild(region);
    }
    return region;
  }
  function toast(message, opts = {}) {
    const region = ensureToastRegion();
    const el = document.createElement('div');
    el.className = `toast ${opts.tone ? `toast-${opts.tone}` : ''}`;
    el.textContent = message;
    region.appendChild(el);
    setTimeout(() => {
      el.classList.add('is-leaving');
      setTimeout(() => el.remove(), 200);
    }, opts.duration || 2400);
  }
  window.GF_TOAST = toast;

  /* -----------------------------------------------------------------------
     Web Share API + clipboard fallback
     ----------------------------------------------------------------------- */
  async function share({ title, text, url }) {
    const shareUrl = url || window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title, text, url: shareUrl });
        return 'shared';
      } catch (e) {
        if (e && e.name === 'AbortError') return 'aborted';
        // fall through to clipboard
      }
    }
    try {
      await navigator.clipboard.writeText(`${text}\n— ${title}\n${shareUrl}`);
      toast('Copied to clipboard', { tone: 'success' });
      return 'copied';
    } catch {
      toast('Sharing isn’t available here', { tone: 'error' });
      return 'failed';
    }
  }
  window.GF_SHARE = share;

  /* -----------------------------------------------------------------------
     Tab + chip helpers (data-tabs / data-chips)
     ----------------------------------------------------------------------- */
  function bindTabs(root = document) {
    root.querySelectorAll('[data-tabs]').forEach((group) => {
      const tabs = group.querySelectorAll('[role="tab"]');
      tabs.forEach((tab) => {
        tab.addEventListener('click', () => {
          tabs.forEach((t) => t.setAttribute('aria-selected', 'false'));
          tab.setAttribute('aria-selected', 'true');
          const panelId = tab.getAttribute('aria-controls');
          group.parentElement.querySelectorAll('[role="tabpanel"]').forEach((p) => {
            p.hidden = p.id !== panelId;
          });
        });
        tab.addEventListener('keydown', (e) => {
          const list = Array.from(tabs);
          const i = list.indexOf(tab);
          if (e.key === 'ArrowRight') list[(i + 1) % list.length].focus();
          if (e.key === 'ArrowLeft') list[(i - 1 + list.length) % list.length].focus();
        });
      });
    });
  }

  function bindChips(root = document) {
    root.querySelectorAll('[data-chip-group]').forEach((group) => {
      const chips = group.querySelectorAll('.chip');
      chips.forEach((chip) => {
        chip.addEventListener('click', () => {
          chips.forEach((c) => c.setAttribute('aria-pressed', 'false'));
          chip.setAttribute('aria-pressed', 'true');
          const filter = chip.dataset.filter;
          group.dispatchEvent(new CustomEvent('chip:change', { detail: { filter } }));
        });
      });
    });
  }

  /* -----------------------------------------------------------------------
     Boot
     ----------------------------------------------------------------------- */
  function init() {
    document.querySelectorAll('[data-component="header"]').forEach(renderHeader);
    document.querySelectorAll('[data-component="bottom-nav"]').forEach(renderBottomNav);
    document.querySelectorAll('[data-component="local-feed"]').forEach(renderLocalFeed);
    bindTabs();
    bindChips();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
