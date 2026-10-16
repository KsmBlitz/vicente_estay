import Lenis from 'lenis'

export default defineNuxtPlugin(() => {
  // Con movimiento reducido se usa el scroll nativo (useScrollTo tiene fallback)
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  const lenis = new Lenis({
    duration: 1.1,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  })

  let rafId: number

  function raf(time: number) {
    lenis.raf(time)
    rafId = requestAnimationFrame(raf)
  }

  rafId = requestAnimationFrame(raf)

  if (import.meta.hot) {
    import.meta.hot.dispose(() => {
      lenis.destroy()
      cancelAnimationFrame(rafId)
    })
  }

  return {
    provide: {
      lenis,
    },
  }
})
