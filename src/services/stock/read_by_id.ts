import { http } from '@/services/axios';
import { STOCK_READ_BYID_PATH } from '@/configs/constant';
import { SuccessResponse } from '@/types/SuccessResponse.type';
import Stock from '@/types/Stock.type';

export interface StockReadByIDResponse {
  data: Stock,
}

const map = {
  getDataFromService: (response: SuccessResponse<StockReadByIDResponse>) => {
    return response;
  }
}

const getStockByID = async (stock_uid: string) => {

  const { data } = await http.get(STOCK_READ_BYID_PATH+stock_uid);
  return data;

}

const stockReadByIDService = {
  getStockByID,
};

export default stockReadByIDService;