<script setup lang="ts">
const { t, locale } = useI18n()
const { lf } = useLocaleField()
const { experiences } = useContent()

const getDuration = (start: string, end?: string, current?: boolean) => {
  const months = monthsBetween(start, current ? undefined : end)
  if (months < 12) return `${months} ${months === 1 ? t('experience.month') : t('experience.months')}`
  const years = Math.floor(months / 12)
  const rest = months % 12
  const yearText = `${years} ${years === 1 ? t('experience.year') : t('experience.years')}`
  return rest ? `${yearText} ${rest} ${rest === 1 ? t('experience.month') : t('experience.months')}` : yearText
}
</script>

<template>
  <section id="experience" class="section">
    <div class="container-x">
      <SectionHeader
        index="02"
        :eyebrow="t('experience.eyebrow')"
        :title="t('experience.heading')"
        :subtitle="t('experience.subtitle')"
      />

      <ol v-if="experiences.length > 0">
        <li
          v-for="(exp, index) in experiences"
          :key="`${exp.company}-${exp.start}`"
          data-reveal
          :style="{ '--reveal-delay': `${index * 90}ms` }"
          class="grid gap-4 border-t border-zinc-200 py-9 dark:border-zinc-800 md:grid-cols-[220px_1fr] md:gap-12"
        >
          <div class="font-mono text-xs leading-relaxed text-zinc-500">
            <p class="capitalize text-zinc-700 dark:text-zinc-300">
              {{ formatMonth(exp.start, locale) }} —
              {{ exp.current ? t('experience.present') : (exp.end ? formatMonth(exp.end, locale) : '') }}
            </p>
            <p class="mt-1">{{ getDuration(exp.start, exp.end, exp.current) }}</p>
            <p v-if="exp.location" class="mt-1">{{ exp.location }}</p>
          </div>

          <div>
            <h3 class="flex flex-wrap items-center gap-x-3 gap-y-1 text-xl font-semibold tracking-tight">
              <a
                v-if="exp.companyUrl"
                :href="exp.companyUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="link-arrow !text-xl !font-semibold !text-zinc-950 hover:!text-accent dark:!text-zinc-50"
              >
                {{ exp.company }}
                <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M7 17 17 7m0 0H8m9 0v9" />
                </svg>
              </a>
              <template v-else>{{ exp.company }}</template>
              <span
                v-if="exp.current"
                class="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-600 dark:text-emerald-400"
              >
                {{ t('experience.current') }}
              </span>
            </h3>
            <p class="mt-1 font-medium text-zinc-700 dark:text-zinc-300">{{ lf(exp.position) }}</p>
            <p v-if="exp.description" class="mt-4 max-w-2xl leading-relaxed">{{ lf(exp.description) }}</p>
            <ul v-if="exp.technologies?.length" class="mt-5 flex flex-wrap gap-1.5">
              <li v-for="tech in exp.technologies" :key="tech" class="chip-mono">{{ tech }}</li>
            </ul>
          </div>
        </li>
      </ol>
      <p v-else class="text-zinc-500">{{ t('experience.empty') }}</p>
    </div>
  </section>
</template>
