<script setup lang="ts">
const colorMode = useColorMode()
const isDark = computed(() => colorMode.value === 'dark')

const toggleTheme = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)
const activeSection = ref('hero')

const { t } = useI18n()
const { scrollTo } = useScrollTo()

const switchLocalePath = useSwitchLocalePath()
const { locale, locales } = useI18n()

// Language switcher state
const isLangOpen = ref(false)
const langButtonRef = ref<HTMLElement | null>(null)

const availableLocales = computed(() =>
  (locales.value as { code: string; name: string }[]).filter(l => l.code !== locale.value)
)

const currentLocaleName = computed(() => {
  const all = locales.value as { code: string; name: string }[]
  return all.find(l => l.code === locale.value)?.name ?? locale.value.toUpperCase()
})

const toggleLang = () => { isLangOpen.value = !isLangOpen.value }

const closeLang = (e: MouseEvent) => {
  if (langButtonRef.value && !langButtonRef.value.contains(e.target as Node)) {
    isLangOpen.value = false
  }
}

onMounted(() => document.addEventListener('click', closeLang))
onUnmounted(() => document.removeEventListener('click', closeLang))

const navLinks = computed(() => [
  { name: t('nav.home'), href: '#hero', id: 'hero' },
  { name: t('nav.about'), href: '#about', id: 'about' },
  { name: t('nav.skills'), href: '#skills', id: 'skills' },
  { name: t('nav.projects'), href: '#projects', id: 'projects' },
  { name: t('nav.certifications'), href: '#certifications', id: 'certifications' },
  { name: t('nav.contact'), href: '#contact', id: 'contact' }
])

// Pill indicator
const navLinksContainer = ref<HTMLElement | null>(null)
const navLinkEls = ref<Record<string, HTMLElement>>({})
const pillStyle = ref({ left: '0px', width: '0px', opacity: '0' })

const updatePill = () => {
  const activeEl = navLinkEls.value[activeSection.value]
  const containerEl = navLinksContainer.value
  if (!activeEl || !containerEl) return

  const containerRect = containerEl.getBoundingClientRect()
  const linkRect = activeEl.getBoundingClientRect()

  pillStyle.value = {
    left: `${linkRect.left - containerRect.left - 10}px`,
    width: `${linkRect.width + 20}px`,
    opacity: '1',
  }
}

const setNavLinkRef = (el: unknown, id: string) => {
  if (el) navLinkEls.value[id] = el as HTMLElement
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  window.addEventListener('scroll', updateActiveSection, { passive: true })
  updateActiveSection()
  nextTick(updatePill)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('scroll', updateActiveSection)
})

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20
}

const updateActiveSection = () => {
  const sections = navLinks.value.map(link => document.querySelector(link.href) as HTMLElement | null)
  const scrollPosition = window.scrollY + 100

  for (let i = sections.length - 1; i >= 0; i--) {
    const section = sections[i]
    if (section && section.offsetTop <= scrollPosition) {
      activeSection.value = navLinks.value[i].id
      break
    }
  }
}

watch(activeSection, () => nextTick(updatePill))

const handleNavClick = (href: string) => {
  isMobileMenuOpen.value = false
  scrollTo(href)
}
</script>

