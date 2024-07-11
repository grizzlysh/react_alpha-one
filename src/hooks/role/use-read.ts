import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

import api from '@/services';
import { SuccessResponse } from '@/types/SuccessResponse.type';
import { PaginationRequest, PaginationResponse } from '@/utils/pagination';
import Role from '@/types/Role.type';

export const useRoleRead = (data: PaginationRequest) => {
  return useQuery({
    queryKey : ['role-get'],
    queryFn  : (payload) => api.getRole(data),
    enabled  : false,
    retry    : false,
    onSuccess: async (resp: SuccessResponse<PaginationResponse<Role>>) => {
      return resp
    },
    // refetchInterval     : 1000,
    // refetchOnWindowFocus: true,
  });
}