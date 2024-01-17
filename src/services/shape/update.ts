import { http } from '@/services/axios';
import { SHAPE_UPDATE_PATH } from '@/configs/constant';
import { SuccessResponse } from '@/types/SuccessResponse.type';

export interface ShapeUpdateRequest {
  name            : string,
  current_user_uid: string,
}


const map = {
  getDataFromService: (response: SuccessResponse<{}>) => {
    return response;
  }
}

const updateShape = async (payload: ShapeUpdateRequest, shape_uid: string) => {
  const { data } = await http.put(SHAPE_UPDATE_PATH+shape_uid, payload);
  return data;

}

const shapeUpdateService = {
  updateShape,
};

export default shapeUpdateService;