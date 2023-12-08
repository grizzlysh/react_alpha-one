import React, { Dispatch } from "react";
import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment, MenuItem, Stack, TextField } from "@mui/material";
import VerticalMenuComponent from "../atoms/VerticalMenu.component";

interface TableFilterComponent {
  children    : React.ReactNode,
  buttonId    : string,
  modalId     : string,
  textSearch  : string,
  handleSearch: Dispatch<string>,
  onSearch    : ()=>void,
  menuArray   : { 
    handleClick: ()=>void, 
    title      : string 
  }[],
}

const TableFilterComponent: React.FC<TableFilterComponent> = ({ children, buttonId, modalId, textSearch, handleSearch, onSearch, menuArray }) => {

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleSearch(event.target.value)}

  const handleOnSearch = (event: any) => {
    if (event.key === 'Enter' || event.target.value == '') {
      onSearch();
    }
  }
  return (
    <>
      <Stack
        // direction  = {"row"}
        // spacing    = {1}
        marginY = {1}
        display = {"flex"}
        gap     = {1}
        sx      = {{
          '@media (min-width: 0px)'  : {
            flexDirection: 'column',
            alignItems   : 'flex-end'
          },
          '@media (min-width: 900px)': {
            flexDirection: 'row',
            alignItems   : 'center'
          },
        }}  
      >
        {children}
        <Stack
          direction  = {"row"}
          display    = {"flex"}
          flexGrow   = {1}
          alignItems = {"center"}
          sx         = {{ width: '100%'}}
        >
          <TextField        
            autoComplete = 'off'
            id          = "filter-search"
            placeholder = 'Search ...'
            value       = {textSearch}
            onChange    = {handleOnChange}
            onKeyUp     = {handleOnSearch}
            InputProps  = {{
              startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>,
            }}
            sx = {{ 
              mr      : 1,
              width   : '100%',
              flexGrow: 1,
            }}
          />
          <VerticalMenuComponent 
            buttonId  = {buttonId}
            modalId   = {modalId}
            menuArray = {menuArray}
          />
        </Stack>
      </Stack>
    </>
  )
}

export default TableFilterComponent;