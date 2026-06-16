import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 60 * 24,   // 24 hours fresh
      gcTime:1000 * 60 * 60 * 24,      // 24 hours cache
      refetchOnWindowFocus: false,
      retry: 2,
    },
  },
})