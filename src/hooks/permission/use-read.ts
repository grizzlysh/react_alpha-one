import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

import api from '@/services';
import { PermissionReadRequest, PermissionReadResponse } from '@/services/permission/read';
import { SuccessResponse } from '@/types/SuccessResponse.type';

export const usePermissionRead = (data: PermissionReadRequest) => {
  return useQuery({
    queryKey : ['permission-get'],
    queryFn  : (payload) => api.getPermission(data),
    enabled  : false,
    retry    : false,
    onSuccess: async (data: SuccessResponse<PermissionReadResponse>) => {
      return data
    },
    // refetchInterval     : 1000,
    // refetchOnWindowFocus: true,
  });
}