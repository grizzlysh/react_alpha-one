import React from 'react';
import Link from 'next/link';

import { Box, Toolbar, IconButton, Typography, Divider, List, ListItemButton, ListItemIcon, ListItemText, Stack, Link as MUILink, Collapse } from '@mui/material';
import { ChevronLeft, ExpandMore, ExpandLess, ChevronRight } from '@mui/icons-material';

import menu from '@/utils/menu';
import theme from '@/utils/theme';
import VerticalMenuComponent from '../_general/atoms/VerticalMenu.component';
import VerticalModalComponent from '../_general/atoms/VerticalModal.component';


interface AppMenuProps {
  openDrawer  : boolean,
  pathActive  : string,
  handleDrawer: () => void,
}

const AppMenuComponent: React.FC<AppMenuProps> = ({ openDrawer, pathActive, handleDrawer }) => {
  const [openList, setopenList] = React.useState<{[key: string]: any}>({});

  const handleListOpen = ( menu: any ) => {
    if(!openDrawer){
      // if (menu.child){
        handleDrawer()
      // }
    }
      // openList.foreach( (open) => {
      //   setopenList(!open)
      // })
    setopenList(prev => ({
      ...prev, [menu.title]: !prev[menu.title] 
    }));
  };

  return (
    <>
      <Toolbar
        sx = {{
          display        : 'fixed',
          alignItems     : 'center',
          top            : 0,
          left           : 0,
          right          : 0,
          zIndex         : '-10',
          px             : [1],
          boxShadow      : openDrawer ? '0px 1px 3px rgba(0, 0, 0, 0.125)' : '',
          // boxShadow      : openDrawer ? '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)': '',
          // backgroundColor: 'transparent',
          // justifyContent: 'flex-end',
        }}
      >
        <Typography 
          variant  = "h4"
          flexGrow = {1}
          align    = {"center"}
          color    = "primary"
        >
          MENU
        </Typography>
        <IconButton onClick={handleDrawer}>
          <ChevronLeft />
        </IconButton>
      </Toolbar>
      
      <Box 
        sx = {{
          position : 'relative',
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        <List 
          key       = {"nav-0"}
          component = "nav"
          sx        = {{
            alignItems    : "center",
            alignContent  : "center",
            justifyContent: "center"
          }}
        >
        {/* <Stack component="nav"> */}
          {
            menu.map((menu,idx)=> {
              const active = menu.path ? (pathActive === menu.path) : false;


              return (
                (menu.title == 'divider') 
                ?
                  <Divider />
                :
                  <Box
                    key = {menu.title+'-'+idx}
                  >
                  <MUILink
                    passHref
                    shallow = {true}
                    key       = {menu.title+'-'+idx}
                    component = {Link}
                    // height    = {24}
                    underline = "hover"
                    href      = {menu.path}
                    variant   = 'h1'
                    sx        = {{
                      textDecoration: 'none',
                      display       : 'flex',
                      alignItems    : 'center',
                      lineHeight    : 1.5,
                      fontSize      : '0.875rem',
                      fontWeight    : 700,
                      "&:hover"     : {
                        color         : theme.palette.primary.main,
                        textDecoration: "none"
                      }
                    }}
                  >
                    <ListItemButton
                      id       = {menu.title}                  
                      key       = {menu.title+'-L'+idx}
                      selected = {active}
                      // onClick  = {menu.child ? (() => handleListOpen(menu.title)) : (() => '#')}
                      onClick  = {() => handleListOpen(menu)}
                      sx       = {{
                        pl: 2.5,
                      }}
                      aria-controls={openList[menu.title] ? menu.title : undefined}
                      aria-haspopup="true"
                      aria-expanded={openList[menu.title] ? 'true' : undefined}
                    >
                      <ListItemIcon>
                        {menu.icon}
                      </ListItemIcon>
                      <ListItemText
                        // primary={menu.title}
                      >
                        <Typography sx = {{
                          lineHeight    : 1.5,
                          // fontSize      : '0.875rem',
                          fontWeight    : 500,
                        }}  > 
                          {menu.title}
                        </Typography>
                      </ListItemText>
                      { menu.child && (openList[menu.title] ? <ExpandMore /> : <ChevronRight />) }
                    </ListItemButton>
                  </MUILink>
                  {menu.child?.map((submenu, index) => (
                    <Collapse
                      key     = {index}
                      in      = {openList[menu.title]}
                      timeout = "auto"
                      unmountOnExit
                    >
                      <List                   
                        key     = {'SL-'+index}
                        component = "div"
                        sx        = {{
                          alignItems    : "center",
                          alignContent  : "center",
                          justifyContent: "center"
                        }}
                        disablePadding
                      >
                      <MUILink
                        passHref
                        shallow = {true}
                        key       = {submenu.title}
                        component = {Link}
                        // height    = {24}
                        underline = "hover"
                        href      = {submenu.path}
                        variant   = 'h1'
                        sx        = {{
                          textDecoration: 'none',
                          display       : 'flex',
                          alignItems    : 'center',
                          lineHeight    : 1.5,
                          fontSize      : '0.875rem',
                          fontWeight    : 700,
                          "&:hover"     : {
                            color         : theme.palette.primary.main,
                            textDecoration: "none"
                          }
                        }}
                      >
                        <ListItemButton
                          id       = {menu.title}
                          selected = {active}
                          sx       = {{ pl: 9.5 }}
                        >
                          <ListItemText>
                            <Typography sx = {{
                              lineHeight    : 1.5,
                              // fontSize      : '0.875rem',
                              fontWeight    : 500,
                            }} > 
                              {submenu.title}
                            </Typography>
                          </ListItemText>
                        </ListItemButton>
                    </MUILink>
                      </List>
                    </Collapse>
                  ))}
                  </Box>
              );
            })
          }
        </List>
        {/* </Stack> */}
      </Box>
    </>

  )
}

export default AppMenuComponent;