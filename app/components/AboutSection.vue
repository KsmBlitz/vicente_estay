<script setup lang="ts">
interface Profile {
  name: string;
  aboutPhotoUrl?: string;
  longBio?: string;
  yearsExperience?: number;
  projectsCompleted?: number;
}

interface Project {
  title: string;
}

const props = defineProps<{
  profile?: Profile | null,
  projects?: Project[] | null
}>()

const isVisible = ref(false)

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

  const section = document.querySelector('#about')
  if (section) observer.observe(section)
})
</script>

<template>
  <section id="about" class="py-24 md:py-32 bg-white dark:bg-slate-900">
    <div class="max-w-5xl mx-auto px-6">
      <!-- Section Header -->
      <div class="text-center mb-16">
        <h2 
          class="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4 transition-all duration-500"
          :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
        >
          Sobre Mí
        </h2>
        <p 
          class="text-slate-600 dark:text-slate-400 max-w-xl mx-auto transition-all duration-500 delay-100"
          :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
        >
          Conoce un poco más sobre quién soy y qué hago
        </p>
      </div>

      <div class="grid md:grid-cols-2 gap-12 items-center">
        <!-- Image -->
        <div 
          class="transition-all duration-500 delay-200"
          :class="isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'"
        >
          <div class="aspect-square bg-slate-100 dark:bg-slate-800 rounded-2xl overflow-hidden">
            <img 
              v-if="profile?.aboutPhotoUrl" 
              :src="profile.aboutPhotoUrl" 
              :alt="profile.name"
              class="w-full h-full object-cover"
            />
            <div v-else class="w-full h-full flex items-center justify-center text-slate-300 dark:text-slate-600">
              <svg class="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </div>
        </div>

        <!-- Content -->
        <div 
          class="transition-all duration-500 delay-300"
          :class="isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'"
        >
          <h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-4">
            {{ profile?.name || 'Vicente Estay' }}
          </h3>
          
          <div class="space-y-4 text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
            <p>
              {{ profile?.longBio || 'Desarrollador con experiencia en el ecosistema JavaScript moderno. Me especializo en construir aplicaciones web escalables y de alto rendimiento.' }}
            </p>
              <!-- Frase eliminada -->
          </div>

          <!-- Stats -->
          <div class="flex gap-8">
            <div class="text-center">
              <div class="text-3xl font-bold text-slate-900 dark:text-white">{{ profile?.yearsExperience || 1 }}</div>
              <div class="text-sm text-slate-500 dark:text-slate-400 mt-1">Años Exp.</div>
            </div>
            <div class="text-center">
              <div class="text-3xl font-bold text-slate-900 dark:text-white">{{ projects?.length || 0 }}</div>
              <div class="text-sm text-slate-500 dark:text-slate-400 mt-1">Proyectos</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
