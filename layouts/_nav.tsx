import React, { useEffect, useState } from 'react'
import DashboardIcon from '@mui/icons-material/Dashboard'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import SellIcon from '@mui/icons-material/Sell'
import InventoryIcon from '@mui/icons-material/Inventory'
import PaidIcon from '@mui/icons-material/Paid'
import WorkIcon from '@mui/icons-material/Work'
import LocationOnIcon from '@mui/icons-material/LocationOn'

export interface NavItem {
  id: number
  name: string
  to: string
  icon: JSX.Element
  label?: string
}

export const useNav = (): NavItem[] => {
  const [items, setItems] = useState<NavItem[]>([])

  useEffect(() => {
    setItems([
      {
        id: 1,
        name: 'clients',
        to: '/clients',
        icon: <PeopleAltIcon />,
        label: 'Clientes',
      },
      {
        id: 2,
        name: 'conductors',
        to: '/conductors',
        icon: <LocationOnIcon />,
        label: 'Condutores',
      },
      {
        id: 3,
        name: 'vehicles',
        to: '/vehicles',
        icon: <SellIcon />,
        label: 'Veículos',
      },
      {
        id: 4,
        name: 'displacements',
        to: '/displacements',
        icon: <PeopleAltIcon />,
        label: 'Deslocamentos',
      },
    ])
  }, [])

  return items
}
