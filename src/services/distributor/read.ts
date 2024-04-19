import { http } from '@/services/axios';
import { DISTRIBUTOR_READ_PATH } from '@/configs/constant';
import { SuccessResponse } from '@/types/SuccessResponse.type';
import Distributor from '@/types/Distributor.type';

export interface DistributorReadRequest {
  page : string,
  size : string,
  cond : string,
  sort : string,
  field: string,
}

export interface DistributorReadResponse {
  data        : Distributor[],
  total_data  : number,
  total_pages : number,
  current_page: number
}

const map = {
  getDataFromService: (response: SuccessResponse<DistributorReadResponse>) => {
    return response;
  }
}

const getDistributor = async (payload: DistributorReadRequest) => {

  const { data } = await http.get(DISTRIBUTOR_READ_PATH, {
    params: {
      page : payload.page,
      size : payload.size,
      cond : payload.cond,
      sort : payload.sort,
      field: payload.field,
    }
  });
  return data;

}

const distributorReadService = {
  getDistributor,
};

export default distributorReadService;