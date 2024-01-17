import { http } from '@/services/axios';
import { CATEGORY_READ_PATH } from '@/configs/constant';
import { SuccessResponse } from '@/types/SuccessResponse.type';
import Category from '@/types/Category.type';

export interface CategoryReadRequest {
  page : string,
  size : string,
  cond : string,
  sort : string,
  field: string,
}

export interface CategoryReadResponse {
  data        : Category[],
  total_data  : number,
  total_pages : number,
  current_page: number
}

const map = {
  getDataFromService: (response: SuccessResponse<CategoryReadResponse>) => {
    return response;
  }
}

const getCategory = async (payload: CategoryReadRequest) => {

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