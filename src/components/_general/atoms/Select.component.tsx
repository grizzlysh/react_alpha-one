import { MenuItem, TextField, OutlinedTextFieldProps as MUITextFieldProps } from "@mui/material";
import React from "react";

interface SelectProps {
  selectId   : string,
  selectLabel: string,
  options    : {
    value: string,
    label: string,
  }[],
}


const SelectComponent: React.FC<SelectProps> = ({ selectId, selectLabel, options }) => {

  return (
    <TextField
      select
      id    = {selectId}
      label = {selectLabel}
      sx    = {{
        '@media (min-width: 900px)': {        
          maxWidth: '180px'
        },
        '@media (min-width: 0px)'  : {
          width: '100%'
        }
      }}
    >
      {
        options.map( (val, idx) => (
          <MenuItem key={idx} value={val.value}>
            {val.label}
          </MenuItem>
        ))
      }
    </TextField>
  )
}

export default SelectComponent;