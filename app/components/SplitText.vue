<script setup lang="ts">
// Revela el texto palabra por palabra al entrar en pantalla (plugins/reveal.client.ts).
const props = withDefaults(defineProps<{
  text: string
  delay?: number
  step?: number
}>(), {
  delay: 0,
  step: 70,
})

const words = computed(() => props.text.split(' '))
</script>

<template>
  <span data-reveal-split>
    <template v-for="(word, i) in words" :key="i">
      <span class="split-outer">
        <span class="split-inner" :style="{ transitionDelay: `${delay + i * step}ms` }">{{ word }}</span>
      </span>
      <span v-if="i < words.length - 1">&nbsp;</span>
    </template>
  </span>
</template>
