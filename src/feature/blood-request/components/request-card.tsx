import { Button } from "@/components/ui/button";
import { Request } from "../types";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { cn, slugify } from "@/lib/utils";
import { formatBlood } from "../lib";
import {
  ArrowRightIcon,
  CalendarClockIcon,
  DropletIcon,
  HospitalIcon,
  MapPinIcon,
  PhoneIcon,
  UserIcon,
} from "lucide-react";
import Link from "next/link";

const urgencyConfig = {
  CRITICAL: {
    bg: "bg-red-50",
    border: "border-red-200",
    badge: "bg-red-100 text-red-700 border-red-200",
    dot: "bg-red-500",
    label: "Critical",
  },
  URGENT: {
    bg: "bg-amber-50",
    border: "border-amber-200",
    badge: "bg-amber-100 text-amber-700 border-amber-200",
    dot: "bg-amber-500",
    label: "Urgent",
  },
  NORMAL: {
    bg: "bg-blue-50",
    border: "border-blue-200",
    badge: "bg-blue-100 text-blue-700 border-blue-200",
    dot: "bg-blue-500",
    label: "Normal",
  },
};

const statusConfig = {
  PENDING: {
    label: "Pending",
    badge: "bg-slate-100 text-slate-700 border-slate-200",
  },
  ACCEPTED: {
    label: "Accepted",
    badge: "bg-green-100 text-green-700 border-green-200",
  },
  COMPLETED: {
    label: "Completed",
    badge: "bg-purple-100 text-purple-700 border-purple-200",
  },
};

export function RequestCard({ request }: { request: Request }) {
  const urgency = urgencyConfig[request.urgency];
  const status = statusConfig[request.requestStatus];

  return (
    <Card className={cn("p-0 border-2", urgency.border)}>
      {/* Header */}
      <CardHeader
        className={cn("flex justify-between items-center py-2 ", urgency.bg)}>
        <h2 className="text-2xl font-bold text-red-500 flex gap-2 items-center">
          <DropletIcon
            className={cn("w-9 h-9 text-white  p-0.5 rounded-sm ", urgency.dot)}
          />
          {formatBlood(request.bloodType)}
        </h2>

        <div className="flex gap-1">
          <span
            className={cn("text-xs px-2 py-1 rounded border", urgency.badge)}>
            {urgency.label}
          </span>

          <span
            className={cn("text-xs px-2 py-1 rounded border", status.badge)}>
            {status.label}
          </span>
        </div>
      </CardHeader>

      {/* Content */}
      <CardContent className="space-y-3">
        {/* Hospital Name */}
        <div className="flex items-center gap-2 text-sm">
          <HospitalIcon className="w-4 h-4 text-muted-foreground" />
          <span className="text-muted-foreground">Hospital:</span>
          <span className="font-semibold">{request.hospitalName}</span>
        </div>

        {/* Address */}
        <div className="flex items-start gap-2 text-sm text-muted-foreground">
          <MapPinIcon className="w-4 h-4 mt-0.5" />
          <span>{request.hospitalAddress}</span>
        </div>

        {/* Phone */}
        <div className="flex items-center gap-2 text-sm">
          <PhoneIcon className="w-4 h-4 text-muted-foreground" />
          <span>{request.phoneNumber}</span>
        </div>

        {/* Date & Time */}
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <CalendarClockIcon className="w-4 h-4" />
          <span>
            {new Date(request.dateOfDonation).toLocaleString([], {
              dateStyle: "medium",
              timeStyle: "short",
            })}
          </span>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-3 p-4 pt-2">
        {/* Donor Info */}
        {!request.donorId && (
          <div className="flex items-center gap-2 w-full rounded-lg border bg-muted px-3 py-2 text-sm">
            <UserIcon className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground">Donor :</span>
            <span className="font-medium">
              {request.donner?.name || "Sibom"}
            </span>
          </div>
        )}

        {/* Action Button */}
        <Link
          className="w-full"
          href={`/dashboard/all-request/${slugify(request.hospitalName)}-${request.id}`}>
          <Button className="w-full">
            View Details
            <ArrowRightIcon className="w-4 h-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
