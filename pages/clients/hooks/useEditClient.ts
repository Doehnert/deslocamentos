import { UseMutateFunction, useMutation, useQueryClient } from 'react-query'
import toast from 'react-hot-toast'
import { Client } from '../../../src/types'
import useAxios from '../../../src/axiosInstance'
import { queryKeys } from '../../../src/react-query/constants'

interface EditUserParams {
  clientId: number
  clientData: Client
}

export function useEditClient(): UseMutateFunction<
  any,
  unknown,
  EditUserParams,
  unknown
> {
  const { axiosInstance } = useAxios()
  const queryClient = useQueryClient()

  async function editClient(clientId: number, clientData: any) {
    if (!clientData) return null
    if (!clientId) return null

    const res = await axiosInstance({
      url: `/Cliente/${clientId}`,
      method: 'PUT',
      data: clientData,
    })

    return res
  }

  const { mutate: mudateEditClient } = useMutation(
    ({ clientId, clientData }: { clientId: number; clientData: Client }) =>
      editClient(clientId, clientData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([queryKeys.clients])
        toast.success('Cliente atualizado com sucesso!')
      },
    },
  )

  return mudateEditClient
}
