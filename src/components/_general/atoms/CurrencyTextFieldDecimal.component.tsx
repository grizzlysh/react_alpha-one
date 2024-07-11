import React, { ForwardRefRenderFunction } from 'react';
import { NumericFormat } from 'react-number-format';

const CurrencyTextFieldDecimalComponent: React.ForwardRefRenderFunction<HTMLInputElement>= (props: any, ref: any) => {
  const { inputRef, onChange, limitValidation, ...other } = props;

  return (
    <NumericFormat
      {...other}
      // prefix            = {'Rp'}
      thousandSeparator = {true}
      allowNegative     = {false}
      allowLeadingZeros = {false}
      getInputRef       = {inputRef}
      decimalScale      = {2}
      // isAllowed         = {(values) => {
      //   // console.log("XXXXXXXXXXXXXXXXXXX")
      //   // console.log(REGEX_DECIMAL_ONLY.test(values.value) )
      //   // console.log(values.value)
      //   // return true;
      //   return REGEX_DECIMAL_ONLY.test(values.value) || values.value == ""
      // }}
      onValueChange     = {(values) => 
      {
        onChange({
          target: {
            value: values.value,
          },
        });
      }}
    />
  );

}

export default React.forwardRef(CurrencyTextFieldDecimalComponent);
