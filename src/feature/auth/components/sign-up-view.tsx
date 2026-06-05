// import { useState } from "react";
// import { useForm, Controller } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import {
//   Eye,
//   EyeOff,
//   ChevronLeft,
//   ChevronRight,
//   CheckCircle2,
// } from "lucide-react";
// import { Link, useNavigate } from "react-router";

// import {
//   Select,
//   SelectTrigger,
//   SelectContent,
//   SelectItem,
//   SelectValue,
// } from "@/components/ui/select";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Field, FieldLabel, FieldError } from "@/components/ui/field";
// import { DatePicker } from "@/components/date-picker";
// import { SignUpSchema, type SignUpInput } from "../types";
// import { useSignUp } from "../hooks/use-sign-up";

// const BloodGroupEnum = z.enum([
//   "A_POS",
//   "A_NEG",
//   "B_POS",
//   "B_NEG",
//   "AB_POS",
//   "AB_NEG",
//   "O_POS",
//   "O_NEG",
// ]);
// const GenderEnum = z.enum(["MALE", "FEMALE", "OTHER"]);

// const getBloodTypeLabel = (type: string) =>
//   type.replace("_POS", " (+)").replace("_NEG", " (-)");
// const calculateAge = (date: Date | string) => {
//   if (!date) return 18;
//   const today = new Date();
//   const birthDate = new Date(date);
//   let age = today.getFullYear() - birthDate.getFullYear();
//   const m = today.getMonth() - birthDate.getMonth();
//   if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
//     age--;
//   }
//   return age;
// };

// export const SignUpView = () => {
//   const [step, setStep] = useState(1);
//   const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate();
//   const { mutate, isPending } = useSignUp();

//   const form = useForm<SignUpInput>({
//     resolver: zodResolver(SignUpSchema),
//     mode: "onChange",
//     defaultValues: {
//       fullName: "",
//       email: "",
//       phone: "",
//       bloodGroup: "A_POS",
//       gender: "MALE",
//       age: 18,
//       weight: 50, // Set realistic donor weight default
//       city: "",
//       district: "Dhaka", // Added default to bypass missing UI element
//       address: "",
//       password: "",
//       bio: "",
//       isDonor: undefined,
//       availability: undefined,
//     },
//   });

//   const handleNext = async () => {
//     // Exact schema keys mapped to each step sequence
//     const fieldsByStep: Record<number, (keyof SignUpInput)[]> = {
//       1: ["fullName", "email", "phone", "isDonor"],
//       2: ["bloodGroup", "gender", "age", "weight"],
//       3: ["city", "district", "address", "password"],
//     };

//     const isStepValid = await form.trigger(fieldsByStep[step]);
//     if (isStepValid) setStep((p) => Math.min(p + 1, 3));
//   };

//   const handlePrev = () => setStep((p) => Math.max(p - 1, 1));

//   const onSubmit = async (data: SignUpInput) => {
//     console.log("🚀 ~ onSubmit ~ data:", data)
//     // Formats any standard local "01XXXXX" entry to target international prefix
//     const formattedNumber = data.phone.startsWith("+880")
//       ? data.phone
//       : `880${data.phone.substring(1)}`;

//     const payload = {
//       ...data,
//       phone: formattedNumber,
//       age: Number(data.age),
//     };

//     mutate(
//       { ...payload },
//       {
//         onSuccess: () => {
//           navigate("/sign-in");
//         },
//       },
//     );

//     console.log("Form Submitted:", payload);
//   };

//   return (
//     <div className="w-full max-w-md mx-auto bg-card rounded-xl border shadow-lg p-8">
//       {/* Header & Progress Bar */}
//       <div className="mb-8 text-center">
//         <h1 className="text-2xl font-bold tracking-tight">Create Account</h1>
//         <p className="text-sm text-muted-foreground mt-1">
//           Join our blood donor community
//         </p>

