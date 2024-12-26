import React from 'react'
import { NextPage } from 'next'

import AddIcon from '@mui/icons-material/Add';

import HeaderPage from '@/components/_general/organisms/HeaderPage.component'
import AppLayoutComponent from '@/components/layout/AppLayout.component'
import ButtonComponent from '@/components/_general/atoms/Button.component'
import StockTable from '@/components/stock/StockTable.component';
// import ShapeTable from '@/components/shape/ShapeTable.component';

const StockPage: NextPage = () => {
  const [openCreateModal, setOpenCreateModal] = React.useState(false);
  const handleOpenCreateModal                 = () => setOpenCreateModal(true);
  const handleCloseCreateModal                = () => setOpenCreateModal(false);

  return (
    <AppLayoutComponent title={'Stock'}>
      <HeaderPage title={'Stock'}>     
        <ButtonComponent
          buttonColor = 'primary'
          startIcon   = {<AddIcon />}
          onClick     = {handleOpenCreateModal}
        >
          ADD NEW
        </ButtonComponent>
      </HeaderPage>
      <StockTable />
      {/* <ShapeTable 
        modalCreate            = {openCreateModal}
        handleCloseCreateModal = {handleCloseCreateModal}
      /> */}
    </AppLayoutComponent>
  )
}

export default StockPage;