import { http } from '@/services/axios';
import { DRUG_DELETE_PATH } from '@/configs/constant';
import { SuccessResponse } from '@/types/SuccessResponse.type';

export interface DrugDeleteRequest {
  current_user_uid: string,
}

const map = {
  getDataFromService: (response: SuccessResponse<{}>) => {
    return response;
  }
}

const deleteDrug = async (payload: DrugDeleteRequest, drug_uid: string) => {
  const { data } = await http.patch(DRUG_DELETE_PATH+drug_uid, payload);
  return data;

}

const drugDeleteService = {
  deleteDrug,
};

export default drugDeleteService;