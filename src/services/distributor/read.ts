import { http } from '@/services/axios';
import { DISTRIBUTOR_READ_PATH } from '@/configs/constant';
import { SuccessResponse } from '@/types/SuccessResponse.type';
import Distributor from '@/types/Distributor.type';
import { PaginationRequest, PaginationResponse } from '@/utils/pagination';

const map = {
  getDataFromService: (response: SuccessResponse<PaginationResponse<Distributor>>) => {
    return response;
  }
}

const getDistributor = async (payload: PaginationRequest) => {

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