//         <div className="flex justify-between mt-6 relative">
//           {[1, 2, 3].map((i) => (
//             <div
//               key={i}
//               className={`z-10 flex items-center justify-center w-8 h-8 rounded-full border-2 transition-colors ${
//                 step >= i
//                   ? "bg-primary border-primary text-primary-foreground"
//                   : "bg-background text-muted-foreground"
//               }`}>
//               {step > i ? <CheckCircle2 size={16} /> : i}
//             </div>
//           ))}
//           <div className="absolute top-4 left-0 w-full h-0.5 bg-muted z-0" />
//           <div
//             className="absolute top-4 left-0 h-0.5 bg-primary transition-all duration-300 z-0"
//             style={{ width: `${((step - 1) / 2) * 100}%` }}
//           />
//         </div>
//       </div>

//       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//         {/* STEP 1: Identity */}
//         {step === 1 && (
//           <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
//             <Controller
//               name="fullName"
//               control={form.control}
//               render={({ field, fieldState }) => (
//                 <Field data-invalid={fieldState.invalid}>
//                   <FieldLabel>Full Name</FieldLabel>
//                   <Input {...field} placeholder="e.g. Rahim Ahmed" />
//                   <FieldError
//                     errors={fieldState.error ? [fieldState.error] : []}
//                   />
//                 </Field>
//               )}
//             />
//             <Controller
//               name="email"
//               control={form.control}
//               render={({ field, fieldState }) => (
//                 <Field data-invalid={fieldState.invalid}>
//                   <FieldLabel>Email Address</FieldLabel>
//                   <Input
//                     {...field}
//                     type="email"
//                     placeholder="rahim@example.com"
//                   />
//                   <FieldError
//                     errors={fieldState.error ? [fieldState.error] : []}
//                   />
//                 </Field>
//               )}
//             />
//             <Controller
//               name="phone"
//               control={form.control}
//               render={({ field, fieldState }) => (
//                 <Field data-invalid={fieldState.invalid}>
//                   <FieldLabel>Phone (BD)</FieldLabel>
//                   <div className="flex">
//                     <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 bg-muted text-xs text-muted-foreground">
//                       +88
//                     </span>
//                     <Input
//                       {...field}
//                       className="rounded-l-none"
//                       placeholder="01712345678"
//                     />
//                   </div>
//                   <FieldError
//                     errors={fieldState.error ? [fieldState.error] : []}
//                   />
//                 </Field>
//               )}
//             />
//             <Controller
//               name="isDonor"
//               control={form.control}
//               render={({ field, fieldState }) => (
//                 <Field data-invalid={fieldState.invalid}>
//                   <FieldLabel>Will you be a donor?</FieldLabel>

//                   <Select
//                     onValueChange={(value) => field.onChange(value === "true")}
//                     // Convert the form's boolean back to a string so Shadcn UI can display it
//                     value={
//                       field.value !== undefined
//                         ? String(field.value)
//                         : undefined
//                     }>
//                     <SelectTrigger
//                       className={
//                         fieldState.invalid ? "border-destructive" : ""
//                       }>
//                       <SelectValue placeholder="Select option" />
//                     </SelectTrigger>

//                     <SelectContent>
//                       <SelectItem value="true">Yes</SelectItem>
//                       <SelectItem value="false">No</SelectItem>
//                     </SelectContent>
//                   </Select>

//                   <FieldError
//                     errors={fieldState.error ? [fieldState.error] : []}
//                   />
//                 </Field>
//               )}
//             />
//           </div>
//         )}

