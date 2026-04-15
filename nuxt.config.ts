export default defineNuxtConfig({
  srcDir: 'app/',
  compatibilityDate: '2024-04-03',
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/supabase',
    '@nuxt/icon'
  ],
  css: ['~/app/assets/css/main.css'],
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
    redirect: false
  }
})
