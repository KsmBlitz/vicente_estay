import type { Certification, Experience, Profile, Project } from '~/types'
import profile from '~~/content/profile.yml'
import projects from '~~/content/projects.yml'
import experiences from '~~/content/experience.yml'
import certifications from '~~/content/certifications.yml'
import { monthsBetween } from '~/utils/date'

/**
 * Contenido del sitio, leído desde /content/*.yml en tiempo de build.
 * Para cambiar textos, edita esos archivos; no hace falta tocar componentes.
 */
export const useContent = () => {
  const exps = experiences as Experience[]
  // Años de experiencia = desde el inicio de la experiencia más antigua hasta hoy (se recalcula en cada build)
  const first = exps.map((e) => e.start).sort()[0]
  const yearsExperience = first ? Math.max(1, Math.floor((monthsBetween(first) - 1) / 12)) : 0
  return {
    profile: profile as Profile,
    projects: projects as Project[],
    experiences: exps,
    certifications: certifications as Certification[],
    yearsExperience,
  }
}
