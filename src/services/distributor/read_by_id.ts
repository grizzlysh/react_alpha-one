import { http } from '@/services/axios';
import { DISTRIBUTOR_READ_BYID_PATH } from '@/configs/constant';
import { SuccessResponse } from '@/types/SuccessResponse.type';
import Distributor from '@/types/Distributor.type';

export interface DistributorReadByIDResponse {
  data: Distributor,
}

const map = {
  getDataFromService: (response: SuccessResponse<DistributorReadByIDResponse>) => {
    return response;
  }
}

const getDistributorByID = async (distributor_uid: string) => {

  const { data } = await http.get(DISTRIBUTOR_READ_BYID_PATH+distributor_uid);
  return data;

}

const distributorReadByIDService = {
  getDistributorByID,
};

export default distributorReadByIDService;