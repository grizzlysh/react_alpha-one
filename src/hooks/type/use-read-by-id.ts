import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

import api from '@/services';
import { SuccessResponse } from '@/types/SuccessResponse.type';
import { ShapeReadByIDResponse } from '@/services/shape/read_by_id';
import { TypeReadByIDResponse } from '@/services/type/read_by_id';

interface useTypeReadByIDProps {
  type_uid: string,
  loadData : (data: any)=>void,
}

export const useTypeReadByID = ({ type_uid, loadData }: useTypeReadByIDProps) => {
  return useQuery({
    queryKey : ['type-get-by-id'],
    queryFn  : (payload) => api.getTypeByID(type_uid),
    enabled  : false,
    retry    : false,
    onSuccess: async (resp: SuccessResponse<TypeReadByIDResponse>) => {
      loadData(resp.output_schema.data)
      return resp
    },
    // refetchInterval     : 1000,
    // refetchOnWindowFocus: true,
  });
}