//         {/* STEP 2: Biological Metrics */}
//         {step === 2 && (
//           <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
//             <div className="grid grid-cols-2 gap-4">
//               <Controller
//                 name="bloodGroup"
//                 control={form.control}
//                 render={({ field, fieldState }) => (
//                   <Field data-invalid={fieldState.invalid}>
//                     <FieldLabel>Blood Group</FieldLabel>
//                     <Select onValueChange={field.onChange} value={field.value}>
//                       <SelectTrigger
//                         className={
//                           fieldState.invalid ? "border-destructive" : ""
//                         }>
//                         <SelectValue placeholder="Select group" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         {BloodGroupEnum.options.map((type) => (
//                           <SelectItem key={type} value={type}>
//                             {getBloodTypeLabel(type)}
//                           </SelectItem>
//                         ))}
//                       </SelectContent>
//                     </Select>
//                     <FieldError
//                       errors={fieldState.error ? [fieldState.error] : []}
//                     />
//                   </Field>
//                 )}
//               />
//               <Controller
//                 name="gender"
//                 control={form.control}
//                 render={({ field, fieldState }) => (
//                   <Field data-invalid={fieldState.invalid}>
//                     <FieldLabel>Gender</FieldLabel>
//                     <Select onValueChange={field.onChange} value={field.value}>
//                       <SelectTrigger
//                         className={
//                           fieldState.invalid ? "border-destructive" : ""
//                         }>
//                         <SelectValue placeholder="Select gender" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         {GenderEnum.options.map((gender) => (
//                           <SelectItem key={gender} value={gender}>
//                             {gender}
//                           </SelectItem>
//                         ))}
//                       </SelectContent>
//                     </Select>
//                     <FieldError
//                       errors={fieldState.error ? [fieldState.error] : []}
//                     />
//                   </Field>
//                 )}
//               />
//             </div>

//             <div className="grid grid-cols-2 gap-4">
//               <Field>
//                 <FieldLabel>Date of Birth</FieldLabel>
//                 <DatePicker
//                   onChange={(date) => {
//                     if (date) {
//                       const age = calculateAge(date);
//                       form.setValue("age", age, { shouldValidate: true });
//                     }
//                   }}
//                 />
//               </Field>

//               <Controller
//                 name="age"
//                 control={form.control}
//                 render={({ field, fieldState }) => (
//                   <Field data-invalid={fieldState.invalid}>
//                     <FieldLabel>Calculated Age</FieldLabel>
//                     <Input type="number" {...field} disabled />
//                     <FieldError
//                       errors={fieldState.error ? [fieldState.error] : []}
//                     />
//                   </Field>
//                 )}
//               />
//             </div>

//             <Controller
//               name="weight"
//               control={form.control}
//               render={({ field, fieldState }) => (
//                 <Field data-invalid={fieldState.invalid}>
//                   <FieldLabel>Weight (kg)</FieldLabel>
//                   <Input
//                     type="number"
//                     {...field}
//                     onChange={(e) => field.onChange(Number(e.target.value))}
//                   />
//                   <FieldError
//                     errors={fieldState.error ? [fieldState.error] : []}
//                   />
//                 </Field>
//               )}
//             />
//           </div>
//         )}

//         {/* STEP 3: Address & Security */}
//         {step === 3 && (
//           <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
//             <div className="grid grid-cols-2 gap-4">
//               <Controller
//                 name="city"
//                 control={form.control}
//                 render={({ field, fieldState }) => (
//                   <Field data-invalid={fieldState.invalid}>
//                     <FieldLabel>City</FieldLabel>
//                     <Input {...field} placeholder="Dhaka" />
//                     <FieldError
//                       errors={fieldState.error ? [fieldState.error] : []}
//                     />
//                   </Field>
//                 )}
//               />
//               <Controller
//                 name="district"
//                 control={form.control}
//                 render={({ field, fieldState }) => (
//                   <Field data-invalid={fieldState.invalid}>
//                     <FieldLabel>District</FieldLabel>
//                     <Input {...field} placeholder="Dhaka" />
//                     <FieldError
//                       errors={fieldState.error ? [fieldState.error] : []}
//                     />
//                   </Field>
//                 )}
//               />
//             </div>

//             <Controller
//               name="address"
//               control={form.control}
//               render={({ field, fieldState }) => (
//                 <Field data-invalid={fieldState.invalid}>
//                   <FieldLabel>Current Address</FieldLabel>
//                   <Input {...field} placeholder="House 12, Road 4, Banani" />
//                   <FieldError
//                     errors={fieldState.error ? [fieldState.error] : []}
//                   />
//                 </Field>
//               )}
//             />

