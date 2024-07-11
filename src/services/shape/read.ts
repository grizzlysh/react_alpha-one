import { http } from '@/services/axios';
import { SHAPE_READ_PATH } from '@/configs/constant';
import { SuccessResponse } from '@/types/SuccessResponse.type';
import Shape from '@/types/Shape.type';
import { PaginationRequest, PaginationResponse } from '@/utils/pagination';


const map = {
  getDataFromService: (response: SuccessResponse<PaginationResponse<Shape>>) => {
    return response;
  }
}

const getShape = async (payload: PaginationRequest) => {

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