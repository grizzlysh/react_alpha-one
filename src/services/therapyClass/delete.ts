import { http } from '@/services/axios';
import { THERAPYCLASS_DELETE_PATH } from '@/configs/constant';
import { SuccessResponse } from '@/types/SuccessResponse.type';

export interface TherapyClassDeleteRequest {
  current_user_uid: string,
}

const map = {
  getDataFromService: (response: SuccessResponse<{}>) => {
    return response;
  }
}

const deleteTherapyClass = async (payload: TherapyClassDeleteRequest, therapy_class_uid: string) => {
  const { data } = await http.patch(THERAPYCLASS_DELETE_PATH+therapy_class_uid, payload);
  return data;

}

const therapyClassDeleteService = {
  deleteTherapyClass,
};

export default therapyClassDeleteService;