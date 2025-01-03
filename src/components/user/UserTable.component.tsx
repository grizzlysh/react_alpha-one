import React from 'react';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { GridActionsCellItem, GridRenderCellParams } from '@mui/x-data-grid'

import UserOnline from '@/types/UserOnline.type';
import User, { initUser } from '@/types/User.type';
import { useUserRead } from '@/hooks/user/use-read';
import { useUserDelete } from '@/hooks/user/use-delete';
import UserCreateComponent from './UserCreate.component';
import PaperComponent from '../_general/atoms/Paper.component'
import TableComponent from '../_general/molecules/Table.component';
import ModalComponent from '../_general/molecules/Modal.component';
import { useTypedSelector } from '@/hooks/other/use-type-selector';
import TableFilterComponent from '../_general/molecules/TableFilter.component';
import TableSkeletonComponent from '../_general/molecules/TableSkeleton.component';
import UserUpdateComponent from './UserUpdate.component';
import ModalConfirmComponent from '../_general/molecules/ModalConfirm.component';
import { useUserUpdatePassword } from '@/hooks/user/use-update-password';
import { initPageData, initSortData } from '@/utils/pagination';
import DeleteConfirmComponent from '../_general/molecules/DeleteConfirm.component';

interface UserTableProps {
  modalCreate           : boolean,
  handleCloseCreateModal: ()=>void,
}

