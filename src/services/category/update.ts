import { http } from '@/services/axios';
import { CATEGORY_UPDATE_PATH } from '@/configs/constant';
import { SuccessResponse } from '@/types/SuccessResponse.type';

export interface CategoryUpdateRequest {
  name            : string,
  current_user_uid: string,
}


const map = {
  getDataFromService: (response: SuccessResponse<{}>) => {
    return response;
  }
}

const updateCategory = async (payload: CategoryUpdateRequest, category_uid: string) => {
  const { data } = await http.put(CATEGORY_UPDATE_PATH+category_uid, payload);
  return data;

}

const categoryUpdateService = {
  updateCategory,
};

export default categoryUpdateService;