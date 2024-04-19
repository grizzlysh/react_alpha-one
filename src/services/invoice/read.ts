import { http } from '@/services/axios';
import { ROLE_READ_PATH } from '@/configs/constant';
import { SuccessResponse } from '@/types/SuccessResponse.type';
import Role from '@/types/Role.type';

export interface RoleReadRequest {
  page : string,
  size : string,
  cond : string,
  sort : string,
  field: string,
}

export interface RoleReadResponse {
  data        : Role[],
  total_data  : number,
  total_pages : number,
  current_page: number
}

const map = {
  getDataFromService: (response: SuccessResponse<RoleReadResponse>) => {
    return response;
  }
}

const getRole = async (payload: RoleReadRequest) => {

  const { data } = await http.get(ROLE_READ_PATH, {
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

const roleReadService = {
  getRole,
};

export default roleReadService;