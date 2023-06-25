import { useQuery } from 'react-query'
import useAxios from '../../../src/axiosInstance'
import { queryKeys } from '../../../src/react-query/constants'

const fallback = null

export function useVehicle(vehicleId: number | null) {
  const { axiosInstance } = useAxios()

  async function getVehicle() {
    if (!vehicleId) return null
    const { data } = await axiosInstance({
      url: `/Veiculo/${vehicleId}`,
      method: 'GET',
    })

    return data
  }

  const { data = fallback } = useQuery([queryKeys.vehicle, vehicleId], () =>
    getVehicle(),
  )

  return data
}
