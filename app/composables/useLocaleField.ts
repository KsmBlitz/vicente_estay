import type { Localized } from '~/types'

/**
 * Resuelve un texto traducible del contenido (/content/*.yml) al locale activo.
 * Si falta la traducción, usa el español.
 *
 * Usage:
 *   const { lf } = useLocaleField()
 *   lf(project.title)  // 'Portafolio Personal' | 'Personal Portfolio' | ...
 */
export const useLocaleField = () => {
  const { locale } = useI18n()

  const lf = (value: Localized | undefined): string => {
    if (!value) return ''
    if (typeof value === 'string') return value
    const translated = value[locale.value as keyof typeof value]
    return translated?.trim() ? translated : value.es
  }

  return { lf }
}
