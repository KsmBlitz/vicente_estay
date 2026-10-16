/**
 * Animaciones de entrada: marca con `data-in` los elementos [data-reveal] y
 * [data-reveal-split] cuando entran en pantalla. Los estilos están en main.css.
 */
export default defineNuxtPlugin((nuxtApp) => {
  const SELECTOR = '[data-reveal]:not([data-in]), [data-reveal-split]:not([data-in])'

  const show = (el: Element) => el.setAttribute('data-in', '')

  if (!('IntersectionObserver' in window)) {
    nuxtApp.hook('app:mounted', () => document.querySelectorAll(SELECTOR).forEach(show))
    return
  }

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        show(entry.target)
        io.unobserve(entry.target)
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
  )

  const scan = (root: ParentNode) => root.querySelectorAll(SELECTOR).forEach(el => io.observe(el))

  nuxtApp.hook('app:mounted', () => {
    scan(document)
    // Elementos que aparecen después (p. ej. al filtrar proyectos)
    new MutationObserver((mutations) => {
      for (const { addedNodes } of mutations) {
        addedNodes.forEach((node) => {
          if (node.nodeType !== Node.ELEMENT_NODE) return
          const el = node as Element
          if (el.matches(SELECTOR)) io.observe(el)
          scan(el)
        })
      }
    }).observe(document.body, { childList: true, subtree: true })
  })
})
