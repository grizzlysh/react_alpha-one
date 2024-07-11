import { http } from '@/services/axios';
import { INVOICE_DDL_PATH } from '@/configs/constant';
import { SuccessResponse } from '@/types/SuccessResponse.type';
import { DdlResponse } from '@/utils/ddlOption';

const map = {
  getDataFromService: (response: SuccessResponse<DdlResponse>) => {
    return response;
  }
}

const getInvoiceDdl = async () => {

  const { data } = await http.get(INVOICE_DDL_PATH);
  return data;

}

const invoiceDdlService = {
  getInvoiceDdl,
};

export default invoiceDdlService;