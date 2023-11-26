import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

import api from "@/services"
import { setUserAuth, setAccessToken, setRefreshToken } from "@/stores/slices/auth.slice";
import { AlertError, AlertSuccess } from "@/utils/notification";
import { LoginRequest, LoginResponse } from "@/services/auth/login.service";
import { ServiceResponse } from "@/types/ServiceResponse.type";

export const useLogin = () => {
  const dispatch = useDispatch();
  const router   = useRouter();

  return useMutation({
    mutationKey: ['login'],
    mutationFn: (payload: LoginRequest) => api.getLogin(payload),
    onSuccess: async (data: ServiceResponse<LoginResponse>) => {
      await Promise.all([
        dispatch(setUserAuth(data.output_schema.user)),
        dispatch(setAccessToken(data.output_schema.access_token)),
        dispatch(setRefreshToken(data.output_schema.refresh_token)),
      ]);
      AlertSuccess(data.status_schema.status_message)
    },
    onError: (data: ServiceResponse<LoginResponse>) => {
      // let message = data?.response.data.Message || 'Something went wrong, please try again!'
      AlertError(data.status_schema.status_message)
    },
  })
}