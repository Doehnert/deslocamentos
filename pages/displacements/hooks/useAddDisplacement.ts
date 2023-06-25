import { UseMutateFunction, useMutation, useQueryClient } from 'react-query'
import toast from 'react-hot-toast'
import useAxios from '../../../src/axiosInstance'
import { Displacement, Vehicle } from '../../../src/types'
import { queryKeys } from '../../../src/react-query/constants'

interface AddDisplacementParams {
  newDisplacement: Displacement
}

export function useAddDisplacement(): UseMutateFunction<
  any,
  unknown,
  AddDisplacementParams,
  unknown
> {
  const { axiosInstance } = useAxios()
  const queryClient = useQueryClient()

  async function addDisplacement(newDisplacement: any) {
    if (!newDisplacement) return null

    const res = await axiosInstance({
      url: `/Deslocamento/IniciarDeslocamento`,
      method: 'POST',
      data: newDisplacement,
    })

    return res
  }

  const { mutate: mudateAddDisplacement } = useMutation(
    ({ newDisplacement }: { newDisplacement: Displacement }) =>
      addDisplacement(newDisplacement),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([queryKeys.displacements])
        toast.success('Deslocamento adicionado com sucesso!')
      },
    },
  )

  return mudateAddDisplacement
}