//             <Controller
//               name="password"
//               control={form.control}
//               render={({ field, fieldState }) => (
//                 <Field data-invalid={fieldState.invalid}>
//                   <FieldLabel>Password</FieldLabel>
//                   <div className="relative">
//                     <Input
//                       {...field}
//                       type={showPassword ? "text" : "password"}
//                       className="pr-10"
//                     />
//                     <button
//                       type="button"
//                       onClick={() => setShowPassword(!showPassword)}
//                       className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
//                       {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
//                     </button>
//                   </div>
//                   <FieldError
//                     errors={fieldState.error ? [fieldState.error] : []}
//                   />
//                 </Field>
//               )}
//             />
//           </div>
//         )}

//         {/* Navigation Actions */}
//         <div className="flex gap-3 pt-4">
//           {step > 1 && (
//             <Button
//               variant="outline"
//               type="button"
//               onClick={handlePrev}
//               className="flex-1">
//               <ChevronLeft className="mr-2 h-4 w-4" /> Back
//             </Button>
//           )}

//           {step < 3 ? (
//             <Button
//               type="button"
//               onClick={handleNext}
//               className="flex-1 ml-auto">
//               Continue <ChevronRight className="ml-2 h-4 w-4" />
//             </Button>
//           ) : (
//             <Button
//               type="submit"
//               className="flex-1"
//               disabled={form.formState.isSubmitting || isPending}>
//               {form.formState.isSubmitting || isPending
//                 ? "Creating..."
//                 : "Create Account"}
//             </Button>
//           )}
//         </div>
//       </form>

//       <p className="mt-8 text-center text-sm text-muted-foreground">
//         Already have an account?{" "}
//         <Link
//           to="/sign-in"
//           className="font-semibold text-primary hover:underline">
//           Sign In
//         </Link>
//       </p>
//     </div>
//   );
// };

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
import { DatePicker } from "@/components/date-picker";
import { SignUpSchema, type SignUpInput } from "../types";
import { useSignUp } from "../hooks/use-sign-up";
import { toast } from "sonner";

const BloodGroupEnum = z.enum([
  "A_POS",
  "A_NEG",
  "B_POS",
  "B_NEG",
  "AB_POS",
  "AB_NEG",
  "O_POS",
  "O_NEG",
]);
const GenderEnum = z.enum(["MALE", "FEMALE", "OTHER"]);

const getBloodTypeLabel = (type: string) =>
  type.replace("_POS", " (+)").replace("_NEG", " (-)");

