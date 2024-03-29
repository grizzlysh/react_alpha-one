import React from 'react';
import { useRouter } from 'next/router';

import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { styled, useTheme } from '@mui/material/styles';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import { Toolbar, IconButton, Typography, MenuItem, Menu, Stack, ListItemIcon, Paper } from '@mui/material';
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
  openDrawer    : boolean,
  handleDrawer  : () => void,
  handleLogout  : () => void,
  isTitleVisible: boolean,
  title         : string,
}

// interface ElevationScrollProps {
//   children: React.ReactElement
// }

// const ElevationScroll = (props: ElevationScrollProps) => {
//   const { children } = props;

//   const trigger = useScrollTrigger({
//     disableHysteresis: true,
//     threshold        : 0,
//   });

//   return React.cloneElement(children, {
//     elevation: trigger ? 4 : 0,
//   });
// }

// const TitleTopBar = styled(Typography)(
//   ( {theme} ) => ({
//     '@keyframes fadeIn': {
//       '0%'  : {opacity: 0,},
//       '100%': {opacity: 1,},
//     },
//     '@keyframes fadeOut': {
//       '0%'  : {opacity: 1,},
//       '100%': {opacity: 0,},
//     },
//   })
// )

const TopBarComponent: React.FC<TopBarProps> = ( {openDrawer, handleDrawer, handleLogout, isTitleVisible, title, ...props} ) => {

  const router                          = useRouter();
  const [profileModal, setProfileModal] = React.useState<null | HTMLElement>(null)

  const handleOpenProfileModal = (event: React.MouseEvent<HTMLElement>) => {
    setProfileModal(event.currentTarget)
  }

  const handleCloseProfileModal = () => {
    setProfileModal(null)
  }

  const handleProfile = () => {
    router.push('/profile', undefined, { shallow: true })
  }

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
            noWrap
            id         = {'topbar-title'}
            component  = "h1"
            variant    = "h4"
            color      = "initial"
            fontSize   = {'1.5rem'}
            fontWeight = {700}
            lineHeight = {1.5}
            sx         = {{ 
              '@keyframes fadeIn': {
                '0%'  : {opacity: 0,},
                '100%': {opacity: 1,},
              },
              '@keyframes fadeOut': {
                '0%'  : {opacity: 1,},
                '100%': {opacity: 0,},
              },
              opacity   : 0,
              flexGrow  : 1,
              visibility: !isTitleVisible ? "visible" : "hidden",
              animation : !isTitleVisible ? 'fadeIn 0.5s forwards': 'fadeOut 0.5s forwards',
            }}
          >
            {title}
          </Typography>

          <IconButton
            // size          = "large"
            aria-label    = "account of current user"
            aria-controls = "menu-appbar"
            aria-haspopup = "true"
            onClick       = {handleOpenProfileModal}
            color         = "inherit"
          >
            <AccountCircleIcon />
          </IconButton>
            {/* <IconButton
              color   = "inherit"
              onClick = {handleLogout}
            >
              <LogoutIcon />
            </IconButton> */}
          <Menu
            id           = "menu-appbar"
            anchorEl     = {profileModal}
            anchorOrigin = {{
              vertical  : 'bottom',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical  : 'top',
              horizontal: 'right',
            }}
            open    = {Boolean(profileModal)}
            onClose = {handleCloseProfileModal}
            sx      = {{
              '& .MuiPaper-root': {
                borderRadius  : 3,
                minWidth      : 150,
                overflow      : 'visible',
                backdropFilter: 'blur(20px)',
                // filter      : 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                // marginTop: theme.spacing(1),
              }
            }}
          >
            <MenuItem onClick={handleProfile}>
              <ListItemIcon>
                <ManageAccountsIcon fontSize="small" />
              </ListItemIcon>
               Profile
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>

        </Toolbar>
      </TopBar>
    // </ElevationScroll>
  )
}

export default TopBarComponent;