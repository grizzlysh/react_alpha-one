import React from 'react';
import Head from 'next/head';
import { Box } from '@mui/material';
import { usePathname } from 'next/navigation';

import useRedirect from '@/hooks/other/use-redirect';
import { useTypedSelector } from '@/hooks/other/use-type-selector';
import MainSectionComponent from '@/components/compounds/MainSection.component';
import HeaderSectionComponent from '@/components/organisms/HeaderSection.component';
import FooterSectionComponent from '@/components/compounds/FooterSection.component';

interface AppLayoutProps {
  title   : string,
  children: React.ReactNode,
}

const AppLayoutComponent: React.FC<AppLayoutProps> = ({ title, children }) => {
  
  const [openMenu, setOpenMenu] = React.useState(false)
  const pathName                = usePathname();
  const handleMenu              = () => {
    // e.preventDefault()
    // console.log(open);
    setOpenMenu(!openMenu);
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
        <title> {title} | Pharmacie de Medecine </title>
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
          <HeaderSectionComponent openDrawer={openMenu} pathActive={pathName} handleDrawer={handleMenu} handleLogout={handleMenu} />
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
            <FooterSectionComponent />
          </Box>
        </Box>
      )}
    </>
  )
}

export default AppLayoutComponent;