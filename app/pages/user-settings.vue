<script setup lang="ts">
const user = useSupabaseUser()
const profile = ref<any>(null)
const client = useSupabaseClient()

onMounted(async () => {
  if (user.value) {
    const { data } = await client.from('profiles').select('*').eq('id', user.value.id).single()
    profile.value = data
  }
})
</script>

<template>
  <div class="pt-32 pb-20 bg-gray-50 min-h-screen">
    <div class="container mx-auto px-6 max-w-2xl">
      <div class="bg-white rounded-[40px] shadow-sm p-10 border border-gray-100">
        <h1 class="text-3xl font-black text-[#003366] mb-8">Pengaturan User</h1>
        
        <div v-if="profile" class="space-y-6">
          <div class="p-6 bg-gray-50 rounded-3xl border border-gray-100">
            <label class="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1 pl-1">Informasi Akun</label>
            <div class="space-y-4 pt-4">
              <div>
                <span class="text-xs text-gray-400 block mb-1">Nama Lengkap</span>
                <p class="font-bold text-[#003366]">{{ profile.full_name }}</p>
              </div>
              <div>
                <span class="text-xs text-gray-400 block mb-1">Email Korporat</span>
                <p class="font-bold text-[#003366]">{{ profile.email }}</p>
              </div>
              <div>
                <span class="text-xs text-gray-400 block mb-1">Role Utama</span>
                <span class="px-3 py-1 bg-[#003366] text-white rounded-full text-[10px] font-bold uppercase tracking-wider">
                  {{ profile.role }}
                </span>
              </div>
            </div>
          </div>

          <div class="p-4 bg-yellow-50 text-yellow-700 rounded-2xl text-xs font-medium border border-yellow-100 flex gap-3 items-start leading-relaxed">
            <Icon name="heroicons:information-circle" class="w-5 h-5 shrink-0" />
            Pengaturan lebih lanjut (NIK, Unit Kerja, & Ganti Password) saat ini dalam tahap integrasi dengan SSO korporat.
          </div>
        </div>
        
        <div v-else class="text-center py-20">
          <div class="animate-spin w-8 h-8 border-4 border-[#003366] border-t-transparent rounded-full mx-auto mb-4"></div>
          <p class="text-gray-400 text-sm">Memuat data profil...</p>
        </div>
      </div>
    </div>
  </div>
</template>
