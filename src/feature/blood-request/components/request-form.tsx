import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DateTimePicker } from "@/components/date-time-picker";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  MAX_WORDS,
  RequestBloodSchema,
  UrgencyLevel,
  type RequestBloodInput,
} from "../types";
import { getBloodTypeLabel } from "@/feature/auth/lib";
import { getFutureDate } from "@/lib/calculateAge";
import { useCreateBloodRequest } from "../hooks/use-create-blood-request";
import { useNavigate } from "react-router";
import { BloodType } from "@/feature/auth/types";

const steps = ["Blood Info", "Contact", "Hospital", "Additional"];

export default function RequestForm() {
  const navigate = useNavigate();
  const { mutate, isPending } = useCreateBloodRequest();
  const [[step, direction], setStep] = useState([0, 0]);

  const {
    register,
    handleSubmit,
    trigger,
    control,
    watch,
    formState: { errors },
  } = useForm<RequestBloodInput>({
    resolver: zodResolver(RequestBloodSchema),
    mode: "onChange",
    defaultValues: {
      urgency: "LOW",
      phoneNumber: "",
      bloodGroup: "A_POS",
      description: "",
      hospitalAddress: "",
      hospitalName: "",
      neededAt: getFutureDate(),
      patientName: "",
      city: "",
      unitsNeeded: "1",
    },
  });

  const descriptionValue = watch("description") || "";
  const wordCount = descriptionValue.trim().split(/\s+/).filter(Boolean).length;

  const paginate = (newDirection: number) => {
    const nextStep = step + newDirection;
    if (nextStep >= 0 && nextStep < steps.length) {
      setStep([nextStep, newDirection]);
    }
  };

  /* --- Replace your current 'next' function with this --- */
  const next = async (e?: React.MouseEvent) => {
    e?.preventDefault();

    // Define which fields to validate for each step index
    const fieldsPerStep: (keyof RequestBloodInput)[][] = [
      ["bloodGroup", "patientName", "unitsNeeded"],
      ["phoneNumber", "neededAt"],
      ["hospitalName", "hospitalAddress", "city"],
      ["description", "urgency"],
    ];

    // Trigger validation for the current step's fields
    const result = await trigger(fieldsPerStep[step], { shouldFocus: true });

    // LOGGING: This will tell you exactly which field is failing in your console
    console.log(`Step ${step} validation result:`, result);
    if (!result) {
      console.log("Current Errors:", errors);
      return;
    }

    paginate(1);
  };

  const onSubmit = async (data: RequestBloodInput) => {
    console.log("Form Submitted:", data);
    mutate(data, {
      onSuccess: () => {
        navigate("/dashboard/all-request");
      },
    });
  };

  // Animation Variants for Smooth Sliding
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 50 : -50,
      opacity: 0,
    }),
  };

  return (
    <div className="flex items-center justify-center -pt-24">
      <Card className="w-full max-w-2xl border-none shadow-none">
        <CardHeader className="space-y-4">
          <div className="flex flex-col gap-1 text-center sm:text-left">
            <CardTitle className="text-3xl font-bold tracking-tight">
              Blood Request
            </CardTitle>
            <p className="text-sm text-muted-foreground uppercase tracking-widest font-semibold">
              {steps[step]} — Step {step + 1} of {steps.length}
            </p>
          </div>

          <div className="flex gap-2 w-full pt-2">
            {steps.map((_, i) => (
              <motion.div
                key={i}
                initial={false}
                animate={{
                  backgroundColor:
                    i <= step ? "var(--primary)" : "var(--muted)",
                  flexGrow: i === step ? 2 : 1,
                }}
                className="h-1.5 rounded-full transition-all duration-500"
              />
            ))}
          </div>
        </CardHeader>

        <CardContent className="relative">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={step}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: "easeInOut" }}>
                <FieldGroup className="space-y-6">
                  {step === 0 && (
                    <div className="grid gap-6">
                      <Field>
                        <FieldLabel>Blood Type Required</FieldLabel>
                        <Controller
                          name="bloodGroup"
                          control={control}
                          render={({ field }) => (
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select blood group" />
                              </SelectTrigger>
                              <SelectContent>
                                {Object.values(BloodType).map((type) => (
                                  <SelectItem key={type} value={type}>
                                    {getBloodTypeLabel(type)}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          )}
                        />
                        <FieldError>{errors.bloodGroup?.message}</FieldError>
                      </Field>

                      <Field>
                        <FieldLabel>Patient Name</FieldLabel>
                        <Controller
                          name="patientName"
                          control={control}
                          render={({ field }) => (
                            <Input
                              {...field}
                              onChange={field.onChange}
                              placeholder="johan pai"
                            />
                          )}
                        />

                        <FieldError>{errors.patientName?.message}</FieldError>
                      </Field>

                      <Field>
                        <FieldLabel>Units Needed</FieldLabel>
                        <Controller
                          name="unitsNeeded"
                          control={control}
                          render={({ field }) => (
                            <Select onValueChange={field.onChange}>
                              <SelectTrigger>
                                <SelectValue placeholder="1" />
                              </SelectTrigger>
                              <SelectContent>
                                {Array.from({ length: 5 }, (_, i) => i + 1).map(
                                  (num) => (
                                    <SelectItem
                                      key={num}
                                      value={num.toString()}>
                                      {num}
                                    </SelectItem>
                                  ),
                                )}
                              </SelectContent>
                            </Select>
                          )}
                        />
                        <FieldError>{errors.unitsNeeded?.message}</FieldError>
                      </Field>
                    </div>
                  )}

                  {step === 1 && (
                    <div className="grid gap-6">
                      <Field>
                        <FieldLabel>Phone Number</FieldLabel>
                        <Controller
                          name="phoneNumber"
                          control={control}
                          render={({ field }) => (
                            <Input {...field} onChange={field.onChange} />
                          )}
                        />
                        <FieldDescription>
                          Standard format: 8801XXXXXXXXX
                        </FieldDescription>
                        <FieldError>{errors.phoneNumber?.message}</FieldError>
                      </Field>

                      <Field>
                        <FieldLabel>Expected Donation Date</FieldLabel>
                        <Controller
                          name="neededAt"
                          control={control}
                          render={({ field }) => (
                            <DateTimePicker
                              value={field.value}
                              onChange={field.onChange}
                            />
                          )}
                        />
                        <FieldError>{errors.neededAt?.message}</FieldError>
                      </Field>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="grid gap-6">
                      <Field>
                        <FieldLabel>City Name</FieldLabel>
                        <Controller
                          name="city"
                          control={control}
                          render={({ field }) => (
                            <Input
                              {...field}
                              placeholder="e.g. Dhaka & Bonani"
                              onChange={field.onChange}
                            />
                          )}
                        />

                        <FieldError>{errors.city?.message}</FieldError>
                      </Field>
                      <Field>
                        <FieldLabel>Hospital Name</FieldLabel>
                        <Controller
                          name="hospitalName"
                          control={control}
                          render={({ field }) => (
                            <Input
                              {...field}
                              placeholder="e.g. Dhaka Medical"
                              onChange={field.onChange}
                            />
                          )}
                        />

                        <FieldError>{errors.hospitalName?.message}</FieldError>
                      </Field>
                      <Field>
                        <FieldLabel>Hospital Address</FieldLabel>
                        <Controller
                          name="hospitalAddress"
                          control={control}
                          render={({ field }) => (
                            <Input
                              {...field}
                              placeholder="Enter hospital address..."
                              onChange={field.onChange}
                            />
                          )}
                        />
                        <FieldError>
                          {errors.hospitalAddress?.message}
                        </FieldError>
                      </Field>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="grid gap-6">
                      <Field>
                        <FieldLabel>Urgency Level</FieldLabel>
                        <Controller
                          name="urgency"
                          control={control}
                          render={({ field }) => (
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}>
                              <SelectTrigger>
                                <SelectValue placeholder={`${field.value}`} />
                              </SelectTrigger>
                              <SelectContent>
                                {Object.values(UrgencyLevel).map((type) => (
                                  <SelectItem key={type} value={type}>
                                    {type}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          )}
                        />
                      </Field>
                      <Field>
                        <FieldLabel>Additional Details</FieldLabel>
                        <div className="space-y-2">
                          <Textarea
                            {...register("description")}
                            rows={5}
                            className="w-full resize-none"
                            placeholder="Describe the medical situation..."
                          />
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>
                              {wordCount} / {MAX_WORDS} words
                            </span>
                            {wordCount >= MAX_WORDS && (
                              <span className="text-destructive font-medium">
                                Word limit reached
                              </span>
                            )}
                          </div>
                        </div>
                      </Field>
                    </div>
                  )}
                </FieldGroup>
              </motion.div>
            </AnimatePresence>

            <div className="flex flex-col-reverse sm:flex-row justify-between gap-4 pt-6">
              <Button
                type="button"
                variant="ghost"
                onClick={() => paginate(-1)}
                disabled={step === 0}
                className={` px-12 ${step === 0 ? "opacity-0 pointer-events-none" : ""}`}>
                Back
              </Button>

              <div className="flex gap-4 w-full sm:w-auto">
                {step < steps.length - 1 ? (
                  <Button
                    type="button"
                    variant={"outline"}
                    onClick={next}
                    className="flex-1  px-12 ">
                    Continue
                  </Button>
                ) : (
                  <Button
                    disabled={isPending}
                    isLoading={isPending}
                    type="submit"
                    className="flex-1 sm:flex-none  px-12 ">
                    Submit Request
                  </Button>
                )}
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
