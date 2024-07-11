import { http } from '@/services/axios';
import { INVOICE_DELETE_PATH } from '@/configs/constant';
import { SuccessResponse } from '@/types/SuccessResponse.type';

export interface InvoiceDeleteRequest {
  current_user_uid: string,
}

const map = {
  getDataFromService: (response: SuccessResponse<{}>) => {
    return response;
  }
}

const deleteInvoice = async (payload: InvoiceDeleteRequest, invoice_uid: string) => {
  const { data } = await http.patch(INVOICE_DELETE_PATH+invoice_uid, payload);
  return data;

}

const invoiceDeleteService = {
  deleteInvoice,
};

export default invoiceDeleteService;