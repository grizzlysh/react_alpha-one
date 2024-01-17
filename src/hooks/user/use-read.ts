import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

import api from '@/services';
import { SuccessResponse } from '@/types/SuccessResponse.type';
import { UserReadRequest, UserReadResponse } from '@/services/user/read';

export const useUserRead = (data: UserReadRequest) => {
  return useQuery({
    queryKey : ['user-get'],
    queryFn  : (payload) => api.getUser(data),
    enabled  : false,
    retry    : false,
    onSuccess: async (resp: SuccessResponse<UserReadResponse>) => {
      return resp
    },
    // refetchInterval     : 1000,
    // refetchOnWindowFocus: true,
  });
}