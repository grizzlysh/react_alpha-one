import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

import api from "@/services"
import { AlertError, AlertSuccess } from "@/utils/notification";
import { SuccessResponse } from "@/types/SuccessResponse.type";
import { ErrorResponse } from "@/types/ErrorResponse.type";
import { TherapyClassUpdateRequest } from "@/services/therapyClass/update";

interface useTherapyClassUpdateProps {
  therapy_class_uid: string,
  getData          : ()=>void,
  closeModal       : ()=>void,
  resetForm        : ()=>void,
}

export const useTherapyClassUpdate = ({ therapy_class_uid, getData, closeModal, resetForm }:useTherapyClassUpdateProps ) => {
  const dispatch = useDispatch();
  const router   = useRouter();

  return useMutation({
    mutationKey: ['therapyclass-update'],
    mutationFn: (payload: TherapyClassUpdateRequest) => api.updateTherapyClass(payload, therapy_class_uid),
    onSuccess: async (resp: SuccessResponse<{}>) => {
      // await Promise.all([
      //   dispatch(setUserAuth(data.output_schema.user)),
      //   dispatch(setAccessToken(data.output_schema.access_token)),
      //   dispatch(setRefreshToken(data.output_schema.refresh_token)),
      // ]);
      AlertSuccess(resp.status_schema.status_message)
      getData()
      resetForm()
      closeModal()
    },
    onError: (err: ErrorResponse<{}>) => {
      // let message = data?.response.data.Message || 'Something went wrong, please try again!'
      const { data } = err.response;
      // if (data.status_schema.status_code = 700){
      //   data.status_schema.status_message = "Something went wrong, please try again"
      // }
      AlertError(data.status_schema.status_message)
    },
  })
}