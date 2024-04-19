import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

import api from '@/services';
import { SuccessResponse } from '@/types/SuccessResponse.type';
import { DrugDdlResponse } from '@/services/drug/ddl';

export const useDrugDdl = () => {
  return useQuery({
    queryKey : ['drug-ddl'],
    queryFn  : (payload) => api.getDrugDdl(),
    enabled  : false,
    retry    : false,
    onSuccess: async (resp: SuccessResponse<DrugDdlResponse>) => {
      return resp
    },
    // refetchInterval     : 1000,
    // refetchOnWindowFocus: true,
  });
}