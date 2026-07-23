/**
 * ============================================================
 *  AXVELO — Main JavaScript
 *  Handles: config injection, navbar, mouse glow, particles,
 *  tools marquee, services, why-choose-us, founder, counters,
 *  scroll progress, scroll-to-top, reveal animations, magnets
 * ============================================================
 */

(function () {
  'use strict';

  const cfg = window.SITE_CONFIG || {};

  /* ─────────────────────────────────────────────
     HELPERS
  ───────────────────────────────────────────── */
  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return Array.from((ctx || document).querySelectorAll(sel)); }

  function smoothScroll(id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }

  /* ─────────────────────────────────────────────
     APPLY CONFIG VALUES TO DOM
  ───────────────────────────────────────────── */
  function applyConfig() {
    const s  = cfg.social  || {};
    const fo = cfg.founder || {};
    const ft = cfg.footer  || {};

    // Year
    const yr = document.getElementById('footer-year');
    if (yr) yr.textContent = new Date().getFullYear();

    // Footer copyright
    const fc = document.getElementById('footer-copyright');
    if (fc && ft.copyright) fc.textContent = '© ' + new Date().getFullYear() + ' ' + ft.copyright;

    // Social links (footer)
    _setHref('footer-ig',    s.instagram || '#');
    _setHref('footer-wa',    s.whatsapp  || '#');
    _setHref('footer-email', s.email     || '#');

    // Floating buttons
    _setHref('floating-ig', s.instagram || '#');
    _setHref('floating-wa', s.whatsapp  || '#');

    // Contact section
    _setHref('contact-email-card', s.email    || '#');
    _setHref('contact-wa-card',    s.whatsapp || '#');
    _setHref('contact-ig-card',    s.instagram|| '#');
    _setHref('contact-book-btn',   s.email    || '#');

    const cev = document.getElementById('contact-email-value');
    if (cev && cfg.email) cev.textContent = cfg.email;

    // Instagram handle (contact card)
    const igv = $('#contact-ig-card .contact-card-value');
    if (igv && s.instagram) {
      const handle = s.instagram.replace('https://instagram.com/', '').replace('https://www.instagram.com/', '');
      igv.textContent = '@' + handle;
    }

    // Founder section
    const fnp = document.getElementById('founder-photo');
    if (fnp && fo.photo) { fnp.src = fo.photo; fnp.alt = fo.name + ' — ' + fo.role + ' of AXVELO'; }

    _setText('founder-name',       fo.name);
    _setText('founder-name-badge', fo.name);
    _setText('founder-title',      (fo.role || '') + ' of AXVELO');
    _setText('founder-role',       fo.role);
    _setText('founder-age',        fo.age);
    _setText('founder-bio',        fo.bio);

    // Founder skills
    const skillsEl = document.getElementById('founder-skills');
    if (skillsEl && fo.skills) {
      skillsEl.innerHTML = (fo.skills).map(s =>
        `<span class="founder-skill">${s}</span>`
      ).join('');
    }

    // Founder stats (static render; counters animated separately)
    const statsEl = document.getElementById('founder-stats');
    if (statsEl && fo.stats) {
      statsEl.innerHTML = (fo.stats).map((st, i) =>
        `<div class="founder-stat stagger-${i+1} reveal">
           <div class="founder-stat-value" data-count="${st.value}" data-suffix="${st.suffix || ''}" >0${st.suffix || ''}</div>
           <div class="founder-stat-label">${st.label}</div>
         </div>`
      ).join('');
    }
  }

  function _setHref(id, href) {
    const el = document.getElementById(id);
    if (el) el.href = href;
  }
  function _setText(id, text) {
    const el = document.getElementById(id);
    if (el && text) el.textContent = text;
  }

  /* ─────────────────────────────────────────────
     TOOLS MARQUEE
  ───────────────────────────────────────────── */
  function initToolsMarquee() {
    const track = document.getElementById('tools-marquee');
    if (!track || !cfg.tools) return;
    // repeat 4x for seamless loop
    const repeated = [...cfg.tools, ...cfg.tools, ...cfg.tools, ...cfg.tools];
    track.innerHTML = repeated.map(t =>
      `<span class="marquee-item">${t}</span>`
    ).join('');
  }

  /* ─────────────────────────────────────────────
     SERVICES CARDS
  ───────────────────────────────────────────── */
  const ICON_MAP = {
    'pen-tool': 'fa-solid fa-pen-nib',
    'video':    'fa-solid fa-video',
    'monitor':  'fa-solid fa-desktop',
    'map-pin':  'fa-solid fa-location-dot',
  };

  function initServices() {
    const grid = document.getElementById('services-grid');
    if (!grid || !cfg.services) return;
    grid.innerHTML = cfg.services.map((svc, i) =>
      `<div class="service-card reveal stagger-${i+1}">
         <div class="service-icon"><i class="${ICON_MAP[svc.icon] || 'fa-solid fa-star'}"></i></div>
         <h4 class="service-title">${svc.title}</h4>
         <p class="service-desc">${svc.description}</p>
       </div>`
    ).join('');
  }

  /* ─────────────────────────────────────────────
     WHY CHOOSE US REASONS
  ───────────────────────────────────────────── */
  function initWhyReasons() {
    const wrap = document.getElementById('why-reasons');
    if (!wrap || !cfg.whyChooseUs) return;
    wrap.innerHTML = (cfg.whyChooseUs.reasons || []).map((r, i) =>
      `<div class="why-reason stagger-${i+1} reveal">
         <i class="fa-solid fa-circle-check"></i>
         <span>${r}</span>
       </div>`
    ).join('');
  }

  /* ─────────────────────────────────────────────
     NAVBAR — scroll hide/show + backdrop
  ───────────────────────────────────────────── */
  function initNavbar() {
    const nav = document.getElementById('navbar');
    if (!nav) return;
    let lastY = 0;
    const THRESHOLD = 120;

    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      const delta = y - lastY;

      if (y > 50) nav.classList.add('scrolled');
      else        nav.classList.remove('scrolled');

      if (y > THRESHOLD && delta > 4)  nav.classList.add('hidden');
      else if (delta < -4 || y < THRESHOLD) nav.classList.remove('hidden');

      lastY = y;
    }, { passive: true });

    // smooth-scroll nav links
    $$('.nav-link', nav).forEach(a => {
      a.addEventListener('click', e => {
        const href = a.getAttribute('href');
        if (href && href.startsWith('#')) {
          e.preventDefault();
          smoothScroll(href.slice(1));
        }
      });
    });

    // btn-contact smooth scroll
    $$('.btn-contact', nav).forEach(btn => {
      btn.addEventListener('click', e => {
        e.preventDefault();
        smoothScroll('contact');
      });
    });
  }

  /* ─────────────────────────────────────────────
     MOUSE GLOW
  ───────────────────────────────────────────── */
  function initMouseGlow() {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const glow = document.getElementById('mouse-glow');
    if (!glow || prefersReduced) return;

    glow.style.display = 'block';
    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let cx = mx, cy = my;
    let rafId;

    window.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
    window.addEventListener('touchstart', e => { const t=e.touches[0]; if(t){mx=t.clientX; my=t.clientY;} }, {passive:true});
    window.addEventListener('touchmove', e => { const t=e.touches[0]; if(t){mx=t.clientX; my=t.clientY;} }, {passive:true});

    function animate() {
      cx += (mx - cx) * 0.07;
      cy += (my - cy) * 0.07;
      glow.style.transform = `translate3d(${cx - 220}px,${cy - 220}px,0)`;
      rafId = requestAnimationFrame(animate);
    }
    rafId = requestAnimationFrame(animate);
  }

  /* ─────────────────────────────────────────────
     FLOATING PARTICLES
  ───────────────────────────────────────────── */
  function initParticles() {
    const container = document.getElementById('particles-container');
    if (!container) return;
    const COUNT = 12;
    for (let i = 0; i < COUNT; i++) {
      const dot = document.createElement('span');
      dot.className = 'particle-dot';
      const size     = 2 + Math.random() * 3;
      const dur      = 14 + Math.random() * 12;
      const delay    = Math.random() * 8;
      const px       = Math.round(Math.random() * 60 - 30);
      const py       = Math.round(Math.random() * 90 - 45);
      dot.style.cssText = `
        left:${Math.random()*100}%;
        top:${Math.random()*100}%;
        width:${size}px; height:${size}px;
        animation-duration:${dur}s;
        animation-delay:${delay}s;
        --px:${px}px; --py:${py}px;
      `;
      container.appendChild(dot);
    }
  }

  /* ─────────────────────────────────────────────
     HERO PARALLAX ORBS (mouse)
  ───────────────────────────────────────────── */
  function initHeroParallax() {
    const hero = document.getElementById('hero');
    const orbs = $$('.hero-orb', hero);
    if (!hero || !orbs.length) return;

    let tx = 0, ty = 0;
    let ox = 0, oy = 0;
    let rafId;

    function loop() {
      ox += (tx - ox) * 0.06;
      oy += (ty - oy) * 0.06;
      orbs.forEach(orb => {
        const factor = parseFloat(orb.dataset.parallax) || 0.4;
        orb.style.transform = `translate(${ox * factor}px, ${oy * factor}px)`;
      });
      rafId = requestAnimationFrame(loop);
    }

    hero.addEventListener('mousemove', e => {
      const rect = hero.getBoundingClientRect();
      tx = ((e.clientX - rect.left) / rect.width  - 0.5) * 60;
      ty = ((e.clientY - rect.top)  / rect.height - 0.5) * 60;
    });
    hero.addEventListener('mouseleave', () => { tx = 0; ty = 0; });
    rafId = requestAnimationFrame(loop);
  }

  /* ─────────────────────────────────────────────
     MAGNET BUTTONS
  ───────────────────────────────────────────── */
  function initMagnets() {
    $$('.magnet').forEach(el => {
      el.addEventListener('mousemove', e => {
        const r = el.getBoundingClientRect();
        const x = e.clientX - r.left - r.width  / 2;
        const y = e.clientY - r.top  - r.height / 2;
        el.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px) scale(1.05)`;
      });
      el.addEventListener('mouseleave', () => {
        el.style.transform = '';
      });
    });
  }

  /* ─────────────────────────────────────────────
     SCROLL PROGRESS BAR
  ───────────────────────────────────────────── */
  function initScrollProgress() {
    const fill = document.getElementById('scroll-fill');
    if (!fill) return;
    window.addEventListener('scroll', () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const pct = max > 0 ? window.scrollY / max : 0;
      fill.style.transform = `scaleY(${pct})`;
    }, { passive: true });
  }

  /* ─────────────────────────────────────────────
     SCROLL-TO-TOP BUTTONS
  ───────────────────────────────────────────── */
  function initScrollToTop() {
    const btn1 = document.getElementById('scroll-top-btn');
    const btn2 = document.getElementById('footer-top-btn');

    const goTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    window.addEventListener('scroll', () => {
      if (btn1) {
        if (window.scrollY > 500) btn1.classList.add('visible');
        else                      btn1.classList.remove('visible');
      }
    }, { passive: true });

    if (btn1) btn1.addEventListener('click', goTop);
    if (btn2) btn2.addEventListener('click', goTop);
  }

  /* ─────────────────────────────────────────────
     REVEAL ANIMATIONS (IntersectionObserver)
  ───────────────────────────────────────────── */
  function initReveal() {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      $$('.reveal, .reveal-left, .reveal-right').forEach(el => el.classList.add('revealed'));
      return;
    }

    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

    // Observe elements already in DOM
    $$('.reveal, .reveal-left, .reveal-right').forEach(el => io.observe(el));

    // Re-observe when dynamic content is added (services, why-reasons, stats)
    const mo = new MutationObserver(() => {
      $$('.reveal:not(.revealed), .reveal-left:not(.revealed), .reveal-right:not(.revealed)')
        .forEach(el => io.observe(el));
    });
    mo.observe(document.body, { childList: true, subtree: true });
  }

  /* ─────────────────────────────────────────────
     ANIMATED COUNTERS
  ───────────────────────────────────────────── */
  function initCounters() {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el    = entry.target;
        if (el.dataset.animated === "true") return;
el.dataset.animated = "true";
        const end   = parseInt(el.dataset.count, 10);
        const sfx   = el.dataset.suffix || '';
        const dur   = 1800;
        let start   = null;

        function step(ts) {
          if (!start) start = ts;
          const progress = Math.min((ts - start) / dur, 1);
          const eased    = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.floor(eased * end) + sfx;
          if (progress < 1) requestAnimationFrame(step);
          else el.textContent = end + sfx;
        }
        requestAnimationFrame(step);
        io.unobserve(el);
      });
    }, { threshold: 0.5 });

    // Observe existing + future counter elements
    function observeCounters() {
      $$('[data-count]').forEach(el => io.observe(el));
    }
    observeCounters();
    const mo = new MutationObserver(observeCounters);
    mo.observe(document.body, { childList: true, subtree: true });
  }

  /* ─────────────────────────────────────────────
     CTA smooth-scroll links
  ───────────────────────────────────────────── */
  function initSmoothScrollLinks() {
    $$('a[href^="#"]').forEach(a => {
      a.addEventListener('click', e => {
        const id = a.getAttribute('href').slice(1);
        const target = document.getElementById(id);
        if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
      });
    });
  }

  /* ─────────────────────────────────────────────
     INIT
  ───────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', () => {
    applyConfig();
    initToolsMarquee();
    initServices();
    initWhyReasons();
    initNavbar();
    initMouseGlow();
    initParticles();
    initHeroParallax();
    initMagnets();
    initScrollProgress();
    initScrollToTop();
    initReveal();
    initCounters();
    initSmoothScrollLinks();
  });

})();
