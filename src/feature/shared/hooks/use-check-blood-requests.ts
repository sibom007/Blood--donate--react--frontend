import { api } from "@/helper/axiosInstance";
import { QUERY_KEYS } from "@/lib/query-keys";
import type { RequestStatus } from "@/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useState } from "react";
import type { FetchRequestsResponse } from "../types";

const fetchAllBloodRequests = async (
  pageParam: number,
  status: RequestStatus | "ALL",
): Promise<FetchRequestsResponse> => {
  const response = await api.get(`/check-blood-request`, {
    params: {
      status,
      page: pageParam,
      limit: 6,
    },
  });
  return response.data.data;
};

export function useCheckBloodRequests(
  initialFilter: RequestStatus | "ALL" = "ALL",
) {
  const [filter, setFilter] = useState<RequestStatus | "ALL">(initialFilter);

  const queryResult = useInfiniteQuery<FetchRequestsResponse, Error>({
    queryKey: [QUERY_KEYS.CHECK_BLOOD_REQUESTS, filter],
    queryFn: ({ pageParam }) =>
      fetchAllBloodRequests(pageParam as number, filter),
    initialPageParam: 1,

    getNextPageParam: (lastPage) => {
      if (!lastPage.meta.hasMore) return undefined;
      return lastPage.meta.page + 1;
    },
  });

  const requests = queryResult.data?.pages.flatMap((page) => page.data) ?? [];

  return {
    ...queryResult,
    requests,
    filter,
    setFilter,
  };
}
