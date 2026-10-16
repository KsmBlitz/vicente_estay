# Vicente Estay — Portfolio Personal

Portafolio personal construido con Nuxt 4, Vue 3 y Tailwind CSS. El contenido vive en archivos YAML dentro del repo y el sitio se despliega en Vercel.

---

## Stack Tecnologico

| Capa | Tecnologia |
|---|---|
| Framework | Nuxt 4 (SSR) |
| UI | Vue 3 + Composition API |
| Estilos | Tailwind CSS v3 |
| Contenido | Archivos YAML en `content/` |
| i18n | `@nuxtjs/i18n` (es, en, de) |
| Formulario | Formspree |
| Analytics | Vercel Analytics |
| Despliegue | Vercel |

---

## Editar el contenido

Todo el texto del sitio está en `content/`:

| Archivo | Qué contiene |
|---|---|
| `content/profile.yml` | Nombre, título, bios, fotos, redes, CV, "en formación activa" |
| `content/projects.yml` | Proyectos |
| `content/experience.yml` | Experiencia laboral |
| `content/certifications.yml` | Certificaciones |

1. Abre el archivo y cambia el texto. Cada archivo explica su formato en los comentarios del inicio.
2. Si agregas una imagen o PDF, ponlo en `public/images/` o `public/certificados/` y escribe su ruta (`/images/mi-foto.webp`).
3. Revisa con `npm run dev` y haz push a `main`: Vercel publica solo.

Los textos traducibles se escriben así; si falta un idioma, se muestra el español:

```yaml
title:
  es: Portafolio Personal
  en: Personal Portfolio
  de: Persönliches Portfolio
```

---

## Estructura del Proyecto

```
/
├── content/                 # ← contenido editable (YAML)
├── app/
│   ├── app.vue              # Layout: navbar, barra de progreso, botón volver arriba
│   ├── pages/index.vue      # Página única: SEO y composición de secciones
│   ├── components/          # Una sección por componente
│   ├── composables/         # useContent, useLocaleField, useScrollReveal, useScrollTo
│   ├── utils/skillsData.ts  # Stack técnico de la sección Skills
│   └── types/               # Tipos del contenido
├── i18n/locales/            # Textos de la interfaz (es, en, de)
├── public/                  # Imágenes, CV, certificados, robots.txt, sitemap.xml
└── nuxt.config.ts
```

---

## Desarrollo Local

Requisitos: Node.js >= 20.

```bash
npm install
npm run dev        # http://localhost:3000
```

| Comando | Descripcion |
|---|---|
| `npm run dev` | Servidor de desarrollo con hot-reload |
| `npm run build` | Build de produccion |
| `npm run preview` | Vista previa del build |
| `npm run typecheck` | Chequeo de tipos |

---

## Variables de Entorno

Opcionales; tienen valores por defecto en `nuxt.config.ts`.

| Variable | Uso |
|---|---|
| `NUXT_PUBLIC_SITE_URL` | URL canónica del sitio (SEO) |
| `NUXT_PUBLIC_FORMSPREE_URL` | Endpoint del formulario de contacto |

---

## Convenciones de Commits

[Conventional Commits](https://www.conventionalcommits.org/) con scope obligatorio:

```
type(scope): descripcion en minusculas
```

Tipos: `feat`, `fix`, `docs`, `chore`, `refactor`, `style`

Scopes: `hero`, `about`, `experience`, `skills`, `projects`, `certifications`, `contact`, `nav`, `footer`, `app`, `content`, `seo`, `i18n`, `deps`
