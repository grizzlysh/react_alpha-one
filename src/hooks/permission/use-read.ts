import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

import api from '@/services';
import { SuccessResponse } from '@/types/SuccessResponse.type';
import { PaginationRequest, PaginationResponse } from '@/utils/pagination';
import Permission from '@/types/Permission.type';

export const usePermissionRead = (data: PaginationRequest) => {
  return useQuery({
    queryKey : ['permission-get'],
    queryFn  : (payload) => api.getPermission(data),
    enabled  : false,
    retry    : false,
    onSuccess: async (resp: SuccessResponse<PaginationResponse<Permission>>) => {
      return resp
    },
    // refetchInterval     : 1000,
    // refetchOnWindowFocus: true,
  });
}