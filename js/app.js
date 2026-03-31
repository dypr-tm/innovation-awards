/* ============================================
   PEGADAIAN INNOVATION CENTER — Main App
   ============================================ */

(function () {
  'use strict';

  /* ────────────────────────────────────
     ROUTER — Simple hash-based routing
     ──────────────────────────────────── */
  const Router = {
    routes: {},
    current: null,

    register(hash, pageId, init) {
      this.routes[hash] = { pageId, init };
    },

    navigate(hash) {
      if (hash === this.current) return;
      this.current = hash;
      window.location.hash = hash;

      document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
      const route = this.routes[hash];
      if (route) {
        const page = document.getElementById(route.pageId);
        if (page) {
          page.classList.add('active');
          if (route.init) route.init();
          window.scrollTo({ top: 0, behavior: 'instant' });
        }
      }
    },

    init() {
      window.addEventListener('hashchange', () => {
        const hash = window.location.hash || '#login';
        this.navigate(hash);
      });
      const initial = window.location.hash || '#login';
      this.navigate(initial);
    }
  };

  /* ────────────────────────────────────
     NAVBAR
     ──────────────────────────────────── */
  function initNavbar() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('navHamburger');
    const navMenu = document.getElementById('navMenu');

    // Scroll effect
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });

    // Mobile toggle
    if (hamburger) {
      hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('open');
        navMenu.classList.toggle('open');
      });
    }

    // Close menu on link click
    document.querySelectorAll('.navbar__link').forEach(link => {
      link.addEventListener('click', () => {
        if (hamburger) {
          hamburger.classList.remove('open');
          navMenu.classList.remove('open');
        }
      });
    });
  }

  /* ────────────────────────────────────
     CAROUSEL
     ──────────────────────────────────── */
  function initCarousel() {
    const track = document.getElementById('carouselTrack');
    const dotsContainer = document.getElementById('carouselDots');
    const prevBtn = document.getElementById('carouselPrev');
    const nextBtn = document.getElementById('carouselNext');

    if (!track) return;

    // Generate cards
    track.innerHTML = INNOVATORS_DATA.map((person, i) => `
      <div class="carousel__card" style="animation-delay: ${i * 0.1}s">
        <div class="carousel__card-image" style="
          background: linear-gradient(135deg, ${person.color}22 0%, ${person.color}08 100%);
          display: flex; align-items: center; justify-content: center;
          height: 320px; font-size: 72px; color: ${person.color};
        ">
          <span style="opacity: 0.3">${person.name.charAt(0)}</span>
        </div>
        <div class="carousel__card-overlay">
          <div class="carousel__card-name">${person.innovation}</div>
          <div class="carousel__card-category">${person.category}</div>
          <div class="carousel__card-season">${person.season}</div>
        </div>
      </div>
    `).join('');

    // Dots
    const cardWidth = 300; // 280 + 20 gap
    const totalPages = Math.ceil(INNOVATORS_DATA.length / 4);
    dotsContainer.innerHTML = '';
    for (let i = 0; i < totalPages; i++) {
      const dot = document.createElement('button');
      dot.className = 'carousel__dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', `Page ${i + 1}`);
      dot.addEventListener('click', () => {
        track.scrollTo({ left: i * cardWidth * 4, behavior: 'smooth' });
      });
      dotsContainer.appendChild(dot);
    }

    // Arrows
    prevBtn.addEventListener('click', () => {
      track.scrollBy({ left: -cardWidth * 2, behavior: 'smooth' });
    });

    nextBtn.addEventListener('click', () => {
      track.scrollBy({ left: cardWidth * 2, behavior: 'smooth' });
    });

    // Update dots on scroll
    track.addEventListener('scroll', () => {
      const scrollPos = track.scrollLeft;
      const pageIndex = Math.round(scrollPos / (cardWidth * 4));
      dotsContainer.querySelectorAll('.carousel__dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === pageIndex);
      });
    });
  }

  /* ────────────────────────────────────
     TIMELINE
     ──────────────────────────────────── */
  function initTimeline() {
    const container = document.getElementById('timelineContainer');
    if (!container) return;

    container.innerHTML = `
      <div class="timeline__line"></div>
      ${TIMELINE_DATA.map((item, i) => `
        <div class="timeline__item ${i % 2 === 0 ? 'reveal--left' : 'reveal--right'}">
          <div class="timeline__node"></div>
          <div class="timeline__card">
            <div class="timeline__date">${item.date}</div>
            <div class="timeline__event">${item.event}</div>
            <div class="timeline__desc">${item.description}</div>
          </div>
        </div>
      `).join('')}
      <div class="timeline__end"></div>
    `;
  }

  /* ────────────────────────────────────
     ACCORDION (FAQ)
     ──────────────────────────────────── */
  function initAccordion() {
    const container = document.getElementById('faqAccordion');
    if (!container) return;

    container.innerHTML = FAQ_DATA.map((item, i) => `
      <div class="accordion__item" id="faq-item-${i}">
        <button class="accordion__trigger" aria-expanded="false" aria-controls="faq-panel-${i}">
          <span>${item.question}</span>
          <span class="accordion__icon">+</span>
        </button>
        <div class="accordion__panel" id="faq-panel-${i}" role="region">
          <div class="accordion__content">${item.answer}</div>
        </div>
      </div>
    `).join('');

    // Click handler
    container.addEventListener('click', (e) => {
      const trigger = e.target.closest('.accordion__trigger');
      if (!trigger) return;

      const item = trigger.closest('.accordion__item');
      const panel = item.querySelector('.accordion__panel');
      const isOpen = item.classList.contains('active');

      // Close all
      container.querySelectorAll('.accordion__item').forEach(el => {
        el.classList.remove('active');
        el.querySelector('.accordion__trigger').setAttribute('aria-expanded', 'false');
        el.querySelector('.accordion__panel').style.maxHeight = null;
      });

      // Toggle current
      if (!isOpen) {
        item.classList.add('active');
        trigger.setAttribute('aria-expanded', 'true');
        panel.style.maxHeight = panel.scrollHeight + 'px';
      }
    });
  }

  /* ────────────────────────────────────
     WHAT WE DO CARDS
     ──────────────────────────────────── */
  function initWhatWeDo() {
    const grid = document.getElementById('whatWeDoGrid');
    if (!grid) return;

    grid.innerHTML = WHATWEDO_DATA.map(card => `
      <div class="glass-card what-we-do__card reveal">
        <div class="what-we-do__icon what-we-do__icon--${card.iconClass}">
          ${card.icon}
        </div>
        <h3 class="what-we-do__card-title">${card.title}</h3>
        <p class="what-we-do__card-desc">${card.description}</p>
      </div>
    `).join('');
  }

  /* ────────────────────────────────────
     SCROLL REVEAL (IntersectionObserver)
     ──────────────────────────────────── */
  function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.reveal, .reveal--left, .reveal--right').forEach(el => {
      observer.observe(el);
    });
  }

  /* ────────────────────────────────────
     LOGIN HANDLERS
     ──────────────────────────────────── */
  function initLogin() {
    const googleBtn = document.getElementById('btnGoogle');
    const ssoBtn = document.getElementById('btnSSO');

    if (googleBtn) {
      googleBtn.addEventListener('click', () => {
        Router.navigate('#landing');
        document.getElementById('navbar').style.display = '';
      });
    }

    if (ssoBtn) {
      ssoBtn.addEventListener('click', () => {
        Router.navigate('#landing');
        document.getElementById('navbar').style.display = '';
      });
    }
  }

  /* ────────────────────────────────────
     LANDING PAGE INIT
     ──────────────────────────────────── */
  function initLanding() {
    initWhatWeDo();
    initCarousel();
    initTimeline();
    initAccordion();
    setTimeout(() => initScrollReveal(), 100);
  }

  /* ────────────────────────────────────
     PHASE 2 PAGE INITS
     ──────────────────────────────────── */
  function initInnovationsPage() {
    initInnovations();
    setTimeout(() => initScrollReveal(), 100);
  }

  function initRepositoryPage() {
    initRepository();
  }

  function initAboutPage() {
    initAbout();
    setTimeout(() => initScrollReveal(), 100);
  }

  function initAdminPage() {
    initAdmin();
    renderAdminInnovations();
  }

  function showNavbar() {
    document.getElementById('navbar').style.display = '';
  }

  function hideNavbar() {
    document.getElementById('navbar').style.display = 'none';
  }

  /* ────────────────────────────────────
     BOOT
     ──────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initLogin();

    // Register routes — Phase 1
    Router.register('#login', 'loginPage', hideNavbar);
    Router.register('#landing', 'landingPage', () => { showNavbar(); initLanding(); });

    // Register routes — Phase 2
    Router.register('#innovations', 'innovationsPage', () => { showNavbar(); initInnovationsPage(); });
    Router.register('#repository', 'repositoryPage', () => { showNavbar(); initRepositoryPage(); });
    Router.register('#about', 'aboutPage', () => { showNavbar(); initAboutPage(); });
    Router.register('#admin', 'adminPage', () => { hideNavbar(); initAdminPage(); });

    Router.init();

    // Smooth scroll for data-nav links
    document.addEventListener('click', (e) => {
      const navLink = e.target.closest('[data-nav]');
      if (navLink) {
        e.preventDefault();
        const section = navLink.getAttribute('data-nav');
        const target = document.getElementById(section);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });

    // Hash-based nav links
    document.addEventListener('click', (e) => {
      const hashLink = e.target.closest('[data-route]');
      if (hashLink) {
        e.preventDefault();
        Router.navigate(hashLink.dataset.route);
      }
    });
  });
})();

