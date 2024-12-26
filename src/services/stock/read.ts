import { http } from '@/services/axios';
import { STOCK_READ_PATH } from '@/configs/constant';
import { SuccessResponse } from '@/types/SuccessResponse.type';
import { PaginationRequest, PaginationResponse } from '@/utils/pagination';
import Stock from '@/types/Stock.type';


const map = {
  getDataFromService: (response: SuccessResponse<PaginationResponse<Stock>>) => {
    return response;
  }
}

const getStock = async (payload: PaginationRequest) => {

  const { data } = await http.get(STOCK_READ_PATH, {
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

const stockReadService = {
  getStock,
};

export default stockReadService;