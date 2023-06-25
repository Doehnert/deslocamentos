import { yupResolver } from '@hookform/resolvers/yup'
import { LoadingButton } from '@mui/lab'
import { Box, Button, Modal, Stack, TextField, Typography } from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import dayjs from 'dayjs'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { useConductor } from '../hooks/useConductor'
import { useEditConductor } from '../hooks/useEditConductor'
import { editClientTyles } from './styles'

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'

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

interface EditConductorProps {
  conductorId: number | null
  editModalOpen: boolean
  setEditModalOpen: (open: boolean) => void
}

interface UserFormData {
  catergoriaHabilitacao: string
  vencimentoHabilitacao: string | null
}

const EditConductor = ({
  conductorId = null,
  editModalOpen = false,
  setEditModalOpen,
}: EditConductorProps) => {
  const mutateEditConductor = useEditConductor()

  const conductor = useConductor(conductorId)

  const onClose = () => {
    setEditModalOpen(false)
  }
  const validationSchema = Yup.object().shape({
    catergoriaHabilitacao: Yup.string().required(),
    vencimentoHabilitacao: Yup.string().required().nullable(),
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
    setValue('catergoriaHabilitacao', conductor?.catergoriaHabilitacao)
    setValue('vencimentoHabilitacao', conductor?.vencimentoHabilitacao)
  }, [conductor, setValue])

  const onSubmit = (values: UserFormData) => {
    if (conductorId) {
      const body = {
        id: conductorId,
        catergoriaHabilitacao: values.catergoriaHabilitacao,
        vencimentoHabilitacao: values.vencimentoHabilitacao,
      }

      mutateEditConductor({
        conductorId,
        conductorData: body,
      })
    }

    onClose()
  }
  const getModalTitle = () => {
    return 'Editar Cliente'
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

          {conductor?.catergoriaHabilitacao && (
            <TextField
              {...register('catergoriaHabilitacao')}
              error={!!errors.catergoriaHabilitacao}
              helperText={
                errors.catergoriaHabilitacao &&
                errors.catergoriaHabilitacao?.message
              }
              label='catergoriaHabilitacao'
              placeholder='Enter catergoriaHabilitacao'
              fullWidth
              required
              variant='filled'
              sx={editClientTyles.inputStyle}
            />
          )}

          {conductor?.vencimentoHabilitacao && (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Controller
                control={control}
                name='vencimentoHabilitacao'
                defaultValue={dayjs().format()}
                render={({ field }) => (
                  <DesktopDatePicker
                    format='DD/MM/YYYY'
                    sx={editClientTyles.inputStyle}
                    label='Expiration of license'
                    value={dayjs(field.value)}
                    onChange={(date: any) => {
                      field.onChange(dayjs(date).toISOString()) // Salve o valor no formato ISO
                    }}
                  />
                )}
              />
            </LocalizationProvider>
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

export default EditConductor
