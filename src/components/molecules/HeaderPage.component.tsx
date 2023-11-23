import React from 'react';
import { Box, Typography } from '@mui/material'
import BreadcrumbsComponent from '../compounds/Breadcrumbs.component';
import theme from '@/utils/theme';

interface HeaderPageProps {
  title: string
}
const HeaderPage: React.FC<HeaderPageProps> = ({ title }) => {
  
  return (
    <Box marginBottom={3}>
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
    </Box>
  )
}

export default HeaderPage;