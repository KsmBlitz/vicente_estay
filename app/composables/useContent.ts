import type { Certification, Experience, Profile, Project } from '~/types'
import profile from '~~/content/profile.yml'
import projects from '~~/content/projects.yml'
import experiences from '~~/content/experience.yml'
import certifications from '~~/content/certifications.yml'

/**
 * Contenido del sitio, leído desde /content/*.yml en tiempo de build.
 * Para cambiar textos, edita esos archivos; no hace falta tocar componentes.
 */
export const useContent = () => ({
  profile: profile as Profile,
  projects: projects as Project[],
  experiences: experiences as Experience[],
  certifications: certifications as Certification[],
})
