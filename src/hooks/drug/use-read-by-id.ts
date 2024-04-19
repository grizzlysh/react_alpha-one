import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

import api from '@/services';
import { SuccessResponse } from '@/types/SuccessResponse.type';
import { DrugReadByIDResponse } from '@/services/drug/read_by_id';

interface useDrugReadByIDProps {
  drug_uid: string,
  loadData: (data: any)=>void,
}

export const useDrugReadByID = ({ drug_uid, loadData }: useDrugReadByIDProps) => {
  return useQuery({
    queryKey : ['drug-get-by-id'],
    queryFn  : (payload) => api.getDrugByID(drug_uid),
    enabled  : false,
    retry    : false,
    onSuccess: async (resp: SuccessResponse<DrugReadByIDResponse>) => {
      loadData(resp.output_schema.data)
      return resp
    },
    // refetchInterval     : 1000,
    // refetchOnWindowFocus: true,
  });
}