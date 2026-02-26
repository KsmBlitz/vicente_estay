<script setup lang="ts">
interface Profile {
  name: string;
  title?: string;
  photoUrl?: string;
  shortBio?: string;
}

interface Project {
  title: string;
}

const props = defineProps<{
  profile?: Profile | null,
  projects?: Project[] | null
}>()

const scrollToProjects = () => {
  const element = document.querySelector('#projects')
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

const scrollToContact = () => {
  const element = document.querySelector('#contact')
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

const downloadCV = () => {
  // Link al CV - puedes subirlo a /public/cv.pdf o usar un link externo
  window.open('/cv.pdf', '_blank')
}

// Animated counter
const yearsExp = ref(0)
const projectsCount = ref(0)
const techCount = ref(0)
const isCounterVisible = ref(false)

const animateCounter = (target: number, current: Ref<number>, duration: number = 2000) => {
  const startTime = Date.now()
  const endTime = startTime + duration
  
  const updateCounter = () => {
    const now = Date.now()
    const progress = Math.min((now - startTime) / duration, 1)
    const easeOutQuart = 1 - Math.pow(1 - progress, 4)
    
    current.value = Math.floor(easeOutQuart * target)
    
    if (progress < 1) {
      requestAnimationFrame(updateCounter)
    } else {
      current.value = target
    }
  }
  
  requestAnimationFrame(updateCounter)
}

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !isCounterVisible.value) {
          isCounterVisible.value = true
          animateCounter(1, yearsExp, 1500)
          animateCounter(props.projects?.length || 3, projectsCount, 2000)
          animateCounter(10, techCount, 2500)
        }
      })
    },
    { threshold: 0.5 }
  )

  const statsElement = document.querySelector('#stats')
  if (statsElement) observer.observe(statsElement)
})

// Typing effect
const displayedTitle = ref('')
const fullTitle = computed(() => props.profile?.title || 'Desarrollador Full Stack')
const isTyping = ref(false)
const isAnimating = ref(true) // Control para animaciones pesadas

onMounted(() => {
  setTimeout(() => {
    isTyping.value = true
    let index = 0
    const typingInterval = setInterval(() => {
      if (index < fullTitle.value.length) {
        displayedTitle.value += fullTitle.value[index]
        index++
      } else {
        clearInterval(typingInterval)
        // Dar tiempo para que termine el contador antes de reactivar animaciones de fondo
        setTimeout(() => {
          isAnimating.value = false
        }, 2500)
      }
    }, 80)
  }, 500)
})

// Generate random styles for particles
const getParticleStyle = (index: number) => {
  const left = Math.random() * 100
  const duration = 6 + Math.random() * 10
  const delay = Math.random() * 8
  const size = 3 + Math.random() * 6
  const opacity = 0.3 + Math.random() * 0.4
  
  return {
    left: `${left}%`,
    width: `${size}px`,
    height: `${size}px`,
    animationDuration: `${duration}s`,
    animationDelay: `${delay}s`,
    '--particle-opacity': opacity
  }
}
</script>

