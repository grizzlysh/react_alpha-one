import { http } from '@/services/axios';
import { TYPE_UPDATE_PATH } from '@/configs/constant';
import { SuccessResponse } from '@/types/SuccessResponse.type';

export interface TypeUpdateRequest {
  name            : string,
  current_user_uid: string,
}


const map = {
  getDataFromService: (response: SuccessResponse<{}>) => {
    return response;
  }
}

const updateType = async (payload: TypeUpdateRequest, type_uid: string) => {
  const { data } = await http.put(TYPE_UPDATE_PATH+type_uid, payload);
  return data;

}

const typeUpdateService = {
  updateType,
};

export default typeUpdateService;