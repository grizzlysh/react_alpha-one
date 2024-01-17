import { http } from '@/services/axios';
import { TYPE_READ_PATH } from '@/configs/constant';
import { SuccessResponse } from '@/types/SuccessResponse.type';
import Type from '@/types/Type.type';

export interface TypeReadRequest {
  page : string,
  size : string,
  cond : string,
  sort : string,
  field: string,
}

export interface TypeReadResponse {
  data        : Type[],
  total_data  : number,
  total_pages : number,
  current_page: number
}

const map = {
  getDataFromService: (response: SuccessResponse<TypeReadResponse>) => {
    return response;
  }
}

const getType = async (payload: TypeReadRequest) => {

  const { data } = await http.get(TYPE_READ_PATH, {
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

const typeReadService = {
  getType,
};

export default typeReadService;