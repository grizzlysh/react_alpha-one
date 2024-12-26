import { useQuery } from 'react-query';

import api from '@/services';
import { SuccessResponse } from '@/types/SuccessResponse.type';
import { PaginationRequest, PaginationResponse } from '@/utils/pagination';
import Stock from '@/types/Stock.type';

export const useStockRead = (data: PaginationRequest) => {
  return useQuery({
    queryKey : ['stock-get'],
    queryFn  : (payload) => api.getStock(data),
    enabled  : false,
    retry    : false,
    onSuccess: async (resp: SuccessResponse<PaginationResponse<Stock>>) => {
      return resp
    },
    // refetchInterval     : 1000,
    // refetchOnWindowFocus: true,
  });
}