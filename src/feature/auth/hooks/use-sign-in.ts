import { api } from "@/helper/axiosInstance";
import useAuthStore from "@/zustand/auth-zustand";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useSignIn = () => {
  return useMutation({
    mutationFn: async (data: { email: string; password: string }) => {
      const res = await api.post("/auth/login", data);
      return res.data;
    },
    onSuccess: async (data) => {
      useAuthStore.setState({
        accessToken: data.data.accessToken,
        user: data.data.user,
        isAuthenticated: true,
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
