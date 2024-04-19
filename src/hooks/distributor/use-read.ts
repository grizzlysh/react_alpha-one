import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

import api from '@/services';
import { SuccessResponse } from '@/types/SuccessResponse.type';
import { DistributorReadRequest, DistributorReadResponse } from '@/services/distributor/read';

export const useDistributorRead = (data: DistributorReadRequest) => {
  return useQuery({
    queryKey : ['distributor-get'],
    queryFn  : (payload) => api.getDistributor(data),
    enabled  : false,
    retry    : false,
    onSuccess: async (resp: SuccessResponse<DistributorReadResponse>) => {
      return resp
    },
    // refetchInterval     : 1000,
    // refetchOnWindowFocus: true,
  });
}