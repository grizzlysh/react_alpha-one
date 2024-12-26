export interface InvoiceDetail {
  uid             : string,
  no_batch        : string,
  expired_date    : Date | null,
  qty_pcs         : number,
  qty_box         : number,
  price_box       : number,
  total_price     : number,
  discount        : number,
  discount_nominal: number,
  ppn             : number,
  ppn_nominal     : number,
  drugs           : {
    uid : string,
    name: string,
  },
}
export default interface Invoice {
  uid          : string,
  no_invoice   : string,
  invoice_date : Date | null,
  receive_date : Date | null,
  total_invoice: number,
  count_item   : number,
  due_date     : Date | null,
  status       : string,
  total_pay    : number,
  distributors : {
    uid : string,
    name: string,
  },
  // detail_invoices: InvoiceDetail[],
  detail_invoices : InvoiceDetail[],
  transaction_invoices : {
    uid       : string,
    pay_date  : Date | null,
    total_pay : number,
  }[],
  created_at   : Date | null,
  updated_at   : Date | null,
  deleted_at   : Date | null,
  createdby    : { name: string, } | null,
  updatedby    : { name: string, } | null,
  deletedby    : { name: string, } | null,
}


export const initInvoice = () => {
  return {
    uid          : '',
    no_invoice   : '',
    invoice_date : null,
    receive_date : null,
    total_invoice: 0,
    count_item   : 0,
    due_date     : null,
    status       : '',
    total_pay    : 0,
    distributors : {
      uid : '',
      name: '',
    },
    created_at          : null,
    updated_at          : null,
    deleted_at          : null,
    createdby           : null,
    updatedby           : null,
    deletedby           : null,
    detail_invoices     : [],
    transaction_invoices: [],
  }
}