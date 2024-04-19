import { http } from '@/services/axios';
import { ROLE_DDL_PATH } from '@/configs/constant';
import { SuccessResponse } from '@/types/SuccessResponse.type';
import Shape from '@/types/Shape.type';
import { ddlOptions } from '@/utils/ddlOptions';

export interface RoleDdlResponse {
  data: ddlOptions[],
}

const map = {
  getDataFromService: (response: SuccessResponse<RoleDdlResponse>) => {
    return response;
  }
}

const getRoleDdl = async () => {

  const { data } = await http.get(ROLE_DDL_PATH);
  return data;

}

const roleDdlService = {
  getRoleDdl,
};

export default roleDdlService;