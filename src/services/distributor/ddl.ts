import { http } from '@/services/axios';
import { DISTRIBUTOR_DDL_PATH } from '@/configs/constant';
import { SuccessResponse } from '@/types/SuccessResponse.type';
import Shape from '@/types/Shape.type';
import { ddlOptions } from '@/utils/ddlOptions';

export interface DistributorDdlResponse {
  data: ddlOptions[],
}

const map = {
  getDataFromService: (response: SuccessResponse<DistributorDdlResponse>) => {
    return response;
  }
}

const getDistributorDdl = async () => {

  const { data } = await http.get(DISTRIBUTOR_DDL_PATH);
  return data;

}

const distributorDdlService = {
  getDistributorDdl,
};

export default distributorDdlService;