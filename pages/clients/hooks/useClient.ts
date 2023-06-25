import { useQuery } from 'react-query'
import useAxios from '../../../src/axiosInstance'
import { queryKeys } from '../../../src/react-query/constants'

const fallback = null

export function useClient(clientId: number | null) {
  const { axiosInstance } = useAxios()

  async function getClient() {
    if (!clientId) return null
    const { data } = await axiosInstance({
      url: `/Cliente/${clientId}`,
      method: 'GET',
    })

    return data
  }

  const { data = fallback } = useQuery([queryKeys.client, clientId], () =>
    getClient(),
  )

  return data
}
