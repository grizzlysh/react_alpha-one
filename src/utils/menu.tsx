import React from 'react';
import GamesIcon from '@mui/icons-material/Games';
import { People, Dashboard, AccountCircle } from '@mui/icons-material';
interface MenuProps {
  title : string,
  path  : string,
  url   : string,
  icon  : React.ReactNode,
  child?: any[]
}

const menu:MenuProps[] = [
  {
    title: 'Home',
    path : '/',
    url  : '',
    icon : <Dashboard />,
  },
  {
    title: 'Profile',
    path : '/profile',
    url  : 'profile',
    icon : <AccountCircle />,
  },
  {
    title: 'User Manage',
    path : '',
    url  : 'user_manage',
    icon : <People />,
    child: [
      {
        title: 'Permission',
        path : '/permission',
        url  : 'permission',
        // icon : <People />,
      },
      {
        title: 'Role',
        path : '/role',
        url  : 'role',
        // icon : <ShoppingCart />,
      },
      {
        title: 'User',
        path : '/user',
        url  : 'user',
        // icon : <ShoppingCart />,
      },
    ]
  },
  {
    title: 'divider',
    path : '',
    url  : '',
    icon : '',
  },
  {
    title: 'Klasifikasi Obat',
    path : '',
    url  : 'drug_class',
    icon : <People />,
    child: [
      {
        title: 'Bentuk',
        path : '/shape',
        url  : 'shape',
        // icon : <People />,
      },
      {
        title: 'Golongan',
        path : '/type',
        url  : 'type',
        // icon : <ShoppingCart />,
      },
      {
        title: 'Kelas Terapi',
        path : '/category',
        url  : 'category',
        // icon : <ShoppingCart />,
      },
    ]
  },
]

export default menu;