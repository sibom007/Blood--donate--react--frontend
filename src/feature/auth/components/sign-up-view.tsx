import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Eye,
  EyeOff,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";
import { Link, useNavigate } from "react-router";

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { BloodType, SignUpSchema, type SignUpInputData } from "../type";
import { getBloodTypeLabel } from "../lib";
import { useSignUp } from "../hooks/use-sign-up";
import { calculateAge } from "@/lib/calculateAge";
import { DatePicker } from "@/components/date-picker";

export const SignUpView = () => {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { mutate, isPending } = useSignUp();

  const form = useForm<SignUpInputData>({
    resolver: zodResolver(SignUpSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      bloodType: undefined,
      age: "18",
      phoneNumber: "",
      city: "",
      password: "",
      dateOfBirth: undefined,
    },
  });

  const handleNext = async () => {
    const fieldsByStep: Record<number, (keyof SignUpInputData)[]> = {
      1: ["name", "email"],
      2: ["bloodType", "age", "dateOfBirth", "phoneNumber"],
      3: ["city", "address", "password"],
    };

    const isStepValid = await form.trigger(fieldsByStep[step]);
    if (isStepValid) setStep((p) => Math.min(p + 1, 3));
  };

  const handlePrev = () => setStep((p) => Math.max(p - 1, 1));

  const onSubmit = async (data: SignUpInputData) => {
    const formattedNumber = `880${data.phoneNumber.substring(1)}`;

    const payload = {
      name: data.name,
      email: data.email,
      age: Number(data.age),
      phone: formattedNumber,
      password: data.password,
      bloodGroup: data.bloodType,
      city: data.city,
      address: data.address,
      dateOfBirth: data.dateOfBirth,
    };

    mutate(
      { ...payload },
      {
        onSuccess: () => {
          navigate("/sign-in");
        },
      },
    );

    console.log("Form Submitted:", payload);
  };

  return (
    <div className="w-full max-w-md mx-auto bg-card rounded-xl border shadow-lg p-8">
      {/* Header & Progress */}
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold tracking-tight">Create Account</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Join our blood donor community
        </p>

        <div className="flex justify-between mt-6 relative">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className={`z-10 flex items-center justify-center w-8 h-8 rounded-full border-2 transition-colors ${
                step >= i
                  ? "bg-primary border-primary text-primary-foreground"
                  : "bg-background text-muted-foreground"
              }`}>
              {step > i ? <CheckCircle2 size={16} /> : i}
            </div>
          ))}
          <div className="absolute top-4 left-0 w-full h-0.5 bg-muted z-0" />
          <div
            className="absolute top-4 left-0 h-0.5 bg-primary transition-all duration-300 z-0"
            style={{ width: `${((step - 1) / 2) * 100}%` }}
          />
        </div>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* STEP 1: Identity */}
        {step === 1 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Full Name</FieldLabel>
                  <Input {...field} placeholder="e.g. Rahim Ahmed" />
                  <FieldError
                    errors={fieldState.error ? [fieldState.error] : []}
                  />
                </Field>
              )}
            />
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Email Address</FieldLabel>
                  <Input
                    {...field}
                    type="email"
                    placeholder="rahim@example.com"
                  />
                  <FieldError
                    errors={fieldState.error ? [fieldState.error] : []}
                  />
                </Field>
              )}
            />
          </div>
        )}

        {/* STEP 2: Biological & Contact */}
        {step === 2 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
            <div className="grid grid-cols-2 gap-4">
              <Controller
                name="bloodType"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Blood Type</FieldLabel>

                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger
                        className={
                          fieldState.invalid ? "border-destructive" : ""
                        }>
                        <SelectValue placeholder="Select blood type" />
                      </SelectTrigger>

                      <SelectContent>
                        {Object.values(BloodType).map((type) => (
                          <SelectItem key={type} value={type}>
                            {getBloodTypeLabel(type)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <FieldError
                      errors={fieldState.error ? [fieldState.error] : []}
                    />
                  </Field>
                )}
              />
              <Controller
                name="dateOfBirth"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Date & Time of Birth</FieldLabel>
                    <DatePicker
                      value={field.value}
                      onChange={(date) => {
                        field.onChange(date);
                        const age = calculateAge(date);
                        form.setValue("age", age!);
                      }}
                    />
                    <FieldError
                      errors={fieldState.error ? [fieldState.error] : []}
                    />
                  </Field>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Controller
                name="age"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Age</FieldLabel>
                    <Input type="number" {...field} disabled />
                    <FieldError
                      errors={fieldState.error ? [fieldState.error] : []}
                    />
                  </Field>
                )}
              />
              <Controller
                name="phoneNumber"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Phone (BD)</FieldLabel>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 bg-muted text-xs text-muted-foreground">
                        +880
                      </span>
                      <Input
                        {...field}
                        className="rounded-l-none"
                        placeholder="1712345678"
                      />
                    </div>
                    <FieldError
                      errors={fieldState.error ? [fieldState.error] : []}
                    />
                  </Field>
                )}
              />
            </div>
          </div>
        )}

        {/* STEP 3: Security */}
        {step === 3 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
            <Controller
              name="city"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Current City</FieldLabel>
                  <Input {...field} placeholder="Dhaka" />
                  <FieldError
                    errors={fieldState.error ? [fieldState.error] : []}
                  />
                </Field>
              )}
            />
            <Controller
              name="address"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Current address</FieldLabel>
                  <Input {...field} placeholder="Dhaka Bonani" />
                  <FieldError
                    errors={fieldState.error ? [fieldState.error] : []}
                  />
                </Field>
              )}
            />

            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Password</FieldLabel>
                  <div className="relative">
                    <Input
                      {...field}
                      type={showPassword ? "text" : "password"}
                      className="pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  <FieldError
                    errors={fieldState.error ? [fieldState.error] : []}
                  />
                </Field>
              )}
            />
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex gap-3 pt-4">
          {step > 1 && (
            <Button
              variant="outline"
              type="button"
              onClick={handlePrev}
              className="flex-1">
              <ChevronLeft className="mr-2 h-4 w-4" /> Back
            </Button>
          )}

          {step < 3 ? (
            <Button
              type="button"
              onClick={handleNext}
              className="flex-1 ml-auto">
              Continue <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button
              type="submit"
              className="flex-1"
              disabled={form.formState.isSubmitting || isPending}
              loading={isPending}>
              {form.formState.isSubmitting || isPending
                ? "Creating..."
                : "Create Account"}
            </Button>
          )}
        </div>
      </form>

      <p className="mt-8 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          to="/sign-in"
          className="font-semibold text-primary hover:underline">
          Sign In
        </Link>
      </p>
    </div>
  );
};
