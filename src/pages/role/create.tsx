import React from 'react'
import { NextPage } from 'next'

import HeaderPage from '@/components/_general/organisms/HeaderPage.component'
import AppLayoutComponent from '@/components/layout/AppLayout.component'
import RoleCreateComponent from '../../components/role/RoleCreate.component'

const RoleCreatePage: NextPage = () => {

  return (
    <AppLayoutComponent title={'Role Create'}>
      <HeaderPage title={'Role Create'}/>
      <RoleCreateComponent />
    </AppLayoutComponent>
  )
}

export default RoleCreatePage;