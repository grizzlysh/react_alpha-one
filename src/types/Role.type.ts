
export default interface Role{
  uid         : string,
  name        : string,
  display_name: string,
  description : string | null,
  created_at  : Date | null,
  updated_at  : Date | null,
  deleted_at  : Date | null,
  createdby   : { name: string, } | null,
  updatedby   : { name: string, } | null,
  deletedby   : { name: string, } | null,
  permission_role: {
    permissions: {
        name        : string,
        uid         : string,
        display_name: string,
    };
    write_permit : boolean,
    read_permit  : boolean,
    modify_permit: boolean,
    delete_permit: boolean,
  }[]
}

export const initRole = () => {
  return {
    uid            : '',
    name           : '',
    display_name   : '',
    description    : '',
    created_at     : null,
    updated_at     : null,
    deleted_at     : null,
    createdby      : null,
    updatedby      : null,
    deletedby      : null,
    permission_role: [],
  }
}