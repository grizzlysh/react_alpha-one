import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

import api from "@/services"
import { setUserAuth, setAccessToken, setRefreshToken } from "@/stores/slices/auth.slice";
import { AlertError, AlertSuccess } from "@/utils/notification";
import { LoginRequest, LoginResponse } from "@/services/auth/login.service";
import { SuccessResponse } from "@/types/SuccessResponse.type";
import { ErrorResponse } from "@/types/ErrorResponse.type";

export const useLogin = () => {
  const dispatch = useDispatch();
  const router   = useRouter();

  return useMutation({
    mutationKey: ['login'],
    mutationFn: (payload: LoginRequest) => api.getAuthLogin(payload),
    onSuccess: async (data: SuccessResponse<LoginResponse>) => {
      await Promise.all([
        dispatch(setUserAuth(data.output_schema.user)),
        dispatch(setAccessToken(data.output_schema.access_token)),
        dispatch(setRefreshToken(data.output_schema.refresh_token)),
      ]);
      AlertSuccess(data.status_schema.status_message)
    },
    onError: (err: ErrorResponse<LoginResponse>) => {
      // let message = data?.response.data.Message || 'Something went wrong, please try again!'
      const { data } = err.response; 
      AlertError(data.status_schema.status_message)
    },
  })
}