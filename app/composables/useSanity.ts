import { createClient } from '@sanity/client'

let _client: ReturnType<typeof createClient> | null = null

export const useSanity = () => {
  if (!_client) {
    const config = useRuntimeConfig()
    _client = createClient({
      projectId: config.public.sanityProjectId,
      dataset: config.public.sanityDataset,
      apiVersion: config.public.sanityApiVersion,
      useCdn: true,
    })
  }
  return { client: _client }
}

export const useSanityQuery = async <T>(query: string, key?: string) => {
  const { client } = useSanity()
  const queryKey = key || `sanity-${query.slice(0, 50).replace(/[^a-zA-Z0-9]/g, '')}`
  const data = await useAsyncData<T>(queryKey, () => client.fetch(query))
  return data
}
