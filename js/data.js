/* ============================================
   PEGADAIAN INNOVATION CENTER — Data
   ============================================ */

const INNOVATORS_DATA = [
  {
    id: 1,
    name: 'Ari Pratama',
    innovation: 'SmartQ',
    category: 'Fintech',
    season: 'Season 3 • 2025',
    color: '#82CDB7'
  },
  {
    id: 2,
    name: 'Budi Santoso',
    innovation: 'EcoTrack',
    category: 'Green Tech',
    season: 'Season 2 • 2025',
    color: '#D6C47A'
  },
  {
    id: 3,
    name: 'Setyo Wibowo',
    innovation: 'PayLite',
    category: 'Payment',
    season: 'Season 1 • 2025',
    color: '#00AB4E'
  },
  {
    id: 4,
    name: 'Vani Kusumawardhani',
    innovation: 'DataViz',
    category: 'Analytics',
    season: 'Season 3 • 2024',
    color: '#82CDB7'
  },
  {
    id: 5,
    name: 'Gela Puspita',
    innovation: 'GreenPay',
    category: 'Sustainability',
    season: 'Season 2 • 2024',
    color: '#D6C47A'
  },
  {
    id: 6,
    name: 'Bella Maharani',
    innovation: 'InsightAI',
    category: 'AI / ML',
    season: 'Season 1 • 2024',
    color: '#00AB4E'
  }
];

const TIMELINE_DATA = [
  {
    date: 'Maret 2025',
    event: 'Kick-off Season 4',
    description: 'Pembukaan pendaftaran ide inovasi untuk Season 4 dengan tema transformasi digital.'
  },
  {
    date: 'Januari 2025',
    event: 'Demo Day Season 3',
    description: 'Presentasi final dan penilaian 12 tim inovator terbaik Season 3.'
  },
  {
    date: 'Oktober 2024',
    event: 'Inkubasi & Mentoring',
    description: 'Program mentoring intensif dengan expert internal dan eksternal selama 3 bulan.'
  },
  {
    date: 'Juli 2024',
    event: 'Seleksi Ide Season 3',
    description: 'Tahap kurasi dan seleksi dari 150+ ide yang masuk dari seluruh cabang.'
  }
];

const FAQ_DATA = [
  {
    question: 'Bagaimana cara mengikuti program inovasi?',
    answer: 'Anda dapat mendaftar melalui portal internal Pegadaian saat periode pendaftaran dibuka. Tim kami akan mengumumkan jadwal pendaftaran melalui email blast dan intranet perusahaan. Pastikan Anda telah memiliki ide inovasi yang ingin dikembangkan.'
  },
  {
    question: 'Apa saja kriteria penilaian inovasi?',
    answer: 'Inovasi dinilai berdasarkan empat kriteria utama: (1) Dampak bisnis dan potensi implementasi, (2) Tingkat kebaruan dan kreativitas solusi, (3) Kelayakan teknis dan skalabilitas, (4) Alignment dengan strategi perusahaan dan kebutuhan pelanggan.'
  },
  {
    question: 'Apakah ada hadiah untuk pemenang?',
    answer: 'Ya, pemenang akan mendapatkan kesempatan untuk mengimplementasikan inovasinya secara nyata dengan dukungan penuh perusahaan, termasuk budget pengembangan, tim teknis, dan mentoring eksekutif. Selain itu, ada penghargaan berupa sertifikat, trophy, dan insentif finansial.'
  },
  {
    question: 'Berapa lama proses inkubasi berlangsung?',
    answer: 'Proses inkubasi berlangsung selama 3 bulan, dimulai dari tahap validasi ide, pengembangan prototype, hingga user testing. Selama periode ini, tim inovator akan mendapat pendampingan dari mentor internal dan eksternal secara berkala.'
  },
  {
    question: 'Siapa saja yang boleh mengikuti program ini?',
    answer: 'Program ini terbuka untuk seluruh karyawan tetap PT Pegadaian dari semua divisi dan level jabatan. Peserta bisa mendaftar secara individu atau dalam tim dengan maksimal 5 anggota. Kami mendorong kolaborasi lintas divisi untuk menghasilkan inovasi yang lebih komprehensif.'
  }
];

