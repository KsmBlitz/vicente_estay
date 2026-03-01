<script setup lang="ts">
import type { Profile } from '~/types'

const props = defineProps<{
  profile?: Profile | null
}>()

const { public: { formspreeUrl } } = useRuntimeConfig()
const { isVisible, sectionRef } = useScrollReveal({ threshold: 0.15 })
const { t } = useI18n()

const formState = ref({ name: '', email: '', message: '' })
const isSubmitting = ref(false)
const isSubmitted = ref(false)
const showToast = ref(false)
const toastMessage = ref('')
const toastType = ref<'success' | 'error'>('success')

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


const handleSubmit = async () => {
  isSubmitting.value = true

  try {
    const response = await fetch(formspreeUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formState.value)
    })

    if (response.ok) {
      isSubmitted.value = true
      formState.value = { name: '', email: '', message: '' }
      toastType.value = 'success'
      toastMessage.value = t('contact.success')
    } else {
      throw new Error('Error al enviar')
    }
  } catch {
    toastType.value = 'error'
    toastMessage.value = t('contact.error')
  } finally {
    isSubmitting.value = false
    showToast.value = true
    setTimeout(() => { showToast.value = false }, 5000)
  }
}
</script>

<template>
  <section id="contact" ref="sectionRef" class="py-24 md:py-32 bg-slate-50 dark:bg-slate-900 relative overflow-hidden">
    <!-- Fondo: líneas diagonales animadas -->
    <div class="absolute inset-0 pointer-events-none overflow-hidden">
      <!-- Stripes que se deslizan suavemente -->
      <div class="contact-stripes absolute inset-0"></div>
      <!-- Vignette radial para enfocar el contenido central -->
      <div class="absolute inset-0 bg-radial-vignette"></div>
    </div>

    <!-- Section number -->
    <div class="absolute right-6 bottom-6 text-[160px] font-black text-slate-200 dark:text-slate-700/80 select-none leading-none pointer-events-none">
      05
    </div>

    <div class="max-w-5xl mx-auto px-6 relative z-10">
      <!-- Section Header -->
      <div class="text-center mb-16">
        <p
          class="text-xs font-semibold tracking-widest uppercase text-slate-400 dark:text-slate-500 mb-4 transition-[opacity,transform] duration-500"
          :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
        >
          {{ t('contact.eyebrow') }}
        </p>
        <h2 class="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
          <SplitText :text="t('contact.heading')" :visible="isVisible" :delay="100" />
        </h2>
        <p
          class="text-slate-600 dark:text-slate-400 max-w-xl mx-auto transition-[opacity,transform] duration-500"
          :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
          style="transition-delay: 300ms"
        >
          {{ t('contact.subtitle') }}
        </p>
      </div>

      <div class="grid lg:grid-cols-2 gap-16">
        <!-- Contact Info -->
        <div
          class="transition-[opacity,transform] duration-500"
          :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'"
          style="transition-delay: 350ms"
        >
          <p class="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
            {{ t('contact.intro') }}
          </p>

          <div class="space-y-4 mb-8">
            <div>
              <p class="text-xs font-semibold tracking-widest uppercase text-slate-400 dark:text-slate-500 mb-1">{{ t('contact.email_label') }}</p>
              <a
                :href="`mailto:${profile?.email || 'vjestayvaldivia@gmail.com'}`"
                class="text-slate-900 dark:text-white hover:opacity-70 transition-opacity"
              >
                {{ profile?.email || 'vjestayvaldivia@gmail.com' }}
              </a>
            </div>
            <div>
              <p class="text-xs font-semibold tracking-widest uppercase text-slate-400 dark:text-slate-500 mb-1">{{ t('contact.location_label') }}</p>
              <p class="text-slate-900 dark:text-white">{{ profile?.location || 'Chile' }}</p>
            </div>
          </div>

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

        <!-- Contact Form with floating labels -->
        <div
          class="transition-[opacity,transform] duration-500"
          :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'"
          style="transition-delay: 500ms"
        >
          <form v-if="!isSubmitted" @submit.prevent="handleSubmit" class="space-y-6">
            <!-- Floating label: Name -->
            <div class="relative">
              <input
                id="name"
                v-model="formState.name"
                type="text"
                required
                placeholder=" "
                class="peer w-full px-4 pt-6 pb-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:border-slate-500 dark:focus:border-slate-400 transition-colors text-sm"
              />
              <label
                for="name"
                class="absolute left-4 text-slate-400 dark:text-slate-500 pointer-events-none transition-all duration-200
                       peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm
                       peer-focus:top-1.5 peer-focus:text-[10px] peer-focus:font-semibold peer-focus:tracking-wider peer-focus:uppercase peer-focus:text-slate-500 dark:peer-focus:text-slate-400
                       top-1.5 text-[10px] font-semibold tracking-wider uppercase"
              >
                {{ t('contact.name_placeholder') }}
              </label>
            </div>

            <!-- Floating label: Email -->
            <div class="relative">
              <input
                id="email"
                v-model="formState.email"
                type="email"
                required
                placeholder=" "
                class="peer w-full px-4 pt-6 pb-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:border-slate-500 dark:focus:border-slate-400 transition-colors text-sm"
              />
              <label
                for="email"
                class="absolute left-4 text-slate-400 dark:text-slate-500 pointer-events-none transition-all duration-200
                       peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm
                       peer-focus:top-1.5 peer-focus:text-[10px] peer-focus:font-semibold peer-focus:tracking-wider peer-focus:uppercase peer-focus:text-slate-500 dark:peer-focus:text-slate-400
                       top-1.5 text-[10px] font-semibold tracking-wider uppercase"
              >
                {{ t('contact.email_placeholder') }}
              </label>
            </div>

            <!-- Floating label: Message -->
            <div class="relative">
              <textarea
                id="message"
                v-model="formState.message"
                rows="5"
                required
                placeholder=" "
                class="peer w-full px-4 pt-6 pb-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:border-slate-500 dark:focus:border-slate-400 transition-colors resize-none text-sm"
              ></textarea>
              <label
                for="message"
                class="absolute left-4 text-slate-400 dark:text-slate-500 pointer-events-none transition-all duration-200
                       peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm
                       peer-focus:top-1.5 peer-focus:text-[10px] peer-focus:font-semibold peer-focus:tracking-wider peer-focus:uppercase peer-focus:text-slate-500 dark:peer-focus:text-slate-400
                       top-1.5 text-[10px] font-semibold tracking-wider uppercase"
              >
                {{ t('contact.message_placeholder') }}
              </label>
            </div>

            <button
              type="submit"
              :disabled="isSubmitting"
              class="w-full py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-medium rounded-lg hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="isSubmitting">{{ t('contact.submitting') }}</span>
              <span v-else>{{ t('contact.submit') }}</span>
            </button>
          </form>

          <div v-else class="text-center py-12">
            <p class="text-lg font-medium text-slate-900 dark:text-white mb-2">Mensaje enviado</p>
            <p class="text-slate-600 dark:text-slate-400">Te responderé lo antes posible.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Toast Notification -->
    <Transition name="toast">
      <div
        v-if="showToast"
        class="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 px-6 py-4 rounded-lg shadow-2xl flex items-center gap-3 max-w-md"
        :class="toastType === 'success' ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'"
      >
        <svg v-if="toastType === 'success'" class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
        <svg v-else class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
        <p class="font-medium text-sm">{{ toastMessage }}</p>
      </div>
    </Transition>
  </section>
