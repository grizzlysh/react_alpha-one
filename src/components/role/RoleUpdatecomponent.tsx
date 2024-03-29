import React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Stack, TextField } from '@mui/material'
import { DataGrid, GridActionsCellItem, GridRenderCellParams } from '@mui/x-data-grid'

import UserOnline from '@/types/UserOnline.type'
import Permission from '@/types/Permission.type'
import { useRoleUpdate } from '@/hooks/role/use-update'
import { RoleCreateRequest } from '@/services/role/create'
import { useRoleReadByID } from '@/hooks/role/use-read-by-id'
import { usePermissionRead } from '@/hooks/permission/use-read'
import { useTypedSelector } from '@/hooks/other/use-type-selector'
import PaperComponent from '@/components/_general/atoms/Paper.component'
import SelectComponent from '@/components/_general/atoms/Select.component'
import ButtonComponent from '@/components/_general/atoms/Button.component'
import CheckboxComponent from '@/components/_general/atoms/Checkbox.component'
import TableSkeletonComponent from '../_general/molecules/TableSkeleton.component'
import LoadingButtonComponent from '@/components/_general/atoms/LoadingButton.component'


interface InputPermission {
  permission_name: string,
  permission_uid : string,
  read_permit    : boolean,
  write_permit   : boolean,
  modify_permit  : boolean,
  delete_permit  : boolean,
}

interface RoleUpdateProps {
  updateRole: string
}

