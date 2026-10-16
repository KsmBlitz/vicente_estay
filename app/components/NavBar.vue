<script setup lang="ts">
const { t, locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const colorMode = useColorMode()
const { scrollTo } = useScrollTo()

const toggleTheme = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

const links = computed(() => [
  { id: 'about', label: t('nav.about') },
  { id: 'experience', label: t('nav.experience') },
  { id: 'skills', label: t('nav.skills') },
  { id: 'projects', label: t('nav.projects') },
  { id: 'certifications', label: t('nav.certifications') },
  { id: 'contact', label: t('nav.contact') },
])

const localeList = computed(() => locales.value as { code: string; name: string }[])

const active = ref('')
const scrolled = ref(false)
const menuOpen = ref(false)

const go = (id: string) => {
  menuOpen.value = false
  scrollTo(`#${id}`)
}

onMounted(() => {
  const onScroll = () => { scrolled.value = window.scrollY > 16 }
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })

  // Sección activa: la que cruza la franja central de la pantalla
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) active.value = entry.target.id === 'hero' ? '' : entry.target.id
      }
    },
    { rootMargin: '-40% 0px -55% 0px' },
  )
  ;['hero', ...links.value.map(l => l.id)].forEach((id) => {
    const el = document.getElementById(id)
    if (el) io.observe(el)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', onScroll)
    io.disconnect()
  })
})
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-500 ease-out-expo"
    :class="scrolled || menuOpen
      ? 'border-zinc-200/80 bg-white/80 backdrop-blur-xl dark:border-zinc-800/80 dark:bg-zinc-950/80'
      : 'border-transparent bg-transparent'"
  >
    <nav class="container-x flex h-16 items-center justify-between" aria-label="Principal">
      <a href="#hero" class="flex items-center" aria-label="Inicio" @click.prevent="go('hero')">
        <img src="/icon.png" alt="" class="h-8 w-8 rounded-lg" width="32" height="32" />
      </a>

      <!-- Desktop -->
      <div class="hidden items-center gap-1 md:flex">
        <a
          v-for="link in links"
          :key="link.id"
          :href="`#${link.id}`"
          class="group relative px-3 py-2 text-sm transition-colors duration-300"
          :class="active === link.id
            ? 'text-zinc-950 dark:text-white'
            : 'text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white'"
          @click.prevent="go(link.id)"
        >
          {{ link.label }}
          <span
            class="absolute inset-x-3 bottom-1 h-px origin-left bg-accent transition-transform duration-500 ease-out-expo"
            :class="active === link.id ? 'scale-x-100' : 'scale-x-0'"
          ></span>
        </a>

        <span class="mx-3 h-4 w-px bg-zinc-200 dark:bg-zinc-800" aria-hidden="true"></span>

        <div class="flex items-center font-mono text-xs">
          <NuxtLink
            v-for="loc in localeList"
            :key="loc.code"
            :to="switchLocalePath(loc.code as 'es' | 'en' | 'de')"
            :hreflang="loc.code"
            :aria-label="loc.name"
            :aria-current="loc.code === locale ? 'true' : undefined"
            class="px-2 py-1.5 uppercase tracking-wider transition-colors duration-300"
            :class="loc.code === locale
              ? 'text-zinc-950 dark:text-white'
              : 'text-zinc-400 hover:text-zinc-950 dark:text-zinc-600 dark:hover:text-white'"
          >
            {{ loc.code }}
          </NuxtLink>
        </div>

        <button
          class="ml-1 flex h-9 w-9 items-center justify-center rounded-full text-zinc-500 transition-colors duration-300 hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-white"
          :aria-label="t('common.toggle_theme')"
          @click="toggleTheme"
        >
          <!-- Ambos íconos en el DOM; el tema (clase .dark) decide cuál se ve -->
          <svg class="h-[18px] w-[18px] dark:hidden" fill="none" stroke="currentColor" stroke-width="1.6" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
          </svg>
          <svg class="hidden h-[18px] w-[18px] dark:block" fill="none" stroke="currentColor" stroke-width="1.6" viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="12" r="4" />
            <path stroke-linecap="round" d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
          </svg>
        </button>
      </div>

      <!-- Mobile toggle -->
      <button
        class="flex h-10 w-10 items-center justify-center rounded-full text-zinc-700 dark:text-zinc-300 md:hidden"
        :aria-label="t('common.menu')"
        :aria-expanded="menuOpen"
        aria-controls="mobile-menu"
        @click="menuOpen = !menuOpen"
      >
        <span class="relative block h-3 w-5" aria-hidden="true">
          <span
            class="absolute left-0 h-px w-5 bg-current transition-all duration-300 ease-out-expo"
            :class="menuOpen ? 'top-1.5 rotate-45' : 'top-0'"
          ></span>
          <span
            class="absolute left-0 h-px w-5 bg-current transition-all duration-300 ease-out-expo"
            :class="menuOpen ? 'top-1.5 -rotate-45' : 'top-3'"
          ></span>
        </span>
      </button>
    </nav>

    <!-- Mobile menu: la altura se anima con grid-rows -->
    <div
      id="mobile-menu"
      class="grid transition-[grid-template-rows] duration-500 ease-out-expo md:hidden"
      :class="menuOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'"
      :inert="!menuOpen"
    >
      <div class="overflow-hidden">
        <div class="container-x flex flex-col pb-6 pt-2">
          <a
            v-for="link in links"
            :key="link.id"
            :href="`#${link.id}`"
            class="border-b border-zinc-200/70 py-3 text-lg text-zinc-800 dark:border-zinc-800/70 dark:text-zinc-200"
            @click.prevent="go(link.id)"
          >
            {{ link.label }}
          </a>
          <div class="mt-5 flex items-center justify-between">
            <div class="flex items-center gap-1 font-mono text-sm">
              <NuxtLink
                v-for="loc in localeList"
                :key="loc.code"
                :to="switchLocalePath(loc.code as 'es' | 'en' | 'de')"
                :aria-label="loc.name"
                class="rounded-full px-3 py-1.5 uppercase"
                :class="loc.code === locale
                  ? 'bg-zinc-950 text-white dark:bg-white dark:text-zinc-950'
                  : 'text-zinc-500'"
                @click="menuOpen = false"
              >
                {{ loc.code }}
              </NuxtLink>
            </div>
            <button
              class="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 text-zinc-600 dark:border-zinc-800 dark:text-zinc-400"
              :aria-label="t('common.toggle_theme')"
              @click="toggleTheme"
            >
              <svg class="h-[18px] w-[18px] dark:hidden" fill="none" stroke="currentColor" stroke-width="1.6" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
              </svg>
              <svg class="hidden h-[18px] w-[18px] dark:block" fill="none" stroke="currentColor" stroke-width="1.6" viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="12" cy="12" r="4" />
                <path stroke-linecap="round" d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
