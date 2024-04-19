import { http } from '@/services/axios';
import { DISTRIBUTOR_CREATE_PATH } from '@/configs/constant';
import { SuccessResponse } from '@/types/SuccessResponse.type';

export interface DistributorCreateInput {
  name            : string,
  address         : string,
  phone           : string,
  no_permit       : string,
  contact_person  : string,
  status          : {value: boolean, label: string} | null,
  description     : string,
  current_user_uid: string,
}

export interface DistributorCreateRequest {
  name            : string,
  address         : string,
  phone           : string,
  no_permit       : string,
  contact_person  : string,
  status          : boolean,
  description     : string,
  current_user_uid: string,
}

const map = {
  getDataFromService: (response: SuccessResponse<{}>) => {
    return response;
  }
}

const createDistributor = async (payload: DistributorCreateRequest) => {

  const { data } = await http.post(DISTRIBUTOR_CREATE_PATH, payload);
  return data;

}

const distributorCreateService = {
  createDistributor,
};

export default distributorCreateService;