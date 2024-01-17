import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

import api from '@/services';
import { SuccessResponse } from '@/types/SuccessResponse.type';
import { CategoryReadRequest, CategoryReadResponse } from '@/services/category/read';

export const useCategoryRead = (data: CategoryReadRequest) => {
  return useQuery({
    queryKey : ['category-get'],
    queryFn  : (payload) => api.getCategory(data),
    enabled  : false,
    retry    : false,
    onSuccess: async (resp: SuccessResponse<CategoryReadResponse>) => {
      return resp
    },
    // refetchInterval     : 1000,
    // refetchOnWindowFocus: true,
  });
}