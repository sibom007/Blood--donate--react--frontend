"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Field } from "@/components/ui/field";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type DatePickerSimpleProps = {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
};

export function DatePicker({ value, onChange }: DatePickerSimpleProps) {
  const [open, setOpen] = React.useState(false);

  // 👉 Calculate date limits
  const today = new Date();

  const minDate = new Date(
    today.getFullYear() - 60,
    today.getMonth(),
    today.getDate(),
  );

  const maxDate = new Date(
    today.getFullYear() - 18,
    today.getMonth(),
    today.getDate(),
  );

  return (
    <Field className="mx-auto w-44">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className="justify-start font-normal text-muted-foreground">
            {value ? value.toLocaleDateString() : "Select date"}
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={value}
            defaultMonth={value ?? maxDate}
            captionLayout="dropdown"
            fromDate={minDate}
            toDate={maxDate}
            disabled={(date) => date < minDate || date > maxDate}
            onSelect={(date) => {
              onChange?.(date);
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
    </Field>
  );
}
