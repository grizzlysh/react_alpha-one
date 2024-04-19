import { http } from '@/services/axios';
import { DRUG_UPDATE_PATH } from '@/configs/constant';
import { SuccessResponse } from '@/types/SuccessResponse.type';

export interface DrugUpdateInput {
  name             : string,
  shape_uid        : {value: string, label: string} | null,
  category_uid     : {value: string, label: string} | null,
  therapy_class_uid: {value: string, label: string} | null,
  description      : string | null,
  status           : {value: boolean, label: string} | null,
  current_user_uid : string,
}

export interface DrugUpdateRequest {
  name             : string,
  shape_uid        : string,
  category_uid     : string,
  therapy_class_uid: string,
  description      : string,
  status           : boolean,
  current_user_uid : string,
}


const map = {
  getDataFromService: (response: SuccessResponse<{}>) => {
    return response;
  }
}

const updateDrug = async (payload: DrugUpdateRequest, drug_uid: string) => {
  const { data } = await http.put(DRUG_UPDATE_PATH+drug_uid, payload);
  return data;

}

const drugUpdateService = {
  updateDrug,
};

export default drugUpdateService;