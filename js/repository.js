/* ============================================
   REPOSITORY PAGE — Filter, Search, Cards
   ============================================ */

function initRepository() {
  const grid = document.getElementById('repoGrid');
  const searchInput = document.getElementById('repoSearch');
  const tierTabs = document.getElementById('repoTierTabs');
  if (!grid) return;

  let activeTier = 'All';
  let searchTerm = '';

  // Render tier tabs
  renderTierTabs();
  renderCards();

  // Search
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchTerm = e.target.value.toLowerCase();
      renderCards();
    });
  }

  function renderTierTabs() {
    if (!tierTabs) return;
    const tiers = ['All', 'Diamond', 'Platinum', 'Gold', 'Silver', 'Bronze'];
    const counts = {};
    tiers.forEach(t => {
      counts[t] = t === 'All'
        ? REPOSITORY_DATA.length
        : REPOSITORY_DATA.filter(r => r.tier === t).length;
    });

    tierTabs.innerHTML = tiers.map(t => {
      const color = t === 'All' ? 'var(--accent-teal)' : TIER_COLORS[t] || 'var(--accent-teal)';
      return `<button class="repo__tier-pill ${t === activeTier ? 'active' : ''}"
        data-tier="${t}" style="--tier-color: ${color}">
        ${t} <span class="repo__tier-count">(${counts[t]})</span>
      </button>`;
    }).join('');

    tierTabs.querySelectorAll('.repo__tier-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        activeTier = btn.dataset.tier;
        tierTabs.querySelectorAll('.repo__tier-pill').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderCards();
      });
    });
  }

  function renderCards() {
    let filtered = REPOSITORY_DATA;

    if (activeTier !== 'All') {
      filtered = filtered.filter(r => r.tier === activeTier);
    }

    if (searchTerm) {
      filtered = filtered.filter(r =>
        r.name.toLowerCase().includes(searchTerm) ||
        r.category.toLowerCase().includes(searchTerm) ||
        r.team.some(t => t.toLowerCase().includes(searchTerm))
      );
    }

    if (filtered.length === 0) {
      grid.innerHTML = `<div class="repo__empty">
        <p>Tidak ada inovasi yang ditemukan.</p>
      </div>`;
      return;
    }

    grid.innerHTML = filtered.map(item => {
      const tierColor = TIER_COLORS[item.tier] || '#82CDB7';
      const teamStr = item.team.length > 2
        ? `${item.team[0]}, ${item.team[1]} +${item.team.length - 2}`
        : item.team.join(', ');

      return `
        <div class="repo__card glass-card" data-id="${item.id}" style="cursor:default;">
          <div class="repo__card-header">
            <span class="repo__card-tier" style="color: ${tierColor}">
              <span class="repo__card-tier-dot" style="background: ${tierColor}"></span>
              ${item.tier}
            </span>
            <span class="repo__card-season">${item.season}</span>
          </div>
          <h3 class="repo__card-name">${item.name}</h3>
          <p class="repo__card-team">Tim: ${teamStr}</p>
          <div class="repo__card-meta">
            <span class="repo__card-category">${item.category}</span>
          </div>
          <button class="repo__card-ai-btn" onclick="openAurumAI(${item.id})">
            ✨ Tanya Aurum AI
          </button>
        </div>
      `;
    }).join('');
  }
}
