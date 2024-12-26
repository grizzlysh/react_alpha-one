import React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Autocomplete, Stack, TextField } from "@mui/material";

import UserOnline from '@/types/UserOnline.type';
import { useTypedSelector } from '@/hooks/other/use-type-selector';
import LoadingButtonComponent from '../_general/atoms/LoadingButton.component';
import ModalComponent from '../_general/molecules/Modal.component';
import { DdlOptions, statusOptions } from '@/utils/ddlOption';
import { initPageData, initSortData } from '@/utils/pagination';
import { GridActionsCellItem, GridRenderCellParams } from '@mui/x-data-grid'

interface InvoiceDetailProps {
  resetPagination : ()=>void,
  handleCloseModal: ()=>void,
  modalOpen       : boolean,
}

const InvoiceDetailComponent: React.FC<InvoiceDetailProps> = ({ resetPagination, handleCloseModal, modalOpen }) => {

  const currentUser: UserOnline                       = useTypedSelector(
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
    { field: 'uid', headerName: 'ID', type : 'string', flex: 0.3, filterble: false, align: 'left', headerAlign: 'center'},
    { field: 'no', headerName: 'No', type: 'number', flex: 0.1, filterble : false, sortable: false, align: 'center', headerAlign: 'center'},
    { field: 'no_invoice', headerName: 'No Invoice', type: 'string', minWidth:150, flex: 0.75, align: 'left', headerAlign: 'center'},
    { field: 'distributors', headerName: 'Distributor', type: 'string', minWidth:150, flex: 0.75, sortable: false, align: 'left', headerAlign: 'center',
      valueGetter: (params:GridRenderCellParams) => (params.row.distributors.name).toUpperCase()
    },
    { field: 'invoice_date', headerName: 'Tanggal Invoice', type: 'string', minWidth:150, flex: 0.75, align: 'left', headerAlign: 'center',
      valueGetter: (params:GridRenderCellParams) => moment(params.row.invoice_date).format('DD/MM/YYYY').toString()
    },
    { field: 'receive_date', headerName: 'Tanggal Penerimaan', type: 'string', minWidth:200, flex: 0.75, align: 'left', headerAlign: 'center',
      valueGetter: (params:GridRenderCellParams) => moment(params.row.receive_date).format('DD/MM/YYYY').toString()
    },
    { field: 'total_invoice', headerName: 'Total Faktur', type: 'number', minWidth:150, flex: 0.75, align: 'right', headerAlign: 'center'},
    { field: 'count_item', headerName: 'Banyak Barang', type: 'number', minWidth:150, flex: 0.75, align: 'left', headerAlign: 'center'},
    { field: 'due_date', headerName: 'Jatuh Tempo', type: 'string', minWidth:150, flex: 0.75, align: 'left', headerAlign: 'center',
      valueGetter: (params:GridRenderCellParams) => moment(params.row.due_date).format('DD/MM/YYYY').toString()
    },
    { field: 'status', headerName: 'Status', type: 'string', minWidth:125, flex: 0.75, align: 'left', headerAlign: 'center',
      valueGetter: (params:GridRenderCellParams) => (params.row.status).toUpperCase()
    },
    { field: 'total_pay', headerName: 'Total Bayar', type: 'number', minWidth:150, flex: 0.75, align: 'right', headerAlign: 'center'},
  ]);

  return (
    <>
      <ModalComponent
        modalId      = 'drug-create'
        modalTitle   = 'Drug Create'
        modalSize    = 'sm'
        modalOpen    = {modalOpen}
        modalOnClose = {() => {handleCloseModal(); resetForm();}}
        isPermanent  = {false}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack direction={'column'}>
            <Controller
              name    = "name"
              control = {control}
              rules   = {{ 
                required: {
                  value  : true,
                  message: "Name field is required"
                },
              }}
              render  = { ({ 
                  field     : { onChange, value },
                  fieldState: { error },
                  formState,
                }) => (
                <TextField            
                  autoComplete = 'off'
                  helperText   = {error ? error.message : " "}
                  size         = "medium"
                  error        = {!!error}
                  onChange     = {onChange}
                  type         = 'string'
                  value        = {value}
                  label        = {"Name"}
                  variant      = "outlined"
                  sx           = {{mb:1}}
                  fullWidth
                />
                )
              }
            />

            <Controller
              name    = "shape_uid"
              control = {control}
              rules   = {{
                // validate:(value, formValues) => (formValues.write_permit || formValues.read_permit || formValues.modify_permit || formValues.delete_permit != false ),
                required: {
                  value  : true,
                  message: "Shape field is required"
                },
              }}
              render  = { ({ 
                  field     : { onChange, value },
                  fieldState: { error },
                }) => (
                  <Autocomplete
                    value                = {value}
                    id                   = "controllable-states-demo"
                    options              = {shapeOptions}
                    sx                   = {{mb:1}}
                    onChange             = {(event: any, value: any) => { onChange(value) }}
                    isOptionEqualToValue = { (option: any, value: any) => option.label || "" ||  option.value == value.value}
                    renderInput          = {(params: any) => 
                    <TextField
                      fullWidth
                      {...params}
                      size       = "medium"
                      label      = "Shape"
                      error      = {!!error}
                      helperText = {error ? error.message : " "}
                    />}
                  />
                )
              }
            />


            <Controller
              name    = "category_uid"
              control = {control}
              rules   = {{
                // validate:(value, formValues) => (formValues.write_permit || formValues.read_permit || formValues.modify_permit || formValues.delete_permit != false ),
                required: {
                  value  : true,
                  message: "Category field is required"
                },
              }}
              render  = { ({ 
                  field     : { onChange, value },
                  fieldState: { error },
                }) => (
                  <Autocomplete
                    value                = {value}
                    id                   = "controllable-states-demo"
                    options              = {categoryOptions}
                    sx                   = {{mb:1}}
                    onChange             = {(event: any, value: any) => { onChange(value) }}
                    isOptionEqualToValue = { (option: any, value: any) => option.label || "" ||  option.value == value.value}
                    renderInput          = {(params: any) => 
                    <TextField
                      fullWidth
                      {...params}
                      size       = "medium"
                      label      = "Category"
                      error      = {!!error}
                      helperText = {error ? error.message : " "}
                    />}
                  />
                )
              }
            />

            <Controller
              name    = "therapy_class_uid"
              control = {control}
              rules   = {{
                // validate:(value, formValues) => (formValues.write_permit || formValues.read_permit || formValues.modify_permit || formValues.delete_permit != false ),
                required: {
                  value  : true,
                  message: "Therapy Class field is required"
                },
              }}
              render  = { ({ 
                  field     : { onChange, value },
                  fieldState: { error },
                }) => (
                  <Autocomplete
                    value                = {value}
                    id                   = "controllable-states-demo"
                    options              = {therapyClassOptions}
                    sx                   = {{mb:1}}
                    onChange             = {(event: any, value: any) => { onChange(value) }}
                    isOptionEqualToValue = { (option: any, value: any) => option.label || "" ||  option.value == value.value}
                    renderInput          = {(params: any) => 
                    <TextField
                      fullWidth
                      {...params}
                      size       = "medium"
                      label      = "Therapy Class"
                      error      = {!!error}
                      helperText = {error ? error.message : " "}
                    />}
                  />
                )
              }
            />

            <Controller
              name    = "status"
              control = {control}
              rules   = {{
                // validate:(value, formValues) => (formValues.write_permit || formValues.read_permit || formValues.modify_permit || formValues.delete_permit != false ),
                required: {
                  value  : true,
                  message: "Status field is required"
                },
              }}
              render  = { ({ 
                  field     : { onChange, value },
                  fieldState: { error },
                }) => (
                  <Autocomplete
                    value                = {value}
                    id                   = "controllable-states-demo"
                    options              = {statusOptions}
                    sx                   = {{mb:1}}
                    onChange             = {(event: any, value: any) => { onChange(value) }}
                    isOptionEqualToValue = { (option: any, value: any) => option.label || "" ||  option.value == value.value}
                    renderInput          = {(params: any) => 
                    <TextField
                      fullWidth
                      {...params}
                      size       = "medium"
                      label      = "Status"
                      error      = {!!error}
                      helperText = {error ? error.message : " "}
                    />}
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
                  error        = {!!error}
                  helperText   = {error ? error.message : " "}
                  sx           = {{mb:1}}
                />
                )
              }
            />
            <LoadingButtonComponent
              buttonColor = 'primary'
              type        = 'submit'
              disabled    = {!isValid}
              isLoading   = {isLoading}
              id          = 'distributor_create_submit'
              sx           = {{mt:1}}
            >
              SUBMIT
            </LoadingButtonComponent>
          </Stack>
        </form>
      </ModalComponent>
    </>
  )
};

export default InvoiceDetailComponent;