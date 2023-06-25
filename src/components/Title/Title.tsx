import React from 'react'
import { Toolbar, Typography } from '@mui/material'
import { AnyCnameRecord } from 'dns'

export default function Title(props: any) {
  const { text } = props

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
      }}
    >
      <Typography
        sx={{ flex: '1 1 100%' }}
        variant='h6'
        id='tableTitle'
        component='div'
      >
        {text}
      </Typography>
    </Toolbar>
  )
}
