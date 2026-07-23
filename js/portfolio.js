/**
 * ============================================================
 *  AXVELO — Portfolio Renderer
 *  Reads window.PROJECTS_DATA (from data/projects.js) and
 *  renders the masonry portfolio grid with 3D tilt + shine.
 * ============================================================
 */

(function () {
  'use strict';

  /* ─────────────────────────────────────────────
     RENDER PORTFOLIO CARDS
  ───────────────────────────────────────────── */
  function renderPortfolio(projects) {
    const grid = document.getElementById('portfolio-grid');
    if (!grid) return;

    grid.innerHTML = projects.map((p, idx) => {
      const delay = (idx % 3) * 0.1;
      const tools = (p.tools || []).map(t =>
        `<span class="portfolio-tool">${t}</span>`
      ).join('');

      return `
        <div class="portfolio-card reveal" style="transition-delay:${delay}s">
          <div class="portfolio-card-img">
            <img src="${p.image}" alt="${p.title}" loading="lazy" />
            <div class="shine-sweep"></div>
            <div class="portfolio-card-img-overlay"></div>
          </div>
          <div class="portfolio-card-body">
            <div class="portfolio-card-tools">${tools}</div>
            <h4 class="portfolio-card-title">${p.title}</h4>
            <p class="portfolio-card-cat">${p.category}</p>
            <p class="portfolio-card-desc">${p.description}</p>
          </div>
        </div>`;
    }).join('');

    // After rendering, attach 3D tilt to each card
    init3DTilt(grid);
  }

  /* ─────────────────────────────────────────────
     3D TILT EFFECT
  ───────────────────────────────────────────── */
  function init3DTilt(grid) {
    const isCoarse = window.matchMedia('(pointer: coarse)').matches;
    if (isCoarse) return; // skip on touch devices

    grid.querySelectorAll('.portfolio-card').forEach(card => {
      let currentX = 0, currentY = 0;
      let targetX  = 0, targetY  = 0;
      let rafId;

      function loop() {
        currentX += (targetX - currentX) * 0.12;
        currentY += (targetY - currentY) * 0.12;
        card.style.transform = `perspective(1000px) rotateX(${currentY}deg) rotateY(${currentX}deg)`;
        if (Math.abs(currentX - targetX) > 0.01 || Math.abs(currentY - targetY) > 0.01) {
          rafId = requestAnimationFrame(loop);
        }
      }

      card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const px   = (e.clientX - rect.left) / rect.width  - 0.5;
        const py   = (e.clientY - rect.top)  / rect.height - 0.5;
        targetX =  px * 10;
        targetY = -py * 10;
        cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(loop);
      });

      card.addEventListener('mouseleave', () => {
        targetX = 0; targetY = 0;
        cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(loop);
      });
    });
  }

  /* ─────────────────────────────────────────────
     INIT
  ───────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', () => {
    const projects = window.PROJECTS_DATA || [];
    if (projects.length === 0) {
      const grid = document.getElementById('portfolio-grid');
      if (grid) grid.innerHTML = '<p style="color:var(--muted);text-align:center;grid-column:1/-1">No projects found. Add projects to data/projects.js</p>';
      return;
    }
    renderPortfolio(projects);
  });

})();
