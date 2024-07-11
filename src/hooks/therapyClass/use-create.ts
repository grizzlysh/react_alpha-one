import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

import api from "@/services"
import { AlertError, AlertSuccess } from "@/utils/notification";
import { SuccessResponse } from "@/types/SuccessResponse.type";
import { ErrorResponse } from "@/types/ErrorResponse.type";
import { TherapyClassCreateRequest } from "@/services/therapyClass/create";

export const useTherapyClassCreate = () => {
  const dispatch = useDispatch();
  const router   = useRouter();

  return useMutation({
    mutationKey: ['therapyclass-create'],
    mutationFn: (payload: TherapyClassCreateRequest) => api.createTherapyClass(payload),
    onSuccess: async (resp: SuccessResponse<{}>) => {
      AlertSuccess(resp.status_schema.status_message)
    },
    onError: (err: ErrorResponse<{}>) => {
      // let message = data?.response.data.Message || 'Something went wrong, please try again!'
      const { data } = err.response; 
      if (data.status_schema.status_code == 700){
        data.status_schema.status_message = "Something went wrong, please try again"
      }
      AlertError(data.status_schema.status_message)
    },
  })
}