const RoleUpdateComponent: React.FC<RoleUpdateProps> = ({ updateRole }) => {

  const { mutate: submitUpdateRole, isLoading } = useRoleUpdate({role_uid: updateRole})
  const currentUser: UserOnline                 = useTypedSelector(
    (state) => state.reducer.user.user,
  );

  const [permissionOptions, setPermissionOptions]     = React.useState<{value: string, label: string}[]>([])
  const [duplicatePermission, setDuplicatePermission] = React.useState(false);
  const [permissionList, setPermissionList]           = React.useState<{}[]>([])

  const { refetch: doGetPermission, data, isLoading: isLoadingPermission } = usePermissionRead({
    page : '',
    size : '999',
    cond : '',
    sort : '',
    field: '',
  });

  const [permisisonColumn, setPermissionColumn] = React.useState([
    { field: 'number', type: 'string', headerName: 'No', flex : 0.1, sortable: false,
      renderCell: (params:any) => params.api.getAllRowIds().indexOf(params.id)+1
    },
    { field: 'permission_name', headerName: 'Permission', type : 'string', flex : 0.7, minWidth: 200, sortable: false,},
    { field: 'permission_uid', headerName: 'Permission', type : 'string', flex : 0.7, minWidth: 200, sortable: false,},
    { field: 'write_permit', headerName: 'Write', type : 'boolean', flex : 0.2, minWidth: 94, sortable: false,},
    { field: 'read_permit', headerName: 'Read', type : 'boolean', flex : 0.2, minWidth: 94, sortable: false,},
    { field: 'modify_permit', headerName: 'Modify', type : 'boolean', flex : 0.2, minWidth: 94, sortable: false,},
    { field: 'delete_permit', headerName: 'Delete', type : 'boolean', flex : 0.2, minWidth: 94, sortable: false,},
    { field: 'action', type: 'actions', flex : 0.2, width:50, getActions: (params: GridRenderCellParams) =>
      [
        <GridActionsCellItem
          key     = {"delete-"+params.id}
          icon    = {<DeleteIcon />}
          label   = "Delete"
          onClick = {() => handleDeleteSelect(params.row.permission_uid)}
        />,
      ]
    }
  ])
  
  const getPermissionOptions = () => {
    doGetPermission().then(
      (resp: any) => {
        if(resp.status == "error"){
          return;
        }

        const permissions = resp.data.output_schema.data?.map( (val: Permission) => (
          {value: val.uid, label: val.display_name}
        ));
        
        setPermissionOptions(permissions)
      } 
    )
  }

  const { 
    control,
    reset,
    handleSubmit,
    formState: { isValid, isDirty, errors },
  } = useForm<RoleCreateRequest>({
    defaultValues: {
      display_name    : '',
      description     : '',
      current_user_uid: currentUser.uid,
    }
  })

  const onSubmit: SubmitHandler<RoleCreateRequest> = (data) => {
    const roleData = {...data, permissions: JSON.stringify(permissionList)}
    submitUpdateRole(roleData)
  }


  const { refetch: doGetRole, data: dataRole, isLoading: isLoadingGetRole } = useRoleReadByID({ role_uid: updateRole });
  
  
  const getRoleData = () => {
    doGetRole().then(
      (resp: any) => {
        if(resp.status == "error"){
          return;
        }

        reset({
          display_name    : resp.data.output_schema.data.display_name,
          description     : resp.data.output_schema.data.description,
          current_user_uid: currentUser.uid,
        })

        // console.log(resp.data.output_schema)
        const permissions = resp.data.output_schema.data.permission_role?.map( (val: any) => (
          {
            permission_name: val.permissions.display_name,
            permission_uid : val.permissions.uid,
            write_permit   : val.write_permit,
            read_permit    : val.read_permit,
            modify_permit  : val.modify_permit,
            delete_permit  : val.delete_permit,
          }
        ));
        
        // console.log(permissions)
        setPermissionList(permissions)
      }
    )
  }

  const { 
    reset: resetPermission,
    setValue,
    getValues,
    control: controlPermission,
    handleSubmit: handleSubmitPermission,
    formState: { isValid: isValidPermission, errors: errorsPermission },
  } = useForm<InputPermission>({
    defaultValues: {
      permission_name: '',
      permission_uid : '',
      read_permit    : false,
      write_permit   : false,
      modify_permit  : false,
      delete_permit  : false,
    },
    mode: 'all',
  })

  const onAddPermission = (data: InputPermission) => {
    const permissionIndex      = permissionList.length;
    // const permissionSelected   = permissionOptions.find(option => option.value === data.permission_uid ) || '';
    // const permission_name      = permissionSelected ? permissionSelected.label : '';
    //       data.permission_name = permission_name
    const permissionRow        = {no: permissionIndex+1, ...data}
    setPermissionList((prevList) => ([ ...prevList, permissionRow ]));
    resetPermission({
      permission_name: '',
      permission_uid : '',
      read_permit    : false,
      write_permit   : false,
      modify_permit  : false,
      delete_permit  : false,
    })
    setDuplicatePermission(false);
  };
  
  const handleDeleteSelect = React.useCallback((index:number) => {
    setPermissionList( (prevList) => prevList.filter( (row:any) => row.permission_uid !== index))
  },[]);

  const handleSelectPermission = (event: any) => {
    setValue('permission_uid', event.target.value)
    const permissionSelected = permissionOptions.find(option => option.value === event.target.value ) || '';
    const permission_name    = permissionSelected ? permissionSelected.label : '';
    setValue('permission_name',permission_name)
    checkDuplicate()
  };

  const checkDuplicate = () => {
    const input_permission_uid = getValues('permission_uid');
    const check                = permissionList.filter( (val:any) => val.permission_uid == input_permission_uid)
    if (check.length>0) {
      setDuplicatePermission(false)
    }
    else { 
      setDuplicatePermission(true)
    }
  }

  React.useEffect( () => {
    if(updateRole != ''){
      getRoleData()
    }
    getPermissionOptions()
  },[updateRole])

  return (
    <PaperComponent>
      <Stack direction={"column"} gap={2}>        
        <Box width={'100%'}>
          {/* <form onSubmit={handleSubmit(onSubmit)}> */}
            <Stack
              // direction = {"row"}
              display = {"flex"}
              // gap     = {2}
              sx      = {{
                marginBottom: 2,
                '@media (min-width: 0px)'  : {
                  flexDirection: 'column',
                  alignItems   : 'center',
                  gap          : 0,
                },
                '@media (min-width: 700px)': {
                  flexDirection : 'row',
                  alignItems    : 'stretch',
                  justifyContent: 'flex-start',
                  gap           : 2,
                  // divider      : (<Divider orientation="vertical" flexItem />)
                },
              }}  
            >
              <Stack
                sx = {{
                  '@media (min-width: 0px)'  : {
                    flexDirection: 'column',
                    alignItems   : 'center',
                    width        : '100%',
                  },
                  '@media (min-width: 700px)': {
                    flexDirection: 'column',
                    alignItems   : 'center',
                    width        : '50%',
                  },
                }}  
              >
                <Controller
                  name    = "display_name"
                  control = {control}
                  rules   = {{ 
                    required: {
                      value  : true,
                      message: "Display Name fields is required"
                    },
                  }}
                  render  = { ({ 
                      field     : { onChange, value },
                      fieldState: { error },
                      formState,
                    }) => (
                    <TextField            
                      autoComplete = 'off'
                      helperText = {error ? error.message : null}
                      size       = "medium"
                      error      = {!!error}
                      onChange   = {onChange}
                      type       = 'string'
                      value      = {value}
                      label      = {"Display Name"}
                      variant    = "outlined"
                      sx         = {{mb:2}}
                      fullWidth
                    />
                    )
                  }
                />

                <Controller
                  name    = "description"
                  control = {control}
                  render  = { ({ 
                      field     : { onChange, value },
                      fieldState: { error },
                      formState,
                    }) => (
                    <TextField
                      multiline
                      fullWidth
                      minRows      = {4}
                      autoComplete = 'off'
                      size         = "medium"
                      onChange     = {onChange}
                      value        = {value}
                      label        = {"Description"}
                      sx           = {{
                        '@media (min-width: 0px)'  : {
                          mb: 2,
                        },
                        '@media (min-width: 700px)': {
                          mb: 0,
                        },
                      }}
                    />
                    )
                  }
                />
              </Stack>
              
              <Stack
                sx = {{
                  '@media (min-width: 0px)'  : {
                    flexDirection: 'column',
                    alignItems   : 'center',
                    width        : '100%',
                  },
                  '@media (min-width: 700px)': {
                    flexDirection : 'column',
                    alignItems    : 'flex-start',
                    justifyContent: 'space-between',
                    width         : '50%',
                  },
                }}  
              >
                <Box 
                  sx = {{
                    width: '100%',
                    '@media (min-width: 0px)'  : {
                      mb: 2,
                    },
                    '@media (min-width: 700px)': {
                      mb: 0,
                    },
                  }}
                >
                  <Controller
                    name    = "permission_uid"
                    control = {controlPermission}
                    rules   = {{
                      // validate:(value, formValues) => (formValues.write_permit || formValues.read_permit || formValues.modify_permit || formValues.delete_permit != false ),
                      required: {
                        value  : true,
                        message: "Permission fields is required"
                      },
                    }}
                    render  = { ({ 
                        field     : { onChange, value },
                        fieldState: { error },
                      }) => (
                      <SelectComponent
                        error        = {!!error}
                        selectState  = {value}
                        handleChange = {handleSelectPermission}
                        selectId     = 'permission-select'
                        selectLabel  = 'Permission'
                        options      = {permissionOptions}
                        helperText   = {error ? error.message : null}
                      />
                      )
                    }
                  />
                </Box>

                <Box
                  width = {'100%'}
                  sx    = {{
                    '@media (min-width: 0px)'  : {
                      mb: 2,
                    },
                    '@media (min-width: 700px)': {
                      mb: 0,
                    },
                  }}
                >    
                  <Stack 
                    flexDirection  = {"row"}
                    justifyContent = {"space-evenly"}
                    alignContent   = {"center"}
                    alignItems     = {"center"}
                  >
                    <Controller
                      name    = "write_permit"
                      control = {controlPermission}
                      rules   = {{ 
                        validate: (value, formValues) => value || formValues.read_permit || formValues.modify_permit || formValues.delete_permit != false
                      }}
                      render  = { ({ 
                          field     : { onChange, value },
                          fieldState: { error },
                        }) => (
                        <CheckboxComponent 
                          error        = {!!error}
                          helperText   = {error ? error.message : null}
                          checkId      = {'write-check'}
                          checkLabel   = {'Write'}
                          checkState   = {value}
                          handleChange = {onChange}
                        />
                        )
                      }
                    />
                    <Controller
                      name    = "read_permit"
                      control = {controlPermission}
                      rules   = {{ 
                        validate: (value, formValues) => formValues.write_permit || value || formValues.modify_permit || formValues.delete_permit != false
                      }}
                      render  = { ({ 
                          field     : { onChange, value },
                          fieldState: { error },
                        }) => (
                        <CheckboxComponent
                          error        = {!!error}
                          helperText   = {error ? error.message : null}
                          checkId       = {'read-check'}
                          checkLabel    = {'Read'}
                          checkState    = {value}
                          handleChange  = {onChange}
                        />
                        )
                      }
                    />
                    <Controller
                      name    = "modify_permit"
                      control = {controlPermission}
                      rules   = {{ 
                        validate: (value, formValues) => formValues.write_permit || formValues.read_permit || value || formValues.delete_permit != false
                      }}
                      render  = { ({ 
                          field     : { onChange, value },
                          fieldState: { error },
                        }) => (
                        <CheckboxComponent
                          error        = {!!error}
                          helperText   = {error ? error.message : null}
                          checkId      = {'modify-check'}
                          checkLabel   = {'Modify'}
                          checkState   = {value}
                          handleChange = {onChange}
                        />
                        )
                      }
                    />
                    <Controller
                      name    = "delete_permit"
                      control = {controlPermission}
                      rules   = {{ 
                        validate: (value, formValues) => formValues.write_permit || formValues.read_permit || formValues.modify_permit || value != false
                      }}
                      render  = { ({ 
                          field     : { onChange, value },
                          fieldState: { error },
                        }) => (
                        <CheckboxComponent 
                          error        = {!!error}
                          helperText   = {error ? error.message : null}
                          checkId      = {'delete-check'}
                          checkLabel   = {'Delete'}
                          checkState   = {value}
                          handleChange = {onChange}
                        />
                        )
                      }
                    />
                  </Stack>
                </Box>

                <ButtonComponent
                  fullWidth
                  disabled    = {!isValidPermission || !duplicatePermission}
                  buttonColor = 'secondary'
                  onClick     = {handleSubmitPermission(onAddPermission)}
                >
                  ADD PERMISSION
                </ButtonComponent>
              </Stack>
            </Stack>
            
            <LoadingButtonComponent
              fullWidth
              buttonColor = 'primary'
              disabled    = {!isValid || !(permissionList.length>0)}
              isLoading   = {isLoading}
              id          = 'permission_create_submit'
              onClick     = {handleSubmit(onSubmit)}
            >
              SUBMIT
            </LoadingButtonComponent>
          {/* </form> */}
        </Box>
        {
          (updateRole == '' || isLoadingGetRole) ? 
          <TableSkeletonComponent />
          :
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
              getRowId              = { (row: any) => row.permission_uid }
              rows                  = {permissionList}
              columnVisibilityModel = {{permission_uid: false}}
              columns               = {permisisonColumn}
            />
          </Box>
        }
      </Stack>
    </PaperComponent>
  )

};

export default RoleUpdateComponent;