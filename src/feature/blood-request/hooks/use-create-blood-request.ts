import { api } from "@/helper/axiosInstance";
import { useMutation } from "@tanstack/react-query";
import type { RequestBloodInput } from "../types";
import { toast } from "sonner";

export const useCreateBloodRequest = () => {
  return useMutation({
    mutationFn: async (data: RequestBloodInput) => {
      const res = await api.post("/request", data);
      return res.data;
    },
    onSuccess: async (data) => {
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
