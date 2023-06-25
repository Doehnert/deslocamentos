import { UseMutateFunction, useMutation, useQueryClient } from 'react-query'
import toast from 'react-hot-toast'
import { Client, Conductor, Vehicle } from '../../../src/types'
import useAxios from '../../../src/axiosInstance'
import { queryKeys } from '../../../src/react-query/constants'

interface EditVehicleParams {
  vehicleId: number
  vehicleData: Vehicle
}

export function useEditVehicle(): UseMutateFunction<
  any,
  unknown,
  EditVehicleParams,
  unknown
> {
  const { axiosInstance } = useAxios()
  const queryClient = useQueryClient()

  async function editConductor(vehicleId: number, vehicleData: any) {
    if (!vehicleData) return null
    if (!vehicleId) return null

    const res = await axiosInstance({
      url: `/Veiculo/${vehicleId}`,
      method: 'PUT',
      data: {
        ...vehicleData,
        categoriaHabilitacao: vehicleData.cartegoriaHabilitacao,
      },
    })

    return res
  }

  const { mutate: mutateEditVehicle } = useMutation(
    ({ vehicleId, vehicleData }: { vehicleId: number; vehicleData: Vehicle }) =>
      editConductor(vehicleId, vehicleData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([queryKeys.vehicles])
        toast.success('Veículo atualizado com sucesso!')
      },
    },
  )

  return mutateEditVehicle
}
