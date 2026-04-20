import { z } from "zod";

export const ChangePasswordSchema = z.object({
  oldPassword: z.string().min(1, "Old password is required"),
  newPassword: z
    .string()
    .min(7, "Password must be at least 7 characters")
    .regex(/[A-Z]/, "Must contain one uppercase letter")
    .regex(/[a-z]/, "Must contain one lowercase letter")
    .regex(/[^A-Za-z0-9]/, "Must contain one special character"),
});

export type ChnagePasswordInput = z.infer<typeof ChangePasswordSchema>;
