(function () {
  'use strict';

  const LEXICON = {
    word: { head: 'Word', original: 'Greek: logos', gloss: 'message, reason, expression, divine self-disclosure', note: 'In John 1, logos points to Christ as God revealed and active.' },
    beginning: { head: 'Beginning', original: 'Greek: arche', gloss: 'origin, first cause, starting point', note: 'Echoes Genesis 1 and frames the passage as creation language.' },
    god: { head: 'God', original: 'Greek: theos', gloss: 'God, divine one', note: 'John uses this to identify the Word with God while distinguishing relationship.' },
    light: { head: 'Light', original: 'Greek: phos', gloss: 'light, revelation, life-giving truth', note: 'Often signals God making truth and life visible.' },
    darkness: { head: 'Darkness', original: 'Greek: skotia', gloss: 'darkness, ignorance, opposition to God', note: 'John contrasts darkness with the life and light of Christ.' },
    life: { head: 'Life', original: 'Greek: zoe', gloss: 'life, vitality, divine life', note: 'More than existence; life that comes from God.' },
    witness: { head: 'Witness', original: 'Greek: martyria', gloss: 'testimony, evidence, bearing witness', note: 'A witness points away from self and toward truth.' },
    believe: { head: 'Believe', original: 'Greek: pisteuo', gloss: 'trust, rely on, entrust oneself', note: 'Biblical belief is active trust, not only mental agreement.' },
    grace: { head: 'Grace', original: 'Greek: charis', gloss: 'favor, gift, generosity', note: 'God giving what is not earned.' },
    truth: { head: 'Truth', original: 'Greek: aletheia', gloss: 'truth, reality, faithfulness', note: 'In John, truth is revealed personally in Jesus.' },
    flesh: { head: 'Flesh', original: 'Greek: sarx', gloss: 'human nature, embodied life', note: 'John 1:14 emphasizes the Word truly entering human life.' },
    dwelt: { head: 'Dwelt', original: 'Greek: skenoo', gloss: 'to pitch a tent, dwell among', note: 'Suggests God tabernacling with his people.' },
    glory: { head: 'Glory', original: 'Greek: doxa', gloss: 'honor, radiant weight, visible splendor', note: 'God’s character made visible.' },
    shepherd: { head: 'Shepherd', original: 'Hebrew: raah', gloss: 'one who tends, feeds, guides', note: 'Psalm 23 presents the LORD as provider, guide, and protector.' },
    want: { head: 'Want', original: 'Hebrew idea: lack', gloss: 'to lack, be in need', note: '“I shall not want” means the shepherd provides what is needed.' },
    restoreth: { head: 'Restoreth', original: 'Hebrew: shub', gloss: 'to return, restore, bring back', note: 'God brings the soul back to life and right direction.' },
    soul: { head: 'Soul', original: 'Hebrew: nephesh', gloss: 'life, self, whole person', note: 'More holistic than only an inner spiritual part.' },
    righteousness: { head: 'Righteousness', original: 'Hebrew: tsedeq', gloss: 'right order, justice, covenant faithfulness', note: 'The path aligned with God’s character.' },
    mercy: { head: 'Mercy', original: 'Hebrew: hesed', gloss: 'steadfast love, covenant kindness', note: 'Faithful love that keeps pursuing.' },
    blessed: { head: 'Blessed', original: 'Greek: makarios', gloss: 'favored, flourishing, deeply fortunate', note: 'Jesus names true flourishing in God’s kingdom.' },
    meek: { head: 'Meek', original: 'Greek: praus', gloss: 'gentle strength, humble power', note: 'Not weakness; strength yielded to God.' },
    peacemakers: { head: 'Peacemakers', original: 'Greek: eirenopoios', gloss: 'makers of peace, reconcilers', note: 'People who actively create wholeness and reconciliation.' },
    love: { head: 'Love', original: 'Greek: agape', gloss: 'self-giving love, covenantal care', note: 'Love that seeks another’s good.' },
    joy: { head: 'Joy', original: 'Greek: chara', gloss: 'deep gladness, grace-shaped delight', note: 'A fruit of the Spirit not dependent on easy circumstances.' },
    peace: { head: 'Peace', original: 'Greek: eirene / Hebrew: shalom', gloss: 'wholeness, reconciliation, well-being', note: 'Biblical peace is more than calm; it is restored wholeness.' },
    faith: { head: 'Faith', original: 'Greek: pistis', gloss: 'faith, trust, faithfulness', note: 'Can describe both trusting God and being trustworthy.' },
    spirit: { head: 'Spirit', original: 'Greek: pneuma', gloss: 'spirit, breath, wind', note: 'The Holy Spirit gives life and forms holy character.' },
    liberty: { head: 'Liberty', original: 'Greek: eleutheria', gloss: 'freedom, release from bondage', note: 'Freedom is aimed toward loving service, not selfishness.' },
    serve: { head: 'Serve', original: 'Greek: douleuo', gloss: 'serve, devote oneself', note: 'Galatians frames love as the right use of freedom.' },
    rejoice: { head: 'Rejoice', original: 'Greek: chairo', gloss: 'be glad, rejoice', note: 'Joy practiced in the Lord.' },
    prayer: { head: 'Prayer', original: 'Greek: proseuche', gloss: 'prayer, worshipful address to God', note: 'Turning needs toward God with trust.' },
    thanksgiving: { head: 'Thanksgiving', original: 'Greek: eucharistia', gloss: 'gratitude, thanks', note: 'Gratitude changes how requests are carried.' },
    strengtheneth: { head: 'Strengtheneth', original: 'Greek: endynamoo', gloss: 'to empower, strengthen within', note: 'Philippians 4:13 points to Christ-given endurance.' },
    kingdom: { head: 'Kingdom', original: 'Greek: basileia', gloss: 'reign, rule, kingdom', note: 'God’s active reign and ordered life.' },
    born: { head: 'Born', original: 'Greek: gennao', gloss: 'be born, begotten, brought forth', note: 'In John 3 this points to new birth from above.' },
    world: { head: 'World', original: 'Greek: kosmos', gloss: 'world, ordered creation, humanity in need', note: 'John 3:16 emphasizes the reach of God’s love.' },
  };

  function normalize(word) {
    return word.toLowerCase().replace(/[^a-z]/g, '');
  }

  function escapeHtml(value) {
    return String(value || '').replace(/[&<>"']/g, (char) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;',
    })[char]);
  }

  function renderVerse(text) {
    return String(text).replace(/[A-Za-z][A-Za-z'’:-]*/g, (raw) => {
      const key = normalize(raw);
      const entry = LEXICON[key];
      if (!entry) return escapeHtml(raw);
      const gloss = `${entry.original}: ${entry.gloss}`;
      return `<span class="study-word" tabindex="0" role="button" data-word="${escapeHtml(key)}" data-gloss="${escapeHtml(gloss)}">${escapeHtml(raw)}</span>`;
    });
  }

  function showEntry(key) {
    const entry = LEXICON[key];
    if (!entry) return;
    const title = document.getElementById('study-word-title');
    const body = document.getElementById('study-word-body');
    const meta = document.getElementById('study-word-meta');
    if (!title || !body || !meta) return;
    title.textContent = entry.head;
    body.textContent = entry.note;
    meta.innerHTML = `
      <span class="badge badge-teal">${escapeHtml(entry.original)}</span>
      <span class="badge badge-gold">${escapeHtml(entry.gloss)}</span>
      <a class="badge" href="https://www.stepbible.org/" target="_blank" rel="noopener">Open STEP Bible</a>
    `;
  }

  function bind(root) {
    root.querySelectorAll('.study-word').forEach((word) => {
      word.addEventListener('click', (event) => {
        event.stopPropagation();
        showEntry(word.dataset.word);
      });
      word.addEventListener('mouseover', () => showEntry(word.dataset.word));
      word.addEventListener('focus', () => showEntry(word.dataset.word));
      word.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          event.stopPropagation();
          showEntry(word.dataset.word);
        }
      });
    });
  }

  window.GF_BIBLE_STUDY = { renderVerse, bind, LEXICON };
})();
