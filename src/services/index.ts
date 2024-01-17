import authLoginService from "./auth/login.service";
import authLogoutServices from "./auth/logout.service";
import permissionCreateService from "./permission/create";
import permissionReadService from "./permission/read";
import permissionReadByIDService from "./permission/read_by_id";
import permissionUpdateService from "./permission/update";
import permissionDeleteService from "./permission/delete";
import roleCreateService from "./role/create";
import roleReadService from "./role/read";
import roleReadByIDService from "./role/read_by_id";
import roleUpdateService from "./role/update";
import roleDeleteService from "./role/delete";
import userCreateService from "./user/create";
import userReadService from "./user/read";
import userReadByIDService from "./user/read_by_id";
import userUpdateService from "./user/update";
import userDeleteService from "./user/delete";
import userResetPasswordService from "./user/reset_password";
import shapeCreateService from "./shape/create";
import shapeDeleteService from "./shape/delete";
import shapeReadByIDService from "./shape/read_by_id";
import shapeReadService from "./shape/read";
import shapeUpdateService from "./shape/update";
import typeCreateService from "./type/create";
import typeDeleteService from "./type/delete";
import typeReadByIDService from "./type/read_by_id";
import typeReadService from "./type/read";
import typeUpdateService from "./type/update";
import categoryCreateService from "./category/create";
import categoryDeleteService from "./category/delete";
import categoryReadByIDService from "./category/read_by_id";
import categoryReadService from "./category/read";
import categoryUpdateService from "./category/update";

const api = {
  ...authLoginService,
  ...authLogoutServices,
  ...permissionReadService,
  ...permissionReadByIDService,
  ...permissionCreateService,
  ...permissionUpdateService,
  ...permissionDeleteService,
  ...roleCreateService,
  ...roleReadService,
  ...roleReadByIDService,
  ...roleUpdateService,
  ...roleDeleteService,
  ...userCreateService,
  ...userReadService,
  ...userReadByIDService,
  ...userUpdateService,
  ...userDeleteService,
  ...userResetPasswordService,
  ...shapeCreateService,
  ...shapeDeleteService,
  ...shapeReadByIDService,
  ...shapeReadService,
  ...shapeUpdateService,
  ...typeCreateService,
  ...typeDeleteService,
  ...typeReadByIDService,
  ...typeReadService,
  ...typeUpdateService,
  ...categoryCreateService,
  ...categoryDeleteService,
  ...categoryReadByIDService,
  ...categoryReadService,
  ...categoryUpdateService,

  
};

export default api;
