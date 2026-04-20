import { toast } from "sonner";
import { api } from "@/helper/axiosInstance";
import { useMutation } from "@tanstack/react-query";
import type { SignUpPayloadType } from "../type";

export const useSignUp = () => {
  return useMutation({
    mutationFn: async (data: SignUpPayloadType) => {
      const res = await api.post("/create-user", data);
      return res.data;
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
