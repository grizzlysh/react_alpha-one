import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

import api from '@/services';
import { SuccessResponse } from '@/types/SuccessResponse.type';
import { InvoiceReadByIDResponse } from '@/services/invoice/read_by_id';

interface useInvoiceReadByIDProps {
  invoice_uid : string,
}

export const useInvoiceReadByID = ({ invoice_uid }: useInvoiceReadByIDProps) => {

  return useQuery({
    queryKey : ['invoice-get-by-id'],
    queryFn  : (payload) => api.getRoleByID(invoice_uid),
    enabled  : false,
    retry    : false,
    onSuccess: async (resp: SuccessResponse<InvoiceReadByIDResponse>) => {
      // loadData && loadData(resp.output_schema.data)
      return resp
    },
    // refetchInterval     : 1000,
    // refetchOnWindowFocus: true,
  });
}