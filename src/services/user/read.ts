import { http } from '@/services/axios';
import { USER_READ_PATH } from '@/configs/constant';
import { SuccessResponse } from '@/types/SuccessResponse.type';
import User from '@/types/User.type';

export interface UserReadRequest {
  page : string,
  size : string,
  cond : string,
  sort : string,
  field: string,
}

export interface UserReadResponse {
  data        : User[],
  total_data  : number,
  total_pages : number,
  current_page: number
}

const map = {
  getDataFromService: (response: SuccessResponse<UserReadResponse>) => {
    return response;
  }
}

const getUser = async (payload: UserReadRequest) => {

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