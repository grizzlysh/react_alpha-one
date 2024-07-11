import React from 'react';
import { useRouter } from 'next/router';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { GridActionsCellItem, GridRenderCellParams } from '@mui/x-data-grid'

import UserOnline from '@/types/UserOnline.type';
import { useRoleRead } from '@/hooks/role/use-read';
import PaperComponent from '../_general/atoms/Paper.component'
import TableComponent from '../_general/molecules/Table.component';
import ModalComponent from '../_general/molecules/Modal.component';
import { useTypedSelector } from '@/hooks/other/use-type-selector';
import TableFilterComponent from '../_general/molecules/TableFilter.component';
import TableSkeletonComponent from '../_general/molecules/TableSkeleton.component';
import DeleteConfirmComponent from '../_general/molecules/DeleteConfirm.component';
import { initPageData, initSortData } from '@/utils/pagination';
import { useInvoiceDelete } from '@/hooks/invoice/use-delete';
import { useInvoiceRead } from '@/hooks/invoice/use-read';
import moment from 'moment';

const InvoiceTable: React.FC = () => {

  const router                  = useRouter();
  const currentUser: UserOnline = useTypedSelector(
    (state) => state.reducer.user.user,
  );
  
  const [textSearch, setTextSearch]     = React.useState('');
  const [sortData, setSortData]         = React.useState([initSortData('invoice_date')])
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
  const { refetch: doGetInvoice, data, isLoading: isLoadingInvoice } = useInvoiceRead(queryOptions);
  
  const [columnData, setColumnData] = React.useState<any>([
    // headerClassName: 'super-app-theme--header', headerAlign: 'center',
    { field: 'uid', headerName: 'ID', type : 'string', flex: 0.3, filterble: false, align: 'left', headerAlign: 'center'},
    { field: 'no', headerName: 'No', type: 'number', flex: 0.1, filterble : false, sortable: false, align: 'left', headerAlign: 'center'},
    { field: 'no_invoice', headerName: 'No Invoice', type: 'string', minWidth:150, flex: 0.75, align: 'left', headerAlign: 'center'},
    { field: 'distributors', headerName: 'Distributor', type: 'string', minWidth:150, flex: 0.75, sortable: false, align: 'left', headerAlign: 'center',
      valueGetter: (params:GridRenderCellParams) => (params.row.distributors.name).toUpperCase()
    },
    { field: 'invoice_date', headerName: 'Tanggal Invoice', type: 'string', minWidth:150, flex: 0.75, align: 'left', headerAlign: 'center',
      valueGetter: (params:GridRenderCellParams) => moment(params.row.invoice_date).format('DD-MM-YYYY').toString()
    },
    { field: 'receive_date', headerName: 'Tanggal Penerimaan', type: 'string', minWidth:200, flex: 0.75, align: 'left', headerAlign: 'center',
      valueGetter: (params:GridRenderCellParams) => moment(params.row.receive_date).format('DD-MM-YYYY').toString()
    },
    { field: 'total_invoice', headerName: 'Total Faktur', type: 'string', minWidth:150, flex: 0.75, align: 'right', headerAlign: 'center'},
    { field: 'count_item', headerName: 'Banyak Barang', type: 'string', minWidth:150, flex: 0.75, align: 'left', headerAlign: 'center'},
    { field: 'due_date', headerName: 'Jatuh Tempo', type: 'string', minWidth:150, flex: 0.75, align: 'left', headerAlign: 'center',
      valueGetter: (params:GridRenderCellParams) => moment(params.row.due_date).format('DD-MM-YYYY').toString()
    },
    { field: 'status', headerName: 'Status', type: 'string', minWidth:125, flex: 0.75, align: 'left', headerAlign: 'center',
      valueGetter: (params:GridRenderCellParams) => (params.row.status).toUpperCase()
    },
    { field: 'total_pay', headerName: 'Total Bayar', type: 'string', minWidth:150, flex: 0.75, align: 'right', headerAlign: 'center'},
    { field: 'action', type: 'actions', width:50, getActions: (params: GridRenderCellParams) => [
      <GridActionsCellItem
        key     = {"edit-"+params.id}
        icon    = {<EditIcon />}
        label   = "Edit"
        onClick = {() => router.push({
          pathname: '/invoice/[invoice_id]',
          query   : { invoice_id: params.row.uid }
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

  const resetPagination = () => {
    setPageData(initPageData());
    setSortData([initSortData('invoice_date')]);
  }

  const getInvoiceData = () => {
    doGetInvoice().then(
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

  //UPDATE INVOICE
  const [updateInvoiceUID, setUpdateInvoiceUID] = React.useState('');
  const [openUpdateModal, setOpenUpdateModal]   = React.useState(false);
  const handleCloseUpdateModal                  = () => setOpenUpdateModal(false);
  const handleOpenUpdateModal                   = (invoice_uid: string) => {
    setUpdateInvoiceUID(invoice_uid)
    setOpenUpdateModal(true);
  }
  
  //DELETE INVOICE
  const [deleteInvoiceUID, setDeleteInvoiceUID] = React.useState('');
  const [openDeleteModal, setOpenDeleteModal]   = React.useState(false);
  const handleCloseDeleteModal                  = () => setOpenDeleteModal(false);
  const handleOpenDeleteModal                   = (invoice_uid: string) => {
    setDeleteInvoiceUID(invoice_uid)
    setOpenDeleteModal(true);
  }
  const { mutate: submitDelete, isLoading: isLoadingDelete, isSuccess } = useInvoiceDelete({ invoice_uid: deleteInvoiceUID });
  const handleDeleteInvoice = () => {
    submitDelete({current_user_uid: currentUser.uid})
  }
  
  React.useEffect(() => {
    handleQuery();
  }, [pageData, sortData]);


  React.useEffect(() => {
    getInvoiceData()
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
          buttonId     = 'invoice-filter'
          modalId      = 'invoice-filter'
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
          (isLoadingInvoice) ? 
            <TableSkeletonComponent />
          :
          <TableComponent 
            rowData        = {rowData}
            columnData     = {columnData}
            isLoading      = {isLoadingInvoice}
            pageInfo       = {pageData}
            handlePageInfo = {setPageData}
            rowTotal       = {rowTotal}
            handleSortData = {setSortData}
            columnHide     = {{ uid: false }}
          />
        }
      </PaperComponent>

      <DeleteConfirmComponent 
        modalId      = 'invoice-delete'
        modalOpen    = {openDeleteModal}
        modalOnClose = {handleCloseDeleteModal}
        onDelete     = {handleDeleteInvoice}
      />
    </>
  )
}

export default InvoiceTable;