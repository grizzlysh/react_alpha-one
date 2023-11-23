import React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';

import { DRAWER_WIDTH } from '@/configs/constant';
import { Toolbar, IconButton, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const TopBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex    : theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing  : theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: DRAWER_WIDTH,
    width: `calc(100% - ${DRAWER_WIDTH}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing  : theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

interface TopBarProps {
  openDrawer  : boolean,
  handleDrawer: () => void,
  handleLogout: () => void,
}

const TopBarComponent: React.FC<TopBarProps> = ( {openDrawer, handleDrawer, handleLogout, ...props} ) => {

  return (
    <TopBar
      position = "fixed"
      open     = {openDrawer}
      color    = 'transparent'
      sx       = {{      
        // backgroundColor: "red",
        // backgroundColor: 'Color(0x44000000)',
        // opacity       : "50%",
        backdropFilter: "blur(20px)"
      }}
      {...props}
    >
      <Toolbar 
        sx = {{
          // opacity: '1',
          pr: '24px'
        }}
      >
        <IconButton
          edge       = "start"
          aria-label = "open drawer"
          onClick    = {handleDrawer}
          color      = "inherit"
          sx         = {{
            marginRight: '36px',
            ...(openDrawer && { display: "none" }),
          }}
        >
          <MenuIcon />
        </IconButton>

        <Typography
          component = "h1"
          variant   = "h6"
          color     = "inherit"
          sx        = {{ flexGrow: 1 }}
          noWrap
        >
          Dashboard
        </Typography>

        <IconButton
          color   = "inherit"
          onClick = {handleLogout}
        >
          <LogoutIcon />
        </IconButton>
      </Toolbar>
    </TopBar>
  )
}

export default TopBarComponent;