import { http } from '@/services/axios';
import { THERAPYCLASS_READ_BYID_PATH } from '@/configs/constant';
import { SuccessResponse } from '@/types/SuccessResponse.type';
import TherapyClass from '@/types/TherapyClass.type';

export interface TherapyClassReadByIDResponse {
  data: TherapyClass,
}

const map = {
  getDataFromService: (response: SuccessResponse<TherapyClassReadByIDResponse>) => {
    return response;
  }
}

const getTherapyClassByID = async (therapy_class_uid: string) => {

  const { data } = await http.get(THERAPYCLASS_READ_BYID_PATH+therapy_class_uid);
  return data;

}

const therapyClassReadByIDService = {
  getTherapyClassByID,
};

export default therapyClassReadByIDService;