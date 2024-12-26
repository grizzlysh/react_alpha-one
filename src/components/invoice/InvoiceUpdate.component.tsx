import React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

import 'moment/locale/id';
import { v4 as uuidv4 } from 'uuid';
import startCase from 'lodash/startCase';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Autocomplete, Box, Button, FormControlLabel, FormGroup, InputAdornment, Paper, Stack, Switch, TextField } from '@mui/material'
import { DataGrid, GridActionsCellItem, GridRenderCellParams } from '@mui/x-data-grid'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';

import UserOnline from '@/types/UserOnline.type'
import { useTypedSelector } from '@/hooks/other/use-type-selector'
import PaperComponent from '@/components/_general/atoms/Paper.component'
import { DdlOptions } from '@/utils/ddlOption';
import { useDrugDdl } from '@/hooks/drug/use-ddl';
import { useDistributorDdl } from '@/hooks/distributor/use-ddl';
import { useInvoiceCreate } from '@/hooks/invoice/use-create';
import { InvoiceCreateInput, InvoiceCreateRequest, InvoiceDetailCreateInput, InvoiceDetailCreateRequest } from '@/services/invoice/create';
import moment from 'moment-timezone';
import { ruleDecimalOnly, ruleDecimalOnlyWithLimit, ruleNoSpace, ruleNumberOnly, ruleNumberOnlyWithLimit, rulePercentOnly } from '@/utils/rules';
import ButtonComponent from '../_general/atoms/Button.component';
import LoadingButtonComponent from '../_general/atoms/LoadingButton.component';
import CurrencyTextFieldLimitComponent from '../_general/atoms/CurrencyTextFieldLimit.component';
import { invoiceStatusOptions } from '@/utils/ddlOption';
import CurrencyTextFieldDecimalComponent from '../_general/atoms/CurrencyTextFieldDecimal.component';
import { decimal2point } from '@/utils/generalFunc';
import { useInvoiceUpdate } from '@/hooks/invoice/use-update';
import { useInvoiceReadByID } from '@/hooks/invoice/use-read-by-id';
import { InvoiceUpdateInput } from '@/services/invoice/update';
import { useRouter } from 'next/router';
import { InvoiceDetail } from '@/types/Invoice.type';
import ModalConfirmComponent from '../_general/molecules/ModalConfirm.component';


