import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

import api from '@/services';
import { SuccessResponse } from '@/types/SuccessResponse.type';
import { PaginationRequest, PaginationResponse } from '@/utils/pagination';
import Category from '@/types/Category.type';

export const useCategoryRead = (data: PaginationRequest) => {
  return useQuery({
    queryKey : ['category-get'],
    queryFn  : (payload) => api.getCategory(data),
    enabled  : false,
    retry    : false,
    onSuccess: async (resp: SuccessResponse<PaginationResponse<Category>>) => {
      return resp
    },
    // refetchInterval     : 1000,
    // refetchOnWindowFocus: true,
  });
}