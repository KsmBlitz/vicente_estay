// https://nuxt.com/docs/api/configuration/nuxt-config
import yaml from '@rollup/plugin-yaml'

export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/color-mode', '@nuxtjs/i18n', '@nuxt/fonts'],

  fonts: {
    families: [
      // Solo el subconjunto latin (cubre tildes, ñ, ü) y precargado: el texto no espera al CSS
      { name: 'Geist', provider: 'google', weights: [400, 500, 600], subsets: ['latin'], preload: true },
      { name: 'Geist Mono', provider: 'google', weights: [400, 500], subsets: ['latin'], preload: true },
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
    // Los mensajes se precompilan en el build: no hace falta el compilador en el navegador
    bundle: { fullInstall: false },
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
    // Genera .br/.gz de los archivos públicos (HTML, JS, CSS) para hosts que no comprimen
    compressPublicAssets: true,
    // Las rutas de servidor (llms.txt, sitemap...) también leen /content
    rollupConfig: { plugins: [yaml()] },
  },

  routeRules: {
    // Todo el sitio se genera en el build (HTML estático en la CDN, sin servidor por visita)
    '/': { prerender: true },
    '/en': { prerender: true },
    '/de': { prerender: true },
    '/robots.txt': { prerender: true },
    '/sitemap.xml': { prerender: true },
    '/llms.txt': { prerender: true },
    '/llms-full.txt': { prerender: true },
    // Archivos estáticos: caché de una semana (imágenes, logos) o un día (PDF que se reemplazan)
    '/images/**': { headers: { 'cache-control': 'public, max-age=604800, stale-while-revalidate=86400' } },
    '/logos/**': { headers: { 'cache-control': 'public, max-age=604800, stale-while-revalidate=86400' } },
    '/og/**': { headers: { 'cache-control': 'public, max-age=604800, stale-while-revalidate=86400' } },
    '/certificados/**': { headers: { 'cache-control': 'public, max-age=86400, stale-while-revalidate=604800' } },
    '/CV_Vicente_Estay.pdf': { headers: { 'cache-control': 'public, max-age=86400, stale-while-revalidate=604800' } },
    '/CV_Vicente_Estay_EN.pdf': { headers: { 'cache-control': 'public, max-age=86400, stale-while-revalidate=604800' } },
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

  // El contenido viene de /content, no hay datos asíncronos: el payload aparte sobra
  // (y con Nuxt 4.2 + unstorage 1.17 rompe el prerender de la ruta '/')
  experimental: { payloadExtraction: false },

  compatibilityDate: '2024-11-01',
  devtools: { enabled: true }
})
