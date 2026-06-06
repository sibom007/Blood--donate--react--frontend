import type { bloodRequest } from "@/types";

export interface FetchRequestsResponse {
  data: bloodRequest;
  meta: {
    page: number;
    limit: number;
    totalCount: number;
    hasMore: boolean;
  };
}
