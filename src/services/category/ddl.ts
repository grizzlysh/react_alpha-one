import { http } from '@/services/axios';
import { CATEGORY_DDL_PATH } from '@/configs/constant';
import { SuccessResponse } from '@/types/SuccessResponse.type';
import Shape from '@/types/Shape.type';
import { ddlOptions } from '@/utils/ddlOptions';

export interface CategoryDdlResponse {
  data: ddlOptions[],
}

const map = {
  getDataFromService: (response: SuccessResponse<CategoryDdlResponse>) => {
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