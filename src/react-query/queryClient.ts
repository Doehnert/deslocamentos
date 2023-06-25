import { QueryCache, QueryClient } from 'react-query'
import toast from 'react-hot-toast'

function queryErrorHandler(error: any) {
  const title = error?.response?.data ?? 'error connecting to server'

  toast.error(title)
}

export const generateQueryClient = () => {
  return new QueryClient({
    queryCache: new QueryCache({
      onError: queryErrorHandler,
    }),
    defaultOptions: {
      queries: {
        retry: 1,
        staleTime: 600000, // 10 minutes
        cacheTime: 900000, // 15 minutes
        refetchOnMount: true,
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
      },
      mutations: {
        onError: queryErrorHandler,
      },
    },
  })
}

export const queryClient = generateQueryClient()
