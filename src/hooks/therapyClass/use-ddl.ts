import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

import api from '@/services';
import { SuccessResponse } from '@/types/SuccessResponse.type';
import { TherapyClassDdlResponse } from '@/services/therapyClass/ddl';

export const useTherapyClassDdl = () => {
  return useQuery({
    queryKey : ['therapyclass-ddl'],
    queryFn  : (payload) => api.getTherapyClassDdl(),
    enabled  : false,
    retry    : false,
    onSuccess: async (resp: SuccessResponse<TherapyClassDdlResponse>) => {
      return resp
    },
    // refetchInterval     : 1000,
    // refetchOnWindowFocus: true,
  });
}