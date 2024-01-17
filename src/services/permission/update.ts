import { http } from '@/services/axios';
import { PERMISSION_UPDATE_PATH } from '@/configs/constant';
import { SuccessResponse } from '@/types/SuccessResponse.type';

export interface PermissionUpdateRequest {
  display_name    : string,
  description     : string,
  current_user_uid: string,
}


const map = {
  getDataFromService: (response: SuccessResponse<{}>) => {
    return response;
  }
}

const updatePermission = async (payload: PermissionUpdateRequest, permission_uid: string) => {
  const { data } = await http.put(PERMISSION_UPDATE_PATH+permission_uid, payload);
  return data;

}

const permissionUpdateService = {
  updatePermission,
};

export default permissionUpdateService;