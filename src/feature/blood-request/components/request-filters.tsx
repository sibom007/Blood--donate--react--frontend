import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SlidersHorizontal, Search, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Field,
  FieldLabel,
  FieldError,
  FieldGroup,
  FieldContent,
} from "@/components/ui/field";

import { filterSchema, type FilterValues } from "../types";
import {
  BLOOD_GROUP_LABELS,
  STATUS_LABELS,
  URGENCY_LABELS,
} from "../constants";
import { DateTimePicker } from "@/components/date-time-picker";

interface RequestFilterProps {
  onFilterChange: (filters: FilterValues) => void;
}

export const RequestFilters = ({ onFilterChange }: RequestFilterProps) => {
  const [open, setOpen] = useState(false);

  const {
    control,
    register,
    handleSubmit,
    watch,
    reset,
    getValues,
    formState: { errors },
  } = useForm<FilterValues>({
    resolver: zodResolver(filterSchema),
    defaultValues: {
      search: "",
      bloodGroup: "ALL",
      status: "ALL",
      urgency: "ALL",
      date: null,
    },
  });

  const searchTerm = watch("search");

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      onFilterChange({
        ...getValues(),
        search: searchTerm,
      });
    }, 2000);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, onFilterChange, getValues]);

  const handleApply = (data: FilterValues) => {
    onFilterChange(data);
    setOpen(false);
  };

  const handleClear = () => {
    reset({
      search: "",
      bloodGroup: undefined,
      status: undefined,
      urgency: undefined,
      date: null,
    });
    onFilterChange({});
  };

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
      {/* Search Input */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search requests..."
          className="pl-9 h-10"
          {...register("search")}
        />
      </div>

      <div className="flex items-center gap-2">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2 h-10">
              <SlidersHorizontal className="h-4 w-4" />
              Advanced Filters
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Filter Options</DialogTitle>
              <DialogDescription>
                Adjust the parameters below to filter the request list.
              </DialogDescription>
            </DialogHeader>

            <FieldGroup className="py-4">
              {/* Blood Group */}
              <Field>
                <FieldLabel>Blood Group</FieldLabel>
                <FieldContent>
                  <Controller
                    name="bloodGroup"
                    control={control}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Blood Group" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ALL">All Groups</SelectItem>
                          {Object.entries(BLOOD_GROUP_LABELS).map(
                            ([val, label]) => (
                              <SelectItem key={val} value={val}>
                                {label}
                              </SelectItem>
                            ),
                          )}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </FieldContent>
                <FieldError errors={[errors.bloodGroup]} />
              </Field>

              {/* Status */}
              <Field>
                <FieldLabel>Status</FieldLabel>
                <FieldContent>
                  <Controller
                    name="status"
                    control={control}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ALL">All Statuses</SelectItem>
                          {Object.entries(STATUS_LABELS).map(([val, label]) => (
                            <SelectItem key={val} value={val}>
                              {label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </FieldContent>
                <FieldError errors={[errors.status]} />
              </Field>

              {/* Urgency */}
              <Field>
                <FieldLabel>Urgency</FieldLabel>
                <FieldContent>
                  <Controller
                    name="urgency"
                    control={control}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Urgency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ALL">Any Urgency</SelectItem>
                          {Object.entries(URGENCY_LABELS).map(
                            ([val, label]) => (
                              <SelectItem key={val} value={val}>
                                {label}
                              </SelectItem>
                            ),
                          )}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </FieldContent>
                <FieldError errors={[errors.urgency]} />
              </Field>

              {/* Date Picker */}
              <Field>
                <FieldLabel>Request Date</FieldLabel>
                <FieldContent>
                  <Controller
                    name="date"
                    control={control}
                    render={({ field }) => (
                      <DateTimePicker
                        value={field.value ?? undefined}
                        onChange={field.onChange}
                      />
                    )}
                  />
                </FieldContent>
                <FieldError errors={[errors.date]} />
              </Field>
            </FieldGroup>

            <DialogFooter>
              <Button className="w-full" onClick={handleSubmit(handleApply)}>
                Apply Filters
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Button
          variant="ghost"
          size="sm"
          onClick={handleClear}
          className="h-10 px-3">
          Clear
          <X className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
