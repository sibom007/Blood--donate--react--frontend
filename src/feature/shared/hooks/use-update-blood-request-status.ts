import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/helper/axiosInstance";
import { QUERY_KEYS } from "@/lib/query-keys";
import { toast } from "sonner";

export type AllowedStatusUpdate = "APPROVED" | "REJECTED";

interface UpdateStatusPayload {
  id: string;
  status: AllowedStatusUpdate;
}

export function useUpdateBloodRequestStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, status }: UpdateStatusPayload) => {
      const response = await api.patch(`/check-blood-request/${id}`, {
        status,
      });
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message);

      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.CHECK_BLOOD_REQUESTS],
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
