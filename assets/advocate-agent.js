(function () {
  'use strict';

  const state = window.GF_STATE || {};
  const profile = state.profileDraft || {};

  const messagesEl = document.querySelector('[data-advocate-messages]');
  const form = document.querySelector('[data-advocate-form]');
  const input = document.getElementById('advocate-question');
  const stepsEl = document.querySelector('[data-advocate-steps]');
  const growthEl = document.querySelector('[data-advocate-growth]');
  const trustBadge = document.querySelector('[data-advocate-trust]');
  const moodEl = document.querySelector('[data-seedling-mood]');
  const avatarEls = document.querySelectorAll('[data-seedling-avatar]');
  const expressionButtons = document.querySelectorAll('[data-expression]');

  if (!messagesEl || !form || !input || !stepsEl || !growthEl) return;

  const role = profile.role || 'Visitor';
  const city = profile.city || 'Central Oregon';
  const radius = profile.radius || '25 miles';
  const interests = profile.interests && profile.interests.length ? profile.interests : ['Prayer', 'Needs', 'Connect'];
  const idPending = profile.idVerified === 'pending';

  const PATHS = {
    prayer: {
      title: 'Start with prayer',
      body: 'Open the prayer wall, add a private or public request, and invite two trusted people to pray with you.',
      href: 'prayer.html',
      action: 'Open Prayer',
    },
    needs: {
      title: 'Ask clearly and safely',
      body: 'Use the needs board to describe the practical help needed, timing, location, and whether a church or mentor can verify it.',
      href: 'needs.html',
      action: 'Open Needs',
    },
    serve: {
      title: 'Find a local place to serve',
      body: `Look for groups, projects, trainings, and events near ${city} within ${radius}. Start small and bring someone with you.`,
      href: 'connect.html',
      action: 'Open Connect',
    },
    bible: {
      title: 'Grow in the Word',
      body: 'Read one chapter, hover key words for meaning, save one verse, and turn it into one action you can practice today.',
      href: 'bible.html',
      action: 'Open Bible',
    },
    learn: {
      title: 'Build a skill',
      body: 'Choose one course or certification that increases your ability to provide, lead, serve, or mentor.',
      href: 'learn.html',
      action: 'Open Learn',
    },
    trust: {
      title: 'Build trust before posting',
      body: role === 'Visitor'
        ? 'Confirm your email to search and view. To post, respond, or join marketplace intros, move toward Guest verification.'
        : idPending
          ? 'Finish ID verification before posting, responding, joining teams, or marketplace introductions.'
          : 'Keep building a visible history of encouragement, service, honest marketplace behavior, and completed commitments.',
      href: 'index.html',
      action: 'Review Access',
    },
    market: {
      title: 'Use the marketplace with character',
      body: 'Look for fair offers, free items, barter, services, and business partners with community trust signals.',
      href: 'marketplace.html',
      action: 'Open Market',
    },
  };

  const EXPRESSIONS = {
    default: 'assets/seedling-advocate.png',
    joyful: 'assets/seedling-expressions/joyful.png',
    listening: 'assets/seedling-expressions/listening.png',
    praying: 'assets/seedling-expressions/praying.png',
    thinking: 'assets/seedling-expressions/thinking.png',
    encouraging: 'assets/seedling-expressions/encouraging.png',
    supporting: 'assets/seedling-expressions/here-for-you.png',
    comforting: 'assets/seedling-expressions/comforting.png',
    concerned: 'assets/seedling-expressions/concerned.png',
    focused: 'assets/seedling-expressions/focused.png',
    celebrate: 'assets/seedling-expressions/celebrate.png',
    love: 'assets/seedling-expressions/sending-love.png',
  };

  const EXPRESSION_LABELS = {
    joyful: 'Joyful',
    listening: 'Listening',
    praying: 'Praying',
    thinking: 'Thinking',
    encouraging: 'Encouraging',
    supporting: 'Supporting',
    comforting: 'Comforting',
    concerned: 'Concerned',
    focused: 'Focused',
    celebrate: 'Celebrating',
    love: 'Sending love',
  };

  function escapeHtml(value) {
    return String(value || '').replace(/[&<>"']/g, (char) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    }[char]));
  }

  function addMessage(kind, html) {
    const item = document.createElement('article');
    item.className = `advocate-message advocate-message--${kind}`;
    item.innerHTML = html;
    messagesEl.appendChild(item);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function setExpression(name) {
    const key = EXPRESSIONS[name] ? name : 'joyful';
    avatarEls.forEach((avatar) => {
      avatar.src = EXPRESSIONS[key];
      avatar.classList.remove('is-reacting');
      void avatar.offsetWidth;
      avatar.classList.add('is-reacting');
    });
    if (moodEl) moodEl.textContent = EXPRESSION_LABELS[key] || 'Listening';
    expressionButtons.forEach((button) => {
      button.setAttribute('aria-pressed', button.dataset.expression === key ? 'true' : 'false');
    });
  }

  function stepCard(path) {
    return `
      <a class="advocate-step" href="${path.href}">
        <div>
          <strong>${path.title}</strong>
          <span>${path.body}</span>
        </div>
        <em>${path.action}</em>
      </a>
    `;
  }

  function renderRecommendations() {
    if (trustBadge) trustBadge.textContent = role;
    const prioritized = ['trust', ...interests.map((item) => item.toLowerCase())]
      .map((item) => item.includes('market') || item.includes('business') ? 'market' : item)
      .map((item) => item.includes('connect') ? 'serve' : item)
      .filter((item, index, list) => PATHS[item] && list.indexOf(item) === index)
      .slice(0, 4);
    const fallback = ['prayer', 'serve', 'bible', 'learn'];
    const finalSteps = prioritized.length ? prioritized : fallback;
    stepsEl.innerHTML = finalSteps.map((key) => stepCard(PATHS[key])).join('');
    growthEl.innerHTML = `
      <div class="growth-route">
        <span>1</span>
        <p><strong>Root:</strong> Confirm identity and choose a local area.</p>
      </div>
      <div class="growth-route">
        <span>2</span>
        <p><strong>Receive:</strong> Ask for prayer, wisdom, or practical help with clarity.</p>
      </div>
      <div class="growth-route">
        <span>3</span>
        <p><strong>Practice:</strong> Complete one learning or Bible action this week.</p>
      </div>
      <div class="growth-route">
        <span>4</span>
        <p><strong>Give:</strong> Water someone else through encouragement, service, or mentorship.</p>
      </div>
    `;
  }

  function classify(text) {
    const value = text.toLowerCase();
    if (/pray|prayer|lord|god|faith|bible|scripture/.test(value)) return value.includes('bible') || value.includes('scripture') ? 'bible' : 'prayer';
    if (/need|help|rent|food|ride|housing|job|urgent/.test(value)) return 'needs';
    if (/serve|volunteer|team|group|event|community|connect/.test(value)) return 'serve';
    if (/learn|course|training|skill|cert|class|mentor/.test(value)) return 'learn';
    if (/trust|verify|post|id|scam|guest|member|visitor/.test(value)) return 'trust';
    if (/market|business|barter|free|sell|service/.test(value)) return 'market';
    return 'serve';
  }

  async function askSeedlingApi(question) {
    const response = await fetch('/api/seedling', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: question,
        profile: {
          role,
          city,
          radius,
          interests,
          idVerified: profile.idVerified,
          emailConfirmed: profile.emailConfirmed,
        },
      }),
    });
    if (!response.ok) throw new Error('Seedling API unavailable');
    const payload = await response.json();
    return payload.reply;
  }

  async function answer(question) {
    const key = classify(question);
    const path = PATHS[key];
    const safeQuestion = escapeHtml(question);
    const moods = {
      prayer: 'praying',
      needs: 'supporting',
      serve: 'celebrate',
      bible: 'thinking',
      learn: 'encouraging',
      trust: 'listening',
      market: 'focused',
    };
    setExpression(moods[key] || 'listening');
    addMessage('user', `<p>${safeQuestion}</p>`);
    const thinking = document.createElement('article');
    thinking.className = 'advocate-message advocate-message--agent is-thinking';
    thinking.innerHTML = '<p><strong>Seedling is listening...</strong></p>';
    messagesEl.appendChild(thinking);
    messagesEl.scrollTop = messagesEl.scrollHeight;
    try {
      const reply = await askSeedlingApi(question);
      thinking.innerHTML = `
        <p><strong>Seedling says:</strong> ${escapeHtml(reply)}</p>
        <div class="advocate-action-row">
          <a class="btn btn-primary btn-sm" href="${path.href}">${path.action}</a>
          <button class="btn btn-ghost btn-sm" type="button" data-copy-plan="${escapeHtml(path.title)}">Save as plan</button>
        </div>
      `;
    } catch {
      thinking.innerHTML = `
        <p><strong>Seedling says:</strong> ${path.body}</p>
        <div class="advocate-action-row">
          <a class="btn btn-primary btn-sm" href="${path.href}">${path.action}</a>
          <button class="btn btn-ghost btn-sm" type="button" data-copy-plan="${escapeHtml(path.title)}">Save as plan</button>
        </div>
      `;
    }
  }

  function boot() {
    renderRecommendations();
    setExpression('listening');
    addMessage('agent', `
      <p><strong>You are not alone. You have Good Fruit.</strong> I am Seedling, your digital advocate. I can help you find prayer, ask for help, serve locally, grow in Scripture, build trust, or discover learning paths near ${escapeHtml(city)}.</p>
    `);
    expressionButtons.forEach((button) => {
      button.addEventListener('click', () => setExpression(button.dataset.expression));
    });
    document.querySelectorAll('[data-prompt]').forEach((button) => {
      button.addEventListener('click', () => answer(button.dataset.prompt));
    });
    messagesEl.addEventListener('click', (event) => {
      const button = event.target.closest('[data-copy-plan]');
      if (!button) return;
      window.GF_TOAST(`${button.dataset.copyPlan} added to your growth plan`, { tone: 'success' });
    });
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const value = input.value.trim();
      if (!value) return;
      input.value = '';
      answer(value);
    });
  }

  boot();
})();
