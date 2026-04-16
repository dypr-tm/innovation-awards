<script setup lang="ts">
const search = ref('')
const filter = ref('Semua')

const ideas = [
  { title: "Smart Lending Algorithm", author: "Budi Santoso", date: "15 Apr 2026", status: "In Review", category: "Big Data", likes: 24 },
  { title: "Virtual Gold Appraisal", author: "Siti Rahma", date: "12 Apr 2026", status: "Completed", category: "IoT", likes: 45 },
  { title: "BlockChain Gold Track", author: "Andi Wijaya", date: "10 Apr 2026", status: "Development", category: "Blockchain", likes: 18 },
  { title: "Next-Gen Mobile App", author: "Lina Marlina", date: "08 Apr 2026", status: "Idea", category: "Mobile App", likes: 32 },
  { title: "AI Fraud Detector", author: "Doni Pratama", date: "05 Apr 2026", status: "Testing", category: "Artificial Intelligence", likes: 56 },
  { title: "Seamless Digital KYC", author: "Rina Kusuma", date: "01 Apr 2026", status: "In Review", category: "Security", likes: 29 },
]

const categories = ['Semua', 'Big Data', 'IoT', 'Blockchain', 'Mobile App', 'Artificial Intelligence', 'Security']
</script>

<template>
  <div class="pt-24 pb-32 bg-gray-50/50 min-h-screen">
    <div class="container mx-auto px-6">
      <div class="max-w-4xl mx-auto mb-16 pt-12">
        <h1 class="text-4xl font-bold text-[#003366] mb-4">Idea Repository</h1>
        <p class="text-gray-500 text-lg mb-10">Jelajahi kumpulan ide inovasi dari seluruh karyawan Pegadaian.</p>
        
        <!-- Search & Filter Bar -->
        <div class="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 items-center">
          <div class="relative flex-grow w-full">
            <Icon name="heroicons:magnifying-glass" class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input v-model="search" type="text" placeholder="Cari judul ide atau kategori..." class="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#003366]/10 outline-none text-sm" />
          </div>
          <select v-model="filter" class="w-full md:w-48 pl-4 pr-10 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#003366]/10 outline-none text-sm appearance-none cursor-pointer">
            <option v-for="c in categories" :key="c" :value="c">{{ c }}</option>
          </select>
        </div>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        <div v-for="idea in ideas" :key="idea.title" class="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all border border-gray-100 group">
          <div class="flex justify-between items-start mb-6">
            <div class="px-3 py-1 bg-blue-50 text-[#003366] rounded-full text-[10px] font-bold uppercase tracking-wider">
              {{ idea.category }}
            </div>
            <div class="flex items-center gap-1 text-gray-400 group-hover:text-red-500 transition-colors">
              <Icon name="heroicons:heart-solid" class="w-4 h-4" />
              <span class="text-xs font-bold">{{ idea.likes }}</span>
            </div>
          </div>
          <h3 class="text-xl font-bold text-[#003366] mb-4 leading-tight group-hover:text-[#D4AF37] transition-colors cursor-pointer">
            {{ idea.title }}
          </h3>
          <div class="flex items-center gap-3 mb-6 pt-4 border-t border-gray-50">
            <div class="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-[10px] font-bold text-gray-500">
              {{ idea.author.charAt(0) }}
            </div>
            <div>
              <div class="text-sm font-bold text-gray-700">{{ idea.author }}</div>
              <div class="text-[10px] text-gray-400 uppercase tracking-widest">{{ idea.date }}</div>
            </div>
          </div>
          <div class="flex justify-between items-center">
            <div class="flex items-center gap-2">
              <div class="w-2 h-2 rounded-full" :class="{
                'bg-yellow-400': idea.status === 'In Review',
                'bg-green-500': idea.status === 'Completed',
                'bg-blue-500': idea.status === 'Development',
                'bg-gray-400': idea.status === 'Idea',
                'bg-orange-500': idea.status === 'Testing'
              }"></div>
              <span class="text-xs font-medium text-gray-500">{{ idea.status }}</span>
            </div>
            <button class="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center hover:bg-[#003366] hover:text-white transition-all">
              <Icon name="heroicons:chevron-right" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
