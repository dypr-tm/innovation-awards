<script setup lang="ts">
const categories = [
  { title: "Product Innovation", desc: "Produk keuangan baru atau peningkatan fitur yang sudah ada." },
  { title: "Process Innovation", desc: "Optimasi alur kerja internal untuk efisiensi yang lebih tinggi." },
  { title: "Business Model", desc: "Strategi baru dalam menghasilkan nilai bagi Pegadaian." }
]

const timeline = [
  { date: "1 Mei - 31 Mei", title: "Submission Phase", desc: "Kirim ide inovasimu melalui portal PIA." },
  { date: "15 Juni", title: "Shortlisting", desc: "Seleksi administrasi dan scoring AI awal." },
  { date: "1 Juli", title: "Pitching Day", desc: "Presentasi di depan dewan juri ahli." },
  { date: "17 Agustus", title: "Awarding Night", desc: "Pengumuman pemenang di hari kemerdekaan." }
]
</script>

<template>
  <div class="pt-24 pb-32">
    <!-- PIA Hero -->
    <section class="py-24 px-6 relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-white"></div>
      <div class="container mx-auto max-w-5xl text-center relative z-10">
        <div class="inline-flex items-center gap-2 px-4 py-2 bg-yellow-50 text-yellow-700 rounded-full text-xs font-bold mb-8 mx-auto">
          <Icon name="heroicons:star-solid" class="w-4 h-4" />
          Pegadaian Innovation Awards 2026
        </div>
        <h1 class="text-6xl md:text-8xl font-black text-[#003366] leading-none mb-10">
          Saatnya <span class="bg-gradient-to-r from-[#D4AF37] to-yellow-600 bg-clip-text text-transparent">Bercahaya.</span>
        </h1>
        <p class="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed mb-12">
          Ajang kompetisi inovasi tahunan terbesar bagi seluruh karyawan Pegadaian. Raih total hadiah puluhan juta rupiah dan wujudkan idemu.
        </p>
        <NuxtLink to="/pia/submit" class="px-12 py-6 bg-[#003366] text-white rounded-3xl font-black text-xl shadow-2xl hover:scale-110 active:scale-95 transition-all outline outline-offset-8 outline-transparent hover:outline-[#003366]/20">
          Kirim Inovasi Sekarang
        </NuxtLink>
      </div>
    </section>

    <!-- Categories -->
    <section class="py-32">
      <div class="container mx-auto px-6">
        <h2 class="text-4xl font-bold text-[#003366] text-center mb-20">Kategori Penghargaan</h2>
        <div class="grid md:grid-cols-3 gap-10">
          <div v-for="c in categories" :key="c.title" class="p-10 bg-white rounded-[40px] border-2 border-gray-50 hover:border-[#D4AF37]/30 transition-all group">
            <div class="w-16 h-16 bg-[#003366] rounded-2xl mb-8 flex items-center justify-center group-hover:rotate-12 transition-transform">
              <Icon name="heroicons:trophy" class="w-8 h-8 text-white" />
            </div>
            <h3 class="text-2xl font-bold text-[#003366] mb-4">{{ c.title }}</h3>
            <p class="text-gray-500 leading-relaxed">{{ c.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Timeline -->
    <section class="py-32 bg-gray-50/50">
      <div class="container mx-auto px-6 max-w-4xl">
        <h2 class="text-4xl font-bold text-[#003366] text-center mb-20">Timeline Kompetisi</h2>
        <div class="space-y-12">
          <div v-for="(step, i) in timeline" :key="i" class="flex gap-8 items-start">
            <div class="shrink-0 w-24 pt-1 font-bold text-[#D4AF37] text-sm uppercase tracking-widest text-right">
              {{ step.date }}
            </div>
            <div class="relative pt-1 pl-8 border-l-2 border-gray-200">
              <div class="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-white border-4 border-[#003366]"></div>
              <h3 class="text-2xl font-bold text-[#003366] mb-2">{{ step.title }}</h3>
              <p class="text-gray-500">{{ step.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
