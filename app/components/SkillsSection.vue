<script setup lang="ts">
import { languages, frameworks, databases, devops, iot, tools } from '~/utils/skillsData'

const props = defineProps<{
  currentlyLearning?: string[] | null
}>()

const { isVisible, sectionRef } = useScrollReveal({ threshold: 0.05, rootMargin: '0px 0px -40px 0px' })
const { t } = useI18n()

const FALLBACK_LEARNING = ['AWS Cloud Practitioner', 'Terraform']

const learningItems = computed(() =>
  props.currentlyLearning && props.currentlyLearning.length > 0
    ? props.currentlyLearning
    : FALLBACK_LEARNING
)

interface LearningItem {
  name: string
  description: string
  color: string
  svg: string
}

// ── IA & Seguridad ─────────────────────────────────────────────────────────
const aiSvgs = [
  '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" /></svg>',
  '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" /></svg>',
  '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25zm.75-12h9v9h-9v-9z" /></svg>',
  '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25zm.75-12h9v9h-9v-9z" /></svg>',
  '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>',
]

const aiSecurity = computed<LearningItem[]>(() => [
  { name: t('skills.ai.rag.name'),   description: t('skills.ai.rag.desc'),   color: '#0ea5e9', svg: aiSvgs[0] },
  { name: t('skills.ai.llms.name'),  description: t('skills.ai.llms.desc'),  color: '#6366f1', svg: aiSvgs[1] },
  { name: t('skills.ai.ollama.name'),description: t('skills.ai.ollama.desc'),color: '#8b5cf6', svg: aiSvgs[2] },
  { name: t('skills.ai.qwen.name'),  description: t('skills.ai.qwen.desc'),  color: '#7c3aed', svg: aiSvgs[3] },
  { name: t('skills.ai.owasp.name'), description: t('skills.ai.owasp.desc'), color: '#ef4444', svg: aiSvgs[4] },
])

// Wave stagger: diagonal delay based on row + column position
const getWaveDelay = (index: number, cols: number, baseDelay: number = 0) => {
  const row = Math.floor(index / cols)
  const col = index % cols
  return baseDelay + (row + col) * 45
}
</script>

