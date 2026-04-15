<script setup lang="ts">
const faqs = [
  { q: "Apa itu Pegadaian Innovation Center?", a: "Pusat inkubasi ide-ide kreatif untuk kemajuan ekosistem keuangan Pegadaian melalui teknologi masa depan." },
  { q: "Siapa saja yang bisa mengirimkan inovasi?", a: "Seluruh Insan Pegadaian dari berbagai divisi dan unit kerja di seluruh Indonesia." },
  { q: "Bagaimana proses seleksi PIA?", a: "Proses dimulai dari submission ide, scoring AI, pitching di depan dewan juri, hingga implementasi MVP." }
]
const openFAQ = ref<number | null>(null)
const toggleFAQ = (i: number) => openFAQ.value = openFAQ.value === i ? null : i

const showcase = [
  { 
    title: "EcoGadai Smart", 
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800",
    desc: "Sistem penilaian barang otomatis berbasis IoT dan Computer Vision.",
    tag: "Sustainability"
  },
  { 
    title: "Gadai Emas Digital", 
    image: "https://images.unsplash.com/photo-1574607383476-f517f260d30b?auto=format&fit=crop&q=80&w=800",
    desc: "Aplikasi seluler untuk transaksi gadai emas secara real-time tanpa antre.",
    tag: "Fintech"
  },
  { 
    title: "AI Risk Engine", 
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
    desc: "Model machine learning untuk deteksi dini risiko kredit dan fraud.",
    tag: "AI/ML"
  }
]
</script>

<template>
  <div class="bg-white pt-20">
    <!-- Hero Section -->
    <section class="relative min-h-[80vh] flex items-center overflow-hidden">
      <div class="absolute inset-0 z-0">
        <img src="https://images.unsplash.com/photo-1522071823907-f9d260f89d9a?auto=format&fit=crop&q=80&w=2000" class="w-full h-full object-cover opacity-10" />
      </div>
      <div class="container mx-auto px-6 relative z-10 text-center">
        <div class="inline-block px-4 py-2 bg-[#003366]/5 rounded-full text-[#003366] text-xs font-bold mb-6 tracking-widest uppercase">
          Empowering Financial Innovation
        </div>
        <h1 class="text-6xl md:text-8xl font-extrabold text-[#003366] leading-tight mb-8">
          Inovasi Untuk <span class="bg-gradient-to-r from-[#003366] to-[#D4AF37] bg-clip-text text-transparent">Masa Depan.</span>
        </h1>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
          Temukan potensi ide-idemu melalui platform kolaborasi inovasi terbesar di PT Pegadaian. Bergabunglah bersama ribuan inovator lainnya.
        </p>
        <div class="flex flex-col md:flex-row gap-4 justify-center">
          <NuxtLink to="/pia" class="px-10 py-5 bg-[#003366] text-white rounded-2xl font-bold shadow-2xl hover:bg-[#002244] transition-all transform hover:-translate-y-1 text-center">
            Mulai Inovasi Sekarang
          </NuxtLink>
          <NuxtLink to="/repository" class="px-10 py-5 bg-white text-[#003366] border-2 border-[#003366]/10 rounded-2xl font-bold hover:bg-gray-50 transition-all text-center">
            Lihati Repositori Ide
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Showcase Section -->
    <section class="py-32 bg-gray-50/50">
      <div class="container mx-auto px-6">
        <div class="flex justify-between items-end mb-16">
          <div>
            <h2 class="text-4xl font-bold text-[#003366] mb-4">Inovasi Terpopuler</h2>
            <p class="text-gray-500">Karya terbaik dari Insan Pegadaian yang telah diimplementasikan.</p>
          </div>
          <NuxtLink to="/innovations" class="text-[#D4AF37] font-bold flex items-center gap-2">
            Lihat Semua <Icon name="heroicons:arrow-right" />
          </NuxtLink>
        </div>
        <div class="grid md:grid-cols-3 gap-8">
          <div v-for="item in showcase" :key="item.title" class="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100">
            <div class="h-64 overflow-hidden relative">
              <img :src="item.image" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div class="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-[#003366]">
                {{ item.tag }}
              </div>
            </div>
            <div class="p-8">
              <h3 class="text-2xl font-bold text-[#003366] mb-3">{{ item.title }}</h3>
              <p class="text-gray-500 text-sm leading-relaxed mb-6">{{ item.desc }}</p>
              <button class="text-[#003366] font-bold text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
                Pelajari Lebih Lanjut <Icon name="heroicons:chevron-right" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="py-32">
      <div class="container mx-auto px-6 max-w-4xl">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-[#003366] mb-4">Pertanyaan Umum</h2>
          <p class="text-gray-500 text-lg">Semua yang perlu Anda ketahui tentang Pegadaian Innovation Center.</p>
        </div>
        <div class="space-y-4">
          <div v-for="(faq, i) in faqs" :key="i" class="border rounded-2xl overflow-hidden hover:border-[#003366]/20 transition-colors">
            <button @click="toggleFAQ(i)" class="w-full p-6 text-left flex justify-between items-center bg-white hover:bg-gray-50/50">
              <span class="font-bold text-[#003366] text-lg">{{ faq.q }}</span>
              <Icon :name="openFAQ === i ? 'heroicons:minus' : 'heroicons:plus'" class="w-6 h-6 text-[#D4AF37]" />
            </button>
            <div v-show="openFAQ === i" class="p-6 bg-gray-50 text-gray-600 leading-relaxed text-sm border-t">
              {{ faq.a }}
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
