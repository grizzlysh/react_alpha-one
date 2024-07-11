import React from 'react';

import { usePermissionRead } from '@/hooks/permission/use-read'
import PaperComponent from '../_general/atoms/Paper.component'
import TableComponent from '../_general/molecules/Table.component';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { GridActionsCellItem, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'

import UserOnline from '@/types/UserOnline.type';
import { useTypedSelector } from '@/hooks/other/use-type-selector';
import TableFilterComponent from '../_general/molecules/TableFilter.component';
import TableSkeletonComponent from '../_general/molecules/TableSkeleton.component';
import DeleteConfirmComponent from '../_general/molecules/DeleteConfirm.component';
import { useDrugRead } from '@/hooks/drug/use-read';
import Drug, { initDrug } from '@/types/Drug.type';
import { useDrugDelete } from '@/hooks/drug/use-delete';
import DrugCreateComponent from './DrugCreate.component';
import DrugUpdateComponent from './DrugUpdate.component';
import { initPageData, initSortData } from '@/utils/pagination';

interface DrugTableProps {
  modalCreate           : boolean,
  handleCloseCreateModal: ()=>void,
}

const DrugTable: React.FC<DrugTableProps> = ({ modalCreate, handleCloseCreateModal }) => {

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
  const { refetch: doGetDrug, data, isLoading: isLoadingDrug } = useDrugRead(queryOptions);

  const [columnData, setColumnData] = React.useState<any>([
    { field: 'uid', headerName: 'ID', type : 'string', flex : 0.3, filterable: false, align: 'center', headerAlign: 'center' },
    { field: 'no', headerName: 'No', type: 'number', flex: 0.1, filterable : false, sortable: false, align: 'center', headerAlign: 'center' },
    { field: 'name', headerName: 'Name', type: 'string', minWidth:100, flex: 0.75, align: 'center', headerAlign: 'center' },
    { field: 'shapes', headerName: 'Bentuk', type: 'string', minWidth:200, flex: 0.75, sortable: false, align: 'center', headerAlign: 'center',
      valueGetter: (params:GridRenderCellParams) => (params.row.shapes.name).toUpperCase()
    },
    { field: 'categories', headerName: 'Tipe', type: 'string', minWidth:200, flex: 0.75, sortable: false, align: 'center', headerAlign: 'center',
      valueGetter: (params:GridRenderCellParams) => (params.row.categories.name).toUpperCase()
    },
    { field: 'therapy_classes', headerName: 'Kelas Terapi', type: 'string', minWidth:200, flex: 0.75, sortable: false, align: 'center', headerAlign: 'center',
      valueGetter: (params:GridRenderCellParams) => (params.row.therapy_classes.name).toUpperCase()
    },
    { field: 'status', headerName: 'Status', type: 'boolean', minWidth:100, flex: 0.75, align: 'center', headerAlign: 'center' },
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

  const getDrugData = () => {
    doGetDrug().then(
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

  //UPDATE DRUG
  const [updateDrug, setUpdateDrug]           = React.useState<Drug>(initDrug);
  const [openUpdateModal, setOpenUpdateModal] = React.useState(false);
  const handleCloseUpdateModal                = () => setOpenUpdateModal(false);
  const handleOpenUpdateModal                 = (drug: Drug) => {
    setUpdateDrug(drug)
    setOpenUpdateModal(true);
  }
  
  //DELETE DRUG
  const [deleteDrugID, setDeleteDrugID]       = React.useState('');
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
  const handleCloseDeleteModal                = () => setOpenDeleteModal(false);
  const handleOpenDeleteModal                 = (drug_uid: string) => {
    setDeleteDrugID(drug_uid)
    setOpenDeleteModal(true);
  }
  const { mutate: submitDelete, isLoading: isLoadIngDelete, isSuccess } = useDrugDelete({ drug_uid: deleteDrugID });
  const handleDeleteDrug = () => {
    submitDelete({current_user_uid: currentUser.uid})
  }
  
  React.useEffect(() => {
    handleQuery();
  }, [pageData, sortData]);


  React.useEffect(() => {
    getDrugData()
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
          buttonId     = 'drug-filter'
          modalId      = 'drug-filter'
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
          (isLoadingDrug) ? 
          <TableSkeletonComponent />
          :
          <TableComponent 
            rowData        = {rowData}
            columnData     = {columnData}
            isLoading      = {isLoadingDrug}
            pageInfo       = {pageData}
            handlePageInfo = {setPageData}
            rowTotal       = {rowTotal}
            handleSortData = {setSortData}
            columnHide     = {{ uid: false }}
          />
        }
      </PaperComponent>
      
      <DrugCreateComponent
        resetPagination  = {resetPagination}
        handleCloseModal = {handleCloseCreateModal}
        modalOpen        = {modalCreate}
      />

      <DrugUpdateComponent
        updateDrug       = {updateDrug}
        resetPagination  = {resetPagination}
        handleCloseModal = {handleCloseUpdateModal}
        modalOpen        = {openUpdateModal}
      />

      <DeleteConfirmComponent 
        modalId      = 'drug-delete'
        modalOpen    = {openDeleteModal}
        modalOnClose = {handleCloseDeleteModal}
        onDelete     = {handleDeleteDrug}
      />
    </>
  )
}

export default DrugTable;