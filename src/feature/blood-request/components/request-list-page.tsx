"use client";

import { useEffect, useState } from "react";
import { RequestCard } from "./request-card";
import { RequestFilters } from "./requests-filters";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { GetRequestsQueryInput, Request } from "../types";
import { RequestPagination } from "./request-pagination";
import { useMyDonateRequestListQuery } from "@/Redux/api/blood-donate-api";
import { Inbox } from "lucide-react";

export function RequestListPage() {
  const [query, setQuery] = useState<GetRequestsQueryInput>({
    page: 1,
    limit: 6,
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const delay = setTimeout(() => {
      setQuery((prev) => ({
        ...prev,
        search: searchInput || undefined,
        page: 1,
      }));
    }, 400);

    return () => clearTimeout(delay);
  }, [searchInput]);

  const { data, isLoading } = useMyDonateRequestListQuery(query);

  const requests = data?.data?.data || [];
  const total = data?.data?.meta?.total ?? 0;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <div>
          <h1 className="text-2xl font-semibold">My Blood Requests</h1>
          <p className="text-muted-foreground text-sm">
            {total} requests found
          </p>
        </div>

        <div className="flex justify-end gap-4">
          <Input
            placeholder="Search..."
            value={searchInput}
            className="w-60"
            onChange={(e) => setSearchInput(e.target.value)}
          />

          <RequestFilters query={query} setQuery={setQuery} />
        </div>
      </div>

      {/* Loading Skeleton */}
      {isLoading && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="space-y-3 border p-4 rounded-lg">
              <Skeleton className="h-5 w-1/3" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-32 w-full" />
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && requests.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center space-y-4 border rounded-lg">
          <Inbox className="h-10 w-10 text-muted-foreground" />
          <h2 className="text-lg font-semibold">No Requests Found</h2>
          <p className="text-sm text-muted-foreground">
            Try adjusting your filters or search.
          </p>
        </div>
      )}

      {/* Data */}
      {!isLoading && requests.length > 0 && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {requests.map((req: Request) => (
            <RequestCard key={req.id} request={req} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {!isLoading && requests.length > 0 && (
        <RequestPagination
          currentPage={query.page || 1}
          total={total}
          limit={query.limit || 10}
          onPageChange={(page) => setQuery((prev) => ({ ...prev, page }))}
        />
      )}
    </div>
  );
}
