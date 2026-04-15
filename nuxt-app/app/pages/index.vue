<script setup lang="ts">
const openFAQ = ref<number | null>(null)

const toggleFAQ = (index: number) => {
  openFAQ.value = openFAQ.value === index ? null : index
}

const faqs = [
  { q: "Apa itu Pegadaian Innovation Center?", a: "Pusat inkubasi ide-ide kreatif untuk kemajuan Pegadaian." },
  { q: "Siapa saja yang bisa bergabung?", a: "Seluruh Insan Pegadaian yang memiliki ide brilian." },
  { q: "Bagaimana cara mengajukan ide?", a: "Anda dapat login menggunakan email Pegadaian Anda, lalu masuk ke menu PIA dan pilih 'Kirim Inovasimu Sekarang'." }
]

const showcase = [
  { title: "Sistem Gadai Digital Cepat", desc: "Appraisal AI untuk barang elektronik", status: "Live" },
  { title: "Optimalisasi Rantai Pasok", desc: "Automasi distribusi emas", status: "Beta" },
  { title: "Deteksi Fraud GenAI", desc: "Model AI untuk keamanan transaksi harian", status: "Beta" },
  { title: "Modul HR Cerdas", desc: "Chatbot internal untuk karyawan", status: "Live" },
]
</script>

<template>
  <div class="w-full relative bg-gray-50/30 overflow-x-hidden pt-10">
    <!-- 1. Hero Banner -->
    <section class="pt-20 pb-24 px-6 relative">
      <div class="container mx-auto max-w-4xl text-center">
        <h1 class="text-5xl md:text-6xl font-extrabold text-[#003366] tracking-tight leading-tight mb-6">
          Wujudkan Ide, <br class="hidden md:block" />
          <span class="text-[#D4AF37]">Ciptakan Solusi Masa Depan.</span>
        </h1>
        <p class="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
          Pegadaian Innovation Center adalah wadah inovasi dan kolaborasi untuk solusi nyata.
        </p>
        <NuxtLink to="/repository" class="inline-block px-10 py-5 bg-[#003366] text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 active:scale-95 text-lg">
          Lihat Inovasi
        </NuxtLink>
      </div>
    </section>

    <!-- 2. Statistik Inovasi -->
    <section class="container mx-auto px-6 mb-24">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 text-center transform transition-transform hover:-translate-y-2">
          <div class="text-5xl font-extrabold text-[#003366] mb-3">50+</div>
          <div class="text-gray-500 font-semibold text-lg">Inovasi</div>
        </div>
        <div class="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 text-center transform transition-transform hover:-translate-y-2">
          <div class="text-5xl font-extrabold text-[#D4AF37] mb-3">120+</div>
          <div class="text-gray-500 font-semibold text-lg">Inovator</div>
        </div>
        <div class="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 text-center transform transition-transform hover:-translate-y-2">
          <div class="text-5xl font-extrabold text-[#003366] mb-3">15+</div>
          <div class="text-gray-500 font-semibold text-lg">Proyek Nasional</div>
        </div>
      </div>
    </section>

    <!-- 3. Showcase Inovasi -->
    <section class="mb-24 px-6 md:px-0">
      <div class="container mx-auto md:px-6 mb-10">
        <h2 class="text-3xl font-extrabold text-[#003366]">Showcase Inovasi Terbaik</h2>
        <p class="text-gray-500 mt-2">Geser untuk melihat lebih banyak inovasi yang sedang berjalan.</p>
      </div>
      
      <div class="w-full overflow-x-auto pb-8 hide-scrollbar">
        <div class="flex gap-6 px-6 md:px-32 min-w-max">
          <div v-for="(item, idx) in showcase" :key="idx" 
            class="w-80 bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-50 flex flex-col shrink-0 group hover:-translate-y-2 transition-transform cursor-pointer">
            <div class="h-44 bg-gradient-to-br from-gray-100 to-gray-200 relative p-4 flex items-end">
              <div :class="['absolute top-4 left-4 px-3 py-1 text-xs font-bold rounded-full text-white shadow-sm', item.status === 'Live' ? 'bg-green-500' : 'bg-[#D4AF37]']">
                {{ item.status }}
              </div>
              <div class="absolute inset-0 flex items-center justify-center opacity-20">
                <Icon name="material-symbols:image-outline" size="64" class="text-[#003366]" />
              </div>
            </div>
            <div class="p-6 flex-grow">
              <h3 class="text-xl font-bold text-[#003366] mb-2 group-hover:text-[#D4AF37] transition-colors">{{ item.title }}</h3>
              <p class="text-gray-500 text-sm leading-relaxed">{{ item.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 4. FAQ Section -->
    <section class="container mx-auto px-6 mb-24 max-w-3xl">
      <h2 class="text-3xl font-extrabold text-[#003366] text-center mb-10">Tanya Jawab (FAQ)</h2>
      <div class="space-y-4">
        <div v-for="(faq, index) in faqs" :key="index" class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <button 
            @click="toggleFAQ(index)"
            class="w-full text-left px-6 py-5 flex justify-between items-center focus:outline-none hover:bg-gray-50/50 transition-colors"
          >
            <span class="font-bold text-[#003366] pr-8">{{ faq.q }}</span>
            <Icon 
              name="material-symbols:keyboard-arrow-down-rounded" 
              size="24"
              class="text-[#D4AF37] transition-transform duration-300"
              :class="{ 'rotate-180': openFAQ === index }"
            />
          </button>
          
          <Transition
            enter-active-class="transition duration-300 ease-out"
            enter-from-class="transform scale-95 opacity-0"
            enter-to-class="transform scale-100 opacity-100"
            leave-active-class="transition duration-200 ease-in"
            leave-from-class="transform scale-100 opacity-100"
            leave-to-class="transform scale-95 opacity-0"
          >
            <div v-if="openFAQ === index" class="px-6 pb-5 pt-2 text-gray-600 border-t border-gray-50">
              {{ faq.a }}
            </div>
          </Transition>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.hide-scrollbar::-webkit-scrollbar { display: none; }
.hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

.pegadaian-shadow {
  box-shadow: 0 10px 40px -10px rgba(0, 51, 102, 0.1);
}
</style>
