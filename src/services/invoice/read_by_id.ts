import { http } from '@/services/axios';
import { INVOICE_READ_BYID_PATH } from '@/configs/constant';
import { SuccessResponse } from '@/types/SuccessResponse.type';
import Invoice from '@/types/Invoice.type';

export interface InvoiceReadByIDResponse {
  data : Invoice,
}

const map = {
  getDataFromService: (response: SuccessResponse<InvoiceReadByIDResponse>) => {
    return response;
  }
}

const getInvoiceByID = async (invoice_uid: string) => {

  const { data } = await http.get(INVOICE_READ_BYID_PATH+invoice_uid);
  return data;

}

const invoiceReadByIDService = {
  getInvoiceByID,
};

export default invoiceReadByIDService;