import React, { Dispatch, SetStateAction } from 'react';

import { DataGrid, GridColDef, GridRenderCellParams, GridRowsProp, GridSortModel } from '@mui/x-data-grid';
import { Box, Skeleton } from '@mui/material';
import { styled } from '@mui/material/styles';
import theme from '@/utils/theme';

const TableSkeletonComponent: React.FC = () => {

  const columnData = [
    { field: 'uid', headerName: 'ID', type : 'string', flex : 0.3, filterble: false,},
    { field: 'no', headerName: '', type: 'number', flex: 0.1, renderCell: (params: GridRenderCellParams) => [ <Skeleton key={params.row+1} variant="text" sx={{ fontSize: '1rem', width: '100%' }}/> ]},
    { field: 'display_name', headerName: '', type: 'string', minWidth:100, flex: 0.75, renderCell: (params: GridRenderCellParams) => [ <Skeleton key={params.row+2} variant="text" sx={{ fontSize: '1rem', width: '100%' }}/> ]},
    // { field: 'description', headerName: 'Description', type: 'string', minWidth:100, flex: 0.5, renderCell: (params: GridRenderCellParams) => [ <Skeleton key={params.row+3} variant="text" sx={{ fontSize: '1rem', width: '100%' }}/> ]},
    { field: 'action', type: 'actions', width:50, renderCell: (params: GridRenderCellParams) => [ <Skeleton key={params.row+4} variant="text" sx={{ fontSize: '1rem', width: '100%' }}/> ]},
  ];

  const rowData = [
    {uid:1, no: '', name: '', display_name: '',},
    {uid:2, no: '', name: '', display_name: '',},
    {uid:3, no: '', name: '', display_name: '',},
    {uid:4, no: '', name: '', display_name: '',},
    {uid:5, no: '', name: '', display_name: '',},
  ]

  return (
    <Box sx={{
      width                       : '100%',
      minWidth                    : 0,
      height                      : 400,
      display                     : 'grid',
      transition                  : 'width 0.2s ease-out',
      // '& .super-app-theme--header': {
      //   backgroundColor: theme.palette.primary.light,
      // },
    }}>
      <DataGrid
        disableRowSelectionOnClick
        getRowId              = { (row: any) => row.uid }
        rows                  = {rowData}
        columns               = {columnData}
        scrollbarSize         = {5}
        disableColumnMenu     = {true}
        columnVisibilityModel = {{ uid: false }}
        // initialState          = {{
        //   pagination: {
        //     paginationModel: {
        //       pageSize: 5,
        //     },
        //   },
        // }}
        // sortingMode             = "server"
        // onSortModelChange       = {handleSortModelChange}
        // loading                 = {isLoading}
        // pagination              = {true}
        // paginationModel         = {pageInfo}
        // pageSizeOptions         = {[5,10,15]}
        // rowCount                = {rowCountState}
        // paginationMode          = "client"
        // onPaginationModelChange = {handlePageInfo}
        sx                      = {{ 
          overflowX: 'scroll',
        }}
      />
    </Box>
  )
}

export default TableSkeletonComponent