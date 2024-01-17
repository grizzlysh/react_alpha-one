import { http } from '@/services/axios';
import { TYPE_READ_BYID_PATH } from '@/configs/constant';
import { SuccessResponse } from '@/types/SuccessResponse.type';
import Type from '@/types/Type.type';

export interface TypeReadByIDResponse {
  data: Type,
}

const map = {
  getDataFromService: (response: SuccessResponse<TypeReadByIDResponse>) => {
    return response;
  }
}

const getTypeByID = async (type_uid: string) => {

  const { data } = await http.get(TYPE_READ_BYID_PATH+type_uid);
  return data;

}

const typeReadByIDService = {
  getTypeByID,
};

export default typeReadByIDService;