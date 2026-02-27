export function useScrollReveal(options?: {
  threshold?: number
  rootMargin?: string
}) {
  const isVisible = ref(false)
  const sectionRef = ref<HTMLElement | null>(null)

  onMounted(() => {
    if (!sectionRef.value) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            isVisible.value = true
            observer.disconnect()
          }
        })
      },
      {
        threshold: options?.threshold ?? 0.1,
        rootMargin: options?.rootMargin ?? '0px 0px -60px 0px',
      }
    )

    observer.observe(sectionRef.value)
  })

  return { isVisible, sectionRef }
}
