<script setup lang="ts">
const user = useSupabaseUser()
const supabase = useSupabaseClient()
const isMenuOpen = ref(false)
const profile = ref<any>(null)

// Fetch profile to get role
watchEffect(async () => {
  if (user.value) {
    const { data } = await supabase.from('profiles').select('*').eq('id', user.value.id).single()
    profile.value = data
  } else {
    profile.value = null
  }
})

const handleLogout = async () => {
  await supabase.auth.signOut()
  navigateTo('/login')
}

const role = computed(() => profile.value?.role || 'guest')
</script>

<template>
  <nav class="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b">
    <div class="container mx-auto px-6 py-4 flex justify-between items-center">
      <!-- Logo -->
      <NuxtLink to="/" class="flex items-center gap-3">
        <img src="/logo.png" alt="Logo" class="h-10 w-auto object-contain" />
      </NuxtLink>

      <!-- Menus -->
      <div class="hidden md:flex gap-8 items-center text-sm font-semibold text-[#003366]">
        <NuxtLink to="/" class="hover:text-[#D4AF37] transition-colors">Beranda</NuxtLink>
        <NuxtLink to="/pia" class="hover:text-[#D4AF37] transition-colors">PIA</NuxtLink>
        
        <!-- Role Restricted Menus -->
        <template v-if="role !== 'guest'">
          <NuxtLink to="/idea-repository" class="hover:text-[#D4AF37] transition-colors">Idea Repository</NuxtLink>
          <NuxtLink to="/innovations" class="hover:text-[#D4AF37] transition-colors">Innovations</NuxtLink>
        </template>
        
        <NuxtLink to="/about" class="hover:text-[#D4AF37] transition-colors">About Us</NuxtLink>
        
        <!-- Admin/Superadmin specific -->
        <NuxtLink v-if="role === 'admin' || role === 'superadmin'" to="/admin" class="px-3 py-1 bg-red-50 text-red-600 rounded-lg text-xs font-bold uppercase tracking-wider">
          Admin Area
        </NuxtLink>
        </NuxtLink>
      </div>

      <!-- User Profile -->
      <div class="flex items-center gap-4 relative">
        <div v-if="user && profile" class="relative">
          <button @click="isMenuOpen = !isMenuOpen" class="flex items-center gap-2 hover:bg-gray-50 p-2 rounded-xl transition-all">
            <div class="w-8 h-8 rounded-full bg-[#003366] text-white flex items-center justify-center text-xs font-bold">
              {{ profile.full_name?.charAt(0) || 'U' }}
            </div>
            <Icon name="heroicons:chevron-down" class="w-4 h-4 text-gray-400 transition-transform" :class="{ 'rotate-180': isMenuOpen }" />
          </button>

          <!-- Dropdown -->
          <Transition
            enter-active-class="transition duration-100 ease-out"
            enter-from-class="transform scale-95 opacity-0"
            enter-to-class="transform scale-100 opacity-100"
            leave-active-class="transition duration-75 ease-in"
            leave-from-class="transform scale-100 opacity-100"
            leave-to-class="transform scale-95 opacity-0"
          >
            <div v-if="isMenuOpen" class="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border p-4 z-[100]">
              <div class="mb-4 pb-4 border-b">
                <div class="font-bold text-[#003366]">{{ profile.full_name }}</div>
                <div class="text-[10px] bg-blue-50 text-[#003366] px-2 py-0.5 rounded-full inline-block mt-1 font-bold uppercase tracking-wider">{{ role }}</div>
                <div class="text-xs text-gray-500 mt-2">{{ profile.email }}</div>
              </div>
              <div class="flex flex-col gap-2">
                <NuxtLink to="/user-settings" @click="isMenuOpen = false" class="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-lg text-sm text-gray-700">
                  <Icon name="heroicons:cog-6-tooth" class="w-4 h-4" />
                  Pengaturan User
                </NuxtLink>
                <button @click="handleLogout" class="flex items-center gap-2 p-2 hover:bg-red-50 rounded-lg text-sm text-red-600 w-full text-left font-semibold">
                  <Icon name="heroicons:arrow-left-on-rectangle" class="w-4 h-4" />
                  Logout
                </button>
              </div>
            </div>
          </Transition>
        </div>
        <NuxtLink v-else-if="!user" to="/login" class="btn-primary btn-sm">
          Login
        </NuxtLink>
      </div>
    </div>
  </nav>
</template>
