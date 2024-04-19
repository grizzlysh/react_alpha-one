import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

import api from '@/services';
import { SuccessResponse } from '@/types/SuccessResponse.type';
import { ShapeDdlResponse } from '@/services/shape/ddl';

export const useShapeDdl = () => {
  return useQuery({
    queryKey : ['shape-ddl'],
    queryFn  : (payload) => api.getShapeDdl(),
    enabled  : false,
    retry    : false,
    onSuccess: async (resp: SuccessResponse<ShapeDdlResponse>) => {
      return resp
    },
    // refetchInterval     : 1000,
    // refetchOnWindowFocus: true,
  });
}