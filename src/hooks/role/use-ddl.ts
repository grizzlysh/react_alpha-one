import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

import api from '@/services';
import { SuccessResponse } from '@/types/SuccessResponse.type';
import { DdlResponse } from '@/utils/ddlOption';

export const useRoleDdl = () => {
  return useQuery({
    queryKey : ['role-ddl'],
    queryFn  : (payload) => api.getRoleDdl(),
    enabled  : false,
    retry    : false,
    onSuccess: async (resp: SuccessResponse<DdlResponse>) => {
      return resp
    },
    // refetchInterval     : 1000,
    // refetchOnWindowFocus: true,
  });
}