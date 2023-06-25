import { yupResolver } from '@hookform/resolvers/yup'
import { LoadingButton } from '@mui/lab'
import { Box, Button, Modal, Stack, TextField, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { editClientTyles } from './styles'
import { useFinishDisplacement } from '../hooks/useFinishDisplacement'
import dayjs from 'dayjs'
import { useDisplacement } from '../hooks/useDisplacement'

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
  kmFinal: number
  observacao: string
}

interface AddVehicleProps {
  finishModalOpen: boolean
  setFinishModalOpen: (open: boolean) => void
  displacementIdToFinish: number
}

const FinishDisplacement = ({
  finishModalOpen = false,
  setFinishModalOpen,
  displacementIdToFinish,
}: AddVehicleProps) => {
  const displacement = useDisplacement(displacementIdToFinish)

  const validationSchema = Yup.object().shape({
    kmFinal: Yup.number()
      .required()
      .test(
        'is-valid',
        'The final km must be greater than inicial km',
        (value) => value > displacement.kmInicial,
      ),
    observacao: Yup.string().required(),
  })

  const mutateFinishDisplacement = useFinishDisplacement()

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
      kmFinal: 0,
      observacao: '',
    },
  })

  const onClose = () => {
    reset()
    setFinishModalOpen(false)
  }

  const onSubmit = (values: any) => {
    const body = {
      ...values,
      id: displacementIdToFinish,
      fimDeslocamento: dayjs().toISOString(),
    }
    mutateFinishDisplacement({
      displacementId: displacementIdToFinish,
      finishDisplacementData: body,
    })
    onClose()
  }

  const getModalTitle = () => {
    return 'Finalizar deslocamento'
  }

  return (
    <Modal
      open={finishModalOpen}
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
            {...register('kmFinal')}
            error={!!errors.kmFinal}
            helperText={!!errors.kmFinal && errors.kmFinal?.message}
            label='kmFinal'
            placeholder='Enter kmFinal'
            fullWidth
            variant='filled'
            type='number'
            inputProps={{ maxLength: 64 }}
            sx={editClientTyles.inputStyle}
          />

          <TextField
            error={!!errors.observacao}
            helperText={!!errors.observacao && errors.observacao?.message}
            label='observacao'
            placeholder='Enter observacao'
            fullWidth
            variant='filled'
            sx={editClientTyles.inputStyle}
            inputProps={{ maxLength: 64 }}
            {...register('observacao')}
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

export default FinishDisplacement
