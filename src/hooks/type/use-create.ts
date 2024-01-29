import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

import api from "@/services"
import { AlertError, AlertSuccess } from "@/utils/notification";
import { SuccessResponse } from "@/types/SuccessResponse.type";
import { ErrorResponse } from "@/types/ErrorResponse.type";
import { TypeCreateRequest } from "@/services/type/create";

interface useTypeCreateProps {
  getData   : ()=>void,
  closeModal: ()=>void,
  resetForm : ()=>void,
}

export const useTypeCreate = ({getData, closeModal, resetForm}: useTypeCreateProps) => {
  const dispatch = useDispatch();
  const router   = useRouter();

  return useMutation({
    mutationKey: ['type-create'],
    mutationFn: (payload: TypeCreateRequest) => api.createType(payload),
    onSuccess: async (resp: SuccessResponse<{}>) => {
      AlertSuccess(resp.status_schema.status_message)
      getData()
      resetForm()
      closeModal()
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