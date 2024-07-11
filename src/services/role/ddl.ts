import { http } from '@/services/axios';
import { ROLE_DDL_PATH } from '@/configs/constant';
import { SuccessResponse } from '@/types/SuccessResponse.type';
import Shape from '@/types/Shape.type';
import { DdlResponse } from '@/utils/ddlOption';

const map = {
  getDataFromService: (response: SuccessResponse<DdlResponse>) => {
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