import { http } from '@/services/axios';
import { USER_UPDATE_PATH } from '@/configs/constant';
import { SuccessResponse } from '@/types/SuccessResponse.type';

export interface UserUpdateInput {
  username        : string,
  name            : string,
  sex             : {value: string, label: string} | null,
  email           : string,
  password        : string,
  current_user_uid: string,
  role_uid        : {value: string, label: string} | null,
}
export interface UserUpdateRequest {
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

const updateUser = async (payload: UserUpdateRequest, user_uid: string) => {
  const { data } = await http.put(USER_UPDATE_PATH+user_uid, payload);
  return data;

}

const userUpdateService = {
  updateUser,
};

export default userUpdateService;