const WHATWEDO_DATA = [
  {
    icon: '🎯',
    title: 'Strategy',
    description: 'Merancang roadmap inovasi yang selaras dengan visi transformasi digital Pegadaian. Kami memfasilitasi ideation workshop dan design thinking sessions.',
    iconClass: 'strategy'
  },
  {
    icon: '📋',
    title: 'Management',
    description: 'Mengelola pipeline inovasi dari tahap ideation hingga implementasi. Kami memastikan setiap ide mendapatkan evaluasi, mentoring, dan sumber daya yang tepat.',
    iconClass: 'management'
  },
  {
    icon: '⚙️',
    title: 'Implementation',
    description: 'Mendampingi tim inovator dalam eksekusi dan peluncuran solusi. Dari MVP development hingga production deployment dengan standar enterprise.',
    iconClass: 'implementation'
  }
];

/* ============================================
   PHASE 2 DATA
   ============================================ */

const INNOVATIONS_SHOWCASE = [
  {
    id: 'smartq',
    name: 'SmartQ',
    category: 'Fintech',
    tier: 'Diamond',
    tagline: 'Inovasi yang telah kami wujudkan',
    description: 'Solusi antrian digital yang mengubah pengalaman layanan di 500+ cabang Pegadaian. Mengurangi waktu tunggu rata-rata 65% dan meningkatkan kepuasan pelanggan secara signifikan.',
    color: '#82CDB7',
    classLabel: 'Breakthrough'
  },
  {
    id: 'ecotrack',
    name: 'EcoTrack',
    category: 'Green Tech',
    tier: 'Platinum',
    tagline: 'Sustainability meets technology',
    description: 'Platform monitoring emisi karbon real-time untuk seluruh jaringan operasional. Membantu Pegadaian mencapai target ESG dengan pengurangan emisi 30% dalam satu tahun.',
    color: '#00AB4E',
    classLabel: 'Breakthrough'
  },
  {
    id: 'paylite',
    name: 'PayLite',
    category: 'Payment',
    tier: 'Gold',
    tagline: 'Financial inclusion at scale',
    description: 'Sistem pembayaran mikro untuk segmen rural dan unbanked. Menjangkau 2 juta pengguna baru di daerah terpencil dengan transaksi mulai dari Rp 5.000.',
    color: '#D6C47A',
    classLabel: 'Regional'
  },
  {
    id: 'dataviz',
    name: 'DataViz',
    category: 'Analytics',
    tier: 'Platinum',
    tagline: 'Data-driven decision making',
    description: 'Dashboard analitik eksekutif yang mengintegrasikan data dari seluruh lini bisnis. Memberikan insight real-time untuk pengambilan keputusan strategis.',
    color: '#82CDB7',
    classLabel: 'Business Case'
  },
  {
    id: 'insightai',
    name: 'InsightAI',
    category: 'AI / ML',
    tier: 'Diamond',
    tagline: 'Artificial intelligence for gold',
    description: 'Sistem prediksi tren harga gadai dan perilaku pelanggan berbasis machine learning. Meningkatkan akurasi valuasi emas hingga 98.5% dan mendeteksi fraud secara real-time.',
    color: '#D6C47A',
    classLabel: 'Breakthrough'
  }
];

