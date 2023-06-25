import { UseMutateFunction, useMutation, useQueryClient } from 'react-query'
import toast from 'react-hot-toast'
import useAxios from '../../../src/axiosInstance'
import { queryKeys } from '../../../src/react-query/constants'

interface DeleteDisplacementParams {
  displacementId: number
}

export function useDeleteDisplacement(): UseMutateFunction<
  any,
  unknown,
  DeleteDisplacementParams,
  unknown
> {
  const { axiosInstance } = useAxios()
  const queryClient = useQueryClient()

  async function deleteDisplacement(displacementId: number) {
    if (!displacementId) return null

    const res = await axiosInstance({
      url: `/Deslocamento/${displacementId}`,
      method: 'DELETE',
      data: {
        id: displacementId,
      },
    })

    return res
  }

  const { mutate: mutateDeleteDisplacement } = useMutation(
    ({ displacementId }: { displacementId: number }) =>
      deleteDisplacement(displacementId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([queryKeys.displacements])
        toast.success('Deslocamento excluído com sucesso!')
      },
    },
  )

  return mutateDeleteDisplacement
}
