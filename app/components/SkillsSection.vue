<script setup lang="ts">
const { isVisible, sectionRef } = useScrollReveal({ threshold: 0.05, rootMargin: '0px 0px -40px 0px' })
const { t } = useI18n()

interface Skill {
  name: string
  color: string
  logo?: string
  logoText?: string
  url: string
  darkClass?: string
}

interface LearningItem {
  name: string
  description: string
  color: string
  svg: string
}

// ── Lenguajes ──────────────────────────────────────────────────────────────
const languages: Skill[] = [
  { name: 'Python',     color: '#3776ab', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',         url: 'https://www.python.org' },
  { name: 'TypeScript', color: '#3178c6', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', url: 'https://www.typescriptlang.org' },
  { name: 'SQL',        color: '#4169e1', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azuresqldatabase/azuresqldatabase-original.svg', url: 'https://www.postgresql.org/docs/current/sql.html' },
  { name: 'Bash',       color: '#4eaa25', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg',             url: 'https://www.gnu.org/software/bash/', darkClass: 'dark:invert' },
]

// ── Frameworks & Librerías ─────────────────────────────────────────────────
const frameworks: Skill[] = [
  { name: 'Vue.js',   color: '#42b883', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg',     url: 'https://vuejs.org' },
  { name: 'FastAPI',  color: '#009688', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg', url: 'https://fastapi.tiangolo.com' },
  { name: 'Node.js',  color: '#339933', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',   url: 'https://nodejs.org' },
]

// ── Bases de Datos ─────────────────────────────────────────────────────────
const databases: Skill[] = [
  { name: 'PostgreSQL', color: '#4169e1', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg', url: 'https://www.postgresql.org' },
  { name: 'MongoDB',    color: '#47a248', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',       url: 'https://www.mongodb.com' },
]

// ── Cloud & DevOps ─────────────────────────────────────────────────────────
const devops: Skill[] = [
  { name: 'AWS',    color: '#ff9900', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg', url: 'https://aws.amazon.com' },
  { name: 'Docker', color: '#2496ed', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',                                      url: 'https://www.docker.com' },
  { name: 'Nginx',  color: '#009900', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg',                                        url: 'https://nginx.org' },
  { name: 'Linux',  color: '#fcc624', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg',                                        url: 'https://kernel.org' },
  { name: 'CI/CD',  color: '#2088ff', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/githubactions/githubactions-original.svg',                 url: 'https://docs.github.com/en/actions' },
]

// ── IoT & Hardware ─────────────────────────────────────────────────────────
const iot: Skill[] = [
  { name: 'ESP32',        color: '#e7352c', logo: 'https://cdn.simpleicons.org/espressif/e7352c',                                                                url: 'https://www.espressif.com' },
  { name: 'Arduino',      color: '#00979d', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/arduino/arduino-original.svg',                             url: 'https://www.arduino.cc' },
  { name: 'Raspberry Pi', color: '#a22846', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/raspberrypi/raspberrypi-original.svg',                     url: 'https://www.raspberrypi.com' },
  { name: 'MQTT',         color: '#660066', logoText: 'MQTT',                                                                                                    url: 'https://mqtt.org' },
]

// ── Herramientas ───────────────────────────────────────────────────────────
const tools: Skill[] = [
  { name: 'Git',       color: '#f05032', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',                url: 'https://git-scm.com' },
  { name: 'GitHub',    color: '#181717', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',          url: 'https://github.com', darkClass: 'dark:invert' },
  { name: 'Postman',   color: '#ff6c37', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg',  url: 'https://www.postman.com' },
  { name: 'Jira',      color: '#0052cc', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg',              url: 'https://www.atlassian.com/software/jira' },
  { name: 'Bitbucket', color: '#0052cc', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bitbucket/bitbucket-original.svg',    url: 'https://bitbucket.org' },
  { name: 'Taiga',     color: '#70ba43', logoText: 'TG',                                                                                 url: 'https://taiga.io' },
]

// ── Habilidades blandas ────────────────────────────────────────────────────
const softSkillsSvgs = [
  '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" /></svg>',
  '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 01-.657.643 48.39 48.39 0 01-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 01-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 00-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 01-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 00.657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 01-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 005.427-.63 48.05 48.05 0 00.582-4.717.532.532 0 00-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.96.401v0a.656.656 0 00.658-.663 48.422 48.422 0 00-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 01-.61-.58v0z" /></svg>',
  '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" /></svg>',
  '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25zm.75-12h9v9h-9v-9z" /></svg>',
  '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" /></svg>',
  '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>',
  '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" /></svg>',
]
const softSkillColors = ['#3b82f6', '#8b5cf6', '#f59e0b', '#06b6d4', '#10b981', '#ec4899', '#f97316']

const softSkills = computed(() => [
  { name: t('skills.soft.teamwork'),        color: softSkillColors[0], svg: softSkillsSvgs[0] },
  { name: t('skills.soft.problem_solving'), color: softSkillColors[1], svg: softSkillsSvgs[1] },
  { name: t('skills.soft.it_maintenance'),  color: softSkillColors[2], svg: softSkillsSvgs[2] },
  { name: t('skills.soft.networking'),      color: softSkillColors[3], svg: softSkillsSvgs[3] },
  { name: t('skills.soft.responsibility'),  color: softSkillColors[4], svg: softSkillsSvgs[4] },
  { name: t('skills.soft.time_management'), color: softSkillColors[5], svg: softSkillsSvgs[5] },
  { name: t('skills.soft.innovation'),      color: softSkillColors[6], svg: softSkillsSvgs[6] },
])

// ── Metodologías ───────────────────────────────────────────────────────────
const methodologies = [
  { name: 'Scrum',  color: '#6366f1', svg: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" /></svg>' },
  { name: 'Kanban', color: '#0ea5e9', svg: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M9 4.5v15m6-15v15m-10.875 0h15.75c.621 0 1.125-.504 1.125-1.125V5.625c0-.621-.504-1.125-1.125-1.125H4.125C3.504 4.5 3 5.004 3 5.625v12.75c0 .621.504 1.125 1.125 1.125z" /></svg>' },
  { name: 'Agile',  color: '#10b981', svg: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>' },
  { name: 'Lean',   color: '#f59e0b', svg: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" /></svg>' },
]

// ── IA & Seguridad ─────────────────────────────────────────────────────────
const aiSvgs = [
  '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" /></svg>',
  '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" /></svg>',
  '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25zm.75-12h9v9h-9v-9z" /></svg>',
  '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25zm.75-12h9v9h-9v-9z" /></svg>',
  '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>',
]

const aiSecurity = computed<LearningItem[]>(() => [
  { name: t('skills.ai.rag.name'),     description: t('skills.ai.rag.desc'),     color: '#0ea5e9', svg: aiSvgs[0] },
  { name: t('skills.ai.llms.name'),    description: t('skills.ai.llms.desc'),    color: '#6366f1', svg: aiSvgs[1] },
  { name: t('skills.ai.ollama.name'),  description: t('skills.ai.ollama.desc'),  color: '#8b5cf6', svg: aiSvgs[2] },
  { name: t('skills.ai.qwen.name'),    description: t('skills.ai.qwen.desc'),    color: '#7c3aed', svg: aiSvgs[3] },
  { name: t('skills.ai.owasp.name'),   description: t('skills.ai.owasp.desc'),   color: '#ef4444', svg: aiSvgs[4] },
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
      02
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
            :style="{ transitionDelay: `${getWaveDelay(index, 5, 400)}ms` }"
          >
            <div class="w-9 h-9 rounded-lg flex items-center justify-center p-1.5 flex-shrink-0" :style="{ backgroundColor: skill.color + '18' }">
              <img v-if="skill.logo" :src="skill.logo" :alt="skill.name" class="w-full h-full object-contain" :class="skill.darkClass" loading="lazy" />
              <span v-else class="text-xs font-bold leading-none" :style="{ color: skill.color }">{{ skill.logoText }}</span>
            </div>
            <span class="text-sm font-medium text-slate-700 dark:text-slate-300 truncate">{{ skill.name }}</span>
          </a>
        </div>
      </div>

      <!-- Frameworks & Librerías -->
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

      <!-- Habilidades Blandas -->
      <div class="mb-10">
        <div class="w-full h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-700/70 to-transparent mb-10 transition-opacity duration-500" :class="isVisible ? 'opacity-100' : 'opacity-0'" style="transition-delay: 1080ms"></div>
        <h3
          class="text-xs font-semibold tracking-widest uppercase text-slate-400 dark:text-slate-500 mb-4 pl-3 border-l-2 border-slate-300 dark:border-slate-600 transition-[opacity,transform] duration-500"
          :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
          style="transition-delay: 1100ms"
        >
          {{ t('skills.cat.skills') }}
        </h3>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div
            v-for="(skill, index) in softSkills" :key="skill.name"
            class="group flex flex-col items-center gap-2 px-4 py-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:shadow-md hover:-translate-y-0.5 transition-[transform,box-shadow,border-color,opacity] duration-300 cursor-default text-center"
            :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'"
            :style="{ transitionDelay: `${getWaveDelay(index, 4, 1150)}ms` }"
          >
            <div class="w-8 h-8 transition-transform group-hover:scale-110 duration-300" :style="{ color: skill.color }" v-html="skill.svg"></div>
            <span class="text-xs font-medium text-slate-600 dark:text-slate-400 leading-tight">{{ skill.name }}</span>
          </div>
        </div>
      </div>

      <!-- Metodologías -->
      <div class="mb-10">
        <div class="w-full h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-700/70 to-transparent mb-10 transition-opacity duration-500" :class="isVisible ? 'opacity-100' : 'opacity-0'" style="transition-delay: 1230ms"></div>
        <h3
          class="text-xs font-semibold tracking-widest uppercase text-slate-400 dark:text-slate-500 mb-4 pl-3 border-l-2 border-slate-300 dark:border-slate-600 transition-[opacity,transform] duration-500"
          :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
          style="transition-delay: 1250ms"
        >
          {{ t('skills.cat.methods') }}
        </h3>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div
            v-for="(method, index) in methodologies" :key="method.name"
            class="group flex flex-col items-center gap-2 px-4 py-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:shadow-md hover:-translate-y-0.5 transition-[transform,box-shadow,border-color,opacity] duration-300 cursor-default text-center"
            :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'"
            :style="{ transitionDelay: `${getWaveDelay(index, 4, 1300)}ms` }"
          >
            <div class="w-8 h-8 transition-transform group-hover:scale-110 duration-300" :style="{ color: method.color }" v-html="method.svg"></div>
            <span class="text-xs font-medium text-slate-600 dark:text-slate-400 leading-tight">{{ method.name }}</span>
          </div>
        </div>
      </div>

      <!-- IA & Seguridad -->
      <div>
        <div class="w-full h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-700/70 to-transparent mb-10 transition-opacity duration-500" :class="isVisible ? 'opacity-100' : 'opacity-0'" style="transition-delay: 1380ms"></div>
        <h3
          class="text-xs font-semibold tracking-widest uppercase text-slate-400 dark:text-slate-500 mb-4 pl-3 border-l-2 border-slate-300 dark:border-slate-600 transition-[opacity,transform] duration-500"
          :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
          style="transition-delay: 1400ms"
        >
          {{ t('skills.cat.ai') }}
        </h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          <div
            v-for="(item, index) in aiSecurity" :key="item.name"
            class="group flex flex-col gap-3 px-4 py-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:shadow-md hover:-translate-y-0.5 transition-[transform,box-shadow,border-color,opacity] duration-300"
            :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'"
            :style="{ transitionDelay: `${getWaveDelay(index, 5, 1450)}ms` }"
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
          style="transition-delay: 1700ms"
        >
          <div class="flex items-center gap-2 mb-3">
            <span class="w-2 h-2 bg-emerald-500 rounded-full animate-pulse flex-shrink-0"></span>
            <span class="text-xs font-semibold tracking-widest uppercase text-emerald-600 dark:text-emerald-400">
              {{ t('skills.active_learning') }}
            </span>
          </div>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="item in ['AWS Cloud Practitioner', 'Terraform', 'Python avanzado']"
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
