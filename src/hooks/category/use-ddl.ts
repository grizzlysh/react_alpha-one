import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

import api from '@/services';
import { SuccessResponse } from '@/types/SuccessResponse.type';
import { CategoryDdlResponse } from '@/services/category/ddl';

export const useCategoryDdl = () => {
  return useQuery({
    queryKey : ['category-ddl'],
    queryFn  : (payload) => api.getCategoryDdl(),
    enabled  : false,
    retry    : false,
    onSuccess: async (resp: SuccessResponse<CategoryDdlResponse>) => {
      return resp
    },
    // refetchInterval     : 1000,
    // refetchOnWindowFocus: true,
  });
}