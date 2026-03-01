// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/color-mode', '@nuxtjs/i18n'],

  i18n: {
    locales: [
      { code: 'es', language: 'es-CL', name: 'Español', file: 'es.json' },
      { code: 'en', language: 'en-US', name: 'English', file: 'en.json' },
      { code: 'de', language: 'de-DE', name: 'Deutsch', file: 'de.json' },
    ],
    defaultLocale: 'es',
    strategy: 'prefix_except_default',
    lazy: true,
    langDir: 'locales/',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_locale',
      redirectOn: 'root',
      alwaysRedirect: false,
      cookieCrossOrigin: false,
    },
  },

  tailwindcss: {
    config: {
      darkMode: 'class',
      content: [
        './components/**/*.{js,vue,ts}',
        './layouts/**/*.vue',
        './pages/**/*.vue',
        './plugins/**/*.{js,ts}',
        './app.vue',
        './error.vue'
      ]
    }
  },

  colorMode: {
    classSuffix: '',
    preference: 'light',
    fallback: 'light',
    storageKey: 'nuxt-color-mode'
  },

  runtimeConfig: {
    public: {
      sanityProjectId: '2il0jzpa',
      sanityDataset: 'production',
      sanityApiVersion: '2024-03-20',
      // Sobreescribir con NUXT_PUBLIC_SITE_URL en producción
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://vicenteestay.vercel.app',
      // Sobreescribir con NUXT_PUBLIC_FORMSPREE_URL en producción
      formspreeUrl: process.env.NUXT_PUBLIC_FORMSPREE_URL || 'https://formspree.io/f/xqezorqo',
    }
  },

  compatibilityDate: '2024-11-01',
  devtools: { enabled: true }
})
