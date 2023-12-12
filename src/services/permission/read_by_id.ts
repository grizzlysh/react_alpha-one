import { http } from '@/services/axios';
import { PERMISSION_READ_BYID_PATH } from '@/configs/constant';
import { SuccessResponse } from '@/types/SuccessResponse.type';
import PermissionData from '@/types/PermissionData.type';

export interface PermissionReadByIDResponse {
  data        : PermissionData,
  total_data  : number,
  total_pages : number,
  current_page: number
}

const map = {
  getDataFromService: (response: SuccessResponse<PermissionReadByIDResponse>) => {
    return response;
  }
}

const getPermissionByID = async (permission_id: string) => {

  const { data } = await http.get(PERMISSION_READ_BYID_PATH+permission_id);
  return data;

}

const permissionReadByIDService = {
  getPermissionByID,
};

export default permissionReadByIDService;