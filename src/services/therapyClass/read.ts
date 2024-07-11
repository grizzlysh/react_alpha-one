import { http } from '@/services/axios';
import { THERAPYCLASS_READ_PATH } from '@/configs/constant';
import { SuccessResponse } from '@/types/SuccessResponse.type';
import TherapyClass from '@/types/TherapyClass.type';
import { PaginationRequest, PaginationResponse } from '@/utils/pagination';

const map = {
  getDataFromService: (response: SuccessResponse<PaginationResponse<TherapyClass>>) => {
    return response;
  }
}

const getTherapyClass = async (payload: PaginationRequest) => {

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