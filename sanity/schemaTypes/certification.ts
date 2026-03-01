import { defineType, defineField } from 'sanity'

export const certification = defineType({
  name: 'certification',
  title: 'Certificaciones',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nombre del Certificado (ES)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'name_en',
      title: 'Certificate Name (EN)',
      type: 'string',
    }),
    defineField({
      name: 'name_de',
      title: 'Zertifikatsname (DE)',
      type: 'string',
    }),
    defineField({
      name: 'institution',
      title: 'Institución / Plataforma',
      type: 'string',
      description: 'Ej: Udemy, Coursera, Platzi, Universidad de Chile...',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'hours',
      title: 'Cantidad de Horas',
      type: 'number',
      description: 'Duración total del curso o certificación en horas',
    }),
    defineField({
      name: 'issueDate',
      title: 'Fecha de Emisión',
      type: 'date',
      options: {
        dateFormat: 'YYYY-MM',
      },
    }),
    defineField({
      name: 'inProgress',
      title: 'En Curso',
      type: 'boolean',
      description: 'Activa esta opción si el curso o certificación aún está en progreso',
      initialValue: false,
    }),
    defineField({
      name: 'certificate',
      title: 'Archivo PDF del Certificado',
      type: 'file',
      options: {
        accept: '.pdf',
      },
      description: 'Sube el PDF del certificado para que los visitantes puedan descargarlo',
    }),
  ],
  orderings: [
    {
      title: 'Fecha de emisión (más reciente)',
      name: 'issueDateDesc',
      by: [{ field: 'issueDate', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'institution',
    },
  },
})
