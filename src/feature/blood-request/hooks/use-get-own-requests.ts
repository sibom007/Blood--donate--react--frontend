import { useQuery } from "@tanstack/react-query";
import { type FilterValues } from "../types";
import { api } from "@/helper/axiosInstance";
import { QUERY_KEYS } from "@/lib/query-keys";

const fetchRequests = async (filters: FilterValues) => {
  const response = await api.get("/own-requests", {
    params: {
      searchTerm: filters.search || undefined,
      bloodGroup: filters.bloodGroup !== "ALL" ? filters.bloodGroup : undefined,
      status: filters.status !== "ALL" ? filters.status : undefined,
      urgency: filters.urgency !== "ALL" ? filters.urgency : undefined,
      date: filters.date ? filters.date.toISOString() : undefined,
      page: filters.page || 1,
      limit: filters.limit || 6,
    },
  });

  return response.data.data;
};

export const useGetOwnRequests = (filters: FilterValues) => {
  return useQuery({
    queryKey: [QUERY_KEYS.OWN_REQUESTS, filters],
    queryFn: () => fetchRequests(filters),
    placeholderData: (previousData) => previousData,
    // Adjust stale time based on how often blood requests update
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
