import { api } from "@/helper/axiosInstance";
import { QUERY_KEYS } from "@/lib/query-keys";
import type { user } from "@/types";

import { useQuery } from "@tanstack/react-query";

export const useAvailableDonor = () => {
  return useQuery<user[]>({
    queryKey: [QUERY_KEYS.AVAILABLE_DONOR],
    queryFn: async () => {
      const res = await api.get("/available-donor");
      return res.data.data;
    },
  });
};
