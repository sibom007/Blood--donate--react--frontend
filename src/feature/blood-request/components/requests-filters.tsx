import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { FiltersProps } from "../types";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Separator } from "@/components/ui/separator";
import { CalendarIcon, SlidersHorizontal } from "lucide-react";
import { BLOOD_GROUPS } from "../lib";

export function RequestFilters({ query, setQuery }: FiltersProps) {
  const [open, setOpen] = useState(false);

  const update = (key: keyof typeof query, value: any) => {
    setQuery((prev) => ({
      ...prev,
      [key]: value === "ALL" ? undefined : value,
      page: 1,
    }));
    setOpen(false);
  };

  // Single date handler (only endDate)
  const handleDate = (date: Date | undefined) => {
    setQuery((prev) => ({
      ...prev,
      endDate: date?.toISOString(),
      startDate: undefined,
      page: 1,
    }));
  };

  const resetFilters = () => {
    setQuery({
      page: 1,
      limit: 10,
      sortBy: "createdAt",
      sortOrder: "desc",
    });
    setOpen(false);
  };

  const FiltersContent = () => (
    <div className="grid gap-3">
      {/* Status */}
      <div className="space-y-2">
        <p className="text-sm font-medium">Status</p>
        <Select
          value={query.requestStatus ?? "ALL"}
          onValueChange={(v) => update("requestStatus", v)}>
          <SelectTrigger>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All</SelectItem>
            <SelectItem value="PENDING">Pending</SelectItem>
            <SelectItem value="ACCEPTED">Accepted</SelectItem>
            <SelectItem value="COMPLETED">Completed</SelectItem>
            <SelectItem value="CANCELLED">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Blood */}
      <div className="space-y-2">
        <p className="text-sm font-medium">Blood Type</p>
        <Select
          value={query.bloodType ?? "ALL"}
          onValueChange={(v) => update("bloodType", v)}>
          <SelectTrigger>
            <SelectValue placeholder="Select blood type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All</SelectItem>

            {BLOOD_GROUPS.map((group) => (
              <SelectItem key={group.value} value={group.value}>
                {group.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Single Date */}
      <div className="space-y-2">
        <p className="text-sm font-medium">Date</p>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal",
                !query.endDate && "text-muted-foreground",
              )}>
              <CalendarIcon className="mr-2 h-4 w-4" />
              {query.endDate
                ? format(new Date(query.endDate), "PP")
                : "Select date"}
            </Button>
          </PopoverTrigger>

          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={query.endDate ? new Date(query.endDate) : undefined}
              onSelect={handleDate}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4" />
          Filters
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="text-xl">Filter Requests</DialogTitle>
        </DialogHeader>

        <Separator />

        <FiltersContent />

        <DialogFooter className="flex justify-between mt-6">
          <Button variant="destructive" onClick={resetFilters}>
            Reset
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