const UserTable: React.FC<UserTableProps> = ({ modalCreate, handleCloseCreateModal }) => {

  const currentUser: UserOnline = useTypedSelector(
    (state) => state.reducer.user.user,
  );
  
  const [textSearch, setTextSearch]     = React.useState('');
  const [sortData, setSortData]         = React.useState([initSortData('name')])
  const [rowData, setRowData]           = React.useState<{}[]>([]);
  const [rowTotal, setRowTotal]         = React.useState(0);
  const [pageData, setPageData]         = React.useState(initPageData);
  const [queryOptions, setQueryOptions] = React.useState({
    field: sortData[0]?.field,
    sort : sortData[0]?.sort,
    page : pageData.page.toString(),
    size : pageData.pageSize.toString(),
    cond : ''
  });
  const { refetch: doGetUser, data, isLoading: isLoadingUser } = useUserRead(queryOptions);

  const [columnData, setColumnData] = React.useState([
    // headerClassName: 'super-app-theme--header', headerAlign: 'center',
    
    { field: 'action', type: 'actions', width:50, getActions: (params: GridRenderCellParams) => [
      <GridActionsCellItem
        key     = {"edit-"+params.id}
        icon    = {<EditIcon />}
        label   = "Edit"
        onClick = {() => handleOpenUpdateModal(params.row)}
        showInMenu
      />,
      <GridActionsCellItem
        key     = {"delete-"+params.id}
        icon    = {<DeleteIcon />}
        label   = "Delete"
        onClick = {() => {handleOpenDeleteModal(params.row.uid)}}
        showInMenu
      />,
      <GridActionsCellItem
        key     = {"reset-"+params.id}
        icon    = {<RestartAltIcon />}
        label   = "Reset Password"
        onClick = {() => {handleOpenResetModal(params.row.uid)}}
        showInMenu
      />,
    ]},
    { field: 'uid', headerName: 'ID', type : 'string', flex : 0.3, filterble: false,},
    { field: 'no', headerName: 'No', type: 'number', flex: 0.1, filterble : false, sortable: false},
    { field: 'username', headerName: 'Username', type: 'string', minWidth:150, flex: 0.75},
    { field: 'name', headerName: 'Name', type: 'string', minWidth:200, flex: 0.75,
      renderCell: (params:GridRenderCellParams) => (params.value).toUpperCase(),
    },
    { field: 'sex', headerName: 'Sex', type: 'string', minWidth:100, flex: 0.4,  
      renderCell: (params:GridRenderCellParams) => params.value == 'm' ? 'Laki' : 'Perempuan',
    },
    { field: 'role_display_name', headerName: 'Role', type: 'string', minWidth:200, flex: 0.75, sortable: false,
      valueGetter: (params:GridRenderCellParams) => (params.row.role.display_name).toUpperCase()
    },
    // { field: 'email_verified_at', headerName: 'Email Verified', type : 'string', minWidth : 200, flex : 0.6,
    //   renderCell: (params:GridRenderCellParams) => params.value != null ? moment(params.value).format("DD-MMM-YYYY HH:mm:ss") : '',
    // },
  ]);

  const handleQuery = () => {
    setQueryOptions({
      field: sortData[0]?.field,
      sort : sortData[0]?.sort,
      page : pageData.page.toString(),
      size : pageData.pageSize.toString(),
      cond : textSearch,
    });
  }

  const resetPagination = () => {
    setPageData(initPageData());
    setSortData([initSortData('name')]);
  }

  const getUserData = () => {
    doGetUser().then(
      (resp: any) => {
        if(resp.status == "error"){
          return;
        }
        const startNo = (pageData.pageSize * resp.data.output_schema.current_page)
        const rows    = resp.data.output_schema.data?.map( (val: any,idx: number) => ({no: startNo+idx+1, ...val}) )
        
        setRowData(rows);
        setRowTotal(resp.data.output_schema.total_data)
      } 
    )
  }

  //UPDATE USER
  const [updateUser, setUpdateUser]           = React.useState<User>(initUser);
  const [openUpdateModal, setOpenUpdateModal] = React.useState(false);
  const handleCloseUpdateModal                = () => setOpenUpdateModal(false);
  const handleOpenUpdateModal                 = (user: User) => {
    setUpdateUser(user)
    setOpenUpdateModal(true);
  }
  
  //DELETE USER
  const [deleteUserID, setDeleteUserID]       = React.useState('');
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
  const handleCloseDeleteModal                = () => setOpenDeleteModal(false);
  const handleOpenDeleteModal                 = (user_uid: string) => {
    setDeleteUserID(user_uid)
    setOpenDeleteModal(true);
  }
  const { mutate: submitDelete, isLoading: isLoadingDelete, isSuccess } = useUserDelete({ user_uid: deleteUserID });
  const handleDeleteUser = () => {
    submitDelete({current_user_uid: currentUser.uid})
  }
  
  const [resetUserID, setResetUserID]       = React.useState('');
  const [openResetModal, setOpenResetModal] = React.useState(false);
  const handleCloseResetModal               = () => setOpenResetModal(false);
  const handleOpenResetModal                = (user_uid: string) => {
    setResetUserID(user_uid)
    setOpenResetModal(true);
  }
  const { mutate: submitResetPassword, isLoading: isLoadingReset, isSuccess: isSuccessReset } = useUserUpdatePassword({ user_uid: resetUserID });

  const handleResetUser = () => {
    submitResetPassword({password: 'password', repassword: 'password', current_user_uid: currentUser.uid})
  }
  
  React.useEffect(() => {
    handleQuery();
  }, [pageData, sortData]);

  React.useEffect(() => {
    getUserData()
  },[queryOptions])

  React.useEffect(() => {
    if(isSuccess == true) {
      resetPagination();
      handleCloseDeleteModal();
    }
  }, [isSuccess]);
 
  React.useEffect(() => {
    if(isSuccessReset == true) {
      handleCloseResetModal ();
    }
  }, [isSuccessReset]);


  return (
    <>
      <PaperComponent>
        <TableFilterComponent 
          buttonId     = 'user-filter'
          modalId      = 'user-filter'
          menuArray    = {[{ handleClick: () => console.log(), title: 'test'}]}
          textSearch   = {textSearch}
          handleSearch = {setTextSearch}
          onSearch     = {handleQuery}
        >
          {/* <SelectComponent
            selectId    = 'test'
            selectLabel = 'Test'
            options     = { [ { value: 'a', label: 'a' }, { value: 'b', label: 'b' } ]}
            sx       = {{
              '@media (min-width: 900px)': {        
                maxWidth: '180px'
              },
              '@media (min-width: 0px)'  : {
                width: '100%'
              }
            }}
          /> */}
          {/* <SelectComponent
            selectId    = 'test'
            selectLabel = 'Test'
            options     = { [ { value: 'a', label: 'a' }, { value: 'b', label: 'b' } ]}
          /> */}
          
        </TableFilterComponent>
        {
          (isLoadingUser) ? 
            <TableSkeletonComponent />
          :
          <TableComponent 
            rowData        = {rowData}
            columnData     = {columnData}
            isLoading      = {isLoadingUser}
            pageInfo       = {pageData}
            handlePageInfo = {setPageData}
            rowTotal       = {rowTotal}
            handleSortData = {setSortData}
            columnHide     = {{ uid: false }}
          />
        }
      </PaperComponent>
      
        <UserCreateComponent
          resetPagination  = {resetPagination}
          handleCloseModal = {handleCloseCreateModal}
          modalOpen        = {modalCreate}
        />

        <UserUpdateComponent
          updateUser       = {updateUser}
          resetPagination  = {resetPagination}
          handleCloseModal = {handleCloseUpdateModal}
          modalOpen        = {openUpdateModal}
        />

      <DeleteConfirmComponent 
        modalId       = 'user-delete'
        modalOpen     = {openDeleteModal}
        modalOnClose  = {handleCloseDeleteModal}
        onDelete      = {handleDeleteUser}
        buttonLoading = {isLoadingDelete}
      />

      <ModalConfirmComponent
        modalId      = 'user-reset-password'
        modalOpen    = {openResetModal}
        modalOnClose = {handleCloseResetModal}
        onConfirm    = {handleResetUser}
        // modalTitle   = {'Reset Password Confirmation'}
        modalText     = {'Do you want to reset password for this user?'}
        modalButton   = {'Reset'}
        buttonLoading = {isLoadingReset}
      />
    </>
  )
}

export default UserTable;