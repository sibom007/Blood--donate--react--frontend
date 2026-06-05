import { z } from "zod";

import {
  BloodGroupSchema,
  RequestStatusSchema,
  UrgencySchema,
  type RequestStatus,
  type TBloodGroup,
  type TUrgency,
} from "./constants";
import { BloodGroupEnum } from "../auth/types";

export const UrgencyLevel = {
  LOW: "LOW",
  MEDIUM: "MEDIUM",
  HIGH: "HIGH",
  CRITICAL: "CRITICAL",
} as const;

const BD_LOCAL_REGEX = /^(013|014|015|016|017|018|019)\d{8}$/;
export const MAX_WORDS = 500;

export const RequestBloodSchema = z.object({
  patientName: z
    .string()
    .min(3, { message: "name is to short" })
    .max(50, { message: "Name is to long" }),

  bloodGroup: BloodGroupEnum,
  urgency: z.nativeEnum(UrgencyLevel),

  phoneNumber: z
    .string()
    .transform((val) => {
      // 1. Strip all non-numeric characters
      const digits = val.replace(/\D/g, "");

      // 2. Handle "8801..." -> convert to "01..."
      if (digits.startsWith("8801") && digits.length === 14) {
        return digits.slice(2); // returns 01XXXXXXXXX
      }

      // 3. Handle "8801..." but common mistake (13 digits total)
      if (digits.startsWith("8801") && digits.length === 13) {
        return digits.slice(2);
      }

      // 4. Already starts with 01, just return it
      return digits;
    })
    .pipe(
      z
        .string()
        .length(11, "Local number must be exactly 11 digits (01XXXXXXXXX)")
        .regex(BD_LOCAL_REGEX, "Invalid operator prefix. Use 013-019"),
    )
    // Final transform for API: Always send 13 digits (8801...)
    .transform((val) => `88${val}`),

  neededAt: z.date().refine((date) => new Date(date) > new Date(), {
    message: "neededAt must be in the future",
  }),

  unitsNeeded: z.string().min(1).max(10),
  city: z
    .string()
    .min(3, { message: "Give Poper City name" })
    .max(30, { message: "City name is to long" }),

  hospitalName: z.string().min(2, "Hospital name is too short").max(100),
  hospitalAddress: z
    .string()
    .min(5, "Please provide a more detailed address")
    .max(100),
  description: z
    .string()
    .min(10, "Please provide a bit more detail")
    .refine((val) => val.trim().split(/\s+/).filter(Boolean).length <= 500, {
      message: "Description cannot exceed 500 words",
    })
    .max(500, { message: "description is to long" }),
});

export type RequestBloodInput = z.infer<typeof RequestBloodSchema>;

export interface GetRequestsQueryInput {
  bloodType?: typeof BloodGroupEnum;
  urgency?: typeof UrgencyLevel;
  requestStatus?: RequestStatus;
  search?: string;
  sortBy?: "urgency" | "createdAt" | "dateOfDonation";
  sortOrder?: "asc" | "desc";
  limit?: number;
  page?: number;
}

export interface BloodRequest {
  id: string;
  requesterId: string;
  patientName?: string | null;
  bloodGroup: TBloodGroup;
  unitsNeeded: number;
  urgency: TUrgency;
  neededAt: Date | string;

  // Location Details
  city: string;
  hospitalName: string;
  hospitalAddress: string;

  description?: string | null;
  status: RequestStatus;

  matchedDonorId?: string | null;
  createdAt: Date | string;
  updatedAt: Date | string;
}

//  Filter for  own blood requests

export const filterSchema = z.object({
  // Search is usually a trimmed string, empty string should be treated as undefined
  search: z.string().trim().optional().or(z.literal("")),

  // Use the schemas we defined to validate the specific strings
  bloodGroup: z.union([BloodGroupSchema, z.literal("ALL")]).optional(),
  status: z.union([RequestStatusSchema, z.literal("ALL")]).optional(),
  urgency: z.union([UrgencySchema, z.literal("ALL")]).optional(),

  // Date validation
  date: z.date().optional().nullable(),
  page: z.number().default(1),
  limit: z.number().default(6),
});

export type FilterValues = z.infer<typeof filterSchema>;





export const CreateBloodRequestSchema = z
  .object({
    donorId: z.string().uuid().optional(),

    inventoryId: z.string().uuid().optional(),

    patientName: z
      .string()
      .trim()
      .min(2, "Patient name must be at least 2 characters")
      .max(100, "Patient name is too long"),

    patientAge: z
      .number()
      .int()
      .min(0, "Age cannot be negative")
      .max(150, "Invalid age")
      .optional(),

    bloodGroup: BloodGroupEnum.describe("Please select a blood group"),

    unitsRequired: z
      .number()
      .int()
      .min(1, "At least 1 unit is required")
      .max(10, "Cannot request more than 10 units"),

    hospitalName: z
      .string()
      .trim()
      .min(2, "Hospital name is required")
      .max(200),

    hospitalAddress: z
      .string()
      .trim()
      .min(5, "Hospital address is required")
      .max(500),

    contactPerson: z
      .string()
      .trim()
      .min(2, "Contact person name is required")
      .max(100),

    contactPhone: z
      .string()
      .trim()
      .regex(/^(?:\+8801|01)[3-9]\d{8}$/, "Invalid Bangladesh phone number"),

    reason: z.string().trim().max(1000).optional(),

    requiredDate: z.date(),
  })
  .superRefine((data, ctx) => {
    // Cannot select both donor and inventory
    if (data.donorId && data.inventoryId) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["inventoryId"],
        message: "Choose either a donor or inventory blood, not both.",
      });
    }

    // Required date cannot be in the past
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (data.requiredDate < today) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["requiredDate"],
        message: "Required date cannot be in the past.",
      });
    }
  });

export type CreateBloodRequestInput = z.infer<typeof CreateBloodRequestSchema>;



