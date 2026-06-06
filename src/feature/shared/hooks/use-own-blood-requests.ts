import { api } from "@/helper/axiosInstance";
import { QUERY_KEYS } from "@/lib/query-keys";
import type { bloodRequest } from "@/types";
import { useInfiniteQuery } from "@tanstack/react-query";

// Shape matching your updated backend return structure
interface FetchRequestsResponse {
  data: bloodRequest[];
  nextPage: number | null;
}

const fetchOwnBloodRequests = async (
  pageParam: number,
): Promise<FetchRequestsResponse> => {
  const response = await api.get(`own-requests?page=${pageParam}&limit=12`);
  return response.data.data;
};

export function useOwnBloodRequests() {
  return useInfiniteQuery<FetchRequestsResponse, Error>({
    queryKey: [QUERY_KEYS.OWN_BLOOD_REQUESTS],
    queryFn: ({ pageParam }) => fetchOwnBloodRequests(pageParam as number),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
  });
}
