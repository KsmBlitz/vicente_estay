import { buildRobots, getBaseUrl } from '../utils/siteContent'

export default defineEventHandler((event) => {
  setHeader(event, 'content-type', 'text/plain; charset=utf-8')
  setHeader(event, 'cache-control', 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400')
  return buildRobots(getBaseUrl(event))
})
