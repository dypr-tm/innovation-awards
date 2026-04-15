<script setup lang="ts">
const innovations = [
  { 
    title: "Project Aurum AI", 
    image: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&q=80&w=800",
    impact: "98.5% Accuracy",
    status: "Implemented",
    desc: "Sistem otomatisasi penilaian mutu emas menggunakan radiografi digital dan AI."
  },
  { 
    title: "Gadai Express Mobile", 
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800",
    impact: "2M+ Transaksi",
    status: "Scaling",
    desc: "Layanan gadai instan melalui aplikasi dengan penjemputan barang di lokasi nasabah."
  },
  { 
    title: "Green Gold Supply", 
    image: "https://images.unsplash.com/photo-1574607383476-f517f260d30b?auto=format&fit=crop&q=80&w=800",
    impact: "Eco-Friendly",
    status: "Pilot",
    desc: "Inovasi rantai pasok emas yang mengutamakan transparansi dan keberlanjutan lingkungan."
  }
]
</script>

<template>
  <div class="pt-24 pb-32">
    <section class="py-24 bg-gradient-to-br from-[#003366] to-[#001122] text-white overflow-hidden relative">
      <div class="container mx-auto px-6 text-center max-w-4xl relative z-10">
        <h1 class="text-5xl md:text-7xl font-bold mb-8">Innovations <span class="text-[#D4AF37]">Showcase.</span></h1>
        <p class="text-xl text-blue-100/70 leading-relaxed">
          Dari konsep hingga realitas. Inilah bukti nyata inovasi Pegadaian dalam mentransformasi layanan keuangan masa kini.
        </p>
      </div>
      <div class="absolute -right-20 -bottom-20 w-96 h-96 bg-[#D4AF37] opacity-10 blur-[100px] rounded-full"></div>
    </section>

    <div class="container mx-auto px-6 -mt-20 relative z-20">
      <div class="grid gap-12 max-w-6xl mx-auto">
        <div v-for="(item, i) in innovations" :key="item.title" class="bg-white rounded-[40px] shadow-2xl p-6 md:p-12 flex flex-col md:flex-row gap-12 items-center hover:scale-[1.02] transition-transform duration-500 shadow-blue-900/10 border border-gray-100" :class="{ 'md:flex-row-reverse': i % 2 !== 0 }">
          <div class="w-full md:w-1/2 aspect-[4/3] rounded-[30px] overflow-hidden shadow-2xl">
            <img :src="item.image" class="w-full h-full object-cover" />
          </div>
          <div class="w-full md:w-1/2">
            <div class="flex items-center gap-3 mb-6">
              <span class="px-4 py-1.5 bg-green-50 text-green-600 rounded-full text-xs font-bold uppercase tracking-widest">{{ item.status }}</span>
              <span class="text-gray-300">|</span>
              <span class="text-[#D4AF37] font-bold text-sm">{{ item.impact }}</span>
            </div>
            <h2 class="text-4xl font-bold text-[#003366] mb-6 leading-tight">{{ item.title }}</h2>
            <p class="text-gray-500 text-lg leading-relaxed mb-10">
              {{ item.desc }}
            </p>
            <div class="flex gap-4">
              <button class="px-8 py-4 bg-[#003366] text-white rounded-2xl font-bold hover:shadow-xl transition-all">Lihat Detail Case Study</button>
              <button class="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center hover:bg-gray-100 transition-colors">
                <Icon name="heroicons:share" class="w-6 h-6 text-gray-500" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
