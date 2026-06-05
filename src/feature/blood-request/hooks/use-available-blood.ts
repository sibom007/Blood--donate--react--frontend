import { api } from "@/helper/axiosInstance";
import { QUERY_KEYS } from "@/lib/query-keys";
import type { inventory } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useAvailableBlood = () => {
  return useQuery<inventory[]>({
    queryKey: [QUERY_KEYS.AVAILABLE_BLOOD],
    queryFn: async () => {
      const res = await api.get("/inventory/available-blood");
      return res.data.data;
    },
  });
};
