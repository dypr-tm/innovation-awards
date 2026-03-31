/* ============================================
   ADMIN DASHBOARD
   ============================================ */

function initAdmin() {
  initAdminSidebar();
  renderAdminUsers();
}

function initAdminSidebar() {
  const navItems = document.querySelectorAll('.admin-sidebar__link');
  const panels = document.querySelectorAll('.admin__panel');

  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const target = item.dataset.panel;

      navItems.forEach(n => n.classList.remove('active'));
      item.classList.add('active');

      panels.forEach(p => {
        p.classList.remove('active');
        if (p.id === target) p.classList.add('active');
      });
    });
  });
}

function renderAdminUsers() {
  const tbody = document.getElementById('adminUsersBody');
  if (!tbody) return;

  tbody.innerHTML = ADMIN_USERS.map(user => `
    <tr>
      <td>
        <div class="admin-table__user">
          <div class="admin-table__avatar">${user.name.split(' ').map(n => n[0]).join('').slice(0,2)}</div>
          <span>${user.name}</span>
        </div>
      </td>
      <td>${user.email}</td>
      <td><span class="admin-table__role-badge admin-table__role-badge--${user.role.toLowerCase()}">${user.role}</span></td>
      <td><span class="admin-table__status ${user.active ? 'active' : 'inactive'}">${user.active ? 'Aktif' : 'Nonaktif'}</span></td>
      <td>
        <div class="admin-table__actions">
          <button class="admin-table__action-btn" title="Edit">✏️</button>
          <button class="admin-table__action-btn admin-table__action-btn--danger" title="Hapus">🗑️</button>
        </div>
      </td>
    </tr>
  `).join('');
}

function renderAdminInnovations() {
  const tbody = document.getElementById('adminInnovBody');
  if (!tbody) return;

  tbody.innerHTML = REPOSITORY_DATA.map(item => {
    const tierColor = TIER_COLORS[item.tier] || '#82CDB7';
    const teamStr = item.team.length > 2
      ? `${item.team[0]} +${item.team.length - 1}`
      : item.team.join(', ');
    return `
      <tr>
        <td><strong>${item.name}</strong></td>
        <td>${teamStr}</td>
        <td><span style="color:${tierColor}">● ${item.tier}</span></td>
        <td>${item.season}</td>
        <td><span class="admin-table__status active">${item.status}</span></td>
        <td>
          <div class="admin-table__actions">
            <button class="admin-table__action-btn" title="Edit">✏️</button>
            <button class="admin-table__action-btn admin-table__action-btn--danger" title="Hapus">🗑️</button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}
