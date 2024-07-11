import { http } from '@/services/axios';
import { DRUG_READ_PATH } from '@/configs/constant';
import { SuccessResponse } from '@/types/SuccessResponse.type';
import Drug from '@/types/Drug.type';
import { PaginationRequest, PaginationResponse } from '@/utils/pagination';

const map = {
  getDataFromService: (response: SuccessResponse<PaginationResponse<Drug>>) => {
    return response;
  }
}

const getDrug = async (payload: PaginationRequest) => {

  const { data } = await http.get(DRUG_READ_PATH, {
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

const drugReadService = {
  getDrug,
};

export default drugReadService;