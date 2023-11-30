import { http } from '@/services/axios';
import { AUTH_LOGIN_PATH } from '@/configs/constant';
import { UserOnline } from '@/types/UserOnline.type';
import { SuccessResponse } from '@/types/SuccessResponse.type';

export interface LoginRequest {
  username: string,
  password: string,
}

export interface LoginResponse {
  user         : UserOnline,
  access_token : string,
  refresh_token: string,
}

const map = {
  getDataFromService: (response: SuccessResponse<LoginResponse>) => {
    return response;
  }
}

const getAuthLogin = async (payload: LoginRequest) => {

  const { data } = await http.post(AUTH_LOGIN_PATH, payload);
  return data;

}

const authLoginService = {
  getAuthLogin,
};

export default authLoginService;