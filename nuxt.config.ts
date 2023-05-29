export default defineNuxtConfig({
  app: {
    head: {
      title: 'Phonebook Nuxt3 + tRPC',
      description: 'Phonebook App using Nuxt3 + tRPC'
    }
  },

  build: {
    transpile: ['primevue', 'trpc-nuxt']
  },

  css: [
    'primevue/resources/themes/lara-light-blue/theme.css',
    'primevue/resources/primevue.css',
    'vue-toast-notification/dist/theme-default.css',
    '@/assets/scss/main.scss'
  ],

  googleFonts: {
    families: {
      'DM+Sans': true,
      'DM+Serif+Display': true
    }
  },

  imports: {
    dirs: ['./stores']
  },

  modules: ['@pinia/nuxt', '@nuxtjs/google-fonts', 'nuxt-icon', 'nuxt-lodash'],

  typescript: {
    strict: true
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/scss/_variables.scss" as *;'
        }
      }
    },
    define: {
      'process.env.DEBUG': false
    }
  }
})
