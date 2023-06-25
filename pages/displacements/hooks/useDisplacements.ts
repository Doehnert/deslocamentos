import { useQuery } from 'react-query'
import useAxios from '../../../src/axiosInstance'
import { queryKeys } from '../../../src/react-query/constants'

const fallback = null

export function useDisplacements() {
  const { axiosInstance } = useAxios()

  async function getDisplacements() {
    const { data } = await axiosInstance({
      url: `/Deslocamento`,
      method: 'GET',
    })

    return data
  }

  const { data = fallback } = useQuery([queryKeys.displacements], () => {
    return getDisplacements()
  })

  return data
}
