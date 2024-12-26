import React from 'react';

import { usePermissionRead } from '@/hooks/permission/use-read'
import PaperComponent from '../_general/atoms/Paper.component'
import TableComponent from '../_general/molecules/Table.component';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { GridActionsCellItem, GridRenderCellParams } from '@mui/x-data-grid'

import UserOnline from '@/types/UserOnline.type';
import { useShapeRead } from '@/hooks/shape/use-read';
import Shape, { initShape } from '@/types/Shape.type';
import { useShapeDelete } from '@/hooks/shape/use-delete';
import ShapeCreateComponent from './ShapeCreate.component';
import { useTypedSelector } from '@/hooks/other/use-type-selector';
import ModalComponent from '../_general/molecules/Modal.component';
import TableFilterComponent from '../_general/molecules/TableFilter.component';
import TableSkeletonComponent from '../_general/molecules/TableSkeleton.component';
import DeleteConfirmComponent from '../_general/molecules/DeleteConfirm.component';
import ShapeUpdateComponent from './ShapeUpdate.component';
import { initPageData, initSortData } from '@/utils/pagination';

interface ShapeTableProps {
  modalCreate           : boolean,
  handleCloseCreateModal: ()=>void,
}

const ShapeTable: React.FC<ShapeTableProps> = ({ modalCreate, handleCloseCreateModal }) => {

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
  const { refetch: doGetShape, data, isLoading: isLoadingShape } = useShapeRead(queryOptions);

  const [columnData, setColumnData] = React.useState<any>([
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
    ]},
    { field: 'uid', headerName: 'ID', type : 'string', flex : 0.3, filterble: false, align: 'right', headerAlign: 'center' },
    { field: 'no', headerName: 'No', type: 'number', flex: 0.1, filterble : false, sortable: false, align: 'center', headerAlign: 'center' },
    { field: 'name', headerName: 'Name', type: 'string', minWidth:100, flex: 0.75, align: 'left', headerAlign: 'center' },
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

  const getShapeData = () => {
    doGetShape().then(
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

  //UPDATE SHAPE
  const [updateShape, setUpdateShape]         = React.useState<Shape>(initShape);
  const [openUpdateModal, setOpenUpdateModal] = React.useState(false);
  const handleCloseUpdateModal                = () => setOpenUpdateModal(false);
  const handleOpenUpdateModal                 = (shape: Shape) => {
    setUpdateShape(shape)
    setOpenUpdateModal(true);
  }
  
  //DELETE SHAPE
  const [deleteShapeID, setDeleteShapeID]     = React.useState('');
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
  const handleCloseDeleteModal                = () => setOpenDeleteModal(false);
  const handleOpenDeleteModal                 = (shape_uid: string) => {
    setDeleteShapeID(shape_uid)
    setOpenDeleteModal(true);
  }
  const { mutate: submitDelete, isLoading: isLoadingDelete, isSuccess } = useShapeDelete({ shape_uid: deleteShapeID });
  const handleDeleteShape = () => {
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
    getShapeData()
  },[queryOptions])

  return (
    <>
      <PaperComponent>
        <TableFilterComponent 
          buttonId     = 'shape-filter'
          modalId      = 'shape-filter'
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
          (isLoadingShape) ? 
          <TableSkeletonComponent />
          :
          <TableComponent 
            rowData        = {rowData}
            columnData     = {columnData}
            isLoading      = {isLoadingShape}
            pageInfo       = {pageData}
            handlePageInfo = {setPageData}
            rowTotal       = {rowTotal}
            handleSortData = {setSortData}
            columnHide     = {{ uid: false }}
          />
        }
      </PaperComponent>
      
      <ShapeCreateComponent
        resetPagination  = {resetPagination}
        handleCloseModal = {handleCloseCreateModal}
        modalOpen        = {modalCreate}
      />

      <ShapeUpdateComponent
        updateShape      = {updateShape}
        resetPagination  = {resetPagination}
        handleCloseModal = {handleCloseUpdateModal}
        modalOpen        = {openUpdateModal}
      />

      <DeleteConfirmComponent 
        modalId      = 'shape-delete'
        modalOpen    = {openDeleteModal}
        modalOnClose = {handleCloseDeleteModal}
        onDelete     = {handleDeleteShape}
      />
    </>
  )
}

export default ShapeTable;