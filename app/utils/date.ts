const INTL_LOCALE: Record<string, string> = { es: 'es-CL', en: 'en-US', de: 'de-DE' }

/** "2026-01" → "ene 2026" / "Jan 2026" / "Jan. 2026" según el locale. */
export const formatMonth = (value: string, locale: string): string => {
  const [year, month] = value.split('-').map(Number)
  if (!month) return String(year)
  return new Intl.DateTimeFormat(INTL_LOCALE[locale] ?? locale, { month: 'short', year: 'numeric' })
    .format(new Date(year!, month - 1, 1))
}

/** Meses entre dos "AAAA-MM", contando ambos extremos (sin `end` = hasta hoy). */
export const monthsBetween = (start: string, end?: string): number => {
  const [sy, sm] = start.split('-').map(Number)
  const to = end ? end.split('-').map(Number) : [new Date().getFullYear(), new Date().getMonth() + 1]
  return (to[0]! - sy!) * 12 + (to[1]! - sm!) + 1
}
