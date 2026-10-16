import type { Certification, Experience, Localized, Profile, Project } from '../../app/types'
import { databases, devops, frameworks, iot, languages, tools } from '../../app/utils/skillsData'
import profileYml from '../../content/profile.yml'
import projectsYml from '../../content/projects.yml'
import experienceYml from '../../content/experience.yml'
import certificationsYml from '../../content/certifications.yml'
import es from '../../i18n/locales/es.json'
import en from '../../i18n/locales/en.json'
import de from '../../i18n/locales/de.json'

export type Lang = 'es' | 'en' | 'de'
export const LANGS: Lang[] = ['es', 'en', 'de']
const MESSAGES = { es, en, de }

const profile = profileYml as Profile
const projects = projectsYml as Project[]
const experiences = experienceYml as Experience[]
const certifications = certificationsYml as Certification[]

export const pick = (value: Localized | undefined, lang: Lang): string => {
  if (!value) return ''
  if (typeof value === 'string') return value
  return value[lang]?.trim() ? value[lang]! : value.es
}

/** URL base sin barra final (NUXT_PUBLIC_SITE_URL). */
export const getBaseUrl = (event: Parameters<typeof useRuntimeConfig>[0]) =>
  (useRuntimeConfig(event).public.siteUrl as string).replace(/\/$/, '')

export const pageUrl = (base: string, lang: Lang) => (lang === 'es' ? `${base}/` : `${base}/${lang}`)

const abs = (base: string, path?: string) => (!path ? '' : path.startsWith('http') ? path : `${base}${path}`)

/** "2026-01" → "ene 2026" etc. */
const month = (value: string, lang: Lang) => {
  const [y, m] = value.split('-').map(Number)
  if (!m) return String(y)
  const locale = { es: 'es-CL', en: 'en-US', de: 'de-DE' }[lang]
  return new Intl.DateTimeFormat(locale, { month: 'short', year: 'numeric' }).format(new Date(y!, m - 1, 1))
}

/** /llms.txt — índice breve para agentes (formato llmstxt.org). */
export const buildLlmsTxt = (base: string): string => {
  const lines = [
    `# ${profile.name}`,
    '',
    `> ${pick(profile.seoDescription, 'en')}`,
    '',
    `${profile.name} (${pick(profile.title, 'en')}) is based in ${profile.location}. This site is his personal portfolio, available in Spanish, English and German.`,
    '',
    '## Site',
    '',
    ...LANGS.map(l => `- [Portfolio (${l.toUpperCase()})](${pageUrl(base, l)}): ${pick(profile.seoDescription, l)}`),
    `- [Full content as plain text](${base}/llms-full.txt): about, experience, skills, projects and certifications in all three languages`,
    '',
    '## Documents',
    '',
    `- [CV (Spanish, PDF)](${base}${profile.cv.es})`,
    `- [CV (English, PDF)](${base}${profile.cv.en})`,
    '',
    '## Projects',
    '',
    ...projects.map((p) => {
      const url = p.link ?? p.github
      const title = pick(p.title, 'en')
      return `- ${url ? `[${title}](${url})` : title}: ${pick(p.description, 'en')}`
    }),
    '',
    '## Contact',
    '',
    `- Email: ${profile.email}`,
    `- GitHub: ${profile.github}`,
    `- LinkedIn: ${profile.linkedin}`,
    '',
  ]
  return lines.join('\n')
}

