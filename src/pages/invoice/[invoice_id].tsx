import React from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

import HeaderPage from '@/components/_general/organisms/HeaderPage.component'
import AppLayoutComponent from '@/components/layout/AppLayout.component'
import InvoiceUpdateComponent from '@/components/invoice/InvoiceUpdate.component'
import { Box, Skeleton } from '@mui/material'

const InvoiceUpdatePage: NextPage = () => {

  return (
    <AppLayoutComponent title={'Invoice Edit'}>
      <HeaderPage title={'Invoice Edit'}/>

      {/* {
        invoice_uid == '' ?
        <Skeleton>
          <Box width={'100%'} height={'100%'}></Box>
        </Skeleton>
        : */}
        <InvoiceUpdateComponent />
      {/* } */}
    </AppLayoutComponent>
  )
}

export default InvoiceUpdatePage;