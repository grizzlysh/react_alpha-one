export interface StockDetail {
  uid            : string,
  qty_pcs        : number,
  qty_box        : number | null,
  expired_date   : Date | null,
  no_barcode     : string,
  no_batch       : string | null,
  is_initiate    : boolean,
  detail_invoices: {
    uid : string,
    invoices: {
      uid       : string,
      no_invoice: string,
    }
  } | null,
}
export default interface Stock {
  uid  : string,
  drugs: {
    uid : string,
    name: string,
  },
  total_qty    : number,
  price        : number,
  price_buy    : number | null,
  price_manual : number,
  created_at   : Date | null,
  updated_at   : Date | null,
  deleted_at   : Date | null,
  detail_stocks: StockDetail[]
  createdby    : { name: string, } | null,
  updatedby    : { name: string, } | null,
  deletedby    : { name: string, } | null,
}


export const initStock = () => {
  return {
    uid  : '',
    drugs: {
      uid : '',
      name: '',
    },
    total_qty    : 0,
    price        : 0,
    price_buy    : null,
    price_manual : 0,
    created_at   : null,
    updated_at   : null,
    deleted_at   : null,
    createdby    : null,
    updatedby    : null,
    deletedby    : null,
    detail_stocks: [],
  }
}