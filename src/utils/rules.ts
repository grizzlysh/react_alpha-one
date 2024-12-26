
export const ruleNoDoubleSpace = (event: any, onChange: any) => {

  let value = event.target.value;
  let regex = /^(?!.*\s{2})[\s\S]*$/g;

  if(regex.test(value)){
    onChange(value)
  }
}
export const ruleNoSpace = (event: any, onChange: any) => {

  let value = event.target.value;
  let regex = /^\S*$/g;

  if(regex.test(value)){
    onChange(value)
  }
}

export const ruleNumberOnly = (event: any, onChange: any) => {

  let value = event.target.value;
  let regex = /^(?!0\d)\d+$/g;

  if(value == '' || regex.test(value)){
    onChange(value)
  }
}

export const ruleNumberOnlyWithLimit = (event: any, onChange: any, limit: number) => {

  let value = event.target.value;
  let regex = /^(?!0\d)\d+$/g;

  if(value === '' || regex.test(value)){ 
    if(parseInt(value) >= limit){
      onChange(limit.toString())
    }
    else{
      onChange(value)
    }
  }
}

export const ruleDecimalOnly = (event: any, onChange: any) => {

  let value = event.target.value;
  let regex = /^-?\d*[.]?\d{0,2}$/g;
  // console.log("----------------------")
  // console.log(value)
  // console.log((regex.test(value)))
  if(regex.test(value)){
    onChange(value)
  }
}

export const ruleDecimalOnlyWithLimit = (event: any, onChange: any, limit: number) => {

  let value = event.target.value;
  let regex = /^-?\d*[.]?\d{0,2}$/g;

  if(value === '' || regex.test(value)){ 
    if(parseFloat(value) >= limit){
      onChange(limit.toString())
    }
    else{
      onChange(value)
    }
  }
}

export const rulePercentOnly = (event: any, onChange: any) => {

  let value = event.target.value;
  let regex = /^-?\d*[.]?\d{0,2}$/g;

  // console.log(value);
  // console.log(regex.test(value));
  if(value === '' || regex.test(value)){
    if(parseFloat(value) >= 100){
      onChange('100')
    }
    else{
      onChange(value)
    }
  }
}