import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  theme: {
    extend: {
      colors: {
        'pegadaian-navy': '#003366',
        'pegadaian-gold': '#D4AF37',
        'pegadaian-dark': '#002244',
      },
      borderRadius: {
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
    },
  },
}
