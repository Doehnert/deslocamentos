import { UseMutateFunction, useMutation, useQueryClient } from 'react-query'
import toast from 'react-hot-toast'
import useAxios from '../../../src/axiosInstance'
import { Conductor } from '../../../src/types'
import { queryKeys } from '../../../src/react-query/constants'

interface AddConductorParams {
  newConductor: Conductor
}

export function useAddConductor(): UseMutateFunction<
  any,
  unknown,
  AddConductorParams,
  unknown
> {
  const { axiosInstance } = useAxios()
  const queryClient = useQueryClient()

  async function addClient(newConductor: any) {
    if (!newConductor) return null

    const res = await axiosInstance({
      url: `/Condutor`,
      method: 'POST',
      data: newConductor,
    })

    return res
  }

  const { mutate: mudateAddConductor } = useMutation(
    ({ newConductor }: { newConductor: Conductor }) => addClient(newConductor),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([queryKeys.conductors])
        toast.success('Condutor adicionado com sucesso!')
      },
    },
  )

  return mudateAddConductor
}
