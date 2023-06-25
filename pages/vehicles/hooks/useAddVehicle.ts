import { UseMutateFunction, useMutation, useQueryClient } from 'react-query'
import toast from 'react-hot-toast'
import useAxios from '../../../src/axiosInstance'
import { Vehicle } from '../../../src/types'
import { queryKeys } from '../../../src/react-query/constants'

interface AddVehicleParams {
  newVehicle: Vehicle
}

export function useAddVehicle(): UseMutateFunction<
  any,
  unknown,
  AddVehicleParams,
  unknown
> {
  const { axiosInstance } = useAxios()
  const queryClient = useQueryClient()

  async function addVehicle(newVehicle: any) {
    if (!newVehicle) return null

    const res = await axiosInstance({
      url: `/Veiculo`,
      method: 'POST',
      data: newVehicle,
    })

    return res
  }

  const { mutate: mudateAddConductor } = useMutation(
    ({ newVehicle }: { newVehicle: Vehicle }) => addVehicle(newVehicle),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([queryKeys.vehicles])
        toast.success('Novo veículo adicionado com sucesso!')
      },
    },
  )

  return mudateAddConductor
}
