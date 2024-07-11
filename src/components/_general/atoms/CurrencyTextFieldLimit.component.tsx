import React from 'react';
import { NumericFormat } from 'react-number-format';

const CurrencyTextFieldLimitComponent: React.ForwardRefRenderFunction<HTMLInputElement> = (props: any, ref: any) => {
  const { inputRef, onChange, limitValidation, ...other } = props;

  return (
    <NumericFormat
      {...other}
      // prefix            = {'Rp'}
      thousandSeparator = {true}
      allowNegative     = {false}
      getInputRef       = {inputRef}
      isAllowed         = {(values) => {
        let regex = /^-?\d*[.]?\d{0,2}$/g;

        if(values.value === "" || regex.test(values.value)) {
          const floatValue = parseFloat(values.value || '0');

          if(limitValidation != (undefined || null)) {
            if(floatValue > limitValidation) {
              onChange({
                target: {
                  value: limitValidation
                }
              })
              return floatValue <= limitValidation
            }
            else{
              return floatValue <= limitValidation;
            }
          }
          else {
            return floatValue;
          }
        }
      }}
      onValueChange     = {(values) => 
      {

        // let regex = /^(?!0\d)\d+$/g;

        // if(values.value === '' || regex.test(values.value)){
        //   if(parseFloat(values.value) >= limitValidation){
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

export default React.forwardRef(CurrencyTextFieldLimitComponent);
