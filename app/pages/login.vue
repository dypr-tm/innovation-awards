<script setup lang="ts">
const isLogin = ref(true)
const email = ref('')
const password = ref('')
const fullName = ref('')
const loading = ref(false)
const errorMsg = ref('')

const supabase = useSupabaseClient()

const handleAuth = async () => {
  loading.value = true
  errorMsg.value = ''
  
  try {
    if (isLogin.value) {
      // Login Logic
      const { error } = await supabase.auth.signInWithPassword({ 
        email: email.value, 
        password: password.value 
      })
      if (error) throw error
      navigateTo('/')
    } else {
      // Register Logic
      const { error } = await supabase.auth.signUp({
        email: email.value,
        password: password.value,
        options: {
          data: {
            full_name: fullName.value
          }
        }
      })
      if (error) throw error
      alert('Pendaftaran berhasil! Silakan cek email Anda untuk verifikasi (jika diaktifkan) atau langsung login.')
      isLogin.value = true
    }
  } catch (err: any) {
    errorMsg.value = err.message
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50/50 p-6">
    <div class="w-full max-w-md">
      <!-- Logo/Brand -->
      <div class="text-center mb-10">
        <img src="/logo.png" alt="Logo" class="h-16 mx-auto mb-6" />
        <h1 class="text-3xl font-black text-[#003366] mb-2">
          {{ isLogin ? 'Selamat Datang' : 'Buat Akun Baru' }}
        </h1>
        <p class="text-gray-500">
          {{ isLogin ? 'Masuk ke Pegadaian Innovation Center' : 'Bergabung sebagai Insan Inovator Pegadaian' }}
        </p>
      </div>

      <!-- Auth Card -->
      <div class="bg-white p-8 md:p-10 rounded-[40px] shadow-2xl shadow-blue-900/5 border border-white">
        <!-- Error Alert -->
        <div v-if="errorMsg" class="mb-6 p-4 bg-red-50 text-red-600 rounded-2xl text-sm font-medium border border-red-100 flex gap-3 items-center">
          <Icon name="heroicons:exclamation-circle" class="w-5 h-5" />
          {{ errorMsg }}
        </div>

        <form @submit.prevent="handleAuth" class="space-y-4">
          <div v-if="!isLogin">
            <label class="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 pl-2">Nama Lengkap</label>
            <input v-model="fullName" required class="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#003366]/10 outline-none text-sm" placeholder="Nama Anda" />
          </div>

          <div>
            <label class="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 pl-2">Email Korporat</label>
            <input v-model="email" type="email" required class="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#003366]/10 outline-none text-sm" placeholder="email@pegadaian.co.id" />
          </div>

          <div>
            <label class="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 pl-2">Password</label>
            <input v-model="password" type="password" required class="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#003366]/10 outline-none text-sm" placeholder="••••••••" />
          </div>

          <button type="submit" :disabled="loading" class="w-full py-5 bg-[#003366] text-white rounded-2xl font-black text-lg shadow-xl shadow-blue-900/20 hover:scale-[1.02] active:scale-95 transition-all mt-6 disabled:opacity-50">
            <span v-if="loading">Memuat...</span>
            <span v-else>{{ isLogin ? 'Masuk Sekarang' : 'Daftar Akun' }}</span>
          </button>
        </form>

        <!-- Toggle -->
        <div class="mt-8 text-center">
          <button @click="isLogin = !isLogin" class="text-sm font-bold text-gray-400 hover:text-[#003366] transition-colors">
            {{ isLogin ? 'Belum punya akun? Daftar di sini' : 'Sudah punya akun? Masuk di sini' }}
          </button>
        </div>
      </div>

      <!-- Footer -->
      <p class="text-center mt-10 text-xs text-gray-400 font-medium tracking-wide">
        &copy; 2026 PT Pegadaian - Innovation Center Division
      </p>
    </div>
  </div>
</template>
