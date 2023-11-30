import React from 'react';
import GamesIcon from '@mui/icons-material/Games';
import PeopleIcon from '@mui/icons-material/People';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

interface MenuProps {
  title: string,
  path : string,
  url  : string,
  icon : React.ReactNode
}

const menu:MenuProps[] = [
  {
    title: 'Home',
    path : '/',
    url  : '',
    icon : <DashboardIcon />,
  },
  {
    title: 'Order',
    path : '/order',
    url  : 'order',
    icon : <ShoppingCartIcon />,
  },
  {
    title: 'Customer',
    path : '/customer',
    url  : 'customer',
    icon : <PeopleIcon />,
  },
  {
    title: 'Partner',
    path : '/partner',
    url  : 'partner',
    icon : <PeopleIcon />,
  },
]

export default menu;