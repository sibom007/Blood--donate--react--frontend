import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button"; // Standard shadcn component
import { cn } from "@/lib/utils"; // Standard shadcn utility

interface PaginationProps {
  /** The current active page (1-indexed) */
  currentPage: number;
  /** Total count of items across all pages */
  totalItems: number;
  /** Number of items displayed per page */
  pageSize: number;
  /** Callback function when a page is clicked */
  onPageChange: (page: number) => void;
  /** How many numbers to show on either side of the current page */
  siblingCount?: number;
  /** Whether to smoothly scroll to top on page change */
  scrollToTop?: boolean;
  className?: string;
}

/**
 * A production-grade, accessible, and animated pagination component.
 * Works in any React environment with Tailwind, Shadcn, and Framer Motion.
 */
export function Pagination({
  currentPage,
  totalItems,
  pageSize,
  onPageChange,
  siblingCount = 1,
  scrollToTop = true,
  className,
}: PaginationProps) {
  const totalPages = Math.ceil(totalItems / pageSize);

  // Auto-scroll to top on page change (Optional but recommended)
  React.useEffect(() => {
    if (scrollToTop) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [currentPage, scrollToTop]);

  if (totalPages <= 1) return null;

  const generatePaginationRange = () => {
    const totalPageNumbers = siblingCount + 5;

    if (totalPageNumbers >= totalPages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 2;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);
      return [...leftRange, "DOTS", totalPages];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = Array.from(
        { length: rightItemCount },
        (_, i) => totalPages - rightItemCount + i + 1,
      );
      return [1, "DOTS", ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = Array.from(
        { length: rightSiblingIndex - leftSiblingIndex + 1 },
        (_, i) => leftSiblingIndex + i,
      );
      return [1, "DOTS", ...middleRange, "DOTS", totalPages];
    }

    return [];
  };

  const paginationRange = generatePaginationRange();

  return (
    <nav
      role="navigation"
      aria-label="Pagination Navigation"
      className={cn("flex flex-col items-center gap-4 pt-5", className)}>
      <div className="flex items-center gap-2">
        {/* Previous Button */}
        <Button
          variant="outline"
          size="icon"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="h-9 w-9 rounded-md transition-all border-slate-200">
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Previous Page</span>
        </Button>

        <div className="flex items-center gap-1.5">
          <AnimatePresence mode="popLayout" initial={false}>
            {paginationRange.map((pageNumber, index) => {
              if (pageNumber === "DOTS") {
                return (
                  <div
                    key={`dots-${index}`}
                    className="flex h-9 w-6 items-center justify-center text-muted-foreground">
                    <MoreHorizontal className="h-4 w-4" />
                  </div>
                );
              }

              const isCurrent = pageNumber === currentPage;

              return (
                <motion.div
                  key={pageNumber}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ type: "spring", duration: 0.4, bounce: 0.3 }}>
                  <Button
                    variant={isCurrent ? "default" : "ghost"}
                    size="icon"
                    onClick={() => onPageChange(Number(pageNumber))}
                    className={cn(
                      "h-9 w-9 rounded-md font-medium text-sm transition-colors",
                      isCurrent
                        ? "shadow-sm"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
                    )}
                    aria-current={isCurrent ? "page" : undefined}>
                    {pageNumber}
                  </Button>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Next Button */}
        <Button
          variant="outline"
          size="icon"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="h-9 w-9 rounded-md transition-all border-slate-200">
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Next Page</span>
        </Button>
      </div>

      {/* Info Stats */}
      <div className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
        <span>Page {currentPage}</span>
        <span className="h-1 w-1 rounded-full bg-slate-300" />
        <span>Total {totalPages} Pages</span>
      </div>
    </nav>
  );
}
