export interface Project {
  title: string
  imageUrl?: string
  description?: string
  technologies?: string[]
  link?: string
  github?: string
}

export interface Profile {
  name: string
  title?: string
  photoUrl?: string
  aboutPhotoUrl?: string
  shortBio?: string
  longBio?: string
  yearsExperience?: number
  projectsCompleted?: number
  location?: string
  email?: string
  github?: string
  linkedin?: string
}

export interface Certification {
  name: string
  institution: string
  hours?: number
  issueDate?: string
  inProgress?: boolean
  fileUrl?: string
}

export interface ParticleStyle {
  left: string
  width: string
  height: string
  animationDuration: string
  animationDelay: string
  '--particle-opacity': number
}
