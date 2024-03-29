import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

import api from '@/services';
import { SuccessResponse } from '@/types/SuccessResponse.type';
import { ShapeReadByIDResponse } from '@/services/shape/read_by_id';
import { TherapyClassReadByIDResponse } from '@/services/therapyClass/read_by_id';

interface useTherapyClassReadByIDProps {
  therapy_class_uid: string,
  loadData         : (data: any)=>void,
}

export const useTherapyClassReadByID = ({ therapy_class_uid, loadData }: useTherapyClassReadByIDProps) => {
  return useQuery({
    queryKey : ['therapyclass-get-by-id'],
    queryFn  : (payload) => api.getTherapyClassByID(therapy_class_uid),
    enabled  : false,
    retry    : false,
    onSuccess: async (resp: SuccessResponse<TherapyClassReadByIDResponse>) => {
      loadData(resp.output_schema.data)
      return resp
    },
    // refetchInterval     : 1000,
    // refetchOnWindowFocus: true,
  });
}