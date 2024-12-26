import React from 'react';

import { usePermissionRead } from '@/hooks/permission/use-read'
import PaperComponent from '../_general/atoms/Paper.component'
import TableComponent from '../_general/molecules/Table.component';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { GridActionsCellItem, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'

import UserOnline from '@/types/UserOnline.type';
import { useTypedSelector } from '@/hooks/other/use-type-selector';
import ModalComponent from '../_general/molecules/Modal.component';
import TableFilterComponent from '../_general/molecules/TableFilter.component';
import TableSkeletonComponent from '../_general/molecules/TableSkeleton.component';
import DeleteConfirmComponent from '../_general/molecules/DeleteConfirm.component';
import { useDistributorRead } from '@/hooks/distributor/use-read';
import Distributor, { initDistributor } from '@/types/Distributor.type';
import { useDistributorDelete } from '@/hooks/distributor/use-delete';
import DistributorCreateComponent from './DistributorCreate.component';
import DistributorUpdateComponent from './DistributorUpdate.component';
import { initPageData, initSortData } from '@/utils/pagination';

interface DistributorTableProps {
  modalCreate           : boolean,
  handleCloseCreateModal: ()=>void,
}

const DistributorTable: React.FC<DistributorTableProps> = ({ modalCreate, handleCloseCreateModal }) => {

  const currentUser: UserOnline = useTypedSelector(
    (state) => state.reducer.user.user,
  );
  
  const [textSearch, setTextSearch]     = React.useState('');
  const [sortData, setSortData]         = React.useState([initSortData('name')])
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
  const { refetch: doGetDistributor, data, isLoading: isLoadingDistributor } = useDistributorRead(queryOptions);

  const [columnData, setColumnData] = React.useState<any>([
    { field: 'action', type: 'actions', width:50,  align: 'center', headerAlign: 'center', getActions: (params: GridRenderCellParams) => [
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
    ]},
    { field: 'uid', headerName: 'ID', type : 'string', flex : 0.3, filterable: false, align: 'left', headerAlign: 'center' },
    { field: 'no', headerName: 'No', type: 'number', flex: 0.1, filterable : false, sortable: false, align: 'center ', headerAlign: 'center' },
    { field: 'name', headerName: 'Name', type: 'string', minWidth:100, flex: 0.75, align: 'left', headerAlign: 'center' },
    { field: 'address', headerName: 'Address', type: 'string', minWidth:100, flex: 0.75, align: 'left', headerAlign: 'center' },
    { field: 'phone', headerName: 'Phone', type: 'string', minWidth:100, flex: 0.75, align: 'left', headerAlign: 'center' },
    { field: 'status', headerName: 'Status', type: 'boolean', minWidth:100, flex: 0.75, align: 'center', headerAlign: 'center' },
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

  const getDistributorData = () => {
    doGetDistributor().then(
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

  //UPDATE DISTRIBUTOR
  const [updateDistributor, setUpdateDistributor] = React.useState<Distributor>(initDistributor);
  const [openUpdateModal, setOpenUpdateModal]     = React.useState(false);
  const handleCloseUpdateModal                    = () => setOpenUpdateModal(false);
  const handleOpenUpdateModal                     = (distributor: Distributor) => {
    setUpdateDistributor(distributor)
    setOpenUpdateModal(true);
  }
  
  //DELETE DISTRIBUTOR
  const [deleteDistributorID, setDeleteDistributorID] = React.useState('');
  const [openDeleteModal, setOpenDeleteModal]         = React.useState(false);
  const handleCloseDeleteModal                        = () => setOpenDeleteModal(false);
  const handleOpenDeleteModal                         = (distributor_uid: string) => {
    setDeleteDistributorID(distributor_uid)
    setOpenDeleteModal(true);
  }
  const { mutate: submitDelete, isLoading: isLoadingDelete, isSuccess } = useDistributorDelete({ distributor_uid: deleteDistributorID });
  const handleDeleteDistributor = () => {
    submitDelete({current_user_uid: currentUser.uid})
  }
  
  React.useEffect(() => {
    if(isSuccess == true) {
      resetPagination();
      handleCloseDeleteModal();
    }
  }, [isSuccess]);

  React.useEffect(() => {
    handleQuery();
  }, [pageData, sortData]);


  React.useEffect(() => {
    getDistributorData()
  },[queryOptions])

  return (
    <>
      <PaperComponent>
        <TableFilterComponent 
          buttonId     = 'distributor-filter'
          modalId      = 'distributor-filter'
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
          (isLoadingDistributor) ? 
          <TableSkeletonComponent />
          :
          <TableComponent 
            rowData        = {rowData}
            columnData     = {columnData}
            isLoading      = {isLoadingDistributor}
            pageInfo       = {pageData}
            handlePageInfo = {setPageData}
            rowTotal       = {rowTotal}
            handleSortData = {setSortData}
            columnHide     = {{ uid: false }}
          />
        }
      </PaperComponent>
      
      <DistributorCreateComponent
        resetPagination    = {resetPagination}
        handleCloseModal   = {handleCloseCreateModal}
        modalOpen          = {modalCreate}
      />

      <DistributorUpdateComponent
        resetPagination    = {resetPagination}
        updateDistributor  = {updateDistributor}
        handleCloseModal   = {handleCloseUpdateModal}
        modalOpen          = {openUpdateModal}
      />

      <DeleteConfirmComponent 
        modalId       = 'drug-delete'
        modalOpen     = {openDeleteModal}
        modalOnClose  = {handleCloseDeleteModal}
        onDelete      = {handleDeleteDistributor}
        buttonLoading = {isLoadingDelete}
      />
    </>
  )
}

export default DistributorTable;