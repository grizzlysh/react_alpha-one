import React from 'react';
import { Box, Button, Typography, Stack } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';

import theme from '@/utils/theme';
import ButtonComponent from '../atoms/Button.component';
import BreadcrumbsComponent from '../molecules/Breadcrumbs.component';

interface HeaderPageProps {
  title                : string,
  handleModalCreateOpen: () =>void,
}
const HeaderPage: React.FC<HeaderPageProps> = ({ title, handleModalCreateOpen }) => {
  
  return (
    <Stack flexDirection={"row"} alignItems={"center"} marginBottom={3}>
      <Stack flexDirection={"column"} flexGrow={1}>
        <Typography
          variant  = "h4"
          color    = "initial"
          fontSize = {'1.5rem'}
          sx       = {{
            // '@media (max-width:500px)': {
            //   fontSize: '1.25rem',
            // },
            // '@media (min-width:600px)': {
            //   fontSize: '1.5rem',
            // },
            [theme.breakpoints.down('md')]: {
              fontSize: '1.25rem',
            },
          }}
          fontWeight = {700}
          lineHeight = {1.5}
        >
          {title}
        </Typography>
        <BreadcrumbsComponent />
      </Stack>
      <ButtonComponent
        startIcon = {<AddIcon />}
        onClick   = {handleModalCreateOpen}
        // sx        = {{
        //   justifyContent: 'center',
        //   alignItems    : 'center',
        //   alignContent  : 'center',
        // }}
      >
        Add New
      </ButtonComponent>
    </Stack>
  )
}

export default HeaderPage;