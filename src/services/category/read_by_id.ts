import { http } from '@/services/axios';
import { CATEGORY_READ_BYID_PATH } from '@/configs/constant';
import { SuccessResponse } from '@/types/SuccessResponse.type';
import Category from '@/types/Category.type';

export interface CategoryReadByIDResponse {
  data: Category,
}

const map = {
  getDataFromService: (response: SuccessResponse<CategoryReadByIDResponse>) => {
    return response;
  }
}

const getCategoryByID = async (category_uid: string) => {

  const { data } = await http.get(CATEGORY_READ_BYID_PATH+category_uid);
  return data;

}

const categoryReadByIDService = {
  getCategoryByID,
};

export default categoryReadByIDService;