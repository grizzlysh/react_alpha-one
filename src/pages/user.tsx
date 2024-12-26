import React from 'react'
import { NextPage } from 'next'

import AddIcon from '@mui/icons-material/Add';

import HeaderPage from '@/components/_general/organisms/HeaderPage.component'
import AppLayoutComponent from '@/components/layout/AppLayout.component'
import PermissionTable from '@/components/permission/PermissionTable.component'
import ButtonComponent from '@/components/_general/atoms/Button.component'
import UserTable from '@/components/user/UserTable.component';

const UserPage: NextPage = () => {
  const [openCreateModal, setOpenCreateModal] = React.useState(false);
  const handleOpenCreateModal                 = () => setOpenCreateModal(true);
  const handleCloseCreateModal                = () => setOpenCreateModal(false);

  return (
    <AppLayoutComponent title={'User'}>
      <HeaderPage title={'User'}>     
        <ButtonComponent
          buttonColor = 'shadow'
          startIcon   = {<AddIcon />}
          onClick     = {handleOpenCreateModal}
        >
          ADD NEW
        </ButtonComponent>
      </HeaderPage>
      <UserTable
        modalCreate            = {openCreateModal}
        handleCloseCreateModal = {handleCloseCreateModal}
      />
    </AppLayoutComponent>
  )
}

export default UserPage;