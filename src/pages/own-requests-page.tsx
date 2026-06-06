import { EmptyState } from "@/components/empty-state";
import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { BloodRequestCard } from "@/feature/shared/components/own-blood-request-card";
import { useOwnBloodRequests } from "@/feature/shared/hooks/use-own-blood-requests";

import { Loader2, RefreshCw } from "lucide-react";

export default function OwnRequestPage() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isLoading,
    error,
    refetch,
  } = useOwnBloodRequests();

  return (
    <div className="min-h-screen bg-slate-50/50 p-4 md:p-8">
      {/* Dashboard Header Context */}
      <div className="max-w-7xl mx-auto mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Blood Requests
          </h1>
          <p className="text-sm text-slate-500">
            Monitor, track, and manage incoming and historical blood requests.
          </p>
        </div>
      </div>

      {/* Main Request Showcase Grid */}
      {isLoading && <LoadingState title="Requests loading..." />}
      {data?.pages[0].data.length === 0 && (
        <EmptyState title="No requests Found" />
      )}
      {error && <ErrorState description={error.message} onRetry={refetch} />}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 auto-rows-fr">
        {data?.pages.flatMap((page) =>
          page.data.map((request) => (
            <BloodRequestCard key={request.id} request={request} />
          )),
        )}
      </div>

      {/* Pagination & Infinite Loading Trigger Section */}
      <div className="mt-12 flex flex-col items-center justify-center pb-12">
        {hasNextPage ? (
          <button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 hover:border-slate-300 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 shadow-sm transition-all disabled:opacity-60">
            {isFetchingNextPage ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-slate-500" />
                <span>Loading incoming data...</span>
              </>
            ) : (
              <>
                <RefreshCw className="w-4 h-4 text-slate-400" />
                <span>Load More Requests</span>
              </>
            )}
          </button>
        ) : (
          <p className="text-xs text-slate-400 bg-slate-100 px-4 py-1.5 rounded-full">
            You've reached the end of the records
          </p>
        )}

        {isFetching && !isFetchingNextPage && (
          <p className="text-xs text-slate-400 mt-2 animate-pulse">
            Syncing background states...
          </p>
        )}
      </div>
    </div>
  );
}
