// import { ScrollArea } from "@/components/ui/scroll-area";
// import { motion } from "motion/react";
// import { useAvailableBlood } from "../hooks/use-available-blood";
// import { Calendar, DropletsIcon } from "lucide-react";
// import { getBloodTypeLabel } from "@/feature/auth/lib";
// import { LoadingState } from "@/components/loading-state";
// import { ErrorState } from "@/components/error-state";
// import { EmptyState } from "@/components/empty-state";

import { LoadingState } from "@/components/loading-state";
import { useAvailableBlood } from "../hooks/use-available-blood";
import { ErrorState } from "@/components/error-state";
import { EmptyState } from "@/components/empty-state";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "motion/react";
import { useBloodRequestStore } from "@/zustand/blood-request-zustant";
import { Calendar, DropletsIcon } from "lucide-react";
import { getBloodTypeLabel } from "@/feature/auth/lib";

// export const AvailableBlood = () => {
//   const { data, isLoading, error, refetch } = useAvailableBlood();

//   if (isLoading) {
//     return <LoadingState title="Blood loading" />;
//   }

//   if (error) {
//     return <ErrorState description={error.message} onRetry={refetch} />;
//   }

//   if (!data?.length) {
//     return <EmptyState title="No Blood Units Found" />;
//   }

//   return (
//     <div className="w-full">
//       <div className="mb-4 flex items-center justify-between">
//         <h2 className="text-lg font-semibold">Available Blood</h2>

//         <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-600">
//           {data.length} Units
//         </span>
//       </div>

//       <ScrollArea className="h-80">
//         <div className="grid grid-cols-2 gap-2">
//           {data.map((item) => (
//             <motion.div
//               key={item.id}
//               whileHover={{
//                 scale: 1.01,
//               }}
//               transition={{
//                 duration: 0.2,
//               }}
//               className="
//                 rounded-xl
//                 border
//                 bg-card
//                 p-2
//                 shadow-sm
//                 transition-all
//                 hover:border-red-200
//                 hover:shadow-lg
//               ">
//               <div className="mb-3 flex justify-center">
//                 <div className="rounded-full bg-red-50 p-3">
//                   <DropletsIcon className="size-8 text-red-500" />
//                 </div>
//               </div>

//               <div className="space-y-3">
//                 <div className="flex items-center justify-between">
//                   <span className="rounded-full bg-red-100 px-2 py-1 text-xs font-semibold text-red-600">
//                     {getBloodTypeLabel(item.bloodGroup)}
//                   </span>

//                   <span className="text-sm font-semibold">
//                     {item.quantityML} ml
//                   </span>
//                 </div>

//                 <div className="flex items-center gap-2 text-xs text-muted-foreground">
//                   <Calendar className="size-3.5" />

//                   <span>{new Date(item.expiryDate).toLocaleDateString()}</span>
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </ScrollArea>
//     </div>
//   );
// };

export const AvailableBlood = () => {
  const { data, isLoading, error, refetch } = useAvailableBlood();

  // Connect Zustand store
  const selectedInventoryId = useBloodRequestStore(
    (state) => state.selectedInventoryId,
  );
  const selectInventory = useBloodRequestStore(
    (state) => state.selectInventory,
  );

  if (isLoading) return <LoadingState title="Blood loading" />;
  if (error)
    return <ErrorState description={error.message} onRetry={refetch} />;
  if (!data?.length) return <EmptyState title="No Blood Units Found" />;

  return (
    <div className="w-full">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Available Blood</h2>

        <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-600">
          {data.length} Units
        </span>
      </div>
      <ScrollArea className="h-80">
        <div className="grid grid-cols-2 gap-2">
          {data.map((item) => {
            const isSelected = selectedInventoryId === item.id;
            return (
              <motion.div
                key={item.id}
                onClick={() => selectInventory(item.id)}
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.2 }}
                className={`
                  cursor-pointer rounded-xl border p-2 shadow-sm transition-all
                  ${
                    isSelected
                      ? "border-red-500 bg-red-50/50 shadow-md ring-2 ring-red-500/20"
                      : "bg-card hover:border-red-200 hover:shadow-lg"
                  }
                `}>
                <div className="mb-3 flex justify-center">
                  <div className="rounded-full bg-red-50 p-3">
                    <DropletsIcon className="size-8 text-red-500" />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-red-100 px-2 py-1 text-xs font-semibold text-red-600">
                      {getBloodTypeLabel(item.bloodGroup)}
                    </span>

                    <span className="text-sm font-semibold">
                      {item.quantityML} ml
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="size-3.5" />
                    <span>
                      {new Date(item.expiryDate).toLocaleDateString()}
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
