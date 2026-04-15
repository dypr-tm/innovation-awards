<script setup lang="ts">
defineProps<{
  title: string
  category: string
  team: string
  summary: string
}>()
</script>

<template>
  <div class="bg-white rounded-2xl p-7 border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col group">
    <div class="flex items-center justify-between mb-5">
      <span class="px-3 py-1 bg-green-50 text-green-600 text-xs font-bold rounded-full uppercase tracking-wider">
        {{ category }}
      </span>
      <div class="text-gray-300 group-hover:text-[#D4AF37] transition-colors">
        <Icon name="material-symbols:bookmark-outline" size="20" />
      </div>
    </div>
    <h3 class="text-xl font-bold text-[#003366] mb-3 leading-tight group-hover:text-[#D4AF37] transition-colors">
      {{ title }}
    </h3>
    <p class="text-gray-500 text-sm leading-relaxed mb-6 flex-grow">
      {{ summary }}
    </p>
    <div class="pt-5 border-t border-gray-50 flex items-center gap-3">
      <div class="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
        <Icon name="material-symbols:person" class="text-blue-500" size="16" />
      </div>
      <div class="text-xs">
        <div class="text-gray-400">Tim</div>
        <div class="font-bold text-gray-700">{{ team }}</div>
      </div>
    </div>
  </div>
</template>
