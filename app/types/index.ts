export interface Project {
  title: string
  title_en?: string
  title_de?: string
  imageUrl?: string
  description?: string
  description_en?: string
  description_de?: string
  technologies?: string[]
  link?: string
  github?: string
}

export interface Profile {
  name: string
  title?: string
  title_en?: string
  title_de?: string
  photoUrl?: string
  aboutPhotoUrl?: string
  shortBio?: string
  shortBio_en?: string
  shortBio_de?: string
  longBio?: string
  longBio_en?: string
  longBio_de?: string
  yearsExperience?: number
  projectsCompleted?: number
  location?: string
  email?: string
  github?: string
  linkedin?: string
}

export interface Certification {
  name: string
  name_en?: string
  name_de?: string
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
