import { yupResolver } from '@hookform/resolvers/yup'
import { LoadingButton } from '@mui/lab'
import { Box, Button, Modal, Stack, TextField, Typography } from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import dayjs from 'dayjs'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { useVehicle } from '../hooks/useVehicle'
import { editClientTyles } from './styles'

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { useEditVehicle } from '../hooks/useEditVehicle'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

interface EditVehicleProps {
  vehicleId: number | null
  editModalOpen: boolean
  setEditModalOpen: (open: boolean) => void
}

interface UserFormData {
  marcaModelo: string
  anoFabricacao: number
  kmAtual: number
}

const EditVehicle = ({
  vehicleId = null,
  editModalOpen = false,
  setEditModalOpen,
}: EditVehicleProps) => {
  const vehicle = useVehicle(vehicleId)
  const mutateEditVehicle = useEditVehicle()

  const onClose = () => {
    setEditModalOpen(false)
  }
  const validationSchema = Yup.object().shape({
    marcaModelo: Yup.string().required(),
    anoFabricacao: Yup.number().required(),
    kmAtual: Yup.number().required(),
  })

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: yupResolver(validationSchema),
    defaultValues: {},
  })

  useEffect(() => {
    setValue('marcaModelo', vehicle?.marcaModelo)
    setValue('anoFabricacao', vehicle?.anoFabricacao)
    setValue('kmAtual', vehicle?.kmAtual)
  }, [vehicle, setValue])

  const onSubmit = (values: UserFormData) => {
    if (vehicleId) {
      const body = {
        id: vehicleId,
        marcaModelo: values.marcaModelo,
        anoFabricacao: values.anoFabricacao,
        kmAtual: values.kmAtual,
      }

      mutateEditVehicle({
        vehicleId,
        vehicleData: body,
      })
    }

    onClose()
  }
  const getModalTitle = () => {
    return 'Editar Veiculo'
  }

  return (
    <Modal
      open={editModalOpen}
      onClose={() => {
        onClose()
        // resetForm()
      }}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box sx={style}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            {getModalTitle()}
          </Typography>

          {vehicle?.marcaModelo && (
            <TextField
              {...register('marcaModelo')}
              error={!!errors.marcaModelo}
              helperText={errors.marcaModelo && errors.marcaModelo?.message}
              label='marcaModelo'
              placeholder='Enter marcaModelo'
              fullWidth
              required
              variant='filled'
              sx={editClientTyles.inputStyle}
            />
          )}
          {vehicle?.anoFabricacao && (
            <TextField
              {...register('anoFabricacao')}
              error={!!errors.anoFabricacao}
              helperText={errors.anoFabricacao && errors.anoFabricacao?.message}
              label='anoFabricacao'
              placeholder='Enter anoFabricacao'
              fullWidth
              required
              type='number'
              variant='filled'
              sx={editClientTyles.inputStyle}
            />
          )}
          {vehicle?.kmAtual && (
            <TextField
              {...register('kmAtual')}
              error={!!errors.kmAtual}
              helperText={errors.kmAtual && errors.kmAtual?.message}
              label='kmAtual'
              placeholder='Enter kmAtual'
              fullWidth
              required
              type='number'
              variant='filled'
              sx={editClientTyles.inputStyle}
            />
          )}

          <Stack direction='row' spacing={2} justifyContent='flex-end'>
            <Button
              variant='contained'
              color='secondary'
              onClick={() => onClose()}
            >
              Cancel
            </Button>
            <LoadingButton
              color='primary'
              type='submit'
              variant='contained'
              loading={false}
            >
              Save
            </LoadingButton>
          </Stack>
        </form>
      </Box>
    </Modal>
  )
}

export default EditVehicle
