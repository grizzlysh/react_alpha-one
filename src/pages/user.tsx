import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { Box, Typography } from '@mui/material'
import AppLayoutComponent from '@/components/templates/AppLayout.component'
import BreadcrumbsComponent from '@/components/compounds/Breadcrumbs.component'
import theme from '@/utils/theme'

const inter = Inter({ subsets: ['latin'] })

export default function User() {
  const flank = () => {
    console.log("hiya");
  }
  return (
    <AppLayoutComponent title='User'>
      <Box>
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
        >List</Typography>
        <BreadcrumbsComponent />
      </Box>
    </AppLayoutComponent>
  )
}
