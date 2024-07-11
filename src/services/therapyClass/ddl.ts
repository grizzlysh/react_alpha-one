import { http } from '@/services/axios';
import { THERAPYCLASS_DDL_PATH } from '@/configs/constant';
import { SuccessResponse } from '@/types/SuccessResponse.type';
import Shape from '@/types/Shape.type';
import { DdlOptions } from '@/utils/ddlOption';

export interface TherapyClassDdlResponse {
  data: DdlOptions[],
}

const map = {
  getDataFromService: (response: SuccessResponse<TherapyClassDdlResponse>) => {
    return response;
  }
}

const getTherapyClassDdl = async () => {

  const { data } = await http.get(THERAPYCLASS_DDL_PATH);
  return data;

}

const therapyClassDdlService = {
  getTherapyClassDdl,
};

export default therapyClassDdlService;