import { UseMutateFunction, useMutation, useQueryClient } from 'react-query'
import toast from 'react-hot-toast'
import useAxios from '../../../src/axiosInstance'
import { queryKeys } from '../../../src/react-query/constants'

interface DeleteConductorParams {
  vehicleId: number
}

export function useDeleteVehicle(): UseMutateFunction<
  any,
  unknown,
  DeleteConductorParams,
  unknown
> {
  const { axiosInstance } = useAxios()
  const queryClient = useQueryClient()

  async function deleteConductor(vehicleId: number) {
    if (!vehicleId) return null

    const res = await axiosInstance({
      url: `/Veiculo/${vehicleId}`,
      method: 'DELETE',
      data: {
        id: vehicleId,
      },
    })

    return res
  }

  const { mutate: mutateDeleteVehicle } = useMutation(
    ({ vehicleId }: { vehicleId: number }) => deleteConductor(vehicleId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([queryKeys.vehicles])
        toast.success('Veículo excluído com sucesso!')
      },
    },
  )

  return mutateDeleteVehicle
}
