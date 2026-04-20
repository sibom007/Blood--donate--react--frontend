import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

type Props = {
  currentPage: number;
  total: number;
  limit: number;
  onPageChange: (page: number) => void;
};

export function RequestPagination({
  currentPage,
  total,
  limit,
  onPageChange,
}: Props) {
  const totalPages = Math.ceil(total / limit);

  if (totalPages <= 1) return null;

  //  Smart pagination logic (handles 50+ pages)
  const generatePages = () => {
    const pages: (number | "ellipsis")[] = [];

    const siblingCount = 1; // pages around current
    const showLeftEllipsis = currentPage > 3;
    const showRightEllipsis = currentPage < totalPages - 2;

    // always show first page
    pages.push(1);

    if (showLeftEllipsis) {
      pages.push("ellipsis");
    }

    // middle pages
    const start = Math.max(2, currentPage - siblingCount);
    const end = Math.min(totalPages - 1, currentPage + siblingCount);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (showRightEllipsis) {
      pages.push("ellipsis");
    }

    // always show last page (if more than 1)
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  const pages = generatePages();

  return (
    <motion.div
      className="mt-8 flex justify-center"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}>
      <div className="flex items-center gap-2 flex-wrap">
        {/* Prev */}
        <Button
          variant="outline"
          size="sm"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="disabled:opacity-50">
          Prev
        </Button>

        {/* Pages */}
        {pages.map((item, index) => {
          if (item === "ellipsis") {
            return (
              <span
                key={`ellipsis-${index}`}
                className="px-2 text-muted-foreground">
                ...
              </span>
            );
          }

          const isActive = currentPage === item;

          return (
            <motion.div key={`page-${item}`} whileTap={{ scale: 0.9 }}>
              <Button
                size="sm"
                variant={isActive ? "default" : "outline"}
                onClick={() => onPageChange(item)}
                className="min-w-9">
                {item}
              </Button>
            </motion.div>
          );
        })}

        {/* Next */}
        <Button
          variant="outline"
          size="sm"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="disabled:opacity-50">
          Next
        </Button>
      </div>
    </motion.div>
  );
}