const REPOSITORY_DATA = [
  { id: 1, name: 'SmartQ', team: ['Ari Pratama', 'Dewi Sari', 'Rizky M.', 'Putri A.'], category: 'Fintech', tier: 'Diamond', season: 'S3 2025', status: 'Published', classLabel: 'Breakthrough', summary: 'SmartQ adalah sistem antrian digital pintar yang memanfaatkan IoT dan mobile app untuk mengelola antrian di cabang Pegadaian. Dengan fitur estimasi waktu tunggu real-time, notifikasi giliran, dan analitik pola kunjungan, SmartQ berhasil mengurangi waktu tunggu pelanggan hingga 65%. Inovasi ini telah diimplementasikan di lebih dari 500 cabang di seluruh Indonesia.' },
  { id: 2, name: 'EcoTrack', team: ['Budi Santoso', 'Rina K.'], category: 'Green Tech', tier: 'Platinum', season: 'S2 2025', status: 'Published', classLabel: 'Breakthrough', summary: 'EcoTrack adalah platform monitoring emisi karbon yang menggunakan sensor IoT dan cloud analytics untuk melacak jejak karbon operasional Pegadaian secara real-time. Platform ini menyediakan dashboard ESG, rekomendasi pengurangan emisi, dan reporting yang sesuai standar GRI.' },
  { id: 3, name: 'PayLite', team: ['Setyo Wibowo', 'Lina M.', 'Hendra J.'], category: 'Payment', tier: 'Gold', season: 'S1 2025', status: 'Published', classLabel: 'Regional', summary: 'PayLite adalah solusi pembayaran mikro yang dirancang khusus untuk masyarakat di daerah rural. Dengan antarmuka sederhana dan dukungan transaksi offline, PayLite memungkinkan pembayaran mulai dari Rp 5.000 menggunakan teknologi QR code dan USSD.' },
  { id: 4, name: 'DataViz', team: ['Vani K.', 'Agus P.'], category: 'Analytics', tier: 'Platinum', season: 'S3 2024', status: 'Published', classLabel: 'Business Case', summary: 'DataViz adalah dashboard analitik eksekutif yang mengkonsolidasi data dari seluruh lini bisnis Pegadaian. Dengan visualisasi interaktif dan drill-down capability, manajemen dapat memantau KPI, tren bisnis, dan performa cabang secara real-time.' },
  { id: 5, name: 'GreenPay', team: ['Gela Puspita', 'Dimas R.', 'Sari N.'], category: 'Sustainability', tier: 'Silver', season: 'S2 2024', status: 'Published', classLabel: 'Regional', summary: 'GreenPay adalah program cashback berbasis lingkungan. Pelanggan yang menggunakan layanan digital mendapatkan green points yang bisa ditukar dengan donasi penanaman pohon atau diskon layanan.' },
  { id: 6, name: 'InsightAI', team: ['Bella Maharani', 'Fajar T.'], category: 'AI / ML', tier: 'Diamond', season: 'S1 2024', status: 'Published', classLabel: 'Breakthrough', summary: 'InsightAI menggunakan machine learning untuk memprediksi tren harga emas, perilaku pelanggan, dan mendeteksi transaksi fraud. Model AI dilatih dengan data historis 10 tahun dan mencapai akurasi valuasi 98.5%.' },
  { id: 7, name: 'MobiGadai', team: ['Adi Nugroho', 'Tina L.'], category: 'Mobile', tier: 'Gold', season: 'S3 2024', status: 'Published', classLabel: 'Business Case', summary: 'Aplikasi mobile yang memungkinkan pelanggan mengajukan gadai dari rumah dengan fitur foto dan estimasi nilai instan menggunakan computer vision.' },
  { id: 8, name: 'ChatPega', team: ['Rini S.', 'Oka P.', 'Bayu M.'], category: 'Customer Service', tier: 'Silver', season: 'S2 2024', status: 'Published', classLabel: 'Regional', summary: 'Chatbot AI untuk layanan pelanggan 24/7 yang terintegrasi dengan WhatsApp dan web. Mampu menangani 80% pertanyaan umum tanpa intervensi agen manusia.' },
  { id: 9, name: 'SecureVault', team: ['Hadi K.', 'Nisa R.'], category: 'Security', tier: 'Gold', season: 'S1 2024', status: 'Published', classLabel: 'Business Case', summary: 'Sistem keamanan digital untuk penyimpanan dokumen dan sertifikat gadai dengan enkripsi end-to-end dan biometric authentication.' },
  { id: 10, name: 'BranchHub', team: ['Indra W.', 'Mega S.', 'Yoga P.'], category: 'Operations', tier: 'Bronze', season: 'S3 2023', status: 'Published', classLabel: 'Regional', summary: 'Platform manajemen cabang terpadu yang mengoptimalkan alokasi sumber daya, jadwal staf, dan inventaris di seluruh jaringan cabang.' },
  { id: 11, name: 'EduGadai', team: ['Sinta A.', 'Roni B.'], category: 'Education', tier: 'Bronze', season: 'S2 2023', status: 'Published', classLabel: 'Regional', summary: 'Platform edukasi finansial interaktif untuk meningkatkan literasi keuangan masyarakat tentang gadai dan investasi emas.' },
  { id: 12, name: 'QuickAppraise', team: ['Tommy H.', 'Vera C.', 'Wawan D.'], category: 'Valuation', tier: 'Silver', season: 'S1 2023', status: 'Published', classLabel: 'Business Case', summary: 'Sistem penilaian barang gadai otomatis menggunakan AI image recognition dan database harga pasar real-time.' }
];

