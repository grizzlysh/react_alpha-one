import React from 'react';
import Head from 'next/head';
import { Box } from '@mui/material';
import { usePathname } from 'next/navigation';

import { useTypedSelector } from '@/hooks/other/use-type-selector';
import HeaderSectionComponent from '@/components/organisms/HeaderSection.component';
import MainSectionComponent from '@/components/compounds/MainSection.component';
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


  return (
    <>
      <Head>
        <title> {title} | Pharmacie de Medecine </title>
      </Head>

      <Box sx={{ display: 'flex' }}>
        <HeaderSectionComponent openDrawer={openMenu} pathActive={pathName} handleDrawer={handleMenu} handleLogout={handleMenu} />
        <Box
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                    :    theme.palette.grey[900],
            display  : 'flex',
            flexGrow : 1,
            flexFlow : 'column',
            flexWrap : 'nowrap',
            minHeight: '100vh',
          }}
        >
          <MainSectionComponent>
            {children}
          </MainSectionComponent>
          <FooterSectionComponent />
        </Box>
      </Box>
    </>
  )
}

export default AppLayoutComponent;