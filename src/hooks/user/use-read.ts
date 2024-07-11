import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

import api from '@/services';
import { SuccessResponse } from '@/types/SuccessResponse.type';
import { PaginationRequest, PaginationResponse } from '@/utils/pagination';
import User from '@/types/User.type';

export const useUserRead = (data: PaginationRequest) => {
  return useQuery({
    queryKey : ['user-get'],
    queryFn  : (payload) => api.getUser(data),
    enabled  : false,
    retry    : false,
    onSuccess: async (resp: SuccessResponse<PaginationResponse<User>>) => {
      return resp
    },
    // refetchInterval     : 1000,
    // refetchOnWindowFocus: true,
  });
}