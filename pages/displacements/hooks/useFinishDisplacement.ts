import { UseMutateFunction, useMutation, useQueryClient } from 'react-query'
import toast from 'react-hot-toast'
import useAxios from '../../../src/axiosInstance'
import { queryKeys } from '../../../src/react-query/constants'
import { FinishDisplacement } from '../../../src/types'

interface FinishDisplacementParams {
  displacementId: number
  finishDisplacementData: FinishDisplacement
}

export function useFinishDisplacement(): UseMutateFunction<
  any,
  unknown,
  FinishDisplacementParams,
  unknown
> {
  const { axiosInstance } = useAxios()
  const queryClient = useQueryClient()

  async function finishDisplacement(
    displacementId: number,
    finishDisplacementData: FinishDisplacement,
  ) {
    if (!displacementId) return null

    const res = await axiosInstance({
      url: `/Deslocamento/${displacementId}/EncerrarDeslocamento`,
      method: 'PUT',
      data: finishDisplacementData,
    })

    return res
  }

  const { mutate: mutateDeleteDisplacement } = useMutation(
    ({
      displacementId,
      finishDisplacementData,
    }: {
      displacementId: number
      finishDisplacementData: FinishDisplacement
    }) => finishDisplacement(displacementId, finishDisplacementData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([queryKeys.displacements])
        toast.success('Deslocamento finalizado com sucesso!')
      },
    },
  )

  return mutateDeleteDisplacement
}
