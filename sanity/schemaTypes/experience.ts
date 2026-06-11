import { defineType, defineField } from 'sanity'

export const experience = defineType({
  name: 'experience',
  title: 'Experiencia Laboral',
  type: 'document',
  fields: [
    defineField({
      name: 'company',
      title: 'Empresa',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'position',
      title: 'Cargo (ES)',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'position_en',
      title: 'Position (EN)',
      type: 'string',
    }),
    defineField({
      name: 'position_de',
      title: 'Position (DE)',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Descripción (ES)',
      type: 'text',
      rows: 4,
      description: 'Tareas, logros y responsabilidades principales'
    }),
    defineField({
      name: 'description_en',
      title: 'Description (EN)',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'description_de',
      title: 'Beschreibung (DE)',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'startDate',
      title: 'Fecha de Inicio',
      type: 'date',
      options: { dateFormat: 'YYYY-MM' },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'endDate',
      title: 'Fecha de Término',
      type: 'date',
      options: { dateFormat: 'YYYY-MM' },
      description: 'Dejar vacío si es el trabajo actual'
    }),
    defineField({
      name: 'current',
      title: '¿Trabajo Actual?',
      type: 'boolean',
      initialValue: false
    }),
    defineField({
      name: 'technologies',
      title: 'Tecnologías',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' }
    }),
    defineField({
      name: 'location',
      title: 'Ubicación / Modalidad',
      type: 'string',
      description: 'Ej: Remoto, Santiago, Chile, Híbrido'
    }),
    defineField({
      name: 'companyUrl',
      title: 'Sitio Web de la Empresa',
      type: 'url',
    }),
    defineField({
      name: 'order',
      title: 'Orden de Aparición',
      type: 'number',
      description: 'Menor número = aparece primero (más reciente)',
      initialValue: 0
    })
  ],
  orderings: [
    {
      title: 'Más reciente primero',
      name: 'startDateDesc',
      by: [{ field: 'startDate', direction: 'desc' }]
    }
  ],
  preview: {
    select: {
      title: 'position',
      subtitle: 'company'
    }
  }
})
