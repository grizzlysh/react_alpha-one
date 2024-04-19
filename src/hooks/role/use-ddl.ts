import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

import api from '@/services';
import { SuccessResponse } from '@/types/SuccessResponse.type';
import { TherapyClassDdlResponse } from '@/services/therapyClass/ddl';
import { RoleDdlResponse } from '@/services/role/ddl';

export const useRoleDdl = () => {
  return useQuery({
    queryKey : ['role-ddl'],
    queryFn  : (payload) => api.getRoleDdl(),
    enabled  : false,
    retry    : false,
    onSuccess: async (resp: SuccessResponse<RoleDdlResponse>) => {
      return resp
    },
    // refetchInterval     : 1000,
    // refetchOnWindowFocus: true,
  });
}