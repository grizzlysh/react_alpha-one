import { http } from '@/services/axios';
import { DRUG_READ_PATH } from '@/configs/constant';
import { SuccessResponse } from '@/types/SuccessResponse.type';
import Drug from '@/types/Drug.type';

export interface DrugReadRequest {
  page : string,
  size : string,
  cond : string,
  sort : string,
  field: string,
}

export interface DrugReadResponse {
  data        : Drug[],
  total_data  : number,
  total_pages : number,
  current_page: number
}

const map = {
  getDataFromService: (response: SuccessResponse<DrugReadResponse>) => {
    return response;
  }
}

const getDrug = async (payload: DrugReadRequest) => {

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