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
import { useAddConductor } from '../hooks/useAddConductor'

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
  nome: string
  numeroHabilitacao: string
  categoriaHabilitacao: string
  vencimentoHabilitacao: string
}

interface AddConductorProps {
  addModalOpen: boolean
  setAddModalOpen: (open: boolean) => void
}

const AddConductor = ({
  addModalOpen = false,
  setAddModalOpen,
}: AddConductorProps) => {
  const mudateAddConductor = useAddConductor()

  const validationSchema = Yup.object().shape({
    nome: Yup.string().required('Campo obrigatório'),
    numeroHabilitacao: Yup.string().required('Campo obrigatório'),
    categoriaHabilitacao: Yup.string().required('Campo obrigatório'),
    vencimentoHabilitacao: Yup.string().required(
      'A data de vencimento da habilitação é obrigatória',
    ),
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
      nome: '',
      numeroHabilitacao: '',
      categoriaHabilitacao: '',
      vencimentoHabilitacao: dayjs().format(),
    },
  })

  const onClose = () => {
    reset()
    setAddModalOpen(false)
  }

  const onSubmit = (values: any) => {
    mudateAddConductor({
      newConductor: values,
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
            {...register('nome')}
            error={!!errors.nome}
            helperText={!!errors.nome && errors.nome?.message}
            label='Nome'
            placeholder='Entre com o nome'
            fullWidth
            variant='filled'
            inputProps={{ maxLength: 64 }}
            sx={editClientTyles.inputStyle}
          />

          <TextField
            error={!!errors.numeroHabilitacao}
            helperText={
              !!errors.numeroHabilitacao && errors.numeroHabilitacao?.message
            }
            label='Número da Habilitação'
            placeholder='Entre com o número da habilitação'
            fullWidth
            variant='filled'
            sx={editClientTyles.inputStyle}
            {...register('numeroHabilitacao')}
          />
          <TextField
            error={!!errors.categoriaHabilitacao}
            helperText={
              !!errors.categoriaHabilitacao &&
              errors.categoriaHabilitacao?.message
            }
            label='Categoria da habilitação'
            placeholder='Entre com a categoria da habilitação'
            fullWidth
            variant='filled'
            sx={editClientTyles.inputStyle}
            inputProps={{ maxLength: 64 }}
            {...register('categoriaHabilitacao')}
          />

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Controller
              control={control}
              name='vencimentoHabilitacao'
              defaultValue={dayjs().format()}
              render={({ field }) => (
                <DesktopDatePicker
                  sx={editClientTyles.inputStyle}
                  label='Data da expiração da licença'
                  value={dayjs(field.value)}
                  onChange={(date: any) => {
                    field.onChange(dayjs(date).toISOString()) // Salve o valor no formato ISO
                  }}
                />
              )}
            />
          </LocalizationProvider>

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

export default AddConductor