<template>
  <section id="hero" class="min-h-screen flex items-center justify-center relative pt-20 overflow-hidden">
    <!-- Animated background -->
    <div class="absolute inset-0 bg-white dark:bg-slate-900">
      <!-- Rising particles - ocultas durante animaciones pesadas -->
      <Transition name="fade-particles">
        <div v-show="!isAnimating" class="particles-container">
          <div v-for="i in 30" :key="i" class="particle" :style="getParticleStyle(i)"></div>
        </div>
      </Transition>
      
      <!-- Decorative grid lines -->
      <div class="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      
      <!-- Animated gradient orbs -->
      <div class="absolute top-20 left-10 w-96 h-96 bg-blue-300/30 dark:bg-blue-500/10 rounded-full blur-3xl animate-orb-float"></div>
      <div class="absolute bottom-20 right-10 w-[500px] h-[500px] bg-slate-300/40 dark:bg-slate-600/15 rounded-full blur-3xl animate-orb-float animation-delay-2000"></div>
      <div class="absolute top-1/2 left-1/3 w-80 h-80 bg-indigo-200/20 dark:bg-indigo-500/5 rounded-full blur-3xl animate-orb-pulse"></div>
      
      <!-- Floating geometric shapes -->
      <div class="absolute top-1/4 right-1/4 w-4 h-4 border-2 border-slate-300 dark:border-slate-600 rotate-45 animate-float-slow opacity-40"></div>
      <div class="absolute bottom-1/3 left-1/5 w-6 h-6 border-2 border-slate-300 dark:border-slate-600 rounded-full animate-float-slow animation-delay-1000 opacity-30"></div>
      <div class="absolute top-2/3 right-1/5 w-3 h-3 bg-slate-400/30 dark:bg-slate-500/20 rotate-45 animate-float-slow animation-delay-3000"></div>
    </div>

    <div class="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 py-12">
      <div class="grid lg:grid-cols-2 gap-16 xl:gap-24 items-center">
        <!-- Content -->
        <div class="animate-fade-in order-2 lg:order-1">
          <div class="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-full mb-8 animate-fade-in-up">
            <span class="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
            <span class="text-sm font-medium text-slate-600 dark:text-slate-400">Disponible para trabajar</span>
          </div>

          <!-- Name -->
          <h1 class="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight animate-fade-in-up animation-delay-100">
            {{ profile?.name || 'Vicente Estay' }}
          </h1>

          <!-- Title with gradient and typing effect -->
          <h2 class="text-2xl md:text-3xl lg:text-4xl font-semibold bg-gradient-to-r from-slate-600 via-slate-500 to-slate-400 dark:from-slate-300 dark:via-slate-400 dark:to-slate-500 bg-clip-text text-transparent mb-8 animate-fade-in-up animation-delay-200 min-h-[3rem] flex items-center">
            <span>{{ displayedTitle }}</span>
            <span v-if="isTyping && displayedTitle.length < fullTitle.length" class="inline-block w-0.5 h-8 bg-slate-500 dark:bg-slate-400 ml-1 animate-blink"></span>
          </h2>

          <!-- Description -->
          <p class="text-lg lg:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mb-10 leading-relaxed animate-fade-in-up animation-delay-300">
            {{ profile?.shortBio || 'Construyo aplicaciones web modernas con foco en rendimiento, accesibilidad y experiencia de usuario.' }}
          </p>

          <!-- CTA Buttons -->
          <div class="flex flex-wrap gap-4 animate-fade-in-up animation-delay-400">
            <button 
              @click="scrollToProjects"
              class="group px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-medium rounded-lg hover:bg-slate-800 dark:hover:bg-slate-100 transition-all hover:shadow-lg hover:shadow-slate-900/20 dark:hover:shadow-white/20"
            >
              <span class="flex items-center gap-2">
                Ver proyectos
                <svg class="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </button>
            <button 
              @click="downloadCV"
              class="group px-6 py-3 text-slate-900 dark:text-white text-sm font-medium rounded-lg border border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all"
            >
              <span class="flex items-center gap-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Descargar CV
              </span>
            </button>
            <button 
              @click="scrollToContact"
              class="px-6 py-3 text-slate-600 dark:text-slate-400 text-sm font-medium rounded-lg border border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all"
            >
              Contacto
            </button>
          </div>

          <!-- Quick stats with animated counter -->
          <div id="stats" class="flex gap-10 lg:gap-12 mt-12 pt-10 border-t border-slate-200 dark:border-slate-800 animate-fade-in-up animation-delay-400">
            <div>
              <div class="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white">{{ yearsExp }}</div>
              <div class="text-sm lg:text-base text-slate-500 dark:text-slate-400">Años exp.</div>
            </div>
            <div>
              <div class="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white">{{ projectsCount }}</div>
              <div class="text-sm lg:text-base text-slate-500 dark:text-slate-400">Proyectos</div>
            </div>
            <div>
              <div class="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white">{{ techCount }}</div>
              <div class="text-sm lg:text-base text-slate-500 dark:text-slate-400">Tecnologías</div>
            </div>
          </div>
        </div>

        <!-- Photo/Visual -->
        <div class="order-1 lg:order-2 flex justify-center animate-fade-in animation-delay-200">
          <div class="relative">
            <!-- Decorative elements -->
            <div class="absolute -inset-8 bg-gradient-to-br from-slate-200 via-slate-100 to-transparent dark:from-slate-700 dark:via-slate-800 dark:to-transparent rounded-3xl blur-3xl opacity-60"></div>
            <div class="absolute -top-8 -right-8 w-32 h-32 bg-slate-200/50 dark:bg-slate-700/30 rounded-full blur-xl animate-pulse-slow"></div>
            <div class="absolute -bottom-8 -left-8 w-40 h-40 bg-slate-300/40 dark:bg-slate-600/20 rounded-full blur-xl animate-pulse-slow animation-delay-1000"></div>
            
            <!-- Photo container -->
            <div class="relative w-80 h-80 md:w-96 md:h-96 lg:w-[400px] lg:h-[400px] xl:w-[450px] xl:h-[450px] rounded-2xl overflow-hidden border-2 border-slate-200 dark:border-slate-700 shadow-2xl shadow-slate-900/10 dark:shadow-black/30">
              <img 
                v-if="profile?.photoUrl" 
                :src="profile.photoUrl" 
                :alt="profile.name"
                class="w-full h-full object-cover"
              />
              <div v-else class="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 flex items-center justify-center">
                <div class="text-7xl lg:text-8xl font-bold text-slate-300 dark:text-slate-600">VE</div>
              </div>
            </div>

            <!-- Floating badges -->
            <div class="absolute -right-4 top-1/4 bg-white dark:bg-slate-800 rounded-xl p-3 shadow-lg border border-slate-200 dark:border-slate-700 animate-float">
              <div class="flex items-center gap-2">
                <div class="w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center">
                  <svg class="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </div>
                <span class="text-xs font-medium text-slate-600 dark:text-slate-300">GitHub</span>
              </div>
            </div>

            <div class="absolute -left-4 bottom-1/4 bg-white dark:bg-slate-800 rounded-xl p-3 shadow-lg border border-slate-200 dark:border-slate-700 animate-float animation-delay-1000">
              <div class="flex items-center gap-2">
                <div class="w-8 h-8 bg-emerald-500/10 rounded-lg flex items-center justify-center">
                  <svg class="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <span class="text-xs font-medium text-slate-600 dark:text-slate-300">Code</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.animate-fade-in {
  animation: fade-in 0.6s ease-out forwards;
}

