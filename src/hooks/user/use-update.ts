import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

import api from "@/services"
import { AlertError, AlertSuccess } from "@/utils/notification";
import { SuccessResponse } from "@/types/SuccessResponse.type";
import { ErrorResponse } from "@/types/ErrorResponse.type";
import { UserUpdateRequest } from "@/services/user/update";

interface useUserUpdateProps {
  user_uid  : string,
  getData   : ()=>void,
  closeModal: ()=>void,
  resetForm : ()=>void,
}

export const useUserUpdate = ({ user_uid, getData, closeModal, resetForm }:useUserUpdateProps ) => {
  const dispatch = useDispatch();
  const router   = useRouter();

  return useMutation({
    mutationKey: ['user-update'],
    mutationFn : (payload: UserUpdateRequest) => api.updateUser(payload, user_uid),
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