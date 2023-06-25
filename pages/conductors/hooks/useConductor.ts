import { useQuery } from 'react-query'
import useAxios from '../../../src/axiosInstance'
import { queryKeys } from '../../../src/react-query/constants'

const fallback = null

export function useConductor(conductorId: number | null) {
  const { axiosInstance } = useAxios()

  async function getConductor() {
    if (!conductorId) return null
    const { data } = await axiosInstance({
      url: `/Condutor/${conductorId}`,
      method: 'GET',
    })

    return data
  }

  const { data = fallback } = useQuery([queryKeys.conductor, conductorId], () =>
    getConductor(),
  )

  return data
}
