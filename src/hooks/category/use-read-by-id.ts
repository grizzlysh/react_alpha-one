import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

import api from '@/services';
import { SuccessResponse } from '@/types/SuccessResponse.type';
import { CategoryReadByIDResponse } from '@/services/category/read_by_id';

interface useCategoryReadByIDProps {
  category_uid: string,
}

export const useCategoryReadByID = ({ category_uid }: useCategoryReadByIDProps) => {
  return useQuery({
    queryKey : ['category-get-by-id'],
    queryFn  : (payload) => api.getCategoryByID(category_uid),
    enabled  : false,
    retry    : false,
    onSuccess: async (resp: SuccessResponse<CategoryReadByIDResponse>) => {
      // loadData(resp.output_schema.data)
      return resp
    },
    // refetchInterval     : 1000,
    // refetchOnWindowFocus: true,
  });
}