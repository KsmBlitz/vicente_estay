<script setup lang="ts">
import type { Project } from '~/types'

const props = defineProps<{
  projects: Project[] | null
}>()

const { isVisible, sectionRef } = useScrollReveal({ threshold: 0.08 })
const { t } = useI18n()
const { lf } = useLocaleField()

const techUrls: Record<string, string> = {
  'React': 'https://react.dev', 'Vue': 'https://vuejs.org', 'Vue.js': 'https://vuejs.org',
  'Nuxt': 'https://nuxt.com', 'Nuxt.js': 'https://nuxt.com', 'Next.js': 'https://nextjs.org',
  'Angular': 'https://angular.io', 'Svelte': 'https://svelte.dev',
  'Tailwind': 'https://tailwindcss.com', 'TailwindCSS': 'https://tailwindcss.com',
  'TypeScript': 'https://www.typescriptlang.org', 'JavaScript': 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
  'Node.js': 'https://nodejs.org', 'Express': 'https://expressjs.com', 'FastAPI': 'https://fastapi.tiangolo.com',
  'Django': 'https://www.djangoproject.com', 'MongoDB': 'https://www.mongodb.com',
  'PostgreSQL': 'https://www.postgresql.org', 'Firebase': 'https://firebase.google.com',
  'AWS': 'https://aws.amazon.com', 'Docker': 'https://www.docker.com', 'Git': 'https://git-scm.com',
  'Python': 'https://www.python.org', 'Sanity': 'https://www.sanity.io',
}

const getTechUrl = (tech: string) => techUrls[tech] || undefined

// Real 3D mouse tracking per card
const handleCardMove = (e: MouseEvent) => {
  const card = e.currentTarget as HTMLElement
  const rect = card.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  const rotateY = ((x / rect.width) - 0.5) * 14
  const rotateX = -((y / rect.height) - 0.5) * 9

  card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`
  card.style.transition = 'transform 0.06s linear'

  const shine = card.querySelector('.card-shine') as HTMLElement | null
  if (shine) {
    shine.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.13), transparent 65%)`
  }
}

const handleCardLeave = (e: MouseEvent) => {
  const card = e.currentTarget as HTMLElement
  card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0)'
  card.style.transition = 'transform 0.65s cubic-bezier(0.23, 1, 0.32, 1)'

  const shine = card.querySelector('.card-shine') as HTMLElement | null
  if (shine) {
    shine.style.background = 'transparent'
  }
}
</script>

<template>
  <section id="projects" ref="sectionRef" class="py-24 md:py-32 bg-white dark:bg-slate-900 relative overflow-hidden">
    <!-- Section number -->
    <div class="absolute right-6 bottom-6 text-[160px] font-black text-slate-100 dark:text-slate-800/70 select-none leading-none pointer-events-none">
      03
    </div>

    <div class="max-w-6xl mx-auto px-6 relative z-10">
      <!-- Section Header -->
      <div class="text-center mb-16">
        <p
          class="text-xs font-semibold tracking-widest uppercase text-slate-400 dark:text-slate-500 mb-4 transition-[opacity,transform] duration-500"
          :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
        >
          {{ t('projects.eyebrow') }}
        </p>
        <h2 class="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
          <SplitText :text="t('projects.heading')" :visible="isVisible" :delay="100" />
        </h2>
      </div>

      <!-- Projects Grid -->
      <div v-if="projects && projects.length > 0" class="grid md:grid-cols-2 gap-8">
        <article
          v-for="(project, index) in projects"
          :key="project.title"
          class="project-card group relative bg-slate-50 dark:bg-slate-800/50 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 will-change-transform"
          :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
          :style="{ transitionDelay: `${200 + index * 120}ms`, transitionDuration: '0.6s' }"
          @mousemove="handleCardMove"
          @mouseleave="handleCardLeave"
        >
          <!-- Shine overlay -->
          <div class="card-shine absolute inset-0 rounded-2xl pointer-events-none z-10"></div>

          <!-- Image -->
          <a
            v-if="project.link"
            :href="project.link"
            target="_blank"
            rel="noopener noreferrer"
            class="block aspect-video bg-slate-100 dark:bg-slate-800 overflow-hidden cursor-pointer"
          >
            <img
              v-if="project.imageUrl"
              :src="project.imageUrl"
              :alt="project.title"
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div v-else class="w-full h-full flex items-center justify-center text-slate-300 dark:text-slate-600">
              <svg class="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </a>
          <div v-else class="aspect-video bg-slate-100 dark:bg-slate-800 overflow-hidden">
            <img
              v-if="project.imageUrl"
              :src="project.imageUrl"
              :alt="project.title"
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div v-else class="w-full h-full flex items-center justify-center text-slate-300 dark:text-slate-600">
              <svg class="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>

          <!-- Content -->
          <div class="p-6">
            <h3 class="text-xl font-semibold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
              {{ lf(project, 'title') || project.title }}
            </h3>

            <p v-if="project.description" class="text-slate-600 dark:text-slate-400 mb-4 leading-relaxed text-sm">
              {{ lf(project, 'description') || project.description }}
            </p>

            <div v-if="project.technologies && project.technologies.length > 0" class="flex flex-wrap gap-2 mb-5">
              <a
                v-for="tech in project.technologies"
                :key="tech"
                :href="getTechUrl(tech)"
                :target="getTechUrl(tech) ? '_blank' : undefined"
                :rel="getTechUrl(tech) ? 'noopener noreferrer' : undefined"
                :class="getTechUrl(tech) ? 'hover:bg-slate-300 dark:hover:bg-slate-600 cursor-pointer' : 'cursor-default'"
                class="text-xs px-2.5 py-1 bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-full transition-colors"
              >
                {{ tech }}
              </a>
            </div>

            <div class="flex items-center gap-3">
              <a
                v-if="project.link"
                :href="project.link"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 text-sm font-medium text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {{ t('projects.demo') }}
                <svg class="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                </svg>
              </a>
              <a
                v-if="project.github"
                :href="project.github"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                {{ t('projects.code') }}
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            </div>
          </div>
        </article>
      </div>

      <!-- Loading State -->
      <LoadingSpinner v-else-if="!projects" :label="t('projects.loading')" />

      <!-- Empty State -->
      <div v-else class="text-center py-20">
        <p class="text-slate-500">{{ t('projects.empty') }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.project-card {
  transform-style: preserve-3d;
}

/* Subtle gradient overlay on hover, kept in CSS */
.project-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 50%);
  opacity: 0;
  transition: opacity 0.4s ease;
  pointer-events: none;
  border-radius: inherit;
  z-index: 1;
}

.project-card:hover::before { opacity: 1; }
.dark .project-card::before { background: linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 50%); }
</style>
