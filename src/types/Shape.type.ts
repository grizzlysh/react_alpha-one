
export default interface Shape {
  uid         : string,
  name        : string,
  created_at  : Date | null,
  updated_at  : Date | null,
  deleted_at  : Date | null,
  createdby   : { name: string, } | null,
  updatedby   : { name: string, } | null,
  deletedby   : { name: string, } | null,
}

export const initShape = () => {
  return {
    uid         : '',
    name        : '',
    created_at  : null,
    updated_at  : null,
    deleted_at  : null,
    createdby   : null,
    updatedby   : null,
    deletedby   : null,
  }
}