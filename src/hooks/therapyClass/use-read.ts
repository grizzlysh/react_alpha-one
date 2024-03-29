import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

import api from '@/services';
import { SuccessResponse } from '@/types/SuccessResponse.type';
import { TherapyClassReadRequest, TherapyClassReadResponse } from '@/services/therapyClass/read';

export const useTherapyClassRead = (data: TherapyClassReadRequest) => {
  return useQuery({
    queryKey : ['therapyclass-get'],
    queryFn  : (payload) => api.getTherapyClass(data),
    enabled  : false,
    retry    : false,
    onSuccess: async (resp: SuccessResponse<TherapyClassReadResponse  >) => {
      return resp
    },
    // refetchInterval     : 1000,
    // refetchOnWindowFocus: true,
  });
}