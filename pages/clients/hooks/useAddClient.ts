import { UseMutateFunction, useMutation, useQueryClient } from 'react-query'
import toast from 'react-hot-toast'
import useAxios from '../../../src/axiosInstance'
import { Client } from '../../../src/types'
import { queryKeys } from '../../../src/react-query/constants'

interface AddClientParams {
  newClient: Client
}

export function useAddClient(): UseMutateFunction<
  any,
  unknown,
  AddClientParams,
  unknown
> {
  const { axiosInstance } = useAxios()
  const queryClient = useQueryClient()

  async function addClient(newClient: any) {
    if (!newClient) return null

    const res = await axiosInstance({
      url: `/Cliente`,
      method: 'POST',
      data: newClient,
    })

    return res
  }

  const { mutate: mudateAddClient } = useMutation(
    ({ newClient }: { newClient: Client }) => addClient(newClient),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([queryKeys.clients])
        toast.success('Novo cliente adicionado com sucesso!')
      },
    },
  )

  return mudateAddClient
}
