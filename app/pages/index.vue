<script setup lang="ts">
const openFAQ = ref<number | null>(null)
const toggleFAQ = (index: number) => { openFAQ.value = openFAQ.value === index ? null : index }
const faqs = [
  { q: "Apa itu Pegadaian Innovation Center?", a: "Pusat inkubasi ide-ide kreatif untuk kemajuan Pegadaian." },
  { q: "Siapa saja yang bisa bergabung?", a: "Seluruh Insan Pegadaian yang memiliki ide brilian." },
  { q: "Bagaimana cara mengajukan ide?", a: "Anda dapat login menggunakan email Pegadaian Anda, lalu masuk ke menu PIA dan pilih 'Kirim Inovasimu Sekarang'." }
]
const showcase = [
  { title: "Sistem Gadai Digital Cepat", desc: "Appraisal AI untuk barang elektronik", status: "Live" },
  { title: "Optimalisasi Rantai Pasok", desc: "Automasi distribusi emas", status: "Beta" },
  { title: "Deteksi Fraud GenAI", desc: "Model AI untuk keamanan transaksi harian", status: "Beta" },
]
</script>

<template>
  <div class="w-full relative bg-gray-50/30 overflow-x-hidden pt-10">
    <section class="pt-20 pb-24 px-6 relative">
      <div class="container mx-auto max-w-4xl text-center">
        <h1 class="text-5xl md:text-6xl font-extrabold text-[#003366] tracking-tight mb-6">
          Wujudkan Ide, <span class="text-[#D4AF37]">Masa Depan Bersama.</span>
        </h1>
        <NuxtLink to="/pia" class="inline-block px-10 py-5 bg-[#003366] text-white font-bold rounded-2xl shadow-xl hover:-translate-y-1 transition-all">
          Lihat Inovasi
        </NuxtLink>
      </div>
    </section>
    <!-- Showcase & FAQ simplified for speed of recovery -->
  </div>
</template>