.animate-fade-in-up {
  opacity: 0;
  animation: fade-in-up 0.6s ease-out forwards;
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

/* Particles */
.particles-container {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.particle {
  position: absolute;
  background: currentColor;
  border-radius: 50%;
  opacity: var(--particle-opacity, 0.4);
  animation: rise linear infinite;
  box-shadow: 0 0 6px currentColor;
}

@keyframes rise {
  0% {
    transform: translateY(100vh) translateX(0) scale(0.5);
    opacity: 0;
  }
  15% {
    opacity: var(--particle-opacity, 0.5);
    transform: translateY(80vh) translateX(10px) scale(1);
  }
  85% {
    opacity: var(--particle-opacity, 0.5);
  }
  100% {
    transform: translateY(-50px) translateX(30px) scale(0.8);
    opacity: 0;
  }
}

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
    transform: scale(1.2);
    opacity: 0.5;
  }
}

@keyframes float-slow {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(180deg);
  }
}

.animate-orb-float {
  animation: orb-float 12s ease-in-out infinite;
}

.animate-orb-pulse {
  animation: orb-pulse 8s ease-in-out infinite;
}

.animate-float-slow {
  animation: float-slow 6s ease-in-out infinite;
}

@keyframes pulse-slow {
  0%, 100% {
    opacity: 0.4;
  }
  50% {
    opacity: 0.7;
  }
}

.animate-pulse-slow {
  animation: pulse-slow 4s ease-in-out infinite;
}

.dark .particle {
  color: rgba(148, 163, 184, 0.7);
}

.particle {
  color: rgba(100, 116, 139, 0.5);
  will-change: transform, opacity;
}

/* Smooth fade for particles */
.fade-particles-enter-active,
.fade-particles-leave-active {
  transition: opacity 1.5s ease;
}

.fade-particles-enter-from,
.fade-particles-leave-to {
  opacity: 0;
}

.animation-delay-100 { animation-delay: 0.1s; }
.animation-delay-200 { animation-delay: 0.2s; }
.animation-delay-300 { animation-delay: 0.3s; }
.animation-delay-400 { animation-delay: 0.4s; }
.animation-delay-1000 { animation-delay: 1s; }
.animation-delay-2000 { animation-delay: 2s; }
.animation-delay-3000 { animation-delay: 3s; }

/* Typing cursor blink */
@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

.animate-blink {
  animation: blink 1s step-end infinite;
}
</style>
