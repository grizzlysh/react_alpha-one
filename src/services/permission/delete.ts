import { http } from '@/services/axios';
import { PERMISSION_DELETE_PATH } from '@/configs/constant';
import { SuccessResponse } from '@/types/SuccessResponse.type';

export interface PermissionDeleteRequest {
  current_user_uid: string,
}

const map = {
  getDataFromService: (response: SuccessResponse<{}>) => {
    return response;
  }
}

const deletePermission = async (payload: PermissionDeleteRequest, permission_uid: string) => {
  const { data } = await http.patch(PERMISSION_DELETE_PATH+permission_uid, payload);
  return data;

}

const permissionDeleteService = {
  deletePermission,
};

export default permissionDeleteService;