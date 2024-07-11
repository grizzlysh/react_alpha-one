import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

import api from "@/services"
import { AlertError, AlertSuccess } from "@/utils/notification";
import { SuccessResponse } from "@/types/SuccessResponse.type";
import { ErrorResponse } from "@/types/ErrorResponse.type";
import { InvoiceDeleteRequest } from "@/services/invoice/delete";

interface useInvoiceDeleteProps {
  invoice_uid  : string,
}

export const useInvoiceDelete = ({ invoice_uid }:useInvoiceDeleteProps) => {
  const dispatch = useDispatch();
  const router   = useRouter();

  return useMutation({
    mutationKey: ['invoice-delete'],
    mutationFn : (payload: InvoiceDeleteRequest) => api.deleteInvoice(payload, invoice_uid),
    onSuccess  : async (resp: SuccessResponse<{}>) => {
      AlertSuccess(resp.status_schema.status_message)
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