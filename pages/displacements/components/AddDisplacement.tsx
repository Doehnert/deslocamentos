import { yupResolver } from '@hookform/resolvers/yup'
import { LoadingButton } from '@mui/lab'
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { Controller, useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { editClientTyles } from './styles'

import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import dayjs, { Dayjs } from 'dayjs'

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { useAddDisplacement } from '../hooks/useAddDisplacement'
import { useConductors } from '../../conductors/hooks/useConductors'
import { Client, Conductor, Vehicle } from '../../../src/types'
import { useVehicles } from '../../vehicles/hooks/useVehicles'
import { useClients } from '../../clients/hooks/useClients'

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
  kmInicial: number
  checkList: string
  motivo: string
  observacao: string
  idCondutor: number
  idVeiculo: number
  idCliente: number
}

interface AddVehicleProps {
  addModalOpen: boolean
  setAddModalOpen: (open: boolean) => void
}

const AddDisplacement = ({
  addModalOpen = false,
  setAddModalOpen,
}: AddVehicleProps) => {
  const mutateAddDisplacement = useAddDisplacement()
  const mudateAddDisplacement = useAddDisplacement()
  const conductors = useConductors()
  const vehicles = useVehicles()
  const clients = useClients()

  const validationSchema = Yup.object().shape({
    kmInicial: Yup.number().required('Campo obrigatório'),
    checkList: Yup.string().required('Campo obrigatório'),
    motivo: Yup.string().required('Campo obrigatório'),
    observacao: Yup.string().required('Campo obrigatório'),
    idCondutor: Yup.number()
      .positive('Campo obrigatório')
      .required('Campo obrigatório'),
    idVeiculo: Yup.number()
      .positive('Campo obrigatório')
      .required('Campo obrigatório'),
    idCliente: Yup.number()
      .positive('Campo obrigatório')
      .required('Campo obrigatório'),
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
      kmInicial: 0,
      checkList: '',
      motivo: '',
      observacao: '',
      idCondutor: 0,
      idVeiculo: 0,
      idCliente: 0,
    },
  })

  const onClose = () => {
    reset()
    setAddModalOpen(false)
  }

  const onSubmit = (values: any) => {
    const body = {
      ...values,
      inicioDeslocamento: dayjs().toISOString(),
    }

    mutateAddDisplacement({
      newDisplacement: body,
    })

    onClose()
  }

  const getModalTitle = () => {
    return 'Adicionar deslocamento'
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
            {...register('kmInicial')}
            error={!!errors.kmInicial}
            helperText={!!errors.kmInicial && errors.kmInicial?.message}
            label='km Inicial'
            placeholder='Entre a km Inicial'
            fullWidth
            variant='filled'
            type='number'
            inputProps={{ maxLength: 64 }}
            sx={editClientTyles.inputStyle}
          />

          <TextField
            error={!!errors.checkList}
            helperText={!!errors.checkList && errors.checkList?.message}
            label='checkList'
            placeholder='Entre o checkList'
            fullWidth
            variant='filled'
            sx={editClientTyles.inputStyle}
            inputProps={{ maxLength: 64 }}
            {...register('checkList')}
          />
          <TextField
            error={!!errors.motivo}
            helperText={!!errors.motivo && errors.motivo?.message}
            label='Motivo'
            placeholder='Entre com o motivo'
            fullWidth
            variant='filled'
            sx={editClientTyles.inputStyle}
            inputProps={{ maxLength: 64 }}
            {...register('motivo')}
          />
          <TextField
            error={!!errors.observacao}
            helperText={!!errors.observacao && errors.observacao?.message}
            label='Observação'
            placeholder='Entre com a Observação'
            fullWidth
            variant='filled'
            sx={editClientTyles.inputStyle}
            inputProps={{ maxLength: 64 }}
            {...register('observacao')}
          />

          <FormControl fullWidth error={!!errors?.idCondutor}>
            <InputLabel id='idCondutor'>Condutores</InputLabel>

            <Controller
              control={control}
              name='idCondutor'
              render={({ field }) => {
                return (
                  <Select
                    {...field}
                    data-testid='role-id'
                    sx={editClientTyles.inputStyle}
                    id='location_id'
                    variant='filled'
                  >
                    {conductors?.map((conductor: Conductor) => (
                      <MenuItem key={conductor.id} value={conductor.id}>
                        {conductor.nome}
                      </MenuItem>
                    ))}
                  </Select>
                )
              }}
            />
            <FormHelperText>{errors?.idCondutor?.message}</FormHelperText>
          </FormControl>

          <FormControl fullWidth error={!!errors?.idVeiculo}>
            <InputLabel id='idVeiculo'>Veículo</InputLabel>

            <Controller
              control={control}
              name='idVeiculo'
              render={({ field }) => {
                return (
                  <Select
                    {...field}
                    data-testid='role-id'
                    sx={editClientTyles.inputStyle}
                    id='location_id'
                    variant='filled'
                  >
                    {vehicles?.map((vehicle: Vehicle) => (
                      <MenuItem key={vehicle.id} value={vehicle.id}>
                        {`${vehicle.marcaModelo} - ${vehicle.placa}`}
                      </MenuItem>
                    ))}
                  </Select>
                )
              }}
            />
            <FormHelperText>{errors?.idVeiculo?.message}</FormHelperText>
          </FormControl>

          <FormControl fullWidth error={!!errors?.idCliente}>
            <InputLabel id='idCliente'>Cliente</InputLabel>

            <Controller
              control={control}
              name='idCliente'
              render={({ field }) => {
                return (
                  <Select
                    {...field}
                    data-testid='role-id'
                    sx={editClientTyles.inputStyle}
                    id='location_id'
                    variant='filled'
                  >
                    {clients?.map((client: Client) => (
                      <MenuItem key={client.id} value={client.id}>
                        {client.nome}
                      </MenuItem>
                    ))}
                  </Select>
                )
              }}
            />
            <FormHelperText>{errors?.idCliente?.message}</FormHelperText>
          </FormControl>

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

export default AddDisplacement
