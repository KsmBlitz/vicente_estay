<script setup lang="ts">
const { t } = useI18n()
const { lf } = useLocaleField()
const { projects } = useContent()

const activeFilter = ref<string | null>(null)

// Solo tecnologías repetidas en 2+ proyectos: un filtro corto es más útil que uno con 20 etiquetas
const uniqueTechs = computed(() => {
  const counts = new Map<string, number>()
  for (const tech of projects.flatMap(p => p.technologies ?? [])) counts.set(tech, (counts.get(tech) ?? 0) + 1)
  return [...counts].filter(([, n]) => n >= 2).map(([tech]) => tech).sort()
})

const filteredProjects = computed(() =>
  activeFilter.value
    ? projects.filter(p => p.technologies?.includes(activeFilter.value!))
    : projects,
)

const filterClass = (active: boolean) => [
  'rounded-full px-3 py-1 text-xs transition-colors duration-300',
  active
    ? 'bg-zinc-950 text-white dark:bg-white dark:text-zinc-950'
    : 'text-zinc-500 hover:text-zinc-950 dark:hover:text-white',
]
</script>

<template>
  <section id="projects" class="section">
    <div class="container-x">
      <SectionHeader index="04" :eyebrow="t('projects.eyebrow')" :title="t('projects.heading')" />

      <div v-if="uniqueTechs.length > 0" data-reveal class="-mx-3 mb-12 flex flex-wrap gap-1">
        <button :class="filterClass(activeFilter === null)" @click="activeFilter = null">
          {{ t('projects.filter_all') }}
        </button>
        <button
          v-for="tech in uniqueTechs"
          :key="tech"
          :class="filterClass(activeFilter === tech)"
          @click="activeFilter = activeFilter === tech ? null : tech"
        >
          {{ tech }}
        </button>
      </div>

      <TransitionGroup v-if="projects.length > 0" name="card" tag="div" class="grid gap-x-10 gap-y-16 md:grid-cols-2">
        <article v-for="(project, index) in filteredProjects" :key="lf(project.title)" class="group">
          <div data-reveal :style="{ '--reveal-delay': `${(index % 2) * 100}ms` }">
            <component
              :is="project.link ? 'a' : 'div'"
              :href="project.link"
              :target="project.link ? '_blank' : undefined"
              :rel="project.link ? 'noopener noreferrer' : undefined"
              class="block aspect-[16/10] overflow-hidden rounded-2xl bg-zinc-100 ring-1 ring-zinc-200 dark:bg-zinc-900 dark:ring-zinc-800"
              :aria-label="project.link ? lf(project.title) : undefined"
            >
              <img
                v-if="project.image"
                :src="project.image"
                :alt="lf(project.title)"
                loading="lazy"
                decoding="async"
                class="h-full w-full object-cover object-top transition-transform duration-[900ms] ease-out-expo group-hover:scale-[1.04]"
              />
            </component>

            <div class="mt-6">
              <h3 class="text-xl font-semibold tracking-tight">{{ lf(project.title) }}</h3>
              <p v-if="project.description" class="mt-3 line-clamp-4 text-[0.95rem] leading-relaxed">
                {{ lf(project.description) }}
              </p>
              <ul v-if="project.technologies?.length" class="mt-4 flex flex-wrap gap-1.5">
                <li v-for="tech in project.technologies" :key="tech" class="chip-mono">{{ tech }}</li>
              </ul>
              <div class="mt-5 flex items-center gap-6">
                <a v-if="project.link" :href="project.link" target="_blank" rel="noopener noreferrer" class="link-arrow">
                  {{ t('projects.demo') }}
                  <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M7 17 17 7m0 0H8m9 0v9" />
                  </svg>
                </a>
                <a v-if="project.github" :href="project.github" target="_blank" rel="noopener noreferrer" class="link-arrow !text-zinc-500">
                  {{ t('projects.code') }}
                  <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M7 17 17 7m0 0H8m9 0v9" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </article>
      </TransitionGroup>
      <p v-else class="text-zinc-500">{{ t('projects.empty') }}</p>
    </div>
  </section>
</template>

<style scoped>
/* Filtro: los que salen desaparecen al instante y el resto se reacomoda con FLIP */
.card-move {
  transition: transform 0.6s var(--ease);
}
.card-enter-active {
  transition: opacity 0.5s var(--ease), transform 0.5s var(--ease);
}
.card-enter-from {
  opacity: 0;
  transform: translateY(14px);
}
.card-leave-active {
  display: none;
}
</style>
