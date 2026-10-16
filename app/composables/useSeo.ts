import { databases, devops, frameworks, iot, languages, tools } from '~/utils/skillsData'

const OG_LOCALE: Record<string, string> = { es: 'es_CL', en: 'en_US', de: 'de_DE' }
const AI_TOPICS = ['RAG', 'LLMs', 'Ollama', 'OWASP Top 10']

/**
 * SEO de la página: meta tags, Open Graph, hreflang, canónica y JSON-LD (schema.org).
 * Todo sale de /content y del locale activo; la URL base es NUXT_PUBLIC_SITE_URL.
 */
export const useSeo = () => {
  const { locale, locales } = useI18n()
  const { public: { siteUrl, buildDate } } = useRuntimeConfig()
  const { profile, projects, certifications } = useContent()
  const { lf } = useLocaleField()

  const base = siteUrl.replace(/\/$/, '')
  const urlFor = (code: string) => (code === 'es' ? `${base}/` : `${base}/${code}`)
  const abs = (path?: string) => (!path ? undefined : path.startsWith('http') ? path : `${base}${path}`)

  const title = computed(() => `${profile.name} - ${lf(profile.title)}`)
  const description = computed(() => lf(profile.seoDescription))
  const pageUrl = computed(() => urlFor(locale.value))
  const ogImage = computed(() => `${base}/og/og-${locale.value}.png`)
  const codes = computed(() => (locales.value as { code: string }[]).map(l => l.code))

  const personId = `${base}/#person`
  const websiteId = `${base}/#website`

  const jsonLd = computed(() => {
    const skills = [languages, frameworks, databases, devops, iot, tools].flat().map(s => s.name)

    return {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebSite',
          '@id': websiteId,
          url: `${base}/`,
          name: profile.name,
          inLanguage: codes.value,
          publisher: { '@id': personId },
        },
        {
          '@type': 'ProfilePage',
          '@id': `${pageUrl.value}#profilepage`,
          url: pageUrl.value,
          name: title.value,
          description: description.value,
          inLanguage: locale.value,
          dateModified: buildDate,
          isPartOf: { '@id': websiteId },
          mainEntity: { '@id': personId },
        },
        {
          '@type': 'Person',
          '@id': personId,
          name: profile.name,
          jobTitle: lf(profile.title),
          description: lf(profile.shortBio),
          url: `${base}/`,
          image: { '@type': 'ImageObject', url: abs(profile.photo), width: 683, height: 913 },
          email: profile.email,
          sameAs: [profile.github, profile.linkedin],
          homeLocation: { '@type': 'Place', name: profile.location },
          alumniOf: profile.alumniOf?.map(o => ({ '@type': 'CollegeOrUniversity', name: o.name, url: o.url })),
          knowsAbout: [...skills, ...AI_TOPICS],
          knowsLanguage: ['es', 'en', 'de'],
          hasCredential: certifications.map(c => ({
            '@type': 'EducationalOccupationalCredential',
            name: lf(c.name),
            credentialCategory: 'certificate',
            recognizedBy: { '@type': 'Organization', name: c.institution },
            url: abs(c.file),
          })),
        },
        {
          '@type': 'ItemList',
          '@id': `${pageUrl.value}#projects`,
          name: lf({ es: 'Proyectos', en: 'Projects', de: 'Projekte' }),
          itemListElement: projects.map((p, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            item: {
              '@type': 'CreativeWork',
              name: lf(p.title),
              description: lf(p.description),
              url: p.link ?? p.github,
              image: abs(p.image),
              keywords: p.technologies?.join(', '),
              author: { '@id': personId },
            },
          })),
        },
      ],
    }
  })

  useHead({
    title: () => title.value,
    htmlAttrs: { lang: () => locale.value },
    meta: [
      { name: 'description', content: () => description.value },
      { name: 'author', content: profile.name },
      { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
      { name: 'theme-color', content: '#ffffff', media: '(prefers-color-scheme: light)' },
      { name: 'theme-color', content: '#09090b', media: '(prefers-color-scheme: dark)' },
      { property: 'og:type', content: 'profile' },
      { property: 'og:site_name', content: profile.name },
      { property: 'og:url', content: () => pageUrl.value },
      { property: 'og:title', content: () => title.value },
      { property: 'og:description', content: () => description.value },
      { property: 'og:image', content: () => ogImage.value },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:image:alt', content: () => title.value },
      { property: 'og:locale', content: () => OG_LOCALE[locale.value] },
      ...codes.value.filter(c => c !== locale.value).map(c => ({ property: 'og:locale:alternate', content: OG_LOCALE[c] })),
      { property: 'profile:first_name', content: 'Vicente' },
      { property: 'profile:last_name', content: 'Estay Valdivia' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: () => title.value },
      { name: 'twitter:description', content: () => description.value },
      { name: 'twitter:image', content: () => ogImage.value },
      { name: 'twitter:image:alt', content: () => title.value },
    ],
    link: [
      { rel: 'icon', type: 'image/png', href: '/icon.png' },
      { rel: 'apple-touch-icon', href: '/icon.png' },
      { rel: 'canonical', href: () => pageUrl.value },
      ...codes.value.map(c => ({ rel: 'alternate', hreflang: c, href: urlFor(c) })),
      { rel: 'alternate', hreflang: 'x-default', href: urlFor('es') },
      { rel: 'alternate', type: 'text/plain', title: 'llms.txt', href: '/llms.txt' },
      { rel: 'preconnect', href: 'https://cdn.jsdelivr.net' },
    ],
    script: [{ type: 'application/ld+json', innerHTML: () => JSON.stringify(jsonLd.value) }],
  })
}
