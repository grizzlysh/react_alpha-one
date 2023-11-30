import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

import api from "@/services"
import { userLogout } from "@/stores/slices/auth.slice";
import { AlertError, AlertSuccess } from "@/utils/notification";
import { SuccessResponse } from "@/types/SuccessResponse.type";
import { ErrorResponse } from "@/types/ErrorResponse.type";

const useLogout = () => {
  const dispatch = useDispatch();
  const router   = useRouter();

  return {
    logout : () => {
      dispatch(userLogout())
      router.replace('/login')
      AlertSuccess("Logout Success")
    }
  }
  // return useQuery({
  //   queryKey : ['logout'],
  //   queryFn  : () => api.getAuthLogout(),
  //   enabled  : false,
  //   retry    : false,
  //   onSuccess: async () => {
  //     await Promise.all([ dispatch(userLogout()) ]);

  //     router.replace('/login');
  //     AlertSuccess("Logout Success")
  //   },
  // });
};

export default useLogout;