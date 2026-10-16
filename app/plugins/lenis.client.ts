// Scroll suave. Se carga en tiempo libre; mientras tanto useScrollTo usa el scroll nativo.
export default defineNuxtPlugin((nuxtApp) => {
  // Con movimiento reducido se usa siempre el scroll nativo
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  const start = async () => {
    const { default: Lenis } = await import('lenis')
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    let rafId = requestAnimationFrame(function raf(time: number) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    })

    nuxtApp.provide('lenis', lenis)

    if (import.meta.hot) {
      import.meta.hot.dispose(() => {
        lenis.destroy()
        cancelAnimationFrame(rafId)
      })
    }
  }

  if ('requestIdleCallback' in window) requestIdleCallback(start, { timeout: 2000 })
  else setTimeout(start, 500)
})
