import React from 'react';
import { useRouter } from 'next/router';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { GridActionsCellItem, GridRenderCellParams } from '@mui/x-data-grid'

import UserOnline from '@/types/UserOnline.type';
import { useRoleRead } from '@/hooks/role/use-read';
import { useRoleDelete } from '@/hooks/role/use-delete';
import PaperComponent from '../_general/atoms/Paper.component'
import TableComponent from '../_general/molecules/Table.component';
import ModalComponent from '../_general/molecules/Modal.component';
import { useTypedSelector } from '@/hooks/other/use-type-selector';
import TableFilterComponent from '../_general/molecules/TableFilter.component';
import TableSkeletonComponent from '../_general/molecules/TableSkeleton.component';
import DeleteConfirmComponent from '../_general/molecules/DeleteConfirm.component';
import { initPageData, initSortData } from '@/utils/pagination';

const RoleTable: React.FC = () => {

  const router                  = useRouter();
  const currentUser: UserOnline = useTypedSelector(
    (state) => state.reducer.user.user,
  );
  
  const [textSearch, setTextSearch]     = React.useState('');
  const [sortData, setSortData]         = React.useState([initSortData('display_name')])
  const [rowData, setRowData]           = React.useState<{}[]>([]);
  const [rowTotal, setRowTotal]         = React.useState(0);
  const [pageData, setPageData]         = React.useState(initPageData());
  const [queryOptions, setQueryOptions] = React.useState({
    field: sortData[0]?.field,
    sort : sortData[0]?.sort,
    page : pageData.page.toString(),
    size : pageData.pageSize.toString(),
    cond : ''
  });
  const { refetch: doGetRole, data, isLoading: isLoadingRole } = useRoleRead(queryOptions);

  const [columnData, setColumnData] = React.useState([
    // headerClassName: 'super-app-theme--header', headerAlign: 'center',
    { field: 'uid', headerName: 'ID', type : 'string', flex : 0.3, filterble: false,},
    { field: 'no', headerName: 'No', type: 'number', flex: 0.1, filterble : false, sortable: false},
    { field: 'display_name', headerName: 'Name', type: 'string', minWidth:100, flex: 0.75},
    { field: 'description', headerName: 'Description', type: 'string', minWidth:100, flex: 0.5},
    { field: 'action', type: 'actions', width:50, getActions: (params: GridRenderCellParams) => [
      <GridActionsCellItem
        key     = {"edit-"+params.id}
        icon    = {<EditIcon />}
        label   = "Edit"
        onClick = {() => router.push({
          pathname: '/role/[role_id]',
          query   : { role_id: params.row.uid }
        })}
        showInMenu
      />,
      <GridActionsCellItem
        key     = {"delete-"+params.id}
        icon    = {<DeleteIcon />}
        label   = "Delete"
        onClick = {() => {handleOpenDeleteModal(params.row.uid)}}
        showInMenu
      />,
    ]},
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

  const getRoleData = () => {
    doGetRole().then(
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

  const resetPagination = () => {
    setPageData(initPageData());
    setSortData([initSortData('display_name')]);
  }

  const [updateRoleUID, setUpdateRoleUID]     = React.useState('');
  const [openUpdateModal, setOpenUpdateModal] = React.useState(false);
  const handleCloseUpdateModal                = () => setOpenUpdateModal(false);
  const handleOpenUpdateModal                 = (role_uid: string) => {
    setUpdateRoleUID(role_uid)
    setOpenUpdateModal(true);
  }
  
  
  const [deleteRoleUID, setDeleteRoleUID]     = React.useState('');
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
  const handleCloseDeleteModal                = () => setOpenDeleteModal(false);
  const handleOpenDeleteModal                 = (role_uid: string) => {
    setDeleteRoleUID(role_uid)
    setOpenDeleteModal(true);
  }
  const { mutate: submitDelete, isLoading: isLoadingDelete, isSuccess } = useRoleDelete({ role_uid: deleteRoleUID });
  const handleDeleteRole = () => {
    submitDelete({current_user_uid: currentUser.uid})
  }
  
  React.useEffect(() => {
    handleQuery();
  }, [pageData, sortData]);


  React.useEffect(() => {
    getRoleData()
  },[queryOptions])

  React.useEffect(() => {
    if(isSuccess == true) {
      resetPagination();
      handleCloseDeleteModal();
    }
  }, [isSuccess]);
  
  return (
    <>
      <PaperComponent>
        <TableFilterComponent 
          buttonId     = 'role-filter'
          modalId      = 'role-filter'
          menuArray    = {[{ handleClick: () => console.log(), title: 'test'}]}
          textSearch   = {textSearch}
          handleSearch = {setTextSearch}
          onSearch     = {handleQuery}
        >
          {/* <SelectComponent
            selectId    = 'test'
            selectLabel = 'Test'
            options     = { [ { value: 'a', label: 'a' }, { value: 'b', label: 'b' } ]}
          /> */}
          {/* <SelectComponent
            selectId    = 'test'
            selectLabel = 'Test'
            options     = { [ { value: 'a', label: 'a' }, { value: 'b', label: 'b' } ]}
          /> */}
          
        </TableFilterComponent>
        {
          (isLoadingRole) ? 
            <TableSkeletonComponent />
          :
          <TableComponent 
            rowData        = {rowData}
            columnData     = {columnData}
            isLoading      = {isLoadingRole}
            pageInfo       = {pageData}
            handlePageInfo = {setPageData}
            rowTotal       = {rowTotal}
            handleSortData = {setSortData}
            columnHide     = {{ uid: false }}
          />
        }
      </PaperComponent>
      {/* <ModalComponent
        modalId      = 'role-create'
        modalTitle   = 'Role Create'
        modalSize    = 'sm'
        modalOpen    = {modalCreate}
        modalOnClose = {handleCloseCreateModal}
        isPermanent  = {false}
      >
        <RoleCreateComponent getRoleData={getRoleData} handleCloseModal={handleCloseCreateModal} />
      </ModalComponent> */}

      {/* <ModalComponent
        modalId      = 'role-edit'
        modalTitle   = 'Role Edit'
        modalSize    = 'sm'
        modalOpen    = {openUpdateModal}
        modalOnClose = {handleCloseUpdateModal}
        isPermanent  = {false}
      >
        <PermissionUpdateComponent updatePermissionID={updatePermissionID} getPermissionData={getPermissionData} handleCloseModal={handleCloseCreateModal}/>
      </ModalComponent> */}

      <DeleteConfirmComponent 
        modalId      = 'role-delete'
        modalOpen    = {openDeleteModal}
        modalOnClose = {handleCloseDeleteModal}
        onDelete     = {handleDeleteRole}
      />
    </>
  )
}

export default RoleTable;