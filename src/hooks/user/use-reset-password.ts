import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

import api from "@/services"
import { AlertError, AlertSuccess } from "@/utils/notification";
import { SuccessResponse } from "@/types/SuccessResponse.type";
import { ErrorResponse } from "@/types/ErrorResponse.type";
import { UserUpdateRequest } from "@/services/user/update";
import { UserResetPasswordRequest } from "@/services/user/reset_password";

interface useUserResetPasswordProps {
  user_uid  : string,
  closeModal: ()=>void,
  resetForm : ()=>void,
}

export const useUserResetPassword = ({ user_uid, closeModal, resetForm }:useUserResetPasswordProps ) => {
  const dispatch = useDispatch();
  const router   = useRouter();

  return useMutation({
    mutationKey: ['user-reset-password'],
    mutationFn : (payload: UserResetPasswordRequest) => api.resetPasswordUser(payload, user_uid),
    onSuccess  : async (resp: SuccessResponse<{}>) => {
      AlertSuccess(resp.status_schema.status_message)
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