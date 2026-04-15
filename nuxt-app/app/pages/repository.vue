<script setup lang="ts">
const dummyInnovations = [
  { title: "Sistem Gadai Digital Cepat", category: "Layanan", team: "Digital Transform", summary: "Memungkinkan nasabah menggadaikan barang secara digital dengan appraisal AI." },
  { title: "Optimalisasi Rantai Pasok Emas", category: "Proses Bisnis", team: "Supply Chain", summary: "Sistem automasi untuk distribusi dan pencatatan pergerakan emas antar cabang." },
  { title: "Deteksi Fraud dengan GenAI", category: "Teknologi", team: "Risk Management", summary: "Penggunaan model GenAI untuk mendeteksi anomali pada transaksi harian secara real-time." },
  { title: "Layanan Jemput Bola Prioritas", category: "Layanan", team: "Customer Success", summary: "Layanan pick-up dan delivery barang gadai khusus nasabah prioritas." },
  { title: "Modul HR Cerdas", category: "Proses Bisnis", team: "Human Capital", summary: "Chatbot internal untuk melayani kebutuhan administratif karyawan secara otomatis." },
  { title: "Integrasi Pembayaran Blockchain", category: "Teknologi", team: "IT Infrastructure", summary: "Eksplorasi penggunaan blockchain untuk transparansi dan kecepatan settlement transaksi." }
]
</script>

<template>
  <div class="pt-12 pb-24 bg-gray-50/50 min-h-screen">
    <section class="container mx-auto px-6 max-w-6xl">
      <div class="mb-12">
        <h1 class="text-4xl font-extrabold text-[#003366] mb-4 tracking-tight">Galeri Inovasi</h1>
        <p class="text-gray-600 text-lg">Eksplorasi ide-ide brilian dari seluruh penjuru Pegadaian.</p>
      </div>

      <div class="mb-10">
        <SearchFilterBar />
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <InnovationCard
          v-for="(inv, idx) in dummyInnovations"
          :key="idx"
          :title="inv.title"
          :category="inv.category"
          :team="inv.team"
          :summary="inv.summary"
        />
      </div>
      
      <div class="text-center mt-12">
        <button class="px-8 py-3 bg-white border border-gray-200 text-[#003366] font-semibold rounded-xl hover:bg-gray-50 transition-colors shadow-sm active:scale-95">
          Muat Lebih Banyak
        </button>
      </div>
    </section>
  </div>
</template>
