<script setup lang="ts">
const { profile } = useContent()

const links = [
  { name: 'GitHub', url: profile.github, external: true,
    path: 'M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.38 7.86 10.9.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.69 1.25 3.35.96.1-.74.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z' },
  { name: 'LinkedIn', url: profile.linkedin, external: true,
    path: 'M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z' },
  { name: 'Email', url: `mailto:${profile.email}`, external: false,
    path: 'M2 6.5A2.5 2.5 0 0 1 4.5 4h15A2.5 2.5 0 0 1 22 6.5v11a2.5 2.5 0 0 1-2.5 2.5h-15A2.5 2.5 0 0 1 2 17.5v-11Zm2.2-.3 7.8 5.6 7.8-5.6a.5.5 0 0 0-.3-.2h-15a.5.5 0 0 0-.3.2Zm15.8 2.3-7.42 5.31a1 1 0 0 1-1.16 0L4 8.5v9c0 .28.22.5.5.5h15a.5.5 0 0 0 .5-.5v-9Z' },
]
</script>

<template>
  <ul class="flex items-center gap-1">
    <li v-for="link in links" :key="link.name">
      <a
        :href="link.url"
        :target="link.external ? '_blank' : undefined"
        :rel="link.external ? 'noopener noreferrer' : undefined"
        :aria-label="link.name"
        :title="link.name"
        class="flex h-10 w-10 items-center justify-center rounded-full text-zinc-500 transition-[color,background-color,transform] duration-300 ease-out-expo hover:-translate-y-0.5 hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-white"
      >
        <svg class="h-[18px] w-[18px]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path :d="link.path" />
        </svg>
      </a>
    </li>
  </ul>
</template>
