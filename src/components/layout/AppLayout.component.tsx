import React, { useEffect } from 'react';
import Head from 'next/head';
import { Box } from '@mui/material';
import { usePathname } from 'next/navigation';

import useRedirect from '@/hooks/other/use-redirect';
import { useTypedSelector } from '@/hooks/other/use-type-selector';
import useLogout from '@/hooks/auth/use-logout';
import TopBarComponent from './TopBar.component';
import SideBarComponent from './SideBar.component';
import BottomBarComponent from './BottomBar.component';
import MainSectionComponent from './MainSection.component';
import menu from '@/utils/menu';
import { Menu } from '@/types/Menu.type';
import { useDispatch } from 'react-redux';
import { setMenuAccord, setMenuDrawer } from '@/stores/slices/app.slice';

interface AppLayoutProps {
  title   : string,
  children: React.ReactNode,
}

const AppLayoutComponent: React.FC<AppLayoutProps> = ({ title, children }) => {
  
  const dispatch                            = useDispatch();
  const [isTitleVisible, setIsTitleVisible] = React.useState(true)
  const pathName                            = usePathname();
  const {logout: doLogout}                  = useLogout();
  const appMenuAccord                       = useTypedSelector(
    (state) => state.reducer.app.menu_accord,
  );
  const appMenuDrawer           = useTypedSelector(
    (state) => state.reducer.app.menu_drawer,
  );

  useEffect( () => {
    const handleScroll = () => {
      const headerTitleElement = document.getElementById('header-title');
      const topbarTitleElement = document.getElementById('topbar-title');
      const topBarElement      = document.getElementById('topbar');

      if(!headerTitleElement) return;

      const titleTop  = headerTitleElement.getBoundingClientRect().bottom;
      const isVisible = titleTop - (topBarElement?.clientHeight || 0) - 6 >= 0 && titleTop <= window.innerHeight;

      setIsTitleVisible(isVisible);
      // if (!isVisible) {
      //   console.log(titleVisible)
      //   setTitleVisible(false)
      //   topbarTitleElement ? (topbarTitleElement.style.animation = 'fadeIn 0.5s ease-in') : '';
      //   // console.log(topbarTitleElement?.style)
      // }
      // else {
      //   setTitleVisible(true)
      //   topbarTitleElement?.style.animation && (topbarTitleElement.style.animation = 'fadeOut 0.5s ease-out');
      // }
    };
    
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, []);
  
  const handleMenu                      = () => {
    // e.preventDefault()
    // setOpenMenu(!openMenu);

    dispatch(setMenuDrawer(!appMenuDrawer))
    
    const currentListOpen = { ...appMenuAccord }
    for(let key in appMenuAccord){
      if(appMenuDrawer == false){
        currentListOpen[key] = !appMenuAccord[key]
      }
      else {
        currentListOpen[key] = false
      }
    }
    // setopenListMenu(currentListOpen)
    dispatch(setMenuAccord(currentListOpen))
    // setopenListMenu(prev => ({
    //   ...prev, [menu.title]: !prev[menu.title] 
    // }));
  };

  const handleListOpen = ( menu: Menu ) => {
    if(!appMenuDrawer){
      // if (menu.child){
        handleMenu()
      // }
    }
      // openList.foreach( (open) => {
      //   setopenList(!open)
      // })

    if(appMenuAccord[menu.title] == true){
      const currentListOpen = { ...appMenuAccord }
      delete currentListOpen[menu.title]
      dispatch(setMenuAccord(currentListOpen))  
    }
    else{
      dispatch(setMenuAccord({...appMenuAccord, [menu.title]: !appMenuAccord[menu.title]}))
    }

    // setopenListMenu(prev => ({
    //   ...prev, [menu.title]: !prev[menu.title] 
    // }));
  };

  const accessToken = useTypedSelector(
    (state) => state.reducer.user.access_token,
  );

  useRedirect({
    toUrl    : '/login',
    condition: !!accessToken === false,
  });


  return (
    <>
      <Head>
        <title> {title} | Farmacia </title>
      </Head>

      {!!accessToken && (
        <Box 
          sx={{ 
            display        : 'flex',
            backgroundColor: (theme) =>
                theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
          }}
        >
          <TopBarComponent openDrawer={appMenuDrawer} handleDrawer={handleMenu} handleLogout={doLogout} isTitleVisible={isTitleVisible} title={title} />
          <SideBarComponent pathActive={pathName} openDrawer={appMenuDrawer} handleDrawer={handleMenu} openListMenu={appMenuAccord} handleOpenListMenu={handleListOpen}/>
          <Box
            component = "main"
            sx        = {{
              // backgroundColor: (theme) =>
              //   theme.palette.mode === 'light'
              //   ? theme.palette.grey[100]
              //   :  theme.palette.grey[900],
    
              flexGrow     : 1,
              width        : '100%',
              display      : 'flex',
              flexDirection: 'column',
              minHeight    : '100vh',
              overflow     : "auto",
              // flexWrap : 'nowrap',
            }}
          >
            <MainSectionComponent>
              {children}
            </MainSectionComponent>
            <BottomBarComponent />
          </Box>
        </Box>
      )}
    </>
  )
}

export default AppLayoutComponent;