import { http } from '@/services/axios';
import { SHAPE_READ_BYID_PATH } from '@/configs/constant';
import { SuccessResponse } from '@/types/SuccessResponse.type';
import Shape from '@/types/Shape.type';

export interface ShapeReadByIDResponse {
  data: Shape,
}

const map = {
  getDataFromService: (response: SuccessResponse<ShapeReadByIDResponse>) => {
    return response;
  }
}

const getShapeByID = async (shape_uid: string) => {

  const { data } = await http.get(SHAPE_READ_BYID_PATH+shape_uid);
  return data;

}

const shapeReadByIDService = {
  getShapeByID,
};

export default shapeReadByIDService;