<script setup lang="ts">
const email = ref('')
const password = ref('')
const errorMsg = ref('')
const loading = ref(false)

const router = useRouter()
const supabase = useSupabaseClient()

const handleEmailLogin = async () => {
  loading.value = true
  errorMsg.value = ''

  const { error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  })

  if (error) {
    errorMsg.value = error.message === 'Invalid login credentials' ? 'Email atau Password salah!' : error.message
    loading.value = false
  } else {
    router.push('/')
  }
}

const handleGoogleLogin = async () => {
  loading.value = true
  errorMsg.value = ''
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/`,
    },
  })

  if (error) {
    errorMsg.value = error.message
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-[80vh] flex items-center justify-center p-6 bg-gray-50/50">
    <div class="w-full max-w-md bg-white rounded-3xl shadow-sm p-8 md:p-10 border border-gray-100">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-extrabold text-[#003366] mb-2">Masuk Akun</h1>
        <p class="text-gray-500 text-sm">Gunakan akun MVP dummy atau profil Anda</p>
      </div>

      <div v-if="errorMsg" class="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 font-semibold rounded-xl text-sm text-center">
        {{ errorMsg }}
      </div>

      <form class="space-y-5" @submit.prevent="handleEmailLogin">
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">Email</label>
          <input 
            v-model="email"
            type="email" 
            required
            placeholder="superadmin@pegadaian.co.id" 
            class="w-full px-5 py-3.5 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all text-gray-800"
          />
        </div>
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">Kata Sandi</label>
          <input 
            v-model="password"
            type="password" 
            required
            placeholder="password123" 
            class="w-full px-5 py-3.5 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all text-gray-800"
          />
        </div>

        <div class="flex items-center justify-between pt-2">
          <label class="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" class="w-4 h-4 text-[#D4AF37] border-gray-300 rounded focus:ring-[#D4AF37]" />
            <span class="text-sm text-gray-600 font-medium">Ingat Saya</span>
          </label>
          <a href="#" class="text-sm font-semibold text-[#003366] hover:text-[#D4AF37] transition-colors">Lupa sandi?</a>
        </div>

        <button 
          type="submit"
          :disabled="loading"
          class="w-full py-4 mt-6 bg-[#003366] hover:bg-[#002244] text-white font-bold rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform active:scale-95 disabled:opacity-70 disabled:active:scale-100"
        >
          {{ loading ? 'Memproses...' : 'Masuk dengan Email' }}
        </button>
      </form>

      <div class="mt-8 relative flex items-center justify-center">
        <div class="absolute inset-0 flex items-center">
          <div class="w-full border-t border-gray-200"></div>
        </div>
        <div class="relative bg-white px-4 text-sm text-gray-400 font-medium">Atau</div>
      </div>

      <button 
        @click="handleGoogleLogin"
        :disabled="loading"
        type="button"
        class="w-full py-4 mt-8 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-bold rounded-xl shadow-sm transition-all duration-300 flex items-center justify-center gap-3 active:scale-95"
      >
        <svg class="w-5 h-5" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
        </svg>
        Login with Google
      </button>
    </div>
  </div>
</template>
