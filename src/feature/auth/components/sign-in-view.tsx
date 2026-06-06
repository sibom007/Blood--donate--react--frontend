import {
  Field,
  FieldLabel,
  FieldError,
  FieldDescription,
} from "@/components/ui/field";
import { useState } from "react";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router";
import { useSignIn } from "../hooks/use-sign-in";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { SignInSchema, type SignInInput } from "../types";

export const SignInView = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { mutate, isPending } = useSignIn();

  const form = useForm<SignInInput>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "test1@gmail.com",
      password: "1234567",
    },
  });

  const onSubmit = async (value: SignInInput) => {
    mutate(
      { ...value },
      {
        onSuccess: () => {
          navigate("/");
        },
      },
    );
  };

  return (
    <div className="w-full max-w-md mx-auto bg-card rounded-xl border shadow-lg p-8">
      <Link to={"/"}>
        <Button icon={<ArrowLeft />}>Back</Button>
      </Link>
      {/* Header */}
      <div className="mb-6 text-center space-y-1">
        <h1 className="text-2xl font-semibold">Welcome Back</h1>
        <p className="text-sm text-muted-foreground">
          Sign in to access your dashboard
        </p>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        {/* EMAIL */}
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => {
            const { ...rest } = field;

            return (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Email</FieldLabel>

                <Input {...rest} placeholder="example@email.com" />

                <FieldDescription>Enter your registered email</FieldDescription>

                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            );
          }}
        />

        {/* PASSWORD */}
        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => {
            const { ...rest } = field;

            return (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Password</FieldLabel>

                <div className="relative">
                  <Input
                    {...rest}
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="pr-10"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((p) => !p)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            );
          }}
        />

        {/* SUBMIT */}
        <Button
          disabled={isPending}
          isLoading={isPending}
          type="submit"
          className="w-full">
          Sign In
        </Button>
      </form>

      {/* Footer */}
      <div className="mt-3 text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link
          to="/sign-up"
          className="font-medium text-primary hover:underline">
          Sign Up
        </Link>
      </div>
    </div>
  );
};
