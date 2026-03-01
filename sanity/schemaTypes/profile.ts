import { defineType, defineField } from 'sanity'

export const profile = defineType({
  name: 'profile',
  title: 'Perfil',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nombre',
      type: 'string',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'title',
      title: 'Título Profesional (ES)',
      type: 'string',
      description: 'Ej: Desarrollador Full Stack, Ingeniero de Software, etc.'
    }),
    defineField({
      name: 'title_en',
      title: 'Título Profesional (EN)',
      type: 'string',
      description: 'E.g.: Full Stack Developer, Software Engineer, etc.'
    }),
    defineField({
      name: 'title_de',
      title: 'Berufstitel (DE)',
      type: 'string',
      description: 'z.B.: Full-Stack-Entwickler, Software-Ingenieur, usw.'
    }),
    defineField({
      name: 'photo',
      title: 'Foto de Perfil',
      type: 'image',
      options: {
        hotspot: true
      }
    }),
    defineField({
      name: 'aboutPhoto',
      title: 'Foto Sección Sobre Mí',
      type: 'image',
      options: {
        hotspot: true
      }
    }),
    defineField({
      name: 'shortBio',
      title: 'Biografía Corta – Hero (ES)',
      type: 'text',
      rows: 2,
      description: 'Descripción corta para la sección principal'
    }),
    defineField({
      name: 'shortBio_en',
      title: 'Short Bio – Hero (EN)',
      type: 'text',
      rows: 2,
      description: 'Short description for the hero section in English'
    }),
    defineField({
      name: 'shortBio_de',
      title: 'Kurzbeschreibung – Hero (DE)',
      type: 'text',
      rows: 2,
      description: 'Kurze Beschreibung für den Hero-Bereich auf Deutsch'
    }),
    defineField({
      name: 'longBio',
      title: 'Biografía Larga – Sobre Mí (ES)',
      type: 'text',
      rows: 4,
      description: 'Descripción más detallada para la sección Sobre Mí'
    }),
    defineField({
      name: 'longBio_en',
      title: 'Long Bio – About Me (EN)',
      type: 'text',
      rows: 4,
      description: 'Detailed description for the About Me section in English'
    }),
    defineField({
      name: 'longBio_de',
      title: 'Ausführliche Biografie – Über mich (DE)',
      type: 'text',
      rows: 4,
      description: 'Ausführliche Beschreibung für den Über-mich-Bereich auf Deutsch'
    }),
    defineField({
      name: 'yearsExperience',
      title: 'Años de Experiencia',
      type: 'number'
    }),
    defineField({
      name: 'projectsCompleted',
      title: 'Proyectos Completados',
      type: 'number'
    }),
    defineField({
      name: 'location',
      title: 'Ubicación',
      type: 'string'
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string'
    }),
    defineField({
      name: 'github',
      title: 'GitHub URL',
      type: 'url'
    }),
    defineField({
      name: 'linkedin',
      title: 'LinkedIn URL',
      type: 'url'
    })
  ],
  preview: {
    select: {
      title: 'name',
      media: 'photo'
    }
  }
})
