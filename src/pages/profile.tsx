import React from 'react'
import { NextPage } from 'next'

import AddIcon from '@mui/icons-material/Add';

import HeaderPage from '@/components/_general/organisms/HeaderPage.component'
import AppLayoutComponent from '@/components/layout/AppLayout.component'
import ConComp from '@/components/_content'
import PaperComponent from '@/components/_general/atoms/Paper.component'
import { Box, Button, Stack, TextField } from '@mui/material'
import { DataGrid, GridRenderCellParams } from '@mui/x-data-grid'
import UserOnline from '@/types/UserOnline.type'
import { useTypedSelector } from '@/hooks/other/use-type-selector'
import moment from 'moment'
import ButtonComponent from '@/components/_general/atoms/Button.component'
import ModalComponent from '@/components/_general/molecules/Modal.component';
import UserChangePasswordComponent from '@/components/user/UserChangePassword.component';

const ProfilePage: NextPage = () => {
  const [openResetPasswordModal, setOpenResetPasswordModal] = React.useState(false);
  const handleOpenResetPasswordModal                        = () => setOpenResetPasswordModal(true);
  const handleCloseResetPasswordModal                       = () => setOpenResetPasswordModal(false);

  const currentUser: UserOnline = useTypedSelector(
    (state) => state.reducer.user.user,
  );
  const [permissionList, setPermissionList]     = React.useState<{}[]>(currentUser.role.permission_role)
  const [permisisonColumn, setPermissionColumn] = React.useState([
    { field: 'nomber', type: 'string', headerName: 'No', flex : 0.1, sortable: false,
      renderCell: (params:GridRenderCellParams) => params.api.getAllRowIds().indexOf(params.id)+1
    },
    { field: 'permission_name', headerName: 'Permission', type : 'string', flex : 0.7, minWidth: 200, sortable: false,
      valueGetter: (params:GridRenderCellParams) => (params.row.permissions.display_name)
    },
    { field: 'permission_uid', headerName: 'Permission', type : 'string', flex : 0.7, minWidth: 200, sortable: false,
      valueGetter: (params:GridRenderCellParams) => (params.row.permissions.uid)
    },
    { field: 'write_permit', headerName: 'Write', type : 'boolean', flex : 0.2, minWidth: 94, sortable: false,},
    { field: 'read_permit', headerName: 'Read', type : 'boolean', flex : 0.2, minWidth: 94, sortable: false,},
    { field: 'modify_permit', headerName: 'Modify', type : 'boolean', flex : 0.2, minWidth: 94, sortable: false,},
    { field: 'delete_permit', headerName: 'Delete', type : 'boolean', flex : 0.2, minWidth: 94, sortable: false,},
  ])

  return (
    <AppLayoutComponent title={'Profile'}>
      <HeaderPage title={'Profile'}>
      </HeaderPage>
      <PaperComponent>
        <Stack flexDirection={"column"} gap={2}>
          <Stack flexDirection={"row"} gap={2}>
            <Stack flexDirection={"column"} width={"50%"}>
              <TextField            
                fullWidth
                autoComplete = 'off'
                size         = "medium"
                type         = 'string'
                value        = {currentUser.username}
                label        = {"Username"}
                variant      = "outlined"
                sx           = {{mb:2}}
                InputProps   = {{
                  readOnly: true,
                }}
              />
              <TextField            
                fullWidth
                autoComplete = 'off'
                size         = "medium"
                type         = 'string'
                value        = {(currentUser.name).toUpperCase()}
                label        = {"Name"}
                variant      = "outlined"
                sx           = {{mb:2}}
                InputProps   = {{
                  readOnly: true,
                }}
              />
              <TextField            
                fullWidth
                autoComplete = 'off'
                size         = "medium"
                type         = 'string'
                value        = {currentUser.sex == 'm' ? "Laki" : "Perempuan"}
                label        = {"Sex"}
                variant      = "outlined"
                sx           = {{mb:2}}
                InputProps   = {{
                  readOnly: true,
                }}
              />
              {/* <Button 
                fullWidth
                variant = 'contained'
                color   = 'primary'
                // sx={{
                //   bgColor: "#00000"
                // }}
              >
                Change Password
              </Button> */}

              <ButtonComponent
                buttonColor = 'primary'
                // startIcon   = {<AddIcon />}
                onClick     = {handleOpenResetPasswordModal}
              >
                
                CHANGE PASSWORD
              </ButtonComponent>
            </Stack>
            <Stack flexDirection={"column"} width={"50%"}>
              <TextField            
                fullWidth
                autoComplete = 'off'
                size         = "medium"
                type         = 'string'
                value        = {currentUser.email}
                label        = {"Email"}
                variant      = "outlined"
                sx           = {{mb:2}}
                InputProps   = {{
                  readOnly: true,
                }}
              />
              <TextField            
                fullWidth
                autoComplete = 'off'
                size         = "medium"
                type         = 'string'
                value        = {moment(currentUser.created_at).format("DD MMMM YYYY HH:mm:ss")}
                label        = {"Created At"}
                variant      = "outlined"
                sx           = {{mb:2}}
                InputProps   = {{
                  readOnly: true,
                }}
              />
              <TextField            
                fullWidth
                autoComplete = 'off'
                size         = "medium"
                type         = 'string'
                value        = {currentUser.role.display_name}
                label        = {"Roles"}
                variant      = "outlined"
                sx           = {{mb:2}}
                InputProps   = {{
                  readOnly: true,
                }}
              />
            </Stack>
          </Stack>
          <Box 
            sx={{
              width     : '100%',
              minWidth  : 0,
              height    : 400,
              display   : 'grid',
              transition: 'width 0.2s ease-out',
            }}
          >
            <DataGrid        
              // rows              = {[{no: 1, permisson_name: "a", read: true, write: true, modify: true, delete: true, }]}
              disableRowSelectionOnClick
              disableColumnMenu     = {true}
              getRowId              = { (row: any) => row.permissions.uid }
              rows                  = {permissionList}
              columnVisibilityModel = {{permission_uid: false}}
              columns               = {permisisonColumn}
            />
          </Box>
        </Stack>
      </PaperComponent>

      <ModalComponent
        modalId      = 'profile-change-password'
        modalTitle   = 'Change Password'
        modalSize    = 'sm'
        modalOpen    = {openResetPasswordModal}
        modalOnClose = {handleCloseResetPasswordModal}
        isPermanent  = {false}
      >
        <UserChangePasswordComponent user_uid={currentUser.uid} handleCloseModal={handleCloseResetPasswordModal} />
      </ModalComponent>
    </AppLayoutComponent>
  )
}

export default ProfilePage;