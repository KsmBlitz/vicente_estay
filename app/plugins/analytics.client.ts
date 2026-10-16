// Se carga cuando el navegador está libre: no compite con el render inicial
export default defineNuxtPlugin(() => {
  const start = () => import('@vercel/analytics').then(({ inject }) => inject())
  if ('requestIdleCallback' in window) requestIdleCallback(start, { timeout: 3000 })
  else setTimeout(start, 1500)
})
