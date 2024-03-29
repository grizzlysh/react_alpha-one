import React from 'react';
import GamesIcon from '@mui/icons-material/Games';
import { People, Groups, Dashboard, Book, Circle } from '@mui/icons-material';
import { Menu } from '@/types/Menu.type';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { Box } from '@mui/material';



const menu:Menu[] = [
  {
    title: 'Home',
    path : '/',
    url  : '',
    state: ['/'],
    icon : <Dashboard />,
  },
  // {
  //   title: 'Profile',
  //   path : '/profile',
  //   url  : 'profile',
  //   icon : <AccountCircle />,
  // },
  {
    title: 'User Manage',
    path : '',
    url  : 'user_manage',
    state: ['/permission', '/role', '/user'],
    icon : <Groups />,
    child: [
      {
        title: 'Permission',
        path : '/permission',
        url  : 'permission',
        state: ['/permission'],
        // icon : <People />,
      },
      {
        title: 'Role',
        path : '/role',
        url  : 'role',
        state: ['/role'],
        // icon : <ShoppingCart />,
      },
      {
        title: 'User',
        path : '/user',
        url  : 'user',
        state: ['/user'],
        // icon : <ShoppingCart />,
      },
    ]
  },
  {
    title: 'divider',
    path : '',
    url  : '',
    state: [''],
    icon : '',
  },
  {
    title: 'Drug Class',
    path : '',
    url  : 'drug_class',
    state: ['/shape', '/category', '/therapy-class'],
    icon : <Book />,
    child: [
      {
        title: 'Shape',
        path : '/shape',
        url  : 'shape',
        state: ['/shape'],
        // icon : <>&#x2022;</>,
        icon: '',
      },
      {
        title: 'Category',
        path : '/category',
        url  : 'category',
        state: ['/category'],
        icon : <Box
          sx={{
            content        : '""',
            width          : '4px',
            height         : '4px',
            borderRadius   : '50%',
            backgroundColor: '#919eab',
            transition     : 'transform 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
          }}        
        />,
      },
      {
        title: 'Therapy Class',
        path : '/therapy-class',
        url  : 'therapy-class',
        state: ['/therapy-class'],
        icon : <Circle />,
      },
    ]
  },
]

export default menu;