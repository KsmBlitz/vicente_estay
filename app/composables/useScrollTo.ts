export function useScrollTo() {
  const scrollTo = (target: string | HTMLElement, options?: { duration?: number; offset?: number }) => {
    if (typeof window === 'undefined') return

    const nuxtApp = useNuxtApp() as Record<string, unknown>
    const lenis = nuxtApp.$lenis as { scrollTo: (target: unknown, opts?: unknown) => void } | undefined

    if (lenis) {
      lenis.scrollTo(target, {
        duration: options?.duration ?? 1.2,
        offset: options?.offset ?? 0,
      })
    } else {
      const el = typeof target === 'string' ? document.querySelector(target) : target
      el?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return { scrollTo }
}
