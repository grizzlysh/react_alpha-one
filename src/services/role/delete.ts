import { http } from '@/services/axios';
import { PERMISSION_DELETE_PATH, ROLE_DELETE_PATH } from '@/configs/constant';
import { SuccessResponse } from '@/types/SuccessResponse.type';

export interface RoleDeleteRequest {
  current_user_uid: string,
}

const map = {
  getDataFromService: (response: SuccessResponse<{}>) => {
    return response;
  }
}

const deleteRole = async (payload: RoleDeleteRequest, role_uid: string) => {
  const { data } = await http.patch(ROLE_DELETE_PATH+role_uid, payload);
  return data;

}

const roleDeleteService = {
  deleteRole,
};

export default roleDeleteService;