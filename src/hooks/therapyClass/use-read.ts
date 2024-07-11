import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

import api from '@/services';
import { SuccessResponse } from '@/types/SuccessResponse.type';
import { PaginationRequest, PaginationResponse } from '@/utils/pagination';
import TherapyClass from '@/types/TherapyClass.type';

export const useTherapyClassRead = (data: PaginationRequest) => {
  return useQuery({
    queryKey : ['therapyclass-get'],
    queryFn  : (payload) => api.getTherapyClass(data),
    enabled  : false,
    retry    : false,
    onSuccess: async (resp: SuccessResponse<PaginationResponse<TherapyClass>>) => {
      return resp
    },
    // refetchInterval     : 1000,
    // refetchOnWindowFocus: true,
  });
}