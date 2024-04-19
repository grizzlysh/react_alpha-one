import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

import api from "@/services"
import { AlertError, AlertSuccess } from "@/utils/notification";
import { SuccessResponse } from "@/types/SuccessResponse.type";
import { ErrorResponse } from "@/types/ErrorResponse.type";
import { DistributorUpdateRequest } from "@/services/distributor/update";

interface useDistributorUpdateProps {
  distributor_uid: string,
  getData     : ()=>void,
  closeModal  : ()=>void,
  resetForm   : ()=>void,
}

export const useDistributorUpdate = ({ distributor_uid, getData, closeModal, resetForm }:useDistributorUpdateProps ) => {
  const dispatch = useDispatch();
  const router   = useRouter();

  return useMutation({
    mutationKey: ['distributor-update'],
    mutationFn : (payload: DistributorUpdateRequest) => api.updateDistributor(payload, distributor_uid),
    onSuccess  : async (resp: SuccessResponse<{}>) => {
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