import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import { styled, useTheme } from '@mui/material/styles';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import { Toolbar, IconButton, Typography } from '@mui/material';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';

import { DRAWER_WIDTH } from '@/configs/constant';


interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const TopBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  [theme.breakpoints.up('md')]: {
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
  },
}));


interface TopBarProps {
  openDrawer  : boolean,
  handleDrawer: () => void,
  handleLogout: () => void,
}

interface ElevationScrollProps {
  children: React.ReactElement
}

const ElevationScroll = (props: ElevationScrollProps) => {
  const { children } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold        : 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

const TopBarComponent: React.FC<TopBarProps> = ( {openDrawer, handleDrawer, handleLogout, ...props} ) => {

  return (
    // <ElevationScroll>
      <TopBar
        id       = 'topbar'
        position = "fixed"
        open     = {openDrawer}
        color    = 'transparent'
        sx       = {{   
          // backgroundColor: "red",
          // backgroundColor: 'Color(0x44000000)',
          // opacity       : "50%",
          paddingRight  : '0 !important',
          backdropFilter: "blur(20px)",
          boxShadow     : '0px 2px 3px rgba(0, 0, 0, 0.125)',
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
    // </ElevationScroll>
  )
}

export default TopBarComponent;