import React from 'react';

import { usePermissionRead } from '@/hooks/permission/use-read'
import PaperComponent from '../_general/atoms/Paper.component'
import TableComponent from '../_general/molecules/Table.component';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { GridActionsCellItem, GridRenderCellParams } from '@mui/x-data-grid'

import UserOnline from '@/types/UserOnline.type';
import { useCategoryRead } from '@/hooks/category/use-read';
import Category, { initCategory } from '@/types/Category.type';
import { useCategoryDelete } from '@/hooks/category/use-delete';
import { useTypedSelector } from '@/hooks/other/use-type-selector';
import CategoryCreateComponent from './CategoryCreate.component';
import CategoryUpdateComponent from './CategoryUpdate.component';
import TableFilterComponent from '../_general/molecules/TableFilter.component';
import TableSkeletonComponent from '../_general/molecules/TableSkeleton.component';
import DeleteConfirmComponent from '../_general/molecules/DeleteConfirm.component';
import { initPageData, initSortData } from '@/utils/pagination';

interface CategoryTableProps {
  modalCreate           : boolean,
  handleCloseCreateModal: ()=>void,
}

const CategoryTable: React.FC<CategoryTableProps> = ({ modalCreate, handleCloseCreateModal }) => {

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
  const { refetch: doGetCategory, data, isLoading: isLoadingCategory } = useCategoryRead(queryOptions);

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
    { field: 'uid', headerName: 'ID', type : 'string', flex : 0.3, filterble: false,},
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

  const getCategoryData = () => {
    doGetCategory().then(
      (resp: any) => {
        if(resp.status == "error"){
          return;
        }
        const startNo = (pageData.pageSize * resp.data.output_schema.current_page)
        const rows    = resp.data.output_schema.data?.map( (val: any,idx: number) => ({no: startNo+idx+1, ...val}) )
        
        setRowData(rows);
        setRowTotal(resp.data.output_schema.total_data);
      } 
    )
  }


  //UPDATE CATEGORY
  const [updateCategory, setUpdateCategory]   = React.useState<Category>(initCategory);
  const [openUpdateModal, setOpenUpdateModal] = React.useState(false);
  const handleCloseUpdateModal                = () => setOpenUpdateModal(false);
  const handleOpenUpdateModal                 = (category: Category) => {
    setUpdateCategory(category)
    setOpenUpdateModal(true);
  }
  
  //DELETE CATEGORY
  const [deleteCategoryID, setDeleteCategoryID] = React.useState('');
  const [openDeleteModal, setOpenDeleteModal]   = React.useState(false);
  const handleCloseDeleteModal                  = () => setOpenDeleteModal(false);
  const handleOpenDeleteModal                   = (category_uid: string) => {
    setDeleteCategoryID(category_uid)
    setOpenDeleteModal(true);
  }
  const { mutate: submitDelete, isLoading: isLoadingDelete, isSuccess } = useCategoryDelete({ category_uid: deleteCategoryID });
  const handleDeleteCategory = () => {
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
    getCategoryData()
  },[queryOptions])

  return (
    <>
      <PaperComponent>
        <TableFilterComponent 
          buttonId     = 'category-filter'
          modalId      = 'category-filter'
          menuArray    = {[{ handleClick: () => console.log(), title: 'test'}]}
          textSearch   = {textSearch}
          handleSearch = {setTextSearch}
          onSearch     = {handleQuery}
        >
          
        </TableFilterComponent>
        {
          (isLoadingCategory) ? 
          <TableSkeletonComponent />
          :
          <TableComponent 
            rowData        = {rowData}
            columnData     = {columnData}
            isLoading      = {isLoadingCategory}
            pageInfo       = {pageData}
            handlePageInfo = {setPageData}
            rowTotal       = {rowTotal}
            handleSortData = {setSortData}
            columnHide     = {{ uid: false }}
          />
        }
      </PaperComponent>

      <CategoryCreateComponent 
        resetPagination  = {resetPagination}
        // getCategoryData  = {getCategoryData}
        handleCloseModal = {handleCloseCreateModal}
        modalOpen        = {modalCreate}
      />
      
      <CategoryUpdateComponent
        resetPagination  = {resetPagination}
        updateCategory   = {updateCategory}
        // getCategoryData  = {getCategoryData}
        handleCloseModal = {handleCloseUpdateModal}
        modalOpen        = {openUpdateModal}
      />

      <DeleteConfirmComponent 
        modalId       = 'category-delete'
        modalOpen     = {openDeleteModal}
        modalOnClose  = {handleCloseDeleteModal}
        onDelete      = {handleDeleteCategory}
        buttonLoading = {isLoadingDelete}
      />
    </>
  )
}

export default CategoryTable;