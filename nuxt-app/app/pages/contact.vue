<script setup lang="ts">
// Form logic can be added here
</script>

<template>
  <div class="pt-12 pb-24 bg-gray-50/50 min-h-screen">
    <!-- Header -->
    <section class="container mx-auto px-6 max-w-5xl text-center mb-16">
      <h1 class="text-4xl md:text-5xl font-extrabold text-[#003366] tracking-tight leading-tight mb-4">
        Mari Berkolaborasi!
      </h1>
      <p class="text-lg text-gray-600 max-w-2xl mx-auto">
        Punya pertanyaan lebih lanjut atau ingin mengeksplorasi potensi kerja sama? Tim kami siap mendengarkan.
      </p>
    </section>

    <div class="container mx-auto px-6 max-w-5xl">
      <div class="flex flex-col lg:flex-row gap-12 items-start">
        
        <!-- Informasi Kontak (Cards) -->
        <div class="w-full lg:w-1/3 space-y-6">
          <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4">
            <div class="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center shrink-0">
              <Icon name="material-symbols:location-on" size="24" />
            </div>
            <div>
              <h3 class="text-lg font-bold text-gray-900 mb-1">Kantor Pusat</h3>
              <p class="text-gray-600 text-sm leading-relaxed">Jl. Kramat Raya No.162, Kenari, Senen, Jakarta Pusat 10430</p>
            </div>
          </div>

          <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4">
            <div class="w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center shrink-0">
              <Icon name="material-symbols:mail" size="24" />
            </div>
            <div>
              <h3 class="text-lg font-bold text-gray-900 mb-1">Email</h3>
              <a href="mailto:innovation@pegadaian.co.id" class="text-gray-600 text-sm hover:text-[#003366] hover:underline">innovation@pegadaian.co.id</a>
            </div>
          </div>

          <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4">
            <div class="w-12 h-12 bg-yellow-50 text-yellow-600 rounded-full flex items-center justify-center shrink-0">
              <Icon name="material-symbols:chat" size="24" />
            </div>
            <div>
              <h3 class="text-lg font-bold text-gray-900 mb-1">WhatsApp</h3>
              <p class="text-gray-600 text-sm">+62 811 1500 569</p>
              <span class="text-xs text-green-500 font-medium mt-1 inline-block">Jam Kerja: 08:00 - 17:00</span>
            </div>
          </div>
        </div>

        <!-- Formulir Kontak -->
        <div class="w-full lg:w-2/3 bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-gray-100">
          <h2 class="text-2xl font-bold text-[#003366] mb-8">Kirim Pesan Langsung</h2>
          
          <form class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Nama Lengkap</label>
                <input 
                  type="text" 
                  placeholder="Masukkan nama Anda" 
                  class="w-full px-5 py-3.5 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all text-gray-800"
                />
              </div>
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Alamat Email</label>
                <input 
                  type="email" 
                  placeholder="nama@pegadaian.co.id" 
                  class="w-full px-5 py-3.5 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all text-gray-800"
                />
              </div>
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Tujuan (Kategori)</label>
              <div class="relative">
                <select class="w-full px-5 py-3.5 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all text-gray-800 appearance-none pr-10">
                  <option value="" disabled selected>Pilih Tujuan...</option>
                  <option value="ide">Punya Ide Inovasi</option>
                  <option value="pertanyaan">Pertanyaan Umum</option>
                  <option value="kolaborasi">Potensi Kolaborasi</option>
                  <option value="lainnya">Lainnya</option>
                </select>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                  <Icon name="material-symbols:keyboard-arrow-down-rounded" />
                </div>
              </div>
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Pesan Anda</label>
              <textarea 
                rows="5" 
                placeholder="Tuliskan pesan, pertanyaan, atau ide Anda di sini..." 
                class="w-full px-5 py-3.5 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all text-gray-800 resize-none"
              ></textarea>
            </div>

            <button 
              type="button" 
              class="w-full py-4 bg-[#003366] hover:bg-[#002244] text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 active:scale-95"
            >
              Kirim Pesan
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
