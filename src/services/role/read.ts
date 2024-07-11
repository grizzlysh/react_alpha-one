import { http } from '@/services/axios';
import { ROLE_READ_PATH } from '@/configs/constant';
import { SuccessResponse } from '@/types/SuccessResponse.type';
import Role from '@/types/Role.type';
import { PaginationRequest, PaginationResponse } from '@/utils/pagination';

const map = {
  getDataFromService: (response: SuccessResponse<PaginationResponse<Role>>) => {
    return response;
  }
}

const getRole = async (payload: PaginationRequest) => {

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