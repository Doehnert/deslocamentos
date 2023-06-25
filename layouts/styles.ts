export const drawerWidth = 250

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
export const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}

export const navbarStyles = {
  ListItemButton: {
    '&:hover': {
      background: (theme: any) => theme.palette.secondary.main,
      color: (theme: any) => theme.palette.text.primary,
    },
    borderRadius: '12px',
    marginLeft: '16px',
    marginRight: '16px',
    my: 1,
    pl: 0,
  },
  drawer: {
    display: { xs: 'none', sm: 'block' },
    '& .MuiDrawer-paper': {
      boxSizing: 'border-box',
      width: drawerWidth,
      height: '100%',
      background: (theme: any) => theme.palette.primary.light,
      color: 'rgba(255, 255, 255, 0.7)',
      boxShadow: '0px 0px 32px rgba(43, 79, 124, 0.08);',
    },

    width: drawerWidth,
    flexShrink: 0,
    '& .Mui-selected': {
      background: '#C2D2DF !important',
      color: (theme: any) => theme.palette.primary.light,
    },
  },
  icons: {
    color: 'inherit',
    marginLeft: '20px',
  },
  text: {
    '& span': {
      marginLeft: '-10px',
      fontWeight: '600',
      fontSize: '16px',
    },
  },
}

export const headerStyles = {
  wrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: (theme: any) => theme.palette.primary.light,
    // padding: '20px',
    // marginBottom: '20px',
  },
  topRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'end',
    alignItems: 'center',
    margin: '20px 10px',
    '*': {
      // marginRight: '5px',
    },
  },
  link: {
    fontWeight: 500,
    color: (theme: any) => theme.palette.secondary.main,
    '&:hover': {
      color: '#fff',
      cursor: 'pointer',
    },
  },
  webButton: {
    marginRight: '5px',
  },
}
