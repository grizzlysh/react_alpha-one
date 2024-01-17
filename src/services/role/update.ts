import { http } from '@/services/axios';
import { ROLE_UPDATE_PATH } from '@/configs/constant';
import { SuccessResponse } from '@/types/SuccessResponse.type';

export interface RoleUpdateRequest {
  display_name    : string,
  description     : string,
  current_user_uid: string,
}


const map = {
  getDataFromService: (response: SuccessResponse<{}>) => {
    return response;
  }
}

const updateRole = async (payload: RoleUpdateRequest, role_uid: string) => {
  const { data } = await http.put(ROLE_UPDATE_PATH+role_uid, payload);
  return data;

}

const roleUpdateService = {
  updateRole,
};

export default roleUpdateService;