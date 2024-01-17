import { http } from '@/services/axios';
import { CATEGORY_DELETE_PATH } from '@/configs/constant';
import { SuccessResponse } from '@/types/SuccessResponse.type';

export interface CategoryDeleteRequest {
  current_user_uid: string,
}

const map = {
  getDataFromService: (response: SuccessResponse<{}>) => {
    return response;
  }
}

const deleteCategory = async (payload: CategoryDeleteRequest, category_uid: string) => {
  const { data } = await http.patch(CATEGORY_DELETE_PATH+category_uid, payload);
  return data;

}

const categoryDeleteService = {
  deleteCategory,
};

export default categoryDeleteService;