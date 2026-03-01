import { defineType, defineField } from 'sanity'

export const project = defineType({
  name: 'project',
  title: 'Proyectos',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título del Proyecto (ES)',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'title_en',
      title: 'Project Title (EN)',
      type: 'string',
    }),
    defineField({
      name: 'title_de',
      title: 'Projekttitel (DE)',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Imagen Principal',
      type: 'image',
      options: {
        hotspot: true, // Permite recortar la imagen en el editor
      },
    }),
    defineField({
      name: 'description',
      title: 'Descripción Corta (ES)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'description_en',
      title: 'Short Description (EN)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'description_de',
      title: 'Kurzbeschreibung (DE)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'technologies',
      title: 'Tecnologías Usadas',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'link',
      title: 'Enlace al Proyecto (URL)',
      type: 'url',
    }),
    defineField({
      name: 'github',
      title: 'Enlace al Repositorio GitHub',
      type: 'url',
    }),
  ],
})