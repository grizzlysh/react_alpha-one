import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

import api from "@/services"
import { AlertError, AlertSuccess } from "@/utils/notification";
import { SuccessResponse } from "@/types/SuccessResponse.type";
import { ErrorResponse } from "@/types/ErrorResponse.type";
import { UserUpdateRequest } from "@/services/user/update";
import { UserUpdatePasswordRequest } from "@/services/user/update_password";

interface useUserUpdatePasswordProps {
  user_uid   : string,
  closeModal : ()=>void,
  resetForm ?: ()=>void,
}

export const useUserUpdatePassword = ({ user_uid, closeModal, resetForm }:useUserUpdatePasswordProps ) => {
  const dispatch = useDispatch();
  const router   = useRouter();

  return useMutation({
    mutationKey: ['user-update-password'],
    mutationFn : (payload: UserUpdatePasswordRequest) => api.updatePasswordUser(payload, user_uid),
    onSuccess  : async (resp: SuccessResponse<{}>) => {
      AlertSuccess(resp.status_schema.status_message)
      resetForm && resetForm() 
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