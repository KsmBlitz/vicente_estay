<script setup lang="ts">
const props = withDefaults(defineProps<{
  text: string
  visible: boolean
  delay?: number
  wordDelay?: number
}>(), {
  delay: 0,
  wordDelay: 65,
})

const words = computed(() => props.text.split(' '))
</script>

<template>
  <span :aria-label="text" role="text">
    <template v-for="(word, i) in words" :key="i">
      <span class="split-word-outer" aria-hidden="true">
        <span
          class="split-word-inner"
          :class="{ 'revealed': visible }"
          :style="{ transitionDelay: `${(delay ?? 0) + i * (wordDelay ?? 65)}ms` }"
        >{{ word }}</span>
      </span>
      <span v-if="i < words.length - 1" aria-hidden="true">&nbsp;</span>
    </template>
  </span>
</template>

<style scoped>
.split-word-outer {
  display: inline-block;
  overflow: hidden;
  vertical-align: bottom;
  padding-bottom: 0.06em;
}

.split-word-inner {
  display: inline-block;
  transform: translateY(115%);
  transition: transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform;
}

.split-word-inner.revealed {
  transform: translateY(0);
}
</style>
