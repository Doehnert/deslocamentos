import { useQuery } from 'react-query'
import useAxios from '../../../src/axiosInstance'
import { queryKeys } from '../../../src/react-query/constants'

const fallback = null

export function useVehicles() {
  const { axiosInstance } = useAxios()

  async function getVehicles() {
    const { data } = await axiosInstance({
      url: `/Veiculo`,
      method: 'GET',
    })

    return data
  }

  const { data = fallback } = useQuery([queryKeys.vehicles], () => {
    return getVehicles()
  })

  return data
}
