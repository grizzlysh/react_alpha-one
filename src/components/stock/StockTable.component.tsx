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
import { useStockRead } from '@/hooks/stock/use-read';
import Stock from '@/types/Stock.type';


const StockTable: React.FC = () => {

  const currentUser: UserOnline = useTypedSelector(
    (state) => state.reducer.user.user,
  );
  
  const [textSearch, setTextSearch]     = React.useState('');
  const [sortData, setSortData]         = React.useState([initSortData('drugs.name')])
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
  const { refetch: doGetStock, data, isLoading: isLoadingDrug } = useStockRead(queryOptions);

  const [columnData, setColumnData] = React.useState<any>([
    { field: 'action', type: 'actions', width:50,  align: 'center', headerAlign: 'center', getActions: (params: GridRenderCellParams) => [
      <GridActionsCellItem
        key     = {"Edit Harga-"+params.id}
        icon    = {<EditIcon />}
        label   = "Edit Harga"
        onClick = {() => handleOpenUpdateModal(params.row)}
        showInMenu
      />,
      <GridActionsCellItem
        key     = {"detail-"+params.id}
        icon    = {<EditIcon />}
        label   = "Detail"
        onClick = {() => handleOpenUpdateModal(params.row)}
        showInMenu
      />,
      <GridActionsCellItem
        key     = {"print-"+params.id}
        icon    = {<EditIcon />}
        label   = "Print"
        onClick = {() => handleOpenUpdateModal(params.row)}
        showInMenu
      />,
    ]},
    { field: 'uid', headerName: 'ID', type : 'string', flex : 0.3, filterable: false, align: 'center', headerAlign: 'center' },
    { field: 'no', headerName: 'No', type: 'number', flex: 0.1, filterable : false, sortable: false, align: 'center', headerAlign: 'center' },
    // { field: 'name', headerName: 'Name', type: 'string', minWidth:100, flex: 0.75, align: 'center', headerAlign: 'center' },
    { field: 'drugs.name', headerName: 'Obat', type: 'string', minWidth:200, flex: 0.75, sortable: true, align: 'left', headerAlign: 'center',
      valueGetter: (params:GridRenderCellParams) => (params.row.drugs.name).toUpperCase()
    },
    { field: 'total_qty', headerName: 'Total Qty', type: 'number', minWidth:100, flex: 0.75, align: 'right', headerAlign: 'center' },
    { field: 'price_buy', headerName: 'Harga Beli', type: 'number', minWidth:100, flex: 0.75, align: 'right', headerAlign: 'center' },
    { field: 'price', headerName: 'Estimasi Harga', type: 'number', minWidth:100, flex: 0.75, align: 'right', headerAlign: 'center' },
    { field: 'price_manual', headerName: 'Harga Manual', type: 'number', minWidth:100, flex: 0.75, align: 'right', headerAlign: 'center' },
    
    
    // { field: 'barcode', headerName: 'Barcode', type: 'string', minWidth:100, flex: 0.75, align: 'center', headerAlign: 'center' },
    // { field: 'status', headerName: 'Status', type: 'boolean', minWidth:100, flex: 0.75, align: 'center', headerAlign: 'center' },
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

  const getStockData = () => {
    doGetStock().then(
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

  //UPDATE STOCK
  const [updateStock, setUpdateStock]         = React.useState<Stock>();
  const [openUpdateModal, setOpenUpdateModal] = React.useState(false);
  const handleCloseUpdateModal                = () => setOpenUpdateModal(false);
  const handleOpenUpdateModal                 = (stock: Stock) => {
    setUpdateStock(stock)
    setOpenUpdateModal(true);
  }
  
  React.useEffect(() => {
    handleQuery();
  }, [pageData, sortData]);


  React.useEffect(() => {
    getStockData()
  },[queryOptions])

  return (
    <>
      <PaperComponent>
        <TableFilterComponent 
          buttonId     = 'stock-filter'
          modalId      = 'stock-filter'
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

      {/* <DrugUpdateComponent
        updateDrug       = {updateStock}
        resetPagination  = {resetPagination}
        handleCloseModal = {handleCloseUpdateModal}
        modalOpen        = {openUpdateModal}
      /> */}
    </>
  )
}

export default StockTable;