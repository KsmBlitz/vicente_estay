/**
 * Composable that picks the locale-specific variant of a Sanity field.
 * Falls back to the base (Spanish) field if the locale variant is missing.
 *
 * Usage:
 *   const { lf } = useLocaleField()
 *   lf(project, 'title')  // returns title_en or title_de when not in 'es'
 */
export const useLocaleField = () => {
  const { locale } = useI18n()

  const lf = (
    obj: Record<string, unknown> | null | undefined,
    field: string,
  ): string | undefined => {
    if (!obj) return undefined
    const localeField = locale.value !== 'es' ? `${field}_${locale.value}` : field
    const localeValue = obj[localeField]
    if (localeValue && typeof localeValue === 'string' && localeValue.trim() !== '') {
      return localeValue
    }
    const fallback = obj[field]
    return typeof fallback === 'string' ? fallback : undefined
  }

  return { lf }
}
