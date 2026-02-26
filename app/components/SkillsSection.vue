<script setup lang="ts">
const isVisible = ref(false)

// Mapeo de URLs oficiales
const techUrls: Record<string, string> = {
  // Lenguajes
  'Python': 'https://www.python.org',
  'TypeScript': 'https://www.typescriptlang.org',
  'SQL': 'https://www.iso.org/standard/63555.html',
  'Dart': 'https://dart.dev',
  'Arduino': 'https://www.arduino.cc',
  
  // Frameworks y Tecnologías
  'Vue.js': 'https://vuejs.org',
  'FastAPI': 'https://fastapi.tiangolo.com',
  'MongoDB': 'https://www.mongodb.com',
  'Firebase': 'https://firebase.google.com',
  'PostgreSQL': 'https://www.postgresql.org',
  'AWS': 'https://aws.amazon.com',
  'Git': 'https://git-scm.com',
  'Docker': 'https://www.docker.com',
  'Linux/WSL2': 'https://learn.microsoft.com/en-us/windows/wsl',
  'FlutterFlow': 'https://flutterflow.io',
  'Raspberry Pi': 'https://www.raspberrypi.com',
  'Jira': 'https://www.atlassian.com/software/jira',
  'Bitbucket': 'https://bitbucket.org'
}

