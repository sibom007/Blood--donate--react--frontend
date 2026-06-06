import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Field, FieldContent, FieldLabel } from "@/components/ui/field";

import {
  CreateBloodRequestSchema,
  type CreateBloodRequestInput,
} from "../types";

import { BloodGroupEnum } from "@/feature/auth/types";
import { useBloodRequestStore } from "@/zustand/blood-request-zustant";
import { useEffect } from "react";
import { useCreateBloodRequest } from "../hooks/use-create-blood-request";
import { useNavigate } from "react-router";

export default function BloodRequestForm() {
  const navigate = useNavigate();
  const { mutate, isPending } = useCreateBloodRequest();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<CreateBloodRequestInput>({
    resolver: zodResolver(CreateBloodRequestSchema),
    defaultValues: {
      patientName: "",
      patientAge: undefined,
      bloodGroup: undefined,
      unitsRequired: 1,
      hospitalName: "",
      hospitalAddress: "",
      contactPerson: "",
      contactPhone: "",
      reason: "",
    },
  });

  const selectedDonorId = useBloodRequestStore(
    (state) => state.selectedDonorId,
  );
  const selectedInventoryId = useBloodRequestStore(
    (state) => state.selectedInventoryId,
  );
  const clearSelections = useBloodRequestStore(
    (state) => state.clearSelections,
  );

  // 2. Automatically sync Zustand selections with React Hook Form fields
  useEffect(() => {
    setValue("donorId", selectedDonorId, { shouldValidate: true });
    setValue("inventoryId", selectedInventoryId, { shouldValidate: true });
  }, [selectedDonorId, selectedInventoryId, setValue]);

  const onSubmit = async (data: CreateBloodRequestInput) => {
    mutate(data, {
      onSuccess: () => {
        reset();
        clearSelections();
        navigate("/dashboard/own-requests")
      },
    });
  };

  const handleAutoFillTestData = () => {
    reset({
      donorId: undefined,
      inventoryId: undefined,
      patientName: "Johan De",
      patientAge: 20,
      bloodGroup: "B_POS",
      unitsRequired: 1,
      requiredDate: new Date("2026-06-18"),
      hospitalName: "Apollo Hospital Dhaka",
      hospitalAddress: "Plot 81, Block E, Bashundhara R/A, Dhaka 1229",
      contactPerson: "Ahsan Habib",
      contactPhone: "01625334383",
      reason:
        "Patient is suffering from severe Dengue fever. Platelet count has dropped significantly, requiring an urgent whole blood transfusion.",
    });
  };

  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Blood Request Form</h1>

        <p className="text-muted-foreground">
          Fill out the details to request blood for a patient.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-5 lg:grid-cols-2">
          {/* Patient Name */}
          <Field>
            <FieldLabel>Patient Name</FieldLabel>

            <FieldContent>
              <Controller
                name="patientName"
                control={control}
                render={({ field }) => (
                  <Input
                    placeholder="Patient Name"
                    {...field}
                    disabled={isPending}
                  />
                )}
              />
            </FieldContent>

            {errors.patientName && (
              <p className="mt-1 text-sm text-destructive">
                {errors.patientName.message}
              </p>
            )}
          </Field>

          {/* Patient Age */}
          <Field>
            <FieldLabel>Patient Age</FieldLabel>

            <FieldContent>
              <Controller
                name="patientAge"
                control={control}
                render={({ field }) => (
                  <Input
                    type="number"
                    placeholder="Age"
                    value={field.value ?? ""}
                    disabled={isPending}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value ? Number(e.target.value) : undefined,
                      )
                    }
                  />
                )}
              />
            </FieldContent>

            {errors.patientAge && (
              <p className="mt-1 text-sm text-destructive">
                {errors.patientAge.message}
              </p>
            )}
          </Field>

          {/* Blood Group */}
          <Field>
            <FieldLabel>Blood Group</FieldLabel>

            <Controller
              name="bloodGroup"
              control={control}
              render={({ field }) => (
                <Select
                  disabled={isPending}
                  value={field.value}
                  onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Blood Group" />
                  </SelectTrigger>

                  <SelectContent>
                    {BloodGroupEnum.options.map((group) => (
                      <SelectItem key={group} value={group}>
                        {group}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />

            {errors.bloodGroup && (
              <p className="mt-1 text-sm text-destructive">
                {errors.bloodGroup.message}
              </p>
            )}
          </Field>

          {/* Units Required */}
          <Field>
            <FieldLabel>Units Required</FieldLabel>

            <FieldContent>
              <Controller
                name="unitsRequired"
                control={control}
                render={({ field }) => (
                  <Input
                    type="number"
                    min={1}
                    max={10}
                    value={field.value}
                    disabled={isPending}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                )}
              />
            </FieldContent>

            {errors.unitsRequired && (
              <p className="mt-1 text-sm text-destructive">
                {errors.unitsRequired.message}
              </p>
            )}
          </Field>

          {/* Required Date */}
          <Field>
            <FieldLabel>Required Date</FieldLabel>

            <FieldContent>
              <Controller
                name="requiredDate"
                control={control}
                render={({ field }) => (
                  <Input
                    type="date"
                    disabled={isPending}
                    onChange={(e) => field.onChange(new Date(e.target.value))}
                  />
                )}
              />
            </FieldContent>

            {errors.requiredDate && (
              <p className="mt-1 text-sm text-destructive">
                {errors.requiredDate.message}
              </p>
            )}
          </Field>

          {/* Contact Person */}
          <Field>
            <FieldLabel>Contact Person</FieldLabel>

            <FieldContent>
              <Controller
                name="contactPerson"
                control={control}
                render={({ field }) => (
                  <Input
                    disabled={isPending}
                    placeholder="Contact Person"
                    {...field}
                  />
                )}
              />
            </FieldContent>

            {errors.contactPerson && (
              <p className="mt-1 text-sm text-destructive">
                {errors.contactPerson.message}
              </p>
            )}
          </Field>

          {/* Contact Phone */}
          <Field>
            <FieldLabel>Contact Phone</FieldLabel>

            <FieldContent>
              <Controller
                name="contactPhone"
                control={control}
                render={({ field }) => (
                  <Input
                    placeholder="01XXXXXXXXX"
                    value={field.value}
                    disabled={isPending}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "");

                      field.onChange(value);
                    }}
                  />
                )}
              />
            </FieldContent>

            {errors.contactPhone && (
              <p className="mt-1 text-sm text-destructive">
                {errors.contactPhone.message}
              </p>
            )}
          </Field>

          {/* Hospital Name */}
          <Field>
            <FieldLabel>Hospital Name</FieldLabel>

            <FieldContent>
              <Controller
                name="hospitalName"
                control={control}
                render={({ field }) => (
                  <Input
                    disabled={isPending}
                    placeholder="Hospital Name"
                    {...field}
                  />
                )}
              />
            </FieldContent>

            {errors.hospitalName && (
              <p className="mt-1 text-sm text-destructive">
                {errors.hospitalName.message}
              </p>
            )}
          </Field>
        </div>

        {/* Hospital Address */}
        <Field>
          <FieldLabel>Hospital Address</FieldLabel>

          <FieldContent>
            <Controller
              name="hospitalAddress"
              control={control}
              render={({ field }) => (
                <Textarea
                  disabled={isPending}
                  rows={3}
                  placeholder="Hospital Address"
                  {...field}
                />
              )}
            />
          </FieldContent>

          {errors.hospitalAddress && (
            <p className="mt-1 text-sm text-destructive">
              {errors.hospitalAddress.message}
            </p>
          )}
        </Field>

        {/* Reason */}
        <Field>
          <FieldLabel>Reason</FieldLabel>

          <FieldContent>
            <Controller
              name="reason"
              control={control}
              render={({ field }) => (
                <Textarea
                  rows={5}
                  disabled={isPending}
                  placeholder="Reason for blood request"
                  {...field}
                />
              )}
            />
          </FieldContent>

          {errors.reason && (
            <p className="mt-1 text-sm text-destructive">
              {errors.reason.message}
            </p>
          )}
        </Field>

        <div className="flex justify-end">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="border-dashed border-amber-500 text-amber-600 hover:bg-amber-50"
            onClick={handleAutoFillTestData}>
            ⚡ Auto-Fill Test Data
          </Button>
        </div>
        <Button
          type="submit"
          size="lg"
          className="w-full"
          disabled={isSubmitting}
          isLoading={isPending}>
          Submit Blood Request
        </Button>
      </form>
    </div>
  );
}
