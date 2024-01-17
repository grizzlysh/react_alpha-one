import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

import api from '@/services';
import { SuccessResponse } from '@/types/SuccessResponse.type';
import { ShapeReadRequest, ShapeReadResponse } from '@/services/shape/read';

export const useShapeRead = (data: ShapeReadRequest) => {
  return useQuery({
    queryKey : ['shape-get'],
    queryFn  : (payload) => api.getShape(data),
    enabled  : false,
    retry    : false,
    onSuccess: async (resp: SuccessResponse<ShapeReadResponse>) => {
      return resp
    },
    // refetchInterval     : 1000,
    // refetchOnWindowFocus: true,
  });
}