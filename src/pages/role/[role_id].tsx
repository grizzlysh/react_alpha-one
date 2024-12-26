import React from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

import HeaderPage from '@/components/_general/organisms/HeaderPage.component'
import AppLayoutComponent from '@/components/layout/AppLayout.component'
import RoleUpdateComponent from '@/components/role/RoleUpdate.component'
import { Box, Skeleton } from '@mui/material'

const RoleUpdatePage: NextPage = () => {

  const router      = useRouter();
  const { role_id } = router.query;
  const role_uid    = role_id ? role_id.toString() : '';
  
  return (
    <AppLayoutComponent title={'Role Edit'}>
      <HeaderPage title={'Role Edit'}/>

      {/* {
        role_uid == '' ?
        <Skeleton>
          <Box width={'100%'} height={'100%'}></Box>
        </Skeleton>
        : */}
        <RoleUpdateComponent updateRole={role_uid} />
      {/* } */}
    </AppLayoutComponent>
  )
}

export default RoleUpdatePage;