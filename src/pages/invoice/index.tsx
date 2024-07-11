import React from 'react'
import { NextPage } from 'next'

import AddIcon from '@mui/icons-material/Add';

import HeaderPage from '@/components/_general/organisms/HeaderPage.component'
import AppLayoutComponent from '@/components/layout/AppLayout.component'
import ButtonComponent from '@/components/_general/atoms/Button.component'
import LinkButtonComponent from '@/components/_general/atoms/LinkButton.component';
import InvoiceTable from '@/components/invoice/InvoiceTable.component';

const InvoicePage: NextPage = () => {
  
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
      <InvoiceTable />
    </AppLayoutComponent>
  )
}

export default InvoicePage;