const calculateAge = (date: Date | string) => {
  if (!date) return 18;
  const today = new Date();
  const birthDate = new Date(date);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

export const SignUpView = () => {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { mutate, isPending } = useSignUp();

  const form = useForm<SignUpInput>({
    resolver: zodResolver(SignUpSchema),
    mode: "onChange",
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      bloodGroup: "A_POS",
      gender: "MALE",
      age: 18,
      weight: 50,
      city: "",
      district: "",
      address: "",
      password: "",
      bio: "",
      isDonor: true, // Fixed: Don't set to undefined if schema demands boolean
      availability: true, // Fixed: Don't set to undefined if schema demands boolean
    },
  });

  // Debug tool: If submission fails silently, look at your browser console!
  const errors = form.formState.errors;
  if (Object.keys(errors).length > 0) {
    console.warn("RHF Validation Errors Active:", errors);
  }

  const handleNext = async () => {
    const fieldsByStep: Record<number, (keyof SignUpInput)[]> = {
      1: ["fullName", "email", "phone", "isDonor"],
      2: ["bloodGroup", "gender", "age", "weight"],
      3: ["city", "district", "address", "password"],
    };

    const isStepValid = await form.trigger(fieldsByStep[step]);
    if (isStepValid) setStep((p) => Math.min(p + 1, 3));
  };

  const handlePrev = () => setStep((p) => Math.max(p - 1, 1));

  const onSubmit = async (data: SignUpInput) => {
    // Formats any standard local "01XXXXX" entry to target international prefix safely
    const basePhone = data.phone.trim();
    const formattedNumber = basePhone.startsWith("+880")
      ? basePhone
      : basePhone.startsWith("880")
        ? basePhone
        : `880${basePhone.startsWith("0") ? basePhone.substring(1) : basePhone}`;

    const payload = {
      ...data,
      phone: formattedNumber,
      age: Number(data.age),
    };

    mutate(
      { ...payload },
      {
        onSuccess: (data) => {
          navigate("/sign-in");
          toast.success(data.message);
        },
      },
    );
  };

  return (
    <div className="w-full max-w-md mx-auto bg-card rounded-xl border shadow-lg p-8">
      {/* Header & Progress Bar */}
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
              name="fullName"
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
            <Controller
              name="phone"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Phone (BD)</FieldLabel>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 bg-muted text-xs text-muted-foreground">
                      +88
                    </span>
                    <Input
                      {...field}
                      className="rounded-l-none"
                      placeholder="01712345678"
                    />
                  </div>
                  <FieldError
                    errors={fieldState.error ? [fieldState.error] : []}
                  />
                </Field>
              )}
            />
            <Controller
              name="isDonor"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Will you be a donor?</FieldLabel>
                  <Select
                    onValueChange={(value) => field.onChange(value === "true")}
                    value={
                      field.value !== undefined ? String(field.value) : ""
                    }>
                    <SelectTrigger
                      className={
                        fieldState.invalid ? "border-destructive" : ""
                      }>
                      <SelectValue placeholder="Select option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="true">Yes</SelectItem>
                      <SelectItem value="false">No</SelectItem>
                    </SelectContent>
                  </Select>
                  <FieldError
                    errors={fieldState.error ? [fieldState.error] : []}
                  />
                </Field>
              )}
            />
          </div>
        )}

        {/* STEP 2: Biological Metrics */}
        {step === 2 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
            <div className="grid grid-cols-2 gap-4">
              <Controller
                name="bloodGroup"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Blood Group</FieldLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger
                        className={
                          fieldState.invalid ? "border-destructive" : ""
                        }>
                        <SelectValue placeholder="Select group" />
                      </SelectTrigger>
                      <SelectContent>
                        {BloodGroupEnum.options.map((type) => (
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
                name="gender"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Gender</FieldLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger
                        className={
                          fieldState.invalid ? "border-destructive" : ""
                        }>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        {GenderEnum.options.map((gender) => (
                          <SelectItem key={gender} value={gender}>
                            {gender}
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
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Field>
                <FieldLabel>Date of Birth</FieldLabel>
                <DatePicker
                  onChange={(date) => {
                    if (date) {
                      const age = calculateAge(date);
                      form.setValue("age", age, { shouldValidate: true });
                    }
                  }}
                />
              </Field>

              <Controller
                name="age"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Calculated Age</FieldLabel>
                    <Input type="number" {...field} disabled />
                    <FieldError
                      errors={fieldState.error ? [fieldState.error] : []}
                    />
                  </Field>
                )}
              />
            </div>

            <Controller
              name="weight"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Weight (kg)</FieldLabel>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value === "" ? 0 : Number(e.target.value),
                      )
                    }
                  />
                  <FieldError
                    errors={fieldState.error ? [fieldState.error] : []}
                  />
                </Field>
              )}
            />
          </div>
        )}

        {/* STEP 3: Address & Security */}
        {step === 3 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
            <div className="grid grid-cols-2 gap-4">
              <Controller
                name="city"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>City</FieldLabel>
                    <Input {...field} placeholder="Dhaka" />
                    <FieldError
                      errors={fieldState.error ? [fieldState.error] : []}
                    />
                  </Field>
                )}
              />
              <Controller
                name="district"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>District</FieldLabel>
                    <Input {...field} placeholder="Dhaka" />
                    <FieldError
                      errors={fieldState.error ? [fieldState.error] : []}
                    />
                  </Field>
                )}
              />
            </div>

            <Controller
              name="address"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Current Address</FieldLabel>
                  <Input {...field} placeholder="House 12, Road 4, Banani" />
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

        {/* Navigation Actions */}
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
              isLoading={isPending}
              disabled={form.formState.isSubmitting || isPending}>
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
