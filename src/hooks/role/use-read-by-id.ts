import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

import api from '@/services';
import { SuccessResponse } from '@/types/SuccessResponse.type';
import { RoleReadByIDResponse } from '@/services/role/read_by_id';

interface useRoleReadByIDProps {
  role_uid : string,
  // loadData?: (data: any)=>void,
}

export const useRoleReadByID = ({ role_uid }: useRoleReadByIDProps) => {

  return useQuery({
    queryKey : ['role-get-by-id'],
    queryFn  : (payload) => api.getRoleByID(role_uid),
    enabled  : false,
    retry    : false,
    onSuccess: async (resp: SuccessResponse<RoleReadByIDResponse>) => {
      // loadData && loadData(resp.output_schema.data)
      return resp
    },
    // refetchInterval     : 1000,
    // refetchOnWindowFocus: true,
  });
}