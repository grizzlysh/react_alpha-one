
export default interface Distributor {
  uid           : string,
  name          : string,
  address       : string,
  phone         : string,
  no_permit     : string,
  contact_person: string,
  status        : boolean,
  description   : string,
  created_at    : Date | null,
  updated_at    : Date | null,
  deleted_at    : Date | null,
  createdby     : { name: string, } | null,
  updatedby     : { name: string, } | null,
  deletedby     : { name: string, } | null,
}

export const initDistributor = () => {
  return {
    uid           : '',
    name          : '',
    address       : '',
    phone         : '',
    no_permit     : '',
    contact_person: '',
    status        : true,
    description   : '',
    created_at    : null,
    updated_at    : null,
    deleted_at    : null,
    createdby     : null,
    updatedby     : null,
    deletedby     : null,
  }
}