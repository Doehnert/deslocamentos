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
import {
  DataGrid,
  GridActionsCellItem,
  GridValueFormatterParams,
} from '@mui/x-data-grid'
import React, { useState } from 'react'
import Layout from '../../layouts/Layout'
import AddVehicle from './components/AddDisplacement'
import { useDisplacements } from './hooks/useDisplacements'
import { useDeleteDisplacement } from './hooks/useDeleteDisplacement'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import FinishDisplacement from './components/FinishDisplacement'
import AddDisplacement from './components/AddDisplacement'
import { useConductor } from '../conductors/hooks/useConductor'

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction='up' ref={ref} {...props} />
})

const Vehicles = () => {
  const data = useDisplacements()
  const mutateDeleteDisplacement = useDeleteDisplacement()

  const [displacementId, setDisplacementId] = useState<number | null>(null)
  const [addModalOpen, setAddModalOpen] = useState(false)
  const [finishModalOpen, setFinishModalOpen] = useState(false)
  const [displacementIdToFinish, setdisplacementIdToFinish] = useState(0)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [displacementIdToDelete, setDisplacementIdToDelete] = useState(0)
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false)

  const handleClose = () => {
    setOpenConfirmDelete(false)
  }

  const openAddModal = () => {
    setAddModalOpen(true)
  }

  const openEditModal = (displacementId: number) => {
    setDisplacementId(displacementId)
    setEditModalOpen(true)
  }

  const handleDeleteDisplacement = (displacementId: number) => {
    setDisplacementIdToDelete(displacementId)
    setOpenConfirmDelete(true)
  }

  const handleFinishDisplacement = (displacementId: number) => {
    setFinishModalOpen(true)
    setdisplacementIdToFinish(displacementId)
  }

  const deleteVehicle = async () => {
    mutateDeleteDisplacement({ displacementId: displacementIdToDelete })
    handleClose()
  }

  const columns = [
    {
      field: 'id',
      headerName: 'Id',
      type: 'string',
      flex: 1,
      renderCell: (params: any) => {
        return (
          <Link href='#' onClick={() => openEditModal(params.id)}>
            {params.value}
          </Link>
        )
      },
    },
    {
      field: 'kmInicial',
      headerName: 'km Inicial',
      type: 'number',
      flex: 1,
    },
    {
      field: 'kmFinal',
      headerName: 'km Final',
      type: 'number',
      flex: 1,
    },
    {
      field: 'inicioDeslocamento',
      headerName: 'Início do deslocamento',
      type: 'string',
      flex: 1,
    },
    {
      field: 'fimDeslocamento',
      headerName: 'Fim do deslocamento',
      type: 'string',
      flex: 1,
    },
    {
      field: 'checkList',
      headerName: 'checkList',
      type: 'string',
      flex: 1,
    },
    {
      field: 'motivo',
      headerName: 'Motivo',
      type: 'string',
      flex: 1,
    },
    {
      field: 'observacao',
      headerName: 'Observação',
      type: 'string',
      flex: 1,
    },
    {
      field: 'idCondutor',
      headerName: 'id Condutor',
      type: 'number',
      flex: 1,
    },
    {
      field: 'idVeiculo',
      headerName: 'id Veículo',
      type: 'number',
      flex: 1,
    },
    {
      field: 'idCliente',
      headerName: 'id Cliente',
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
          onClick={() => handleDeleteDisplacement(params.id)}
          label='Deletar deslocamento'
          showInMenu
        />,
        <GridActionsCellItem
          icon={<CheckCircleOutlineIcon />}
          onClick={() => handleFinishDisplacement(params.id)}
          label='Finalizar deslocamento'
          disabled={params.row.fimDeslocamento !== null ? true : false}
          showInMenu
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
          <DialogTitle>{'Delete Displacement?'}</DialogTitle>
          <DialogContent>
            <DialogContentText id='alert-dialog-slide-description'>
              Tem certeza que deseja excluir esse deslocamento?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={deleteVehicle}>Sim</Button>
            <Button onClick={handleClose}>Não</Button>
          </DialogActions>
        </Dialog>
        <Box sx={{ width: '100%' }}>
          <Typography variant='h3'>Deslocamentos</Typography>

          {data && (
            <DataGrid
              autoHeight={true}
              hideFooterPagination={true}
              columns={columns}
              rows={data}
            />
          )}
          {/* <EditVehicle
            vehicleId={vehicleId}
            editModalOpen={editModalOpen}
            setEditModalOpen={setEditModalOpen}
          /> */}
          <AddDisplacement
            addModalOpen={addModalOpen}
            setAddModalOpen={setAddModalOpen}
          />
          <FinishDisplacement
            finishModalOpen={finishModalOpen}
            setFinishModalOpen={setFinishModalOpen}
            displacementIdToFinish={displacementIdToFinish}
          />
        </Box>
      </Container>
    </Layout>
  )
}

export default Vehicles
