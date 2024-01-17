import { http } from '@/services/axios';
import { TYPE_CREATE_PATH } from '@/configs/constant';
import { SuccessResponse } from '@/types/SuccessResponse.type';

export interface TypeCreateRequest {
  name            : string,
  current_user_uid: string,
}

const map = {
  getDataFromService: (response: SuccessResponse<{}>) => {
    return response;
  }
}

const createType = async (payload: TypeCreateRequest) => {

  const { data } = await http.post(TYPE_CREATE_PATH, payload);
  return data;

}

const typeCreateService = {
  createType,
};

export default typeCreateService;