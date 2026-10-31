/* ============================================================
   MANIFOLD — Vanilla JS app (router, templates, GSAP animations)
   Animation logic is ported 1:1 from the React source
   (src/utils/gsapAnimations.ts + components).
   ============================================================ */

(function () {
  'use strict';

  /* ---------- Helpers ---------- */
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const app = $('#app');

  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  const icon = (name, size = 16, cls = '') =>
    `<svg width="${size}" height="${size}" class="${cls}" aria-hidden="true"><use href="#i-${name}"/></svg>`;

  const finePointer = () => window.matchMedia('(pointer: fine)').matches;
  const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const state = {
    page: 'home',
    workFilter: 'Featured',
    lightboxStudy: null,
  };

  /* Multi-page setup: each page is a real .html file sharing this shell.
     The current page is declared on <html data-page="...">. */
  const INITIAL_PAGE = document.documentElement.dataset.page || 'home';
  const PAGE_FILES = {
    home: 'index.html',
    film: 'film.html',
    creative: 'creative.html',
    ai: 'ai.html',
    craft: 'craft.html',
    content: 'content.html',
    about: 'about.html',
    contact: 'contact.html',
  };

  /* ============================================================
     GSAP ANIMATION UTILITIES
     Ported from src/utils/gsapAnimations.ts
     ============================================================ */

  function splitWords(el) {
    if (!el || el.dataset.revealSplit === '1') return [];
    const text = (el.textContent || '').replace(/\s+/g, ' ').trim();
    if (!text) return [];
    const words = text.split(' ');
    el.dataset.revealSplit = '1';
    el.setAttribute('aria-label', text);
    el.textContent = '';
    words.forEach((word, i) => {
      const mask = document.createElement('span');
      mask.className = 'reveal-word';
      const inner = document.createElement('span');
      inner.className = 'reveal-word-inner';
      inner.setAttribute('aria-hidden', 'true');
      inner.textContent = word;
      mask.appendChild(inner);
      el.appendChild(mask);
      if (i < words.length - 1) el.appendChild(document.createTextNode(' '));
    });
    return $$('.reveal-word-inner', el);
  }

  function hideWords(words) {
    if (!words.length || typeof gsap === 'undefined' || reduceMotion()) return;
    gsap.set(words, { yPercent: 115, opacity: 0 });
  }

  function addWordReveal(tl, words, opts = {}, position) {
    if (!words.length) return;
    tl.fromTo(
      words,
      { yPercent: 115, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 0.7, ease: 'power4.out', stagger: 0.035, ...opts },
      position
    );
  }

  function revealWords(words, opts = {}) {
    if (!words.length) return;
    if (typeof gsap === 'undefined' || reduceMotion()) {
      if (typeof gsap !== 'undefined') gsap.set(words, { yPercent: 0, opacity: 1 });
      return;
    }
    gsap.fromTo(
      words,
      { yPercent: 115, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 0.7, ease: 'power4.out', stagger: 0.035, ...opts }
    );
  }

  function observeOnce(el, callback, threshold = 0.2) {
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          observer.disconnect();
          callback(entry.target);
        });
      },
      { threshold, rootMargin: '0px 0px -8% 0px' }
    );
    observer.observe(el);
  }

  function staggerGroup(root, containerSelector, itemSelector, fade = true) {
    if (!root || typeof gsap === 'undefined' || reduceMotion()) return;
    const containers = $$(containerSelector, root);
    if (root.matches && root.matches(containerSelector)) containers.push(root);
    containers.forEach((container) => {
      const items = $$(itemSelector, container);
      if (!items.length) return;
      items.forEach((item) => {
        item.dataset.revealFade = '1';
      });
      gsap.set(items, fade ? { opacity: 0, y: 18 } : { y: 18 });
      observeOnce(
        container,
        () =>
          gsap.to(
            items,
            fade
              ? { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out', stagger: 0.07 }
              : { y: 0, duration: 0.55, ease: 'power3.out', stagger: 0.07 }
          ),
        0.12
      );
    });
  }

  function setupGenericReveals(root) {
    if (!root || typeof gsap === 'undefined' || reduceMotion()) return;

    $$('h2.headline-xl, .approach-head h2', root).forEach((heading) => {
      if (heading.closest('.gsap-wwd-header') || heading.closest('.gsap-process-header')) return;
      const words = splitWords(heading);
      if (!words.length) return;
      hideWords(words);
      observeOnce(heading, () => revealWords(words, { duration: 0.75, stagger: 0.04 }), 0.25);
    });

    $$('.vd-note, .approach-paragraph', root).forEach((el) => {
      if (el.dataset.revealFade === '1') return;
      el.dataset.revealFade = '1';
      gsap.set(el, { opacity: 0, y: 16 });
      observeOnce(el, () => gsap.to(el, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }), 0.2);
    });

    staggerGroup(root, '.studies-grid', '.study-card');
    staggerGroup(root, '.aspect-grid', '.aspect-card', false);
    staggerGroup(root, '.contact-grid', '.contact-form-card, .sidebar-card');
    staggerGroup(root, '.filter-bar', '.filter-pill');
  }

  /** Cinematic staggered hero entrance */
  function animateHeroEntrance(scope) {
    if (!scope || typeof gsap === 'undefined' || reduceMotion()) return;

    const kicker = scope.querySelector('.gsap-hero-kicker');
    const headline = scope.querySelector('.gsap-hero-headline');
    const description = scope.querySelector('.gsap-hero-description');
    const actions = scope.querySelector('.gsap-hero-actions');
    const imageFrame = scope.querySelector('.gsap-hero-image');
    const headlineWords = splitWords(headline);

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    if (kicker) {
      tl.fromTo(
        kicker,
        { opacity: 0, y: 15, letterSpacing: '0.25em' },
        { opacity: 1, y: 0, letterSpacing: '0.15em', duration: 0.7 }
      );
    }
    if (headlineWords.length) {
      addWordReveal(tl, headlineWords, { duration: 0.8, stagger: 0.045 }, '-=0.5');
    } else if (headline) {
      tl.fromTo(headline, { opacity: 0, y: 35 }, { opacity: 1, y: 0, duration: 0.9 }, '-=0.5');
    }
    if (description) {
      tl.fromTo(description, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7 }, '-=0.6');
    }
    if (actions) {
      tl.fromTo(actions, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.5');
    }
    if (imageFrame) {
      tl.fromTo(
        imageFrame,
        { opacity: 0, scale: 1.03, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 1.1, ease: 'power2.out' },
        '-=0.7'
      );
    }
  }

  /** What We Do section: header + staggered items on scroll into view */
  function setupWhatWeDoAnimation(sectionElement) {
    if (!sectionElement || typeof gsap === 'undefined' || reduceMotion()) return;

    const header = sectionElement.querySelector('.gsap-wwd-header');
    const headline = header ? header.querySelector('.headline-xl') : null;
    const kicker = header ? header.querySelector('.kicker') : null;
    const items = $$('.gsap-wwd-item', sectionElement);
    const sublist = sectionElement.querySelector('.wwd-sublist');
    const words = splitWords(headline);

    hideWords(words);
    if (kicker) gsap.set(kicker, { opacity: 0, y: 12 });
    if (items.length) gsap.set(items, { opacity: 0, y: 20 });
    if (sublist) gsap.set(sublist, { opacity: 0, y: 16 });

    observeOnce(
      sectionElement,
      () => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
        if (kicker) tl.to(kicker, { opacity: 1, y: 0, duration: 0.45 });
        addWordReveal(tl, words, { duration: 0.75, stagger: 0.04 }, '-=0.35');
        if (items.length) tl.to(items, { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 }, '-=0.4');
        if (sublist) tl.to(sublist, { opacity: 1, y: 0, duration: 0.6 }, '-=0.35');
      },
      0.15
    );
  }

  /** Subtle magnetic pull on interactive buttons */
  function attachMagneticEffect(button, factor = 0.25) {
    if (!button || !finePointer() || typeof gsap === 'undefined') return;

    const handleMouseMove = (e) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(button, { x: x * factor, y: y * factor, duration: 0.3, ease: 'power2.out' });
    };

    const handleMouseLeave = () => {
      gsap.to(button, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' });
    };

    button.addEventListener('mousemove', handleMouseMove);
    button.addEventListener('mouseleave', handleMouseLeave);
  }

  /** Process section: header + staggered steps on scroll into view */
  function setupProcessAnimation(sectionElement) {
    if (!sectionElement || typeof gsap === 'undefined' || reduceMotion()) return;

    const header = sectionElement.querySelector('.gsap-process-header');
    const headline = header ? header.querySelector('.headline-xl') : null;
    const kicker = header ? header.querySelector('.kicker') : null;
    const items = $$('.gsap-process-item', sectionElement);
    const words = splitWords(headline);

    hideWords(words);
    if (kicker) gsap.set(kicker, { opacity: 0, y: 12 });
    if (items.length) gsap.set(items, { opacity: 0, y: 20 });

    observeOnce(
      sectionElement,
      () => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
        if (kicker) tl.to(kicker, { opacity: 1, y: 0, duration: 0.45 });
        addWordReveal(tl, words, { duration: 0.75, stagger: 0.04 }, '-=0.35');
        if (items.length) tl.to(items, { opacity: 1, y: 0, duration: 0.6, stagger: 0.09 }, '-=0.4');
      },
      0.15
    );
  }

  /** CTA banner: reveal + magnetic dark button */
  function setupCtaAnimation(sectionElement) {
    if (!sectionElement || typeof gsap === 'undefined' || reduceMotion()) return;

    const headline = sectionElement.querySelector('.gsap-cta-headline');
    const kicker = sectionElement.querySelector(':scope > .container > .kicker');
    const desc = sectionElement.querySelector('.gsap-cta-desc');
    const words = splitWords(headline);

    hideWords(words);
    if (kicker) gsap.set(kicker, { opacity: 0, y: 12 });
    if (desc) gsap.set(desc, { opacity: 0, y: 20 });

    observeOnce(
      sectionElement,
      () => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
        if (kicker) tl.to(kicker, { opacity: 1, y: 0, duration: 0.45 });
        addWordReveal(tl, words, { duration: 0.75, stagger: 0.045 }, '-=0.35');
        if (desc) tl.to(desc, { opacity: 1, y: 0, duration: 0.6 }, '-=0.45');
      },
      0.2
    );

    const btn = sectionElement.querySelector('.btn-dark');
    if (btn) attachMagneticEffect(btn, 0.22);
  }

  /** VisualStudyCard 3D tilt (port of VisualStudyCard.tsx) */
  function attachStudyTilt(card) {
    if (!finePointer() || typeof gsap === 'undefined') return;

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      gsap.to(card, {
        rotationY: x * 6,
        rotationX: -y * 6,
        transformPerspective: 1000,
        ease: 'power1.out',
        duration: 0.35,
      });
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(card, { rotationY: 0, rotationX: 0, ease: 'power2.out', duration: 0.5 });
    });
  }

  /* ============================================================
     STATE / ROUTER
     ============================================================ */

  function navigate(page, extra) {
    closeDrawer();
    if (page === 'work') {
      if (state.page === 'home') {
        scrollToWork();
      } else {
        window.location.href = 'index.html#work';
      }
      return;
    }
    if (page === 'contact' && extra) {
      try { sessionStorage.setItem('manifold_selected_service', extra); } catch (e) { /* storage unavailable */ }
    }
    const target = PAGE_FILES[page] || 'index.html';
    if (state.page === page) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    window.location.href = target;
  }

  function scrollToWork() {
    setTimeout(() => {
      const el = document.getElementById('work');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }

  function renderPage(page) {
    let html = '';
    switch (page) {
      case 'home': html = homePage(); break;
      case 'film': html = servicePage(FILM_DATA); break;
      case 'creative': html = servicePage(CREATIVE_DATA); break;
      case 'ai': html = servicePage(AI_DATA); break;
      case 'craft': html = craftPage(); break;
      case 'content': html = servicePage(CONTENT_DATA); break;
      case 'about': html = aboutPage(); break;
      case 'contact': html = contactPage(); break;
      default: html = homePage();
    }
    app.innerHTML = html;
    updateNavActive(page);
    initPageBehaviors(page);
  }

  function updateNavActive(page) {
    $$('.nav-link').forEach((el) => {
      const t = el.dataset.nav;
      el.classList.toggle('active', t === page || (t === 'work' && page === 'home' && window.location.hash === '#work'));
    });
    const trigger = $('#servicesTrigger');
    if (trigger) trigger.classList.toggle('active', SERVICE_PAGES[page] !== undefined);
    $$('.nav-dropdown-item').forEach((el) => el.classList.toggle('active', el.dataset.page === page));
  }

  /* ============================================================
     TEMPLATE BUILDERS
     ============================================================ */

  function heroSection(data, opts = {}) {
    const { showPlay = false, sideBySide = false } = opts;
    const isVideo = typeof data.heroImage === 'string' && /\.(mp4|webm|ogg|mov)$/i.test(data.heroImage);
    const media = data.heroImage
      ? `<div class="hero-media gsap-hero-image">
          <div class="media-frame group">
            <div class="aspect">
              ${isVideo
                ? `<video class="frame-img" autoplay muted loop playsinline poster="${data.heroPoster || ''}" aria-label="${esc(data.heroImageCaption || 'Manifold hero video')}">
                    <source src="${data.heroImage}" type="video/mp4" />
                  </video>`
                : `<img class="frame-img" src="${data.heroImage}" alt="" loading="eager" />`}
              <div class="frame-overlay"></div>
              ${showPlay ? `<button class="play-button" data-open-showreel data-cursor="play" aria-label="Watch reel">
                ${icon('play', 28)}
                <span class="play-label">Watch Reel</span>
              </button>` : ''}
            </div>
            ${data.heroImageCaption ? `<div class="frame-caption">${esc(data.heroImageCaption)}</div>` : ''}
          </div>
        </div>`
      : '';
    return `
      <section class="hero${sideBySide ? ' hero-split' : ''}" data-hero-scope>
        <div class="container">
          <div class="hero-content">
            <span class="kicker gsap-hero-kicker">${esc(data.kicker)}</span>
            <h1 class="hero-headline gsap-hero-headline">${esc(data.heroHeadline)}</h1>
            <p class="hero-description gsap-hero-description">${esc(data.heroDescription)}</p>
            ${data.ctaButtonText ? `<div class="hero-actions gsap-hero-actions">
              <button class="btn btn-primary magnetic" data-nav="contact"${data.heroService ? ` data-service="${esc(data.heroService)}"` : ''}>${esc(data.ctaButtonText)} <span class="arrow">→</span></button>
            </div>` : ''}
          </div>
          ${media}
        </div>
      </section>`;
  }

  function whatWeDoSection(wwd) {
    const items = wwd.items
      .map(
        (item) => `
        <button class="wwd-item gsap-wwd-item" data-nav="${item.linkPage}"${item.serviceId ? ` data-service="${esc(item.serviceId)}"` : ''}>
          <div class="wwd-item-title">${esc(item.title)} <span class="arrow">→</span></div>
          <p class="wwd-item-desc">${esc(item.description)}</p>
        </button>`
      )
      .join('');
    return `
      <section class="section section-light" id="what-we-do">
        <div class="container">
          <div class="wwd-header gsap-wwd-header">
            <span class="kicker">${esc(wwd.kicker)}</span>
            <h2 class="headline-xl">${esc(wwd.headline)}</h2>
          </div>
          <div class="wwd-grid ${wwd.items.length === 2 ? 'two' : ''}">${items}</div>
          <p class="wwd-sublist">${esc(wwd.subList)}</p>
        </div>
      </section>`;
  }

  function studyCard(study) {
    return `
      <button class="study-card" data-study-id="${esc(study.id)}" data-cursor="study" aria-label="View ${esc(study.title)}">
        <div class="study-media">
          <img src="${study.image}" alt="${esc(study.title)}" loading="lazy" referrerpolicy="no-referrer" />
          <span class="study-badge">${esc(study.category)}</span>
          <div class="study-overlay">
            <span class="study-expand">${icon('maximize-2', 13)} Expand study</span>
          </div>
        </div>
        <div class="study-title">${esc(study.title)} <span class="arrow">→</span></div>
        <div class="study-subtitle">${esc(study.subtitle)}</div>
      </button>`;
  }

  function visualDirectionSection(vd, cards, opts = {}) {
    const { withFilter = false, cols = 2 } = opts;
    const filterBar = withFilter
      ? `<div class="filter-bar" role="tablist" aria-label="Filter studies">
          ${['Featured', 'All', 'Film', 'Creative', 'AI', 'Content']
            .map(
              (f) =>
                `<button class="filter-pill ${f === state.workFilter ? 'active' : ''}" data-filter="${f}" role="tab">${f}</button>`
            )
            .join('')}
        </div>`
      : '';
    return `
      <section class="section section-dark" id="${withFilter ? 'work' : 'visual-direction'}">
        <div class="container">
          <div class="vd-head">
            <span class="kicker">${esc(vd.kicker)}</span>
            <h2 class="headline-xl">${esc(vd.headline)}</h2>
            ${vd.note ? `<p class="vd-note">${esc(vd.note)}</p>` : ''}
          </div>
          ${filterBar}
          <div class="studies-grid ${cols === 3 ? 'cols-3' : 'cols-2'}" id="studiesGrid">
            ${cards.map((c) => studyCard(c)).join('')}
          </div>
        </div>
      </section>`;
  }

  function processSection(headline) {
    const items = COMMON_PROCESS_STEPS.map(
      (step, i) => `
      <div class="process-item gsap-process-item">
        <div class="process-num">${String(i + 1).padStart(2, '0')}</div>
        <div class="process-name">${esc(step.name)}</div>
        <p class="process-desc">${esc(step.description)}</p>
      </div>`
    ).join('');
    return `
      <section class="section section-dark">
        <div class="container">
          <div class="process-head gsap-process-header">
            <span class="kicker">THE PROCESS</span>
            <h2 class="headline-xl">${esc(headline)}</h2>
          </div>
          <div class="process-grid">${items}</div>
        </div>
      </section>`;
  }

  function ctaSection(cta) {
    return `
      <section class="section-green">
        <div class="container">
          <span class="kicker">${esc(cta.kicker)}</span>
          <div class="cta-grid" style="margin-top:16px">
            <h2 class="cta-headline gsap-cta-headline">${esc(cta.headline)}</h2>
            <div class="cta-side gsap-cta-desc">
              <p class="cta-desc">${esc(cta.description)}</p>
              <button class="btn btn-dark" data-nav="contact">${esc(cta.buttonText)} <span class="arrow">→</span></button>
            </div>
          </div>
        </div>
      </section>`;
  }

  /* ============================================================
     PAGE TEMPLATES
     ============================================================ */

  function homePage() {
    const home = { ...HOME_DATA, heroService: null };
    return (
      heroSection(home, { sideBySide: true }) +
      whatWeDoSection(home.whatWeDo) +
      visualDirectionSection(home.visualDirection, ALL_VISUAL_STUDIES.slice(0, 2), { withFilter: true, cols: 3 }) +
      processSection(home.processHeadline) +
      ctaSection(home.cta)
    );
  }

  function servicePage(data) {
    const d = { ...data, heroService: data.whatWeDo.items[0] ? data.whatWeDo.items[0].serviceId : null };
    return (
      heroSection(d, { showPlay: !!data.heroShowreel }) +
      whatWeDoSection(data.whatWeDo) +
      (data.visualDirection ? visualDirectionSection(data.visualDirection, data.visualDirection.cards, { cols: 2 }) : '') +
      processSection(data.processHeadline) +
      ctaSection(data.cta)
    );
  }

  function craftPage() {
    const d = { ...CRAFT_DATA, heroService: 'Craft' };
    const heroHtml = `
      <section class="hero" data-hero-scope>
        <div class="container">
          <div class="hero-content">
            <span class="kicker gsap-hero-kicker">${esc(d.kicker)}</span>
            <h1 class="hero-headline gsap-hero-headline">${esc(d.heroHeadline)}</h1>
            <p class="hero-description gsap-hero-description">${esc(d.heroDescription)}</p>
            <div class="hero-actions gsap-hero-actions">
              <button class="btn btn-primary magnetic" data-nav="contact" data-service="Craft">${esc(d.ctaButtonText)} <span class="arrow">→</span></button>
            </div>
          </div>
          ${editTimelineHtml()}
        </div>
      </section>`;
    const df = CRAFT_DATA.deliveryFormats;
    const aspectHtml = `
      <section class="section section-dark">
        <div class="container">
          <div>
            <span class="kicker">${esc(df.kicker)}</span>
            <h2 class="headline-xl" style="margin-top:16px">${esc(df.headline)}</h2>
            <p class="vd-note">${esc(df.subtext)}</p>
          </div>
          <div class="aspect-grid">
            ${df.formats
              .map(
                (f, i) => `
              <button class="aspect-card ${i === 0 ? 'selected' : ''}" data-aspect="${f.ratio}">
                <div class="aspect-preview">
                  <div class="aspect-frame" style="aspect-ratio:${f.ratio.replace(':', '/')}; height:100%; width:auto; max-width:100%;">
                    <img src="${ASSETS.cinemaLens}" alt="" loading="lazy" />
                    <div class="aspect-safe"></div>
                    <span class="aspect-ratio-badge">${f.ratio}</span>
                  </div>
                </div>
                <div class="aspect-caption">
                  <div class="aspect-label">${f.ratio} / ${esc(f.label)}</div>
                  <div class="aspect-spec">${esc(f.spec)}</div>
                </div>
              </button>`
              )
              .join('')}
          </div>
        </div>
      </section>`;
    return heroHtml + whatWeDoSection(d.whatWeDo) + aspectHtml + processSection(d.processHeadline) + ctaSection(d.cta);
  }

  function editTimelineHtml() {
    const tracks = [
      {
        name: 'Picture',
        clips: [
          { label: 'Scene 01 / A-Cam', start: 0, width: 25 },
          { label: 'Hero Cut / Anamorphic', start: 27, width: 35, accent: true },
          { label: 'B-Roll Close', start: 64, width: 18 },
          { label: 'Ending Wide', start: 84, width: 16, accent: true },
        ],
      },
      {
        name: 'Colour',
        clips: [
          { label: 'ACEScg / Kodak 2383', start: 0, width: 45 },
          { label: 'Emerald Grade 2.4', start: 47, width: 53, accent: true },
        ],
      },
      {
        name: 'Motion',
        clips: [
          { label: 'Kinetic Titles', start: 15, width: 30 },
          { label: '3D Vector Compositing', start: 48, width: 40, accent: true },
        ],
      },
      {
        name: 'Audio',
        clips: [
          { label: 'Sub-bass & Score Mix', start: 0, width: 38, accent: true },
          { label: 'Foley & Sound Design Master', start: 40, width: 60 },
        ],
      },
    ];
    const trackHtml = tracks
      .map(
        (t, i) => `
      <div class="timeline-row">
        <button class="timeline-track-name ${i === 0 ? 'active' : ''}" data-track="${i}">
          <span class="track-dot"></span>${esc(t.name)}
        </button>
        <div class="timeline-lane" data-lane>
          ${t.clips
            .map(
              (c) =>
                `<div class="timeline-clip ${c.accent ? 'accent' : ''}" style="left:${c.start}%; width:${c.width}%">${esc(c.label)}</div>`
            )
            .join('')}
          <div class="playhead" style="left:38%"></div>
        </div>
      </div>`
      )
      .join('');
    return `
      <div class="hero-media gsap-hero-image">
        <div class="timeline-card" id="editTimeline">
          <div class="timeline-head">
            <div class="timeline-title-wrap">
              <span class="timeline-dot"></span>
              <span class="timeline-title">${esc(CRAFT_DATA.heroTimelineTitle)}</span>
            </div>
            <div class="timeline-controls">
              <span class="timeline-tc" id="timelineTc">TC 00:01:38:12</span>
              <span class="timeline-fps">24.000 FPS / MULTI-TRACK NLE</span>
              <button class="icon-btn" id="timelinePlay" aria-label="Play or pause timeline">${icon('play', 14)}</button>
            </div>
          </div>
          <div class="timeline-tracks">${trackHtml}</div>
          <div class="timeline-foot">
            <div class="timeline-stats">
              <span class="timeline-stat">${icon('layers', 12)} 4 Parallel Stems</span>
              <span class="timeline-stat">${icon('scissors', 12)} Frame-accurate edits</span>
              <span class="timeline-stat">${icon('sliders', 12)} Dynamic color pipeline</span>
            </div>
            <span class="timeline-hint">Click lane to reposition playhead</span>
          </div>
        </div>
      </div>`;
  }

  function aboutPage() {
    const d = { ...ABOUT_DATA, heroService: null };
    const approachHtml = `
      <section class="section section-dark">
        <div class="container">
          <div class="approach-head">
            <span class="kicker">${esc(ABOUT_DATA.approach.kicker)}</span>
            <h2 class="headline-xl">${esc(ABOUT_DATA.approach.headline)}</h2>
          </div>
          <p class="approach-paragraph">${esc(ABOUT_DATA.approach.paragraph)}</p>
        </div>
      </section>`;
    return (
      heroSection(d) +
      whatWeDoSection(d.whatWeDo) +
      approachHtml +
      processSection(d.processHeadline) +
      ctaSection(d.cta)
    );
  }

  function contactPage() {
    const cd = CONTACT_DATA;
    const chips = cd.serviceOptions
      .map(
        (s) => `
        <button type="button" class="service-chip" data-service-chip="${esc(s)}">${esc(s)} <span class="chip-check hidden">${icon('check', 14)}</span></button>`
      )
      .join('');
    return `
      <section class="hero" data-hero-scope>
        <div class="container">
          <div class="hero-content">
            <span class="kicker gsap-hero-kicker">${esc(cd.kicker)}</span>
            <h1 class="hero-headline gsap-hero-headline">${esc(cd.heroHeadline)}</h1>
            <p class="hero-description gsap-hero-description">${esc(cd.heroDescription)}</p>
            <div class="hero-actions gsap-hero-actions">
              <button class="btn btn-primary magnetic" id="jumpToForm">${esc(cd.jumpButtonText)} <span class="arrow">→</span></button>
            </div>
          </div>
        </div>
      </section>

      <section class="section section-dark" id="contact-form-section">
        <div class="container">
          <div class="contact-grid">
            <div class="contact-form-card">
              <div id="formWrap">
                <form id="contactForm" novalidate>
                  <div class="form-grid cols-2">
                    <div class="field">
                      <label for="f-name">Name <span class="req">*</span></label>
                      <input type="text" id="f-name" name="name" placeholder="Your name" autocomplete="name" />
                      <span class="field-error" data-error-for="name" hidden></span>
                    </div>
                    <div class="field">
                      <label for="f-email">Email <span class="req">*</span></label>
                      <input type="email" id="f-email" name="email" placeholder="you@company.com" autocomplete="email" />
                      <span class="field-error" data-error-for="email" hidden></span>
                    </div>
                  </div>
                  <div class="form-grid" style="margin-top:20px">
                    <div class="field">
                      <label for="f-company">Company / agency <span style="color:#525252">(optional)</span></label>
                      <input type="text" id="f-company" name="company" placeholder="Company name" autocomplete="organization" />
                    </div>
                  </div>
                  <div class="form-grid" style="margin-top:20px">
                    <div class="field">
                      <label>Service <span class="req">*</span></label>
                      <div class="service-chips" id="serviceChips">${chips}</div>
                      <span class="field-error" data-error-for="services" hidden></span>
                    </div>
                  </div>
                  <div class="form-grid" style="margin-top:20px">
                    <div class="field">
                      <label for="f-timeline">Target launch date / timeline <span style="color:#525252">(optional)</span></label>
                      <input type="text" id="f-timeline" name="timeline" placeholder="e.g. Q3 2026" />
                    </div>
                  </div>
                  <div class="form-grid" style="margin-top:20px">
                    <div class="field">
                      <label for="f-brief">Brief <span class="req">*</span></label>
                      <textarea id="f-brief" name="brief" rows="5" placeholder="Tell us about the project, audience and goals..."></textarea>
                      <span class="field-error" data-error-for="brief" hidden></span>
                    </div>
                  </div>
                  <p class="form-privacy">${esc(cd.sidebar.privacyNote)}</p>
                  <div class="form-submit">
                    <button type="submit" class="btn btn-primary">Send enquiry <span class="arrow">→</span></button>
                  </div>
                </form>
              </div>
            </div>

            <div class="contact-sidebar">
              <div class="sidebar-card">
                <h3>${esc(cd.sidebar.preferTitle)}</h3>
                <p>${esc(cd.sidebar.preferText)}</p>
                <a class="sidebar-ig" href="${cd.sidebar.instagramUrl}" target="_blank" rel="noopener noreferrer">
                  ${icon('instagram', 16)} ${esc(cd.sidebar.instagramHandle)}
                </a>
              </div>
              <div class="sidebar-card">
                <h3>${esc(cd.sidebar.whatHelpsTitle)}</h3>
                <ul class="sidebar-bullets">
                  ${cd.sidebar.bulletPoints.map((b) => `<li>${esc(b)}</li>`).join('')}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>`;
  }

  /* ============================================================
     PAGE BEHAVIORS
     ============================================================ */

  let timelineTickerFn = null;
  let timelinePlaying = false;
  let timelinePos = 38;
  let showreelTimer = null;
  let showreelProgress = 0;
  let showreelPlaying = false;
  let showreelMuted = false;

  function initPageBehaviors(page) {
    // Hero entrance (runs immediately, behind the loading screen on first load — as in the React app)
    animateHeroEntrance($('[data-hero-scope]'));

    // Scroll-triggered section reveals
    const wwd = $('#what-we-do');
    if (wwd) setupWhatWeDoAnimation(wwd);

    const processHeader = $('.gsap-process-header');
    if (processHeader) setupProcessAnimation(processHeader.closest('section'));

    const cta = $('.section-green');
    if (cta) setupCtaAnimation(cta);

    setupGenericReveals(app);

    // Magnetic hero CTA
    $$('.gsap-hero-actions .magnetic').forEach((btn) => attachMagneticEffect(btn));

    // Study cards: 3D tilt + lightbox
    bindStudyCards(app);

    // Filter pills (home)
    $$('[data-filter]').forEach((pill) => {
      pill.addEventListener('click', () => {
        state.workFilter = pill.dataset.filter;
        applyWorkFilter();
      });
    });

    // Showreel triggers
    $$('[data-open-showreel]').forEach((btn) => btn.addEventListener('click', openShowreel));

    // Craft: timeline + aspect viewer
    if (page === 'craft') {
      initEditTimeline();
      initAspectViewer();
    }

    // Contact
    if (page === 'contact') initContactForm();

    const jump = $('#jumpToForm');
    if (jump) jump.addEventListener('click', () => $('#contact-form-section').scrollIntoView({ behavior: 'smooth' }));
  }

  function bindStudyCards(root) {
    $$('[data-study-id]', root).forEach((card) => {
      attachStudyTilt(card);
      card.addEventListener('click', () => {
        const study = findStudy(card.dataset.studyId);
        if (study) openLightbox(study);
      });
    });
  }

  function findStudy(id) {
    const pools = [ALL_VISUAL_STUDIES];
    Object.values(SERVICE_PAGES).forEach((p) => {
      if (p.visualDirection && p.visualDirection.cards) pools.push(p.visualDirection.cards);
    });
    for (const pool of pools) {
      const found = pool.find((s) => s.id === id);
      if (found) return found;
    }
    return null;
  }

  /* ---------- Work filter ---------- */
  function applyWorkFilter() {
    const grid = $('#studiesGrid');
    if (!grid) return;
    $$('[data-filter]').forEach((p) => p.classList.toggle('active', p.dataset.filter === state.workFilter));
    let cards;
    if (state.workFilter === 'Featured') cards = ALL_VISUAL_STUDIES.slice(0, 2);
    else if (state.workFilter === 'All') cards = ALL_VISUAL_STUDIES;
    else cards = ALL_VISUAL_STUDIES.filter((s) => s.category === state.workFilter);
    grid.innerHTML = cards.map((c) => studyCard(c)).join('');
    bindStudyCards(grid);
    if (typeof gsap !== 'undefined' && !reduceMotion()) {
      gsap.fromTo(
        $$('.study-card', grid),
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', stagger: 0.06 }
      );
    }
  }

  /* ---------- Lightbox ---------- */
  function openLightbox(study) {
    state.lightboxStudy = study;
    $('#lightboxKicker').textContent = `${study.category} Study`;
    $('#lightboxTitle').textContent = study.title;
    const img = $('#lightboxImg');
    img.src = study.image;
    img.alt = study.title;
    $('#lightboxSubtitle').textContent = study.subtitle;
    $('#lightboxDetails').textContent = study.details || '';
    $('#lightbox').classList.add('open');
    document.body.classList.add('no-scroll');
  }

  function closeLightbox() {
    $('#lightbox').classList.remove('open');
    document.body.classList.remove('no-scroll');
    state.lightboxStudy = null;
  }

  function discussStudy(category) {
    closeLightbox();
    const service = CATEGORY_TO_SERVICE[category] || 'Not sure yet';
    navigate('contact', service);
  }

  /* ---------- Showreel ---------- */
  function openShowreel() {
    $('#showreel').classList.add('open');
    document.body.classList.add('no-scroll');
    showreelProgress = 0;
    updateShowreelUI();
  }

  function closeShowreel() {
    $('#showreel').classList.remove('open');
    document.body.classList.remove('no-scroll');
    stopShowreel();
  }

  function playShowreel() {
    showreelPlaying = true;
    $('#showreelViewport').classList.add('playing');
    if (showreelTimer) clearInterval(showreelTimer);
    showreelTimer = setInterval(() => {
      showreelProgress += 0.5;
      if (showreelProgress >= 100) showreelProgress = 0;
      updateShowreelUI();
    }, 200);
    updateShowreelUI();
  }

  function pauseShowreel() {
    showreelPlaying = false;
    $('#showreelViewport').classList.remove('playing');
    if (showreelTimer) clearInterval(showreelTimer);
    showreelTimer = null;
    updateShowreelUI();
  }

  function stopShowreel() {
    pauseShowreel();
    showreelProgress = 0;
    updateShowreelUI();
  }

  function toggleShowreel() {
    showreelPlaying ? pauseShowreel() : playShowreel();
  }

  function updateShowreelUI() {
    $('#showreelProgressFill').style.width = showreelProgress + '%';
    const totalSec = 135; // 2:15
    const cur = Math.floor((showreelProgress / 100) * totalSec);
    const mm = String(Math.floor(cur / 60)).padStart(2, '0');
    const ss = String(cur % 60).padStart(2, '0');
    const ff = String(Math.floor(((showreelProgress % 1) || 0) * 24)).padStart(2, '0');
    $('#showreelTc').textContent = `TC 00:${mm}:${ss}:${ff} / 00:02:15:00`;
    $('#showreelPlayIcon').firstElementChild?.setAttribute('href', showreelPlaying ? '#i-pause' : '#i-play');
    $('#showreelToggleIcon').firstElementChild?.setAttribute('href', showreelPlaying ? '#i-pause' : '#i-play');
    $('#showreelPlayBtn').style.opacity = showreelPlaying ? '0' : '1';
    $('#showreelPlayBtn').style.pointerEvents = showreelPlaying ? 'none' : 'auto';
  }

  /* ---------- Edit timeline (scrubber driven by gsap.ticker) ---------- */
  function initEditTimeline() {
    const card = $('#editTimeline');
    if (!card || typeof gsap === 'undefined') return;
    const playhead = $('.playhead', card);
    const tcEl = $('#timelineTc');
    const lanes = $$('.timeline-lane', card);

    const setPos = (p) => {
      timelinePos = Math.max(0, Math.min(100, p));
      playhead.style.left = timelinePos + '%';
      const totalSec = 138;
      const cur = Math.floor((timelinePos / 100) * totalSec);
      const mm = String(Math.floor(cur / 60)).padStart(2, '0');
      const ss = String(cur % 60).padStart(2, '0');
      tcEl.textContent = `TC 00:${mm}:${ss}:12`;
    };

    lanes.forEach((lane) => {
      lane.addEventListener('click', (e) => {
        const r = lane.getBoundingClientRect();
        setPos(((e.clientX - r.left) / r.width) * 100);
      });
    });

    $$('.timeline-track-name', card).forEach((btn) => {
      btn.addEventListener('click', () => {
        $$('.timeline-track-name', card).forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
      });
    });

    const playBtn = $('#timelinePlay');

    playBtn.addEventListener('click', () => {
      timelinePlaying = !timelinePlaying;
      playBtn.innerHTML = icon(timelinePlaying ? 'pause' : 'play', 14);
      const dot = $('.timeline-dot', card);
      if (dot) dot.style.animationPlayState = timelinePlaying ? 'running' : 'paused';

      if (timelinePlaying) {
        timelineTickerFn = () => {
          let next = timelinePos + 0.35;
          if (next > 100) next = 0;
          setPos(next);
        };
        gsap.ticker.add(timelineTickerFn);
      } else if (timelineTickerFn) {
        gsap.ticker.remove(timelineTickerFn);
        timelineTickerFn = null;
      }
    });
  }

  /* ---------- Aspect ratio viewer ---------- */
  function initAspectViewer() {
    $$('.aspect-card').forEach((card) => {
      card.addEventListener('click', () => {
        $$('.aspect-card').forEach((c) => c.classList.remove('selected'));
        card.classList.add('selected');
      });
    });
  }

  /* ---------- Contact form ---------- */
  function initContactForm() {
    const form = $('#contactForm');
    if (!form) return;
    const selected = new Set();
    let storedService = null;
    try {
      storedService = sessionStorage.getItem('manifold_selected_service');
      sessionStorage.removeItem('manifold_selected_service');
    } catch (e) { /* storage unavailable */ }
    if (storedService) {
      selected.add(storedService);
      setTimeout(updateChips, 0);
    }

    function updateChips() {
      $$('[data-service-chip]').forEach((chip) => {
        const on = selected.has(chip.dataset.serviceChip);
        chip.classList.toggle('selected', on);
        const check = $('.chip-check', chip);
        if (check) check.classList.toggle('hidden', !on);
      });
    }

    $$('[data-service-chip]').forEach((chip) => {
      chip.addEventListener('click', () => {
        const val = chip.dataset.serviceChip;
        if (val === 'Not sure yet') {
          if (selected.has(val)) selected.delete(val);
          else {
            selected.clear();
            selected.add(val);
          }
        } else {
          selected.delete('Not sure yet');
          selected.has(val) ? selected.delete(val) : selected.add(val);
        }
        updateChips();
      });
    });

    function showError(name, msg) {
      const el = $(`[data-error-for="${name}"]`);
      if (el) {
        el.textContent = msg;
        el.hidden = !msg;
      }
      const input = $(`[name="${name}"]`);
      if (input) input.classList.toggle('error', !!msg);
    }

    function clearErrors() {
      ['name', 'email', 'brief'].forEach((n) => showError(n, ''));
      const se = $('[data-error-for="services"]');
      if (se) { se.textContent = ''; se.hidden = true; }
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      clearErrors();
      let ok = true;
      const name = $('#f-name').value.trim();
      const email = $('#f-email').value.trim();
      const company = $('#f-company').value.trim();
      const timeline = $('#f-timeline').value.trim();
      const brief = $('#f-brief').value.trim();

      if (!name) { showError('name', 'Please enter your name.'); ok = false; }
      if (!email) { showError('email', 'Please enter your email.'); ok = false; }
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { showError('email', 'Please enter a valid email address.'); ok = false; }
      if (selected.size === 0) {
        const se = $('[data-error-for="services"]');
        if (se) { se.textContent = 'Please select at least one service.'; se.hidden = false; }
        ok = false;
      }
      if (!brief) { showError('brief', 'Please tell us about your project.'); ok = false; }
      else if (brief.length < 15) { showError('brief', 'Please provide a little more detail (at least 15 characters).'); ok = false; }

      if (!ok) return;

      const submitBtn = $('button[type="submit"]', form);
      submitBtn.disabled = true;
      submitBtn.style.opacity = '0.7';

      setTimeout(() => {
        const ref = 'MNF-' + String(Date.now()).slice(-4);
        try {
          const existing = JSON.parse(localStorage.getItem('manifold_enquiries') || '[]');
          existing.push({ id: ref, name, email, company, services: [...selected], timeline, brief, createdAt: new Date().toISOString() });
          localStorage.setItem('manifold_enquiries', JSON.stringify(existing));
        } catch (err) { /* storage unavailable */ }

        $('#formWrap').innerHTML = `
          <div class="success-card">
            <div class="success-icon">${icon('check-circle', 32)}</div>
            <div class="success-ref">DELIVERY CONFIRMED · REF #${ref}</div>
            <h3>Thank you, ${esc(name)}.</h3>
            <p>Your enquiry has been received. We will review the details and come back to you within 1–2 working days.</p>
            <div class="success-summary">
              <div class="row"><span class="k">Services</span><span class="v">${esc([...selected].join(', '))}</span></div>
              ${company ? `<div class="row"><span class="k">Company</span><span class="v">${esc(company)}</span></div>` : ''}
              ${timeline ? `<div class="row"><span class="k">Timeline</span><span class="v">${esc(timeline)}</span></div>` : ''}
            </div>
            <div style="margin-top:28px">
              <button class="btn btn-secondary" id="sendAnother">Send another enquiry</button>
            </div>
          </div>`;
        $('#sendAnother').addEventListener('click', () => renderPage('contact'));
      }, 600);
    });
  }

  /* ============================================================
     NAVBAR / DRAWER
     ============================================================ */

  function initNavbar() {
    $('#servicesDropdownItems').innerHTML = NAV_SERVICES.map(
      (s) => `
      <button class="nav-dropdown-item" data-page="${s.page}" role="menuitem">
        <span>
          <span class="dd-title">${esc(s.label)}</span>
          <span class="dd-desc" style="display:block">${esc(s.desc)}</span>
        </span>
        <span class="dd-arrow">${icon('arrow-up-right', 16)}</span>
      </button>`
    ).join('');

    $('#drawerServices').innerHTML = NAV_SERVICES.map(
      (s) => `
      <button class="drawer-service" data-nav="${s.page}">
        <div class="ds-title">${esc(s.label)}</div>
        <div class="ds-desc">${esc(s.desc)}</div>
      </button>`
    ).join('');

    const dd = $('#servicesDropdown');
    const trigger = $('#servicesTrigger');
    let ddOpen = false;
    const setDd = (open) => {
      ddOpen = open;
      dd.classList.toggle('open', open);
      trigger.setAttribute('aria-expanded', String(open));
    };
    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      setDd(!ddOpen);
    });
    dd.addEventListener('mouseenter', () => {
      if (window.matchMedia('(min-width: 768px)').matches) setDd(true);
    });
    dd.addEventListener('mouseleave', () => {
      if (window.matchMedia('(min-width: 768px)').matches) setDd(false);
    });
    document.addEventListener('click', (e) => {
      if (ddOpen && !dd.contains(e.target)) setDd(false);
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && ddOpen) setDd(false);
    });
    $$('.nav-dropdown-item').forEach((item) =>
      item.addEventListener('click', () => {
        setDd(false);
        navigate(item.dataset.page);
      })
    );

    const burger = $('#navBurger');
    burger.addEventListener('click', () => {
      setDrawer(!$('#mobileDrawer').classList.contains('open'));
    });
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 768) setDrawer(false);
    });
  }

  function setDrawer(open) {
    const drawer = $('#mobileDrawer');
    const burger = $('#navBurger');
    drawer.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', String(open));
    $('#burgerIcon').firstElementChild?.setAttribute('href', open ? '#i-x' : '#i-menu');
    document.body.classList.toggle('no-scroll', open);
  }

  function closeDrawer() {
    if ($('#mobileDrawer').classList.contains('open')) setDrawer(false);
  }

  /* ============================================================
     GLOBAL CLICK DELEGATION
     ============================================================ */

  function initGlobalClicks() {
    document.addEventListener('click', (e) => {
      const navEl = e.target.closest('[data-nav]');
      if (navEl) {
        e.preventDefault();
        navigate(navEl.dataset.nav, navEl.dataset.service || undefined);
        return;
      }
      if (e.target.closest('[data-close-lightbox]')) { closeLightbox(); return; }
      if (e.target.closest('[data-close-showreel]')) { closeShowreel(); return; }
    });

    $('#lightboxDiscuss').addEventListener('click', () => {
      if (state.lightboxStudy) discussStudy(state.lightboxStudy.category);
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if ($('#lightbox').classList.contains('open')) closeLightbox();
        if ($('#showreel').classList.contains('open')) closeShowreel();
      }
    });

    $('#showreelPlayBtn').addEventListener('click', playShowreel);
    $('#showreelPlayToggle').addEventListener('click', toggleShowreel);
    $('#showreelMute').addEventListener('click', () => {
      showreelMuted = !showreelMuted;
      $('#showreelMuteIcon').firstElementChild?.setAttribute('href', showreelMuted ? '#i-volume-x' : '#i-volume');
    });
    $('#showreelProgress').addEventListener('click', (e) => {
      const r = e.currentTarget.getBoundingClientRect();
      showreelProgress = ((e.clientX - r.left) / r.width) * 100;
      updateShowreelUI();
    });
    $('#showreelFullscreen').addEventListener('click', () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen?.();
      } else {
        document.exitFullscreen?.();
      }
    });
  }

  /* ============================================================
     CUSTOM CURSOR (port of StudioCursor.tsx — gsap.quickTo)
     ============================================================ */

  function initCursor() {
    if (!finePointer() || typeof gsap === 'undefined') return;
    const cursor = $('#cursorRing');
    const dot = $('#cursorDot');
    const textEl = $('#cursorText');
    let isVisible = false;

    const xTo = gsap.quickTo(cursor, 'x', { duration: 0.25, ease: 'power3' });
    const yTo = gsap.quickTo(cursor, 'y', { duration: 0.25, ease: 'power3' });
    const dotXTo = gsap.quickTo(dot, 'x', { duration: 0.08, ease: 'power2' });
    const dotYTo = gsap.quickTo(dot, 'y', { duration: 0.08, ease: 'power2' });

    const handleMouseMove = (e) => {
      if (!isVisible) {
        isVisible = true;
        document.body.classList.remove('cursor-hidden');
      }
      xTo(e.clientX);
      yTo(e.clientY);
      dotXTo(e.clientX);
      dotYTo(e.clientY);

      const target = e.target;
      if (!target) return;

      const studyCard = target.closest('[data-cursor="study"]');
      const reelTrigger = target.closest('[data-cursor="play"]');
      const interactiveBtn = target.closest('button, a, [role="button"]');

      if (studyCard || reelTrigger) {
        textEl.textContent = studyCard ? 'VIEW' : 'PLAY';
        cursor.classList.add('is-hovered');
        gsap.to(cursor, {
          scale: 1.8,
          backgroundColor: '#1FCD6E',
          borderColor: '#1FCD6E',
          duration: 0.2,
        });
        gsap.to(dot, { opacity: 0, duration: 0.2 });
      } else if (interactiveBtn) {
        textEl.textContent = '';
        cursor.classList.add('is-hovered');
        gsap.to(cursor, {
          scale: 1.3,
          backgroundColor: 'transparent',
          borderColor: '#1FCD6E',
          duration: 0.2,
        });
        gsap.to(dot, { opacity: 0.7, scale: 0.6, duration: 0.2 });
      } else {
        textEl.textContent = '';
        cursor.classList.remove('is-hovered');
        gsap.to(cursor, {
          scale: 1,
          backgroundColor: 'transparent',
          borderColor: 'rgba(255, 255, 255, 0.4)',
          duration: 0.2,
        });
        gsap.to(dot, { opacity: 1, scale: 1, duration: 0.2 });
      }
    };

    document.body.classList.add('cursor-hidden');
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', () => {
      isVisible = false;
      document.body.classList.add('cursor-hidden');
    });
  }

  /* ============================================================
     LOADING SCREEN (port of LoadingScreen.tsx — GSAP timeline)
     ============================================================ */

  function runLoadingScreen(done) {
    const container = $('#loadingScreen');
    const counterEl = $('#loadingPct');
    const progressBarEl = $('#loadingBarFill');
    const stepperEl = $('#loadingStepper');
    const skipBtn = $('#skipLoading');
    const minDuration = 2400;
    let isFinished = false;

    // Cinematic intro plays once per browser session (as in the SPA original);
    // subsequent page files boot straight into the content.
    let seen = false;
    try { seen = sessionStorage.getItem('manifold_loading_seen') === '1'; } catch (e) { /* storage unavailable */ }
    if (seen) {
      container.classList.add('hidden');
      if (done) done();
      return;
    }
    try { sessionStorage.setItem('manifold_loading_seen', '1'); } catch (e) { /* storage unavailable */ }

    const disciplines = [
      '01 // FILM PRODUCTION',
      '02 // CREATIVE DIRECTION',
      '03 // SYNTHETIC AI & HYBRID',
      '04 // CRAFT & EDITORIAL',
      '05 // CONTENT & STILLS',
    ];
    let discIndex = 0;
    const disciplineInterval = setInterval(() => {
      discIndex = (discIndex + 1) % disciplines.length;
      stepperEl.textContent = disciplines[discIndex];
    }, 420);

    const finishUp = () => {
      clearInterval(disciplineInterval);
      isFinished = true;
      container.classList.add('hidden');
      container.style.display = 'none';
      if (done) done();
    };

    const counterObj = { val: 0 };
    const masterTl = gsap.timeline({ onComplete: finishUp });

    // 1. Initial state setup
    gsap.set('.loader-slat', { yPercent: 0 });
    gsap.set('.loader-facet', { transformOrigin: 'center center', scale: 0.8, opacity: 0 });
    gsap.set('.loader-content', { opacity: 0, y: 15 });

    // 2. Entrance animation
    masterTl
      .to('.loader-content', {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
        stagger: 0.08,
      })
      .to(
        '.loader-facet',
        {
          scale: 1,
          opacity: 1,
          duration: 0.7,
          stagger: 0.09,
          ease: 'back.out(1.4)',
        },
        '-=0.4'
      );

    // 3. Counter & progress bar tween
    masterTl.to(
      counterObj,
      {
        val: 100,
        duration: (minDuration - 600) / 1000,
        ease: 'power2.inOut',
        onUpdate: () => {
          const currentVal = Math.floor(counterObj.val);
          counterEl.textContent = currentVal < 10 ? `0${currentVal}` : `${currentVal}`;
          progressBarEl.style.width = `${counterObj.val}%`;
        },
      },
      '-=0.4'
    );

    // 4. Subtle scale pulse on the logo when hitting 100%
    masterTl.to('.loader-emblem-wrap', { scale: 1.05, duration: 0.25, ease: 'power1.out' }, '+=0.05');

    // 5. Fade out content before curtain wipe
    masterTl.to(
      ['.loader-viewfinder', '.loader-center', '.loader-bottom'],
      { opacity: 0, duration: 0.45, ease: 'power3.in' },
      '+=0.05'
    );

    // 6. Signature slats / curtain upward wipe
    masterTl.to(
      '.loader-slat',
      { yPercent: -100, duration: 0.8, stagger: 0.06, ease: 'power4.inOut' },
      '-=0.15'
    );

    // 7. Hide whole container
    masterTl.to(container, { display: 'none', duration: 0.01 });

    // Skip handler (fast-forward)
    const handleSkip = () => {
      if (isFinished) return;
      clearInterval(disciplineInterval);
      gsap.killTweensOf(container);
      gsap.killTweensOf('.loader-slat');
      gsap.killTweensOf('.loader-content');
      gsap.killTweensOf('.loader-facet');
      gsap.killTweensOf('.loader-emblem-wrap');
      gsap.killTweensOf(['.loader-viewfinder', '.loader-center', '.loader-bottom']);
      gsap.killTweensOf(counterObj);
      gsap.to(['.loader-viewfinder', '.loader-center', '.loader-bottom'], {
        opacity: 0,
        duration: 0.25,
        ease: 'power2.in',
      });
      gsap.to('.loader-slat', {
        yPercent: -100,
        duration: 0.5,
        stagger: 0.04,
        ease: 'power4.inOut',
        onComplete: finishUp,
      });
    };

    skipBtn.addEventListener('click', handleSkip);
    const escHandler = (e) => {
      if (e.key === 'Escape') {
        handleSkip();
        document.removeEventListener('keydown', escHandler);
      }
    };
    document.addEventListener('keydown', escHandler);
  }

  /* ============================================================
     BOOT
     ============================================================ */

  function boot() {
    initNavbar();
    initGlobalClicks();
    initCursor();
    state.page = INITIAL_PAGE;
    renderPage(state.page);
    window.addEventListener('hashchange', () => {
      if (window.location.hash === '#work' && state.page === 'home') scrollToWork();
    });
    runLoadingScreen(() => {
      if (window.location.hash === '#work' && state.page === 'home') scrollToWork();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
