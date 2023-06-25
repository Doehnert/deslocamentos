import { UseMutateFunction, useMutation, useQueryClient } from 'react-query'
import toast from 'react-hot-toast'
import useAxios from '../../../src/axiosInstance'
import { queryKeys } from '../../../src/react-query/constants'

interface DeleteUserParams {
  clientId: number
}

export function useDeleteClient(): UseMutateFunction<
  any,
  unknown,
  DeleteUserParams,
  unknown
> {
  const { axiosInstance } = useAxios()
  const queryClient = useQueryClient()

  async function deleteUser(clientId: number) {
    if (!clientId) return null

    const res = await axiosInstance({
      url: `/Cliente/${clientId}`,
      method: 'DELETE',
      data: {
        id: clientId,
      },
    })

    return res
  }

  const { mutate: mutateDeleteClient } = useMutation(
    ({ clientId }: { clientId: number }) => deleteUser(clientId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([queryKeys.clients])
        toast.success('Cliente excluido com sucesso!')
      },
    },
  )

  return mutateDeleteClient
}
