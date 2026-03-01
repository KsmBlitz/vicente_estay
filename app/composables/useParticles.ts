import type { ParticleStyle } from '~/types'

export function useParticles(count: number, options?: {
  minSize?: number
  maxSize?: number
  minDuration?: number
  maxDuration?: number
  minDelay?: number
  maxDelay?: number
  minOpacity?: number
  maxOpacity?: number
}) {
  const {
    minSize = 2, maxSize = 6,
    minDuration = 6, maxDuration = 16,
    minDelay = 0, maxDelay = 8,
    minOpacity = 0.15, maxOpacity = 0.55,
  } = options ?? {}

  const particleStyles = ref<ParticleStyle[]>([])

  onMounted(() => {
    particleStyles.value = Array.from({ length: count }, () => ({
      left: `${Math.random() * 100}%`,
      width: `${minSize + Math.random() * (maxSize - minSize)}px`,
      height: `${minSize + Math.random() * (maxSize - minSize)}px`,
      animationDuration: `${minDuration + Math.random() * (maxDuration - minDuration)}s`,
      animationDelay: `${minDelay + Math.random() * (maxDelay - minDelay)}s`,
      '--particle-opacity': minOpacity + Math.random() * (maxOpacity - minOpacity),
    }))
  })

  return { particleStyles }
}
