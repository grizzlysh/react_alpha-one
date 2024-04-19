import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

import api from '@/services';
import { SuccessResponse } from '@/types/SuccessResponse.type';
import { DistributorDdlResponse } from '@/services/distributor/ddl';

export const useDistributorDdl = () => {
  return useQuery({
    queryKey : ['distributor-ddl'],
    queryFn  : (payload) => api.getDistributorDdl(),
    enabled  : false,
    retry    : false,
    onSuccess: async (resp: SuccessResponse<DistributorDdlResponse>) => {
      return resp
    },
    // refetchInterval     : 1000,
    // refetchOnWindowFocus: true,
  });
}