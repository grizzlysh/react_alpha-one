import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

import api from '@/services';
import { SuccessResponse } from '@/types/SuccessResponse.type';
import { TypeReadRequest, TypeReadResponse } from '@/services/type/read';

export const useTypeRead = (data: TypeReadRequest) => {
  return useQuery({
    queryKey : ['type-get'],
    queryFn  : (payload) => api.getType(data),
    enabled  : false,
    retry    : false,
    onSuccess: async (resp: SuccessResponse<TypeReadResponse  >) => {
      return resp
    },
    // refetchInterval     : 1000,
    // refetchOnWindowFocus: true,
  });
}