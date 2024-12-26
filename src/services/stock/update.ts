import { http } from '@/services/axios';
import { STOCK_UPDATE_PATH } from '@/configs/constant';
import { SuccessResponse } from '@/types/SuccessResponse.type';

export interface StockUpdateRequest {
  price_manual    : number,
  current_user_uid: string,
}


const map = {
  getDataFromService: (response: SuccessResponse<{}>) => {
    return response;
  }
}

const updateStock = async (payload: StockUpdateRequest, stock_uid: string) => {
  const { data } = await http.put(STOCK_UPDATE_PATH+stock_uid, payload);
  return data;

}

const stockUpdateService = {
  updateStock,
};

export default stockUpdateService;