<script setup lang="ts">
import { TECH_COUNT } from '~/utils/skillsData'

const { t, locale } = useI18n()
const { lf } = useLocaleField()
const { scrollTo } = useScrollTo()
const { profile, projects } = useContent()

const cvFile = computed(() =>
  locale.value === 'es'
    ? { href: profile.cv.es, download: 'Vicente_Estay_CV_ES.pdf' }
    : { href: profile.cv.en, download: 'Vicente_Estay_CV_EN.pdf' },
)

// Los contadores parten con el valor real (SSR / buscadores) y se animan al montar
const years = ref(profile.yearsExperience)
const projectsCount = ref(projects.length)
const techCount = ref(TECH_COUNT)

const countUp = (target: Ref<number>, to: number, duration: number) => {
  const start = performance.now()
  target.value = 0
  const tick = (now: number) => {
    const p = Math.min((now - start) / duration, 1)
    target.value = Math.round(to * (1 - Math.pow(1 - p, 4)))
    if (p < 1) requestAnimationFrame(tick)
  }
  requestAnimationFrame(tick)
}

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  countUp(years, profile.yearsExperience, 1400)
  countUp(projectsCount, projects.length, 1600)
  countUp(techCount, TECH_COUNT, 1800)
})

const stats = computed(() => [
  { value: years.value, label: t('hero.stat_years') },
  { value: projectsCount.value, label: t('hero.stat_projects') },
  { value: techCount.value, label: t('hero.stat_tech') },
])
</script>

<template>
  <section id="hero" class="relative flex min-h-[100svh] items-center overflow-hidden pb-20 pt-28">
    <div class="hero-backdrop pointer-events-none absolute inset-0" aria-hidden="true"></div>

    <div class="container-x relative grid items-center gap-14 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20">
      <div>
        <p
          data-hero
          class="mb-8 inline-flex items-center gap-2.5 rounded-full border border-zinc-200 px-3.5 py-1.5 text-xs text-zinc-600 dark:border-zinc-800 dark:text-zinc-400"
        >
          <span class="relative flex h-1.5 w-1.5">
            <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60"></span>
            <span class="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
          </span>
          {{ t('hero.badge') }}
        </p>

        <h1 class="text-5xl font-semibold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
          <SplitText :text="profile.name" auto :delay="0" :step="90" />
        </h1>

        <p
          data-hero
          style="--reveal-delay: 270ms"
          class="mt-6 text-xl text-zinc-500 dark:text-zinc-400 md:text-2xl"
        >
          {{ lf(profile.title) }}
        </p>

        <p
          data-hero
          style="--reveal-delay: 330ms"
          class="mt-6 max-w-xl text-base leading-relaxed text-zinc-600 dark:text-zinc-400 md:text-lg"
        >
          {{ lf(profile.shortBio) }}
        </p>

        <div data-hero style="--reveal-delay: 390ms" class="mt-10 flex flex-wrap items-center gap-3">
          <button class="btn btn-primary group" @click="scrollTo('#projects')">
            {{ t('hero.cta_projects') }}
            <svg class="h-4 w-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-1" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14m0 0-6-6m6 6-6 6" />
            </svg>
          </button>
          <a :href="cvFile.href" :download="cvFile.download" class="btn btn-outline">
            <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v11m0 0-4-4m4 4 4-4M5 20h14" />
            </svg>
            {{ t('hero.cta_cv') }}
          </a>
          <button class="btn text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white" @click="scrollTo('#contact')">
            {{ t('hero.cta_contact') }}
          </button>
        </div>

        <dl
          data-hero
          style="--reveal-delay: 480ms"
          class="mt-14 grid max-w-md grid-cols-3 gap-6 border-t border-zinc-200 pt-8 dark:border-zinc-800"
        >
          <div v-for="stat in stats" :key="stat.label">
            <dd class="font-mono text-3xl font-medium tabular-nums text-zinc-950 dark:text-white">{{ stat.value }}</dd>
            <dt class="mt-1 text-xs text-zinc-500">{{ stat.label }}</dt>
          </div>
        </dl>
      </div>

      <div data-hero style="--reveal-delay: 180ms" class="w-full max-w-xs justify-self-center sm:max-w-sm lg:max-w-none lg:justify-self-end">
        <figure class="group relative mx-auto aspect-[3/4] w-full max-w-sm overflow-hidden rounded-3xl bg-zinc-100 ring-1 ring-zinc-200 dark:bg-zinc-900 dark:ring-zinc-800">
          <img
            v-if="profile.photo"
            :src="profile.photo"
            :alt="profile.name"
            width="683"
            height="913"
            fetchpriority="high"
            class="h-full w-full object-cover object-top transition-transform duration-[1200ms] ease-out-expo group-hover:scale-[1.03]"
          />
          <figcaption class="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1.5 text-xs text-zinc-700 backdrop-blur dark:bg-zinc-950/70 dark:text-zinc-300">
            <svg class="h-3.5 w-3.5 text-accent" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z" />
            </svg>
            {{ profile.location }}
          </figcaption>
        </figure>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Fondo estático: puntos tenues + un halo de acento, difuminados hacia los bordes */
.hero-backdrop {
  background-image:
    radial-gradient(ellipse 50% 45% at 75% 30%, rgb(var(--accent) / 0.1), transparent 70%),
    radial-gradient(circle at 1px 1px, rgb(113 113 122 / 0.22) 1px, transparent 0);
  background-size: 100% 100%, 28px 28px;
  mask-image: radial-gradient(ellipse 85% 75% at 50% 35%, #000 35%, transparent 80%);
}
</style>
