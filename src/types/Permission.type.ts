
export default interface Permission{
  uid         : string,
  name        : string,
  display_name: string,
  description : string | null | undefined,
  created_at  : Date | null,
  updated_at  : Date | null,
  deleted_at  : Date | null,
  createdby   : { name: string, } | null,
  updatedby   : { name: string, } | null,
  deletedby   : { name: string, } | null,
}

export const initPermission = () => {
  return {
    uid         : '',
    name        : '',
    display_name: '',
    description : '',
    created_at  : null,
    updated_at  : null,
    deleted_at  : null,
    createdby   : null,
    updatedby   : null,
    deletedby   : null,
  }
}