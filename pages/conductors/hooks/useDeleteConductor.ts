import { UseMutateFunction, useMutation, useQueryClient } from 'react-query'
import toast from 'react-hot-toast'
import useAxios from '../../../src/axiosInstance'
import { queryKeys } from '../../../src/react-query/constants'

interface DeleteConductorParams {
  conductorId: number
}

export function useDeleteConductor(): UseMutateFunction<
  any,
  unknown,
  DeleteConductorParams,
  unknown
> {
  const { axiosInstance } = useAxios()
  const queryClient = useQueryClient()

  async function deleteConductor(conductorId: number) {
    if (!conductorId) return null

    const res = await axiosInstance({
      url: `/Condutor/${conductorId}`,
      method: 'DELETE',
      data: {
        id: conductorId,
      },
    })

    return res
  }

  const { mutate: mutateDeleteConductor } = useMutation(
    ({ conductorId }: { conductorId: number }) => deleteConductor(conductorId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([queryKeys.conductors])
        toast.success('Condutor excluído com sucesso!')
      },
    },
  )

  return mutateDeleteConductor
}
