/* ============================================
   AURUM AI — Slide-out Sidebar Chat
   ============================================ */

function openAurumAI(innovationId) {
  const item = REPOSITORY_DATA.find(r => r.id === innovationId);
  if (!item) return;

  const sidebar = document.getElementById('aurumSidebar');
  const overlay = document.getElementById('aurumOverlay');
  if (!sidebar || !overlay) return;

  // Set context
  document.getElementById('aurumInnovName').textContent = item.name;
  document.getElementById('aurumInnovMeta').textContent = `${item.tier} • ${item.category} • ${item.season}`;

  // Set category analysis chips
  const categories = ['Breakthrough', 'Regional', 'Business Case'];
  const chipsEl = document.getElementById('aurumCategoryChips');
  chipsEl.innerHTML = categories.map(c =>
    `<span class="aurum__chip ${c === item.classLabel ? 'active' : ''}">${c}</span>`
  ).join('');

  // Clear chat
  const chatEl = document.getElementById('aurumChat');
  chatEl.innerHTML = '';

  // Open
  sidebar.classList.add('open');
  overlay.classList.add('open');

  // Auto-summary after brief delay
  setTimeout(() => {
    addAIMessage(chatEl, item.summary);
  }, 500);

  // Close handlers
  overlay.onclick = closeAurumAI;
  document.getElementById('aurumClose').onclick = closeAurumAI;

  // Chat input
  const chatInput = document.getElementById('aurumInput');
  const chatSend = document.getElementById('aurumSend');

  const sendMessage = () => {
    const text = chatInput.value.trim();
    if (!text) return;
    addUserMessage(chatEl, text);
    chatInput.value = '';

    // Simulated AI response
    setTimeout(() => {
      const responses = [
        `Berdasarkan analisis saya, ${item.name} memiliki potensi besar untuk skalabilitas. Inovasi ini termasuk kategori ${item.classLabel} dan telah menunjukkan dampak signifikan di ${item.category}.`,
        `${item.name} menggunakan pendekatan yang inovatif dalam ${item.category}. Tim pengembang yang terdiri dari ${item.team.join(', ')} telah berhasil melewati tahap validasi dengan hasil yang menjanjikan.`,
        `Dari perspektif bisnis, ${item.name} berpotensi memberikan ROI yang tinggi karena langsung menjawab kebutuhan operasional. Saya merekomendasikan untuk melanjutkan ke fase implementasi penuh.`
      ];
      const response = responses[Math.floor(Math.random() * responses.length)];
      addAIMessage(chatEl, response);
    }, 800);
  };

  chatSend.onclick = sendMessage;
  chatInput.onkeydown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };
}

function closeAurumAI() {
  const sidebar = document.getElementById('aurumSidebar');
  const overlay = document.getElementById('aurumOverlay');
  if (sidebar) sidebar.classList.remove('open');
  if (overlay) overlay.classList.remove('open');
}

function addAIMessage(chatEl, text) {
  const msgDiv = document.createElement('div');
  msgDiv.className = 'aurum__msg aurum__msg--ai';
  chatEl.appendChild(msgDiv);
  chatEl.scrollTop = chatEl.scrollHeight;

  // Typing animation
  let i = 0;
  const speed = 15;
  function typeChar() {
    if (i < text.length) {
      msgDiv.textContent += text.charAt(i);
      i++;
      chatEl.scrollTop = chatEl.scrollHeight;
      setTimeout(typeChar, speed);
    }
  }
  typeChar();
}

function addUserMessage(chatEl, text) {
  const msgDiv = document.createElement('div');
  msgDiv.className = 'aurum__msg aurum__msg--user';
  msgDiv.textContent = text;
  chatEl.appendChild(msgDiv);
  chatEl.scrollTop = chatEl.scrollHeight;
}
