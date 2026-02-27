<script setup lang="ts">
import { Analytics } from '@vercel/analytics/nuxt'

interface Project {
  title: string;
  imageUrl?: string;
  description?: string;
  technologies?: string[];
  link?: string;
  github?: string;
}

interface Profile {
  name: string;
  title?: string;
  photoUrl?: string;
  aboutPhotoUrl?: string;
  shortBio?: string;
  longBio?: string;
  yearsExperience?: number;
  projectsCompleted?: number;
  location?: string;
  email?: string;
  github?: string;
  linkedin?: string;
}

interface Certification {
  name: string;
  institution: string;
  hours?: number;
  issueDate?: string;
  inProgress?: boolean;
  fileUrl?: string;
}

// Query proyectos
const projectsQuery = `*[_type == "project"]{
  title,
  "imageUrl": image.asset->url,
  description,
  technologies,
  link,
  github
}`

// Query perfil
const profileQuery = `*[_type == "profile"][0]{
  name,
  title,
  "photoUrl": photo.asset->url,
  "aboutPhotoUrl": aboutPhoto.asset->url,
  shortBio,
  longBio,
  yearsExperience,
  projectsCompleted,
  location,
  email,
  github,
  linkedin
}`

// Query certificaciones
const certificationsQuery = `*[_type == "certification"] | order(inProgress desc, issueDate desc) {
  name,
  institution,
  hours,
  issueDate,
  inProgress,
  "fileUrl": certificate.asset->url
}`

const { data: projects } = await useSanityQuery<Project[]>(projectsQuery, 'projects')
const { data: profile } = await useSanityQuery<Profile>(profileQuery, 'profile')
const { data: certifications } = await useSanityQuery<Certification[]>(certificationsQuery, 'certifications')

// Error handling for Sanity
const sanityError = ref(false)
const checkSanityConnection = () => {
  if (!projects.value && !profile.value) {
    setTimeout(() => {
      if (!projects.value && !profile.value) {
        sanityError.value = true
      }
    }, 5000)
  }
}

onMounted(() => {
  checkSanityConnection()
})

// SEO Meta Tags
useHead({
  title: () => `${profile.value?.name || 'Vicente Estay'} - ${profile.value?.title || 'Desarrollador Full Stack'}`,
  meta: [
    { name: 'description', content: () => profile.value?.shortBio || 'Portafolio de Vicente Estay, Desarrollador Full Stack especializado en Vue.js, Python y tecnologías modernas.' },
    { name: 'author', content: () => profile.value?.name || 'Vicente Estay' },
    { name: 'keywords', content: 'Vue.js, Nuxt, Python, FastAPI, TypeScript, Desarrollador Full Stack, Portfolio' },
    
    // Open Graph
    { property: 'og:type', content: 'website' },
    { property: 'og:title', content: () => `${profile.value?.name || 'Vicente Estay'} - Portfolio` },
    { property: 'og:description', content: () => profile.value?.shortBio || 'Portafolio de Vicente Estay, Desarrollador Full Stack' },
    { property: 'og:image', content: () => profile.value?.photoUrl || '' },
    
    // Twitter Card
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: () => `${profile.value?.name || 'Vicente Estay'} - Portfolio` },
    { name: 'twitter:description', content: () => profile.value?.shortBio || 'Portafolio de Vicente Estay' },
    { name: 'twitter:image', content: () => profile.value?.photoUrl || '' },
  ],
  link: [
    { rel: 'icon', type: 'image/png', href: '/icon.png' }
  ]
})

// Scroll to top button
const showScrollTop = ref(false)

// Scroll progress bar
const scrollProgress = ref(0)

onMounted(() => {
  const handleScroll = () => {
    showScrollTop.value = window.scrollY > 500
    const doc = document.documentElement
    scrollProgress.value = (window.scrollY / (doc.scrollHeight - doc.clientHeight)) * 100
  }
  window.addEventListener('scroll', handleScroll, { passive: true })
  onUnmounted(() => window.removeEventListener('scroll', handleScroll))
})

const scrollToTop = () => {
  const nuxtApp = useNuxtApp() as Record<string, unknown>
  const lenis = nuxtApp.$lenis as { scrollTo: (target: unknown) => void } | undefined
  if (lenis) {
    lenis.scrollTo(0)
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}
</script>

<template>
  <div class="min-h-screen bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 transition-colors duration-150">
    <!-- Scroll progress bar -->
    <div
      class="fixed top-0 left-0 z-[200] h-[2px] bg-slate-900 dark:bg-white origin-left"
      :style="{ transform: `scaleX(${scrollProgress / 100})` }"
    ></div>

    <Analytics />
    
    <!-- Sanity Error Banner -->
    <Transition name="slide-down">
      <div 
        v-if="sanityError"
        class="fixed top-0 left-0 right-0 z-50 bg-red-500 text-white px-6 py-3 flex items-center justify-center gap-3 shadow-lg"
      >
        <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <p class="text-sm font-medium">Error al conectar con Sanity. Mostrando contenido de respaldo.</p>
      </div>
    </Transition>

    <!-- Navigation -->
    <NavBar />

    <!-- Hero Section -->
    <HeroSection :profile="profile" :projects="projects" />

    <!-- About Section -->
    <AboutSection :profile="profile" :projects="projects" />

    <!-- Skills Section -->
    <SkillsSection />

    <!-- Projects Section -->
    <ProjectsSection :projects="projects ?? null" />

    <!-- Certifications Section -->
    <CertificationsSection :certifications="certifications ?? null" />

    <!-- Contact Section -->
    <ContactSection :profile="profile" />

    <!-- Footer -->
    <FooterSection :profile="profile" />

    <!-- Scroll to Top Button -->
    <Transition name="fade">
      <button
        v-show="showScrollTop"
        @click="scrollToTop"
        class="fixed bottom-8 right-8 z-50 p-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300"
        aria-label="Volver arriba"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </Transition>
  </div>
</template>

<style>
/* Lenis handles smooth scrolling */
html {
  scroll-behavior: auto;
}

/* Custom scrollbar - minimal */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

.dark ::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}

.dark ::-webkit-scrollbar-thumb {
  background: #475569;
}

::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

.dark ::-webkit-scrollbar-thumb:hover {
  background: #64748b;
}

/* Selection color */
::selection {
  background-color: #1e293b;
  color: white;
}

.dark ::selection {
  background-color: #e2e8f0;
  color: #0f172a;
}

/* Line clamp utility */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Fade transition for scroll to top button */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

/* Slide down transition for error banner */
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
}

.slide-down-enter-from {
  opacity: 0;
  transform: translateY(-100%);
}

.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-100%);
}
</style>