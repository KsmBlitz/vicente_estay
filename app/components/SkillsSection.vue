<script setup lang="ts">
import { languages, frameworks, databases, devops, iot, tools } from '~/utils/skillsData'

const { t } = useI18n()
const { profile } = useContent()

const categories = [
  { key: 'languages', items: languages },
  { key: 'frameworks', items: frameworks },
  { key: 'databases', items: databases },
  { key: 'devops', items: devops },
  { key: 'iot', items: iot },
  { key: 'tools', items: tools },
]

const aiTopics = ['rag', 'llms', 'ollama', 'qwen', 'owasp']

const FALLBACK_LEARNING = ['AWS Cloud Practitioner', 'Terraform']
const learningItems = computed(() =>
  profile.currentlyLearning?.length ? profile.currentlyLearning : FALLBACK_LEARNING,
)

const rowClass = 'grid gap-4 border-t border-zinc-200 py-7 dark:border-zinc-800 md:grid-cols-[220px_1fr] md:gap-12'
</script>

<template>
  <section id="skills" class="section">
    <div class="container-x">
      <SectionHeader
        index="03"
        :eyebrow="t('skills.eyebrow')"
        :title="t('skills.heading')"
        :subtitle="t('skills.subtitle')"
      />

      <div>
        <div
          v-for="(category, i) in categories"
          :key="category.key"
          data-reveal
          :style="{ '--reveal-delay': `${i * 50}ms` }"
          :class="rowClass"
        >
          <h3 class="eyebrow !text-zinc-500">{{ t(`skills.cat.${category.key}`) }}</h3>
          <ul class="flex flex-wrap gap-2">
            <li v-for="skill in category.items" :key="skill.name">
              <a :href="skill.url" target="_blank" rel="noopener noreferrer" class="chip">
                <img
                  v-if="skill.logo"
                  :src="skill.logo"
                  :alt="skill.name"
                  width="16"
                  height="16"
                  loading="lazy"
                  class="h-4 w-4 object-contain"
                  :class="skill.darkClass"
                />
                <span v-else class="font-mono text-[0.6rem] font-medium leading-none" :style="{ color: skill.color }">
                  {{ skill.logoText }}
                </span>
                {{ skill.name }}
              </a>
            </li>
          </ul>
        </div>

        <div data-reveal :class="rowClass">
          <h3 class="eyebrow !text-zinc-500">{{ t('skills.cat.ai') }}</h3>
          <dl class="grid gap-x-10 gap-y-6 sm:grid-cols-2">
            <div v-for="topic in aiTopics" :key="topic">
              <dt class="font-medium text-zinc-900 dark:text-zinc-100">{{ t(`skills.ai.${topic}.name`) }}</dt>
              <dd class="mt-1 text-sm leading-relaxed">{{ t(`skills.ai.${topic}.desc`) }}</dd>
            </div>
          </dl>
        </div>

        <div data-reveal :class="[rowClass, 'border-b']">
          <h3 class="eyebrow flex items-center gap-2 !text-zinc-500">
            <span class="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500"></span>
            {{ t('skills.active_learning') }}
          </h3>
          <ul class="flex flex-wrap gap-2">
            <li v-for="item in learningItems" :key="item" class="chip">{{ item }}</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
