import { http } from '@/services/axios';
import { CATEGORY_DDL_PATH } from '@/configs/constant';
import { SuccessResponse } from '@/types/SuccessResponse.type';
import { DdlResponse } from '@/utils/ddlOption';

const map = {
  getDataFromService: (response: SuccessResponse<DdlResponse>) => {
    return response;
  }
}

const getCategoryDdl = async () => {

  const { data } = await http.get(CATEGORY_DDL_PATH);
  return data;

}

const categoryDdlService = {
  getCategoryDdl,
};

export default categoryDdlService;