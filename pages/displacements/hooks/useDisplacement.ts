import { useQuery } from 'react-query'
import useAxios from '../../../src/axiosInstance'
import { queryKeys } from '../../../src/react-query/constants'

const fallback = null

export function useDisplacement(displacementId: number | null) {
  const { axiosInstance } = useAxios()

  async function getDisplacement() {
    if (!displacementId) return null
    const { data } = await axiosInstance({
      url: `/Deslocamento/${displacementId}`,
      method: 'GET',
    })

    return data
  }

  const { data = fallback } = useQuery(
    [queryKeys.displacement, displacementId],
    () => getDisplacement(),
  )

  return data
}
