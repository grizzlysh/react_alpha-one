import { http } from '@/services/axios';
import { USER_READ_BYID_PATH } from '@/configs/constant';
import { SuccessResponse } from '@/types/SuccessResponse.type';
import Permission from '@/types/Permission.type';
import User from '@/types/User.type';

export interface UserReadByIDResponse {
  data: User,
}

const map = {
  getDataFromService: (response: SuccessResponse<UserReadByIDResponse>) => {
    return response;
  }
}

const getUserByID = async (user_uid: string) => {

  const { data } = await http.get(USER_READ_BYID_PATH+user_uid);
  return data;

}

const userReadByIDService = {
  getUserByID,
};

export default userReadByIDService;