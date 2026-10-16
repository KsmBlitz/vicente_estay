<script setup lang="ts">
defineProps<{
  index: string
  eyebrow: string
  title: string
  subtitle?: string
}>()
</script>

<template>
  <header class="mb-14 max-w-2xl md:mb-20">
    <p data-reveal class="eyebrow mb-5">
      <span class="text-accent">{{ index }}</span>
      <span class="mx-2 text-zinc-300 dark:text-zinc-700">/</span>{{ eyebrow }}
    </p>
    <h2 class="text-3xl font-semibold tracking-tight md:text-5xl">
      <SplitText :text="title" :delay="80" />
    </h2>
    <p
      v-if="subtitle"
      data-reveal
      style="--reveal-delay: 220ms"
      class="mt-5 text-lg leading-relaxed text-zinc-500 dark:text-zinc-400"
    >
      {{ subtitle }}
    </p>
  </header>
</template>
