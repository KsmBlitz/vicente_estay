<script setup lang="ts">
interface Profile {
  location?: string;
  email?: string;
  github?: string;
  linkedin?: string;
}

const props = defineProps<{
  profile?: Profile | null
}>()

const isVisible = ref(false)
const formState = ref({
  name: '',
  email: '',
  message: ''
})
const isSubmitting = ref(false)
const isSubmitted = ref(false)
const showToast = ref(false)
const toastMessage = ref('')
const toastType = ref<'success' | 'error'>('success')

// Links sociales dinámicos basados en el perfil
const socialLinks = computed(() => [
  { 
    name: 'GitHub', 
    icon: 'github', 
    url: props.profile?.github || 'https://github.com/KsmBlitz', 
    color: 'hover:text-slate-800 dark:hover:text-white' 
  },
  { 
    name: 'LinkedIn', 
    icon: 'linkedin', 
    url: props.profile?.linkedin || 'https://www.linkedin.com/in/vicente-estay/', 
    color: 'hover:text-blue-600' 
  },
  { 
    name: 'Email', 
    icon: 'email', 
    url: `mailto:${props.profile?.email || 'vjestayvaldivia@gmail.com'}`, 
    color: 'hover:text-red-500' 
  }
])

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

  const section = document.querySelector('#contact')
  if (section) observer.observe(section)
})

const handleSubmit = async () => {
  isSubmitting.value = true
  
  try {
    const response = await fetch('https://formspree.io/f/xqezorqo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: formState.value.name,
        email: formState.value.email,
        message: formState.value.message
      })
    })
    
    if (response.ok) {
      isSubmitted.value = true
      formState.value = { name: '', email: '', message: '' }
      
      // Show success toast
      toastType.value = 'success'
      toastMessage.value = '¡Mensaje enviado! Te responderé pronto.'
      showToast.value = true
      setTimeout(() => showToast.value = false, 5000)
    } else {
      throw new Error('Error al enviar')
    }
  } catch (error) {
    console.error('Error al enviar:', error)
    
    // Show error toast
    toastType.value = 'error'
    toastMessage.value = 'Hubo un error al enviar el mensaje. Intenta nuevamente.'
    showToast.value = true
    setTimeout(() => showToast.value = false, 5000)
  } finally {
    isSubmitting.value = false
  }
}

