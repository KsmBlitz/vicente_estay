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
      title: 'Título Profesional',
      type: 'string',
      description: 'Ej: Desarrollador Full Stack, Ingeniero de Software, etc.'
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
      title: 'Biografía Corta (Hero)',
      type: 'text',
      rows: 2,
      description: 'Descripción corta para la sección principal'
    }),
    defineField({
      name: 'longBio',
      title: 'Biografía Larga (Sobre Mí)',
      type: 'text',
      rows: 4,
      description: 'Descripción más detallada para la sección Sobre Mí'
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
