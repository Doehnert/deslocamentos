import { yupResolver } from '@hookform/resolvers/yup'
import { LoadingButton } from '@mui/lab'
import { Box, Button, Modal, Stack, TextField, Typography } from '@mui/material'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { useClient } from '../hooks/useClient'
import { useEditClient } from '../hooks/useEditClient'
import { editClientTyles } from './styles'

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

interface EditClientProps {
  clientId: number | null
  editModalOpen: boolean
  setEditModalOpen: (open: boolean) => void
}

interface UserFormData {
  nome: string
  logradouro: string
  numero: string
  bairro: string
  cidade: string
  uf: string
  numeroDocumento: string | undefined
  tipoDocumento: string | undefined
}

const EditClient = ({
  clientId = null,
  editModalOpen = false,
  setEditModalOpen,
}: EditClientProps) => {
  const mutateEditClient = useEditClient()
  const user = useClient(clientId)

  const onClose = () => {
    setEditModalOpen(false)
  }
  const validationSchema = Yup.object().shape({
    nome: Yup.string().required(),
    logradouro: Yup.string().required(),
    numero: Yup.string().required(),
    bairro: Yup.string().required(),
    cidade: Yup.string().required(),
    uf: Yup.string().required(),
    numeroDocumento: Yup.string(),
    tipoDocumento: Yup.string(),
  })

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: yupResolver(validationSchema),
    mode: 'all',
    defaultValues: {},
  })

  useEffect(() => {
    setValue('nome', user?.nome)
    setValue('logradouro', user?.logradouro)
    setValue('numero', user?.numero)
    setValue('bairro', user?.bairro)
    setValue('cidade', user?.cidade)
    setValue('uf', user?.uf)
    setValue('numeroDocumento', user?.numeroDocumento)
    setValue('tipoDocumento', user?.tipoDocumento)
  }, [user, setValue])

  const onSubmit = (values: UserFormData) => {
    if (clientId) {
      const body = {
        id: clientId,
        nome: values.nome,
        logradouro: values.logradouro,
        numero: values.numero,
        bairro: values.bairro,
        cidade: values.cidade,
        uf: values.uf,
        numeroDocumento: values.numeroDocumento,
        tipoDocumento: values.tipoDocumento,
      }

      mutateEditClient({
        clientId,
        clientData: body,
      })
    }

    onClose()
  }
  const getModalTitle = () => {
    return 'Editar Cliente'
  }

  if (!user) {
    return null
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

          <TextField
            {...register('nome')}
            error={!!errors.nome}
            helperText={errors.nome && errors.nome?.message}
            label='nome'
            placeholder='Enter nome'
            fullWidth
            required
            variant='filled'
            sx={editClientTyles.inputStyle}
          />

          <TextField
            {...register('logradouro')}
            error={!!errors.logradouro}
            helperText={errors.logradouro && errors.logradouro?.message}
            label='logradouro'
            placeholder='Enter logradouro'
            fullWidth
            required
            variant='filled'
            sx={editClientTyles.inputStyle}
          />

          <TextField
            {...register('numero')}
            error={!!errors.numero}
            helperText={errors.numero && errors.numero?.message}
            label='numero'
            placeholder='Enter numero'
            fullWidth
            required
            variant='filled'
            sx={editClientTyles.inputStyle}
          />

          <TextField
            {...register('bairro')}
            error={!!errors.bairro}
            helperText={errors.bairro && errors.bairro?.message}
            label='bairro'
            placeholder='Enter bairro'
            fullWidth
            required
            variant='filled'
            sx={editClientTyles.inputStyle}
          />

          <TextField
            {...register('cidade')}
            error={!!errors.cidade}
            helperText={errors.cidade && errors.cidade?.message}
            label='cidade'
            placeholder='Enter cidade'
            fullWidth
            required
            variant='filled'
            sx={editClientTyles.inputStyle}
          />

          <TextField
            {...register('uf')}
            error={!!errors.uf}
            helperText={errors.uf && errors.uf?.message}
            label='uf'
            placeholder='Enter uf'
            fullWidth
            required
            variant='filled'
            sx={editClientTyles.inputStyle}
          />

          <TextField
            {...register('numeroDocumento')}
            error={!!errors.numeroDocumento}
            helperText={
              errors.numeroDocumento && errors.numeroDocumento?.message
            }
            label='numeroDocumento'
            placeholder='Enter numeroDocumento'
            fullWidth
            required
            variant='filled'
            sx={editClientTyles.inputStyle}
          />

          <TextField
            {...register('tipoDocumento')}
            error={!!errors.tipoDocumento}
            helperText={errors.tipoDocumento && errors.tipoDocumento?.message}
            label='tipoDocumento'
            placeholder='Enter e-mail'
            fullWidth
            required
            variant='filled'
            sx={editClientTyles.inputStyle}
          />

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

export default EditClient
