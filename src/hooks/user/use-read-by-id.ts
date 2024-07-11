import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

import api from '@/services';
import { SuccessResponse } from '@/types/SuccessResponse.type';
import { UserReadByIDResponse } from '@/services/user/read_by_id';

interface useUserReadByIDProps {
  user_uid: string,
}

export const usePermissionReadByID = ({ user_uid }: useUserReadByIDProps) => {
  return useQuery({
    queryKey : ['user-get-by-id'],
    queryFn  : (payload) => api.getUserByID(user_uid),
    enabled  : false,
    retry    : false,
    onSuccess: async (resp: SuccessResponse<UserReadByIDResponse>) => {
      return resp
    },
    // refetchInterval     : 1000,
    // refetchOnWindowFocus: true,
  });
}