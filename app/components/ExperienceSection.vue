<script setup lang="ts">
import type { Experience } from '~/types'

defineProps<{
  experiences: Experience[] | null
}>()

const { isVisible, sectionRef } = useScrollReveal({ threshold: 0.08 })
const { t } = useI18n()
const { lf } = useLocaleField()

const formatDate = (dateStr: string) => {
  const [year, month] = dateStr.split('-')
  const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
  return month ? `${months[parseInt(month) - 1]} ${year}` : year
}

const getDuration = (startDate: string, endDate?: string, current?: boolean) => {
  const start = new Date(startDate)
  const end = current || !endDate ? new Date() : new Date(endDate)
  const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth())
  if (months < 1) return t('experience.less_than_month')
  if (months < 12) return `${months} ${months === 1 ? t('experience.month') : t('experience.months')}`
  const years = Math.floor(months / 12)
  const rem = months % 12
  const yearStr = `${years} ${years === 1 ? t('experience.year') : t('experience.years')}`
  const remStr = rem > 0 ? ` ${rem} ${rem === 1 ? t('experience.month') : t('experience.months')}` : ''
  return yearStr + remStr
}
</script>

<template>
  <section
    id="experience"
    ref="sectionRef"
    class="py-24 md:py-32 bg-slate-50 dark:bg-slate-800/20 relative overflow-hidden"
  >
    <!-- Background decoration -->
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute top-0 left-0 w-[400px] h-[400px] bg-slate-200/30 dark:bg-slate-700/10 rounded-full blur-3xl"></div>
      <div class="absolute bottom-0 right-0 w-[350px] h-[350px] bg-indigo-100/20 dark:bg-indigo-500/4 rounded-full blur-3xl"></div>
    </div>

    <!-- Section number -->
    <div class="absolute right-6 bottom-6 text-[160px] font-black text-slate-200 dark:text-slate-700/80 select-none leading-none pointer-events-none">
      02
    </div>

    <div class="max-w-5xl mx-auto px-6 relative z-10">
      <!-- Section Header -->
      <div class="text-center mb-16">
        <p
          class="text-xs font-semibold tracking-widest uppercase text-slate-400 dark:text-slate-500 mb-4 transition-[opacity,transform] duration-500"
          :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
        >
          {{ t('experience.eyebrow') }}
        </p>
        <h2 class="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
          <SplitText :text="t('experience.heading')" :visible="isVisible" :delay="100" />
        </h2>
        <p
          class="text-slate-600 dark:text-slate-400 max-w-xl mx-auto transition-[opacity,transform] duration-500"
          :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
          style="transition-delay: 300ms"
        >
          {{ t('experience.subtitle') }}
        </p>
      </div>

      <!-- Timeline -->
      <div
        v-if="experiences && experiences.length > 0"
        class="relative"
      >
        <!-- Vertical line -->
        <div
          class="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-slate-200 dark:bg-slate-700 timeline-line transition-[opacity] duration-700"
          :class="isVisible ? 'opacity-100' : 'opacity-0'"
        ></div>

        <div class="space-y-10">
          <div
            v-for="(exp, index) in experiences"
            :key="`${exp.company}-${exp.startDate}`"
            class="relative pl-16 md:pl-20 transition-[opacity,transform] duration-500"
            :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'"
            :style="{ transitionDelay: `${200 + index * 120}ms` }"
          >
            <!-- Timeline dot -->
            <div class="absolute left-4 md:left-5 top-5 flex items-center justify-center">
              <div
                class="w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors duration-300"
                :class="exp.current
                  ? 'border-emerald-500 bg-emerald-500'
                  : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900'"
              >
                <div
                  v-if="exp.current"
                  class="w-2 h-2 rounded-full bg-white animate-pulse"
                ></div>
                <div
                  v-else
                  class="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600"
                ></div>
              </div>
            </div>

            <!-- Card -->
            <div class="group bg-white dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 hover:border-slate-300 dark:hover:border-slate-600 hover:shadow-lg hover:shadow-slate-900/5 dark:hover:shadow-black/20 transition-[border-color,box-shadow] duration-300">
              <!-- Header row -->
              <div class="flex flex-wrap items-start justify-between gap-3 mb-4">
                <div class="flex-1 min-w-0">
                  <!-- Company + link -->
                  <div class="flex items-center gap-2 mb-1">
                    <component
                      :is="exp.companyUrl ? 'a' : 'span'"
                      v-bind="exp.companyUrl ? { href: exp.companyUrl, target: '_blank', rel: 'noopener noreferrer' } : {}"
                      class="text-lg font-bold text-slate-900 dark:text-white leading-tight"
                      :class="exp.companyUrl ? 'hover:text-slate-600 dark:hover:text-slate-300 transition-colors group/link' : ''"
                    >
                      {{ exp.company }}
                      <svg
                        v-if="exp.companyUrl"
                        class="inline-block w-3.5 h-3.5 ml-1 opacity-0 group-hover/link:opacity-100 transition-opacity"
                        fill="none" stroke="currentColor" viewBox="0 0 24 24"
                      >
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </component>
                  </div>
                  <!-- Position -->
                  <p class="text-base font-semibold text-slate-600 dark:text-slate-300">
                    {{ lf(exp, 'position') || exp.position }}
                  </p>
                </div>

                <!-- Badges: current + dates -->
                <div class="flex flex-col items-end gap-1.5 shrink-0">
                  <span
                    v-if="exp.current"
                    class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-xs font-semibold text-emerald-600 dark:text-emerald-400"
                  >
                    <span class="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                    {{ t('experience.current') }}
                  </span>
                  <span class="text-xs text-slate-400 dark:text-slate-500 font-medium">
                    {{ formatDate(exp.startDate) }} — {{ exp.current ? t('experience.present') : (exp.endDate ? formatDate(exp.endDate) : '') }}
                  </span>
                  <span class="text-xs text-slate-400 dark:text-slate-500">
                    {{ getDuration(exp.startDate, exp.endDate, exp.current) }}
                  </span>
                </div>
              </div>

              <!-- Location -->
              <div v-if="exp.location" class="flex items-center gap-1.5 mb-3">
                <svg class="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span class="text-xs text-slate-400 dark:text-slate-500">{{ exp.location }}</span>
              </div>

              <!-- Description -->
              <p
                v-if="lf(exp, 'description') || exp.description"
                class="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4"
              >
                {{ lf(exp, 'description') || exp.description }}
              </p>

              <!-- Technologies -->
              <div v-if="exp.technologies && exp.technologies.length > 0" class="flex flex-wrap gap-1.5">
                <span
                  v-for="tech in exp.technologies"
                  :key="tech"
                  class="px-2.5 py-1 text-xs font-medium rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
                >
                  {{ tech }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Loading -->
      <LoadingSpinner v-else-if="!experiences" :label="t('experience.loading')" />

      <!-- Empty -->
      <div v-else class="text-center py-20">
        <p class="text-slate-500 dark:text-slate-400">{{ t('experience.empty') }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.timeline-line {
  background: linear-gradient(to bottom, transparent, theme('colors.slate.200'), transparent);
}

.dark .timeline-line {
  background: linear-gradient(to bottom, transparent, theme('colors.slate.700'), transparent);
}
</style>
