import { yupResolver } from '@hookform/resolvers/yup'
import { LoadingButton } from '@mui/lab'
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  InputBaseComponentProps,
  InputLabel,
  MenuItem,
  Modal,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import ReactInputMask from 'react-input-mask'
import { useIntl } from 'react-intl'
import * as Yup from 'yup'
import useAxios from '../../../src/axiosInstance'
import { useAddClient } from '../hooks/useAddClient'
import { editClientTyles } from './styles'
import { useStates } from '../hooks/useStates'
import { City, State } from '../../../src/types'
import { useCities } from '../hooks/useCities'

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
  logradouro: string
  numero: string
  bairro: string
  cidade: number
  uf: number
  numeroDocumento: string
  tipoDocumento: string
}

interface AddClientProps {
  addModalOpen: boolean
  setAddModalOpen: (open: boolean) => void
}

interface CustomInputProps extends InputBaseComponentProps {
  mask?: string
}

const AddClient = ({
  addModalOpen = false,
  setAddModalOpen,
}: AddClientProps) => {
  const { axiosInstance } = useAxios()
  const intl = useIntl()

  const mutateAddClient = useAddClient()

  const [loading, setLoading] = useState(false)
  const [options, setOptions] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [numeroDocumentoMask, setNumeroDocumentoMask] = useState('9.999.999-9')

  const states = useStates()

  const validationSchema = Yup.object().shape({
    nome: Yup.string().required('Campo obrigatório'),
    logradouro: Yup.string().required('Campo obrigatório'),
    numero: Yup.string().required('Campo obrigatório'),
    bairro: Yup.string().required('Campo obrigatório'),
    cidade: Yup.number().required('Campo obrigatório'),
    uf: Yup.number().required('Campo obrigatório'),
    numeroDocumento: Yup.string().required('Campo obrigatório'),
    tipoDocumento: Yup.string().required('Campo obrigatório'),
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
      logradouro: '',
      numero: '',
      bairro: '',
      cidade: 0,
      uf: 0,
      numeroDocumento: '',
      tipoDocumento: 'RG',
    },
  })

  const watchState = watch('uf')

  const cities = useCities(Number(watchState))

  const onClose = () => {
    reset()
    setAddModalOpen(false)
  }

  const onSubmit = (values: any) => {
    const stateFound = states.find((state: State) => state.id === values.uf)
    const cityFound = cities.find((city: City) => city.id === values.cidade)

    const body = {
      ...values,
      cidade: cityFound.nome,
      uf: stateFound.nome,
    }
    delete body.merchantObj

    mutateAddClient({ newClient: body })
    reset()
    onClose()
  }

  const getModalTitle = () => {
    return intl.formatMessage({ id: 'clients.add' })
  }

  const handleTipoDocumentoChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const selectedValue = event.target.value
    if (selectedValue === 'RG') {
      setNumeroDocumentoMask('9.999.999-9')
    } else if (selectedValue === 'CPF') {
      setNumeroDocumentoMask('999.999.999-99')
    } else {
      setNumeroDocumentoMask('')
    }
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

          <RadioGroup
            {...register('tipoDocumento')}
            row
            onChange={handleTipoDocumentoChange}
            defaultValue='RG'
          >
            <FormControlLabel value='RG' control={<Radio />} label='RG' />
            <FormControlLabel value='CPF' control={<Radio />} label='CPF' />
          </RadioGroup>

          <Controller
            name='numeroDocumento'
            control={control}
            render={({ field }) => (
              <ReactInputMask
                mask={numeroDocumentoMask}
                maskChar={null}
                {...field}
              >
                <TextField
                  error={!!errors.numeroDocumento}
                  helperText={
                    errors.numeroDocumento && errors.numeroDocumento?.message
                  }
                  label='Número do documento'
                  placeholder='Entre com o número do documento'
                  fullWidth
                  required
                  variant='filled'
                  // inputProps={{ maxLength: 10 }}
                  sx={editClientTyles.inputStyle}
                />
              </ReactInputMask>
            )}
          />

          <TextField
            error={!!errors.nome}
            helperText={!!errors.nome && errors.nome?.message}
            label='Nome'
            placeholder='Entre com o nome'
            fullWidth
            variant='filled'
            sx={editClientTyles.inputStyle}
            inputProps={{ maxLength: 64 }}
            {...register('nome')}
          />
          <TextField
            error={!!errors.logradouro}
            helperText={!!errors.logradouro && errors.logradouro?.message}
            label='Logradouro'
            placeholder='Entre com o logradouro'
            fullWidth
            variant='filled'
            sx={editClientTyles.inputStyle}
            inputProps={{ maxLength: 64 }}
            {...register('logradouro')}
          />
          <TextField
            error={!!errors.numero}
            helperText={!!errors.numero && errors.numero?.message}
            label='Número'
            placeholder='Entre com o número'
            fullWidth
            variant='filled'
            sx={editClientTyles.inputStyle}
            inputProps={{ maxLength: 64 }}
            {...register('numero')}
          />
          <TextField
            error={!!errors.bairro}
            helperText={!!errors.bairro && errors.bairro?.message}
            label='Bairro'
            placeholder='Entre com o bairro'
            fullWidth
            variant='filled'
            sx={editClientTyles.inputStyle}
            inputProps={{ maxLength: 64 }}
            {...register('bairro')}
          />

          <FormControl fullWidth>
            <InputLabel>Estado</InputLabel>
            <Controller
              name='uf'
              control={control}
              rules={{ required: 'Selecione um estado' }}
              render={({ field }) => (
                <Select {...field} sx={editClientTyles.inputStyle}>
                  {states.map((state: State) => (
                    <MenuItem key={state.id} value={state.id}>
                      {state.nome}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Cidade</InputLabel>
            <Controller
              name='cidade'
              control={control}
              rules={{ required: 'Selecione uma cidade' }}
              render={({ field }) => (
                <Select {...field}>
                  {cities &&
                    cities.map((city: City) => (
                      <MenuItem key={city.id} value={city.id}>
                        {city.nome}
                      </MenuItem>
                    ))}
                </Select>
              )}
            />
          </FormControl>

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

export default AddClient
