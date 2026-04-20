"use client";

import { toast } from "sonner";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUser } from "@/feature/auth/hooks/useUser";
import { CheckCircle2, Eye, EyeOff } from "lucide-react";
import { useChangePasswordMutation } from "@/redux/api/auth-api";
import { ChangePasswordSchema, type ChnagePasswordInput } from "../type";

export const ChangePasswordView = () => {
  const { user } = useUser();
  const [ChangePassword, { isLoading, isSuccess }] =
    useChangePasswordMutation();
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ChnagePasswordInput>({
    resolver: zodResolver(ChangePasswordSchema),
  });

  const onSubmit = async (value: ChnagePasswordInput) => {
    const newPayload = { ...value, email: user?.email };
    try {
      const res = await ChangePassword(newPayload).unwrap();
      toast.success(res.message);
      reset();
    } catch (err: any) {
      toast.error(err.message || "something went wrong");
    }
  };
  if (isSuccess) {
    return (
      <div className="flex items-center gap-3 rounded-lg border p-4">
        <CheckCircle2 className="h-5 w-5 text-green-500" />
        <p className="text-sm font-medium">Password changed successfully</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col lg:flex-row lg:items-center gap-4 border rounded-sm p-4">
      {/* Title */}
      <div className="space-y-1 lg:min-w-55">
        <h2 className="text-lg font-semibold">Change Password</h2>
        <p className="text-sm text-muted-foreground">
          Update your account password.
        </p>
      </div>

      {/* Form Fields */}
      <div className="flex flex-col sm:flex-row flex-1 gap-3">
        {/* Old Password */}
        <div className="relative flex-1">
          <input
            type={showOld ? "text" : "password"}
            placeholder="Old password"
            {...register("oldPassword")}
            className="h-9 w-full rounded-md border px-3 pr-9 text-sm"
          />

          <button
            type="button"
            onClick={() => setShowOld(!showOld)}
            className="absolute right-2 top-4.5 -translate-y-1/2 text-muted-foreground">
            {showOld ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>

          <div className="min-h-4">
            {errors.oldPassword && (
              <p className="text-xs text-red-500">
                {errors.oldPassword.message}
              </p>
            )}
          </div>
        </div>

        {/* New Password */}
        <div className="relative flex-1">
          <input
            type={showNew ? "text" : "password"}
            placeholder="New password"
            {...register("newPassword")}
            className="h-9 w-full rounded-md border px-3 pr-9 text-sm"
          />

          <button
            type="button"
            onClick={() => setShowNew(!showNew)}
            className="absolute right-2 top-4.5 -translate-y-1/2 text-muted-foreground">
            {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>

          <div className="min-h-4">
            {errors.newPassword && (
              <p className="text-xs text-red-500">
                {errors.newPassword.message}
              </p>
            )}
          </div>
        </div>

        {/* Button */}
        <div className="sm:self-start">
          <Button
            type="submit"
            disabled={isLoading}
            size="lg"
            loading={isLoading}
            className="w-full sm:w-auto">
            {isLoading ? "Updating..." : "Update"}
          </Button>
        </div>
      </div>
    </form>
  );
};
