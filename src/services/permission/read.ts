import { http } from '@/services/axios';
import { PERMISSION_READ_PATH } from '@/configs/constant';
import { SuccessResponse } from '@/types/SuccessResponse.type';
import Permission from '@/types/Permission.type';
import { PaginationRequest, PaginationResponse } from '@/utils/pagination';

const map = {
  getDataFromService: (response: SuccessResponse<PaginationResponse<Permission>>) => {
    return response;
  }
}

const getPermission = async (payload: PaginationRequest) => {

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