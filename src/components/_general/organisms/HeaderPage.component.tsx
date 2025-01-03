import React from 'react';
import { Box, Typography, Stack } from '@mui/material'

import BreadcrumbsComponent from '../molecules/Breadcrumbs.component';
import { useTheme } from '@mui/material';

interface HeaderPageProps {
  title   : string,
  children?: React.ReactNode,
}
const HeaderPage: React.FC<HeaderPageProps> = ({ title, children }) => {
  
  const theme = useTheme();

  return (
    <Stack flexDirection={"row"} alignItems={"center"} marginBottom={3}>
      <Stack flexDirection={"column"} flexGrow={1}>
        <Typography
          variant   = "h4"
          component = "h1"
          id        = "header-title"
          color     = "initial"
          fontSize  = {'1.5rem'}
          sx        = {{
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
      {children}
    </Stack>
  )
}

export default HeaderPage;