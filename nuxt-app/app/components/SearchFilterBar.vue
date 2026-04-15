<template>
  <div class="flex flex-col md:flex-row gap-4 items-center w-full">
    <div class="relative flex-grow w-full">
      <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
        <Icon name="material-symbols:search" size="20" />
      </div>
      <input 
        type="text" 
        placeholder="Cari inovasi (misal: AI, Blockchain...)" 
        class="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] shadow-sm transition-all"
      />
    </div>
    
    <div class="flex gap-2 w-full md:w-auto">
      <div class="relative w-full md:w-48">
        <select class="w-full pl-4 pr-10 py-3.5 rounded-xl bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] appearance-none shadow-sm font-medium text-gray-700">
          <option value="">Semua Kategori</option>
          <option value="teknologi">Teknologi</option>
          <option value="layanan">Layanan</option>
          <option value="prosess">Proses Bisnis</option>
        </select>
        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
          <Icon name="material-symbols:keyboard-arrow-down-rounded" />
        </div>
      </div>
    </div>
  </div>
</template>
