<script setup lang="ts">
const ideas = [
  { 
    id: 1,
    title: "Gold-backed Stablecoin Implementation", 
    category: "Technological",
    author: "Tim Geopolitik",
    date: "12 Oct 2025",
    votes: 142,
    desc: "Proposal penggunaan infrastruktur blockchain untuk menerbitkan stablecoin yang dipatok langsung dengan cadangan emas fisik Pegadaian.",
    status: "Validated"
  },
  { 
    id: 2,
    title: "Augmented Reality Jewelry Try-on", 
    category: "Marketing",
    author: "Unit Digital Transformation",
    date: "05 Nov 2025",
    votes: 89,
    desc: "Implementasi fitur AR pada aplikasi mobile untuk memungkinkan nasabah mencoba perhiasan secara virtual sebelum melakukan pembelian.",
    status: "Under Review"
  },
  { 
    id: 3,
    title: "Carbon Credit Exchange via Pawn Shop", 
    category: "ESG Inovasi",
    author: "Strategic Planning",
    date: "20 Jan 2026",
    votes: 256,
    desc: "Menciptakan bursa karbon mikro bagi sektor UMKM yang menggunakan outlet Pegadaian sebagai titik verifikasi aset hijau.",
    status: "Strategic Priority"
  },
  { 
    id: 4,
    title: "AI-Powered Credit Scoring for Freelancers", 
    category: "Financial Inclusion",
    author: "Risk Management",
    date: "15 Feb 2026",
    votes: 412,
    desc: "Algoritma penilaian kredit alternatif menggunakan data transaksi digital dan perilaku ekonomi bagi pekerja gig yang tidak memiliki slip gaji.",
    status: "Implemented"
  }
]
</script>

<template>
  <div class="pt-24 pb-32 bg-[#F9FAFB] min-h-screen font-nunito">
    <!-- Hero Section -->
    <section class="py-20 bg-[#00441F] text-white">
      <div class="container mx-auto px-6 max-w-7xl">
        <div class="flex flex-col md:flex-row justify-between items-end gap-8">
          <div class="max-w-2xl">
            <h1 class="text-5xl font-black mb-4">Idea <span class="text-butter-yellow">Repository.</span></h1>
            <p class="text-green-100/70 text-lg font-bold">
              Pusat penyimpanan intelijen inovasi. Jelajahi ribuan ide strategis yang telah didekonstruksi dan divalidasi oleh AI.
            </p>
          </div>
          <div class="flex gap-4">
            <div class="px-6 py-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 flex items-center gap-3">
              <span class="text-3xl font-black text-butter-yellow">1,240</span>
              <span class="text-[10px] uppercase font-black tracking-widest leading-none">Total<br/>Ideas</span>
            </div>
            <div class="px-6 py-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 flex items-center gap-3">
              <span class="text-3xl font-black text-irish-green">89</span>
              <span class="text-[10px] uppercase font-black tracking-widest leading-none">Live<br/>Projects</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Filters & Search -->
    <div class="container mx-auto px-6 max-w-7xl mt-12 mb-8">
      <div class="flex flex-col md:flex-row gap-4">
        <div class="flex-1 bg-white p-2 rounded-2xl shadow-sm border flex items-center px-4">
          <Icon name="heroicons:magnifying-glass" class="w-5 h-5 text-gray-400 mr-3" />
          <input type="text" placeholder="Cari ide inovasi..." class="bg-transparent border-none focus:ring-0 w-full font-bold text-gray-700" />
        </div>
        <div class="flex gap-4">
           <select class="bg-white px-6 py-2 rounded-2xl border font-bold text-gray-600 focus:ring-irish-green">
             <option>Semua Kategori</option>
             <option>Financial</option>
             <option>Technology</option>
           </select>
        </div>
      </div>
    </div>

    <!-- Idea Grid -->
    <div class="container mx-auto px-6 max-w-7xl">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="idea in ideas" :key="idea.id" class="bg-white p-8 rounded-[36px] border border-gray-100 shadow-xl hover:shadow-shadow-irish-green/5 transition-all group flex flex-col justify-between">
          <div>
            <div class="flex justify-between items-start mb-6">
              <span class="px-4 py-1.5 bg-gray-50 text-gray-400 rounded-full text-[10px] font-black uppercase tracking-widest group-hover:bg-irish-green group-hover:text-white transition-colors">{{ idea.category }}</span>
              <div class="flex items-center gap-1 text-irish-green font-black">
                <Icon name="heroicons:bolt" class="w-4 h-4" />
                <span class="text-xs">{{ idea.votes }}</span>
              </div>
            </div>
            <h3 class="text-2xl font-black text-[#00441F] mb-4 leading-tight group-hover:text-irish-green transition-colors">{{ idea.title }}</h3>
            <p class="text-gray-500 text-sm leading-relaxed mb-6 font-bold opacity-80">{{ idea.desc }}</p>
          </div>
          
          <div class="pt-6 border-t border-gray-50 flex justify-between items-center">
            <div class="flex items-center gap-3">
               <div class="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center font-black text-[#00441F] text-[10px]">{{ idea.author.charAt(0) }}</div>
               <div>
                 <div class="text-[10px] font-black text-[#00441F]">{{ idea.author }}</div>
                 <div class="text-[8px] text-gray-400 font-bold">{{ idea.date }}</div>
               </div>
            </div>
            <div class="px-3 py-1 bg-butter-yellow/10 text-[#00441F] rounded-lg text-[10px] font-black uppercase tracking-wider">{{ idea.status }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.font-nunito {
  font-family: 'Nunito Sans', sans-serif;
}
</style>
