import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

import api from "@/services"
import { AlertError, AlertSuccess } from "@/utils/notification";
import { SuccessResponse } from "@/types/SuccessResponse.type";
import { ErrorResponse } from "@/types/ErrorResponse.type";
import { RoleUpdateRequest } from "@/services/role/update";

interface useRoleUpdateProps {
  role_uid: string,
}

export const useRoleUpdate = ({ role_uid }:useRoleUpdateProps ) => {
  const dispatch = useDispatch();
  const router   = useRouter();

  return useMutation({
    mutationKey: ['role-update'],
    mutationFn : (payload: RoleUpdateRequest) => api.updateRole(payload, role_uid),
    onSuccess  : async (resp: SuccessResponse<{}>) => {
      AlertSuccess(resp.status_schema.status_message)
      router.push('/role', undefined, { shallow: true })
    },
    onError: (err: ErrorResponse<{}>) => {
      const { data } = err.response;
      AlertError(data.status_schema.status_message)
    },
  })
}