type ScrollTarget = string | number | HTMLElement

export function useScrollTo() {
  const scrollTo = (target: ScrollTarget, options?: { duration?: number; offset?: number }) => {
    if (typeof window === 'undefined') return

    const nuxtApp = useNuxtApp() as Record<string, unknown>
    const lenis = nuxtApp.$lenis as { scrollTo: (target: unknown, opts?: unknown) => void } | undefined

    if (lenis) {
      lenis.scrollTo(target, {
        duration: options?.duration ?? 1.2,
        offset: options?.offset ?? 0,
      })
      return
    }

    if (typeof target === 'number') {
      window.scrollTo({ top: target, behavior: 'smooth' })
      return
    }
    const el = typeof target === 'string' ? document.querySelector(target) : target
    el?.scrollIntoView({ behavior: 'smooth' })
  }

  return { scrollTo }
}
