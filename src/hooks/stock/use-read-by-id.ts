import { useQuery } from 'react-query';

import api from '@/services';
import { SuccessResponse } from '@/types/SuccessResponse.type'
import { StockReadByIDResponse } from '@/services/stock/read_by_id';

interface useStockReadByIDProps {
  stock_uid : string,
}

export const useStockReadByID = ({ stock_uid }: useStockReadByIDProps) => {

  return useQuery({
    queryKey : ['stock-get-by-id'],
    queryFn  : (payload) => api.getStockByID(stock_uid),
    enabled  : false,
    retry    : false,
    onSuccess: async (resp: SuccessResponse<StockReadByIDResponse>) => {
      // loadData && loadData(resp.output_schema.data)
      return resp
    },
    // refetchInterval     : 1000,
    // refetchOnWindowFocus: true,
  });
}