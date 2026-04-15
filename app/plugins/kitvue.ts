import PegadaianUIKit from '@pegadaian/kitvue'
import '@pegadaian/kitvue/dist/style.css'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(PegadaianUIKit)
})
