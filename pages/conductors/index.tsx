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
import React, { useState } from 'react'
import Layout from '../../layouts/Layout'
import CustomTable from '../../src/components/Table/Table'
import { useConductors } from './hooks/useConductors'
import {
  DataGrid,
  GridActionsCellItem,
  GridValueFormatterParams,
} from '@mui/x-data-grid'
import EditConductor from './components/EditConductor'
import DeleteIcon from '@mui/icons-material/Delete'
import { TransitionProps } from '@mui/material/transitions'
import AddConductor from './components/AddConductor'
import { useDeleteConductor } from './hooks/useDeleteConductor'

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction='up' ref={ref} {...props} />
})

const Conductors = () => {
  const data = useConductors()
  const mudateDeleteConductor = useDeleteConductor()

  const [conductorId, setConductorId] = useState<number | null>(null)
  const [addModalOpen, setAddModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [conductorIdToDelete, setConductorIdToDelete] = useState(0)
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false)

  const handleClose = () => {
    setOpenConfirmDelete(false)
  }

  const openAddModal = () => {
    setAddModalOpen(true)
  }

  const openEditModal = (conductorId: number) => {
    setConductorId(conductorId)
    setEditModalOpen(true)
  }

  const handleDeleteConductor = (conductorId: number) => {
    setConductorIdToDelete(conductorId)
    setOpenConfirmDelete(true)
  }

  const deleteConductor = async () => {
    mudateDeleteConductor({ conductorId: conductorIdToDelete })
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
      field: 'nome',
      headerName: 'Nome',
      type: 'string',
      flex: 1,
    },
    {
      field: 'numeroHabilitacao',
      headerName: 'Número da habilitação',
      maxWidth: 200,
      type: 'string',
      flex: 1,
    },
    {
      field: 'catergoriaHabilitacao',
      headerName: 'Categoria da habilitação',
      type: 'string',
      flex: 1,
    },
    {
      field: 'vencimentoHabilitacao',
      headerName: 'Vencimento da habilitação',
      type: 'string',
      flex: 1,
      valueFormatter: (params: GridValueFormatterParams<string>) =>
        params?.value ? new Date(params?.value).toLocaleString() : '-',
    },
    {
      field: 'actions',
      type: 'actions',
      flex: 0.5,
      getActions: (params: any) => [
        <GridActionsCellItem
          icon={<DeleteIcon />}
          onClick={() => handleDeleteConductor(params.id)}
          label='Delete Conductor'
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
          <DialogTitle>{'Delete Conductor?'}</DialogTitle>
          <DialogContent>
            <DialogContentText id='alert-dialog-slide-description'>
              Tem certeza que deseja excluir esse condutor?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={deleteConductor}>Sim</Button>
            <Button onClick={handleClose}>Não</Button>
          </DialogActions>
        </Dialog>
        <Box sx={{ width: '100%' }}>
          <Typography variant='h3'>Condutores</Typography>

          {data && (
            <DataGrid
              autoHeight={true}
              hideFooterPagination={true}
              columns={columns}
              rows={data}
            />
          )}
          <EditConductor
            conductorId={conductorId}
            editModalOpen={editModalOpen}
            setEditModalOpen={setEditModalOpen}
          />
          <AddConductor
            addModalOpen={addModalOpen}
            setAddModalOpen={setAddModalOpen}
          />
        </Box>
      </Container>
    </Layout>
  )
}

export default Conductors
