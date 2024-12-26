import React from 'react'
import { NextPage } from 'next'

import AddIcon from '@mui/icons-material/Add';

import HeaderPage from '@/components/_general/organisms/HeaderPage.component'
import AppLayoutComponent from '@/components/layout/AppLayout.component'
import ButtonComponent from '@/components/_general/atoms/Button.component'
import TherapyClassTable from '@/components/therapyClass/TherapyClassTable.component';

const TherapyClassPage: NextPage = () => {
  const [openCreateModal, setOpenCreateModal] = React.useState(false);
  const handleOpenCreateModal                 = () => setOpenCreateModal(true);
  const handleCloseCreateModal                = () => setOpenCreateModal(false);

  return (
    <AppLayoutComponent title={'Therapy Class'}>
      <HeaderPage title={'Therapy Class'}>     
        <ButtonComponent
          // buttonColor = 'primary'
          startIcon   = {<AddIcon />}
          onClick     = {handleOpenCreateModal}
        >
          ADD NEW
        </ButtonComponent>
      </HeaderPage>
      <TherapyClassTable 
        modalCreate            = {openCreateModal}
        handleCloseCreateModal = {handleCloseCreateModal}
      />
    </AppLayoutComponent>
  )
}

export default TherapyClassPage;