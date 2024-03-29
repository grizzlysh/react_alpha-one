import { http } from '@/services/axios';
import { THERAPYCLASS_READ_PATH } from '@/configs/constant';
import { SuccessResponse } from '@/types/SuccessResponse.type';
import TherapyClass from '@/types/TherapyClass.type';

export interface TherapyClassReadRequest {
  page : string,
  size : string,
  cond : string,
  sort : string,
  field: string,
}

export interface TherapyClassReadResponse {
  data        : TherapyClass[],
  total_data  : number,
  total_pages : number,
  current_page: number
}

const map = {
  getDataFromService: (response: SuccessResponse<TherapyClassReadResponse>) => {
    return response;
  }
}

const getTherapyClass = async (payload: TherapyClassReadRequest) => {

  const { data } = await http.get(THERAPYCLASS_READ_PATH, {
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

const therapyClassReadService = {
  getTherapyClass,
};

export default therapyClassReadService;