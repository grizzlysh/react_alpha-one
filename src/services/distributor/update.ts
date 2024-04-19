import { http } from '@/services/axios';
import { DISTRIBUTOR_UPDATE_PATH } from '@/configs/constant';
import { SuccessResponse } from '@/types/SuccessResponse.type';

export interface DistributorUpdateInput {
  name            : string,
  address         : string,
  phone           : string,
  no_permit       : string,
  contact_person  : string,
  status          : {value: boolean, label: string} | null,
  description     : string,
  current_user_uid: string,
}

export interface DistributorUpdateRequest {
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

const updateDistributor = async (payload: DistributorUpdateRequest, distributor_uid: string) => {
  const { data } = await http.put(DISTRIBUTOR_UPDATE_PATH+distributor_uid, payload);
  return data;

}

const distributorUpdateService = {
  updateDistributor,
};

export default distributorUpdateService;