/** /llms-full.txt — todo el contenido en Markdown, una sección por idioma. */
export const buildLlmsFull = (base: string): string => {
  const out: string[] = [`# ${profile.name} — portfolio (full content)`, '', `Source: ${base}/`, '']

  for (const lang of LANGS) {
    const m = MESSAGES[lang]
    const cv = lang === 'es' ? profile.cv.es : profile.cv.en
    out.push(
      `---`, '',
      `# [${lang.toUpperCase()}] ${profile.name} — ${pick(profile.title, lang)}`, '',
      `URL: ${pageUrl(base, lang)}`, '',
      `> ${pick(profile.shortBio, lang)}`, '',
      `## ${m.nav.about}`, '',
      pick(profile.longBio, lang), '',
      `- ${m.contact.location_label}: ${profile.location}`,
      `- ${m.contact.email_label}: ${profile.email}`,
      `- GitHub: ${profile.github}`,
      `- LinkedIn: ${profile.linkedin}`,
      `- CV: ${base}${cv}`, '',
      `## ${m.nav.experience}`, '',
    )
    for (const e of experiences) {
      const end = e.current ? m.experience.present : e.end ? month(e.end, lang) : ''
      out.push(`### ${pick(e.position, lang)} — ${e.company}`, '', `${month(e.start, lang)} – ${end}${e.location ? ` · ${e.location}` : ''}`, '')
      if (e.description) out.push(pick(e.description, lang), '')
      if (e.technologies?.length) out.push(`Tech: ${e.technologies.join(', ')}`, '')
    }

    out.push(`## ${m.nav.skills}`, '')
    const groups = { languages, frameworks, databases, devops, iot, tools } as const
    for (const [key, items] of Object.entries(groups)) {
      out.push(`- ${m.skills.cat[key as keyof typeof m.skills.cat]}: ${items.map(s => s.name).join(', ')}`)
    }
    out.push(`- ${m.skills.cat.ai}: ${['rag', 'llms', 'ollama', 'qwen', 'owasp'].map(k => m.skills.ai[k as 'rag'].name).join(', ')}`)
    if (profile.currentlyLearning?.length) out.push(`- ${m.skills.active_learning}: ${profile.currentlyLearning.join(', ')}`)
    out.push('', `## ${m.nav.projects}`, '')

    for (const p of projects) {
      out.push(`### ${pick(p.title, lang)}`, '')
      if (p.description) out.push(pick(p.description, lang), '')
      if (p.technologies?.length) out.push(`Tech: ${p.technologies.join(', ')}`)
      if (p.link) out.push(`${m.projects.demo}: ${p.link}`)
      if (p.github) out.push(`${m.projects.code}: ${p.github}`)
      out.push('')
    }

    out.push(`## ${m.nav.certifications}`, '')
    for (const c of certifications) {
      const meta = [c.institution, c.hours ? `${c.hours} h` : '', c.date && !c.inProgress ? month(c.date, lang) : '', c.inProgress ? m.certifications.in_progress_badge : '']
      out.push(`- ${pick(c.name, lang)} (${meta.filter(Boolean).join(', ')})${c.file ? ` — ${abs(base, c.file)}` : ''}`)
    }
    out.push('')
  }
  return out.join('\n')
}

export const buildSitemap = (base: string, lastmod: string): string => {
  const alternates = [
    ...LANGS.map(l => `    <xhtml:link rel="alternate" hreflang="${l}" href="${pageUrl(base, l)}"/>`),
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${pageUrl(base, 'es')}"/>`,
  ].join('\n')
  const urls = LANGS.map(l => `  <url>
    <loc>${pageUrl(base, l)}</loc>
    <lastmod>${lastmod}</lastmod>
${alternates}
  </url>`).join('\n')
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`
}

/** Crawlers de IA permitidos explícitamente (búsqueda, asistentes y entrenamiento). */
const AI_BOTS = [
  'GPTBot', 'OAI-SearchBot', 'ChatGPT-User',
  'ClaudeBot', 'Claude-SearchBot', 'Claude-User',
  'PerplexityBot', 'Perplexity-User',
  'Google-Extended', 'Applebot-Extended', 'CCBot',
]

export const buildRobots = (base: string): string => [
  'User-agent: *',
  'Allow: /',
  '',
  ...AI_BOTS.flatMap(bot => [`User-agent: ${bot}`, 'Allow: /', '']),
  `Sitemap: ${base}/sitemap.xml`,
  '',
].join('\n')