const ABOUT_ROLES = [
  { icon: '🧪', title: 'Research & Development', description: 'Riset ide dan proof of concept untuk validasi kelayakan inovasi sebelum tahap pengembangan penuh.' },
  { icon: '🤝', title: 'Kolaborasi', description: 'Membangun sinergi dengan seluruh unit bisnis untuk mengidentifikasi peluang inovasi dan memastikan alignment strategis.' },
  { icon: '📊', title: 'Analytics & Impact', description: 'Mengukur dampak inovasi secara kuantitatif dan kualitatif untuk memastikan ROI dan keberlanjutan program.' }
];

const ABOUT_TEAM = [
  { name: 'Dr. Rahmat Hidayat', role: 'Head of Innovation', initials: 'RH' },
  { name: 'Siti Nurhaliza', role: 'Strategy Lead', initials: 'SN' },
  { name: 'Ari Pratama', role: 'Tech Lead', initials: 'AP' },
  { name: 'Maya Indira', role: 'Program Manager', initials: 'MI' },
  { name: 'Denny Kurniawan', role: 'Data Scientist', initials: 'DK' },
  { name: 'Lestari Dewi', role: 'UX Designer', initials: 'LD' },
  { name: 'Fajar Setiawan', role: 'Backend Engineer', initials: 'FS' },
  { name: 'Nadia Puspita', role: 'Community Lead', initials: 'NP' }
];

const ADMIN_USERS = [
  { id: 1, name: 'Ari Pratama', email: 'ari.pratama@pegadaian.co.id', role: 'Admin', active: true },
  { id: 2, name: 'Budi Santoso', email: 'budi.santoso@pegadaian.co.id', role: 'Editor', active: true },
  { id: 3, name: 'Citra Dewi', email: 'citra.dewi@pegadaian.co.id', role: 'Viewer', active: false },
  { id: 4, name: 'Denny Kurniawan', email: 'denny.k@pegadaian.co.id', role: 'Editor', active: true },
  { id: 5, name: 'Eka Putri', email: 'eka.putri@pegadaian.co.id', role: 'Viewer', active: true },
  { id: 6, name: 'Fajar Setiawan', email: 'fajar.s@pegadaian.co.id', role: 'Admin', active: true }
];

const TIER_COLORS = {
  'Diamond': '#B9F2FF',
  'Platinum': '#E5E4E2',
  'Gold': '#D6C47A',
  'Silver': '#C0C0C0',
  'Bronze': '#CD7F32'
};
