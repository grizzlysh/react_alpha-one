import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

import api from '@/services';
import { SuccessResponse } from '@/types/SuccessResponse.type';
import Distributor from '@/types/Distributor.type';
import { PaginationRequest, PaginationResponse } from '@/utils/pagination';

export const useDistributorRead = (data: PaginationRequest) => {
  return useQuery({
    queryKey : ['distributor-get'],
    queryFn  : (payload) => api.getDistributor(data),
    enabled  : false,
    retry    : false,
    onSuccess: async (resp: SuccessResponse<PaginationResponse<Distributor>>) => {
      return resp
    },
    // refetchInterval     : 1000,
    // refetchOnWindowFocus: true,
  });
}