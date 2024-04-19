import { http } from '@/services/axios';
import { DISTRIBUTOR_CREATE_PATH, DRUG_CREATE_PATH } from '@/configs/constant';
import { SuccessResponse } from '@/types/SuccessResponse.type';

export interface DrugCreateInput {
  name             : string,
  shape_uid        : {value: string, label: string} | null,
  category_uid     : {value: string, label: string} | null,
  therapy_class_uid: {value: string, label: string} | null,
  description      : string,
  status           : {value: boolean, label: string} | null,
  current_user_uid : string,
}

export interface DrugCreateRequest {
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

const createDrug = async (payload: DrugCreateRequest) => {

  const { data } = await http.post(DRUG_CREATE_PATH, payload);
  return data;

}

const drugCreateService = {
  createDrug,
};

export default drugCreateService;