<template>
  <nav
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    :class="isScrolled
      ? 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg shadow-lg'
      : 'bg-transparent'"
  >
    <div class="max-w-6xl mx-auto px-6 py-4">
      <div class="flex justify-between items-center">
        <!-- Logo -->
        <a
          href="#hero"
          @click.prevent="handleNavClick('#hero')"
          class="flex items-center hover:opacity-70 transition-opacity"
        >
          <img src="/icon.png" alt="VE" class="h-10 w-10" />
        </a>

        <!-- Desktop Navigation -->
        <div ref="navLinksContainer" class="hidden md:flex items-center gap-1 relative">
          <!-- Sliding pill background -->
          <span
            class="absolute top-0 bottom-0 rounded-lg bg-slate-100 dark:bg-slate-800 transition-all duration-300 ease-out pointer-events-none"
            :style="pillStyle"
          ></span>

          <a
            v-for="link in navLinks"
            :key="link.id"
            :ref="(el) => setNavLinkRef(el, link.id)"
            :href="link.href"
            @click.prevent="handleNavClick(link.href)"
            class="relative z-10 px-4 py-2 text-sm transition-colors duration-200"
            :class="activeSection === link.id
              ? 'text-slate-900 dark:text-white font-medium'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'"
          >
            {{ link.name }}
          </a>

          <!-- Theme Toggle -->
          <button
            @click="toggleTheme"
            class="relative w-16 h-8 rounded-full transition-all duration-500 overflow-hidden ml-4"
            :class="isDark ? 'bg-slate-800 shadow-inner' : 'bg-blue-400 shadow-inner'"
            :aria-label="isDark ? t('common.theme_light') : t('common.theme_dark')"
          >
            <div
              class="absolute inset-0 transition-opacity duration-500"
              :class="isDark ? 'opacity-100' : 'opacity-0'"
            >
              <div class="absolute w-1 h-1 bg-white rounded-full top-2 left-3"></div>
              <div class="absolute w-0.5 h-0.5 bg-white rounded-full top-4 left-5"></div>
              <div class="absolute w-1 h-1 bg-white rounded-full top-2 left-7"></div>
              <div class="absolute w-0.5 h-0.5 bg-white rounded-full top-5 left-4"></div>
            </div>
            <div
              class="absolute inset-0 transition-opacity duration-500"
              :class="isDark ? 'opacity-0' : 'opacity-100'"
            >
              <div class="absolute w-2 h-2 bg-white/60 rounded-full top-4 right-3"></div>
              <div class="absolute w-1.5 h-1.5 bg-white/40 rounded-full top-5 right-5"></div>
            </div>
            <div
              class="absolute top-1 w-6 h-6 rounded-full transition-all duration-500 flex items-center justify-center shadow-md"
              :class="isDark ? 'translate-x-9 bg-slate-200' : 'translate-x-1 bg-yellow-300'"
            >
              <div v-if="!isDark" class="absolute inset-0 rounded-full bg-yellow-200"></div>
              <div v-if="isDark" class="absolute w-5 h-5 bg-slate-800 rounded-full -translate-x-1.5"></div>
            </div>
          </button>

          <!-- Language Switcher -->
          <div ref="langButtonRef" class="relative ml-3">
            <button
              @click="toggleLang"
              class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-colors"
              :aria-label="t('common.lang_label')"
            >
              <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
              </svg>
              <span class="uppercase tracking-wide text-xs">{{ locale }}</span>
              <svg
                class="w-3 h-3 transition-transform duration-200"
                :class="isLangOpen ? 'rotate-180' : ''"
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <!-- Dropdown -->
            <Transition
              enter-active-class="transition-all duration-200 ease-out"
              enter-from-class="opacity-0 scale-95 -translate-y-1"
              enter-to-class="opacity-100 scale-100 translate-y-0"
              leave-active-class="transition-all duration-150 ease-in"
              leave-from-class="opacity-100 scale-100 translate-y-0"
              leave-to-class="opacity-0 scale-95 -translate-y-1"
            >
              <div
                v-if="isLangOpen"
                class="absolute right-0 top-full mt-2 w-36 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xl overflow-hidden z-10"
              >
                <!-- Current locale (disabled) -->
                <div class="flex items-center gap-2 px-3 py-2 text-sm bg-slate-50 dark:bg-slate-700/50">
                  <span class="w-2 h-2 bg-emerald-500 rounded-full"></span>
                  <span class="font-medium text-slate-900 dark:text-white">{{ currentLocaleName }}</span>
                </div>
                <div class="h-px bg-slate-100 dark:bg-slate-700"></div>
                <!-- Other locales -->
                <NuxtLink
                  v-for="loc in availableLocales"
                  :key="loc.code"
                  :to="switchLocalePath(loc.code)"
                  @click="isLangOpen = false"
                  class="flex items-center gap-2 px-3 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  <svg class="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                  </svg>
                  {{ loc.name }}
                </NuxtLink>
              </div>
            </Transition>
          </div>
        </div>

        <!-- Mobile Menu Button -->
        <button
          @click="isMobileMenuOpen = !isMobileMenuOpen"
          class="md:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path v-if="!isMobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>

      <!-- Mobile Menu -->
      <Transition
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="opacity-0 -translate-y-4"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition-all duration-200 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-4"
      >
        <div v-if="isMobileMenuOpen" class="md:hidden pt-4 pb-2">
          <div class="flex flex-col gap-2">
            <a
              v-for="link in navLinks"
              :key="link.id"
              :href="link.href"
              @click.prevent="handleNavClick(link.href)"
              class="px-4 py-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {{ link.name }}
            </a>

            <!-- Mobile theme toggle -->
            <button
              @click="toggleTheme"
              class="px-4 py-2 rounded-lg text-left text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-3"
            >
              <div
                class="relative w-12 h-6 rounded-full transition-all duration-500 overflow-hidden"
                :class="isDark ? 'bg-slate-700' : 'bg-blue-400'"
              >
                <div
                  class="absolute top-0.5 w-5 h-5 rounded-full transition-all duration-500 shadow"
                  :class="isDark ? 'translate-x-6 bg-slate-200' : 'translate-x-0.5 bg-yellow-300'"
                ></div>
              </div>
              <span>{{ isDark ? t('common.mode_light') : t('common.mode_dark') }}</span>
            </button>

            <!-- Mobile language switcher -->
            <div class="px-4 pt-1 pb-1">
              <p class="text-xs font-semibold tracking-widest uppercase text-slate-400 dark:text-slate-500 mb-2">
                {{ t('common.lang_label') }}
              </p>
              <div class="flex gap-2 flex-wrap">
                <NuxtLink
                  v-for="loc in (locales as { code: string; name: string }[])"
                  :key="loc.code"
                  :to="switchLocalePath(loc.code)"
                  @click="isMobileMenuOpen = false"
                  class="px-3 py-1.5 rounded-lg text-sm transition-colors border"
                  :class="loc.code === locale
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-transparent'
                    : 'text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'"
                >
                  {{ loc.name }}
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </nav>
</template>
