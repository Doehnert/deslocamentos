import DeleteIcon from '@mui/icons-material/Delete'
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Link,
  Slide,
  Typography,
} from '@mui/material'
import { TransitionProps } from '@mui/material/transitions'
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid'
import React, { useState } from 'react'
import Layout from '../../layouts/Layout'
import AddVehicle from './components/AddVehicle'
import EditVehicle from './components/EditVehicle'
import { useDeleteVehicle } from './hooks/useDeleteVehicle'
import { useVehicles } from './hooks/useVehicles'

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction='up' ref={ref} {...props} />
})

const Vehicles = () => {
  const data = useVehicles()
  const mutateDeleteVehicle = useDeleteVehicle()

  const [vehicleId, setVehicleId] = useState<number | null>(null)
  const [addModalOpen, setAddModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [vehicleIdToDelete, setVehicleIdToDelete] = useState(0)
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false)

  const handleClose = () => {
    setOpenConfirmDelete(false)
  }

  const openAddModal = () => {
    setAddModalOpen(true)
  }

  const openEditModal = (vehicleId: number) => {
    setVehicleId(vehicleId)
    setEditModalOpen(true)
  }

  const handleDeleteVehicle = (vehicleId: number) => {
    setVehicleIdToDelete(vehicleId)
    setOpenConfirmDelete(true)
  }

  const deleteVehicle = async () => {
    mutateDeleteVehicle({ vehicleId: vehicleIdToDelete })
    handleClose()
  }

  const columns = [
    {
      field: 'id',
      headerName: 'Id',
      type: 'string',
      renderCell: (params: any) => {
        return (
          <Link href='#' onClick={() => openEditModal(params.id)}>
            {params.value}
          </Link>
        )
      },
    },
    {
      field: 'placa',
      headerName: 'Placa',
      type: 'string',
      flex: 1,
    },
    {
      field: 'marcaModelo',
      headerName: 'Marca/Modelo',
      maxWidth: 200,
      type: 'string',
      flex: 1,
    },
    {
      field: 'anoFabricacao',
      headerName: 'Ano de fabricação',
      type: 'number',
      flex: 1,
    },
    {
      field: 'kmAtual',
      headerName: 'km Atual',
      type: 'number',
      flex: 1,
    },
    {
      field: 'actions',
      type: 'actions',
      flex: 0.5,
      getActions: (params: any) => [
        <GridActionsCellItem
          icon={<DeleteIcon />}
          onClick={() => handleDeleteVehicle(params.id)}
          label='Delete Vehicle'
        />,
      ],
    },
  ]

  return (
    <Layout>
      <Container maxWidth={false} disableGutters={false} component='main'>
        <Grid item xs={12} sx={{ textAlign: 'end' }}>
          <Button variant='contained' onClick={() => openAddModal()}>
            Adicionar
          </Button>
        </Grid>
        <Dialog
          open={openConfirmDelete}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby='alert-dialog-slide-description'
        >
          <DialogTitle>{'Delete Vehicle?'}</DialogTitle>
          <DialogContent>
            <DialogContentText id='alert-dialog-slide-description'>
              Tem certeza que deseja excluir esse veículo?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={deleteVehicle}>Sim</Button>
            <Button onClick={handleClose}>Não</Button>
          </DialogActions>
        </Dialog>
        <Box sx={{ width: '100%' }}>
          <Typography variant='h3'>Veículos</Typography>

          {data && (
            <DataGrid
              autoHeight={true}
              hideFooterPagination={true}
              columns={columns}
              rows={data}
            />
          )}
          <EditVehicle
            vehicleId={vehicleId}
            editModalOpen={editModalOpen}
            setEditModalOpen={setEditModalOpen}
          />
          <AddVehicle
            addModalOpen={addModalOpen}
            setAddModalOpen={setAddModalOpen}
          />
        </Box>
      </Container>
    </Layout>
  )
}

export default Vehicles
