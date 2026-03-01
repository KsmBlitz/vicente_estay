<script setup lang="ts">
import type { Profile, Project } from '~/types'

const { t } = useI18n()
const { lf } = useLocaleField()

defineProps<{
  profile?: Profile | null,
  projects?: Project[] | null
}>()

const { isVisible, sectionRef } = useScrollReveal({ threshold: 0.15 })
</script>

<template>
  <section id="about" ref="sectionRef" class="py-24 md:py-32 bg-white dark:bg-slate-900 relative overflow-hidden">
    <!-- Section number -->
    <div class="absolute right-6 bottom-6 text-[160px] font-black text-slate-100 dark:text-slate-800/70 select-none leading-none pointer-events-none">
      01
    </div>

    <div class="max-w-5xl mx-auto px-6 relative z-10">
      <!-- Section Header -->
      <div class="text-center mb-16">
        <p
          class="text-xs font-semibold tracking-widest uppercase text-slate-400 dark:text-slate-500 mb-4 transition-[opacity,transform] duration-500"
          :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
        >
          {{ t('about.eyebrow') }}
        </p>
        <h2 class="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
          <SplitText :text="t('about.heading')" :visible="isVisible" :delay="100" />
        </h2>
        <p
          class="text-slate-600 dark:text-slate-400 max-w-xl mx-auto transition-[opacity,transform] duration-500"
          :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
          style="transition-delay: 300ms"
        >
          {{ t('about.subtitle') }}
        </p>
      </div>

      <div class="grid md:grid-cols-2 gap-12 items-center">
        <!-- Image — clip-path reveal from left -->
        <div
          class="about-image transition-[clip-path] duration-700"
          :class="isVisible ? 'revealed' : ''"
        >
          <div class="aspect-square bg-slate-100 dark:bg-slate-800 rounded-2xl overflow-hidden">
            <img
              v-if="profile?.aboutPhotoUrl"
              :src="profile.aboutPhotoUrl"
              :alt="profile.name"
              class="w-full h-full object-cover"
            />
            <div v-else class="w-full h-full flex items-center justify-center text-slate-300 dark:text-slate-600">
              <svg class="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </div>
        </div>

        <!-- Content -->
        <div
          class="transition-[opacity,transform] duration-500"
          :class="isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'"
          style="transition-delay: 250ms"
        >
          <h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-4">
            {{ profile?.name || 'Vicente Estay' }}
          </h3>

          <div class="space-y-4 text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
            <p>
              {{ lf(profile, 'longBio') || 'Desarrollador con experiencia en el ecosistema JavaScript moderno. Me especializo en construir aplicaciones web escalables y de alto rendimiento.' }}
            </p>
          </div>

          <!-- Stats -->
          <div class="flex gap-8">
            <div
              class="text-center transition-[opacity,transform] duration-500"
              :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
              style="transition-delay: 400ms"
            >
              <div class="text-3xl font-bold text-slate-900 dark:text-white">{{ profile?.yearsExperience || 1 }}</div>
              <div class="text-sm text-slate-500 dark:text-slate-400 mt-1">{{ t('about.years_label') }}</div>
            </div>
            <div
              class="text-center transition-[opacity,transform] duration-500"
              :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
              style="transition-delay: 500ms"
            >
              <div class="text-3xl font-bold text-slate-900 dark:text-white">{{ projects?.length || 0 }}</div>
              <div class="text-sm text-slate-500 dark:text-slate-400 mt-1">{{ t('about.projects_label') }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Clip-path reveal from left for the image */
.about-image {
  clip-path: inset(0 100% 0 0);
  transition: clip-path 0.9s cubic-bezier(0.16, 1, 0.3, 1);
}

.about-image.revealed {
  clip-path: inset(0 0% 0 0);
}
</style>
