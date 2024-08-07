import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

import api from '@/services';
import { SuccessResponse } from '@/types/SuccessResponse.type';
import { ShapeReadByIDResponse } from '@/services/shape/read_by_id';

interface useShapeReadByIDProps {
  shape_uid: string,
}

export const useShapeReadByID = ({ shape_uid }: useShapeReadByIDProps) => {
  return useQuery({
    queryKey : ['shape-get-by-id'],
    queryFn  : (payload) => api.getShapeByID(shape_uid),
    enabled  : false,
    retry    : false,
    onSuccess: async (resp: SuccessResponse<ShapeReadByIDResponse>) => {
      return resp
    },
    // refetchInterval     : 1000,
    // refetchOnWindowFocus: true,
  });
}