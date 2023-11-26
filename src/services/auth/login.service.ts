import { http } from '@/services/axios';
import { LOGIN_PATH } from '@/configs/constant';
import { UserOnline } from '@/types/UserOnline.type';
import { ServiceResponse } from '@/types/ServiceResponse.type';

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
  getDataFromService: (response: ServiceResponse<LoginResponse>) => {
    return response;
  }
}

const getLogin = async (payload: LoginRequest) => {

  const { data } = await http.post(LOGIN_PATH, payload);
  return data;

}

const loginService = {
  getLogin,
};

export default loginService;