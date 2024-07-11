import React from 'react'
import { NextPage } from 'next'

import AddIcon from '@mui/icons-material/Add';

import HeaderPage from '@/components/_general/organisms/HeaderPage.component'
import AppLayoutComponent from '@/components/layout/AppLayout.component'
import RoleTable from '@/components/role/RoleTable.component'
import LinkButtonComponent from '@/components/_general/atoms/LinkButton.component';

const RolePage: NextPage = () => {

  return (
    <AppLayoutComponent title={'Role'}>
      <HeaderPage title={'Role'}>
        <LinkButtonComponent
          buttonColor = 'primary'
          startIcon   = {<AddIcon />}
          url         = {'/role/create'}
        >
          ADD NEW
        </LinkButtonComponent>
      </HeaderPage>
      <RoleTable />
    </AppLayoutComponent>
  )
}

export default RolePage;