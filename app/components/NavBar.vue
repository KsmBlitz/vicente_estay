<script setup lang="ts">
const colorMode = useColorMode()
const isDark = computed(() => colorMode.value === 'dark')

const toggleTheme = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)
const activeSection = ref('hero')

const { scrollTo } = useScrollTo()

const navLinks = [
  { name: 'Inicio', href: '#hero', id: 'hero' },
  { name: 'Sobre Mí', href: '#about', id: 'about' },
  { name: 'Habilidades', href: '#skills', id: 'skills' },
  { name: 'Proyectos', href: '#projects', id: 'projects' },
  { name: 'Certificaciones', href: '#certifications', id: 'certifications' },
  { name: 'Contacto', href: '#contact', id: 'contact' }
]

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
  const sections = navLinks.map(link => document.querySelector(link.href) as HTMLElement | null)
  const scrollPosition = window.scrollY + 100

  for (let i = sections.length - 1; i >= 0; i--) {
    const section = sections[i]
    if (section && section.offsetTop <= scrollPosition) {
      activeSection.value = navLinks[i].id
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
            :key="link.name"
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
            :class="isDark
              ? 'bg-slate-800 shadow-inner'
              : 'bg-blue-400 shadow-inner'"
            :aria-label="isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'"
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
              :class="isDark
                ? 'translate-x-9 bg-slate-200'
                : 'translate-x-1 bg-yellow-300'"
            >
              <div v-if="!isDark" class="absolute inset-0 rounded-full bg-yellow-200"></div>
              <div v-if="isDark" class="absolute w-5 h-5 bg-slate-800 rounded-full -translate-x-1.5"></div>
            </div>
          </button>
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
              :key="link.name"
              :href="link.href"
              @click.prevent="handleNavClick(link.href)"
              class="px-4 py-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {{ link.name }}
            </a>
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
                  :class="isDark
                    ? 'translate-x-6 bg-slate-200'
                    : 'translate-x-0.5 bg-yellow-300'"
                ></div>
              </div>
              <span>{{ isDark ? 'Modo Claro' : 'Modo Oscuro' }}</span>
            </button>
          </div>
        </div>
      </Transition>
    </div>
  </nav>
</template>
