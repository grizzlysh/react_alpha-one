import { http } from '@/services/axios';
import { DISTRIBUTOR_DELETE_PATH } from '@/configs/constant';
import { SuccessResponse } from '@/types/SuccessResponse.type';

export interface DistributorDeleteRequest {
  current_user_uid: string,
}

const map = {
  getDataFromService: (response: SuccessResponse<{}>) => {
    return response;
  }
}

const deleteDistributor = async (payload: DistributorDeleteRequest, distributor_uid: string) => {
  const { data } = await http.patch(DISTRIBUTOR_DELETE_PATH+distributor_uid, payload);
  return data;

}

const distributorDeleteService = {
  deleteDistributor,
};

export default distributorDeleteService;