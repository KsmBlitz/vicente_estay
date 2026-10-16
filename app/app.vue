<script setup lang="ts">
const { t } = useI18n()
const { scrollTo } = useScrollTo()

// Habilita los estilos de animación solo si hay JS (sin JS todo se ve igual)
useHead({
  script: [{ innerHTML: "document.documentElement.dataset.js='1'", tagPosition: 'head' }],
})

const progressEl = ref<HTMLElement | null>(null)
const showScrollTop = ref(false)
let ticking = false

const update = () => {
  ticking = false
  const doc = document.documentElement
  const max = doc.scrollHeight - doc.clientHeight
  progressEl.value?.style.setProperty('transform', `scaleX(${max > 0 ? window.scrollY / max : 0})`)
  showScrollTop.value = window.scrollY > 600
}

const onScroll = () => {
  if (ticking) return
  ticking = true
  requestAnimationFrame(update)
}

onMounted(() => {
  update()
  window.addEventListener('scroll', onScroll, { passive: true })
})
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <div class="min-h-screen">
    <div
      ref="progressEl"
      class="fixed left-0 top-0 z-[60] h-[2px] w-full origin-left scale-x-0 bg-accent"
      aria-hidden="true"
    ></div>

    <NavBar />
    <NuxtPage />

    <Transition
      enter-active-class="transition duration-500 ease-out-expo"
      enter-from-class="translate-y-4 opacity-0"
      leave-active-class="transition duration-300 ease-out-expo"
      leave-to-class="translate-y-4 opacity-0"
    >
      <button
        v-show="showScrollTop"
        class="fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-zinc-200 bg-white/80 text-zinc-700 shadow-sm backdrop-blur transition-colors duration-300 hover:text-accent dark:border-zinc-800 dark:bg-zinc-900/80 dark:text-zinc-300"
        :aria-label="t('common.scroll_to_top')"
        @click="scrollTo(0)"
      >
        <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 19V5m0 0-6 6m6-6 6 6" />
        </svg>
      </button>
    </Transition>
  </div>
</template>
