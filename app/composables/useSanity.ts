import { createClient } from '@sanity/client'

export const useSanity = () => {
  const config = useRuntimeConfig()
  
  const client = createClient({
    projectId: config.public.sanityProjectId,
    dataset: config.public.sanityDataset,
    apiVersion: config.public.sanityApiVersion,
    useCdn: true
  })

  return { client }
}

export const useSanityQuery = async <T>(query: string, key?: string) => {
  const { client } = useSanity()
  // Generar una key única basada en el query si no se proporciona
  const queryKey = key || `sanity-${query.slice(0, 50).replace(/[^a-zA-Z0-9]/g, '')}`
  const data = await useAsyncData<T>(queryKey, () => client.fetch(query))
  return data
}
