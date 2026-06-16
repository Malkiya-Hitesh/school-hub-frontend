import { ITEMS_PER_PAGE } from '@/lib/constants'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? '/api'

async function fetcher(url) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`API error: ${res.status}`)
  return res.json()
}

export const schoolApi = {
  getSchools: (query, filters, page, sortBy, sortOrder) => {
    const params = new URLSearchParams({
      q: query,
      page: String(page),
      limit: String(ITEMS_PER_PAGE),
      sortBy,
      sortOrder,
      ...Object.fromEntries(
        Object.entries(filters).filter(([, v]) => v !== undefined)
      ),
    })
    return fetcher(`${BASE_URL}/schools?${params}`)
  },

  getSchoolById: (id) =>
    fetcher(`${BASE_URL}/schools/${id}`),

  getNearbySchools: (lat, lng, radius = 10) =>
    fetcher(`${BASE_URL}/schools/nearby?lat=${lat}&lng=${lng}&radius=${radius}`),
}