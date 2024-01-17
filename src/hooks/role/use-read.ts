import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

import api from '@/services';
import { SuccessResponse } from '@/types/SuccessResponse.type';
import { RoleReadRequest, RoleReadResponse } from '@/services/role/read';

export const useRoleRead = (data: RoleReadRequest) => {
  return useQuery({
    queryKey : ['role-get'],
    queryFn  : (payload) => api.getRole(data),
    enabled  : false,
    retry    : false,
    onSuccess: async (resp: SuccessResponse<RoleReadResponse>) => {
      return resp
    },
    // refetchInterval     : 1000,
    // refetchOnWindowFocus: true,
  });
}