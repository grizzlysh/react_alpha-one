import { http } from '@/services/axios';
import { SHAPE_READ_PATH } from '@/configs/constant';
import { SuccessResponse } from '@/types/SuccessResponse.type';
import Shape from '@/types/Shape.type';

export interface ShapeReadRequest {
  page : string,
  size : string,
  cond : string,
  sort : string,
  field: string,
}

export interface ShapeReadResponse {
  data        : Shape[],
  total_data  : number,
  total_pages : number,
  current_page: number
}

const map = {
  getDataFromService: (response: SuccessResponse<ShapeReadResponse>) => {
    return response;
  }
}

const getShape = async (payload: ShapeReadRequest) => {

  const { data } = await http.get(SHAPE_READ_PATH, {
    params: {
      page : payload.page,
      size : payload.size,
      cond : payload.cond,
      sort : payload.sort,
      field: payload.field,
    }
  });
  return data;

}

const shapeReadService = {
  getShape,
};

export default shapeReadService;