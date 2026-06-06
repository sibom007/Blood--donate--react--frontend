import { useEffect, useRef } from "react";
import {
  CircleDotIcon,
  BadgeCheckIcon,
  CircleXIcon,
  CalendarCheckIcon,
  TicketXIcon,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCheckBloodRequests } from "@/feature/shared/hooks/use-check-blood-requests";

import type { RequestStatus } from "@/types";
import { CheckBloodRequestCard } from "@/feature/shared/components/check-blood-request-card";
import { LoadingState } from "@/components/loading-state";
import { EmptyState } from "@/components/empty-state";
import { ErrorState } from "@/components/error-state";
import { useUpdateBloodRequestStatus } from "@/feature/shared/hooks/use-update-blood-request-status";

export function CheckRequestPage() {
  const observerTarget = useRef<HTMLDivElement | null>(null);

  const {
    requests,
    filter,
    setFilter,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    refetch,
    error,
  } = useCheckBloodRequests();

  const { mutate: handleUpdateStatus, isPending: isUpdating } =
    useUpdateBloodRequestStatus();

  useEffect(() => {
    const target = observerTarget.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1, rootMargin: "100px" },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <div className="min-h-screen container mx-auto p-4 max-w-6xl space-y-6 mt-5">
      {/* Header Controls Block */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Review Blood Requests
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage incoming processing lines, approve actions, or cancel
            emergency allocation parameters.
          </p>
        </div>

        {/* Status Filter Dropdown */}
        <div className="w-full sm:w-50">
          <label className="text-xs font-semibold text-muted-foreground tracking-wider mb-1 block">
            Filter Status
          </label>
          <Select
            value={filter}
            onValueChange={(value) =>
              setFilter(value as RequestStatus | "ALL")
            }>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Requests</SelectItem>
              <SelectItem value="PENDING">
                <div className="flex items-center gap-2">
                  <CircleDotIcon className="h-4 w-4 text-amber-500" /> Pending
                </div>
              </SelectItem>
              <SelectItem value="APPROVED">
                <div className="flex items-center gap-2">
                  <BadgeCheckIcon className="h-4 w-4 text-emerald-500" />{" "}
                  Approved
                </div>
              </SelectItem>
              <SelectItem value="REJECTED">
                <div className="flex items-center gap-2">
                  <CircleXIcon className="h-4 w-4 text-destructive" /> Rejected
                </div>
              </SelectItem>
              <SelectItem value="COMPLETED">
                <div className="flex items-center gap-2">
                  <CalendarCheckIcon className="h-4 w-4 text-blue-500" />{" "}
                  Completed
                </div>
              </SelectItem>
              <SelectItem value="CANCELLED">
                <div className="flex items-center gap-2">
                  <TicketXIcon className="h-4 w-4 text-muted-foreground" />{" "}
                  Cancelled
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      {error && (
        <ErrorState
          title="Data Fetch Failed"
          description={error.message}
          onRetry={refetch}
        />
      )}

      {isLoading && !isFetchingNextPage && (
        <LoadingState title="Requests are loading..." />
      )}

      {!isLoading && !error && requests.length === 0 && (
        <EmptyState title="No requests found" />
      )}
      {!isLoading && !error && requests.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {requests.map((item) => (
            <CheckBloodRequestCard
              key={item.id}
              item={item}
              isUpdating={isUpdating}
              onUpdateStatus={handleUpdateStatus}
            />
          ))}
        </div>
      )}

      <div
        ref={observerTarget}
        className="h-10 w-full flex items-center justify-center text-xs text-muted-foreground">
        {hasNextPage && "Scrolling down pulls older storage records..."}
        {!hasNextPage &&
          requests.length > 0 &&
          "End of processing database stream achieved."}
      </div>
    </div>
  );
}

export default CheckRequestPage;
