import {
  Calendar,
  MapPin,
  Phone,
  User,
  CheckCircle2,
  XCircle,
  Droplets,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { bloodRequest, RequestStatus } from "@/types";
import type { AllowedStatusUpdate } from "../hooks/use-update-blood-request-status";

const statusStyles: Record<RequestStatus, string> = {
  PENDING: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  APPROVED: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  REJECTED: "bg-destructive/10 text-destructive border-destructive/20",
  COMPLETED: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  CANCELLED: "bg-muted text-muted-foreground border-muted-foreground/20",
};

interface BloodRequestCardProps {
  item: bloodRequest;
  isUpdating: boolean;
  onUpdateStatus: (payload: {
    id: string;
    status: AllowedStatusUpdate;
  }) => void;
}

export function CheckBloodRequestCard({
  item,
  isUpdating,
  onUpdateStatus,
}: BloodRequestCardProps) {
  return (
    <Card className="flex flex-col shadow-sm border hover:shadow-md transition-all duration-200">
      {/* Header Info */}
      <CardHeader className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 space-y-0 pb-3">
        <div className="space-y-1.5 max-w-full sm:max-w-[70%]">
          <CardTitle className="text-xl font-bold tracking-tight text-slate-900 wrap-break-word">
            {item.patientName}
          </CardTitle>
          <CardDescription className="text-xs space-y-1 text-muted-foreground">
            <p className="font-medium">
              Age: {item.patientAge || "N/A"} • Requester:{" "}
              <span className="text-foreground">
                {item.requester?.fullName || "N/A"}
              </span>
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-slate-600 mt-2 bg-slate-50 dark:bg-slate-900/50 p-2 rounded-md border border-dashed">
              <p className="truncate">
                <span className="font-semibold text-xs text-muted-foreground">
                  Donor:
                </span>{" "}
                <span
                  className={
                    item.donor?.fullName
                      ? "font-semibold text-emerald-600"
                      : "italic text-muted-foreground"
                  }>
                  {item.donor?.fullName || "None assigned"}
                </span>
              </p>
              {item.donor?.phone && (
                <p className="flex items-center gap-1 text-xs shrink-0">
                  <span className="font-semibold text-xs text-muted-foreground">
                    Phone:
                  </span>{" "}
                  <a
                    href={`tel:${item.donor.phone}`}
                    className="hover:underline text-primary font-medium">
                    {item.donor.phone}
                  </a>
                </p>
              )}
            </div>
          </CardDescription>
        </div>

        {/* Badges Stack */}
        <div className="flex  items-center  gap-2 shrink-0 ">
          <Badge
            variant="destructive"
            className="font-bold tracking-wide shadow-sm px-2.5 py-0.5">
            {item.bloodGroup}
          </Badge>
          <Badge
            variant="outline"
            className={`${statusStyles[item.status]} px-2 py-0.5 text-xs font-semibold capitalize tracking-wider shadow-sm`}>
            {item.status.toLowerCase()}
          </Badge>
        </div>
      </CardHeader>

      {/* Main Form Fields Info Content */}
      <CardContent className="text-sm space-y-4 flex-1">
        {/* Hospital Address Parameters */}
        <div className="space-y-1.5 p-3 rounded-lg bg-muted/40 border border-muted/20">
          <div className="flex items-start gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
            <div className="min-w-0">
              <span className="font-semibold text-slate-800 block truncate">
                {item.hospitalName}
              </span>
              <span className="text-xs text-muted-foreground block line-clamp-2">
                {item.hospitalAddress}
              </span>
            </div>
          </div>
        </div>

        {/* Timestamps and Volume parameters */}
        <div className="grid grid-cols-2 gap-2 text-xs border-y py-2 border-slate-100">
          <div className="flex items-center gap-2 text-muted-foreground min-w-0">
            <Calendar className="h-3.5 w-3.5 shrink-0 text-slate-400" />
            <span className="truncate">
              Need:{" "}
              {new Date(item.requiredDate).toLocaleDateString(undefined, {
                dateStyle: "medium",
              })}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground justify-end shrink-0">
            <Droplets className="h-3.5 w-3.5 text-destructive shrink-0 animate-pulse" />
            <span className="font-semibold text-slate-900">
              {item.unitsRequired} {item.unitsRequired === 1 ? "Unit" : "Units"}
            </span>
          </div>
        </div>

        {/* Contact info details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-xs">
          <div className="flex items-center gap-1.5 text-muted-foreground min-w-0">
            <User className="h-3.5 w-3.5 text-slate-400 shrink-0" />
            <span className="truncate">Contact: {item.contactPerson}</span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground sm:justify-end min-w-0">
            <Phone className="h-3.5 w-3.5 text-slate-400 shrink-0" />
            <a
              href={`tel:${item.contactPhone}`}
              className="hover:underline text-primary font-medium truncate">
              {item.contactPhone}
            </a>
          </div>
        </div>

        {/* Reason block */}
        {item.reason && (
          <p className="text-xs italic bg-slate-50 dark:bg-slate-900/40 p-2.5 rounded border border-dashed text-muted-foreground line-clamp-2">
            "{item.reason}"
          </p>
        )}
      </CardContent>

      {/* Control Actions Footer */}
      {item.status === "PENDING" && (
        <CardFooter className="grid grid-cols-2 gap-2 pt-3 border-t bg-muted/10">
          <Button
            variant="destructive"
            size="sm"
            className="w-full shadow-sm font-medium transition-colors"
            disabled={isUpdating}
            isLoading={isUpdating}
            onClick={() => onUpdateStatus({ id: item.id, status: "REJECTED" })}>
            <XCircle className="h-4 w-4 mr-1.5" />
            Reject
          </Button>
          <Button
            size="sm"
            className="w-full shadow-sm font-medium transition-colors"
            disabled={isUpdating}
            isLoading={isUpdating}
            onClick={() => onUpdateStatus({ id: item.id, status: "APPROVED" })}>
            <CheckCircle2 className="h-4 w-4 mr-1.5" />
            Approve
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
