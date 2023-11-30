import React from 'react';

import { usePermissionGet } from '@/hooks/permission/use-read'
import PaperComponent from '../_general/atoms/Paper.component'
import TableComponent from '../_general/molecules/Table.component';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { GridActionsCellItem, GridRenderCellParams } from '@mui/x-data-grid'


const PermissionTable = () => {

  const [rowData, setRowData]           = React.useState<{}[]>([]);
  const [pageData, setPageData]         = React.useState({page: 0, pageSize: 5 });
  const [sortData, setSortData]         = React.useState([{field: 'display_name', sort : 'asc',}])
  const [rowTotal, setRowTotal]         = React.useState(0);
  const [queryOptions, setQueryOptions] = React.useState({
    field: 'display_name',
    sort : 'asc',
    page : pageData.page.toString(),
    size : pageData.pageSize.toString(),
    cond : ''
  });
  const { refetch: doGetPermission, data, isLoading: isLoadingPermission } = usePermissionGet(queryOptions);
  const [headerData, setHeaderData]                                        = React.useState([

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
        // onClick = {() => handleOpenEditModal(params.row.id)}
        showInMenu
      />,
      <GridActionsCellItem
        key     = {"delete-"+params.id}
        icon    = {<DeleteIcon />}
        label   = "Delete"
        // onClick = {() => {submitDelete({partner_id: params.row.id})}}
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
      cond : ''
    })
  }

  const getPermissionData = () => {
    doGetPermission().then(
      (resp: any) => {
        console.log(resp.status)
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
  
  React.useEffect(() => {
    handleQuery();
  }, [pageData, sortData]);


  React.useEffect( () => {
    getPermissionData()
  },[queryOptions])

  return (
    <PaperComponent>
      <TableComponent 
        rowData        = {rowData}
        columnData     = {headerData}
        loading        = {isLoadingPermission}
        pageInfo       = {pageData}
        handlePageInfo = {setPageData}
        rowTotal       = {rowTotal}
        handleSortData = {setSortData}
        columnHide     = {{ uid: false }}
      />
    </PaperComponent>
  )
}

export default PermissionTable;