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

// Fondo: el foco de luz sigue al cursor (con inercia) y las animaciones se pausan fuera de pantalla
const heroEl = ref<HTMLElement | null>(null)
const spotEl = ref<HTMLElement | null>(null)
const inView = ref(true)

onMounted(() => {
  const section = heroEl.value
  if (!section) return

  const io = new IntersectionObserver(([entry]) => { inView.value = !!entry?.isIntersecting })
  io.observe(section)
  onBeforeUnmount(() => io.disconnect())

  const canFollow = window.matchMedia('(hover: hover) and (prefers-reduced-motion: no-preference)').matches
  if (!canFollow) return

  let tx = 0, ty = 0, x = 0, y = 0, raf = 0
  const loop = () => {
    x += (tx - x) * 0.08
    y += (ty - y) * 0.08
    spotEl.value?.style.setProperty('--mx', `${x}px`)
    spotEl.value?.style.setProperty('--my', `${y}px`)
    raf = Math.abs(tx - x) + Math.abs(ty - y) > 0.5 ? requestAnimationFrame(loop) : 0
  }
  const onMove = (e: PointerEvent) => {
    const r = section.getBoundingClientRect()
    tx = e.clientX - r.left
    ty = e.clientY - r.top
    if (!raf) raf = requestAnimationFrame(loop)
  }
  section.addEventListener('pointermove', onMove, { passive: true })
  spotEl.value?.classList.add('is-on')
  onBeforeUnmount(() => {
    section.removeEventListener('pointermove', onMove)
    cancelAnimationFrame(raf)
  })
})

const stats = computed(() => [
  { value: years.value, label: t('hero.stat_years') },
  { value: projectsCount.value, label: t('hero.stat_projects') },
  { value: techCount.value, label: t('hero.stat_tech') },
])
</script>

<template>
  <section ref="heroEl" id="hero" class="relative flex min-h-[100svh] items-center overflow-hidden pb-20 pt-28">
    <div class="hero-bg pointer-events-none absolute inset-0" :class="{ 'is-paused': !inView }" aria-hidden="true">
      <div class="hero-orb hero-orb-a"></div>
      <div class="hero-orb hero-orb-b"></div>
      <div class="hero-orb hero-orb-c"></div>
      <div class="hero-grid"></div>
      <div ref="spotEl" class="hero-spot"></div>
    </div>

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
        <div class="photo-wrap group relative mx-auto w-full max-w-sm">
        <div class="photo-frame" aria-hidden="true"></div>
        <figure class="photo-fig relative aspect-[3/4] w-full overflow-hidden rounded-3xl bg-zinc-100 ring-1 ring-zinc-200 dark:bg-zinc-900 dark:ring-zinc-800">
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
    </div>
  </section>
</template>

<style scoped>
/* Marco de acento detrás de la foto: se separa un poco al pasar el cursor */
.photo-frame {
  position: absolute;
  inset: 0;
  border-radius: 1.5rem;
  border: 1px solid rgb(var(--accent) / 0.4);
  background: linear-gradient(135deg, rgb(var(--accent) / 0.1), transparent 60%);
  transform: translate3d(14px, 14px, 0);
  transition: transform 0.8s var(--ease);
}
.photo-wrap:hover .photo-frame {
  transform: translate3d(24px, 24px, 0);
}
.photo-fig {
  box-shadow: 0 40px 90px -40px rgb(var(--accent) / 0.55);
}

.hero-bg {
  overflow: hidden;
  /* Posiciones sin depender de la altura del hero: evita que un cambio de fuente cuente como layout shift */
  contain: layout paint;
}

/* Malla de color: tres resplandores muy suaves que derivan despacio (solo transform: no cuesta repintado) */
.hero-orb {
  position: absolute;
  border-radius: 9999px;
  will-change: transform;
  animation: drift 26s ease-in-out infinite alternate;
}
.hero-orb-a {
  top: -14rem;
  right: -10rem;
  width: 52rem;
  height: 52rem;
  background: radial-gradient(circle, rgb(var(--accent) / 0.2), transparent 64%);
}
.hero-orb-b {
  top: calc(100svh - 26rem);
  left: -14rem;
  width: 48rem;
  height: 48rem;
  background: radial-gradient(circle, rgb(14 165 233 / 0.13), transparent 64%);
  animation-duration: 32s;
  animation-direction: alternate-reverse;
}
.hero-orb-c {
  top: 14rem;
  left: 36%;
  width: 36rem;
  height: 36rem;
  background: radial-gradient(circle, rgb(168 85 247 / 0.1), transparent 66%);
  animation-duration: 38s;
}
:global(.dark) .hero-orb-a { background: radial-gradient(circle, rgb(var(--accent) / 0.26), transparent 64%); }
:global(.dark) .hero-orb-b { background: radial-gradient(circle, rgb(14 165 233 / 0.16), transparent 64%); }
:global(.dark) .hero-orb-c { background: radial-gradient(circle, rgb(168 85 247 / 0.14), transparent 66%); }

@keyframes drift {
  from { transform: translate3d(0, 0, 0) scale(1); }
  to { transform: translate3d(-5rem, 3.5rem, 0) scale(1.12); }
}

/* Rejilla fina que se desvanece hacia los bordes */
.hero-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(to right, rgb(var(--grid) / var(--grid-alpha)) 1px, transparent 1px),
    linear-gradient(to bottom, rgb(var(--grid) / var(--grid-alpha)) 1px, transparent 1px);
  background-size: 56px 56px;
  mask-image: radial-gradient(ellipse 80% 70% at 50% 38%, #000 25%, transparent 78%);
}

/* Foco de luz que sigue al cursor */
.hero-spot {
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 0.8s var(--ease);
  background: radial-gradient(520px circle at var(--mx, 70%) var(--my, 30%), rgb(var(--accent) / 0.12), transparent 65%);
}
.hero-spot.is-on {
  opacity: 1;
}

.is-paused .hero-orb {
  animation-play-state: paused;
}

@media (prefers-reduced-motion: reduce) {
  .hero-orb { animation: none; }
}
</style>
