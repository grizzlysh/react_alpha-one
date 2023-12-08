import { http } from '@/services/axios';
import { PERMISSION_DELETE_PATH } from '@/configs/constant';
import { SuccessResponse } from '@/types/SuccessResponse.type';
import PermissionData from '@/types/PermissionData.type';

export interface PermissionDeleteRequest {
  current_user_uid: string,
}

const map = {
  getDataFromService: (response: SuccessResponse<{}>) => {
    return response;
  }
}

const deletePermission = async (payload: PermissionDeleteRequest, permission_id: string) => {

  const { data } = await http.post(PERMISSION_DELETE_PATH+permission_id, payload);
  return data;

}

const permissionDeleteService = {
  deletePermission,
};

export default permissionDeleteService;