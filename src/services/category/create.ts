import { http } from '@/services/axios';
import { CATEGORY_CREATE_PATH } from '@/configs/constant';
import { SuccessResponse } from '@/types/SuccessResponse.type';

export interface CategoryCreateRequest {
  name            : string,
  current_user_uid: string,
}

const map = {
  getDataFromService: (response: SuccessResponse<{}>) => {
    return response;
  }
}

const createCategory = async (payload: CategoryCreateRequest) => {

  const { data } = await http.post(CATEGORY_CREATE_PATH, payload);
  return data;

}

const categoryCreateService = {
  createCategory,
};

export default categoryCreateService;