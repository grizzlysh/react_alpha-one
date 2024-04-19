import { http } from '@/services/axios';
import { ROLE_READ_BYID_PATH } from '@/configs/constant';
import { SuccessResponse } from '@/types/SuccessResponse.type';
import Role from '@/types/Role.type';

export interface RoleReadByIDResponse {
  data        : Role,
}

const map = {
  getDataFromService: (response: SuccessResponse<RoleReadByIDResponse>) => {
    return response;
  }
}

const getRoleByID = async (role_uid: string) => {

  const { data } = await http.get(ROLE_READ_BYID_PATH+role_uid);
  return data;

}

const roleReadByIDService = {
  getRoleByID,
};

export default roleReadByIDService;