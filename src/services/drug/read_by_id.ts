import { http } from '@/services/axios';
import { DRUG_READ_BYID_PATH } from '@/configs/constant';
import { SuccessResponse } from '@/types/SuccessResponse.type';
import Drug from '@/types/Drug.type';

export interface DrugReadByIDResponse {
  data: Drug,
}

const map = {
  getDataFromService: (response: SuccessResponse<DrugReadByIDResponse>) => {
    return response;
  }
}

const getDrugByID = async (drug_uid: string) => {

  const { data } = await http.get(DRUG_READ_BYID_PATH+drug_uid);
  return data;

}

const drugReadByIDService = {
  getDrugByID,
};

export default drugReadByIDService;