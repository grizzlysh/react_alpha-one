import { http } from '@/services/axios';
import { TYPE_DELETE_PATH } from '@/configs/constant';
import { SuccessResponse } from '@/types/SuccessResponse.type';

export interface TypeDeleteRequest {
  current_user_uid: string,
}

const map = {
  getDataFromService: (response: SuccessResponse<{}>) => {
    return response;
  }
}

const deleteType = async (payload: TypeDeleteRequest, type_uid: string) => {
  const { data } = await http.patch(TYPE_DELETE_PATH+type_uid, payload);
  return data;

}

const typeDeleteService = {
  deleteType,
};

export default typeDeleteService;