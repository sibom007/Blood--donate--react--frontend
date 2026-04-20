import z from "zod";
import { BloodGroup, bloodGroups, RequestStatus } from "../types";

export interface GetAvailableBloodsQueryInput {
  bloodType?: BloodGroup;
  requestStatus?: RequestStatus;
  search?: string;
  sortBy?: "urgency" | "createdAt" | "dateOfDonation";
  sortOrder?: "asc" | "desc";
  limit?: number;
  page?: number;
}

export interface AvailableDonners {
  id: string;
  name: string;
  email: string;
  tokenVersion: number;
  bloodType: BloodGroup;
  city: string;
  phoneNumber: string;
  age: number;
  role: string;
  latitude: number | null;
  longitude: number | null;
  bio: string | null;
  status: "ACTIVE" | "BLOCKED";
  isAvailable: boolean;
  photo: string | null;
  lastDonationDate: null | Date;
  createdAt: Date;
  updatedAt: Date;
}

export const PersonalRequestSchema = z.object({
  bloodType: z.enum(bloodGroups),
  phoneNumber: z
    .string()
    .regex(/^8801[0-9]{9}$/, "Must be valid BD number (8801XXXXXXXXX)"),
  dateOfDonation: z.coerce.date({
    required_error: "Donation date is required",
  }),
  hospitalName: z.string().min(2, "Hospital name is required").trim(),
  hospitalAddress: z.string().min(5, "Hospital address is required").trim(),
  description: z.string().max(500, "Description is too long").optional(),
  urgency: z.enum(["NORMAL", "URGENT", "CRITICAL"]),
  donorId: z.string(),
});

export type PersonalRequestInput = z.infer<typeof PersonalRequestSchema>;
