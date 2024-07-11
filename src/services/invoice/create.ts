import { http } from '@/services/axios';
import { INVOICE_CREATE_PATH } from '@/configs/constant';
import { SuccessResponse } from '@/types/SuccessResponse.type';
import { DdlOptions } from '@/utils/ddlOption';

export interface InvoiceDetailCreateInput {
  drug            : DdlOptions | null,
  no_batch        : string,
  expired_date    : string,
  qty_pcs         : string | null,
  qty_box         : string | null,
  price_box       : string | null,
  total_price     : number | null,
  total_drug_price: number | null,
  discount        : string | null,
  discount_nominal: number | null,
  ppn             : boolean,
  ppn_nominal     : number | null,
}

export interface InvoiceCreateInput {
  no_invoice      : string,
  invoice_date    : string,
  receive_date    : string,
  total_invoice   : number,
  count_item      : number,
  due_date        : string,
  status          : {value: string, label: string} | null,
  total_pay       : string | null,
  total_debt      : number,
  distributor_uid : {value: string, label: string} | null,
  detail_invoices : string,
  current_user_uid: string,
}
export interface InvoiceDetailCreateRequest {
  drug_uid        : string,
  drug_name       : string,
  no_batch        : string,
  expired_date    : string,
  qty_pcs         : number,
  qty_box         : number,
  price_box       : number,
  total_price     : number,
  total_drug_price: number,
  discount        : number,
  discount_nominal: number,
  ppn             : number,
  ppn_nominal     : number,
}
export interface InvoiceCreateRequest {
  no_invoice      : string,
  invoice_date    : string,
  receive_date    : string,
  total_invoice   : number,
  count_item      : number,
  due_date        : string,
  status          : string,
  total_pay       : number,
  distributor_uid : string | null,
  detail_invoices : string,
  current_user_uid: string,
}

const map = {
  getDataFromService: (response: SuccessResponse<{}>) => {
    return response;
  }
}

const createInvoice = async (payload: InvoiceCreateRequest) => {

  const { data } = await http.post(INVOICE_CREATE_PATH, payload);
  return data;

}

const invoiceCreateService = {
  createInvoice,
};

export default invoiceCreateService;