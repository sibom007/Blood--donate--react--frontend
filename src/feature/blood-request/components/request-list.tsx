import { motion, AnimatePresence } from "framer-motion";
import { Droplet, MapPin, Clock } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import type { BloodRequest } from "../types";
import { Link } from "react-router";

interface RequestListProps {
  items: BloodRequest[] | undefined;
  isLoading: boolean;
  isPlaceholderData?: boolean;
}

export const RequestList = ({
  items,
  isLoading,
  isPlaceholderData,
}: RequestListProps) => {
  if (isLoading && !items) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <CardHeader className="space-y-2">
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-3/4" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-20 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!items || items.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex min-h-100 flex-col items-center justify-center rounded-xl border-2 border-dashed p-12 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 mb-6">
          <Droplet className="h-10 w-10 text-primary animate-pulse" />
        </div>
        <h3 className="text-xl font-bold tracking-tight">No requests found</h3>
        <p className="text-muted-foreground mt-2 max-w-xs mx-auto">
          Adjust your filters or search criteria to find what you're looking
          for.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",
        isPlaceholderData && "opacity-50",
      )}>
      <AnimatePresence mode="popLayout">
        {items.map((request) => (
          <motion.div
            key={request.id}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}>
            <Card className="h-full hover:shadow-lg transition-all border-l-4 border-l-primary flex flex-col">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg font-bold">
                    {request.patientName}
                  </CardTitle>
                  <Badge
                    variant={
                      request.urgency === "CRITICAL" ? "destructive" : "outline"
                    }>
                    {request.urgency}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 flex-1">
                <div className="flex items-center gap-2 font-semibold">
                  <Droplet className="h-4 w-4 text-primary" />
                  {request.bloodGroup} • {request.unitsNeeded} Units
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 shrink-0" />
                  <span className="line-clamp-1">
                    {request.hospitalAddress}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4 shrink-0" />
                  {format(new Date(request.neededAt), "MMM d, yyyy h:mm a")}
                </div>
              </CardContent>
              <CardFooter className="bg-slate-50/50 pt-4">
                <Button className="w-full" variant="secondary" asChild>
                  <Link
                    to={`/dashboard/all-request/${request.patientName}`}
                    state={{ id: request.id }}>
                    View Details
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
};
