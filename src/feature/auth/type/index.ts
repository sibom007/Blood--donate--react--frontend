import { z } from "zod";

export const SignInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type SignInInputData = z.infer<typeof SignInSchema>;

export const Role = {
  ADMIN: "ADMIN",
  VOLUNTEER: "VOLUNTEER",
  USER: "USER",
} as const;

export type UserRole = (typeof Role)[keyof typeof Role];

export type TJwtUser = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  bio: string | null;
  isAvailable: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type TinitialState = {
  user: null | TJwtUser;
  accessToken: null | string;
};

// The Data Object
export const BloodType = {
  A_POS: "A_POS",
  A_NEG: "A_NEG",
  B_POS: "B_POS",
  B_NEG: "B_NEG",
  O_POS: "O_POS",
  O_NEG: "O_NEG",
  AB_POS: "AB_POS",
  AB_NEG: "AB_NEG",
} as const;

// This results in: "A_POSITIVE" | "A_NEGATIVE" | ...
export type BloodTypeValues = (typeof BloodType)[keyof typeof BloodType];

export const BD_PHONE_REGEX = /^01[3-9]\d{8}$/;

export const SignUpSchema = z.object({
  // Step 1
  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .regex(/^[A-Za-z\s]+$/, "Only letters allowed"),
  email: z.string().email("Invalid email address"),
  // Step 2
  bloodType: z.enum(Object.values(BloodType) as [string, ...string[]]),

  age: z
    .string()
    .min(1, "Age is required")
    .regex(/^\d+$/, "Must be a valid number") // Ensures only digits
    .refine((val) => {
      const num = parseInt(val, 10);
      return num >= 18 && num <= 60;
    }, "Age must be between 18 and 60"),

  phoneNumber: z
    .string()
    .regex(
      BD_PHONE_REGEX,
      "Enter a valid 11-digit BD number (e.g., 01625334383)",
    ),
  // Step 3
  city: z.string().min(2, "City is required"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(64, "Password must not exceed 64 characters")
    .regex(/[A-Z]/, "Must include at least one uppercase letter")
    .regex(/[a-z]/, "Must include at least one lowercase letter")
    .regex(/[0-9]/, "Must include at least one number")
    .regex(/[^A-Za-z0-9]/, "Must include at least one special character")
    .regex(/^\S*$/, "Password must not contain spaces"),

  address: z.string().min(2, "Address is required"),

  dateOfBirth: z.date(),
});

export type SignUpInputData = z.infer<typeof SignUpSchema>;
export type SignUpPayloadType = {
  name: string;
  email: string;
  age: number;
  phone: string;
  password: string;
  bloodGroup: string;
  city: string;
  address: string;
  dateOfBirth: Date;
};
