import { http } from '@/services/axios';
import { CATEGORY_READ_PATH } from '@/configs/constant';
import { SuccessResponse } from '@/types/SuccessResponse.type';
import Category from '@/types/Category.type';
import { PaginationRequest, PaginationResponse } from '@/utils/pagination';

const map = {
  getDataFromService: (response: SuccessResponse<PaginationResponse<Category>>) => {
    return response;
  }
}

const getCategory = async (payload: PaginationRequest) => {

  const { data } = await http.get(CATEGORY_READ_PATH, {
    params: {
      page : payload.page,
      size : payload.size,
      cond : payload.cond,
      sort : payload.sort,
      field: payload.field,
    }
  });
  return data;

}

const categoryReadService = {
  getCategory,
};

export default categoryReadService;