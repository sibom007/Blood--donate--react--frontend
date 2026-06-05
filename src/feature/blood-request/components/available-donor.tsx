import { useBloodRequestStore } from "@/zustand/blood-request-zustant";
import { useAvailableDonor } from "../hooks/use-available-donor";
import { LoadingState } from "@/components/loading-state";
import { ErrorState } from "@/components/error-state";
import { EmptyState } from "@/components/empty-state";
import { motion } from "motion/react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getBloodTypeLabel } from "@/feature/auth/lib";
import { MapPin, User2Icon } from "lucide-react";

export const AvailableDonor = () => {
  const { data, isLoading, error, refetch } = useAvailableDonor();

  const selectedDonorId = useBloodRequestStore(
    (state) => state.selectedDonorId,
  );
  const selectDonor = useBloodRequestStore((state) => state.selectDonor);

  if (isLoading) return <LoadingState title="Blood Donors Loading" />;
  if (error)
    return <ErrorState description={error.message} onRetry={refetch} />;
  if (!data?.length) return <EmptyState title="No Donors Found" />;

  return (
    <div className="w-full">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Available Donors</h2>

        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-600">
          {data.length} Donors
        </span>
      </div>
      <ScrollArea className="h-80 pr-3">
        <div className="grid grid-cols-2 gap-4">
          {data.map((item) => {
            const isSelected = selectedDonorId === item.id;
            return (
              <motion.div
                key={item.id}
                onClick={() => selectDonor(item.id)}
                whileHover={{ scale: 1.03, y: -3 }}
                transition={{ duration: 0.2 }}
                className={`
                  cursor-pointer rounded-xl border p-4 shadow-sm transition-all
                  ${
                    isSelected
                      ? "border-blue-500 bg-blue-50/50 shadow-md ring-2 ring-blue-500/20"
                      : "bg-card hover:border-blue-200 hover:shadow-lg"
                  }
                `}>
                <div className="mb-3 flex justify-center">
                  <div className="rounded-full bg-blue-50 p-3">
                    <User2Icon className="size-8 text-blue-500" />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className="max-w-22.5 truncate text-sm font-semibold"
                      title={item.fullName}>
                      {item.fullName}
                    </span>
                    <span className="rounded-full bg-red-100 px-2 py-1 text-xs font-semibold text-red-600">
                      {getBloodTypeLabel(item.bloodGroup)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <MapPin className="size-3.5 shrink-0" />

                    <span className="truncate">
                      {item.city || item.district || "Unknown Location"}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
};
