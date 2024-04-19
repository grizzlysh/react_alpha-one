import { http } from '@/services/axios';
import { USER_CREATE_PATH } from '@/configs/constant';
import { SuccessResponse } from '@/types/SuccessResponse.type';

export interface UserCreateInput {
  username        : string,
  name            : string,
  sex             : {value: string, label: string} | null,
  email           : string,
  password        : string,
  current_user_uid: string,
  role_uid        : {value: string, label: string} | null,
}

export interface UserCreateRequest {
  username        : string,
  name            : string,
  sex             : string,
  email           : string,
  password        : string,
  current_user_uid: string,
  role_uid        : string,
}

const map = {
  getDataFromService: (response: SuccessResponse<{}>) => {
    return response;
  }
}

const createUser = async (payload: UserCreateRequest) => {

  const { data } = await http.post(USER_CREATE_PATH, payload);
  return data;

}

const userCreateService = {
  createUser,
};

export default userCreateService;