"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { CalendarDays, Phone, MapPin, Activity, Droplet } from "lucide-react";
import { format } from "date-fns";
import { useGetRequestDetailsQuery } from "@/Redux/api/blood-donate-api";

type Props = {
  requestId: string;
};

export default function SingleRequest({ requestId }: Props) {
  const id = requestId.split("-").pop();

  const { data, isLoading, isError } = useGetRequestDetailsQuery(id);
  const request = data?.data;

  // Loading
  if (isLoading) {
    return (
      <div className="w-full min-h-screen p-8 space-y-6">
        <Skeleton className="h-10 w-1/3" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  // Error
  if (isError || !request) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Failed to load request.</p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen p-6 lg:p-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Blood Request
          </h1>
          <p className="text-muted-foreground">
            Created at {format(new Date(request.createdAt), "PPP")}
          </p>
        </div>

        <div className="flex gap-2 flex-wrap">
          <Badge variant="destructive" className="text-base px-3 py-1">
            {request.bloodType}
          </Badge>
          <Badge variant="outline">{request.requestStatus}</Badge>
          <Badge>{request.urgency}</Badge>
        </div>
      </div>

      {/* Full Width Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Droplet className="h-5 w-5" />
            Request Information
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-8">
          <div className="grid md:grid-cols-2 gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span>{request.phoneNumber}</span>
            </div>

            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-muted-foreground" />
              <span>{format(new Date(request.dateOfDonation), "PPP")}</span>
            </div>

            <div className="flex items-start gap-2 md:col-span-2">
              <MapPin className="h-4 w-4 text-muted-foreground mt-1" />
              <div>
                <p className="font-medium text-base">{request.hospitalName}</p>
                <p className="text-muted-foreground">
                  {request.hospitalAddress}
                </p>
              </div>
            </div>
          </div>

          {request.description && (
            <>
              <Separator />
              <div>
                <p className="font-medium mb-2">Description</p>
                <p className="text-muted-foreground leading-relaxed">
                  {request.description}
                </p>
              </div>
            </>
          )}

          {/* Donor Section Inline */}
          {request.donner && (
            <>
              <Separator />
              <div>
                <p className="font-medium mb-3 flex items-center gap-2">
                  <Activity className="h-4 w-4" /> Donor Information
                </p>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <p>
                    <span className="font-medium">Name:</span>{" "}
                    {request.donner.name}
                  </p>
                  <p>
                    <span className="font-medium">Phone:</span>{" "}
                    {request.donner.phoneNumber}
                  </p>
                  <p>
                    <span className="font-medium">Blood:</span>{" "}
                    {request.donner.bloodType}
                  </p>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
