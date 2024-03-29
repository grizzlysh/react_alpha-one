import { http } from '@/services/axios';
import { USER_RESET_PASSWORD_PATH, USER_UPDATE_PATH } from '@/configs/constant';
import { SuccessResponse } from '@/types/SuccessResponse.type';

export interface UserUpdatePasswordRequest {
  password        : string,
  repassword      : string,
  current_user_uid: string,
}


const map = {
  getDataFromService: (response: SuccessResponse<{}>) => {
    return response;
  }
}

const updatePasswordUser = async (payload: UserUpdatePasswordRequest, user_uid: string) => {
  const { data } = await http.put(USER_RESET_PASSWORD_PATH+user_uid, payload);
  return data;

}

const userUpdatePasswordService = {
  updatePasswordUser,
};

export default userUpdatePasswordService;