import { useNavigate, useLocation } from "react-router";

import {
  Droplet,
  Clock,
  ArrowLeft,
  Share2,
  Hospital,
  AlertTriangle,
} from "lucide-react";
import { format, isValid, parseISO } from "date-fns";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useRequestDetail } from "../hooks/use-get-single-request";

// Helper for safe date formatting
const formatDate = (dateInput: Date | string | undefined | null) => {
  if (!dateInput) return "Date not set";
  const date = typeof dateInput === "string" ? parseISO(dateInput) : dateInput;
  return isValid(date) ? format(date, "PPP p") : "Invalid date";
};

export default function RequestDetail() {
  const { id } = useLocation().state;
  const navigate = useNavigate();
  const { data: request, isLoading, isError } = useRequestDetail(id);

  if (isLoading) return <DetailSkeleton />;

  if (isError || !request) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <AlertTriangle className="h-12 w-12 text-destructive" />
        <h2 className="text-xl font-bold">Request Not Found</h2>
        <Button onClick={() => navigate("/requests")}>Return to List</Button>
      </div>
    );
  }

  return (
    <div className="container max-w-5xl py-6 space-y-6">
      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={() => navigate(-1)} className="group">
          <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back
        </Button>
        <Button variant="outline" size="sm">
          <Share2 className="mr-2 h-4 w-4" /> Share
        </Button>
      </div>

      <div className="grid  gap-6">
        {/* Main Info Column */}
        <div className=" space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="space-y-1">
                <Badge
                  variant={
                    request.urgency === "CRITICAL" ? "destructive" : "outline"
                  }
                  className="mb-2">
                  {request.urgency}
                </Badge>
                <CardTitle className="text-3xl font-bold tracking-tight">
                  {request.patientName || "Anonymous Patient"}
                </CardTitle>
              </div>
              <div className="flex flex-col items-end">
                <div className="text-4xl font-black text-primary flex items-center">
                  <Droplet className="mr-1 h-8 w-8" />
                  {request.bloodGroup}
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {request.unitsNeeded} Units Required
                </p>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid gap-6">
                <div className="flex items-start gap-4">
                  <Hospital className="mt-1 h-5 w-5 text-primary" />
                  <div>
                    <h4 className="font-semibold text-base">
                      {request.hospitalName}
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {request.hospitalAddress}, {request.city}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Clock className="h-5 w-5 text-primary" />
                  <div>
                    <h4 className="font-semibold text-base">Required Time</h4>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(request.neededAt)}
                    </p>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="font-semibold text-base mb-2">Description</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed italic">
                    {request.description ||
                      "No additional information provided."}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Actions Column */}
      </div>
    </div>
  );
}

// --- Skeleton Component for Loading State ---
function DetailSkeleton() {
  return (
    <div className="container max-w-5xl py-6 space-y-6">
      <Skeleton className="h-10 w-24" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Skeleton className="h-100 w-full" />
        </div>
        <div className="space-y-6">
          <Skeleton className="h-50 w-full" />
          <Skeleton className="h-37.5 w-full" />
        </div>
      </div>
    </div>
  );
}
