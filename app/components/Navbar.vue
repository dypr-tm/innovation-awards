<script setup lang="ts">
const user = useSupabaseUser()
const supabase = useSupabaseClient()
const handleLogout = async () => {
  await supabase.auth.signOut()
  navigateTo('/login')
}
</script>

<template>
  <nav class="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b">
    <div class="container mx-auto px-6 py-4 flex justify-between items-center">
      <NuxtLink to="/" class="flex items-center gap-3">
        <img src="/logo.png" alt="Pegadaian Innovation Center" class="h-10 w-auto object-contain" />
      </NuxtLink>
      <div class="flex gap-6 items-center">
        <NuxtLink to="/pia">Awards</NuxtLink>
        <NuxtLink to="/repository">Gallery</NuxtLink>
        <div v-if="user" class="flex gap-4 items-center">
          <span class="text-sm font-medium">{{ user.email }}</span>
          <button @click="handleLogout" class="text-red-500 font-bold">Logout</button>
        </div>
        <NuxtLink v-else to="/login" class="bg-[#003366] text-white px-6 py-2 rounded-full font-bold">Login</NuxtLink>
      </div>
    </div>
  </nav>
</template>
