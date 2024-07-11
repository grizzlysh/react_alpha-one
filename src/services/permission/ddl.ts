import { http } from '@/services/axios';
import { PERMISSION_DDL_PATH } from '@/configs/constant';
import { SuccessResponse } from '@/types/SuccessResponse.type';
import Shape from '@/types/Shape.type';
import { DdlOptions } from '@/utils/ddlOption';

export interface PermissionDdlResponse {
  data: DdlOptions[],
}

const map = {
  getDataFromService: (response: SuccessResponse<PermissionDdlResponse>) => {
    return response;
  }
}

const getPermissionDdl = async () => {

  const { data } = await http.get(PERMISSION_DDL_PATH);
  return data;

}

const permissionDdlService = {
  getPermissionDdl,
};

export default permissionDdlService;