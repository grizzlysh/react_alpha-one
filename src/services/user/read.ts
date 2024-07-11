import { http } from '@/services/axios';
import { USER_READ_PATH } from '@/configs/constant';
import { SuccessResponse } from '@/types/SuccessResponse.type';
import User from '@/types/User.type';
import { PaginationRequest, PaginationResponse } from '@/utils/pagination';

const map = {
  getDataFromService: (response: SuccessResponse<PaginationResponse<User>>) => {
    return response;
  }
}

const getUser = async (payload: PaginationRequest) => {

  const { data } = await http.get(USER_READ_PATH, {
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

const userReadService = {
  getUser,
};

export default userReadService;