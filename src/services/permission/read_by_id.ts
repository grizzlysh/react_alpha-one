import { http } from '@/services/axios';
import { PERMISSION_READ_BYID_PATH } from '@/configs/constant';
import { SuccessResponse } from '@/types/SuccessResponse.type';
import Permission from '@/types/Permission.type';

export interface PermissionReadByIDResponse {
  data: Permission,
}

const map = {
  getDataFromService: (response: SuccessResponse<PermissionReadByIDResponse>) => {
    return response;
  }
}

const getPermissionByID = async (permission_uid: string) => {

  const { data } = await http.get(PERMISSION_READ_BYID_PATH+permission_uid);
  return data;

}

const permissionReadByIDService = {
  getPermissionByID,
};

export default permissionReadByIDService;