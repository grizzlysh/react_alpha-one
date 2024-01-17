import { http } from '@/services/axios';
import { USER_DELETE_PATH } from '@/configs/constant';
import { SuccessResponse } from '@/types/SuccessResponse.type';

export interface UserDeleteRequest {
  current_user_uid: string,
}

const map = {
  getDataFromService: (response: SuccessResponse<{}>) => {
    return response;
  }
}

const deleteUser = async (payload: UserDeleteRequest, user_uid: string) => {
  const { data } = await http.patch(USER_DELETE_PATH+user_uid, payload);
  return data;

}

const userDeleteService = {
  deleteUser,
};

export default userDeleteService;