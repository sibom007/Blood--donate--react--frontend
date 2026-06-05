import { Pagination } from "@/components/pagination";
import { Spinner } from "@/components/ui/spinner";
import { RequestFilters } from "@/feature/blood-request/components/request-filters";
import { RequestList } from "@/feature/blood-request/components/request-list";

import { useGetOwnRequests } from "@/feature/blood-request/hooks/use-get-own-requests";
import type { FilterValues } from "@/feature/blood-request/types";
import { useState } from "react";

function AllRequestPage() {
  const [filters, setFilters] = useState<FilterValues>({
    search: "",
    bloodGroup: "ALL",
    status: "ALL",
    urgency: "ALL",
    date: undefined,
    page: 1,
    limit: 6,
  });

  const { data, isPlaceholderData, isLoading } = useGetOwnRequests(filters);

  const handleFilterChange = (newFilters: FilterValues) => {
    setFilters(newFilters);
  };

  const requests = data?.data || []; // The (6) [{...}] array
  const pagination = data?.meta; // The {total, page, limit, totalPage} object

  return (
    <div>
      <header className="mb-8 space-y-2 flex justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            My Blood Requests
          </h1>
          <p className="text-muted-foreground text-lg sm:text-sm">
            Manage and track your active blood donation requests, monitor status{" "}
            <br />
            updates, and filter through your history.
          </p>
        </div>
        <RequestFilters onFilterChange={handleFilterChange} />
      </header>

      <div className={isPlaceholderData ? "opacity-50 transition-opacity" : ""}>
        {isLoading ? (
          <div className="flex h-64 w-full items-center justify-center">
            <Spinner className="size-10" />
          </div>
        ) : (
          <RequestList
            isLoading={isLoading}
            isPlaceholderData={isPlaceholderData}
            items={requests}
          />
        )}
      </div>
      {pagination && (
        <Pagination
          currentPage={pagination.page}
          totalItems={pagination.total}
          pageSize={pagination.limit}
          onPageChange={(newPage) =>
            setFilters((prev) => ({ ...prev, page: newPage }))
          }
        />
      )}
    </div>
  );
}

export default AllRequestPage;
