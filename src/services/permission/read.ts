import { http } from '@/services/axios';
import { PERMISSION_READ_PATH } from '@/configs/constant';
import { SuccessResponse } from '@/types/SuccessResponse.type';
import PermissionData from '@/types/PermissionData.type';

export interface PermissionReadRequest {
  page : string,
  size : string,
  cond : string,
  sort : string,
  field: string,
}

export interface PermissionReadResponse {
  data        : PermissionData[],
  total_data  : number,
  total_pages : number,
  current_page: number
}

const map = {
  getDataFromService: (response: SuccessResponse<PermissionReadResponse>) => {
    return response;
  }
}

const getPermission = async (payload: PermissionReadRequest) => {

  const { data } = await http.get(PERMISSION_READ_PATH, {
    params: {
      page : payload.page,
      size : payload.size,
      cond : payload.cond,
      sort : payload.sort,
      field: payload.field,
    }
  });
  return data;

}

const permissionReadService = {
  getPermission,
};

export default permissionReadService;