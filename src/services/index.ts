import authLoginService from "./auth/login.service";
import authLogoutServices from "./auth/logout.service";
import permissionReadService from "./permission/read";

const api = {
  ...authLoginService,
  ...authLogoutServices,
  ...permissionReadService,
};

export default api;
