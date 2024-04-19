import authLoginService from "./auth/login.service";
import authLogoutServices from "./auth/logout.service";
import permissionCreateService from "./permission/create";
import permissionReadService from "./permission/read";
import permissionReadByIDService from "./permission/read_by_id";
import permissionUpdateService from "./permission/update";
import permissionDeleteService from "./permission/delete";
import permissionDdlService from "./permission/ddl";
import roleCreateService from "./role/create";
import roleReadService from "./role/read";
import roleReadByIDService from "./role/read_by_id";
import roleUpdateService from "./role/update";
import roleDeleteService from "./role/delete";
import roleDdlService from "./role/ddl";
import userCreateService from "./user/create";
import userReadService from "./user/read";
import userReadByIDService from "./user/read_by_id";
import userUpdateService from "./user/update";
import userDeleteService from "./user/delete";
import userUpdatePasswordService from "./user/update_password";
import shapeCreateService from "./shape/create";
import shapeDeleteService from "./shape/delete";
import shapeReadByIDService from "./shape/read_by_id";
import shapeReadService from "./shape/read";
import shapeUpdateService from "./shape/update";
import shapeDdlService from "./shape/ddl";
import categoryCreateService from "./category/create";
import categoryDeleteService from "./category/delete";
import categoryReadByIDService from "./category/read_by_id";
import categoryReadService from "./category/read";
import categoryUpdateService from "./category/update";
import categoryDdlService from "./category/ddl";
import therapyClassCreateService from "./therapyClass/create";
import therapyClassDeleteService from "./therapyClass/delete";
import therapyClassReadByIDService from "./therapyClass/read_by_id";
import therapyClassReadService from "./therapyClass/read";
import therapyClassUpdateService from "./therapyClass/update";
import therapyClassDdlService from "./therapyClass/ddl";
import distributorCreateService from "./distributor/create";
import distributorDeleteService from "./distributor/delete";
import distributorReadByIDService from "./distributor/read_by_id";
import distributorReadService from "./distributor/read";
import distributorUpdateService from "./distributor/update";
import distributorDdlService from "./distributor/ddl";
import drugReadByIDService from "./drug/read_by_id";
import drugReadService from "./drug/read";
import drugCreateService from "./drug/create";
import drugUpdateService from "./drug/update";
import drugDeleteService from "./drug/delete";
import drugDdlService from "./drug/ddl";

const api = {
  ...authLoginService,
  ...authLogoutServices,
  ...permissionReadService,
  ...permissionReadByIDService,
  ...permissionCreateService,
  ...permissionUpdateService,
  ...permissionDeleteService,
  ...permissionDdlService,
  ...roleCreateService,
  ...roleReadService,
  ...roleReadByIDService,
  ...roleUpdateService,
  ...roleDdlService,
  ...roleDeleteService,
  ...userCreateService,
  ...userReadService,
  ...userReadByIDService,
  ...userUpdateService,
  ...userUpdatePasswordService,
  ...userDeleteService,
  ...shapeCreateService,
  ...shapeDeleteService,
  ...shapeReadByIDService,
  ...shapeReadService,
  ...shapeUpdateService,
  ...shapeDdlService,
  ...categoryCreateService,
  ...categoryDeleteService,
  ...categoryReadByIDService,
  ...categoryReadService,
  ...categoryUpdateService,
  ...categoryDdlService,
  ...therapyClassCreateService,
  ...therapyClassDeleteService,
  ...therapyClassReadByIDService,
  ...therapyClassReadService,
  ...therapyClassUpdateService,
  ...therapyClassDdlService,
  ...distributorCreateService,
  ...distributorDeleteService,
  ...distributorReadByIDService,
  ...distributorReadService,
  ...distributorUpdateService,
  ...distributorDdlService,
  ...drugReadByIDService,
  ...drugReadService,
  ...drugCreateService,
  ...drugUpdateService,
  ...drugDdlService,
  ...drugDeleteService,

  
};

export default api;
