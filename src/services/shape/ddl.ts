import { http } from '@/services/axios';
import { SHAPE_DDL_PATH } from '@/configs/constant';
import { SuccessResponse } from '@/types/SuccessResponse.type';
import Shape from '@/types/Shape.type';
import { ddlOptions } from '@/utils/ddlOptions';

export interface ShapeDdlResponse {
  data: ddlOptions[],
}

const map = {
  getDataFromService: (response: SuccessResponse<ShapeDdlResponse>) => {
    return response;
  }
}

const getShapeDdl = async () => {

  const { data } = await http.get(SHAPE_DDL_PATH);
  return data;

}

const shapeDdlService = {
  getShapeDdl,
};

export default shapeDdlService;