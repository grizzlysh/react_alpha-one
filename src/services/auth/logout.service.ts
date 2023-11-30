import { http } from '@/services/axios';
import { AUTH_LOGOUT_PATH } from '@/configs/constant';

const getAuthLogout = async () => {
  const { data } = await http.get(AUTH_LOGOUT_PATH);
  return data;
};

const authLogoutServices = {
  getAuthLogout,
};

export default authLogoutServices;
