import { z } from "zod";

export const BloodGroupEnum = z.enum([
  "A_POS",
  "A_NEG",
  "B_POS",
  "B_NEG",
  "AB_POS",
  "AB_NEG",
  "O_POS",
  "O_NEG",
]);

export const GenderEnum = z.enum(["MALE", "FEMALE", "OTHER"]);

export const Role = {
  SUPER_ADMIN: "SUPER_ADMIN",
  OPERATOR: "OPERATOR",
  USER: "USER",
} as const;

export type UserRole = (typeof Role)[keyof typeof Role];

export type TJwtUser = {
  id: string;
  fullName: string;
  email: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
};

export type TinitialState = {
  user: null | TJwtUser;
  accessToken: null | string;
};

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

export const SignUpSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100),

  email: z.string().trim().email("Invalid email address").toLowerCase(),

  phone: z.string().regex(/^(?:\+8801|01)[3-9]\d{8}$/, "Invalid phone number"),

  password: z.string().min(6, "Password must be at least 6 characters"),

  bloodGroup: BloodGroupEnum,

  gender: GenderEnum,

  age: z.number().int().min(18).max(100),

  address: z.string().max(255),

  city: z.string().max(100),

  district: z.string().max(100),

  profileImage: z.string().url().optional(),

  bio: z.string().max(500).optional(),

  isDonor: z.boolean(),

  availability: z.boolean().optional(),

  weight: z.number().positive(),
});

export const SignInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type SignUpInput = z.infer<typeof SignUpSchema>;
export type SignInInput = z.infer<typeof SignInSchema>;

export type BloodGroup = z.infer<typeof BloodGroupEnum>;

export type Gender = z.infer<typeof GenderEnum>;
