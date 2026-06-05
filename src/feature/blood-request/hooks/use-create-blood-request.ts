import { api } from "@/helper/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { RequestBloodInput } from "../types";
import { toast } from "sonner";
import { QUERY_KEYS } from "@/lib/query-keys";

export const useCreateBloodRequest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: RequestBloodInput) => {
      const res = await api.post("/request", data);
      return res.data;
    },
    onSuccess: async (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.OWN_REQUESTS] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
