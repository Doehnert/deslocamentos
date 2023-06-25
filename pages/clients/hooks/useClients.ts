import { useQuery } from 'react-query'
import useAxios from '../../../src/axiosInstance'
import { queryKeys } from '../../../src/react-query/constants'

const fallback = null

export function useClients() {
  const { axiosInstance } = useAxios()

  async function getDashboard() {
    const { data } = await axiosInstance({
      url: `/Cliente`,
      method: 'GET',
    })

    return data
  }

  const { data = fallback } = useQuery([queryKeys.clients], () => {
    return getDashboard()
  })

  return data
}
