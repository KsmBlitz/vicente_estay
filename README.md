# Vicente Estay — Portfolio Personal

Portafolio personal construido con Nuxt 4, Vue 3 y Tailwind CSS, con contenido gestionado mediante Sanity CMS y desplegado en Vercel.

---

## Stack Tecnologico

| Capa | Tecnologia |
|---|---|
| Framework | Nuxt 4 (modo SPA) |
| UI | Vue 3 + Composition API |
| Estilos | Tailwind CSS v3 |
| CMS | Sanity v5 |
| Analytics | Vercel Analytics |
| Despliegue | Vercel |

---

## Estructura del Proyecto

```
/
├── app/
│   ├── app.vue                  # Entrada principal, queries a Sanity y SEO
│   └── components/
│       ├── NavBar.vue
│       ├── HeroSection.vue
│       ├── AboutSection.vue
│       ├── SkillsSection.vue
│       ├── ProjectsSection.vue
│       ├── ContactSection.vue
│       └── FooterSection.vue
├── sanity/
│   ├── sanity.config.ts         # Configuracion del estudio
│   └── schemaTypes/             # Schemas de contenido (profile, project)
├── nuxt.config.ts
├── tailwind.config.ts
└── package.json
```

---

## Requisitos Previos

- Node.js >= 18
- npm >= 9
- Cuenta en [Sanity.io](https://www.sanity.io) con acceso al proyecto `2il0jzpa`

---

## Instalacion

### 1. Instalar dependencias de la app

```bash
npm install
```

### 2. Instalar dependencias de Sanity Studio

```bash
cd sanity
npm install
```

---

## Desarrollo Local

### Levantar la app (Nuxt)

Desde la raiz del proyecto:

```bash
npm run dev
```

La aplicacion estara disponible en `http://localhost:3000`.

### Levantar Sanity Studio

Desde la carpeta `sanity/`:

```bash
cd sanity
npm run dev
```

El estudio estara disponible en `http://localhost:3333`.

> Para desarrollo completo se recomienda correr ambos servicios en terminales separadas.

---

## Scripts Disponibles

### App (raiz del proyecto)

| Comando | Descripcion |
|---|---|
| `npm run dev` | Servidor de desarrollo con hot-reload |
| `npm run build` | Build de produccion |
| `npm run generate` | Generacion estatica (SSG) |
| `npm run preview` | Vista previa del build |

### Sanity Studio (`/sanity`)

| Comando | Descripcion |
|---|---|
| `npm run dev` | Estudio local en modo desarrollo |
| `npm run build` | Build del estudio |
| `npm run deploy` | Deploy del estudio a Sanity hosting |

---

## Variables de Entorno

Las variables de Sanity estan configuradas directamente en `nuxt.config.ts` dentro de `runtimeConfig.public`. No se requiere archivo `.env` para el desarrollo local.

| Variable | Valor |
|---|---|
| `sanityProjectId` | `2il0jzpa` |
| `sanityDataset` | `production` |
| `sanityApiVersion` | `2024-03-20` |

---

## Contenido Gestionado con Sanity

El portafolio consume dos tipos de documentos desde el dataset `production`:

- **`profile`** — Nombre, titulo, bio, foto, redes sociales, estadisticas
- **`project`** — Titulo, imagen, descripcion, tecnologias, links

Para editar el contenido, acceder al Sanity Studio en local (`http://localhost:3333`) o al estudio desplegado.

---

## Despliegue

La app esta configurada para despliegue automatico en Vercel al hacer push a `main`. No se requiere configuracion adicional; las variables de `runtimeConfig` se inyectan en build time.

---

## Convenciones de Commits

Este proyecto sigue [Conventional Commits](https://www.conventionalcommits.org/) con scope obligatorio:

```
type(scope): descripcion en minusculas
```

Tipos: `feat`, `fix`, `docs`, `chore`, `refactor`, `style`

Scopes: `hero`, `skills`, `projects`, `about`, `contact`, `nav`, `footer`, `app`, `deps`, `sanity`
