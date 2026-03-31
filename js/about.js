/* ============================================
   ABOUT US PAGE
   ============================================ */

function initAbout() {
  renderAboutRoles();
  renderAboutTeam();
}

function renderAboutRoles() {
  const grid = document.getElementById('aboutRolesGrid');
  if (!grid) return;

  grid.innerHTML = ABOUT_ROLES.map(role => `
    <div class="glass-card about__role-card reveal">
      <div class="about__role-icon">${role.icon}</div>
      <h3 class="about__role-title">${role.title}</h3>
      <p class="about__role-desc">${role.description}</p>
    </div>
  `).join('');
}

function renderAboutTeam() {
  const grid = document.getElementById('aboutTeamGrid');
  if (!grid) return;

  grid.innerHTML = ABOUT_TEAM.map(person => `
    <div class="about__team-member reveal">
      <div class="about__team-avatar">${person.initials}</div>
      <div class="about__team-name">${person.name}</div>
      <div class="about__team-role">${person.role}</div>
    </div>
  `).join('');
}
