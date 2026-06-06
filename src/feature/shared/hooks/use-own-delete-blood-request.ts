import { toast } from "sonner";
import { api } from "@/helper/axiosInstance";
import { QUERY_KEYS } from "@/lib/query-keys";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const deleteBloodRequestApi = async (requestId: string): Promise<void> => {
  const response = await api.delete(`/own-requests/${requestId}`);
  return response.data.data;
};

export function useOwnDeleteBloodRequest() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: (requestId: string) => deleteBloodRequestApi(requestId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.OWN_BLOOD_REQUESTS],
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
