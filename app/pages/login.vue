<script setup lang="ts">
const email = ref('')
const password = ref('')
const supabase = useSupabaseClient()
const handleLogin = async () => {
  const { error } = await supabase.auth.signInWithPassword({ email: email.value, password: password.value })
  if (!error) navigateTo('/')
}
</script>
<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="w-full max-w-md bg-white p-8 rounded-3xl shadow-sm">
      <h1 class="text-2xl font-bold mb-6">Login</h1>
      <input v-model="email" class="w-full p-4 mb-4 border rounded-xl" placeholder="Email" />
      <input v-model="password" type="password" class="w-full p-4 mb-6 border rounded-xl" placeholder="Password" />
      <button @click="handleLogin" class="w-full py-4 bg-[#003366] text-white rounded-xl font-bold">Masuk</button>
    </div>
  </div>
</template>
