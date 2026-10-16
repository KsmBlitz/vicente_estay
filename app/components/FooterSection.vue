<script setup lang="ts">
const { t } = useI18n()
const { profile } = useContent()
const { scrollTo } = useScrollTo()
const year = new Date().getFullYear()
</script>

<template>
  <footer class="border-t border-zinc-200/80 py-10 dark:border-zinc-800/80">
    <div class="container-x flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
      <p class="text-sm text-zinc-500">
        © {{ year }} {{ profile.name }}
        <span class="mx-1.5 text-zinc-300 dark:text-zinc-700">·</span>
        {{ t('footer.tagline') }}
      </p>
      <div class="flex items-center gap-4">
        <SocialLinks />
        <button
          class="flex h-10 items-center gap-2 rounded-full px-3 text-sm text-zinc-500 transition-colors duration-300 hover:text-zinc-950 dark:hover:text-white"
          @click="scrollTo(0)"
        >
          {{ t('footer.back_to_top') }}
          <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 19V5m0 0-6 6m6-6 6 6" />
          </svg>
        </button>
      </div>
    </div>
  </footer>
</template>
