import { http } from '@/services/axios';
import { THERAPYCLASS_UPDATE_PATH } from '@/configs/constant';
import { SuccessResponse } from '@/types/SuccessResponse.type';

export interface TherapyClassUpdateRequest {
  name            : string,
  current_user_uid: string,
}


const map = {
  getDataFromService: (response: SuccessResponse<{}>) => {
    return response;
  }
}

const updateTherapyClass = async (payload: TherapyClassUpdateRequest, therapy_class_uid: string) => {
  const { data } = await http.put(THERAPYCLASS_UPDATE_PATH+therapy_class_uid, payload);
  return data;

}

const therapyClassUpdateService = {
  updateTherapyClass,
};

export default therapyClassUpdateService;