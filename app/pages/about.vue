<script setup lang="ts">
const team = [
  { name: "Andi Wijaya", role: "Head of Innovation", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400" },
  { name: "Siti Rahma", role: "Product Strategist", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400" },
  { name: "Budi Santoso", role: "Chief Technologist", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400" },
  { name: "Lina Marlina", role: "Engagement Manager", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400" }
]
</script>

<template>
  <div class="pt-24 pb-32">
    <!-- About Hero -->
    <section class="py-24 px-6 bg-[#003366] text-white">
      <div class="container mx-auto max-w-5xl text-center">
        <h1 class="text-5xl md:text-7xl font-bold mb-8">Pilar Transformasi <span class="text-[#D4AF37]">Pegadaian.</span></h1>
        <p class="text-xl text-blue-100/80 leading-relaxed max-w-3xl mx-auto">
          Pegadaian Innovation Center hadir untuk mendorong inovasi yang berkelanjutan dan mempercepat transformasi digital di setiap lini bisnis PT Pegadaian.
        </p>
      </div>
    </section>

    <!-- Mission & Vision -->
    <section class="py-32">
      <div class="container mx-auto px-6 grid md:grid-cols-2 gap-20">
        <div>
          <div class="inline-block p-4 bg-orange-100 rounded-3xl mb-8">
            <Icon name="heroicons:eye" class="w-10 h-10 text-orange-600" />
          </div>
          <h2 class="text-3xl font-bold text-[#003366] mb-6">Visi Kami</h2>
          <p class="text-gray-600 text-lg leading-relaxed">
            Menjadi katalisator utama dalam menciptakan solusi finansial yang inklusif, modern, dan paling terpercaya di Indonesia melalui eksplorasi teknologi tanpa batas.
          </p>
        </div>
        <div>
          <div class="inline-block p-4 bg-blue-100 rounded-3xl mb-8">
            <Icon name="heroicons:rocket-launch" class="w-10 h-10 text-blue-600" />
          </div>
          <h2 class="text-3xl font-bold text-[#003366] mb-6">Misi Kami</h2>
          <ul class="space-y-4">
            <li class="flex gap-4 text-gray-600 text-lg">
              <Icon name="heroicons:check-badge" class="w-6 h-6 text-[#D4AF37] shrink-0" />
              <span>Menciptakan ekosistem inovasi yang terbuka bagi seluruh karyawan.</span>
            </li>
            <li class="flex gap-4 text-gray-600 text-lg">
              <Icon name="heroicons:check-badge" class="w-6 h-6 text-[#D4AF37] shrink-0" />
              <span>Mempercepat adopsi teknologi tepat guna untuk efisiensi bisnis.</span>
            </li>
            <li class="flex gap-4 text-gray-600 text-lg">
              <Icon name="heroicons:check-badge" class="w-6 h-6 text-[#D4AF37] shrink-0" />
              <span>Menginkubasi ide-ide disruptif menjadi nilai tambah bagi nasabah.</span>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Team Section -->
    <section class="py-32 bg-gray-50">
      <div class="container mx-auto px-6 text-center">
        <h2 class="text-4xl font-bold text-[#003366] mb-4">Tim Innovation Center</h2>
        <p class="text-gray-500 mb-20 max-w-2xl mx-auto text-lg leading-relaxed">
          Para ahli yang berdedikasi membimbing setiap langkah inovasi dari konsep hingga implementasi.
        </p>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div v-for="p in team" :key="p.name" class="group">
            <div class="aspect-square rounded-3xl overflow-hidden mb-6 shadow-sm group-hover:shadow-2xl transition-all duration-500">
              <img :src="p.img" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            </div>
            <h3 class="text-xl font-bold text-[#003366] mb-1">{{ p.name }}</h3>
            <p class="text-sm font-medium text-[#D4AF37] uppercase tracking-widest">{{ p.role }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
