<script setup lang="ts">
defineProps<{
  label?: string
}>()
</script>

<template>
  <div class="text-center py-20">
    <div class="inline-flex flex-col items-center gap-4">
      <div class="relative w-16 h-16">
        <div class="absolute inset-0 border-4 border-slate-200 dark:border-slate-700 rounded-full"></div>
        <div class="absolute inset-0 border-4 border-slate-600 dark:border-slate-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
      <p class="text-slate-500 dark:text-slate-400 font-medium">{{ label ?? 'Cargando...' }}</p>
    </div>
  </div>
</template>
