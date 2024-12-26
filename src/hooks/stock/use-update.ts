import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

import api from "@/services"
import { AlertError, AlertSuccess } from "@/utils/notification";
import { SuccessResponse } from "@/types/SuccessResponse.type";
import { ErrorResponse } from "@/types/ErrorResponse.type";
import { StockUpdateRequest } from "@/services/stock/update";

interface useStockUpdateProps {
  stock_uid: string,
}

export const useStockUpdate = ({ stock_uid }:useStockUpdateProps ) => {
  const dispatch = useDispatch();
  const router   = useRouter();

  return useMutation({
    mutationKey: ['stock-update'],
    mutationFn : (payload: StockUpdateRequest) => api.updateStock(payload, stock_uid),
    onSuccess  : async (resp: SuccessResponse<{}>) => {
      AlertSuccess(resp.status_schema.status_message)
      router.push('/stock', undefined, { shallow: true })
    },
    onError: (err: ErrorResponse<{}>) => {
      const { data } = err.response;
      AlertError(data.status_schema.status_message)
    },
  })
}