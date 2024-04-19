import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

import api from '@/services';
import { SuccessResponse } from '@/types/SuccessResponse.type';
import { DrugReadRequest, DrugReadResponse } from '@/services/drug/read';

export const useDrugRead = (data: DrugReadRequest) => {
  return useQuery({
    queryKey : ['drug-get'],
    queryFn  : (payload) => api.getDrug(data),
    enabled  : false,
    retry    : false,
    onSuccess: async (resp: SuccessResponse<DrugReadResponse>) => {
      return resp
    },
    // refetchInterval     : 1000,
    // refetchOnWindowFocus: true,
  });
}