</template>

<style scoped>
/* Líneas diagonales animadas */
.contact-stripes {
  background-image: repeating-linear-gradient(
    -55deg,
    transparent 0px,
    transparent 34px,
    rgba(0, 0, 0, 0.04) 34px,
    rgba(0, 0, 0, 0.04) 35px
  );
  background-size: 50px 50px;
  animation: stripe-drift 30s linear infinite;
}

:global(.dark) .contact-stripes {
  background-image: repeating-linear-gradient(
    -55deg,
    transparent 0px,
    transparent 34px,
    rgba(255, 255, 255, 0.04) 34px,
    rgba(255, 255, 255, 0.04) 35px
  );
}

@keyframes stripe-drift {
  from { background-position: 0 0; }
  to   { background-position: 50px 50px; }
}

/* Viñeta radial para enfocar el centro */
.bg-radial-vignette {
  background: radial-gradient(ellipse 75% 85% at 50% 50%, transparent 35%, rgb(248 250 252) 90%);
}

:global(.dark) .bg-radial-vignette {
  background: radial-gradient(ellipse 75% 85% at 50% 50%, transparent 35%, rgb(15 23 42) 90%);
}

/* Toast transition */
.toast-enter-active, .toast-leave-active { transition: all 0.3s ease; }
.toast-enter-from { opacity: 0; transform: translateX(-50%) translateY(20px); }
.toast-leave-to { opacity: 0; transform: translateX(-50%) translateY(-20px); }
</style>
