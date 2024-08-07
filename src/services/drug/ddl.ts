import { http } from '@/services/axios';
import { DRUG_DDL_PATH } from '@/configs/constant';
import { SuccessResponse } from '@/types/SuccessResponse.type';
import Shape from '@/types/Shape.type';
import { DdlOptions } from '@/utils/ddlOption';

export interface DrugDdlResponse {
  data: DdlOptions[],
}

const map = {
  getDataFromService: (response: SuccessResponse<DrugDdlResponse>) => {
    return response;
  }
}

const getDrugDdl = async () => {

  const { data } = await http.get(DRUG_DDL_PATH);
  return data;

}

const drugDdlService = {
  getDrugDdl,
};

export default drugDdlService;