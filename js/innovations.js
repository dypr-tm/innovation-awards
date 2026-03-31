/* ============================================
   INNOVATIONS PAGE — Apple-style Sticky Scroll
   ============================================ */

function initInnovations() {
  const container = document.getElementById('innovationsTrack');
  const textPanel = document.getElementById('innovationsText');
  if (!container || !textPanel) return;

  // Render scroll panels (right side images)
  container.innerHTML = INNOVATIONS_SHOWCASE.map((item, i) => `
    <div class="innov-scroll__panel" data-index="${i}" id="innovPanel${i}">
      <div class="innov-scroll__image-frame glass-card" style="cursor:default;">
        <div class="innov-scroll__image-placeholder" style="
          background: linear-gradient(135deg, ${item.color}18 0%, ${item.color}08 50%, rgba(37,37,40,0.5) 100%);
        ">
          <span class="innov-scroll__image-icon" style="color: ${item.color}">${item.name.charAt(0)}</span>
          <span class="innov-scroll__image-label" style="color: ${item.color}">${item.name}</span>
        </div>
      </div>
    </div>
  `).join('');

  // Render text content (left side, will cross-fade)
  textPanel.innerHTML = INNOVATIONS_SHOWCASE.map((item, i) => `
    <div class="innov-scroll__text-block ${i === 0 ? 'active' : ''}" data-index="${i}">
      <span class="innov-scroll__tagline">${item.tagline}</span>
      <h2 class="innov-scroll__name">${item.name}</h2>
      <p class="innov-scroll__desc">${item.description}</p>
      <div class="innov-scroll__tags">
        <span class="innov-scroll__pill" style="border-color: ${item.color}; color: ${item.color}">${item.category}</span>
        <span class="innov-scroll__pill" style="border-color: ${TIER_COLORS[item.tier]}; color: ${TIER_COLORS[item.tier]}">🏆 ${item.tier}</span>
      </div>
    </div>
  `).join('');

  // Render progress dots
  const dotsEl = document.getElementById('innovationsDots');
  if (dotsEl) {
    dotsEl.innerHTML = INNOVATIONS_SHOWCASE.map((_, i) =>
      `<div class="innov-scroll__dot ${i === 0 ? 'active' : ''}" data-index="${i}"></div>`
    ).join('');
  }

  // IntersectionObserver for cross-fade
  const panels = container.querySelectorAll('.innov-scroll__panel');
  let currentIndex = 0;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
        const idx = parseInt(entry.target.dataset.index);
        if (idx !== currentIndex) {
          currentIndex = idx;
          updateActiveInnovation(idx);
        }
      }
    });
  }, { threshold: [0.5], rootMargin: '-20% 0px -20% 0px' });

  panels.forEach(p => observer.observe(p));

  function updateActiveInnovation(index) {
    // Update text blocks
    textPanel.querySelectorAll('.innov-scroll__text-block').forEach(block => {
      block.classList.toggle('active', parseInt(block.dataset.index) === index);
    });
    // Update dots
    if (dotsEl) {
      dotsEl.querySelectorAll('.innov-scroll__dot').forEach(dot => {
        dot.classList.toggle('active', parseInt(dot.dataset.index) === index);
      });
    }
  }
}
