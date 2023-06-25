import { yupResolver } from '@hookform/resolvers/yup'
import { LoadingButton } from '@mui/lab'
import { Box, Button, Modal, Stack, TextField, Typography } from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { Controller, useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { editClientTyles } from './styles'

import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import dayjs, { Dayjs } from 'dayjs'

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { useAddVehicle } from '../hooks/useAddVehicle'
// import { useAddConductor } from '../hooks/useAddVehicle'

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

interface UserFormData {
  placa: string
  marcaModelo: string
  anoFabricacao: number
  kmAtual: number
}

interface AddVehicleProps {
  addModalOpen: boolean
  setAddModalOpen: (open: boolean) => void
}

const AddVehicle = ({
  addModalOpen = false,
  setAddModalOpen,
}: AddVehicleProps) => {
  const mudateAddVehicle = useAddVehicle()

  const validationSchema = Yup.object().shape({
    placa: Yup.string().required('Campo obrigatório'),
    marcaModelo: Yup.string().required('Campo obrigatório'),
    anoFabricacao: Yup.number().required('Campo obrigatório'),
    kmAtual: Yup.number().required('Campo obrigatório'),
  })

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: yupResolver(validationSchema),
    mode: 'all',
    defaultValues: {
      placa: '',
      marcaModelo: '',
      anoFabricacao: 2000,
      kmAtual: 0,
    },
  })

  const onClose = () => {
    reset()
    setAddModalOpen(false)
  }

  const onSubmit = (values: any) => {
    mudateAddVehicle({
      newVehicle: values,
    })
    onClose()
  }

  const getModalTitle = () => {
    return 'Adicionar Condutor'
  }

  return (
    <Modal
      open={addModalOpen}
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

          <TextField
            {...register('placa')}
            error={!!errors.placa}
            helperText={!!errors.placa && errors.placa?.message}
            label='Placa'
            placeholder='Entre a placa'
            fullWidth
            variant='filled'
            inputProps={{ maxLength: 64 }}
            sx={editClientTyles.inputStyle}
          />

          <TextField
            error={!!errors.marcaModelo}
            helperText={!!errors.marcaModelo && errors.marcaModelo?.message}
            label='Marca/Modelo'
            placeholder='Entre a Marca/Modelo'
            fullWidth
            variant='filled'
            sx={editClientTyles.inputStyle}
            inputProps={{ maxLength: 64 }}
            {...register('marcaModelo')}
          />
          <TextField
            error={!!errors.anoFabricacao}
            helperText={!!errors.anoFabricacao && errors.anoFabricacao?.message}
            label='Ano de fabricação'
            placeholder='Entre com o ano de fabricação'
            fullWidth
            variant='filled'
            type='number'
            sx={editClientTyles.inputStyle}
            inputProps={{ maxLength: 64 }}
            {...register('anoFabricacao')}
          />
          <TextField
            error={!!errors.kmAtual}
            helperText={!!errors.kmAtual && errors.kmAtual?.message}
            label='km Atual'
            placeholder='Entre com a km atual'
            fullWidth
            variant='filled'
            type='number'
            sx={editClientTyles.inputStyle}
            inputProps={{ maxLength: 64 }}
            {...register('kmAtual')}
          />

          <Stack direction='row' spacing={2} justifyContent='flex-end'>
            <Button
              variant='contained'
              color='secondary'
              onClick={() => onClose()}
            >
              Cancelar
            </Button>
            <LoadingButton
              color='primary'
              type='submit'
              variant='contained'
              loading={false}
            >
              Salvar
            </LoadingButton>
          </Stack>
        </form>
      </Box>
    </Modal>
  )
}

export default AddVehicle
