import { http } from '@/services/axios';
import { INVOICE_READ_PATH } from '@/configs/constant';
import { SuccessResponse } from '@/types/SuccessResponse.type';
import { PaginationRequest, PaginationResponse } from '@/utils/pagination';
import Invoice from '@/types/Invoice.type';

const map = {
  getDataFromService: (response: SuccessResponse<PaginationResponse<Invoice>>) => {
    return response;
  }
}

const getInvoice = async (payload: PaginationRequest) => {

  const { data } = await http.get(INVOICE_READ_PATH, {
    params: {
      page : payload.page,
      size : payload.size,
      cond : payload.cond,
      sort : payload.sort,
      field: payload.field,
    }
  });
  return data;

}

const invoiceReadService = {
  getInvoice,
};

export default invoiceReadService;