import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

import api from "@/services"
import { AlertError, AlertSuccess } from "@/utils/notification";
import { SuccessResponse } from "@/types/SuccessResponse.type";
import { ErrorResponse } from "@/types/ErrorResponse.type";
import { RoleCreateRequest } from "@/services/role/create";
import { redirect } from "next/navigation";

// interface useRoleCreateProps {
//   getData   : ()=>void,
//   closeModal: ()=>void,
// }
// {getData, closeModal}: useRoleCreateProps

export const useRoleCreate = () => {
  const dispatch = useDispatch();
  const router   = useRouter();

  return useMutation({
    mutationKey: ['role-create'],
    mutationFn : (payload: RoleCreateRequest) => api.createRole(payload),
    onSuccess  : async (resp: SuccessResponse<{}>) => {
      AlertSuccess(resp.status_schema.status_message)
      router.push('/role', undefined, { shallow: true })
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