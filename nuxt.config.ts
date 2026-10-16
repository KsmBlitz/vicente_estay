// https://nuxt.com/docs/api/configuration/nuxt-config
import yaml from '@rollup/plugin-yaml'

export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/color-mode', '@nuxtjs/i18n', '@nuxt/fonts'],

  fonts: {
    families: [
      { name: 'Geist', provider: 'google', weights: [400, 500, 600] },
      { name: 'Geist Mono', provider: 'google', weights: [400, 500] },
    ],
  },

  i18n: {
    locales: [
      { code: 'es', language: 'es-CL', name: 'Español', file: 'es.json' },
      { code: 'en', language: 'en-US', name: 'English', file: 'en.json' },
      { code: 'de', language: 'de-DE', name: 'Deutsch', file: 'de.json' },
    ],
    defaultLocale: 'es',
    strategy: 'prefix_except_default',
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
    cssPath: '~/assets/css/main.css',
  },

  colorMode: {
    classSuffix: '',
    preference: 'system',
    fallback: 'light',
    storageKey: 'nuxt-color-mode'
  },

  // El contenido vive en /content/*.yml y se importa como módulo
  vite: {
    plugins: [yaml()],
  },
  nitro: {
    // Las rutas de servidor (llms.txt, sitemap...) también leen /content
    rollupConfig: { plugins: [yaml()] },
  },

  routeRules: {
    // Imágenes del sitio: caché de una semana en el navegador y la CDN
    '/images/**': { headers: { 'cache-control': 'public, max-age=604800, stale-while-revalidate=86400' } },
    '/og/**': { headers: { 'cache-control': 'public, max-age=604800, stale-while-revalidate=86400' } },
  },

  runtimeConfig: {
    public: {
      // Sobreescribir con NUXT_PUBLIC_SITE_URL en producción
      // Fecha del build: se usa como lastmod en sitemap y datos estructurados
      buildDate: new Date().toISOString().slice(0, 10),
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://vicenteestay.vercel.app',
      // Sobreescribir con NUXT_PUBLIC_FORMSPREE_URL en producción
      formspreeUrl: process.env.NUXT_PUBLIC_FORMSPREE_URL || 'https://formspree.io/f/xqezorqo',
    }
  },

  compatibilityDate: '2024-11-01',
  devtools: { enabled: true }
})
