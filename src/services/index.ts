import authLoginService from "./auth/login.service";
import authLogoutServices from "./auth/logout.service";
import permissionReadService from "./permission/read";
import permissionCreateService from "./permission/create";
import permissionUpdateService from "./permission/update";
import permissionDeleteService from "./permission/delete";

const api = {
  ...authLoginService,
  ...authLogoutServices,
  ...permissionReadService,
  ...permissionCreateService,
  ...permissionUpdateService,
  ...permissionDeleteService,
  
};

export default api;
