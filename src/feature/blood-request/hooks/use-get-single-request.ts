import { useQuery } from "@tanstack/react-query";
import type { BloodRequest } from "../types";
import { api } from "@/helper/axiosInstance";
import { QUERY_KEYS } from "@/lib/query-keys";

export const useRequestDetail = (id: string | undefined) => {
  return useQuery<BloodRequest>({
    queryKey: [QUERY_KEYS.OWN_REQUESTS_DETAIL, id],
    queryFn: async () => {
      if (!id) throw new Error("Request ID is required");

      const res = await api.get(`/request/${id}`);
      return res.data.data;
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
};
