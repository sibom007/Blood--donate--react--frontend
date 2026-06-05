import { api } from "@/helper/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { QUERY_KEYS } from "@/lib/query-keys";
import type { CreateBloodRequestInput } from "../types";

export const useCreateBloodRequest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: CreateBloodRequestInput) => {
      const res = await api.post("/blood-request", data);
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
