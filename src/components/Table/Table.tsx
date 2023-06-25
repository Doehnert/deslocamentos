import * as React from 'react'
import { alpha, styled } from '@mui/material/styles'
import { DataGrid, gridClasses } from '@mui/x-data-grid'
import Title from '../Title/Title'

const ODD_OPACITY = 0.2

const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
  [`& .${gridClasses.row}.even`]: {
    backgroundColor: theme.palette.grey,
    '&:hover, &.Mui-hovered': {
      backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY),
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    },
    '&.Mui-selected': {
      backgroundColor: alpha(
        theme.palette.primary.main,
        ODD_OPACITY + theme.palette.action.selectedOpacity,
      ),
      '&:hover, &.Mui-hovered': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          ODD_OPACITY +
            theme.palette.action.selectedOpacity +
            theme.palette.action.hoverOpacity,
        ),
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          backgroundColor: alpha(
            theme.palette.primary.main,
            ODD_OPACITY + theme.palette.action.selectedOpacity,
          ),
        },
      },
    },
  },
}))

interface CustomTableProps {
  rows: any[]
  columns: any[]
  title?: string
  hideFooterPagination: boolean
  autoHeight: boolean
}

export default function CustomTable({
  rows,
  columns,
  title,
  ...props
}: CustomTableProps) {
  return (
    <>
      {title && <Title text={title} />}
      <StripedDataGrid
        {...props}
        autoHeight={true}
        isRowSelectable={() => false}
        rows={rows}
        columns={columns}
        getRowClassName={(params) =>
          params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
        }
      />
    </>
  )
}
