import { http } from '@/services/axios';
import { SHAPE_DELETE_PATH } from '@/configs/constant';
import { SuccessResponse } from '@/types/SuccessResponse.type';

export interface ShapeDeleteRequest {
  current_user_uid: string,
}

const map = {
  getDataFromService: (response: SuccessResponse<{}>) => {
    return response;
  }
}

const deleteShape = async (payload: ShapeDeleteRequest, shape_uid: string) => {
  const { data } = await http.patch(SHAPE_DELETE_PATH+shape_uid, payload);
  return data;

}

const shapeDeleteService = {
  deleteShape,
};

export default shapeDeleteService;