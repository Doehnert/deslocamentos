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
import { GridActionsCellItem } from '@mui/x-data-grid'
import React, { useState } from 'react'
import CustomTable from '../../src/components/Table/Table'
import Layout from '../../layouts/Layout'
import AddClient from './components/AddClient'
import EditClient from './components/EditClient'
import { useClients } from './hooks/useClients'
import { useDeleteClient } from './hooks/useDeleteClient'
import { FormattedMessage } from 'react-intl'

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction='up' ref={ref} {...props} />
})

const Clients = () => {
  const data = useClients()
  const mutateDeleteClient = useDeleteClient()

  const [clientId, setClientId] = useState<number | null>(null)
  const [addModalOpen, setAddModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [clientIdToDelete, setClientIdToDelete] = useState(0)
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false)

  const handleClose = () => {
    setOpenConfirmDelete(false)
  }

  const openAddModal = () => {
    setAddModalOpen(true)
  }

  const openEditModal = (clientId: number) => {
    setClientId(clientId)
    setEditModalOpen(true)
  }

  const handleDeleteClient = (clientId: number) => {
    setClientIdToDelete(clientId)
    setOpenConfirmDelete(true)
  }

  const deleteClient = async () => {
    mutateDeleteClient({ clientId: clientIdToDelete })
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
      field: 'numeroDocumento',
      headerName: <FormattedMessage id='clients.numeroDocumento' />,
      type: 'string',
      flex: 1,
    },
    {
      field: 'tipoDocumento',
      headerName: <FormattedMessage id='clients.tipoDocumento' />,
      flex: 1,
      type: 'string',
    },
    {
      field: 'nome',
      headerName: <FormattedMessage id='clients.nome' />,
      flex: 1,
      type: 'string',
    },
    {
      field: 'logradouro',
      headerName: <FormattedMessage id='clients.logradouro' />,
      flex: 1,
      type: 'string',
    },
    {
      field: 'numero',
      headerName: <FormattedMessage id='clients.numero' />,
      flex: 1,
      type: 'string',
    },
    {
      field: 'bairro',
      headerName: <FormattedMessage id='clients.bairro' />,
      flex: 1,
      type: 'string',
    },
    {
      field: 'cidade',
      headerName: <FormattedMessage id='clients.cidade' />,
      flex: 1,
      type: 'string',
    },
    {
      field: 'uf',
      headerName: <FormattedMessage id='clients.uf' />,
      flex: 1,
      type: 'string',
    },
    {
      field: 'actions',
      type: 'actions',
      getActions: (params: any) => [
        <GridActionsCellItem
          icon={<DeleteIcon />}
          onClick={() => handleDeleteClient(params.id)}
          label='Delete Client'
        />,
      ],
    },
  ]

  return (
    <Layout>
      <Container maxWidth={false} disableGutters={false} component='main'>
        <Grid item xs={12} sx={{ textAlign: 'end' }}>
          <Button variant='contained' onClick={() => openAddModal()}>
            <FormattedMessage id='Add' />
          </Button>
        </Grid>
        <Dialog
          open={openConfirmDelete}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby='alert-dialog-slide-description'
        >
          <DialogTitle>{'Excluir cliente?'}</DialogTitle>
          <DialogContent>
            <DialogContentText id='alert-dialog-slide-description'>
              Tem certeza que deseja deletar esse cliente?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={deleteClient}>Sim</Button>
            <Button onClick={handleClose}>Não</Button>
          </DialogActions>
        </Dialog>
        <Box sx={{ width: '100%' }}>
          <Typography variant='h3'>Clientes</Typography>

          {data && (
            <CustomTable
              autoHeight={true}
              hideFooterPagination={false}
              columns={columns}
              rows={data}
            />
          )}
          <EditClient
            clientId={clientId}
            editModalOpen={editModalOpen}
            setEditModalOpen={setEditModalOpen}
          />
          <AddClient
            addModalOpen={addModalOpen}
            setAddModalOpen={setAddModalOpen}
          />
        </Box>
      </Container>
    </Layout>
  )
}

export default Clients