<template>
  <section id="skills" ref="sectionRef" class="py-24 md:py-32 bg-slate-50 dark:bg-slate-800/50 relative overflow-hidden">
    <!-- Animated background -->
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      <div class="absolute top-20 left-10 w-[500px] h-[500px] bg-blue-300/20 dark:bg-blue-500/10 rounded-full blur-3xl animate-orb-float"></div>
      <div class="absolute bottom-10 right-10 w-[600px] h-[600px] bg-slate-300/30 dark:bg-slate-600/10 rounded-full blur-3xl animate-orb-float animation-delay-2000"></div>
    </div>

    <!-- Section number -->
    <div class="absolute right-6 bottom-6 text-[160px] font-black text-slate-200 dark:text-slate-700/80 select-none leading-none pointer-events-none">
      03
    </div>

    <div class="max-w-5xl mx-auto px-6 relative z-10">
      <!-- Section Header -->
      <div class="text-center mb-12">
        <p
          class="text-xs font-semibold tracking-widest uppercase text-slate-400 dark:text-slate-500 mb-4 transition-[opacity,transform] duration-500"
          :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
        >
          {{ t('skills.eyebrow') }}
        </p>
        <h2 class="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
          <SplitText :text="t('skills.heading')" :visible="isVisible" :delay="100" />
        </h2>
        <p
          class="text-slate-600 dark:text-slate-400 max-w-xl mx-auto transition-[opacity,transform] duration-500"
          :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
          style="transition-delay: 300ms"
        >
          {{ t('skills.subtitle') }}
        </p>
      </div>

      <!-- Lenguajes -->
      <div class="mb-10">
        <h3
          class="text-xs font-semibold tracking-widest uppercase text-slate-400 dark:text-slate-500 mb-4 pl-3 border-l-2 border-slate-300 dark:border-slate-600 transition-[opacity,transform] duration-500"
          :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
          style="transition-delay: 350ms"
        >
          {{ t('skills.cat.languages') }}
        </h3>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <a
            v-for="(skill, index) in languages" :key="skill.name"
            :href="skill.url" target="_blank" rel="noopener noreferrer"
            class="group flex items-center gap-3 px-4 py-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:shadow-md hover:-translate-y-0.5 transition-[transform,box-shadow,border-color,opacity] duration-300"
            :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'"
            :style="{ transitionDelay: `${getWaveDelay(index, 4, 400)}ms` }"
          >
            <div class="w-9 h-9 rounded-lg flex items-center justify-center p-1.5 flex-shrink-0" :style="{ backgroundColor: skill.color + '18' }">
              <img v-if="skill.logo" :src="skill.logo" :alt="skill.name" class="w-full h-full object-contain" :class="skill.darkClass" loading="lazy" />
              <span v-else class="text-xs font-bold leading-none" :style="{ color: skill.color }">{{ skill.logoText }}</span>
            </div>
            <span class="text-sm font-medium text-slate-700 dark:text-slate-300 truncate">{{ skill.name }}</span>
          </a>
        </div>
      </div>

      <!-- Frameworks & Backend -->
      <div class="mb-10">
        <div class="w-full h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-700/70 to-transparent mb-10 transition-opacity duration-500" :class="isVisible ? 'opacity-100' : 'opacity-0'" style="transition-delay: 500ms"></div>
        <h3
          class="text-xs font-semibold tracking-widest uppercase text-slate-400 dark:text-slate-500 mb-4 pl-3 border-l-2 border-slate-300 dark:border-slate-600 transition-[opacity,transform] duration-500"
          :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
          style="transition-delay: 520ms"
        >
          {{ t('skills.cat.frameworks') }}
        </h3>
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <a
            v-for="(skill, index) in frameworks" :key="skill.name"
            :href="skill.url" target="_blank" rel="noopener noreferrer"
            class="group flex items-center gap-3 px-4 py-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:shadow-md hover:-translate-y-0.5 transition-[transform,box-shadow,border-color,opacity] duration-300"
            :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'"
            :style="{ transitionDelay: `${getWaveDelay(index, 3, 570)}ms` }"
          >
            <div class="w-9 h-9 rounded-lg flex items-center justify-center p-1.5 flex-shrink-0" :style="{ backgroundColor: skill.color + '18' }">
              <img v-if="skill.logo" :src="skill.logo" :alt="skill.name" class="w-full h-full object-contain" :class="skill.darkClass" loading="lazy" />
              <span v-else class="text-xs font-bold leading-none" :style="{ color: skill.color }">{{ skill.logoText }}</span>
            </div>
            <span class="text-sm font-medium text-slate-700 dark:text-slate-300 truncate">{{ skill.name }}</span>
          </a>
        </div>
      </div>

      <!-- Bases de Datos -->
      <div class="mb-10">
        <div class="w-full h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-700/70 to-transparent mb-10 transition-opacity duration-500" :class="isVisible ? 'opacity-100' : 'opacity-0'" style="transition-delay: 630ms"></div>
        <h3
          class="text-xs font-semibold tracking-widest uppercase text-slate-400 dark:text-slate-500 mb-4 pl-3 border-l-2 border-slate-300 dark:border-slate-600 transition-[opacity,transform] duration-500"
          :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
          style="transition-delay: 650ms"
        >
          {{ t('skills.cat.databases') }}
        </h3>
        <div class="grid grid-cols-2 gap-3">
          <a
            v-for="(skill, index) in databases" :key="skill.name"
            :href="skill.url" target="_blank" rel="noopener noreferrer"
            class="group flex items-center gap-3 px-4 py-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:shadow-md hover:-translate-y-0.5 transition-[transform,box-shadow,border-color,opacity] duration-300"
            :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'"
            :style="{ transitionDelay: `${getWaveDelay(index, 2, 700)}ms` }"
          >
            <div class="w-9 h-9 rounded-lg flex items-center justify-center p-1.5 flex-shrink-0" :style="{ backgroundColor: skill.color + '18' }">
              <img v-if="skill.logo" :src="skill.logo" :alt="skill.name" class="w-full h-full object-contain" :class="skill.darkClass" loading="lazy" />
              <span v-else class="text-xs font-bold leading-none" :style="{ color: skill.color }">{{ skill.logoText }}</span>
            </div>
            <span class="text-sm font-medium text-slate-700 dark:text-slate-300 truncate">{{ skill.name }}</span>
          </a>
        </div>
      </div>

      <!-- Cloud & DevOps -->
      <div class="mb-10">
        <div class="w-full h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-700/70 to-transparent mb-10 transition-opacity duration-500" :class="isVisible ? 'opacity-100' : 'opacity-0'" style="transition-delay: 780ms"></div>
        <h3
          class="text-xs font-semibold tracking-widest uppercase text-slate-400 dark:text-slate-500 mb-4 pl-3 border-l-2 border-slate-300 dark:border-slate-600 transition-[opacity,transform] duration-500"
          :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
          style="transition-delay: 800ms"
        >
          {{ t('skills.cat.devops') }}
        </h3>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          <a
            v-for="(skill, index) in devops" :key="skill.name"
            :href="skill.url" target="_blank" rel="noopener noreferrer"
            class="group flex items-center gap-3 px-4 py-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:shadow-md hover:-translate-y-0.5 transition-[transform,box-shadow,border-color,opacity] duration-300"
            :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'"
            :style="{ transitionDelay: `${getWaveDelay(index, 5, 850)}ms` }"
          >
            <div class="w-9 h-9 rounded-lg flex items-center justify-center p-1.5 flex-shrink-0" :style="{ backgroundColor: skill.color + '18' }">
              <img v-if="skill.logo" :src="skill.logo" :alt="skill.name" class="w-full h-full object-contain" :class="skill.darkClass" loading="lazy" />
              <span v-else class="text-xs font-bold leading-none" :style="{ color: skill.color }">{{ skill.logoText }}</span>
            </div>
            <span class="text-sm font-medium text-slate-700 dark:text-slate-300 truncate">{{ skill.name }}</span>
          </a>
        </div>
      </div>

      <!-- IoT & Hardware -->
      <div class="mb-10">
        <div class="w-full h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-700/70 to-transparent mb-10 transition-opacity duration-500" :class="isVisible ? 'opacity-100' : 'opacity-0'" style="transition-delay: 930ms"></div>
        <h3
          class="text-xs font-semibold tracking-widest uppercase text-slate-400 dark:text-slate-500 mb-4 pl-3 border-l-2 border-slate-300 dark:border-slate-600 transition-[opacity,transform] duration-500"
          :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
          style="transition-delay: 950ms"
        >
          {{ t('skills.cat.iot') }}
        </h3>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <a
            v-for="(skill, index) in iot" :key="skill.name"
            :href="skill.url" target="_blank" rel="noopener noreferrer"
            class="group flex items-center gap-3 px-4 py-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:shadow-md hover:-translate-y-0.5 transition-[transform,box-shadow,border-color,opacity] duration-300"
            :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'"
            :style="{ transitionDelay: `${getWaveDelay(index, 4, 1000)}ms` }"
          >
            <div class="w-9 h-9 rounded-lg flex items-center justify-center p-1.5 flex-shrink-0" :style="{ backgroundColor: skill.color + '18' }">
              <img v-if="skill.logo" :src="skill.logo" :alt="skill.name" class="w-full h-full object-contain" :class="skill.darkClass" loading="lazy" />
              <span v-else class="text-xs font-bold leading-none" :style="{ color: skill.color }">{{ skill.logoText }}</span>
            </div>
            <span class="text-sm font-medium text-slate-700 dark:text-slate-300 truncate">{{ skill.name }}</span>
          </a>
        </div>
      </div>

      <!-- Herramientas -->
      <div class="mb-10">
        <div class="w-full h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-700/70 to-transparent mb-10 transition-opacity duration-500" :class="isVisible ? 'opacity-100' : 'opacity-0'" style="transition-delay: 1080ms"></div>
        <h3
          class="text-xs font-semibold tracking-widest uppercase text-slate-400 dark:text-slate-500 mb-4 pl-3 border-l-2 border-slate-300 dark:border-slate-600 transition-[opacity,transform] duration-500"
          :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
          style="transition-delay: 1100ms"
        >
          {{ t('skills.cat.tools') }}
        </h3>
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <a
            v-for="(skill, index) in tools" :key="skill.name"
            :href="skill.url" target="_blank" rel="noopener noreferrer"
            class="group flex items-center gap-3 px-4 py-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:shadow-md hover:-translate-y-0.5 transition-[transform,box-shadow,border-color,opacity] duration-300"
            :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'"
            :style="{ transitionDelay: `${getWaveDelay(index, 6, 1150)}ms` }"
          >
            <div class="w-9 h-9 rounded-lg flex items-center justify-center p-1.5 flex-shrink-0" :style="{ backgroundColor: skill.color + '18' }">
              <img v-if="skill.logo" :src="skill.logo" :alt="skill.name" class="w-full h-full object-contain" :class="skill.darkClass" loading="lazy" />
              <span v-else class="text-xs font-bold leading-none" :style="{ color: skill.color }">{{ skill.logoText }}</span>
            </div>
            <span class="text-sm font-medium text-slate-700 dark:text-slate-300 truncate">{{ skill.name }}</span>
          </a>
        </div>
      </div>

      <!-- IA & Seguridad -->
      <div>
        <div class="w-full h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-700/70 to-transparent mb-10 transition-opacity duration-500" :class="isVisible ? 'opacity-100' : 'opacity-0'" style="transition-delay: 1230ms"></div>
        <h3
          class="text-xs font-semibold tracking-widest uppercase text-slate-400 dark:text-slate-500 mb-4 pl-3 border-l-2 border-slate-300 dark:border-slate-600 transition-[opacity,transform] duration-500"
          :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
          style="transition-delay: 1250ms"
        >
          {{ t('skills.cat.ai') }}
        </h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          <div
            v-for="(item, index) in aiSecurity" :key="item.name"
            class="group flex flex-col gap-3 px-4 py-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:shadow-md hover:-translate-y-0.5 transition-[transform,box-shadow,border-color,opacity] duration-300"
            :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'"
            :style="{ transitionDelay: `${getWaveDelay(index, 5, 1300)}ms` }"
          >
            <div class="flex items-center gap-2">
              <div class="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110 duration-300"
                :style="{ backgroundColor: item.color + '18', color: item.color }"
                v-html="item.svg"
              ></div>
              <span class="text-sm font-semibold text-slate-800 dark:text-slate-200">{{ item.name }}</span>
            </div>
            <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{{ item.description }}</p>
          </div>
        </div>

        <!-- En formación activa -->
        <div
          class="mt-8 p-5 rounded-2xl border border-emerald-200 dark:border-emerald-500/25 bg-emerald-50 dark:bg-emerald-500/10 transition-[opacity,transform] duration-500"
          :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
          style="transition-delay: 1550ms"
        >
          <div class="flex items-center gap-2 mb-3">
            <span class="w-2 h-2 bg-emerald-500 rounded-full animate-pulse flex-shrink-0"></span>
            <span class="text-xs font-semibold tracking-widest uppercase text-emerald-600 dark:text-emerald-400">
              {{ t('skills.active_learning') }}
            </span>
          </div>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="item in learningItems"
              :key="item"
              class="px-3 py-1.5 text-sm font-medium rounded-lg bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-emerald-200 dark:border-emerald-500/30 shadow-sm"
            >{{ item }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
@keyframes orb-float {
  0%, 100% { transform: translateY(0) translateX(0) scale(1); }
  33% { transform: translateY(-30px) translateX(20px) scale(1.05); }
  66% { transform: translateY(20px) translateX(-15px) scale(0.95); }
}

.animate-orb-float { animation: orb-float 20s ease-in-out infinite; }
.animation-delay-2000 { animation-delay: 2s; }
</style>
