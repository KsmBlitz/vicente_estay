<script setup lang="ts">
const { locale } = useI18n()
const { public: { siteUrl } } = useRuntimeConfig()
const { profile } = useContent()
const { lf } = useLocaleField()

// ── SEO ────────────────────────────────────────────────────────────────────
const siteTitle = computed(() => `${profile.name} - ${lf(profile.title)}`)
const siteDescription = computed(() => lf(profile.shortBio))
const ogImage = `${siteUrl}${profile.photo ?? '/icon.png'}`
const currentLocaleUrl = computed(() =>
  locale.value === 'es' ? siteUrl : `${siteUrl}/${locale.value}`
)

const jsonLd = computed(() => ({
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: profile.name,
  jobTitle: lf(profile.title),
  description: lf(profile.shortBio),
  url: siteUrl,
  image: ogImage,
  email: profile.email,
  sameAs: [profile.github, profile.linkedin],
  knowsAbout: ['Python', 'TypeScript', 'SQL', 'Vue.js', 'FastAPI', 'Node.js', 'PostgreSQL', 'MongoDB', 'Docker', 'AWS', 'ESP32', 'MQTT', 'RAG', 'LLMs', 'OWASP Top 10'],
}))

useHead({
  title: () => siteTitle.value,
  htmlAttrs: { lang: () => locale.value },
  meta: [
    { name: 'description', content: () => siteDescription.value },
    { name: 'author', content: profile.name },
    { name: 'keywords', content: 'Vue.js, Python, FastAPI, TypeScript, Desarrollador Full Stack, Portfolio, PostgreSQL, Docker, AWS' },
    { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: () => currentLocaleUrl.value },
    { property: 'og:title', content: () => siteTitle.value },
    { property: 'og:description', content: () => siteDescription.value },
    { property: 'og:image', content: ogImage },
    { property: 'og:locale', content: () => locale.value === 'es' ? 'es_CL' : locale.value === 'en' ? 'en_US' : 'de_DE' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:url', content: () => currentLocaleUrl.value },
    { name: 'twitter:title', content: () => siteTitle.value },
    { name: 'twitter:description', content: () => siteDescription.value },
    { name: 'twitter:image', content: ogImage },
  ],
  link: [
    { rel: 'icon', type: 'image/png', href: '/icon.png' },
    { rel: 'canonical', href: () => currentLocaleUrl.value },
    { rel: 'preconnect', href: 'https://cdn.jsdelivr.net' },
    { rel: 'dns-prefetch', href: 'https://cdn.jsdelivr.net' },
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: () => JSON.stringify(jsonLd.value),
    },
  ],
})
</script>

<template>
  <main>
    <HeroSection />
    <AboutSection />
    <ExperienceSection />
    <SkillsSection />
    <ProjectsSection />
    <CertificationsSection />
    <ContactSection />
    <FooterSection />
  </main>
</template>
