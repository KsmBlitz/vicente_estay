# CLAUDE.md

Portafolio personal de Vicente Estay. Una sola página (one-page) con SSR, en 3 idiomas, con el contenido en archivos YAML dentro del repo y desplegado en Vercel (https://vicenteestay.vercel.app). Editor: VS Code.

## Comandos

```bash
npm install          # postinstall corre `nuxt prepare`
npm run dev          # http://localhost:3000 (los cambios en content/*.yml se recargan solos)
npm run build        # build SSR (lo mismo que hace Vercel)
npm run typecheck    # vue-tsc (debe terminar sin errores)
```

No hay tests ni ESLint. Para validar un cambio: `npm run build` y revisar en el navegador con `npm run dev`.

## Contenido (lo que más se edita)

Todo el contenido está en `content/` y se importa en build vía `@rollup/plugin-yaml`:

| Archivo | Sección |
|---|---|
| `content/profile.yml` | Hero, Sobre mí, Contacto, Footer, SEO, CV, "En formación activa" |
| `content/projects.yml` | Proyectos |
| `content/experience.yml` | Experiencia |
| `content/certifications.yml` | Certificaciones |

- **El orden del archivo es el orden en la página** (no hay campo `order`).
- Textos traducibles: string directo (igual en todos los idiomas) o `{ es, en, de }`. El español es obligatorio y es el fallback.
- Fechas como string `"AAAA-MM"` **entre comillas** (sin comillas, YAML podría convertirlas en `Date`).
- Imágenes en `public/images/` (WebP, ~1200px de ancho para proyectos) y PDF en `public/certificados/` o en la raíz de `public/` para los CV. Se referencian con ruta absoluta (`/images/...`).
- Usa `>-` para un párrafo largo y `|-` para varios párrafos (en `longBio`, cada línea en blanco es un `<p>`).
- Si agregas un campo: actualiza la interfaz en `app/types/index.ts` y léelo en el componente. Los YAML se castean a esos tipos en `useContent` y no se validan, así que un campo mal escrito simplemente no aparece.

## Arquitectura

- **Nuxt 4 con SSR** y srcDir `app/`. `app/pages/index.vue` es la única página: arma el SEO (`useHead`, JSON-LD) y compone las secciones.
- `app/components/*Section.vue`: una sección por componente (Hero → About → Experience → Skills → Projects → Certifications → Contact → Footer). Cada una lee sus datos con `useContent()`; no reciben props. Cada sección tiene un `id` que usan el NavBar y `useScrollTo`.
- Composables en `app/composables/`:
  - `useContent`: devuelve `profile`, `projects`, `experiences`, `certifications` tipados.
  - `useLocaleField` → `lf(valor)`: resuelve un `Localized` al locale activo con fallback a `es`.
  - `useScrollReveal`: IntersectionObserver que expone `isVisible` + `sectionRef` para las animaciones de entrada.
  - `useScrollTo`: usa Lenis (`$lenis`, plugin `lenis.client.ts`) si existe; si no, `scrollIntoView`.
- `app/utils/date.ts`: `formatMonth` (fechas según locale) y `monthsBetween`.
- `app/utils/skillsData.ts`: el stack técnico (logos de la sección Skills) está en TypeScript, no en YAML. `TECH_COUNT` alimenta el contador del Hero.
- Formulario de contacto: POST a Formspree (`runtimeConfig.public.formspreeUrl`).
- Analytics: `@vercel/analytics` vía `plugins/analytics.client.ts`.
- `public/robots.txt` y `public/sitemap.xml` son estáticos (la fecha del sitemap se actualiza a mano).

## i18n de la interfaz

- Locales: `es` (por defecto, sin prefijo), `en` (`/en`), `de` (`/de`). Estrategia `prefix_except_default`.
- Textos de UI en `i18n/locales/{es,en,de}.json`. **Toda clave nueva va en los tres archivos.** Nada de strings en español hardcodeados en los componentes: usar `t('...')`.
- Para fechas, usar el locale activo (no arrays de meses en español).

## Diseño y animaciones

Estilo minimalista: tipografía Geist / Geist Mono (`@nuxt/fonts`), grises `zinc`, **un solo acento** y mucho espacio en blanco. Evitar volver a agregar efectos decorativos (partículas, orbes, tilt 3D, parallax, números gigantes de fondo).

- **Tokens y clases reutilizables** en `app/assets/css/main.css`: `--accent` (cambia el color de acento de todo el sitio), `.container-x`, `.section`, `.eyebrow`, `.btn` / `.btn-primary` / `.btn-outline`, `.chip` / `.chip-mono`, `.field`, `.link-arrow`. Usarlas antes de escribir clases largas de Tailwind.
- **Tema**: sigue al sistema (`colorMode.preference: 'system'`) con toggle manual. Dar siempre variante `dark:`. Para íconos que dependen del tema usar `dark:hidden` / `hidden dark:block` en vez de estado JS (evita desajustes de hidratación).
- **Animaciones de entrada**: poner `data-reveal` (y opcional `style="--reveal-delay: 200ms"`) en un contenedor; `plugins/reveal.client.ts` agrega `data-in` al entrar en pantalla. `SplitText` hace lo mismo palabra por palabra. Solo actúan con JS (`html[data-js]`) y se desactivan con `prefers-reduced-motion`. No poner `data-reveal` en el mismo elemento que tiene `transition`/`transform` propios (hover): usar un contenedor aparte.
- Nuevas secciones: usar `<SectionHeader index="0X" ...>`; el número sigue el orden de la página (hoy 01–06).
- Easing común: `ease-out-expo` (Tailwind) / `var(--ease)` (CSS). Duraciones 300–900 ms.
- Íconos: SVG inline (Heroicons). Redes sociales: `SocialLinks`. Logos de tecnologías: devicon vía jsDelivr.

## Convenciones de código

- Vue 3 `<script setup lang="ts">`, Composition API, auto-imports de Nuxt (no importar `ref`, `computed`, etc.).
- Estilos con Tailwind v3 (`tailwind.config.ts`; el `content` lo agrega el módulo).
- Accesibilidad: `aria-label` en botones de ícono, `aria-expanded` en menús, foco visible (ya definido en `main.css`), `role="alert"`/`status` en mensajes de formularios.
- Contenido visible para buscadores y agentes: lo que importa (nombre, título, cifras) debe estar en el HTML del SSR, no solo aparecer tras una animación en el cliente. Los contadores del Hero parten con el valor real.

## Commits

Conventional Commits con **scope obligatorio** (estilo Gentleman.Dots):

```
type(scope): descripción en minúsculas
```

- Tipos: `feat`, `fix`, `docs`, `chore`, `refactor`, `style`.
- Scopes: `hero`, `about`, `experience`, `skills`, `projects`, `certifications`, `contact`, `nav`, `footer`, `app` (app.vue, pages, nuxt.config.ts), `content` (content/*.yml y assets en public/), `seo`, `i18n`, `deps`.
- Descripción en minúsculas, sin punto final; en español está bien.
- Si un cambio toca varios scopes, separar commits o usar el más relevante.

Ejemplos: `feat(content): agregar certificación de aws`, `fix(experience): formatear fechas según el locale`, `chore(deps): actualizar nuxt a 4.2.2`.
