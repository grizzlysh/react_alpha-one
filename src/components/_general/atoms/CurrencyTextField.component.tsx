import React, { ForwardRefRenderFunction } from 'react';
import { NumericFormat } from 'react-number-format';

const CurrencyTextFieldComponent: React.ForwardRefRenderFunction<HTMLInputElement>= (props: any, ref: any) => {
  const { inputRef, onChange, limitValidation, ...other } = props;

  return (
    <NumericFormat
      {...other}
      // prefix            = {'Rp'}
      thousandSeparator = {true}
      allowNegative     = {false}
      getInputRef       = {inputRef}
      allowLeadingZeros = {false}
      isAllowed         = {(values) => {
        let regex = /^(?!0\d)\d+$/;
        return regex.test(values.value) || values.value == ""
      }}
      onValueChange     = {(values) => 
      {
        // let regex = /^(?!0\d)\d+$/g;

        // if(values.value == "" || regex.test(values.value)) {
        //   if(regex.test(values.value)) {
            onChange({
              target: {
                value: values.value,
              },
            });
        //   }
        // }
      }}
    />
  );

}

export default React.forwardRef(CurrencyTextFieldComponent);
