import React from 'react';

import { usePermissionRead } from '@/hooks/permission/use-read'
import PaperComponent from '../_general/atoms/Paper.component'
import TableComponent from '../_general/molecules/Table.component';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { GridActionsCellItem, GridRenderCellParams } from '@mui/x-data-grid'
import TableFilterComponent from '../_general/molecules/TableFilter.component';
import SelectComponent from '../_general/atoms/Select.component';
import TableSkeletonComponent from '../_general/molecules/TableSkeleton.component';
import ModalComponent from '../_general/molecules/Modal.component';
import PermissionCreateComponent from './PermissionCreate.component';
import PermissionUpdateComponent from './PermissionUpdate.component';
import { usePermissionDelete } from '@/hooks/permission/use-delete';
import { UserOnline } from '@/types/UserOnline.type';
import { useTypedSelector } from '@/hooks/other/use-type-selector';
import DeleteConfirmComponent from '../_general/molecules/DeleteConfirm.component';

interface PermissionTableProps {
  modalCreate           : boolean,
  handleCloseCreateModal: ()=>void,
}

const PermissionTable: React.FC<PermissionTableProps> = ({ modalCreate, handleCloseCreateModal }) => {

  const currentUser: UserOnline                       = useTypedSelector(
    (state) => state.reducer.user.user,
  );
  
  const [textSearch, setTextSearch]     = React.useState('');
  const [sortData, setSortData]         = React.useState([{field: 'display_name', sort : 'asc',}])
  const [rowData, setRowData]           = React.useState<{}[]>([]);
  const [rowTotal, setRowTotal]         = React.useState(0);
  const [pageData, setPageData]         = React.useState({page: 0, pageSize: 5 });
  const [queryOptions, setQueryOptions] = React.useState({
    field: 'display_name',
    sort : 'asc',
    page : pageData.page.toString(),
    size : pageData.pageSize.toString(),
    cond : ''
  });
  const { refetch: doGetPermission, data, isLoading: isLoadingPermission } = usePermissionRead(queryOptions);

  const [columnData, setColumnData] = React.useState([
    // headerClassName: 'super-app-theme--header', headerAlign: 'center',
    { field: 'uid', headerName: 'ID', type : 'string', flex : 0.3, filterble: false,},
    { field: 'no', headerName: 'No', type: 'number', flex: 0.1, filterble : false, sortable: false},
    { field: 'display_name', headerName: 'Name', type: 'string', minWidth:100, flex: 0.75},
    { field: 'description', headerName: 'Description', type: 'string', minWidth:100, flex: 0.5},
    { field: 'action', type: 'actions', width:100, getActions: (params: GridRenderCellParams) => [
      <GridActionsCellItem
        key     = {"edit-"+params.id}
        icon    = {<EditIcon />}
        label   = "Edit"
        onClick = {() => handleOpenUpdateModal(params.row.uid)}
        showInMenu
      />,
      <GridActionsCellItem
        key     = {"delete-"+params.id}
        icon    = {<DeleteIcon />}
        label   = "Delete"
        onClick = {() => {handleOpenDeleteModal(params.row.id)}}
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

  const getPermissionData = () => {
    doGetPermission().then(
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


  const [updatePermissionID, setUpdatePermissionID] = React.useState('');
  const [openUpdateModal, setOpenUpdateModal]       = React.useState(false);
  const handleCloseUpdateModal                    = () => setOpenUpdateModal(false);
  const handleOpenUpdateModal                     = (permission_id: string) => {
    setUpdatePermissionID(permission_id)
    setOpenUpdateModal(true);
  }
  
  
  const [deletePermissionID, setDeletePermissionID] = React.useState('');
  const [openDeleteModal, setOpenDeleteModal]       = React.useState(false);
  const handleCloseDeleteModal                      = () => setOpenDeleteModal(false);
  const handleOpenDeleteModal                       = (permission_id: string) => {
    setDeletePermissionID(permission_id)
    setOpenDeleteModal(true);
  }
  const { mutate: submitDelete, isLoading: isLoadIngDelete } = usePermissionDelete({ permission_id: updatePermissionID, getData: getPermissionData });
  const handleDeletePermission = () => {
    submitDelete({current_user_uid: currentUser.uid})
  }
  
  React.useEffect(() => {
    handleQuery();
  }, [pageData, sortData]);


  React.useEffect(() => {
    getPermissionData()
  },[queryOptions])

  return (
    <>
      <PaperComponent>
        <TableFilterComponent 
          buttonId     = 'permisson-filter'
          modalId      = 'permisson-filter'
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
          (isLoadingPermission) ? 
            <TableSkeletonComponent />
          :
          <TableComponent 
            rowData        = {rowData}
            columnData     = {columnData}
            isLoading      = {isLoadingPermission}
            pageInfo       = {pageData}
            handlePageInfo = {setPageData}
            rowTotal       = {rowTotal}
            handleSortData = {setSortData}
            columnHide     = {{ uid: false }}
          />
        }
      </PaperComponent>
      <ModalComponent
        modalId      = 'permission-create'
        modalTitle   = 'Permission Create'
        modalSize    = 'sm'
        modalOpen    = {modalCreate}
        modalOnClose = {handleCloseCreateModal}
      >
        <PermissionCreateComponent getPermissionData={getPermissionData} handleCloseModal={handleCloseCreateModal}/>
      </ModalComponent>

      <ModalComponent
        modalId      = 'permission-edit'
        modalTitle   = 'Permission Edit'
        modalSize    = 'sm'
        modalOpen    = {openUpdateModal}
        modalOnClose = {handleCloseUpdateModal}
      >
        <PermissionUpdateComponent updatePermissionID={updatePermissionID} getPermissionData={getPermissionData} handleCloseModal={handleCloseCreateModal}/>
      </ModalComponent>

      <DeleteConfirmComponent 
        modalId      = 'permission-delete'
        modalOpen    = {openDeleteModal}
        modalOnClose = {handleCloseDeleteModal}
        onDelete     = {handleDeletePermission}
      />
    </>
  )
}

export default PermissionTable;