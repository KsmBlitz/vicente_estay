<script setup lang="ts">
const { t } = useI18n()
const { lf } = useLocaleField()
const { profile } = useContent()

// Cada bloque separado por una línea en blanco en el YAML es un párrafo
const bioParagraphs = computed(() => lf(profile.longBio).split(/\n\s*\n/))

const softSkills = ['teamwork', 'problem_solving', 'it_maintenance', 'networking', 'responsibility', 'time_management', 'innovation']
</script>

<template>
  <section id="about" class="section">
    <div class="container-x">
      <SectionHeader
        index="01"
        :eyebrow="t('about.eyebrow')"
        :title="t('about.heading')"
        :subtitle="t('about.subtitle')"
      />

      <div class="grid items-start gap-12 md:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div data-reveal>
          <div class="aspect-square overflow-hidden rounded-3xl bg-zinc-100 ring-1 ring-zinc-200 dark:bg-zinc-900 dark:ring-zinc-800">
            <img
              v-if="profile.aboutPhoto"
              :src="profile.aboutPhoto"
              :alt="profile.name"
              width="720"
              height="720"
              loading="lazy"
              decoding="async"
              class="h-full w-full object-cover"
            />
          </div>
        </div>

        <div>
          <div class="space-y-5 text-base leading-relaxed md:text-lg">
            <p
              v-for="(paragraph, i) in bioParagraphs"
              :key="i"
              data-reveal
              :style="{ '--reveal-delay': `${i * 100}ms` }"
            >
              {{ paragraph }}
            </p>
          </div>

          <div data-reveal style="--reveal-delay: 300ms" class="mt-10">
            <p class="eyebrow mb-4">{{ t('about.soft_skills_label') }}</p>
            <ul class="flex flex-wrap gap-2">
              <li v-for="skill in softSkills" :key="skill" class="chip">
                {{ t(`skills.soft.${skill}`) }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
