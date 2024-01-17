import { http } from '@/services/axios';
import { PERMISSION_CREATE_PATH, ROLE_CREATE_PATH } from '@/configs/constant';
import { SuccessResponse } from '@/types/SuccessResponse.type';

export interface RoleCreateRequest {
  display_name    : string,
  description     : string,
  current_user_uid: string,
  permissions     : string,
}

const map = {
  getDataFromService: (response: SuccessResponse<{}>) => {
    return response;
  }
}

const createRole = async (payload: RoleCreateRequest) => {

  const { data } = await http.post(ROLE_CREATE_PATH, payload);
  return data;

}

const roleCreateService = {
  createRole,
};

export default roleCreateService;