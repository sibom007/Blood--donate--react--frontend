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
