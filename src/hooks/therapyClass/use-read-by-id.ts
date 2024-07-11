import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

import api from '@/services';
import { SuccessResponse } from '@/types/SuccessResponse.type';
import { ShapeReadByIDResponse } from '@/services/shape/read_by_id';
import { TherapyClassReadByIDResponse } from '@/services/therapyClass/read_by_id';

interface useTherapyClassReadByIDProps {
  therapy_class_uid: string,
}

export const useTherapyClassReadByID = ({ therapy_class_uid }: useTherapyClassReadByIDProps) => {
  return useQuery({
    queryKey : ['therapyclass-get-by-id'],
    queryFn  : (payload) => api.getTherapyClassByID(therapy_class_uid),
    enabled  : false,
    retry    : false,
    onSuccess: async (resp: SuccessResponse<TherapyClassReadByIDResponse>) => {
      return resp
    },
    // refetchInterval     : 1000,
    // refetchOnWindowFocus: true,
  });
}