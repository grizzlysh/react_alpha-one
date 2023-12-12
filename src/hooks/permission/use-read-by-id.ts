import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

import api from '@/services';
import { SuccessResponse } from '@/types/SuccessResponse.type';
import { PermissionReadByIDResponse } from '@/services/permission/read_by_id';

interface usePermissionReadByIDProps {
  permission_id: string,
  loadData     : (data: any)=>void,
}

export const usePermissionReadByID = ({ permission_id, loadData }: usePermissionReadByIDProps) => {
  return useQuery({
    queryKey : ['permission-get-by-id'],
    queryFn  : (payload) => api.getPermissionByID(permission_id),
    enabled  : false,
    retry    : false,
    onSuccess: async (resp: SuccessResponse<PermissionReadByIDResponse>) => {
      loadData(resp.output_schema.data)
      return resp
    },
    // refetchInterval     : 1000,
    // refetchOnWindowFocus: true,
  });
}