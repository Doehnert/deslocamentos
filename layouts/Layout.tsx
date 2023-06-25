import React, { Fragment, ReactNode, useEffect, useState } from 'react'
import Logo from '../../assets/logo.png'

// sidebar nav config
import AccountCircle from '@mui/icons-material/AccountCircle'
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle'
import MenuIcon from '@mui/icons-material/Menu'
import MoreIcon from '@mui/icons-material/MoreVert'
import {
  AppBar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Toolbar,
  Tooltip,
} from '@mui/material'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import { Stack } from '@mui/system'
import { useQueryClient } from 'react-query'
import { drawerWidth, navbarStyles } from './styles'
import { NavItem, useNav } from './_nav'
import { useRouter } from 'next/router'

interface LayoutProps {
  children: ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter()
  const { pathname, query, asPath } = router

  const navItems: NavItem[] = useNav() // Replace `YourNavItemType` with the actual type of `navItems`
  const [items, setItems] = useState<NavItem[]>([])
  const [mobileOpen, setMobileOpen] = useState(false)
  const [open, setOpen] = useState(false)

  const [anchorEl, setAnchorEl] = useState(null)
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null)

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)
  const isMenuOpen = Boolean(anchorEl)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const handleToggle = () => {
    setOpen(!open)
  }

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    handleMobileMenuClose()
  }

  function handleMenuItemClick(menuItem: any) {
    router.push(menuItem.to)
  }

  const handleProfileMenuOpen = (event: any) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMobileMenuOpen = (event: any) => {
    setMobileMoreAnchorEl(event.currentTarget)
  }

  const menuId = 'primary-search-account-menu'
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <Box px={2} pt={2}>
        <Typography variant='h6'>Conta</Typography>
      </Box>
      <Divider />
      <MenuItem>Sair</MenuItem>
    </Menu>
  )

  const drawer = (
    <Box>
      <Box
        sx={{ display: 'flex', justifyContent: 'center' }}
        mt={2}
        mb={4}
        mr={3}
      >
        {/* <img src={Logo} alt="" style={{ width: "70%" }} /> */}
        logo
      </Box>

      <List>
        {navItems &&
          navItems.map((item: any, index) => {
            return (
              <Fragment key={item.name}>
                <ListItemButton
                  onClick={() => handleMenuItemClick(item)}
                  selected={
                    !!(
                      pathname &&
                      pathname.split('/')[1].toLowerCase() ===
                        item?.name.toLowerCase()
                    )
                  }
                  sx={navbarStyles.ListItemButton}
                >
                  <ListItemIcon sx={navbarStyles.icons}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText sx={navbarStyles.text} primary={item.label} />
                </ListItemButton>
              </Fragment>
            )
          })}
      </List>
    </Box>
  )

  const mobileMenuId = 'primary-search-account-menu-mobile'
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <Divider />
      <MenuItem>Logout</MenuItem>
    </Menu>
  )

  return (
    <>
      <Box>
        <AppBar
          position='sticky'
          sx={{
            backgroundColor: (theme) => theme.palette.primary.light,
            display: 'flex',
            justifyContent: 'space-between',
            width: 'auto',

            ...(open === false && {
              marginLeft: { sm: `calc(${drawerWidth}px)` },
            }),

            paddingLeft: 0,
            boxShadow:
              '0px 0px 32px rgba(43, 79, 124, 0.08), 0px 0px 32px rgba(43, 79, 124, 0.08)',
          }}
        >
          <Toolbar
            sx={{
              justifyContent: 'inherit',
              color: 'white',
            }}
          >
            <IconButton
              size='large'
              edge='start'
              color='inherit'
              aria-label='open drawer'
              sx={{ mr: 2, display: { xs: 'block', sm: 'none' } }}
              onClick={() => handleDrawerToggle()}
            >
              <MenuIcon />
            </IconButton>

            <IconButton
              size='large'
              edge='start'
              color='inherit'
              aria-label='open drawer'
              sx={{ mr: 2, display: { xs: 'none', sm: 'block' } }}
              onClick={() => handleToggle()}
            >
              <MenuIcon />
            </IconButton>

            <Typography
              variant='h6'
              noWrap
              component='div'
              sx={{ display: { xs: 'none', sm: 'block' } }}
            >
              Aplicativo Deslocamento
            </Typography>

            <Box sx={{ flexGrow: 1 }} />

            <Box
              sx={{
                display: {
                  xs: 'none',
                  md: 'flex',

                  'button:focus': 'none',
                },
              }}
            >
              <IconButton
                size='large'
                edge='end'
                aria-label='conta atual'
                aria-controls={menuId}
                aria-haspopup='true'
                onClick={handleProfileMenuOpen}
                color='inherit'
              >
                <AccountCircle />
              </IconButton>
            </Box>
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size='large'
                aria-label='show more'
                aria-controls={mobileMenuId}
                aria-haspopup='true'
                onClick={handleMobileMenuOpen}
                color='inherit'
              >
                <MoreIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
        <Box
          component='nav'
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label='mailbox folders'
        >
          <Drawer
            variant='temporary'
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              ...navbarStyles.drawer,
              display: { xs: 'block', sm: 'none' },
              borderWidth: 0,
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant='persistent'
            sx={{
              ...navbarStyles.drawer,
              flexShrink: 0,
            }}
            open={!open}
            PaperProps={{
              sx: {
                display: { xs: 'none', sm: 'block' },
                borderWidth: 0,
              },
            }}
          >
            {drawer}
          </Drawer>
        </Box>

        <Box sx={{ height: `calc(100vh - 120px)` }}>
          <Paper
            elevation={0}
            sx={{
              ...(open === false && {
                marginLeft: { sm: `calc(${drawerWidth}px)` },
                backgroundColor: (theme) => theme.palette.background.default,
              }),
            }}
          >
            <Box
              component='main'
              sx={{
                paddingBottom: '100px',
                marginTop: 3,
              }}
            >
              {children}
            </Box>
          </Paper>
        </Box>
      </Box>
      <Paper
        sx={{
          ...(open === false
            ? {
                marginLeft: { sm: `calc(${drawerWidth}px)` },
                width: { xs: '100vw', sm: `calc(100vw - ${drawerWidth}px)` },
              }
            : { width: '100vw' }),

          position: 'fixed',
          height: (theme) => theme.spacing(4),
          borderWidth: 0,
          bottom: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: (theme) => theme.palette.secondary.main,
        }}
        component='footer'
        square
        variant='outlined'
      >
        <Typography>Copyright © 2023, eltonfd@gmail.com</Typography>
      </Paper>
    </>
  )
}

export default React.memo(Layout)
