import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

import api from "@/services"
import { AlertError, AlertSuccess } from "@/utils/notification";
import { SuccessResponse } from "@/types/SuccessResponse.type";
import { ErrorResponse } from "@/types/ErrorResponse.type";
import { InvoiceUpdateRequest } from "@/services/invoice/update";

interface useInvoiceUpdateProps {
  invoice_uid: string,
}

export const useInvoiceUpdate = ({ invoice_uid }:useInvoiceUpdateProps ) => {
  const dispatch = useDispatch();
  const router   = useRouter();

  return useMutation({
    mutationKey: ['invoice-update'],
    mutationFn : (payload: InvoiceUpdateRequest) => api.updateInvoice(payload, invoice_uid),
    onSuccess  : async (resp: SuccessResponse<{}>) => {
      AlertSuccess(resp.status_schema.status_message)
      router.push('/invoice', undefined, { shallow: true })
    },
    onError: (err: ErrorResponse<{}>) => {
      const { data } = err.response;
      AlertError(data.status_schema.status_message)
    },
  })
}