// Generate random styles for particles
const getParticleStyle = (index: number) => {
  const left = Math.random() * 100
  const duration = 8 + Math.random() * 12
  const delay = Math.random() * 6
  const size = 3 + Math.random() * 5
  const opacity = 0.2 + Math.random() * 0.3
  
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
  <section id="contact" class="py-24 md:py-32 bg-slate-50 dark:bg-slate-900/50 relative overflow-hidden">
    <!-- Animated background -->
    <div class="absolute inset-0 pointer-events-none">
      <!-- Particles -->
      <div class="particles-container">
        <div v-for="i in 50" :key="i" class="particle" :style="getParticleStyle(i)"></div>
      </div>
      
      <!-- Grid pattern -->
      <div class="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      
      <!-- Gradient orbs -->
      <div class="absolute -top-32 -right-32 w-96 h-96 bg-blue-200/30 dark:bg-blue-500/10 rounded-full blur-3xl animate-orb-float"></div>
      <div class="absolute -bottom-32 -left-32 w-[400px] h-[400px] bg-slate-300/40 dark:bg-slate-600/15 rounded-full blur-3xl animate-orb-float animation-delay-2000"></div>
    </div>

    <div class="max-w-5xl mx-auto px-6 relative z-10">
      <!-- Section Header -->
      <div class="text-center mb-16">
        <h2 
          class="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4 transition-all duration-500"
          :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
        >
          Trabajemos Juntos
        </h2>
        <p 
          class="text-slate-600 dark:text-slate-400 max-w-xl mx-auto transition-all duration-500 delay-100"
          :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
        >
          Estoy disponible para proyectos freelance y oportunidades laborales
        </p>
      </div>

      <div class="grid lg:grid-cols-2 gap-16">
        <!-- Contact Info -->
        <div 
          class="transition-all duration-500 delay-200"
          :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
        >
          <p class="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
            Estoy disponible para proyectos freelance y oportunidades laborales. 
            No dudes en contactarme.
          </p>

          <!-- Contact Details -->
          <div class="space-y-4 mb-8">
            <div>
              <p class="text-sm text-slate-500 dark:text-slate-400 mb-1">Email</p>
              <a 
                :href="`mailto:${profile?.email || 'vjestayvaldivia@gmail.com'}`" 
                class="text-slate-900 dark:text-white hover:opacity-70 transition-opacity"
              >
                {{ profile?.email || 'vjestayvaldivia@gmail.com' }}
              </a>
            </div>
            <div>
              <p class="text-sm text-slate-500 dark:text-slate-400 mb-1">Ubicación</p>
              <p class="text-slate-900 dark:text-white">{{ profile?.location || 'Chile' }}</p>
            </div>
          </div>

          <!-- Social Links -->
          <div class="flex gap-6">
            <a 
              v-for="social in socialLinks" 
              :key="social.name"
              :href="social.url"
              target="_blank"
              rel="noopener noreferrer"
              class="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
              :aria-label="social.name"
            >
              <svg v-if="social.icon === 'github'" class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <svg v-else-if="social.icon === 'linkedin'" class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
              <svg v-else-if="social.icon === 'email'" class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l10 8.104 10-8.104v11.817h-20z"/>
              </svg>
            </a>
          </div>
        </div>

        <!-- Contact Form -->
        <div 
          class="transition-all duration-500 delay-300"
          :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
        >
          <form 
            v-if="!isSubmitted"
            @submit.prevent="handleSubmit" 
            class="space-y-6"
          >
            <div>
              <label for="name" class="block text-sm text-slate-600 dark:text-slate-400 mb-2">
                Nombre
              </label>
              <input 
                id="name"
                v-model="formState.name"
                type="text" 
                required
                class="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md text-slate-900 dark:text-white focus:outline-none focus:border-slate-400 dark:focus:border-slate-500 transition-colors"
                placeholder="Tu nombre"
              />
            </div>
            
            <div>
              <label for="email" class="block text-sm text-slate-600 dark:text-slate-400 mb-2">
                Email
              </label>
              <input 
                id="email"
                v-model="formState.email"
                type="email" 
                required
                class="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md text-slate-900 dark:text-white focus:outline-none focus:border-slate-400 dark:focus:border-slate-500 transition-colors"
                placeholder="tu@email.com"
              />
            </div>
            
            <div>
              <label for="message" class="block text-sm text-slate-600 dark:text-slate-400 mb-2">
                Mensaje
              </label>
              <textarea 
                id="message"
                v-model="formState.message"
                rows="5" 
                required
                class="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md text-slate-900 dark:text-white focus:outline-none focus:border-slate-400 dark:focus:border-slate-500 transition-colors resize-none"
                placeholder="Cuéntame sobre tu proyecto..."
              ></textarea>
            </div>
            
            <button 
              type="submit"
              :disabled="isSubmitting"
              class="w-full py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-medium rounded-md hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="isSubmitting">Enviando...</span>
              <span v-else>Enviar mensaje</span>
            </button>
          </form>

          <!-- Success Message -->
          <div 
            v-else 
            class="text-center py-12"
          >
            <p class="text-lg font-medium text-slate-900 dark:text-white mb-2">
              Mensaje enviado
            </p>
            <p class="text-slate-600 dark:text-slate-400">
              Te responderé lo antes posible.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Toast Notification -->
    <Transition name="toast">
      <div
        v-if="showToast"
        class="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 px-6 py-4 rounded-lg shadow-2xl flex items-center gap-3 max-w-md"
        :class="toastType === 'success' 
          ? 'bg-emerald-500 text-white' 
          : 'bg-red-500 text-white'"
      >
        <svg v-if="toastType === 'success'" class="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
        <svg v-else class="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
        <p class="font-medium">{{ toastMessage }}</p>
      </div>
    </Transition>
  </section>
</template>

<style scoped>
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
  opacity: var(--particle-opacity, 0.3);
  animation: rise linear infinite;
  box-shadow: 0 0 4px currentColor;
}

@keyframes rise {
  0% {
    transform: translateY(100%) translateX(0) scale(0.5);
    opacity: 0;
  }
  15% {
    opacity: var(--particle-opacity, 0.4);
    transform: translateY(80%) translateX(8px) scale(1);
  }
  85% {
    opacity: var(--particle-opacity, 0.4);
  }
  100% {
    transform: translateY(-50px) translateX(20px) scale(0.7);
    opacity: 0;
  }
}

@keyframes orb-float {
  0%, 100% {
    transform: translateY(0) translateX(0);
  }
  50% {
    transform: translateY(-40px) translateX(30px);
  }
}

.animate-orb-float {
  animation: orb-float 15s ease-in-out infinite;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.dark .particle {
  color: rgba(148, 163, 184, 0.6);
}

.particle {
  color: rgba(100, 116, 139, 0.4);
}

/* Toast transition */
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(-50%) translateY(20px);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(-20px);
}
</style>