const InvoiceUpdateComponent: React.FC = () => {

  const [openConfirmModal, setOpenConfirmModal]       = React.useState(false);
  const handleCloseConfirmModal                       = () => setOpenConfirmModal(false);
  const handleOpenConfirmModal                        = () => {
    setOpenConfirmModal(true);
  }

  const router         = useRouter();
  const { invoice_id } = router.query;
  const { isReady }    = router;
  const invoice_uid    = isReady && invoice_id.toString()

  const [distributorOptions, setDistributorOptions]         = React.useState<DdlOptions[]>([]);
  const [drugOptions, setDrugOptions]                       = React.useState<DdlOptions[]>([]);
  const [duplicateInvoiceDetail, setDuplicateInvoiceDetail] = React.useState(false);
  const [invoiceDetailList, setInvoiceDetailList]           = React.useState<{}[]>([])
  const invoiceDetailListRef                                = React.useRef<{}[]>([])
  const invoiceDetailListOriginalRef                        = React.useRef<{}[]>([])

  const { refetch: doGetDistributor, data: dataDistributor, isLoading: isLoadingDistributor } = useDistributorDdl();
  const { refetch: doGetDrug, data: dataDrug, isLoading: isLoadingDrug }                      = useDrugDdl();
  const { refetch: doGetInvoice, data: dataInvoice, isLoading: isLoadingInvoice }             = useInvoiceReadByID({ invoice_uid: invoice_uid });

  const { mutate: submitUpdateInvoice, isLoading } = useInvoiceUpdate({invoice_uid: invoice_uid})
  const currentUser: UserOnline                    = useTypedSelector(
    (state) => state.reducer.user.user,
  );

  const [invoiceDetailColumn, setInvoiceDetailColumn] = React.useState<any>([
    { field: 'unique_id', headerName: 'Unique ID', type : 'string', flex : 0.7, minWidth: 150, sortable: false, headerAlign: 'center', },
    { field: 'nomber', type: 'number', headerName: 'No', flex : 0.1, sortable: false,
      renderCell: (params:any) => params.api.getAllRowIds().indexOf(params.id)+1
    },
    { field: 'status', headerName: 'Status', type : 'string', flex : 0.7, minWidth: 150, sortable: false, headerAlign: 'center', },
    { field: 'drug_name', headerName: 'Nama Obat', type : 'string', flex : 0.7, minWidth: 150, sortable: false, headerAlign: 'center', },
    { field: 'drug_uid', headerName: 'Drug UID', type : 'string', flex : 0.7, minWidth: 150, sortable: false, headerAlign: 'center', },
    { field: 'expired_date', headerName: 'Tanggal Expired', type : 'string', flex : 0.7, minWidth: 150, sortable: false, headerAlign: 'center', },
    { field: 'no_batch', headerName: 'No Batch', type : 'string', flex : 0.7, minWidth: 100, sortable: false, headerAlign: 'center', },
    { field: 'qty_pcs', headerName: 'Qty/Pcs @ Box', type : 'number', flex : 0.7, minWidth: 100, sortable: false, headerAlign: 'center', },
    { field: 'qty_box', headerName: 'Qty/Box', type : 'number', flex : 0.7, minWidth: 100, sortable: false, headerAlign: 'center', },
    { field: 'price_box', headerName: 'Price/Box', type : 'number', flex : 0.7, minWidth: 100, sortable: false, headerAlign: 'center', },
    { field: 'discount', headerName: 'Discount', type : 'number', flex : 0.7, minWidth: 100, sortable: false, headerAlign: 'center', },
    { field: 'discount_nominal', headerName: 'Discount', type : 'number', flex : 0.7, minWidth: 100, sortable: false, headerAlign: 'center', },
    { field: 'ppn', headerName: 'PPN', type : 'number', flex : 0.7, minWidth: 100, sortable: false, headerAlign: 'center', },
    { field: 'ppn_nominal', headerName: 'PPN', type : 'number', flex : 0.7, minWidth: 100, sortable: false, headerAlign: 'center', },
    { field: 'total_price', headerName: 'Total Harga', type : 'number', flex : 0.7, minWidth: 100, sortable: false, headerAlign: 'center', },
    { field: 'action', type: 'actions', flex : 0.2, width:50, getActions: (params: GridRenderCellParams) =>
      (params.row.status == 'exist') ? [] :
      [
        <GridActionsCellItem
          key     = {"edit-"+params.id}
          icon    = {<EditIcon />}
          label   = "Edit"
          onClick = {() => handleEditSelect(params.row.unique_id)}
          showInMenu
        />,
        <GridActionsCellItem
          key     = {"delete-"+params.id}
          icon    = {<DeleteIcon />}
          label   = "Delete"
          onClick = {() => handleDeleteSelect(params.row.unique_id)}
          showInMenu
        />,
      ]
    }
  ])


  const getDdlOptions = async () => {
    await doGetDrug().then(
      (resp: any) => {
        if(resp.status == "error"){
          return;
        }

        let drugArray = resp.data.output_schema.data.map(drug => ({
          ...drug,
          label: drug.label.toUpperCase(),
        }));
        
        setDrugOptions(drugArray)
      } 
    )

    doGetDistributor().then(
      (resp: any) => {
        if(resp.status == "error"){
          return;
        }
        
        let distributorArray = resp.data.output_schema.data.map(distributor => ({
          ...distributor,
          label: distributor.label.toUpperCase(),
          // value: distributor.value
        }));

        setDistributorOptions(distributorArray)
      } 
    )
  }

  const getInvoiceData = async () => {
    await doGetInvoice().then(
      (resp: any) => {
        if(resp.status == "error"){
          return;
        }

        const total_debt    = resp.data.output_schema.data.total_invoice - resp.data.output_schema.data.total_pay;

        reset({
          no_invoice      : resp.data.output_schema.data.no_invoice,
          // invoice_date    : resp.data.output_schema.data.invoice_date,
          invoice_date    : moment(resp.data.output_schema.data.invoice_date).format('DD/MM/YYYY').toString(),
          receive_date    : moment(resp.data.output_schema.data.receive_date).format('DD/MM/YYYY').toString(),
          total_invoice   : resp.data.output_schema.data.total_invoice,
          count_item      : resp.data.output_schema.data.count_item,
          due_date        : moment(resp.data.output_schema.data.due_date).format('DD/MM/YYYY').toString(),
          status          : { label:startCase(resp.data.output_schema.data.status), value: resp.data.output_schema.data.status },
          total_pay       : resp.data.output_schema.data.total_pay,
          total_debt      : total_debt,
          distributor_uid : { label: resp.data.output_schema.data.distributors?.name.toUpperCase(), value: resp.data.output_schema.data.distributors?.uid },
          detail_invoices : JSON.stringify(resp.data.output_schema.data.detail_invoices),
          current_user_uid: currentUser.uid,
        })

        const invoiceDetails = resp.data.output_schema.data.detail_invoices?.map( (val: InvoiceDetail) => (
          {
            unique_id       : val.uid,
            drug_uid        : val.drugs.uid,
            drug_name       : val.drugs.name.toUpperCase(),
            no_batch        : val.no_batch,
            expired_date    : moment(val.expired_date).format('DD/MM/YYYY'),
            qty_pcs         : val.qty_pcs,
            qty_box         : val.qty_box,
            price_box       : val.price_box,
            total_price     : val.total_price,
            discount        : val.discount,
            discount_nominal: val.discount_nominal,
            ppn             : val.ppn,
            ppn_nominal     : val.ppn_nominal,
            status          : 'exist'
          }
        ))

        setInvoiceDetailList(invoiceDetails)
        invoiceDetailListOriginalRef.current = invoiceDetails;
        
        // setPermissionList(permissions)
        // permissionListOriginalRef.current = permissions;
      }
    )
  }

  const { 
    reset,
    control,
    setValue,
    getValues,
    handleSubmit,
    formState: { isValid, isDirty, errors },
  } = useForm<InvoiceUpdateInput>({
    defaultValues: {
      no_invoice      : '',
      invoice_date    : '',
      receive_date    : '',
      total_invoice   : 0,
      count_item      : 0,
      due_date        : '',
      status          : null,
      total_pay       : '0',
      total_debt      : 0,
      distributor_uid : null,
      detail_invoices : '',
      current_user_uid: currentUser.uid,
    }
  })

  const onSubmit: SubmitHandler<InvoiceUpdateInput> = (data) => {

    // const total_pay   = data.total_pay ? parseFloat(data.total_pay) : 0;
    const total_pay   = data.total_pay ? parseFloat(data.total_pay) : 0;
    const countItem   = invoiceDetailList.length;
    const invoiceData = {
      no_invoice      : data.no_invoice,
      invoice_date    : moment(data.invoice_date, 'DD/MM/YYYY').format('DD/MM/YYYY').toString(),
      receive_date    : moment(data.receive_date, 'DD/MM/YYYY').format('DD/MM/YYYY').toString(),
      total_invoice   : data.total_invoice,
      count_item      : countItem,
      due_date        : moment(data.due_date, 'DD/MM/YYYY').format('DD/MM/YYYY').toString(),
      status          : data.status?.value || 'belum lunas',
      total_pay       : total_pay,
      distributor_uid : data.distributor_uid.value,
      detail_invoices : JSON.stringify(invoiceDetailList),
      current_user_uid: data.current_user_uid,
    }
    submitUpdateInvoice(invoiceData)
    console.log(invoiceData)
  }
  
  const { 
    reset: resetInvoiceDetail,
    setValue: setValueDetail,
    getValues: getValuesDetail,
    control: controlInvoiceDetail,
    clearErrors: clearErrorsDetail,
    handleSubmit: handleSubmitInvoiceDetail,
    formState: { isValid: isValidInvoiceDetail, errors: errorsInvoiceDetail },
  } = useForm<InvoiceDetailCreateInput>({
    defaultValues: {
      drug            : null,
      no_batch        : '',
      expired_date    : '',
      qty_pcs         : '',
      qty_box         : '',
      price_box       : '0',
      total_drug_price: 0,
      discount        : '0',
      discount_nominal: 0,
      ppn             : false,
      ppn_nominal     : 0,
      total_price     : 0,
    },
    mode: 'all',
  })

  const onAddInvoiceDetail = (data: any) => {
    // const detailIndex = invoiceDetailList.length;

    const detailRow = {
      // no              : detailIndex+1
      unique_id       : uuidv4(),
      drug_uid        : data.drug?.value,
      drug_name       : data.drug?.label,
      no_batch        : data.no_batch,
      expired_date    : moment(data.expired_date,'DD/MM/YYYY').format('DD/MM/YYYY').toString(),
      qty_pcs         : data.qty_pcs ? parseFloat(data.qty_pcs)                               : 0,
      qty_box         : data.qty_box ? parseFloat(data.qty_box)                               : 0,
      price_box       : data.price_box ? parseFloat(data.price_box)                           : 0,
      total_price     : data.total_price ? parseFloat(data.total_price)                       : 0,
      discount        : data.discount ? parseFloat(data.discount)                             : 0,
      discount_nominal: data.discount_nominal ? parseFloat(data.discount_nominal)             : 0,
      ppn             : data.ppn ? 11                                                         : 0,
      ppn_nominal     : data.ppn_nominal ? parseFloat(data.ppn_nominal)                       : 0,
      status          : 'new',
    }
    setInvoiceDetailList((prevList) => ([ ...prevList, detailRow ]));
    resetInvoiceDetail({
      drug            : null,
      no_batch        : '',
      expired_date    : '',
      qty_pcs         : '',
      qty_box         : '',
      price_box       : '0',
      total_drug_price: 0,
      discount        : '0',
      discount_nominal: 0,
      ppn             : false,
      ppn_nominal     : 0,
      total_price     : 0,
    })
    setDuplicateInvoiceDetail(false);
    // clearErrorsDetail('price_box')
  };
  
  const handleDeleteSelect = React.useCallback((index:string) => {
    setInvoiceDetailList( (prevList) => prevList.filter( (row:any) => row.unique_id !== index))
    // calculateTotalInvoice()
  },[]);

  const handleEditSelect = React.useCallback((index:string) => {

    setInvoiceDetailList( (prevList) => {
      const editData: any = prevList.find( (val: any) => val.unique_id == index );

      resetInvoiceDetail({
        drug            : {label: editData.drug_name, value: editData.drug_uid},
        no_batch        : editData.no_batch,
        expired_date    : moment(editData.expired_date, 'DD/MM/YYYY').format('DD/MM/YYYY').toString(),
        qty_pcs         : editData.qty_pcs.toString(),
        qty_box         : editData.qty_box.toString(),
        price_box       : editData.price_box.toString(),
        total_drug_price: editData.total_drug_price,
        discount        : editData.discount.toString(),
        discount_nominal: editData.discount_nominal,
        ppn             : editData.ppn == 0 ? false : true,
        ppn_nominal     : editData.ppn_nominal,
        total_price     : editData.total_price,
      })
      return prevList.filter( (row:any) => row.unique_id !== index)
      // return prevList;
    })

  },[]);

  const checkDuplicate = () => {
    const input_drug         = getValuesDetail('drug');
    const input_no_batch     = getValuesDetail('no_batch');
    const input_expired_date = moment(getValuesDetail('expired_date'), 'DD/MM/YYYY').format('DD/MM/YYYY').toString();

    const check              = invoiceDetailList.filter( (val:any) => (
      val.drug_uid == input_drug?.value) && 
      (val.no_batch == input_no_batch) &&
      (val.expired_date == input_expired_date)
    )
    
    if (check.length>0) {
      setDuplicateInvoiceDetail(false)
    }
    else { 
      setDuplicateInvoiceDetail(true)
    }
  }

  const assignDueDate = () => {

    let receive_date = moment(getValues('receive_date'), 'DD/MM/YYYY')
    let due_date     = receive_date.add(1, 'month').format('DD/MM/YYYY').toString();
    setValue('due_date', due_date)

  }

  const calculateTotalDetail = () => {
    // let qty_pcs     = getValuesDetail('qty_pcs') || 0;
    let qty_box     = parseFloat(getValuesDetail('qty_box') || '0');
    let price_box   = parseFloat(getValuesDetail('price_box') || '0');
    let discount    = parseFloat(getValuesDetail('discount') || '0');
    let ppn         = getValuesDetail('ppn') ? 11 : 0;
    let total_price = 0;

    let total_drug_price     = qty_box * price_box;
    let discount_deduction   = discount/100 * total_drug_price;
    let total_after_discount = total_drug_price - discount_deduction;
    let ppn_additional       = ppn/100 * total_after_discount;
        total_price          = total_after_discount + ppn_additional;

    setValueDetail('total_drug_price', decimal2point(total_drug_price) );
    setValueDetail('discount_nominal', decimal2point(discount_deduction) );
    setValueDetail('ppn_nominal', decimal2point(ppn_additional) );
    setValueDetail('total_price', decimal2point(total_price) );
    checkDuplicate();
  }

  const calculateTotalInvoice = () => {

    let totalInvoice = 0;
    invoiceDetailList.forEach( (val: any) => { 
      totalInvoice += parseFloat(val.total_price)
    });
  //   let totalInvoice = invoiceDetailList.reduce((total, val: any) => { return total + val.total_price}, 0)
    setValue('total_invoice', decimal2point(totalInvoice) )
  }

  const calculateTotalFinal = () => {

    const total_invoice = getValues('total_invoice');
    const total_pay     = parseFloat(getValues('total_pay'));

    if (total_pay > total_invoice) {
      setValue('total_pay', '0')
      setValue('total_debt', total_invoice)
      setValue('status', {value: 'belum lunas', label: 'Belum Lunas'})
    }
    else {
      const total_debt    = total_invoice - total_pay;
      if (total_debt == 0){
        setValue('status', {value: 'lunas', label: 'Lunas'})
      }
      else {
        setValue('status', {value: 'belum lunas', label: 'Belum Lunas'})
      }
      setValue('total_debt',decimal2point(total_debt));
    }
  }

  const handleUpdateInvoiceDetailList = () => {
    const invoiceDetailTemp = JSON.stringify(invoiceDetailListRef.current);
    
    if (JSON.stringify(invoiceDetailListRef.current) != JSON.stringify(invoiceDetailListOriginalRef.current)) {
      setValue('detail_invoices',invoiceDetailTemp, { shouldDirty: true });
    }
    else {
      setValue('detail_invoices',invoiceDetailTemp, { shouldDirty: false });
      reset(getValues(), { keepDirty: false, keepValues: true});
    }
  }
  
  React.useEffect( () => {
    getDdlOptions()
    if(isReady){
      getInvoiceData()
    }
  },[invoice_uid])
  
  React.useEffect( () => {
    invoiceDetailListRef.current = invoiceDetailList
    handleUpdateInvoiceDetailList()
    calculateTotalInvoice()
    calculateTotalFinal()
  },[invoiceDetailList])
  
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="id">
        <PaperComponent>
            <Stack direction={"column"} gap={2}> 
              <Stack
                display = {"flex"}
                sx      = {{
                  marginBottom: 2,
                  '@media (min-width: 0px)'  : {
                    flexDirection: 'column',
                    alignItems   : 'center',
                    gap          : 0,
                  },
                  '@media (min-width: 700px)': {
                    flexDirection : 'row',
                    alignItems    : 'stretch',
                    justifyContent: 'flex-start',
                    gap           : 2,
                    // divider      : (<Divider orientation="vertical" flexItem />)
                  },
                }}  
              >
                <Stack
                  sx = {{
                    '@media (min-width: 0px)'  : {
                      flexDirection: 'column',
                      alignItems   : 'center',
                      width        : '100%',
                    },
                    '@media (min-width: 700px)': {
                      flexDirection: 'column',
                      alignItems   : 'center',
                      width        : '50%',
                    },
                  }}  
                >
                  <Controller
                    name    = "distributor_uid"
                    control = {control}
                    rules   = {{ 
                      required: {
                        value  : true,
                        message: "Distributor field is required"
                      },
                    }}
                    render  = { ({ 
                        field     : { onChange, value },
                        fieldState: { error },
                        formState,
                      }) => (
                        <Autocomplete
                          fullWidth
                          value                = {value}
                          id                   = "controllable-states-demo"
                          options              = {distributorOptions}
                          disabled             = {true}
                          sx                   = {{mb:1}}
                          onChange             = {(event: any, value: any) => { onChange(value) }}
                          isOptionEqualToValue = { (option: any, value: any) =>   option.value == value.value}
                          renderInput          = {(params: any) => 
                          <TextField
                            fullWidth
                            {...params}
                            size       = "medium"
                            label      = "Distributor"
                            error      = {!!error}
                            helperText = {error ? error.message : " "}
                          />}
                        />
                      )
                    }
                  />

                  <Controller
                    name    = "no_invoice"
                    control = {control}
                    rules   = {{ 
                      required: {
                        value  : true,
                        message: "No Invoice field is required"
                      },
                    }}
                    render  = { ({ 
                        field     : { onChange, value },
                        fieldState: { error },
                        formState,
                      }) => (
                      <TextField            
                        autoComplete = 'off'
                        disabled     = {true}
                        helperText   = {error ? error.message : " "}
                        size         = "medium"
                        error        = {!!error}
                        onChange     = {onChange}
                        type         = 'string'
                        value        = {value}
                        label        = {"No Invoice"}
                        variant      = "outlined"
                        sx           = {{mb:1}}
                        fullWidth
                      />
                      )
                    }
                  />

                  <Controller
                    name    = "total_invoice"
                    control = {control}
                    rules   = {{ 
                      required: {
                        value  : true,
                        message: "Total Invoice field is required"
                      },
                      validate: val => val != 0 || "Total Invoice can not be 0",
                    }}
                    render  = { ({ 
                        field     : { onChange, value },
                        fieldState: { error },
                        formState,
                      }) => (

                      <TextField            
                        autoComplete = 'off'
                        disabled     = {true}
                        helperText   = {error ? error.message : " "}
                        size         = "medium"
                        error        = {!!error}
                        onChange     = {(event) => onChange(parseFloat(event.target.value))}
                        type         = 'string'
                        value        = {value}
                        label        = {"Total Invoice"}
                        variant      = "outlined"
                        sx           = {{mb:1}}
                        InputProps   = {{
                          // readOnly: true,
                          inputComponent: CurrencyTextFieldDecimalComponent as any,
                          startAdornment: <InputAdornment position="start">Rp</InputAdornment>,
                        }}
                        inputProps   = {{
                          style: {
                            textAlign: 'right'
                          }
                        }}
                        fullWidth
                      />
                      )
                    }
                  />

                  <Controller
                    name    = "total_pay"
                    control = {control}
                    rules   = {{ 
                      required: {
                        value  : true,
                        message: "Total Pay field is required"
                      },
                      // pattern: {
                      //   value: /^(?!0\d)\d+$/g,
                      //   message: "error"
                      // },
                      // validate: value => value != '' || 'error message'  
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
                          type         = 'string'
                          value        = {value}
                          label        = {"Total Pay"}
                          variant      = "outlined"
                          sx           = {{mb:1}}
                          onFocus      = { (event) => {
                            if(event.target.value == '0') {
                              onChange(0);
                            }
                          }}
                          onKeyDown    = {(event) => {
                            ruleDecimalOnlyWithLimit(event, onChange, getValues('total_invoice'));
                          }}
                          onChange     = {(event) => {
                            ruleDecimalOnlyWithLimit(event, onChange, getValues('total_invoice'));
                            calculateTotalFinal()
                          }}
                          InputProps   = {{
                            inputComponent: CurrencyTextFieldLimitComponent as any,
                            inputProps: {
                              limitValidation: getValues('total_invoice'),
                              style: {
                                textAlign: 'right'
                              }
                            },
                            startAdornment: <InputAdornment position="start">Rp</InputAdornment>,
                          }}
                          inputProps   = {{
                            style: {
                              textAlign: 'right'
                            }
                          }}
                          fullWidth
                        />
                        
                      )
                    }
                  />

                  <Controller
                    name    = "total_debt"
                    control = {control}
                    rules   = {{ 
                      required: {
                        value  : true,
                        message: "Total Debt field is required"
                      },
                    }}
                    render  = { ({ 
                        field     : { onChange, value },
                        fieldState: { error },
                        formState,
                      }) => (

                      <TextField            
                        autoComplete = 'off'
                        disabled     = {true}
                        helperText   = {error ? error.message : " "}
                        size         = "medium"
                        error        = {!!error}
                        onChange     = {onChange}
                        type         = 'string'
                        value        = {value}
                        label        = {"Total Remaining Invoice"}
                        variant      = "outlined"
                        sx           = {{mb:1}}
                        InputProps   = {{
                          // readOnly: true,
                          inputComponent: CurrencyTextFieldDecimalComponent as any,
                          startAdornment: <InputAdornment position="start">Rp</InputAdornment>,
                        }}
                        inputProps   = {{
                          style: {
                            textAlign: 'right'
                          }
                        }}
                        fullWidth
                      />
                      )
                    }
                  />
                </Stack>
                <Stack
                  sx = {{
                    '@media (min-width: 0px)'  : {
                      flexDirection: 'column',
                      alignItems   : 'center',
                      width        : '100%',
                    },
                    '@media (min-width: 700px)': {
                      flexDirection: 'column',
                      alignItems   : 'center',
                      width        : '50%',
                    },
                  }}  
                >
                  <Controller
                    name    = "invoice_date"
                    control = {control}
                    rules   = {{ 
                      required: {
                        value  : true,
                        message: "Invoice Date field is required"
                      },
                    }}
                    render  = { ({ 
                        field     : { onChange, value },
                        fieldState: { error },
                        formState,
                      }) => (
                        <DatePicker
                          label     = "Invoice Date"
                          disabled  = {true}
                          value     = {moment(value, 'DD/MM/YYYY')}
                          format    = 'DD/MM/YYYY'
                          onChange  = {onChange}
                          sx        = {{mb:1}}
                          slotProps = {{
                            textField: {
                              helperText: error ? error.message : " ",
                              error     : !!error,
                              fullWidth : true,
                              size      : 'medium',
                            },
                          }}
                        />
                      )
                    }
                  />
                  <Controller
                    name    = "receive_date"
                    control = {control}
                    rules   = {{ 
                      required: {
                        value  : true,
                        message: "Receive Date field is required"
                      },
                    }}
                    render  = { ({ 
                        field     : { onChange, value },
                        fieldState: { error },
                        formState,
                      }) => (
                        <DatePicker
                          label     = "Receive Date"
                          disabled  = {true}
                          value     = {moment(value, 'DD/MM/YYYY')}
                          format    = 'DD/MM/YYYY'
                          onChange  = { (event) => {
                            onChange(event);
                            assignDueDate();
                          }}
                          sx        = {{mb:1}}
                          slotProps = {{
                            textField: {
                              helperText: error ? error.message : " ",
                              error     : !!error,
                              fullWidth : true,
                              size      : 'medium',
                            },
                          }}
                        />
                      )
                    }
                  />
                  <Controller
                    name    = "due_date"
                    control = {control}
                    rules   = {{ 
                      required: {
                        value  : true,
                        message: "Due Date field is required"
                      },
                    }}
                    render  = { ({ 
                        field     : { onChange, value },
                        fieldState: { error },
                        formState,
                      }) => (
                        <DatePicker
                          label     = "Due Date"
                          disabled  = {true}
                          value     = {moment(value, 'DD/MM/YYYY')}
                          format    = 'DD/MM/YYYY'
                          onChange  = {onChange}
                          sx        = {{mb:1}}
                          slotProps = {{
                            textField: {
                              helperText: error ? error.message : " ",
                              error     : !!error,
                              fullWidth : true,
                              size      : 'medium',
                            },
                          }}
                        />
                      )
                    }
                  />

                  <Controller
                    name    = "status"
                    control = {control}
                    rules   = {{ 
                      required: {
                        value  : true,
                        message: "Status field is required"
                      },
                    }}
                    render  = { ({ 
                        field     : { onChange, value },
                        fieldState: { error },
                        formState,
                      }) => (
                        <Autocomplete
                          fullWidth
                          // readOnly             = {true}
                          value                = {value}
                          disabled             = {true}
                          id                   = "controllable-states-demo"
                          options              = {invoiceStatusOptions}
                          sx                   = {{mb:1}}
                          onChange             = {(event: any, value: any) => { onChange(value) }}
                          isOptionEqualToValue = { (option: any, value: any) =>   option.value == value.value}
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
                </Stack>
              </Stack>
            </Stack>
        </PaperComponent>

        {/* detail invoice */}
        <PaperComponent>
          <Stack
            direction = {"column"}
            gap       = {2}
            sx        = {{marginBottom: 2}}
          >
            <Box width={'100%'}>
              <Stack
                display = {"flex"}
                sx      = {{
                  '@media (min-width: 0px)'  : {
                    flexDirection: 'column',
                    alignItems   : 'center',
                    gap          : 0,
                  },
                  '@media (min-width: 700px)': {
                    flexDirection : 'row',
                    alignItems    : 'stretch',
                    justifyContent: 'flex-start',
                    gap           : 2,
                  },
                }}  
              >
                <Stack
                  sx = {{
                    '@media (min-width: 0px)'  : {
                      flexDirection: 'column',
                      alignItems   : 'center',
                      width        : '100%',
                    },
                    '@media (min-width: 700px)': {
                      flexDirection: 'column',
                      alignItems   : 'center',
                      width        : '50%',
                    },
                  }}  
                >
                  <Controller
                    name    = "drug"
                    control = {controlInvoiceDetail}
                    rules   = {{ 
                      required: {
                        value  : true,
                        message: "Drug field is required"
                      },
                    }}
                    render  = { ({ 
                        field     : { onChange, value },
                        fieldState: { error },
                        formState,
                      }) => (
                        <Autocomplete
                          fullWidth
                          value                = {value}
                          id                   = "drug-select"
                          options              = {drugOptions}
                          sx                   = {{mb:1}}
                          onChange             = {(event: any, value: any) => { 
                            onChange(value); 
                            checkDuplicate();
                          }}
                          isOptionEqualToValue = { (option: any, value: any) =>   option.value == value.value}
                          renderInput          = {(params: any) => 
                          <TextField
                            fullWidth
                            {...params}
                            size       = "medium"
                            label      = "Drug"
                            error      = {!!error}
                            helperText = {error ? error.message : " "}
                          />}
                        />
                      )
                    }
                  />

                  <Controller
                    name    = "expired_date"
                    control = {controlInvoiceDetail}
                    rules   = {{ 
                      required: {
                        value  : true,
                        message: "Expired Date field is required"
                      },
                    }}
                    render  = { ({ 
                        field     : { onChange, value },
                        fieldState: { error },
                        formState,
                      }) => (
                        <DatePicker
                          label     = "Expired Date"
                          value     = {moment(value, 'DD/MM/YYYY')}
                          format    = 'DD/MM/YYYY'
                          onChange  = {(event) => {
                            onChange(event);
                            checkDuplicate();
                          }}
                          sx        = {{mb:1}}
                          slotProps = {{
                            textField: {
                              helperText: error ? error.message : " ",
                              error     : !!error,
                              fullWidth : true,
                              size      : 'medium',
                            },
                          }}
                        />
                      )
                    }
                  />

                  <Controller
                    name    = "no_batch"
                    control = {controlInvoiceDetail}
                    rules   = {{ 
                      required: {
                        value  : true,
                        message: "No Batch field is required"
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
                          onKeyDown    = {(event) => {
                            ruleNoSpace(event, onChange);
                          }}
                          onChange     = {(event) => {
                            ruleNoSpace(event, onChange)
                            checkDuplicate();
                          }}
                          type         = 'string'
                          value        = {value}
                          label        = {"No Batch"}
                          variant      = "outlined"
                          sx           = {{mb:1}}
                          fullWidth
                        />
                      )
                    }
                  />
                  
                  <Controller
                    name    = "qty_pcs"
                    control = {controlInvoiceDetail}
                    rules   = {{ 
                      required: {
                        value  : true,
                        message: "Qty/Pcs field is required"
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
                          onKeyDown    = {(event) => {
                            ruleNumberOnly(event, onChange);
                          }}
                          onChange     = {(event) => {
                            ruleNumberOnly(event, onChange);
                          }}
                          type         = 'string'
                          value        = {value}
                          label        = {"Qty/Pcs @ Box"}
                          variant      = "outlined"
                          sx           = {{mb:1}}
                          fullWidth
                        />
                      )
                    }
                  />

                  <Controller
                    name    = "qty_box"
                    control = {controlInvoiceDetail}
                    rules   = {{ 
                      required: {
                        value  : true,
                        message: "Qty/Box field is required"
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
                          // onKeyDown    = {(event) => {
                          //   ruleNumberOnly(event, onChange);
                          // }}
                          onChange     = {(event) => {
                            ruleNumberOnly(event, onChange);
                            calculateTotalDetail()
                          }}
                          type         = 'string'
                          value        = {value}
                          label        = {"Qty/Box"}
                          variant      = "outlined"
                          sx           = {{mb:1}}
                          fullWidth
                        />
                      )
                    }
                  />
                </Stack>
                <Stack
                  sx = {{
                    '@media (min-width: 0px)'  : {
                      flexDirection: 'column',
                      alignItems   : 'center',
                      width        : '100%',
                    },
                    '@media (min-width: 700px)': {
                      flexDirection: 'column',
                      alignItems   : 'center',
                      width        : '50%',
                    },
                  }}  
                >

                  <Stack
                    display        = {"flex"}
                    flexDirection  = 'row'
                    justifyContent = 'space-between'
                    gap            = {2}
                    width          = {'100%'}
                  >
                    <Controller
                      name    = "price_box"
                      control = {controlInvoiceDetail}
                      rules   = {{ 
                        required: {
                          value  : true,
                          message: "Price/Box field is required"
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
                            onFocus      = { (event) => {
                              if(event.target.value == '0') {
                                setValueDetail('price_box','');
                              }
                            }}
                            onKeyDown    = {(event) => {
                              ruleDecimalOnly(event, onChange);
                            }}
                            onChange     = {(event) => {
                              ruleDecimalOnly(event, onChange);
                              calculateTotalDetail()
                            }}
                            InputProps   = {{
                              inputComponent: CurrencyTextFieldDecimalComponent as any,
                              startAdornment: <InputAdornment position="start">Rp</InputAdornment>,
                            }}
                            inputProps   = {{
                              style: {
                                textAlign: 'right'
                              }
                            }}
                            type         = 'string'
                            value        = {value}
                            label        = {"Price/Box"}
                            variant      = "outlined"
                            sx           = {{mb:1}}
                            fullWidth
                          />
                        )
                      }
                    />

                    <Controller
                      name    = "total_drug_price"
                      control = {controlInvoiceDetail}
                      render  = { ({ 
                          field     : { onChange, value },
                          fieldState: { error },
                          formState,
                        }) => (
                          <TextField            
                            label        = {"Total Drug Price"}
                            autoComplete = 'off'
                            disabled     = {true}
                            helperText   = {error ? error.message : " "}
                            size         = "medium"
                            error        = {!!error}
                            onChange     = {onChange}
                            type         = 'string'
                            value        = {value}
                            variant      = "outlined"
                            sx           = {{mb:1}}
                            inputProps   = {{
                              style: {
                                textAlign: 'right'
                              }
                            }}
                            InputProps   = {{
                              // readOnly      : true,
                              startAdornment: <InputAdornment position="start">Rp</InputAdornment>,
                              inputComponent: CurrencyTextFieldDecimalComponent as any,
                            }}
                            fullWidth
                          />
                        )
                      }
                    />
                  </Stack>

                  <Stack
                    display        = {"flex"}
                    flexDirection  = 'row'
                    justifyContent = 'space-between'
                    gap            = {2}
                    width          = {'100%'}
                  >
                    <Controller
                      name    = "discount"
                      control = {controlInvoiceDetail}
                      rules   = {{ 
                        required: {
                          value  : true,
                          message: "Discount field is required"
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
                            onFocus      = { (event) => {
                              if(event.target.value == '0') {
                                setValueDetail('discount','');
                              }
                            }}
                            onKeyDown    = {(event) => {
                              rulePercentOnly(event, onChange);
                            }}
                            onChange     = {(event) => {
                              rulePercentOnly(event, onChange);
                              calculateTotalDetail();
                            }}
                            type         = 'string'
                            value        = {value}
                            label        = {"Discount"}
                            variant      = "outlined"
                            sx           = {{mb:1}}
                            InputProps   = {{
                              endAdornment: <InputAdornment position="end">%</InputAdornment>,
                            }}
                            fullWidth
                          />
                        )
                      }
                    />
                    
                    <Controller
                      name    = "discount_nominal"
                      control = {controlInvoiceDetail}
                      render  = { ({ 
                          field     : { onChange, value },
                          fieldState: { error },
                          formState,
                        }) => (
                          <TextField            
                          // label        = {"Price/Box"}
                            autoComplete = 'off'
                            disabled     = {true}
                            helperText   = {error ? error.message : " "}
                            size         = "medium"
                            error        = {!!error}
                            onChange     = {onChange}
                            type         = 'string'
                            value        = {value}
                            variant      = "outlined"
                            sx           = {{mb:1}}
                            inputProps   = {{
                              style: {
                                textAlign: 'right'
                              }
                            }}
                            InputProps   = {{
                              // readOnly      : true,
                              startAdornment: <InputAdornment position="start">Rp</InputAdornment>,
                              inputComponent: CurrencyTextFieldDecimalComponent as any,
                            }}
                            fullWidth
                          />
                        )
                      }
                    />
                  </Stack>


                  <Stack
                    display        = {"flex"}
                    flexDirection  = 'row'
                    justifyContent = 'space-between'
                    gap            = {2}
                    width          = {'100%'}

                  >
                    <Box 
                      // justifyContent = {'center'}
                      // alignContent   = {"center"}
                      // alignItems     = {"center"}
                      width = {'100%'}
                      mb    = {1}
                    >
                      <Controller
                        name    = "ppn"
                        control = {controlInvoiceDetail}
                        render  = { ({ 
                            field     : { onChange, value },
                            fieldState: { error },
                            formState,
                          }) => (
                            <FormGroup
                              sx={{
                                justifyContent: 'center',
                                alignContent  : 'start',
                                alignItems    : 'center',
                                height        : '100%',
                              }}
                            >
                              <FormControlLabel
                                value          = {"PPN ("+ 11 + "%)"}
                                label          = {"PPN ("+ 11 + "%)"}
                                labelPlacement = "start"
                                onChange       = {(event) => {
                                  onChange(event);
                                  calculateTotalDetail();
                                }}
                                control        = {
                                  <Switch
                                    color    = 'primary'
                                    checked  = {value}
                                    onChange = {(event) => {
                                      onChange(event);
                                      calculateTotalDetail();
                                    }}
                                  />
                                }
                                sx={{
                                  // display      : "flex",
                                  // flexWrap     : 'wrap',
                                  // flexDirection: "row-reverse",
                                  margin: 0,
                                  pl    : 2,
                                  pb    : 2,
                                  // mb           : 2,
                                  // width        : '100%'
                                }}
                              />
                            </FormGroup>
                          )
                        }
                      />
                    </Box>
                    
                    <Controller
                      name    = "ppn_nominal"
                      control = {controlInvoiceDetail}
                      render  = { ({ 
                          field     : { onChange, value },
                          fieldState: { error },
                          formState,
                        }) => (
                          <TextField            
                          // label        = {"Price/Box"}
                            autoComplete = 'off'
                            disabled     = {true}
                            helperText   = {error ? error.message : " "}
                            size         = "medium"
                            error        = {!!error}
                            onChange     = {onChange}
                            type         = 'string'
                            value        = {value}
                            variant      = "outlined"
                            sx           = {{mb:1}}
                            inputProps   = {{
                              style: {
                                textAlign: 'right'
                              }
                            }}
                            InputProps   = {{
                              // readOnly      : true,
                              startAdornment: <InputAdornment position="start">Rp</InputAdornment>,
                              inputComponent: CurrencyTextFieldDecimalComponent as any,
                            }}
                            fullWidth
                          />
                        )
                      }
                    />
                  </Stack>

                  <Controller
                    name    = "total_price"
                    control = {controlInvoiceDetail}
                    rules   = {{ 
                      required: {
                        value  : true,
                        message: "Total Price field is required"
                      },
                    }}
                    render  = { ({ 
                        field     : { onChange, value },
                        fieldState: { error },
                        formState,
                      }) => (
                        <TextField            
                          autoComplete = 'off'
                          disabled     = {true}
                          helperText   = {error ? error.message : " "}
                          size         = "medium"
                          error        = {!!error}
                          onChange     = {onChange}
                          type         = 'string'
                          value        = {value}
                          label        = {"Total Price"}
                          variant      = "outlined"
                          InputProps   = {{
                            // readOnly: true,
                            inputComponent: CurrencyTextFieldDecimalComponent as any,
                            startAdornment: <InputAdornment position="start">Rp</InputAdornment>,
                          }}
                          inputProps   = {{
                            style: {
                              textAlign: 'right'
                            }
                          }}
                          sx           = {{mb:1}}
                          fullWidth
                        />
                      )
                    }
                  />
                </Stack>
              </Stack>


              <ButtonComponent
                fullWidth
                sx          = {{mt:1}}
                disabled    = {!isValidInvoiceDetail || !duplicateInvoiceDetail}
                buttonColor = 'shadow'
                id          = 'invoice-add-drug'
                onClick     = {handleSubmitInvoiceDetail(onAddInvoiceDetail)}
              >
                ADD DRUG
              </ButtonComponent>
            </Box>
            <Box 
              sx={{
                width     : '100%',
                minWidth  : 0,
                height    : 400,
                display   : 'grid',
                transition: 'width 0.2s ease-out',
              }}
            >
              <DataGrid        
                disableRowSelectionOnClick
                getRowId              = { (row: any) => row.unique_id }
                // rows              = {[{no: 1,  drug_uid: "1",permisson_name: "a", read: true, write: true, modify: true, delete: true, }]}
                disableColumnMenu     = {true}
                rows                  = {invoiceDetailList}
                columnVisibilityModel = {{unique_id: false, drug_uid: false, status: false}}
                columns               = {invoiceDetailColumn}
              />
            </Box>

            {/* <LoadingButtonComponent
              fullWidth
              buttonColor = 'primary'
              // type        = 'submit'
              disabled    = {!isValid || !(invoiceDetailList.length>0) || !isDirty}
              isLoading   = {isLoading}
              id          = 'invoice_create_submit'
              onClick     = {handleSubmit(onSubmit)}
              sx          = {{mt:1}}
            >
              SUBMIT
            </LoadingButtonComponent>   */}

            <ButtonComponent
              fullWidth
              buttonColor = 'shadow'
              onClick     = {handleOpenConfirmModal}
              disabled    = {!isValid || !(invoiceDetailList.length>0) || !isDirty}
              id          = 'invoice-update-submit'
              // sx        = {{mt:1}}
            >
              SUBMIT
            </ButtonComponent>
          </Stack>
        </PaperComponent>
      </LocalizationProvider>
      
      <ModalConfirmComponent
        modalId       = {'invoice-update-confirm'}
        modalOpen     = {openConfirmModal}
        modalOnClose  = {handleCloseConfirmModal}
        onConfirm     = {handleSubmit(onSubmit)}
        modalText     = {'Are you sure want to do this action?'}
        modalButton   = {'APPLY'}
        buttonLoading = {isLoading}
      />
    </>
  )

};

export default InvoiceUpdateComponent;