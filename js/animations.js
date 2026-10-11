/**
 * Campus Lost-and-Found — Premium Animation Controller
 *
 * Responsibilities:
 *  1. IntersectionObserver scroll-reveal (staggered children)
 *  2. Stat counter — eased number count-up
 *  3. Mobile nav — smooth toggle with aria sync
 *  4. Page transition — subtle fade-in on navigate
 */

(function () {
  'use strict';

  /* ─────────────────────────────────────────────
     1. SCROLL REVEAL — IntersectionObserver
     Adds .is-visible to .reveal / .reveal-scale
     elements when they enter the viewport.
     Children get staggered --delay CSS vars.
  ───────────────────────────────────────────── */
  function initScrollReveal() {
    // Sections and containers that need reveal
    const STAGGER_TARGETS = [
      '.stats-grid',
      '.guide-steps-grid',
      '.visual-categories-grid',
      '.item-grid',
      '.footer-grid',
    ];

    // Mark children for stagger
    STAGGER_TARGETS.forEach((selector) => {
      const parent = document.querySelector(selector);
      if (!parent) return;
      Array.from(parent.children).forEach((child, i) => {
        child.classList.add('reveal');
        child.style.setProperty('--delay', `${i * 60}ms`);
      });
    });

    // Add reveal to standalone section elements
    document.querySelectorAll('.guide-strip, .site-footer').forEach((el) => {
      el.classList.add('reveal');
    });

    // Observer
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target); // fire once
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );

    document.querySelectorAll('.reveal, .reveal-scale').forEach((el) =>
      io.observe(el)
    );
  }

  /* ─────────────────────────────────────────────
     2. STAT COUNTER — eased count-up animation
     Reads data-target attribute or textContent.
     Called after stats are populated by app.js.
  ───────────────────────────────────────────── */
  function animateCounter(el, target, duration) {
    const start     = performance.now();
    const startVal  = 0;

    // Ease out cubic
    function easeOut(t) {
      return 1 - Math.pow(1 - t, 3);
    }

    function tick(now) {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const current  = Math.round(easeOut(progress) * target);
      el.textContent = current;
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }

  function initStatCounters() {
    const statIds = [
      'home-stat-total',
      'home-stat-lost',
      'home-stat-found',
      'home-stat-resolved',
    ];

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el     = entry.target;
          const target = parseInt(el.textContent, 10) || 0;
          if (target > 0) animateCounter(el, target, 900);
          el.closest('.stat-card')?.classList.add('is-visible');
          io.unobserve(el);
        });
      },
      { threshold: 0.5 }
    );

    statIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
  }

  /* ─────────────────────────────────────────────
     3. MOBILE NAV TOGGLE
     Smooth open/close with aria, body scroll lock
  ───────────────────────────────────────────── */
  function initMobileNav() {
    const toggle = document.getElementById('mobile-toggle');
    const nav    = document.getElementById('main-nav');
    if (!toggle || !nav) return;

    function openNav() {
      nav.classList.add('open');
      toggle.setAttribute('aria-expanded', 'true');
      toggle.setAttribute('aria-label', 'Close navigation');
      // Animate hamburger → X
      toggle.classList.add('is-open');
    }

    function closeNav() {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open navigation menu');
      toggle.classList.remove('is-open');
    }

    toggle.addEventListener('click', () => {
      nav.classList.contains('open') ? closeNav() : openNav();
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!toggle.contains(e.target) && !nav.contains(e.target)) {
        closeNav();
      }
    });

    // Close on ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeNav();
    });
  }

  /* ─────────────────────────────────────────────
     4. SCROLL SHADOW on navbar
  ───────────────────────────────────────────── */
  function initNavScrollShadow() {
    const header = document.getElementById('site-header');
    if (!header) return;
    const onScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 6);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ─────────────────────────────────────────────
     5. HAMBURGER ICON MORPH (lines → X)
     CSS-driven; we just toggle .is-open class.
  ───────────────────────────────────────────── */
  // The SVG lines animate via CSS added below:
  function injectHamburgerCSS() {
    const style = document.createElement('style');
    style.textContent = `
      .mobile-nav-toggle svg line {
        transform-origin: center;
        transition: transform 0.24s cubic-bezier(0.16,1,0.3,1),
                    opacity   0.18s ease;
      }
      .mobile-nav-toggle.is-open svg line:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
      }
      .mobile-nav-toggle.is-open svg line:nth-child(2) {
        opacity: 0;
        transform: scaleX(0);
      }
      .mobile-nav-toggle.is-open svg line:nth-child(3) {
        transform: rotate(-45deg) translate(5px, -5px);
      }
    `;
    document.head.appendChild(style);
  }

  /* ─────────────────────────────────────────────
     6. PAGE ENTRANCE — fade-in body on load
  ───────────────────────────────────────────── */
  function initPageEntrance() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.35s ease';
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.body.style.opacity = '1';
      });
    });
  }

  /* ─────────────────────────────────────────────
     7. HOVER RIPPLE on cards (subtle, premium)
  ───────────────────────────────────────────── */
  function initCardRipple() {
    document.querySelectorAll('.decision-card').forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width)  * 100;
        const y = ((e.clientY - rect.top)  / rect.height) * 100;
        card.style.setProperty('--mx', `${x}%`);
        card.style.setProperty('--my', `${y}%`);
      });
    });

    // Inject CSS for the ripple highlight
    const style = document.createElement('style');
    style.textContent = `
      .decision-card {
        --mx: 50%; --my: 50%;
      }
      .decision-card::before {
        content: '';
        position: absolute;
        inset: 0;
        border-radius: inherit;
        background: radial-gradient(
          120px circle at var(--mx) var(--my),
          rgba(255,255,255,0.10) 0%,
          transparent 70%
        );
        opacity: 0;
        transition: opacity 0.3s ease;
        pointer-events: none;
        z-index: 0;
      }
      .decision-card:hover::before { opacity: 1; }
    `;
    document.head.appendChild(style);
  }

  /* ─────────────────────────────────────────────
     INIT — wait for DOM
  ───────────────────────────────────────────── */
  function init() {
    initPageEntrance();
    injectHamburgerCSS();
    initMobileNav();
    initNavScrollShadow();
    initScrollReveal();
    initCardRipple();

    // Stats need a short delay so app.js populates values first
    setTimeout(initStatCounters, 200);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
