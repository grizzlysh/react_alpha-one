import { Checkbox, FormControl, FormControlLabel, FormHelperText } from "@mui/material";
import React from "react";

interface CheckboxProps {
  checkId     : string,
  checkLabel  : string,
  checkState  : boolean,
  helperText  : string | null | undefined,
  error       : boolean | undefined,
  handleChange: (event: any)=>void,
}

const CheckboxComponent: React.FC<CheckboxProps> = ({ checkId, checkLabel, checkState, handleChange, helperText, error, }) => {

  return (
    <FormControl
      error={error}
    >
      <FormControlLabel
        label          = {checkLabel}
        labelPlacement = "top"
        control        = {
          <Checkbox
            id       = {checkId}
            name     = {checkId}
            size     = "medium"
            checked  = {checkState}
            onChange = {handleChange}
          />
        }
      />
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  )
}

export default CheckboxComponent;