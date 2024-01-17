
export default interface User{
  uid              : string,
  username         : string,
  name             : string,
  sex              : string,
  email            : string,
  email_verified_at: Date | null,
  created_at       : Date | null,
  updated_at       : Date | null,
  deleted_at       : Date | null,
  createdby        : { name: string, } | null,
  updatedby        : { name: string, } | null,
  deletedby        : { name: string, } | null,
  role             : {
    uid         : string,
    name        : string,
    display_name: string,
  },
}

export const initUser = () => {
  return {
    uid              : '',
    username         : '',
    name             : '',
    sex              : '',
    email            : '',
    email_verified_at: null,
    created_at       : null,
    updated_at       : null,
    deleted_at       : null,
    createdby        : null,
    updatedby        : null,
    deletedby        : null,
    role             : {
      uid         : '',
      name        : '',
      display_name: '',
    },
  }
}