// Lenguajes de programación
const languages = [
  { name: 'Python', color: '#3776ab', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', url: techUrls['Python'] },
  { name: 'TypeScript', color: '#3178c6', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', url: techUrls['TypeScript'] },
  { name: 'SQL', color: '#4169e1', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azuresqldatabase/azuresqldatabase-original.svg', url: techUrls['SQL'] },
  { name: 'Dart', color: '#0175c2', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg', url: techUrls['Dart'] },
  { name: 'Arduino', color: '#00979d', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/arduino/arduino-original.svg', url: techUrls['Arduino'] },
]

// Tecnologías y herramientas
const technologies = [
  { name: 'Vue.js', color: '#42b883', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg', url: techUrls['Vue.js'] },
  { name: 'FastAPI', color: '#009688', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg', url: techUrls['FastAPI'] },
  { name: 'MongoDB', color: '#47a248', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', url: techUrls['MongoDB'] },
  { name: 'Firebase', color: '#ffca28', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg', url: techUrls['Firebase'] },
  { name: 'PostgreSQL', color: '#4169e1', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg', url: techUrls['PostgreSQL'] },
  { name: 'AWS', color: '#ff9900', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg', url: techUrls['AWS'] },
  { name: 'Git', color: '#f05032', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', url: techUrls['Git'] },
  { name: 'Docker', color: '#2496ed', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg', url: techUrls['Docker'] },
  { name: 'Linux/WSL2', color: '#fcc624', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg', url: techUrls['Linux/WSL2'] },
  { name: 'FlutterFlow', color: '#02569b', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg', url: techUrls['FlutterFlow'] },
  { name: 'Raspberry Pi', color: '#a22846', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/raspberrypi/raspberrypi-original.svg', url: techUrls['Raspberry Pi'] },
  { name: 'Jira', color: '#0052cc', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg', url: techUrls['Jira'] },
  { name: 'Bitbucket', color: '#0052cc', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bitbucket/bitbucket-original.svg', url: techUrls['Bitbucket'] },
]

// Habilidades blandas
const softSkills = [
  { 
    name: 'Trabajo en equipo',
    svg: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" /></svg>',
    color: '#3b82f6'
  },
  { 
    name: 'Resolución de problemas',
    svg: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 01-.657.643 48.39 48.39 0 01-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 01-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 00-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 01-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 00.657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 01-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 005.427-.63 48.05 48.05 0 00.582-4.717.532.532 0 00-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.96.401v0a.656.656 0 00.658-.663 48.422 48.422 0 00-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 01-.61-.58v0z" /></svg>',
    color: '#8b5cf6'
  },
  { 
    name: 'Mantenimiento TI',
    svg: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75a4.5 4.5 0 01-4.884 4.484c-1.076-.091-2.264.071-2.95.904l-7.152 8.684a2.548 2.548 0 11-3.586-3.586l8.684-7.152c.833-.686.995-1.874.904-2.95a4.5 4.5 0 016.336-4.486l-3.276 3.276a3.004 3.004 0 002.25 2.25l3.276-3.276c.256.565.398 1.192.398 1.852z" /><path stroke-linecap="round" stroke-linejoin="round" d="M4.867 19.125h.008v.008h-.008v-.008z" /></svg>',
    color: '#f59e0b'
  },
  { 
    name: 'Redes',
    svg: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" /></svg>',
    color: '#06b6d4'
  },
  { 
    name: 'Responsabilidad',
    svg: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" /></svg>',
    color: '#10b981'
  },
  { 
    name: 'Manejo del tiempo',
    svg: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>',
    color: '#ec4899'
  },
]

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          isVisible.value = true
        }
      })
    },
    { threshold: 0.2 }
  )

  const section = document.querySelector('#skills')
  if (section) observer.observe(section)
})
</script>

<template>
  <section id="skills" class="py-24 md:py-32 bg-slate-50 dark:bg-slate-800/50 relative overflow-hidden">
    <!-- Animated background elements -->
    <div class="absolute inset-0 pointer-events-none">
      <!-- Decorative grid -->
      <div class="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      
      <!-- Gradient orbs -->
      <div class="absolute top-20 left-10 w-[500px] h-[500px] bg-blue-300/20 dark:bg-blue-500/10 rounded-full blur-3xl animate-orb-float"></div>
      <div class="absolute bottom-10 right-10 w-[600px] h-[600px] bg-slate-300/30 dark:bg-slate-600/10 rounded-full blur-3xl animate-orb-float animation-delay-2000"></div>
      <div class="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-indigo-200/15 dark:bg-indigo-500/5 rounded-full blur-3xl animate-orb-pulse"></div>
      
      <!-- Floating shapes -->
      <div class="absolute top-1/4 right-1/5 w-6 h-6 border-2 border-slate-300/40 dark:border-slate-600/40 rotate-45 animate-float-slow"></div>
      <div class="absolute bottom-1/3 left-1/6 w-8 h-8 border-2 border-slate-300/40 dark:border-slate-600/40 rounded-full animate-float-slow animation-delay-1000"></div>
      <div class="absolute top-2/3 right-1/4 w-4 h-4 bg-slate-400/20 dark:bg-slate-500/20 rotate-45 animate-float-slow animation-delay-3000"></div>
    </div>
    
    <div class="max-w-5xl mx-auto px-6 relative z-10">
      <!-- Section Header -->
      <div class="text-center mb-12">
        <h2 
          class="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4 transition-all duration-500"
          :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
        >
          Stack Técnico
        </h2>
        <p 
          class="text-slate-600 dark:text-slate-400 max-w-xl mx-auto transition-all duration-500 delay-100"
          :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
        >
          Tecnologías, herramientas y habilidades que utilizo
        </p>
      </div>

      <!-- Languages -->
      <div class="mb-10">
        <h3 
          class="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4 transition-all duration-500 delay-150"
          :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
        >
          Lenguajes
        </h3>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          <a 
            v-for="(skill, index) in languages" 
            :key="skill.name"
            :href="skill.url"
            target="_blank"
            rel="noopener noreferrer"
            class="group flex items-center gap-3 px-4 py-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:shadow-md transition-all duration-300 cursor-pointer"
            :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
            :style="{ transitionDelay: `${200 + index * 30}ms` }"
          >
            <div 
              class="w-9 h-9 rounded-lg flex items-center justify-center p-1.5 flex-shrink-0"
              :style="{ backgroundColor: skill.color + '15' }"
            >
              <img 
                :src="skill.logo" 
                :alt="skill.name"
                class="w-full h-full object-contain"
              />
            </div>
            <span class="text-sm font-medium text-slate-700 dark:text-slate-300 truncate">
              {{ skill.name }}
            </span>
          </a>
        </div>
      </div>

      <!-- Technologies & Tools -->
      <div class="mb-10">
        <h3 
          class="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4 transition-all duration-500 delay-200"
          :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
        >
          Tecnologías y Herramientas
        </h3>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          <a 
            v-for="(skill, index) in technologies" 
            :key="skill.name"
            :href="skill.url"
            target="_blank"
            rel="noopener noreferrer"
            class="group flex items-center gap-3 px-4 py-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:shadow-md transition-all duration-300 cursor-pointer"
            :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
            :style="{ transitionDelay: `${250 + index * 30}ms` }"
          >
            <div 
              class="w-9 h-9 rounded-lg flex items-center justify-center p-1.5 flex-shrink-0"
              :style="{ backgroundColor: skill.color + '15' }"
            >
              <img 
                :src="skill.logo" 
                :alt="skill.name"
                class="w-full h-full object-contain"
              />
            </div>
            <span class="text-sm font-medium text-slate-700 dark:text-slate-300 truncate">
              {{ skill.name }}
            </span>
          </a>
        </div>
      </div>

      <!-- Soft Skills -->
      <div>
        <h3 
          class="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4 transition-all duration-500 delay-300"
          :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
        >
          Habilidades
        </h3>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          <div 
            v-for="(skill, index) in softSkills" 
            :key="skill.name"
            class="group flex flex-col items-center gap-2 px-4 py-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:shadow-md transition-all duration-300 cursor-default text-center"
            :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
            :style="{ transitionDelay: `${400 + index * 30}ms` }"
          >
            <div 
              class="w-8 h-8 transition-transform group-hover:scale-110 duration-300"
              :style="{ color: skill.color }"
              v-html="skill.svg"
            ></div>
            <span class="text-xs font-medium text-slate-600 dark:text-slate-400 leading-tight">
              {{ skill.name }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<style scoped>
/* Floating animations */
@keyframes orb-float {
  0%, 100% {
    transform: translateY(0) translateX(0) scale(1);
  }
  33% {
    transform: translateY(-30px) translateX(20px) scale(1.05);
  }
  66% {
    transform: translateY(20px) translateX(-15px) scale(0.95);
  }
}

@keyframes orb-pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 0.3;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.5;
  }
}

@keyframes float-slow {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(180deg);
  }
}

.animate-orb-float {
  animation: orb-float 20s ease-in-out infinite;
}

.animate-orb-pulse {
  animation: orb-pulse 15s ease-in-out infinite;
}

.animate-float-slow {
  animation: float-slow 8s ease-in-out infinite;
}

.animation-delay-1000 {
  animation-delay: 1s;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-3000 {
  animation-delay: 3s;
}
</style>