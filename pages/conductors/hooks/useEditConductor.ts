import { UseMutateFunction, useMutation, useQueryClient } from 'react-query'
import toast from 'react-hot-toast'
import { Client, Conductor } from '../../../src/types'
import useAxios from '../../../src/axiosInstance'
import { queryKeys } from '../../../src/react-query/constants'

interface EditConductorParams {
  conductorId: number
  conductorData: Conductor
}

export function useEditConductor(): UseMutateFunction<
  any,
  unknown,
  EditConductorParams,
  unknown
> {
  const { axiosInstance } = useAxios()
  const queryClient = useQueryClient()

  async function editConductor(conductorId: number, conductorData: any) {
    if (!conductorData) return null
    if (!conductorId) return null

    const res = await axiosInstance({
      url: `/Condutor/${conductorId}`,
      method: 'PUT',
      data: {
        ...conductorData,
        categoriaHabilitacao: conductorData.cartegoriaHabilitacao,
      },
    })

    return res
  }

  const { mutate: mutateEditConductor } = useMutation(
    ({
      conductorId,
      conductorData,
    }: {
      conductorId: number
      conductorData: Conductor
    }) => editConductor(conductorId, conductorData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([queryKeys.conductors])
        toast.success('Condutor atualizado com sucesso!')
      },
    },
  )

  return mutateEditConductor
}
