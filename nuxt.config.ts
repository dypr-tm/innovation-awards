export default defineNuxtConfig({
  srcDir: 'app/',
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/supabase',
    '@nuxt/icon'
  ],
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      title: 'Pegadaian Innovation Center',
      meta: [
        { name: 'description', content: 'Pusat Manajemen Inovasi PT Pegadaian' }
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@400;700&display=swap' }
      ]
    }
  },
  supabase: {
    redirect: false,
    url: process.env.NUXT_PUBLIC_SUPABASE_URL || 'https://vxeuohbusmtjlqlbfgxy.supabase.co',
    key: process.env.NUXT_PUBLIC_SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ4ZXVvaGJ1c210amxxbGJmZ3h5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMxOTc2MDIsImV4cCI6MjA4ODc3MzYwMn0.HLB3Rt4PDyGUf8YMeti84b-7SPUm-KiX6YToVDOletE'
  }
})
