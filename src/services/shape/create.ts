import { http } from '@/services/axios';
import { SHAPE_CREATE_PATH } from '@/configs/constant';
import { SuccessResponse } from '@/types/SuccessResponse.type';

export interface ShapeCreateRequest {
  name            : string,
  current_user_uid: string,
}

const map = {
  getDataFromService: (response: SuccessResponse<{}>) => {
    return response;
  }
}

const createShape = async (payload: ShapeCreateRequest) => {

  const { data } = await http.post(SHAPE_CREATE_PATH, payload);
  return data;

}

const shapeCreateService = {
  createShape,
};

export default shapeCreateService;