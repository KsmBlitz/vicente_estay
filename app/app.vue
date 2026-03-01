<script setup lang="ts">
const { t } = useI18n()

// Scroll progress bar + scroll-to-top button
const showScrollTop = ref(false)
const scrollProgress = ref(0)

const handleScroll = () => {
  showScrollTop.value = window.scrollY > 500
  const doc = document.documentElement
  scrollProgress.value = (window.scrollY / (doc.scrollHeight - doc.clientHeight)) * 100
}

onMounted(() => window.addEventListener('scroll', handleScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))

const { scrollTo } = useScrollTo()
const scrollToTop = () => scrollTo(0)
</script>

<template>
  <div class="min-h-screen bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 transition-colors duration-150">
    <!-- Scroll progress bar -->
    <div
      class="fixed top-0 left-0 z-[200] h-[2px] bg-slate-900 dark:bg-white origin-left"
      :style="{ transform: `scaleX(${scrollProgress / 100})` }"
    ></div>

    <!-- Navigation -->
    <NavBar />

    <!-- Page content (renders pages/index.vue) -->
    <NuxtPage />

    <!-- Scroll to Top Button -->
    <Transition name="fade">
      <button
        v-show="showScrollTop"
        @click="scrollToTop"
        class="fixed bottom-8 right-8 z-50 p-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300"
        :aria-label="t('common.scroll_to_top')"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </Transition>
  </div>
</template>

<style>
html {
  scroll-behavior: auto;
}

::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

.dark ::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}

.dark ::-webkit-scrollbar-thumb {
  background: #475569;
}

::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

.dark ::-webkit-scrollbar-thumb:hover {
  background: #64748b;
}

::selection {
  background-color: #1e293b;
  color: white;
}

.dark ::selection {
  background-color: #e2e8f0;
  color: #0f172a;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
}

.slide-down-enter-from {
  opacity: 0;
  transform: translateY(-100%);
}

.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-100%);
}
</style>
