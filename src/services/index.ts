import authLoginService from "./auth/login.service";
import authLogoutServices from "./auth/logout.service";
import permissionReadService from "./permission/read";
import permissionReadByIDService from "./permission/read_by_id";
import permissionCreateService from "./permission/create";
import permissionUpdateService from "./permission/update";
import permissionDeleteService from "./permission/delete";

const api = {
  ...authLoginService,
  ...authLogoutServices,
  ...permissionReadService,
  ...permissionReadByIDService,
  ...permissionCreateService,
  ...permissionUpdateService,
  ...permissionDeleteService,
  
};

export default api;
