/**
 * Texto traducible: un string (igual en todos los idiomas) o un objeto por idioma.
 * El español es obligatorio y es el fallback cuando falta otro idioma.
 */
export type Localized = string | { es: string; en?: string; de?: string }

export interface Project {
  title: Localized
  description?: Localized
  image?: string
  technologies?: string[]
  link?: string
  github?: string
}

export interface Profile {
  name: string
  title: Localized
  shortBio: Localized
  seoDescription: Localized
  longBio: Localized
  photo?: string
  aboutPhoto?: string
  yearsExperience: number
  location: string
  email: string
  github: string
  linkedin: string
  cv: { es: string; en: string }
  alumniOf?: { name: string; url?: string }[]
  currentlyLearning?: string[]
}

export interface Experience {
  company: string
  companyUrl?: string
  position: Localized
  description?: Localized
  /** "AAAA-MM" */
  start: string
  /** "AAAA-MM" */
  end?: string
  current?: boolean
  location?: string
  technologies?: string[]
}

export interface Certification {
  name: Localized
  institution: string
  hours?: number
  /** "AAAA-MM" */
  date?: string
  inProgress?: boolean
  /** Ruta del PDF en /public */
  file?: string
}

export interface ParticleStyle {
  left: string
  width: string
  height: string
  animationDuration: string
  animationDelay: string
  '--particle-opacity': number
}
