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

const updatePermission = async (payload: PermissionUpdateRequest, permission_id: string) => {
  
  const { data } = await http.post(PERMISSION_UPDATE_PATH+permission_id, payload);
  return data;

}

const permissionUpdateService = {
  updatePermission,
};

export default permissionUpdateService;