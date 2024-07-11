import { http } from '@/services/axios';
import { INVOICE_UPDATE_PATH } from '@/configs/constant';
import { SuccessResponse } from '@/types/SuccessResponse.type';
import { DdlOptions } from '@/utils/ddlOption';

export interface InvoiceDetailUpdateInput {
  drug            : DdlOptions | null,
  no_batch        : string,
  expired_date    : string,
  qty_pcs         : number,
  qty_box         : number,
  price_box       : number,
  total_price     : number,
  discount        : number,
  discount_nominal: number,
  ppn             : number,
  ppn_nominal     : number,
}

export interface InvoiceUpdateRequest {
  no_invoice      : string,
  invoice_date    : string,
  receive_date    : string,
  total_invoice   : number,
  count_item      : number,
  due_date        : string,
  status          : string,
  total_pay       : number,
  distributor_uid : string,
  detail_invoices : string,
  current_user_uid: string,
}


const map = {
  getDataFromService: (response: SuccessResponse<{}>) => {
    return response;
  }
}

const updateInvoice = async (payload: InvoiceUpdateRequest, invoice_uid: string) => {
  const { data } = await http.put(INVOICE_UPDATE_PATH+invoice_uid, payload);
  return data;

}

const invoiceUpdateService = {
  updateInvoice,
};

export default invoiceUpdateService;