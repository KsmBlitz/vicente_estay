<script setup lang="ts">
import type { Certification } from '~/types'

const { t, locale } = useI18n()
const { lf } = useLocaleField()
const { certifications } = useContent()

const getFileName = (cert: Certification) =>
  `${lf(cert.name).replace(/\s+/g, '_')}_${cert.institution.replace(/\s+/g, '_')}.pdf`
</script>

<template>
  <section id="certifications" class="section">
    <div class="container-x">
      <SectionHeader
        index="05"
        :eyebrow="t('certifications.eyebrow')"
        :title="t('certifications.heading')"
        :subtitle="t('certifications.subtitle')"
      />

      <ul v-if="certifications.length > 0" class="border-b border-zinc-200 dark:border-zinc-800">
        <li
          v-for="(cert, index) in certifications"
          :key="lf(cert.name)"
          data-reveal
          :style="{ '--reveal-delay': `${(index % 4) * 60}ms` }"
          class="group grid items-center gap-3 border-t border-zinc-200 py-5 dark:border-zinc-800 sm:grid-cols-[1fr_auto] sm:gap-8"
        >
          <div>
            <h3 class="font-medium text-zinc-900 transition-colors duration-300 group-hover:text-accent dark:text-zinc-100">
              {{ lf(cert.name) }}
            </h3>
            <p class="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-zinc-500">
              <span>{{ cert.institution }}</span>
              <span v-if="cert.hours">{{ cert.hours }} h</span>
              <span v-if="cert.date && !cert.inProgress" class="capitalize">{{ formatMonth(cert.date, locale) }}</span>
            </p>
          </div>

          <span
            v-if="cert.inProgress"
            class="inline-flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400"
          >
            <span class="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500"></span>
            {{ t('certifications.in_progress_badge') }}
          </span>
          <a
            v-else-if="cert.file"
            :href="cert.file"
            :download="getFileName(cert)"
            class="link-arrow"
          >
            {{ t('certifications.download') }}
            <svg class="h-3.5 w-3.5 !transform-none" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v11m0 0-4-4m4 4 4-4M5 20h14" />
            </svg>
          </a>
          <span v-else class="text-xs text-zinc-400">{{ t('certifications.no_file') }}</span>
        </li>
      </ul>
      <p v-else class="text-zinc-500">{{ t('certifications.empty') }}</p>
    </div>
  </section>
</template>
