import React from 'react'
import { NextPage } from 'next'

import AddIcon from '@mui/icons-material/Add';

import HeaderPage from '@/components/_general/organisms/HeaderPage.component'
import AppLayoutComponent from '@/components/layout/AppLayout.component'
import RoleTable from '@/components/role/RoleTable.component'
import ButtonComponent from '@/components/_general/atoms/Button.component'
import LinkButtonComponent from '@/components/_general/atoms/LinkButton.component';

const InvoicePage: NextPage = () => {
  const [openCreateModal, setOpenCreateModal] = React.useState(false);
  const handleOpenCreateModal                 = () => setOpenCreateModal(true);
  const handleCloseCreateModal                = () => setOpenCreateModal(false);

  return (
    <AppLayoutComponent title={'Invoice'}>
      <HeaderPage title={'Invoice'}>
        <LinkButtonComponent
          buttonColor = 'primary'
          startIcon   = {<AddIcon />}
          url         = {'/invoice/create'}
        >
          ADD NEW
        </LinkButtonComponent>
      </HeaderPage>
      {/* <RoleTable 
        modalCreate            = {openCreateModal}
        handleCloseCreateModal = {handleCloseCreateModal}
      /> */}
    </AppLayoutComponent>
  )
}

export default InvoicePage;