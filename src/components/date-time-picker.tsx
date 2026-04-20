
import * as React from "react";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { CalendarIcon } from "lucide-react";

type Props = {
  value?: Date;
  onChange: (date: Date) => void;
};

export function DateTimePicker({ value, onChange }: Props) {
  const [isOpen, setIsOpen] = React.useState(false);

  const hours = Array.from({ length: 12 }, (_, i) => i + 1);
  const minutes = Array.from({ length: 12 }, (_, i) => i * 5);

  // DATE SELECT
  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (!selectedDate) return;

    const base = value ? new Date(value) : new Date();

    base.setFullYear(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate(),
    );

    onChange(base);
  };

  // TIME SELECT
  const handleTimeChange = (type: "hour" | "minute" | "ampm", val: string) => {
    const base = value ? new Date(value) : new Date();

    if (type === "hour") {
      const hour = parseInt(val);
      const isPM = base.getHours() >= 12;
      base.setHours((hour % 12) + (isPM ? 12 : 0));
    }

    if (type === "minute") {
      base.setMinutes(parseInt(val));
    }

    if (type === "ampm") {
      const current = base.getHours();

      if (val === "PM" && current < 12) base.setHours(current + 12);
      if (val === "AM" && current >= 12) base.setHours(current - 12);
    }

    onChange(base);
  };

  const selectedHour = value ? value.getHours() % 12 || 12 : null;
  const selectedMinute = value ? value.getMinutes() : null;
  const isPM = value ? value.getHours() >= 12 : false;

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !value && "text-muted-foreground",
          )}>
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value ? (
            format(value, "PPP hh:mm aa")
          ) : (
            <span>Pick date & time</span>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-auto p-0">
        <div className="sm:flex">
          {/* CALENDAR */}
          <Calendar
            mode="single"
            selected={value}
            onSelect={handleDateSelect}
            initialFocus
            disabled={(date) =>
              date < new Date(new Date().setHours(0, 0, 0, 0))
            }
          />

          {/* TIME PICKER */}
          <div className="flex flex-col sm:flex-row sm:h-75 divide-y sm:divide-y-0 sm:divide-x">
            {/* HOURS */}
            <ScrollArea className="w-64 sm:w-auto">
              <div className="flex sm:flex-col p-2">
                {hours.map((hour) => (
                  <Button
                    key={hour}
                    size="icon"
                    variant={selectedHour === hour ? "default" : "ghost"}
                    className="sm:w-full shrink-0 aspect-square"
                    onClick={() => handleTimeChange("hour", hour.toString())}>
                    {hour}
                  </Button>
                ))}
              </div>
              <ScrollBar orientation="horizontal" className="sm:hidden" />
            </ScrollArea>

            {/* MINUTES */}
            <ScrollArea className="w-64 sm:w-auto">
              <div className="flex sm:flex-col p-2">
                {minutes.map((minute) => (
                  <Button
                    key={minute}
                    size="icon"
                    variant={selectedMinute === minute ? "default" : "ghost"}
                    className="sm:w-full shrink-0 aspect-square"
                    onClick={() =>
                      handleTimeChange("minute", minute.toString())
                    }>
                    {minute.toString().padStart(2, "0")}
                  </Button>
                ))}
              </div>
              <ScrollBar orientation="horizontal" className="sm:hidden" />
            </ScrollArea>

            {/* AM / PM */}
            <ScrollArea>
              <div className="flex sm:flex-col p-2">
                {["AM", "PM"].map((ampm) => (
                  <Button
                    key={ampm}
                    size="icon"
                    variant={
                      (ampm === "PM" && isPM) || (ampm === "AM" && !isPM)
                        ? "default"
                        : "ghost"
                    }
                    className="sm:w-full shrink-0 aspect-square"
                    onClick={() => handleTimeChange("ampm", ampm)}>
                    {ampm}
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
