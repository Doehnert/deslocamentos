import { useQuery } from 'react-query'
import useAxios from '../../../src/axiosInstance'
import { queryKeys } from '../../../src/react-query/constants'

const fallback = null

export function useStates() {
  const { axiosInstance } = useAxios()

  async function getStates() {
    const { data } = await axiosInstance({
      url: 'https://servicodados.ibge.gov.br/api/v1/localidades/estados',
      method: 'GET',
    })

    return data
  }

  const { data = fallback } = useQuery([queryKeys.states], () => {
    return getStates()
  })

  return data
}
