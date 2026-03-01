<script setup lang="ts">
import type { Project, Profile, Certification } from '~/types'

const { t, locale } = useI18n()
const { public: { siteUrl } } = useRuntimeConfig()

// ── Sanity queries (all locale variants) ───────────────────────────────────
const projectsQuery = `*[_type == "project"]{
  title, title_en, title_de,
  "imageUrl": image.asset->url,
  description, description_en, description_de,
  technologies,
  link,
  github
}`

const profileQuery = `*[_type == "profile"][0]{
  name,
  title, title_en, title_de,
  "photoUrl": photo.asset->url,
  "aboutPhotoUrl": aboutPhoto.asset->url,
  shortBio, shortBio_en, shortBio_de,
  longBio, longBio_en, longBio_de,
  yearsExperience,
  projectsCompleted,
  location,
  email,
  github,
  linkedin
}`

const certificationsQuery = `*[_type == "certification"] | order(inProgress desc, issueDate desc) {
  name, name_en, name_de,
  institution,
  hours,
  issueDate,
  inProgress,
  "fileUrl": certificate.asset->url
}`

const { data: projects } = await useSanityQuery<Project[]>(projectsQuery, 'projects')
const { data: profile } = await useSanityQuery<Profile>(profileQuery, 'profile')
const { data: certifications } = await useSanityQuery<Certification[]>(certificationsQuery, 'certifications')

// Sanity connection check
const sanityError = ref(false)
onMounted(() => {
  setTimeout(() => {
    if (!projects.value && !profile.value) sanityError.value = true
  }, 5000)
})

// ── SEO ────────────────────────────────────────────────────────────────────
const { lf } = useLocaleField()

const siteTitle = computed(() =>
  `${profile.value?.name || 'Vicente Estay'} - ${lf(profile.value, 'title') || 'Desarrollador Full Stack'}`
)
const siteDescription = computed(() =>
  lf(profile.value, 'shortBio') || 'Portafolio de Vicente Estay, Desarrollador Full Stack especializado en Vue.js, Python y tecnologías modernas.'
)
const ogImage = computed(() => profile.value?.photoUrl || `${siteUrl}/icon.png`)
const currentLocaleUrl = computed(() =>
  locale.value === 'es' ? siteUrl : `${siteUrl}/${locale.value}`
)

useHead({
  title: () => siteTitle.value,
  meta: [
    { name: 'description', content: () => siteDescription.value },
    { name: 'author', content: () => profile.value?.name || 'Vicente Estay' },
    { name: 'keywords', content: 'Vue.js, Nuxt, Python, FastAPI, TypeScript, Desarrollador Full Stack, Portfolio' },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: () => currentLocaleUrl.value },
    { property: 'og:title', content: () => siteTitle.value },
    { property: 'og:description', content: () => siteDescription.value },
    { property: 'og:image', content: () => ogImage.value },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:url', content: () => currentLocaleUrl.value },
    { name: 'twitter:title', content: () => siteTitle.value },
    { name: 'twitter:description', content: () => siteDescription.value },
    { name: 'twitter:image', content: () => ogImage.value },
  ],
  link: [
    { rel: 'icon', type: 'image/png', href: '/icon.png' },
    { rel: 'canonical', href: () => currentLocaleUrl.value },
  ]
})
</script>

<template>
  <main>
    <!-- Sanity Error Banner -->
    <Transition name="slide-down">
      <div
        v-if="sanityError"
        class="fixed top-0 left-0 right-0 z-50 bg-red-500 text-white px-6 py-3 flex items-center justify-center gap-3 shadow-lg"
      >
        <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <p class="text-sm font-medium">{{ t('common.sanity_error') }}</p>
      </div>
    </Transition>

    <HeroSection :profile="profile" :projects="projects" />
    <AboutSection :profile="profile" :projects="projects" />
    <SkillsSection />
    <ProjectsSection :projects="projects ?? null" />
    <CertificationsSection :certifications="certifications ?? null" />
    <ContactSection :profile="profile" />
    <FooterSection :profile="profile" />
  </main>
</template>
