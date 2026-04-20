"use client";

import { useForm, Controller, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { BloodGroup } from "../../types";
import { PersonalRequestInput, PersonalRequestSchema } from "../types";
import { DateTimePicker } from "@/components/date-time-picker";
import { usePersonalDonateRequestMutation } from "@/Redux/api/blood-donate-api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface IRequestProps {
  donorId: string;
  bloodType: BloodGroup;
  onSuccess?: () => void;
}

export const PersonalRequestForm = ({
  donorId,
  bloodType,
  onSuccess,
}: IRequestProps) => {
  const router = useRouter();
  const [PersonalDonateRequest, { isLoading }] =
    usePersonalDonateRequestMutation();
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useForm<PersonalRequestInput>({
    resolver: zodResolver(PersonalRequestSchema),
    defaultValues: {
      donorId,
      bloodType,
      phoneNumber: "880",
      hospitalName: "",
      hospitalAddress: "",
      description: "",
      urgency: "NORMAL",
    },
  });

  const descriptionValue = useWatch({ control, name: "description" }) || "";
  const MAX_LENGTH = 500;

  const onSubmit = async (values: PersonalRequestInput) => {
    console.log("Form Submitted:", values);
    try {
      const res = await PersonalDonateRequest(values).unwrap();
      toast.success(res.message);
      reset();
      router.push("/dashboard/all-request");
    } catch (err: any) {
      toast.error(err.message || "something went wrong!");
    }
    if (onSuccess) onSuccess();
  };

  // Aesthetic Label Class
  const labelStyle =
    "text-[11px] font-bold uppercase tracking-wider text-muted-foreground/80 ";

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <FieldGroup>
          <FieldSet>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
              {/* Phone Number */}
              <Field>
                <FieldLabel className={labelStyle}>Phone Number</FieldLabel>
                <Input
                  className="bg-muted/30 focus-visible:ring-primary/20"
                  value={watch("phoneNumber")}
                  onChange={(e) => {
                    let val = e.target.value.replace(/[^0-9]/g, "");
                    if (!val.startsWith("880")) val = "880";
                    setValue("phoneNumber", val);
                  }}
                  placeholder="8801XXXXXXXXX"
                />
                <FieldDescription className="text-[10px]">
                  Prefix (880) is required
                </FieldDescription>
                <FieldError className="text-[11px] font-medium">
                  {errors.phoneNumber?.message}
                </FieldError>
              </Field>

              {/* Date & Time Picker */}
              <Field>
                <FieldLabel className={labelStyle}>
                  Donation Schedule
                </FieldLabel>
                <DateTimePicker
                  value={watch("dateOfDonation")}
                  onChange={(val) =>
                    setValue("dateOfDonation", val as Date, {
                      shouldValidate: true,
                    })
                  }
                />
                <FieldError className="text-[11px] font-medium">
                  {errors.dateOfDonation?.message}
                </FieldError>
              </Field>

              {/* Hospital Name */}
              <Field>
                <FieldLabel className={labelStyle}>Hospital Name</FieldLabel>
                <Controller
                  name="hospitalName"
                  control={control}
                  render={({ field }) => (
                    <Input
                      className="bg-muted/30 focus-visible:ring-primary/20"
                      placeholder="e.g. Apollo Hospital"
                      {...field}
                    />
                  )}
                />
                <FieldError className="text-[11px] font-medium">
                  {errors.hospitalName?.message}
                </FieldError>
              </Field>

              {/* Urgency Level */}
              <Field>
                <FieldLabel className={labelStyle}>Urgency Level</FieldLabel>
                <Controller
                  name="urgency"
                  control={control}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}>
                      <SelectTrigger className="bg-muted/30 focus:ring-primary/20">
                        <SelectValue placeholder="Select urgency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="NORMAL">Normal</SelectItem>
                        <SelectItem value="URGENT" className="text-amber-600">
                          Urgent
                        </SelectItem>
                        <SelectItem
                          value="CRITICAL"
                          className="text-destructive font-bold">
                          Critical
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </Field>

              {/* Hospital Address */}
              <div className="md:col-span-2">
                <Field>
                  <FieldLabel className={labelStyle}>
                    Full Hospital Address
                  </FieldLabel>
                  <Controller
                    name="hospitalAddress"
                    control={control}
                    render={({ field }) => (
                      <Input
                        className="bg-muted/30 focus-visible:ring-primary/20"
                        placeholder="Street address, Floor, City"
                        {...field}
                      />
                    )}
                  />
                  <FieldError className="text-[11px] font-medium">
                    {errors.hospitalAddress?.message}
                  </FieldError>
                </Field>
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <Field>
                  <div className="flex justify-between items-end mb-1.5">
                    <FieldLabel className={`${labelStyle} mb-0`}>
                      Case Description
                    </FieldLabel>
                    <span
                      className={`text-[10px] font-mono px-1.5 py-0.5 rounded bg-muted ${
                        descriptionValue.length >= MAX_LENGTH
                          ? "text-destructive"
                          : "text-muted-foreground"
                      }`}>
                      {descriptionValue.length}/{MAX_LENGTH}
                    </span>
                  </div>
                  <Controller
                    name="description"
                    control={control}
                    render={({ field }) => (
                      <Textarea
                        placeholder="Briefly explain why blood is needed..."
                        className="resize-none min-h-25 max-h-28 overflow-y-auto bg-muted/30 focus-visible:ring-primary/20"
                        {...field}
                        onChange={(e) => {
                          if (e.target.value.length <= MAX_LENGTH) {
                            field.onChange(e);
                          }
                        }}
                      />
                    )}
                  />
                </Field>
              </div>
            </div>
          </FieldSet>

          <FieldSeparator />

          <Field orientation="horizontal">
            <Button
              disabled={isLoading}
              loading={isLoading}
              type="submit"
              className="w-full">
              Send Request
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
};
