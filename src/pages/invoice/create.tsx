import React from 'react'
import { NextPage } from 'next'

import HeaderPage from '@/components/_general/organisms/HeaderPage.component'
import AppLayoutComponent from '@/components/layout/AppLayout.component'
import InvoiceCreateComponent from '@/components/invoice/InvoiceCreate.component'

const InvoiceCreatePage: NextPage = () => {

  return (
    <AppLayoutComponent title={'Invoice Create'}>
      <HeaderPage title={'Invoice Create'}/>
      <InvoiceCreateComponent />
    </AppLayoutComponent>
  )
}

export default InvoiceCreatePage;