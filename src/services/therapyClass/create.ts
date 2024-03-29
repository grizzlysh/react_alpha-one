import { http } from '@/services/axios';
import { THERAPYCLASS_CREATE_PATH } from '@/configs/constant';
import { SuccessResponse } from '@/types/SuccessResponse.type';

export interface TherapyClassCreateRequest {
  name            : string,
  current_user_uid: string,
}

const map = {
  getDataFromService: (response: SuccessResponse<{}>) => {
    return response;
  }
}

const createTherapyClass = async (payload: TherapyClassCreateRequest) => {

  const { data } = await http.post(THERAPYCLASS_CREATE_PATH, payload);
  return data;

}

const therapyClassCreateService = {
  createTherapyClass,
};

export default therapyClassCreateService;