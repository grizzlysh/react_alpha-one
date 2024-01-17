import { MenuItem, TextField, OutlinedTextFieldProps as MUITextFieldProps } from "@mui/material";
import React from "react";

interface SelectProps {
  selectId    : string,
  selectLabel : string,
  selectState : string,
  handleChange: (event: any)=>void,
  helperText  : string | null | undefined,
  error         : boolean | undefined,
  options     : {
    value: string,
    label: string,
  }[],
}


const SelectComponent: React.FC<SelectProps> = ({ selectId, selectLabel, selectState, handleChange, options, helperText, error, }) => {

  return (
    <TextField
      fullWidth
      select
      autoComplete = "off"
      error        = {error}
      value        = {selectState}
      onChange     = {handleChange}
      id           = {selectId}
      name         = {selectId}
      label        = {selectLabel}
      helperText   = {helperText}
    >
      {
        options.map( (val, idx) => (
          <MenuItem key={idx} value={val.value}
            sx={{
              label: val.label
            }}
          >
            {val.label}
          </MenuItem>
        ))
      }
    </TextField>
  )
}

export default SelectComponent;