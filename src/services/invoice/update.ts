import { http } from '@/services/axios';
import { ROLE_UPDATE_PATH } from '@/configs/constant';
import { SuccessResponse } from '@/types/SuccessResponse.type';
import { ddlOptions } from '@/utils/ddlOptions';

export interface RoleUpdatePermissionInput {
  permission     : ddlOptions | null,
  read_permit    : boolean,
  write_permit   : boolean,
  modify_permit  : boolean,
  delete_permit  : boolean,
}

export interface RoleUpdateRequest {
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

const updateRole = async (payload: RoleUpdateRequest, role_uid: string) => {
  const { data } = await http.put(ROLE_UPDATE_PATH+role_uid, payload);
  return data;

}

const roleUpdateService = {
  updateRole,
};

export default roleUpdateService;