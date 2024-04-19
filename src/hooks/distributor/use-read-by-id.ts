import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

import api from '@/services';
import { SuccessResponse } from '@/types/SuccessResponse.type';
import { DistributorReadByIDResponse } from '@/services/distributor/read_by_id';

interface useDistributorReadByIDProps {
  distributor_uid: string,
  loadData    : (data: any)=>void,
}

export const useDistributorReadByID = ({ distributor_uid, loadData }: useDistributorReadByIDProps) => {
  return useQuery({
    queryKey : ['distributor-get-by-id'],
    queryFn  : (payload) => api.getDistributorByID(distributor_uid),
    enabled  : false,
    retry    : false,
    onSuccess: async (resp: SuccessResponse<DistributorReadByIDResponse>) => {
      loadData(resp.output_schema.data)
      return resp
    },
    // refetchInterval     : 1000,
    // refetchOnWindowFocus: true,
  });
}