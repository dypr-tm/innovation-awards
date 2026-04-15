<script setup lang="ts">
const teamMembers = [
  { name: "Andi Saputra", role: "Head of Innovation Center", img: "https://api.dicebear.com/7.x/notionists/svg?seed=Andi" },
  { name: "Rina Wijaya", role: "Innovation Strategist", img: "https://api.dicebear.com/7.x/notionists/svg?seed=Rina" },
  { name: "Budi Santoso", role: "Tech Lead", img: "https://api.dicebear.com/7.x/notionists/svg?seed=Budi" },
  { name: "Siti Nurhaliza", role: "Product Manager", img: "https://api.dicebear.com/7.x/notionists/svg?seed=Siti" },
  { name: "Kevin Hartono", role: "UI/UX Designer", img: "https://api.dicebear.com/7.x/notionists/svg?seed=Kevin" },
  { name: "Maya Indah", role: "Community Manager", img: "https://api.dicebear.com/7.x/notionists/svg?seed=Maya" },
]
</script>

<template>
  <div class="pt-12 pb-24 bg-white overflow-hidden">
    <!-- Visi Section -->
    <section class="container mx-auto px-6 max-w-5xl mb-24">
      <div class="flex flex-col md:flex-row items-center gap-12">
        <div class="w-full md:w-1/2 flex-shrink-0">
          <div class="relative w-full aspect-square max-w-md mx-auto">
            <div class="absolute inset-0 bg-yellow-100 rounded-full scale-95 origin-center animate-pulse"></div>
            <div class="absolute inset-4 bg-[#003366] rounded-3xl rotate-3 opacity-10"></div>
            <div class="absolute inset-0 flex items-center justify-center p-8">
              <Icon name="material-symbols:lightbulb-outline" size="160" class="text-[#003366]" />
            </div>
          </div>
        </div>
        
        <div class="w-full md:w-1/2">
          <h1 class="text-4xl md:text-5xl font-extrabold text-[#003366] mb-6 tracking-tight leading-tight">
            Mewujudkan <br class="hidden md:block"/>
            <span class="text-[#D4AF37]">Masa Depan Bersama</span>
          </h1>
          <div class="bg-gray-50 p-6 rounded-2xl border-l-4 border-[#D4AF37] mb-6 shadow-sm">
            <h3 class="text-lg font-bold text-[#003366] mb-2 flex items-center gap-2">
              <Icon name="material-symbols:lightbulb" class="text-[#D4AF37]" size="20" />
              Visi Kami
            </h3>
            <p class="text-gray-700 italic">
              "Menjadi motor penggerak transformasi digital dan inovasi berkelanjutan."
            </p>
          </div>
          <div class="bg-gray-50 p-6 rounded-2xl border-l-4 border-[#003366] shadow-sm">
            <h3 class="text-lg font-bold text-[#003366] mb-2 flex items-center gap-2">
              <Icon name="material-symbols:trending-up" class="text-[#003366]" size="20" />
              Misi Kami
            </h3>
            <p class="text-gray-700">
              Memfasilitasi ide-ide kreatif dari seluruh insan Pegadaian dan mewujudkannya menjadi solusi nyata yang berdampak pada pengalaman nasabah dan efisiensi perusahaan.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Tim Kami Section -->
    <section class="container mx-auto px-6 max-w-5xl bg-gray-50/50 py-16 rounded-3xl">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-extrabold text-[#003366] mb-4 inline-flex items-center justify-center gap-3">
          <Icon name="material-symbols:groups" class="text-[#D4AF37]" size="32" />
          Tim Kami
        </h2>
        <p class="text-gray-500 max-w-2xl mx-auto">
          Orang-orang dibalik layar yang mendengarkan, mengevaluasi, dan membantu merealisasikan ide-ide brilian Anda.
        </p>
      </div>

      <div class="flex flex-wrap justify-center gap-8">
        <div v-for="(member, idx) in teamMembers" :key="idx" class="w-40 md:w-48 text-center group">
          <div class="w-32 h-32 md:w-40 md:h-40 mx-auto rounded-full bg-white shadow-sm p-2 mb-4 group-hover:-translate-y-2 transition-transform duration-300 border border-gray-100">
            <img 
              :src="member.img" 
              :alt="member.name" 
              class="w-full h-full rounded-full object-cover bg-gray-50"
              loading="lazy"
            />
          </div>
          <h4 class="text-lg font-bold text-[#003366] group-hover:text-[#D4AF37] transition-colors">{{ member.name }}</h4>
          <p class="text-sm font-medium text-gray-500">{{ member.role }}</p>
        </div>
      </div>
    </section>
  </div>
</template>
