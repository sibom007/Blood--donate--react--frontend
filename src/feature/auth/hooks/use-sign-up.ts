import { toast } from "sonner";
import { api } from "@/helper/axiosInstance";
import { useMutation } from "@tanstack/react-query";
import type { SignUpInput } from "../types";

export const useSignUp = () => {
  return useMutation({
    mutationFn: async (data: SignUpInput) => {
      const res = await api.post("/register", data);
      return res.data;
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
