import { http } from '@/services/axios';
import { PERMISSION_CREATE_PATH } from '@/configs/constant';
import { SuccessResponse } from '@/types/SuccessResponse.type';

export interface PermissionCreateRequest {
  display_name    : string,
  description     : string,
  current_user_uid: string,
}

const map = {
  getDataFromService: (response: SuccessResponse<{}>) => {
    return response;
  }
}

const createPermission = async (payload: PermissionCreateRequest) => {

  const { data } = await http.post(PERMISSION_CREATE_PATH, payload);
  return data;

}

const permissionCreateService = {
  createPermission,
};

export default permissionCreateService;