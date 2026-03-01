<script setup lang="ts">
import type { Certification } from '~/types'

const props = defineProps<{
  certifications: Certification[] | null
}>()

const { isVisible, sectionRef } = useScrollReveal({ threshold: 0.08 })
const { t } = useI18n()
const { lf } = useLocaleField()

const formatDate = (dateStr: string) => {
  const [year, month] = dateStr.split('-')
  const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
  return month ? `${months[parseInt(month) - 1]} ${year}` : year
}

const getFileName = (cert: Certification) =>
  `${cert.name.replace(/\s+/g, '_')}_${cert.institution.replace(/\s+/g, '_')}.pdf`
</script>

<template>
  <section id="certifications" ref="sectionRef" class="py-24 md:py-32 bg-slate-50 dark:bg-slate-900 relative overflow-hidden">
    <!-- Background decoration — minimal, sin patrones repetidos -->
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-100/25 dark:bg-indigo-500/4 rounded-full blur-3xl"></div>
      <div class="absolute bottom-0 left-0 w-[350px] h-[350px] bg-slate-200/40 dark:bg-slate-700/10 rounded-full blur-3xl"></div>
    </div>

    <!-- Section number -->
    <div class="absolute right-6 bottom-6 text-[160px] font-black text-slate-200 dark:text-slate-700/80 select-none leading-none pointer-events-none">
      04
    </div>

    <div class="max-w-6xl mx-auto px-6 relative z-10">
      <!-- Section Header -->
      <div class="text-center mb-16">
        <p
          class="text-xs font-semibold tracking-widest uppercase text-slate-400 dark:text-slate-500 mb-4 transition-[opacity,transform] duration-500"
          :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
        >
          {{ t('certifications.eyebrow') }}
        </p>
        <h2 class="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
          <SplitText :text="t('certifications.heading')" :visible="isVisible" :delay="100" />
        </h2>
        <p
          class="text-slate-600 dark:text-slate-400 max-w-xl mx-auto transition-[opacity,transform] duration-500"
          :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
          style="transition-delay: 300ms"
        >
          {{ t('certifications.subtitle') }}
        </p>
      </div>

      <!-- Certifications list -->
      <div
        v-if="certifications && certifications.length > 0"
        class="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        <div
          v-for="(cert, index) in certifications"
          :key="cert.name"
          class="cert-card group relative flex flex-col p-5 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-slate-300 dark:hover:border-slate-600"
          :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'"
          :style="{ transitionDelay: `${200 + index * 80}ms` }"
        >
          <!-- Top row: icon + name — flex-1 para empujar el resto al fondo -->
          <div class="flex items-start gap-3 flex-1">
            <!-- Certificate icon -->
            <div class="flex-shrink-0 w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center">
              <svg class="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
              </svg>
            </div>

            <div class="flex-1 min-w-0">
              <h3 class="font-semibold text-slate-900 dark:text-white text-sm leading-snug line-clamp-2">
                {{ lf(cert, 'name') || cert.name }}
              </h3>
              <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                {{ cert.institution }}
              </p>
            </div>
          </div>

          <!-- Badges + botón: siempre anclados al fondo -->
          <div class="mt-4 flex flex-col gap-3">
            <!-- Badges row -->
            <div class="flex items-center gap-2 flex-wrap">
              <span
                v-if="cert.inProgress"
                class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-xs font-semibold text-emerald-600 dark:text-emerald-400"
              >
                <span class="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                {{ t('certifications.in_progress_badge') }}
              </span>
              <span
                v-if="cert.hours"
                class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-xs font-medium text-slate-600 dark:text-slate-300"
              >
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {{ cert.hours }}h
              </span>
              <span
                v-if="cert.issueDate && !cert.inProgress"
                class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-xs font-medium text-slate-600 dark:text-slate-300"
              >
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {{ formatDate(cert.issueDate) }}
              </span>
            </div>

          <!-- Download button -->
          <div>
            <a
              v-if="cert.fileUrl && !cert.inProgress"
              :href="cert.fileUrl"
              :download="getFileName(cert)"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 w-full justify-center px-4 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-semibold hover:bg-slate-700 dark:hover:bg-slate-100 transition-colors duration-200"
            >
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              {{ t('certifications.download') }}
            </a>
            <div
              v-else-if="cert.inProgress"
              class="inline-flex items-center gap-2 w-full justify-center px-4 py-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold cursor-default"
            >
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              {{ t('certifications.in_progress_btn') }}
            </div>
            <div
              v-else
              class="inline-flex items-center gap-2 w-full justify-center px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-400 dark:text-slate-500 text-xs font-semibold cursor-default"
            >
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
              </svg>
              {{ t('certifications.no_file') }}
            </div>
          </div>
          </div><!-- /badges + botón -->
        </div>
      </div>

      <!-- Loading State -->
      <LoadingSpinner v-else-if="!certifications" :label="t('certifications.loading')" />

      <!-- Empty State -->
      <div v-else class="text-center py-20">
        <p class="text-slate-500 dark:text-slate-400">{{ t('certifications.empty') }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cert-card {
  transition-property: transform, box-shadow, border-color, opacity;
}
</style>
