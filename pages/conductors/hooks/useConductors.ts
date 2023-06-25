import { useQuery } from 'react-query'
import useAxios from '../../../src/axiosInstance'
import { queryKeys } from '../../../src/react-query/constants'

const fallback = null

export function useConductors() {
  const { axiosInstance } = useAxios()

  async function getConductors() {
    const { data } = await axiosInstance({
      url: `/Condutor`,
      method: 'GET',
    })

    return data
  }

  const { data = fallback } = useQuery([queryKeys.conductors], () => {
    return getConductors()
  })

  return data
}
