import { useQuery } from 'react-query'
import useAxios from '../../../src/axiosInstance'
import { queryKeys } from '../../../src/react-query/constants'

const fallback = null

export function useCities(stateId: number) {
  const { axiosInstance } = useAxios()

  async function getStates() {
    if (!stateId) return null
    const { data } = await axiosInstance({
      url: `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${stateId}/municipios`,
      method: 'GET',
    })

    return data
  }

  const { data = fallback } = useQuery([queryKeys.cities, stateId], () => {
    return getStates()
  })

  return data
}
