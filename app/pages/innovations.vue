<script setup lang="ts">
const innovations = [
  { 
    title: "Project Aurum AI", 
    image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=800",
    impact: "98.5% Accuracy",
    status: "Implemented",
    desc: "Sistem otomatisasi penilaian mutu emas menggunakan radiografi digital dan teknologi computer vision tingkat lanjut."
  },
  { 
    title: "Gadai Express Mobile", 
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=800",
    impact: "2M+ Transaksi",
    status: "Scaling",
    desc: "Layanan gadai instan melalui aplikasi dengan penjemputan barang di lokasi nasabah oleh kurir partner terverifikasi."
  },
  { 
    title: "Green Gold Supply", 
    image: "https://images.unsplash.com/photo-1605152276897-4f618f831968?auto=format&fit=crop&q=80&w=800",
    impact: "Eco-Friendly",
    status: "Pilot",
    desc: "Inovasi rantai pasok emas yang mengutamakan transparansi penuh dan standar keberlanjutan lingkungan internasional."
  },
  { 
    title: "Eco-Lending Micro", 
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    impact: "Impact Focused",
    status: "Ideations",
    desc: "Pinjaman modal kerja bagi pegiat UMKM berbasis bank sampah yang terintegrasi dengan ekosistem Pegadaian."
  },
  { 
    title: "Crypto Gold Bridge", 
    image: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?auto=format&fit=crop&q=80&w=800",
    impact: "Blockchain Tech",
    status: "Development",
    desc: "Platform tokenisasi aset emas yang memungkinkan nasabah berinvestasi dalam unit emas secara real-time di blockchain."
  }
]
</script>

<template>
  <div class="pt-24 pb-32 bg-[#F9FAFB] font-nunito">
    <!-- Hero Section -->
    <section class="py-32 bg-gradient-to-br from-[#00441F] to-[#00220F] text-white overflow-hidden relative">
      <div class="container mx-auto px-6 text-center max-w-4xl relative z-10">
        <h1 class="text-5xl md:text-7xl font-black mb-8">Innovations <span class="text-butter-yellow">Showcase.</span></h1>
        <p class="text-xl text-green-100/70 leading-relaxed font-bold">
          Dari konsep hingga realitas. Inilah bukti nyata inovasi Pegadaian dalam mentransformasi layanan keuangan masa kini.
        </p>
      </div>
      <!-- Background Ornament -->
      <div class="absolute -right-20 -bottom-20 w-96 h-96 bg-butter-yellow opacity-10 blur-[100px] rounded-full"></div>
      <div class="absolute -left-20 -top-20 w-80 h-80 bg-irish-green opacity-20 blur-[100px] rounded-full"></div>
    </section>

    <!-- Main Content -->
    <div class="container mx-auto px-6 -mt-24 relative z-20">
      <div class="grid gap-12 max-w-6xl mx-auto">
        <div v-for="(item, i) in innovations" :key="item.title" 
             class="bg-white rounded-[48px] shadow-2xl p-6 md:p-10 flex flex-col md:flex-row gap-10 items-center hover:scale-[1.01] transition-all duration-500 border border-gray-100 group" 
             :class="{ 'md:flex-row-reverse': i % 2 !== 0 }">
          
          <!-- Image Part -->
          <div class="w-full md:w-1/2 aspect-[16/10] rounded-[36px] overflow-hidden shadow-xl relative">
            <img :src="item.image" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
          </div>

          <!-- Content Part -->
          <div class="w-full md:w-1/2">
            <div class="flex items-center gap-3 mb-6">
              <span class="px-5 py-2 bg-irish-green/10 text-irish-green rounded-full text-[10px] font-black uppercase tracking-widest">{{ item.status }}</span>
              <span class="text-gray-200">|</span>
              <span class="text-butter-yellow font-black text-xs uppercase tracking-wider">{{ item.impact }}</span>
            </div>
            <h2 class="text-4xl font-black text-[#00441F] mb-6 leading-tight">{{ item.title }}</h2>
            <p class="text-gray-500 text-lg leading-relaxed mb-8 font-bold opacity-80">
              {{ item.desc }}
            </p>
            <div class="flex gap-4">
              <button class="px-8 py-4 bg-[#00441F] text-white rounded-2xl font-black hover:bg-[#00220F] transition-all shadow-lg hover:shadow-[#00441F]/20">
                Lihat Detail Case Study
              </button>
              <button class="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center hover:bg-butter-yellow hover:text-[#00441F] transition-all text-gray-400 group/share">
                <Icon name="heroicons:share" class="w-6 h-6 transition-colors" />
              </button>
            </div>
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
